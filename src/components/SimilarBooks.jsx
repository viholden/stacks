import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSimilarBooks } from '../services/gemini';
import './SimilarBooks.css';

export default function SimilarBooks({ book }) {
  const [similarBooks, setSimilarBooks] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      loadSimilarBooks();
      loadAuthorBooks();
    }
  }, [book]);

  async function loadSimilarBooks() {
    setLoading(true);
    setError(null);

    try {
      const similar = await getSimilarBooks(book);
      setSimilarBooks(similar);
    } catch (error) {
      console.error('Error loading similar books:', error);
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  }

  async function loadAuthorBooks() {
    if (!book.authors || book.authors.length === 0) return;

    try {
      const authorName = book.authors[0]; // Use first author
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}&limit=6`
      );
      const data = await response.json();

      // Filter out the current book and take up to 5
      const books = data.docs
        .filter(b => b.key !== `/works/${book.id}`)
        .slice(0, 5)
        .map(b => ({
          key: b.key,
          title: b.title,
          authors: b.author_name || [authorName],
          cover_id: b.cover_i,
          first_publish_year: b.first_publish_year
        }));

      setAuthorBooks(books);
    } catch (error) {
      console.error('Error loading author books:', error);
    }
  }

  if (!book) return null;

  return (
    <div className="similar-books-container">
      {/* Books by Same Author */}
      {authorBooks.length > 0 && (
        <section className="similar-books-section">
          <h2>More by {book.authors?.[0]}</h2>
          <div className="similar-books-scroll">
            {authorBooks.map(authorBook => (
              <Link
                key={authorBook.key}
                to={`/book/${authorBook.key.replace('/works/', '')}`}
                className="similar-book-card"
              >
                {authorBook.cover_id ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${authorBook.cover_id}-M.jpg`}
                    alt={authorBook.title}
                    className="similar-book-cover"
                  />
                ) : (
                  <div className="similar-book-cover-placeholder">
                    <span>📖</span>
                  </div>
                )}
                <div className="similar-book-info">
                  <h3>{authorBook.title}</h3>
                  {authorBook.first_publish_year && (
                    <p className="book-year">{authorBook.first_publish_year}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* AI-Powered Similar Books */}
      {loading && (
        <section className="similar-books-section">
          <h2>Readers Also Enjoyed</h2>
          <div className="similar-books-loading">
            <div className="loading-spinner-small"></div>
            <p>Finding similar books...</p>
          </div>
        </section>
      )}

      {!loading && similarBooks.length > 0 && (
        <section className="similar-books-section">
          <h2>Readers Also Enjoyed</h2>
          <p className="section-subtitle">AI-curated recommendations based on themes and atmosphere</p>
          <div className="similar-books-list">
            {similarBooks.map((similar, index) => (
              <div key={index} className="similar-book-row">
                <div className="similar-book-number">{index + 1}</div>
                <div className="similar-book-details">
                  <h3 className="similar-book-title">{similar.title}</h3>
                  <p className="similar-book-author">by {similar.author}</p>
                  <p className="similar-book-reason">{similar.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="similar-books-section">
          <h2>Readers Also Enjoyed</h2>
          <p className="error-message-inline">{error}</p>
        </section>
      )}
    </div>
  );
}
