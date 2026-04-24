import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase/config'
import { doc, getDoc, collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, deleteDoc, updateDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import StarRating from '../../components/StarRating'
import ReviewForm from '../../components/ReviewForm'
import AuthModal from '../../components/AuthModal'
import SimilarBooks from '../../components/SimilarBooks'
import BookCover from '../../components/BookCover'
import './BookDetail.css'

export default function BookDetail() {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [ratings, setRatings] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [addingToShelf, setAddingToShelf] = useState(null)
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [pendingShelf, setPendingShelf] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [showShelfSelector, setShowShelfSelector] = useState(false)
  const [userShelves, setUserShelves] = useState([])
  const [currentShelfId, setCurrentShelfId] = useState(null)
  const [bookShelfIds, setBookShelfIds] = useState([])
  const [showNewShelfForm, setShowNewShelfForm] = useState(false)
  const [newShelfName, setNewShelfName] = useState('')
  const [editingReview, setEditingReview] = useState(null)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [bookSearchQuery, setBookSearchQuery] = useState('')
  const [bookSearchResults, setBookSearchResults] = useState([])
  const [isBookSearching, setIsBookSearching] = useState(false)
  const [showBookSearchResults, setShowBookSearchResults] = useState(false)
  const { currentUser, userProfile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadBookDetails()
  }, [bookId])

  useEffect(() => {
    if (currentUser && book) {
      loadUserShelvesAndBookStatus()
    }
  }, [currentUser, book])

  // Debounced book search
  useEffect(() => {
    if (bookSearchQuery.length < 3) {
      setBookSearchResults([])
      setShowBookSearchResults(false)
      return
    }
    const timer = setTimeout(async () => {
      setIsBookSearching(true)
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(bookSearchQuery)}&limit=5`
        )
        const data = await res.json()
        const results = (data.docs || []).map(d => ({
          key: d.key,
          title: d.title,
          authors: d.author_name || [],
          cover_id: d.cover_i,
          first_publish_year: d.first_publish_year
        }))
        setBookSearchResults(results)
        setShowBookSearchResults(true)
      } catch (e) {
        console.error('Book search error:', e)
      } finally {
        setIsBookSearching(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [bookSearchQuery])

  async function loadUserShelvesAndBookStatus() {
    if (!currentUser || !book) return

    try {
      // Load all user shelves
      const shelvesRef = collection(db, 'users', currentUser.uid, 'shelves')
      const shelvesSnapshot = await getDocs(shelvesRef)
      const loadedShelves = shelvesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUserShelves(loadedShelves.sort((a, b) => (a.order || 0) - (b.order || 0)))

      // Check which shelves contain this book
      const defaultShelves = ['want-to-read', 'reading', 'read', 'didnt-finish']
      const shelfIds = []
      let currentDefault = null

      for (const shelf of loadedShelves) {
        const booksRef = collection(db, 'users', currentUser.uid, 'shelves', shelf.id, 'books')
        const booksQuery = query(booksRef, where('bookId', '==', book.id))
        const booksSnapshot = await getDocs(booksQuery)
        
        if (!booksSnapshot.empty) {
          shelfIds.push(shelf.id)
          if (defaultShelves.includes(shelf.id)) {
            currentDefault = shelf.id
          }
        }
      }

      setBookShelfIds(shelfIds)
      setCurrentShelfId(currentDefault)
    } catch (error) {
      console.error('Error loading shelf status:', error)
    }
  }

  async function loadBookDetails() {
    try {
      setLoading(true)

      // Try to load from Open Library API first
      const response = await fetch(`https://openlibrary.org/works/${bookId}.json`)
      
      if (response.ok) {
        const bookData = await response.json()
        
        // Get author details
        let authors = []
        if (bookData.authors) {
          const authorPromises = bookData.authors.map(async (author) => {
            const authorKey = author.author.key
            const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`)
            if (authorRes.ok) {
              const authorData = await authorRes.json()
              return authorData.name
            }
            return 'Unknown Author'
          })
          authors = await Promise.all(authorPromises)
        }

        setBook({
          id: bookId,
          title: bookData.title,
          authors: authors,
          description: typeof bookData.description === 'string' 
            ? bookData.description 
            : bookData.description?.value || 'No description available.',
          covers: bookData.covers || [],
          subjects: bookData.subjects?.slice(0, 5) || []
        })
      } else {
        // If not in Open Library, try to load from our database
        const bookDoc = await getDoc(doc(db, 'books', bookId))
        if (bookDoc.exists()) {
          setBook({ id: bookDoc.id, ...bookDoc.data() })
        } else {
          setBook(null)
        }
      }

      // Load ratings statistics
      const ratingsDoc = await getDoc(doc(db, 'bookRatings', bookId))
      if (ratingsDoc.exists()) {
        setRatings(ratingsDoc.data())
      }

      // Load reviews
      const reviewsRef = collection(db, 'reviews')
      const reviewsQuery = query(
        reviewsRef,
        where('bookId', '==', bookId)
      )
      const reviewsSnapshot = await getDocs(reviewsQuery)
      const rawReviews = reviewsSnapshot.docs.map(d => ({ id: d.id, ...d.data() }))

      // Fetch profile pictures for each unique reviewer
      const uniqueUserIds = [...new Set(rawReviews.map(r => r.userId).filter(Boolean))]
      const profileMap = {}
      await Promise.all(
        uniqueUserIds.map(async uid => {
          try {
            const userSnap = await getDoc(doc(db, 'users', uid))
            if (userSnap.exists()) profileMap[uid] = userSnap.data().profilePictureUrl || null
          } catch { /* ignore */ }
        })
      )
      setReviews(rawReviews.map(r => ({ ...r, profilePictureUrl: profileMap[r.userId] || null })))

    } catch (error) {
      console.error('Error loading book details:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addToShelf(shelfId) {
    // Check authentication first
    if (!currentUser) {
      setShowAuthModal(true)
      setAuthModalMode('login')
      return
    }

    if (!book) return

    // If adding to "read" shelf, show library borrowing modal first
    if (shelfId === 'read') {
      setPendingShelf(shelfId)
      setShowLibraryModal(true)
      return
    }

    // For other shelves, add directly
    await performAddToShelf(shelfId, false)
  }

  async function handleLibraryResponse(borrowedFromLibrary) {
    if (!pendingShelf) return
    await performAddToShelf(pendingShelf, borrowedFromLibrary)
    setShowLibraryModal(false)
    setPendingShelf(null)
  }

  async function performAddToShelf(shelfId, borrowedFromLibrary) {
    if (!currentUser || !book) return

    try {
      setAddingToShelf(shelfId)

      const defaultShelves = ['want-to-read', 'reading', 'read', 'didnt-finish']
      const isDefaultShelf = defaultShelves.includes(shelfId)

      // If adding to a default shelf, remove from other default shelves first
      if (isDefaultShelf) {
        for (const defaultShelf of defaultShelves) {
          if (defaultShelf !== shelfId) {
            try {
              const shelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', defaultShelf, 'books')
              const booksQuery = query(shelfBooksRef, where('bookId', '==', book.id))
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
      }

      // Determine timestamp based on shelf
      const timestamps = {
        addedAt: serverTimestamp()
      }

      if (shelfId === 'reading') {
        timestamps.startedAt = serverTimestamp()
      } else if (shelfId === 'read') {
        timestamps.completedAt = serverTimestamp()
        timestamps.borrowedFromLibrary = borrowedFromLibrary
      }

      // Add book to user's shelf (check for duplicate first)
      const shelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', shelfId, 'books')
      const dupCheck = await getDocs(query(shelfBooksRef, where('bookId', '==', book.id)))
      if (!dupCheck.empty) {
        alert(`"${book.title}" is already on this shelf!`)
        await loadUserShelvesAndBookStatus()
        return
      }
      await addDoc(shelfBooksRef, {
        bookId: book.id,
        title: book.title,
        authors: book.authors || [],
        covers: book.covers || [],
        ...timestamps
      })

      alert(`Added "${book.title}" to ${shelfId === 'want-to-read' ? 'Want to Read' : shelfId === 'didnt-finish' ? "Didn't Finish" : shelfId.charAt(0).toUpperCase() + shelfId.slice(1)}`)

      // Reload shelf status
      await loadUserShelvesAndBookStatus()

    } catch (error) {
      console.error('Error adding to shelf:', error)
      alert('Failed to add book to shelf. Please try again.')
    } finally {
      setAddingToShelf(null)
    }
  }

  function handleReviewSuccess() {
    setShowReviewForm(false)
    setEditingReview(null)
    loadBookDetails() // Reload to show new review
  }

  async function handleLikeReview(reviewId) {
    if (!currentUser) {
      setShowAuthModal(true)
      return
    }
    try {
      const reviewRef = doc(db, 'reviews', reviewId)
      const reviewDoc = await getDoc(reviewRef)
      if (!reviewDoc.exists()) return
      
      const data = reviewDoc.data()
      const likedBy = data.likedBy || []
      
      if (likedBy.includes(currentUser.uid)) {
        // Unlike
        await updateDoc(reviewRef, {
          likedBy: arrayRemove(currentUser.uid),
          likesCount: Math.max((data.likesCount || 0) - 1, 0)
        })
      } else {
        // Like
        await updateDoc(reviewRef, {
          likedBy: arrayUnion(currentUser.uid),
          likesCount: (data.likesCount || 0) + 1
        })
      }
      loadBookDetails()
    } catch (error) {
      console.error('Error liking review:', error)
    }
  }

  async function handleDeleteReview(reviewId) {
    if (!window.confirm('Are you sure you want to delete this review?')) return
    try {
      await deleteDoc(doc(db, 'reviews', reviewId))
      loadBookDetails()
    } catch (error) {
      console.error('Error deleting review:', error)
      alert('Failed to delete review.')
    }
  }

  function handleEditReview(review) {
    setEditingReview(review)
    setShowReviewForm(true)
  }

  async function handleCreateNewShelf() {
    if (!currentUser || !newShelfName.trim()) return

    try {
      const shelfId = newShelfName.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      const shelfRef = doc(db, 'users', currentUser.uid, 'shelves', shelfId)
      
      await setDoc(shelfRef, {
        id: shelfId,
        name: newShelfName.trim(),
        isDefault: false,
        order: userShelves.length + 1,
        createdAt: serverTimestamp()
      })

      setNewShelfName('')
      setShowNewShelfForm(false)
      await loadUserShelvesAndBookStatus()
    } catch (error) {
      console.error('Error creating shelf:', error)
      alert('Failed to create shelf. Please try again.')
    }
  }

  async function toggleBookOnShelf(shelfId) {
    if (!currentUser || !book) return

    const isOnShelf = bookShelfIds.includes(shelfId)

    if (isOnShelf) {
      // Remove from shelf
      try {
        const booksRef = collection(db, 'users', currentUser.uid, 'shelves', shelfId, 'books')
        const booksQuery = query(booksRef, where('bookId', '==', book.id))
        const booksSnapshot = await getDocs(booksQuery)
        
        for (const bookDoc of booksSnapshot.docs) {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'shelves', shelfId, 'books', bookDoc.id))
        }

        await loadUserShelvesAndBookStatus()
      } catch (error) {
        console.error('Error removing from shelf:', error)
        alert('Failed to remove from shelf.')
      }
    } else {
      // Add to shelf
      const defaultShelves = ['want-to-read', 'reading', 'read', 'didnt-finish']
      
      if (defaultShelves.includes(shelfId) && shelfId === 'read') {
        // For "read" shelf, show library modal
        setPendingShelf(shelfId)
        setShowShelfSelector(false)
        setShowLibraryModal(true)
      } else {
        await performAddToShelf(shelfId, false)
      }
    }
  }

  if (loading) {
    return (
      <div className="book-detail-page">
        <div className="loading">Loading book details...</div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="book-detail-page">
        <div className="error-state">
          <h2>Book Not Found</h2>
          <p>We couldn't find the book you're looking for.</p>
          <Link to="/shelves" className="btn btn-primary">Go to My Shelves</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="book-detail-page">
      {/* Search bar */}
      <div className="book-detail-search-bar">
        <div className="book-search-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            placeholder="Search for another book..."
            value={bookSearchQuery}
            onChange={(e) => setBookSearchQuery(e.target.value)}
            onFocus={() => bookSearchQuery.length >= 3 && setShowBookSearchResults(true)}
            onBlur={() => setTimeout(() => setShowBookSearchResults(false), 200)}
            className="book-search-input"
          />
          {isBookSearching && <span className="book-search-loading">Searching...</span>}
        </div>
        {showBookSearchResults && bookSearchResults.length > 0 && (
          <div className="book-search-dropdown">
            {bookSearchResults.map(result => (
              <Link
                key={result.key}
                to={`/book/${result.key.replace('/works/', '')}`}
                className="book-search-result"
                onClick={() => { setBookSearchQuery(''); setShowBookSearchResults(false) }}
              >
                {result.cover_id ? (
                  <BookCover
                    coverId={result.cover_id}
                    title={result.title}
                    authors={result.authors}
                    size="S"
                    className="book-search-cover"
                  />
                ) : (
                  <div className="book-search-cover-placeholder">{result.title.charAt(0)}</div>
                )}
                <div>
                  <div className="book-search-title">{result.title}</div>
                  <div className="book-search-author">{result.authors.join(', ')}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="book-detail-container">
        {/* Book Header */}
        <div className="book-header">
          <div className="book-cover-section">
            <BookCover
              coverId={book.covers?.[0]}
              title={book.title}
              authors={book.authors}
              size="L"
              className="book-detail-cover"
            />
          </div>

          <div className="book-info-section">
            <h1>{book.title}</h1>
            <p className="book-authors-large">
              by {book.authors?.join(', ') || 'Unknown Author'}
            </p>

            {/* Rating Display */}
            {ratings && ratings.totalRatings > 0 && (
              <div className="book-rating-summary">
                <div className="avg-rating">
                  <span className="rating-number">{ratings.averageRating.toFixed(2)}</span>
                  <StarRating rating={ratings.averageRating} size={20} />
                </div>
                <p className="ratings-count">{ratings.totalRatings} ratings</p>
              </div>
            )}

            {/* Add to Shelf Buttons */}
            {currentUser && (
              <div className="shelf-actions">
                <button 
                  className={`btn ${currentShelfId === 'want-to-read' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => addToShelf('want-to-read')}
                  disabled={addingToShelf !== null}
                >
                  {addingToShelf === 'want-to-read' ? 'Adding...' : 'Want to Read'}
                </button>
                <button 
                  className={`btn ${currentShelfId === 'reading' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => addToShelf('reading')}
                  disabled={addingToShelf !== null}
                >
                  {addingToShelf === 'reading' ? 'Adding...' : 'Reading'}
                </button>
                <button 
                  className={`btn ${currentShelfId === 'read' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => addToShelf('read')}
                  disabled={addingToShelf !== null}
                >
                  {addingToShelf === 'read' ? 'Adding...' : 'Read'}
                </button>
                <button 
                  className="btn btn-icon-only"
                  onClick={() => setShowShelfSelector(true)}
                  title="Add to more shelves"
                >
                  <span className="plus-icon">+</span>
                </button>
              </div>
            )}

            {!currentUser && (
              <p className="login-prompt">
                <Link to="/login">Log in</Link> to add this book to your shelves
              </p>
            )}
          </div>
        </div>

        {/* Book Description */}
        <section className="book-description-section">
          <h2>About this book</h2>
          <p className="book-description">{book.description}</p>
          
          {book.subjects && book.subjects.length > 0 && (
            <div className="book-subjects">
              <h3>Genres & Subjects</h3>
              <div className="subjects-tags">
                {book.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">{subject}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Rating Distribution */}
        {ratings && ratings.totalRatings > 0 && (
          <section className="ratings-distribution-section">
            <h2>Rating Distribution</h2>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map(stars => {
                const count = ratings[`${stars}stars`] || 0
                const percentage = (count / ratings.totalRatings) * 100
                return (
                  <div key={stars} className="rating-bar-row">
                    <span className="bar-label">{stars} stars</span>
                    <div className="bar-container">
                      <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="bar-count">{count}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="reviews-section">
          <h2>Reviews ({reviews.length})</h2>
          
          {currentUser && (
            <button 
              className="btn btn-primary write-review-btn"
              onClick={() => { setEditingReview(null); setShowReviewForm(true) }}
            >
              Write a Review
            </button>
          )}

          {reviews.length > 0 ? (
            <div className="reviews-list">
              {(() => {
                // Sort by likes (most liked first), then by date
                const sorted = [...reviews].sort((a, b) => {
                  const aLikes = a.likesCount || 0
                  const bLikes = b.likesCount || 0
                  if (bLikes !== aLikes) return bLikes - aLikes
                  const aTime = a.createdAt?.seconds || 0
                  const bTime = b.createdAt?.seconds || 0
                  return bTime - aTime
                })
                const displayed = showAllReviews ? sorted : sorted.slice(0, 3)
                return (
                  <>
                    {displayed.map((review, index) => {
                      const isAuthor = currentUser && review.userId === currentUser.uid
                      const isLiked = currentUser && (review.likedBy || []).includes(currentUser.uid)
                      return (
                        <div key={review.id} className="review-card">
                          <div className="review-header">
                            <Link to={`/user/${review.username}`} className="reviewer-info">
                              {review.profilePictureUrl ? (
                                <img src={review.profilePictureUrl} alt={review.username} className="reviewer-avatar" />
                              ) : (
                                <div className="reviewer-avatar reviewer-avatar-placeholder">
                                  {(review.username || '?').charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="reviewer-name">{review.username}</span>
                            </Link>
                            <StarRating rating={review.rating} size={18} />
                          </div>
                          <p className="review-text">{review.reviewText}</p>
                          <div className="review-footer">
                            <p className="review-date">
                              {review.createdAt && new Date(review.createdAt.toDate()).toLocaleDateString()}
                              {review.updatedAt && review.updatedAt.seconds !== review.createdAt?.seconds && ' (edited)'}
                            </p>
                            <div className="review-actions">
                              <button
                                className={`review-like-btn ${isLiked ? 'liked' : ''}`}
                                onClick={() => handleLikeReview(review.id)}
                                title={isLiked ? 'Unlike' : 'Like'}
                              >
                                {isLiked ? '❤️' : '🤍'} {review.likesCount || 0}
                              </button>
                              {isAuthor && (
                                <>
                                  <button
                                    className="review-edit-btn"
                                    onClick={() => handleEditReview(review)}
                                    title="Edit review"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    className="review-delete-btn"
                                    onClick={() => handleDeleteReview(review.id)}
                                    title="Delete review"
                                  >
                                    🗑️
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {!showAllReviews && sorted.length > 3 && (
                      <button
                        className="btn btn-secondary show-more-reviews-btn"
                        onClick={() => setShowAllReviews(true)}
                      >
                        Show All Reviews ({sorted.length - 3} more)
                      </button>
                    )}
                    {showAllReviews && sorted.length > 3 && (
                      <button
                        className="btn btn-secondary show-more-reviews-btn"
                        onClick={() => setShowAllReviews(false)}
                      >
                        Show Less
                      </button>
                    )}
                  </>
                )
              })()}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review this book!</p>
          )}
        </section>

        {/* Similar Books Section */}
        <SimilarBooks book={book} />
      </div>

      {/* Review Form Modal */}
      {showReviewForm && currentUser && (
        <ReviewForm
          bookId={bookId}
          bookTitle={book.title}
          userId={currentUser.uid}
          username={userProfile?.username}
          existingReview={editingReview}
          onClose={() => { setShowReviewForm(false); setEditingReview(null) }}
          onSuccess={handleReviewSuccess}
        />
      )}

      {/* Library Borrowing Modal */}
      {showLibraryModal && book && (
        <div className="modal-overlay">
          <div className="modal library-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📚 Did you borrow this book?</h2>
            </div>
            <div className="modal-body">
              <p className="library-question">
                Did you borrow <strong>{book.title}</strong> from a library?
              </p>
              <p className="library-hint">
                We'll track this to help you see how much you're saving by using your library!
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => handleLibraryResponse(false)}
                disabled={addingToShelf !== null}
              >
                {addingToShelf ? 'Saving...' : 'No, I Own It'}
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleLibraryResponse(true)}
                disabled={addingToShelf !== null}
              >
                {addingToShelf ? 'Saving...' : 'Yes, From Library'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shelf Selector Modal */}
      {showShelfSelector && book && (
        <div className="modal-overlay" onClick={() => setShowShelfSelector(false)}>
          <div className="modal shelf-selector-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add to Shelves</h2>
              <button className="modal-close-btn" onClick={() => setShowShelfSelector(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">Choose which shelves to add <strong>{book.title}</strong> to:</p>
              
              <div className="shelves-list">
                {userShelves.map(shelf => {
                  const isOnShelf = bookShelfIds.includes(shelf.id)
                  const isDefault = ['want-to-read', 'reading', 'read', 'didnt-finish'].includes(shelf.id)
                  
                  return (
                    <label key={shelf.id} className="shelf-item">
                      <input
                        type="checkbox"
                        checked={isOnShelf}
                        onChange={() => toggleBookOnShelf(shelf.id)}
                        disabled={addingToShelf !== null}
                      />
                      <span className="shelf-name">{shelf.name}</span>
                      {isDefault && <span className="shelf-badge">Default</span>}
                    </label>
                  )
                })}
              </div>

              {!showNewShelfForm ? (
                <button 
                  className="btn btn-secondary btn-full create-shelf-btn"
                  onClick={() => setShowNewShelfForm(true)}
                >
                  + Create New Shelf
                </button>
              ) : (
                <div className="new-shelf-form">
                  <input
                    type="text"
                    placeholder="Shelf name..."
                    value={newShelfName}
                    onChange={(e) => setNewShelfName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateNewShelf()}
                    autoFocus
                  />
                  <div className="new-shelf-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowNewShelfForm(false)
                        setNewShelfName('')
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleCreateNewShelf}
                      disabled={!newShelfName.trim()}
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
      />
    </div>
  )
}
