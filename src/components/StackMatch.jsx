import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { getBookRecommendations } from '../services/gemini';
import { Link } from 'react-router-dom';
import './StackMatch.css';

export default function StackMatch() {
  const { currentUser } = useAuth();
  const [step, setStep] = useState('welcome'); // welcome, questions, loading, results
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [preferences, setPreferences] = useState({
    genre: '',
    mood: '',
    trope: '',
    vibe: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadBooks();
    }
  }, [currentUser]);

  async function loadBooks() {
    try {
      // Load Want to Read shelf
      const wantToReadRef = collection(db, 'users', currentUser.uid, 'shelves', 'want-to-read', 'books');
      const wantToReadSnapshot = await getDocs(wantToReadRef);
      const wantToRead = wantToReadSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWantToReadBooks(wantToRead);

      // Load Read shelf with 4+ star ratings
      const readRef = collection(db, 'users', currentUser.uid, 'shelves', 'read', 'books');
      const readSnapshot = await getDocs(readRef);
      const read = readSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(book => book.rating >= 4)
        .sort((a, b) => (b.addedAt?.seconds || 0) - (a.addedAt?.seconds || 0))
        .slice(0, 5); // Get last 5 highly rated books
      setReadBooks(read);
    } catch (error) {
      console.error('Error loading books:', error);
      setError('Failed to load your books. Please try again.');
    }
  }

  async function handleGetRecommendations() {
    if (wantToReadBooks.length === 0) {
      setError('Add some books to your Want to Read shelf first!');
      return;
    }

    setLoading(true);
    setError(null);
    setStep('loading');

    try {
      // Determine if user provided any preferences
      const hasPreferences = preferences.genre || preferences.mood || preferences.trope || preferences.vibe;
      
      const recs = await getBookRecommendations(
        wantToReadBooks,
        hasPreferences ? preferences : null,
        readBooks
      );

      if (recs.length === 0) {
        throw new Error('No recommendations found. Try adjusting your preferences.');
      }

      // Match recommendations with actual books from Want to Read shelf
      const matchedRecs = recs.map(rec => {
        const book = wantToReadBooks.find(b => 
          b.title.toLowerCase().includes(rec.title.toLowerCase()) ||
          rec.title.toLowerCase().includes(b.title.toLowerCase())
        );
        return {
          ...rec,
          book: book || null
        };
      }).filter(rec => rec.book); // Only keep matched books

      setRecommendations(matchedRecs);
      setCurrentCardIndex(0);
      setStep('results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError(error.message || 'Failed to get recommendations. Please try again.');
      setStep('questions');
    } finally {
      setLoading(false);
    }
  }

  function handleSkip() {
    if (currentCardIndex < recommendations.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Reset to show all cards again
      setStep('questions');
      setCurrentCardIndex(0);
    }
  }

  function handleLike() {
    // Could add to a "prioritized" list or just navigate to book
    if (currentCardIndex < recommendations.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setStep('questions');
      setCurrentCardIndex(0);
    }
  }

  function handleStartOver() {
    setStep('questions');
    setPreferences({ genre: '', mood: '', trope: '', vibe: '' });
    setRecommendations([]);
    setCurrentCardIndex(0);
    setError(null);
  }

  if (!currentUser) {
    return (
      <div className="stack-match">
        <div className="stack-match-welcome">
          <h2>📚 Stack Match</h2>
          <p>Sign in to get personalized book recommendations!</p>
        </div>
      </div>
    );
  }

  if (step === 'welcome') {
    return (
      <div className="stack-match">
        <div className="stack-match-welcome">
          <h2>📚 Stack Match</h2>
          <p>Not sure what to read next? Let us help you find the perfect book from your Want to Read shelf!</p>
          <button 
            className="btn-primary"
            onClick={() => setStep('questions')}
          >
            Find My Next Read
          </button>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div className="stack-match">
        <div className="stack-match-questions">
          <h2>📚 What are you in the mood for?</h2>
          <p className="hint">
            Tell us what you're looking for! Be as specific or vague as you want. 
            Leave blank to get recommendations based on your reading history.
          </p>

          {error && <div className="error-message">{error}</div>}

          <div className="question-form">
            <div className="form-group">
              <label>Genre (optional)</label>
              <input
                type="text"
                placeholder="e.g., Fantasy, Romance, Thriller..."
                value={preferences.genre}
                onChange={(e) => setPreferences({ ...preferences, genre: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Mood or Vibe (optional)</label>
              <input
                type="text"
                placeholder="e.g., cozy and comforting, dark and twisty..."
                value={preferences.mood}
                onChange={(e) => setPreferences({ ...preferences, mood: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Trope or Theme (optional)</label>
              <input
                type="text"
                placeholder="e.g., fake dating, enemies to lovers, chosen one..."
                value={preferences.trope}
                onChange={(e) => setPreferences({ ...preferences, trope: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Specific Scene or Micro-Trope (optional)</label>
              <input
                type="text"
                placeholder="e.g., emotional confession scene, slow burn tension..."
                value={preferences.vibe}
                onChange={(e) => setPreferences({ ...preferences, vibe: e.target.value })}
              />
            </div>

            <button
              className="btn-primary"
              onClick={handleGetRecommendations}
              disabled={loading || wantToReadBooks.length === 0}
            >
              {wantToReadBooks.length === 0 
                ? 'Add books to Want to Read first' 
                : 'Get Recommendations'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="stack-match">
        <div className="stack-match-loading">
          <div className="loading-spinner"></div>
          <p>Finding your perfect match...</p>
        </div>
      </div>
    );
  }

  if (step === 'results' && recommendations.length > 0) {
    const currentRec = recommendations[currentCardIndex];
    const book = currentRec.book;

    return (
      <div className="stack-match">
        <div className="stack-match-results">
          <h2>📚 Your Matches</h2>
          <p className="match-counter">{currentCardIndex + 1} of {recommendations.length}</p>

          <div className="match-card">
            <Link to={`/book/${book.bookId}`} className="match-card-content">
              {book.cover ? (
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="match-cover"
                />
              ) : (
                <div className="match-cover-placeholder">
                  <span>📖</span>
                </div>
              )}

              <div className="match-info">
                <h3>{book.title}</h3>
                <p className="match-author">
                  by {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                </p>
                <div className="match-reason">
                  <strong>Why this book:</strong>
                  <p>{currentRec.reason}</p>
                </div>
              </div>
            </Link>

            <div className="match-actions">
              <button 
                className="btn-skip"
                onClick={handleSkip}
                title="Skip"
              >
                ✕ Pass
              </button>
              <Link 
                to={`/book/${book.bookId}`}
                className="btn-like"
                title="View Book"
              >
                ♥ Read This
              </Link>
            </div>
          </div>

          <button 
            className="btn-secondary start-over-btn"
            onClick={handleStartOver}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return null;
}
