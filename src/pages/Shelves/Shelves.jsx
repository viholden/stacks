import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase/config'
import { collection, query, getDocs, orderBy, doc, deleteDoc, serverTimestamp, addDoc, setDoc, where, getDoc } from 'firebase/firestore'
import AuthModal from '../../components/AuthModal'
import StarRating from '../../components/StarRating'
import BarcodeScanner from '../../components/BarcodeScanner'
import StackMatch from '../../components/StackMatch'
import './Shelves.css'

export default function Shelves() {
  const [shelves, setShelves] = useState([])
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [movingBook, setMovingBook] = useState(null)
  const [showNewShelfModal, setShowNewShelfModal] = useState(false)
  const [newShelfName, setNewShelfName] = useState('')
  const [creatingShelf, setCreatingShelf] = useState(false)
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [bookToMarkAsRead, setBookToMarkAsRead] = useState(null)
  const [finishBookRating, setFinishBookRating] = useState(0)
  const [finishBookReview, setFinishBookReview] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)
  const [scannedISBN, setScannedISBN] = useState('')
  const [manualISBNEntry, setManualISBNEntry] = useState(false)
  const { currentUser, userProfile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      loadShelvesAndBooks()
    } else {
      setLoading(false)
    }
  }, [currentUser])

  async function loadShelvesAndBooks() {
    try {
      setLoading(true)

      // Get user's shelves
      const shelvesRef = collection(db, 'users', currentUser.uid, 'shelves')
      const shelvesQuery = query(shelvesRef, orderBy('order', 'asc'))
      const shelvesSnapshot = await getDocs(shelvesQuery)

      const shelvesData = []

      // For each shelf, get its books
      for (const shelfDoc of shelvesSnapshot.docs) {
        const shelfData = { id: shelfDoc.id, ...shelfDoc.data(), books: [] }

        // Get books in this shelf
        const booksRef = collection(db, 'users', currentUser.uid, 'shelves', shelfDoc.id, 'books')
        const booksSnapshot = await getDocs(booksRef)

        shelfData.books = booksSnapshot.docs.map(bookDoc => ({
          id: bookDoc.id,
          ...bookDoc.data()
        }))

        shelvesData.push(shelfData)
      }

      setShelves(shelvesData)

      // Filter currently reading books
      const readingShelf = shelvesData.find(shelf => shelf.id === 'reading')
      setCurrentlyReading(readingShelf ? readingShelf.books : [])

    } catch (error) {
      console.error('Error loading shelves:', error)
    } finally {
      setLoading(false)
    }
  }

  async function searchBooks(query) {
    if (query.trim().length < 3) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    try {
      setSearching(true)
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`)
      const data = await response.json()

      const results = data.docs.map(book => ({
        key: book.key,
        title: book.title,
        authors: book.author_name || ['Unknown Author'],
        cover_id: book.cover_i,
        first_publish_year: book.first_publish_year
      }))

      setSearchResults(results)
      setShowSearchResults(true)
    } catch (error) {
      console.error('Error searching books:', error)
    } finally {
      setSearching(false)
    }
  }

  function handleSearchChange(e) {
    const value = e.target.value
    setSearchQuery(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchBooks(value)
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  async function searchByISBN(isbn) {
    try {
      setSearching(true)
      // Search Open Library by ISBN
      const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`)
      
      if (response.ok) {
        const bookData = await response.json()
        // Get the work key from the book
        if (bookData.works && bookData.works.length > 0) {
          const workKey = bookData.works[0].key
          navigate(`/book/${workKey.replace('/works/', '')}`)
          setShowBarcodeScanner(false)
          setScannedISBN('')
        } else {
          // Book found but no work, try to show some info
          alert('Book found but details unavailable. Please try searching by title.')
          setManualISBNEntry(true)
        }
      } else {
        // Book not found in Open Library - allow manual entry to save
        setManualISBNEntry(true)
        alert('Book not found in Open Library. You can enter details manually to save it.')
      }
    } catch (error) {
      console.error('Error searching by ISBN:', error)
      setManualISBNEntry(true)
      alert('Error searching for book. You can enter details manually.')
    } finally {
      setSearching(false)
    }
  }

  function handleBarcodeDetected(isbn) {
    setScannedISBN(isbn)
    searchByISBN(isbn)
  }

  async function saveCustomBook(bookData) {
    try {
      // Save book to our database
      const bookRef = doc(db, 'books', bookData.isbn)
      await setDoc(bookRef, {
        isbn: bookData.isbn,
        title: bookData.title,
        authors: bookData.authors || ['Unknown Author'],
        description: bookData.description || 'No description available.',
        covers: [],
        customEntry: true,
        createdAt: serverTimestamp()
      })

      // Navigate to the book detail with our custom ID
      navigate(`/book/${bookData.isbn}`)
      setShowBarcodeScanner(false)
      setScannedISBN('')
      setManualISBNEntry(false)
    } catch (error) {
      console.error('Error saving custom book:', error)
      alert('Failed to save book. Please try again.')
    }
  }

  async function moveBookToShelf(bookData, fromShelfId, toShelfId) {
    if (!currentUser || fromShelfId === toShelfId) return

    try {
      setMovingBook(bookData.id)

      const defaultShelves = ['want-to-read', 'reading', 'read', 'didnt-finish']
      const isToDefaultShelf = defaultShelves.includes(toShelfId)

      // If moving to a default shelf, remove from all other default shelves (not just fromShelfId)
      if (isToDefaultShelf) {
        for (const defaultShelf of defaultShelves) {
          if (defaultShelf !== toShelfId) {
            try {
              const shelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', defaultShelf, 'books')
              const booksQuery = query(shelfBooksRef, where('bookId', '==', bookData.bookId))
              const booksSnapshot = await getDocs(booksQuery)
              
              // Delete all instances of this book from other default shelves
              for (const bookDoc of booksSnapshot.docs) {
                await deleteDoc(doc(db, 'users', currentUser.uid, 'shelves', defaultShelf, 'books', bookDoc.id))
              }
            } catch (error) {
              console.warn(`Error removing book from ${defaultShelf}:`, error)
            }
          }
        }
      } else {
        // If moving to a custom shelf, only remove from the source shelf
        await deleteDoc(doc(db, 'users', currentUser.uid, 'shelves', fromShelfId, 'books', bookData.id))
      }

      // Prepare book data for new shelf
      const newBookData = {
        bookId: bookData.bookId,
        title: bookData.title,
        authors: bookData.authors || [],
        covers: bookData.covers || [],
        addedAt: bookData.addedAt || serverTimestamp()
      }

      // Add timestamps based on target shelf
      if (toShelfId === 'reading') {
        newBookData.startedAt = bookData.startedAt || serverTimestamp()
      } else if (toShelfId === 'read') {
        newBookData.completedAt = bookData.completedAt || serverTimestamp()
        if (bookData.startedAt) {
          newBookData.startedAt = bookData.startedAt
        }
      }

      // Add to new shelf
      const newShelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', toShelfId, 'books')
      await addDoc(newShelfBooksRef, newBookData)

      // Reload shelves
      await loadShelvesAndBooks()

    } catch (error) {
      console.error('Error moving book:', error)
      alert('Failed to move book. Please try again.')
    } finally {
      setMovingBook(null)
    }
  }

  async function finishBook(bookData) {
    // Check authentication first
    if (!currentUser) {
      setShowAuthModal(true)
      setAuthModalMode('login')
      return
    }

    // Show finish book modal with rating, review, and library prompt
    setBookToMarkAsRead(bookData)
    setFinishBookRating(0)
    setFinishBookReview('')
    setShowLibraryModal(true)
  }

  async function handleFinishBookSubmit(borrowedFromLibrary) {
    if (!bookToMarkAsRead) return

    try {
      setMovingBook(bookToMarkAsRead.id)

      const defaultShelves = ['want-to-read', 'reading', 'read', 'didnt-finish']
      
      // Remove from all other default shelves
      for (const defaultShelf of defaultShelves) {
        if (defaultShelf !== 'read') {
          try {
            const shelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', defaultShelf, 'books')
            const booksQuery = query(shelfBooksRef, where('bookId', '==', bookToMarkAsRead.bookId))
            const booksSnapshot = await getDocs(booksQuery)
            
            for (const bookDoc of booksSnapshot.docs) {
              await deleteDoc(doc(db, 'users', currentUser.uid, 'shelves', defaultShelf, 'books', bookDoc.id))
            }
          } catch (error) {
            console.warn(`Error removing book from ${defaultShelf}:`, error)
          }
        }
      }

      // Prepare book data for read shelf
      const newBookData = {
        bookId: bookToMarkAsRead.bookId,
        title: bookToMarkAsRead.title,
        authors: bookToMarkAsRead.authors || [],
        covers: bookToMarkAsRead.covers || [],
        addedAt: bookToMarkAsRead.addedAt || serverTimestamp(),
        completedAt: serverTimestamp(),
        borrowedFromLibrary: borrowedFromLibrary
      }

      // Preserve startedAt if it exists
      if (bookToMarkAsRead.startedAt) {
        newBookData.startedAt = bookToMarkAsRead.startedAt
      }

      // Add to read shelf
      const readShelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', 'read', 'books')
      await addDoc(readShelfBooksRef, newBookData)

      // If user provided a rating, save it
      if (finishBookRating > 0) {
        // Update book ratings statistics
        const bookRatingsRef = doc(db, 'bookRatings', bookToMarkAsRead.bookId)
        const bookRatingsDoc = await getDoc(bookRatingsRef)
        
        if (bookRatingsDoc.exists()) {
          const currentData = bookRatingsDoc.data()
          const newTotal = currentData.totalRatings + 1
          const newAverage = ((currentData.averageRating * currentData.totalRatings) + finishBookRating) / newTotal
          
          await setDoc(bookRatingsRef, {
            averageRating: newAverage,
            totalRatings: newTotal
          })
        } else {
          await setDoc(bookRatingsRef, {
            averageRating: finishBookRating,
            totalRatings: 1
          })
        }

        // Save user's rating
        await addDoc(collection(db, 'ratings'), {
          bookId: bookToMarkAsRead.bookId,
          userId: currentUser.uid,
          username: userProfile?.username || 'Anonymous',
          rating: finishBookRating,
          createdAt: serverTimestamp()
        })
      }

      // If user provided a review, save it
      if (finishBookReview.trim()) {
        await addDoc(collection(db, 'reviews'), {
          bookId: bookToMarkAsRead.bookId,
          userId: currentUser.uid,
          username: userProfile?.username || 'Anonymous',
          reviewText: finishBookReview.trim(),
          rating: finishBookRating,
          createdAt: serverTimestamp()
        })
      }

      // Reload shelves
      await loadShelvesAndBooks()

      // Close modal and reset
      setShowLibraryModal(false)
      setBookToMarkAsRead(null)
      setFinishBookRating(0)
      setFinishBookReview('')

    } catch (error) {
      console.error('Error marking book as read:', error)
      alert('Failed to mark book as read. Please try again.')
    } finally {
      setMovingBook(null)
    }
  }

  async function createNewShelf() {
    // Check authentication first
    if (!currentUser) {
      setShowNewShelfModal(false)
      setShowAuthModal(true)
      setAuthModalMode('login')
      return
    }

    if (!newShelfName.trim()) return

    try {
      setCreatingShelf(true)

      // Generate shelf ID from name (lowercase, replace spaces with hyphens)
      const shelfId = newShelfName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      // Check if shelf already exists
      const existingShelf = shelves.find(s => s.id === shelfId)
      if (existingShelf) {
        alert('A shelf with this name already exists!')
        return
      }

      // Create new shelf
      await setDoc(doc(db, 'users', currentUser.uid, 'shelves', shelfId), {
        id: shelfId,
        name: newShelfName,
        isDefault: false,
        order: shelves.length + 1,
        createdAt: serverTimestamp()
      })

      // Reload shelves
      await loadShelvesAndBooks()

      // Close modal and reset
      setShowNewShelfModal(false)
      setNewShelfName('')

    } catch (error) {
      console.error('Error creating shelf:', error)
      alert('Failed to create shelf. Please try again.')
    } finally {
      setCreatingShelf(false)
    }
  }

  if (loading) {
    return (
      <div className="shelves-page">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  // Signed-out state
  if (!currentUser) {
    return (
      <div className="shelves-page">
        <div className="shelves-container">
          {/* Search Bar - Always Available */}
          <div className="search-section">
            <h1 className="page-title">Discover Your Next Great Read</h1>
            <div className="search-bar-wrapper">
              <div className="search-bar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for books by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length >= 3 && setShowSearchResults(true)}
                />
                {searching && <span className="search-loading">Searching...</span>}
              </div>
              <button
                className="btn btn-icon scan-btn"
                onClick={() => setShowBarcodeScanner(true)}
                title="Scan barcode"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <line x1="7" y1="8" x2="7" y2="16" />
                  <line x1="10" y1="8" x2="10" y2="16" />
                  <line x1="13" y1="8" x2="13" y2="16" />
                  <line x1="16" y1="8" x2="16" y2="16" />
                </svg>
                <span className="scan-btn-text">Scan</span>
              </button>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  <div className="search-results-header">
                    <span>{searchResults.length} results</span>
                    <button onClick={() => setShowSearchResults(false)}>×</button>
                  </div>
                  {searchResults.map(result => (
                    <Link
                      key={result.key}
                      to={`/book/${result.key.replace('/works/', '')}`}
                      className="search-result-item"
                      onClick={() => setShowSearchResults(false)}
                    >
                      {result.cover_id ? (
                        <img
                          src={`https://covers.openlibrary.org/b/id/${result.cover_id}-S.jpg`}
                          alt={result.title}
                          className="search-result-cover"
                        />
                      ) : (
                        <div className="search-result-cover-placeholder">
                          {result.title.charAt(0)}
                        </div>
                      )}
                      <div className="search-result-info">
                        <div className="search-result-title">{result.title}</div>
                        <div className="search-result-author">
                          {result.authors.join(', ')}
                        </div>
                        {result.first_publish_year && (
                          <div className="search-result-year">{result.first_publish_year}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sign In Prompt */}
          <div className="signed-out-state">
            <div className="signed-out-icon">📚</div>
            <h2>Track Your Reading Journey</h2>
            <p>Sign in to create shelves, track your books, write reviews, and connect with readers like you.</p>
            <div className="signed-out-features">
              <div className="feature-item">
                <span className="feature-icon">📖</span>
                <span>Organize books into custom shelves</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⭐</span>
                <span>Rate and review books</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Track your reading progress</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <span>See what others are reading</span>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => {
                setShowAuthModal(true)
                setAuthModalMode('signup')
              }}
            >
              Join Stacks Today
            </button>
            <p className="signed-out-signin">
              Already have an account?{' '}
              <button 
                className="link-button" 
                onClick={() => {
                  setShowAuthModal(true)
                  setAuthModalMode('login')
                }}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          initialMode={authModalMode}
        />
      </div>
    )
  }

  return (
    <div className="shelves-page">
      <div className="shelves-container">
        {/* Header */}
        <div className="shelves-header">
          <h1>My Books</h1>
          <p>Welcome back, {userProfile?.displayName || 'Reader'}!</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar-wrapper">
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
              <input
                type="text"
                placeholder="Search for books by title, author, or ISBN..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length >= 3 && setShowSearchResults(true)}
              />
              {searching && <span className="search-loading">Searching...</span>}
            </div>
            <button
              className="btn btn-icon scan-btn"
              onClick={() => setShowBarcodeScanner(true)}
              title="Scan barcode"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <line x1="7" y1="8" x2="7" y2="16" />
                <line x1="10" y1="8" x2="10" y2="16" />
                <line x1="13" y1="8" x2="13" y2="16" />
                <line x1="16" y1="8" x2="16" y2="16" />
              </svg>
              <span className="scan-btn-text">Scan</span>
            </button>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                <div className="search-results-header">
                  <span>{searchResults.length} results</span>
                  <button onClick={() => setShowSearchResults(false)}>×</button>
                </div>
                {searchResults.map(result => (
                  <Link
                    key={result.key}
                    to={`/book/${result.key.replace('/works/', '')}`}
                    className="search-result-item"
                    onClick={() => setShowSearchResults(false)}
                  >
                    {result.cover_id ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${result.cover_id}-S.jpg`}
                        alt={result.title}
                        className="search-result-cover"
                      />
                    ) : (
                      <div className="search-result-cover-placeholder">
                        {result.title.charAt(0)}
                      </div>
                    )}
                    <div className="search-result-info">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-author">
                        {result.authors.join(', ')}
                      </div>
                      {result.first_publish_year && (
                        <div className="search-result-year">{result.first_publish_year}</div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Currently Reading Section */}
        {currentlyReading.length > 0 && (
          <section className="currently-reading-section">
            <h2>Currently Reading</h2>
            <div className="currently-reading-grid">
              {currentlyReading.map(book => (
                <div key={book.id} className="reading-card">
                  <Link to={`/book/${book.bookId}`} className="book-cover-link">
                    {book.covers && book.covers.length > 0 ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                        alt={book.title}
                        className="book-cover"
                      />
                    ) : (
                      <div className="book-cover-placeholder">
                        <span>{book.title}</span>
                      </div>
                    )}
                  </Link>
                  <div className="reading-card-info">
                    <Link to={`/book/${book.bookId}`} className="book-title">
                      {book.title}
                    </Link>
                    <p className="book-authors">
                      {book.authors?.join(', ') || 'Unknown Author'}
                    </p>
                    {book.startedAt && (
                      <p className="reading-since">
                        Started {new Date(book.startedAt.toDate()).toLocaleDateString()}
                      </p>
                    )}
                    <div className="reading-actions">
                      <button 
                        className="btn btn-small btn-finish"
                        onClick={() => finishBook(book)}
                        disabled={movingBook === book.id}
                      >
                        {movingBook === book.id ? 'Moving...' : 'Finish'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Shelves Grid */}
        <section className="shelves-section">
          <h2>My Shelves</h2>
          <div className="shelves-grid">
            {shelves.map(shelf => (
              <div key={shelf.id} className="shelf-card">
                <div className="shelf-header">
                  <h3>{shelf.name}</h3>
                  <span className="shelf-count">{shelf.books.length} books</span>
                </div>

                {shelf.books.length > 0 ? (
                  <div className="shelf-books">
                    {shelf.books.slice(0, 4).map(book => (
                      <Link
                        key={book.id}
                        to={`/book/${book.bookId}`}
                        className="shelf-book-cover"
                      >
                        {book.covers && book.covers.length > 0 ? (
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                            alt={book.title}
                          />
                        ) : (
                          <div className="shelf-book-placeholder">
                            {book.title.substring(0, 1)}
                          </div>
                        )}
                      </Link>
                    ))}
                    {shelf.books.length > 4 && (
                      <div className="shelf-more">
                        +{shelf.books.length - 4} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="shelf-empty">
                    <p>No books on this shelf yet</p>
                    <button className="btn btn-small btn-secondary">Browse Books</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Custom Shelf Button */}
          <button 
            className="btn btn-secondary add-shelf-btn"
            onClick={() => setShowNewShelfModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            Create New Shelf
          </button>
        </section>

        {/* Empty State */}
        {shelves.length === 0 && (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <rect x="8" y="12" width="48" height="40" strokeWidth="4" rx="4"/>
              <line x1="16" y1="24" x2="48" y2="24" strokeWidth="3"/>
              <line x1="16" y1="32" x2="40" y2="32" strokeWidth="3"/>
              <line x1="16" y1="40" x2="48" y2="40" strokeWidth="3"/>
            </svg>
            <h2>Start Your Reading Journey</h2>
            <p>Add books to your shelves to keep track of what you want to read, what you're reading, and what you've read.</p>
            <button className="btn btn-primary">Add Your First Book</button>
          </div>
        )}

        {/* Stack Match - AI Recommendations */}
        {currentUser && (
          <section className="stack-match-section">
            <StackMatch />
          </section>
        )}

        {/* New Shelf Modal */}
        {showNewShelfModal && (
          <div className="modal-overlay" onClick={() => setShowNewShelfModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New Shelf</h2>
                <button className="modal-close" onClick={() => setShowNewShelfModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p>Give your shelf a name. You can organize books however you like!</p>
                <div className="form-group">
                  <label htmlFor="shelf-name">Shelf Name</label>
                  <input
                    id="shelf-name"
                    type="text"
                    value={newShelfName}
                    onChange={(e) => setNewShelfName(e.target.value)}
                    placeholder="e.g., Favorites, To Buy, Classics..."
                    maxLength={50}
                    autoFocus
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowNewShelfModal(false)}
                  disabled={creatingShelf}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={createNewShelf}
                  disabled={!newShelfName.trim() || creatingShelf}
                >
                  {creatingShelf ? 'Creating...' : 'Create Shelf'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Library Borrowing Modal */}
        {showLibraryModal && bookToMarkAsRead && (
          <div className="modal-overlay">
            <div className="modal finish-book-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>📖 Finished Reading!</h2>
                <p className="finish-subtitle">Tell us about <strong>{bookToMarkAsRead.title}</strong></p>
              </div>
              <div className="modal-body">
                {/* Rating Section */}
                <div className="finish-section">
                  <label className="finish-label">Rate this book:</label>
                  <StarRating 
                    rating={finishBookRating}
                    onRatingChange={setFinishBookRating}
                    size={32}
                    interactive={true}
                  />
                  <small className="finish-hint">Optional - Share your rating with other readers</small>
                </div>

                {/* Review Section */}
                <div className="finish-section">
                  <label className="finish-label">Write a review (optional):</label>
                  <textarea
                    className="finish-review-input"
                    placeholder="What did you think? Share your thoughts with the community..."
                    value={finishBookReview}
                    onChange={(e) => setFinishBookReview(e.target.value)}
                    rows={4}
                    maxLength={1000}
                  />
                  <small className="finish-hint">{finishBookReview.length}/1000 characters</small>
                </div>

                {/* Library Question */}
                 <div className="finish-section">
                  <label className="finish-label">Did you borrow this from a library?</label>
                  <p className="finish-hint">
                    We'll track this to help you see how much you're saving!
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowLibraryModal(false)
                    setBookToMarkAsRead(null)
                    setFinishBookRating(0)
                    setFinishBookReview('')
                  }}
                  disabled={movingBook !== null}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => handleFinishBookSubmit(false)}
                  disabled={movingBook !== null}
                >
                  {movingBook ? 'Saving...' : 'I Own It'}
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleFinishBookSubmit(true)}
                  disabled={movingBook !== null}
                >
                  {movingBook ? 'Saving...' : 'From Library'}
                </button>
              </div>
            </div>
          </div>
        )}

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          initialMode={authModalMode}
        />

        <BarcodeScanner
          isOpen={showBarcodeScanner}
          onClose={() => {
            setShowBarcodeScanner(false)
            setScannedISBN('')
            setManualISBNEntry(false)
          }}
          onBarcodeDetected={handleBarcodeDetected}
        />
      </div>
    </div>
  )
}
