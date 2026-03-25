import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../../firebase/config'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import './UserProfile.css'

export default function UserProfile() {
  const { username } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [shelves, setShelves] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserProfile()
  }, [username])

  async function loadUserProfile() {
    try {
      setLoading(true)

      // Get user ID from username
      const usernamesRef = collection(db, 'usernames')
      const usernameQuery = query(usernamesRef, where('__name__', '==', username.toLowerCase()))
      const usernameSnapshot = await getDocs(usernameQuery)

      if (usernameSnapshot.empty) {
        setUserProfile(null)
        setLoading(false)
        return
      }

      const userId = usernameSnapshot.docs[0].data().userId

      // Load user profile
      const usersRef = collection(db, 'users')
      const userQuery = query(usersRef, where('uid', '==', userId))
      const userSnapshot = await getDocs(userQuery)

      if (!userSnapshot.empty) {
        setUserProfile(userSnapshot.docs[0].data())
      }

      // Load user's shelves (with books)
      const shelvesRef = collection(db, 'users', userId, 'shelves')
      const shelvesQuery = query(shelvesRef, orderBy('order', 'asc'))
      const shelvesSnapshot = await getDocs(shelvesQuery)

      const shelvesData = []
      for (const shelfDoc of shelvesSnapshot.docs) {
        const shelfData = { id: shelfDoc.id, ...shelfDoc.data(), books: [] }

        // Get first 4 books from each shelf for preview
        const booksRef = collection(db, 'users', userId, 'shelves', shelfDoc.id, 'books')
        const booksQuery = query(booksRef, limit(4))
        const booksSnapshot = await getDocs(booksQuery)

        shelfData.books = booksSnapshot.docs.map(bookDoc => ({
          id: bookDoc.id,
          ...bookDoc.data()
        }))

        shelvesData.push(shelfData)
      }

      setShelves(shelvesData)

      // Load user's reviews
      const reviewsRef = collection(db, 'reviews')
      const reviewsQuery = query(
        reviewsRef,
        where('username', '==', username.toLowerCase()),
        orderBy('createdAt', 'desc'),
        limit(10)
      )
      const reviewsSnapshot = await getDocs(reviewsQuery)
      setReviews(reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

    } catch (error) {
      console.error('Error loading user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="user-profile-page">
        <div className="error-state">
          <h2>User Not Found</h2>
          <p>We couldn't find a user with the username "{username}".</p>
          <Link to="/shelves" className="btn btn-primary">Go to My Shelves</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {userProfile.photoURL ? (
              <img src={userProfile.photoURL} alt={userProfile.displayName} />
            ) : (
              <div className="avatar-placeholder">
                {userProfile.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{userProfile.displayName}</h1>
            <p className="username">@{username}</p>
            {userProfile.bio && (
              <p className="bio">{userProfile.bio}</p>
            )}
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{shelves.reduce((acc, shelf) => acc + shelf.books.length, 0)}</span>
                <span className="stat-label">Books</span>
              </div>
              <div className="stat">
                <span className="stat-number">{reviews.length}</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shelves Section */}
        {shelves.length > 0 && (
          <section className="profile-shelves-section">
            <h2>Bookshelves</h2>
            <div className="shelves-grid">
              {shelves.map(shelf => (
                <div key={shelf.id} className="shelf-preview-card">
                  <div className="shelf-preview-header">
                    <h3>{shelf.name}</h3>
                    <span className="shelf-count">{shelf.books.length} books</span>
                  </div>
                  {shelf.books.length > 0 ? (
                    <div className="shelf-preview-covers">
                      {shelf.books.map(book => (
                        <Link
                          key={book.id}
                          to={`/book/${book.bookId}`}
                          className="preview-cover"
                        >
                          {book.covers && book.covers.length > 0 ? (
                            <img
                              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                              alt={book.title}
                            />
                          ) : (
                            <div className="preview-cover-placeholder">
                              {book.title.charAt(0)}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="shelf-empty-message">No books yet</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="profile-reviews-section">
            <h2>Recent Reviews</h2>
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="profile-review-card">
                  <div className="review-book-info">
                    <Link to={`/book/${review.bookId}`} className="review-book-title">
                      Book: {review.bookId}
                    </Link>
                    <div className="review-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-text">{review.reviewText}</p>
                  <p className="review-date">
                    {review.createdAt && new Date(review.createdAt.toDate()).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {shelves.length === 0 && reviews.length === 0 && (
          <div className="empty-state">
            <p>This user hasn't added any books or reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function renderStars(rating) {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={`full-${i}`} className="star star-full" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <svg key="half" className="star star-half" width="18" height="18" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="half-gradient-profile">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <path fill="url(#half-gradient-profile)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="star star-empty" width="18" height="18" viewBox="0 0 20 20" fill="#e2e8f0">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  }

  return stars
}
