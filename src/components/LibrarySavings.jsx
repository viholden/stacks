import { useState, useEffect } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import '../styles/LibrarySavings.css'

function LibrarySavings({ userId }) {
  const [loading, setLoading] = useState(true)
  const [savings, setSavings] = useState({
    totalBooks: 0,
    estimatedSavings: 0
  })

  useEffect(() => {
    if (!userId) return
    calculateSavings()
  }, [userId])

  async function calculateSavings() {
    try {
      setLoading(true)
      
      // Get all books from "read" shelf
      const readShelfBooksRef = collection(db, 'users', userId, 'shelves', 'read', 'books')
      const booksSnapshot = await getDocs(readShelfBooksRef)
      
      let totalBorrowed = 0
      let totalSavings = 0
      
      for (const bookDoc of booksSnapshot.docs) {
        const bookData = bookDoc.data()
        
        // Only count books borrowed from library
        if (bookData.borrowedFromLibrary === true) {
          totalBorrowed++
          
          // Estimate book price based on type
          // Since we don't have exact prices, we'll use industry averages:
          // Paperback: ~$15, Hardcover: ~$25, eBook: ~$10
          // We'll use a conservative average of $18 per book
          const estimatedPrice = 18
          totalSavings += estimatedPrice
        }
      }
      
      setSavings({
        totalBooks: totalBorrowed,
        estimatedSavings: totalSavings
      })
    } catch (error) {
      console.error('Error calculating library savings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="library-savings-card">
        <div className="savings-icon">💰</div>
        <h3>Library Savings</h3>
        <p className="loading-text">Calculating your savings...</p>
      </div>
    )
  }

  if (savings.totalBooks === 0) {
    return (
      <div className="library-savings-card">
        <div className="savings-icon">📚</div>
        <h3>Library Savings</h3>
        <p className="no-savings-text">
          Start borrowing books from the library and we'll track your savings here!
        </p>
      </div>
    )
  }

  return (
    <div className="library-savings-card">
      <div className="savings-icon">💰</div>
      <h3>Library Savings</h3>
      <div className="savings-stats">
        <div className="savings-stat">
          <div className="stat-value">{savings.totalBooks}</div>
          <div className="stat-label">Book{savings.totalBooks !== 1 ? 's' : ''} Borrowed</div>
        </div>
        <div className="savings-divider"></div>
        <div className="savings-stat highlight">
          <div className="stat-value">${savings.estimatedSavings.toFixed(2)}</div>
          <div className="stat-label">Estimated Saved</div>
        </div>
      </div>
      <p className="savings-note">
        Based on an average book price of $18. Keep borrowing to increase your savings!
      </p>
    </div>
  )
}

export default LibrarySavings
