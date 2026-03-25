import { useState } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, setDoc, query, where } from 'firebase/firestore'
import StarRating from './StarRating'
import './ReviewForm.css'

export default function ReviewForm({ 
  bookId, 
  bookTitle, 
  userId, 
  username, 
  existingReview = null, 
  onClose, 
  onSuccess 
}) {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [reviewText, setReviewText] = useState(existingReview?.reviewText || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    if (reviewText.trim().length < 10) {
      setError('Review must be at least 10 characters')
      return
    }

    try {
      setLoading(true)
      setError('')

      if (existingReview) {
        // Update existing review
        await updateDoc(doc(db, 'reviews', existingReview.id), {
          rating,
          reviewText: reviewText.trim(),
          updatedAt: serverTimestamp()
        })
      } else {
        // Create new review
        await addDoc(collection(db, 'reviews'), {
          bookId,
          userId,
          username: username.toLowerCase(),
          rating,
          reviewText: reviewText.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          likesCount: 0
        })
      }

      // Update book ratings aggregation
      await updateBookRatings(bookId)

      if (onSuccess) onSuccess()
      if (onClose) onClose()

    } catch (error) {
      console.error('Error saving review:', error)
      setError('Failed to save review. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function updateBookRatings(bookId) {
    try {
      // Get all reviews for this book
      const reviewsSnapshot = await getDocs(
        query(collection(db, 'reviews'), where('bookId', '==', bookId))
      )

      const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      let totalRating = 0
      let totalCount = 0

      reviewsSnapshot.forEach(doc => {
        const review = doc.data()
        const starCount = Math.round(review.rating)
        ratings[starCount]++
        totalRating += review.rating
        totalCount++
      })

      const averageRating = totalCount > 0 ? totalRating / totalCount : 0

      // Update or create bookRatings document
      await setDoc(doc(db, 'bookRatings', bookId), {
        '1stars': ratings[1],
        '2stars': ratings[2],
        '3stars': ratings[3],
        '4stars': ratings[4],
        '5stars': ratings[5],
        averageRating,
        totalRatings: totalCount,
        updatedAt: serverTimestamp()
      })

    } catch (error) {
      console.error('Error updating book ratings:', error)
    }
  }

  return (
    <div className="review-form-overlay" onClick={onClose}>
      <div className="review-form-modal" onClick={e => e.stopPropagation()}>
        <div className="review-form-header">
          <h2>{existingReview ? 'Edit Review' : 'Write a Review'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="review-book-title">
          <strong>{bookTitle}</strong>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Your Rating *</label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              size={32}
              interactive={true}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reviewText">Your Review *</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Share your thoughts about this book..."
              rows={6}
              maxLength={2000}
              required
            />
            <small>{reviewText.length} / 2000 characters</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : existingReview ? 'Update Review' : 'Post Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
