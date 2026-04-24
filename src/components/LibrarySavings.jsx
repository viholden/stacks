import { useState, useEffect } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { getBookPrice } from '../services/bookPricing'
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
      
      const borrowedBooks = []
      for (const bookDoc of booksSnapshot.docs) {
        const bookData = bookDoc.data()
        if (bookData.borrowedFromLibrary === true) {
          totalBorrowed++
          borrowedBooks.push(bookData)
        }
      }
      
      // Look up real prices in parallel (batched)
      const BATCH = 5
      for (let i = 0; i < borrowedBooks.length; i += BATCH) {
        const batch = borrowedBooks.slice(i, i + BATCH)
        const prices = await Promise.all(
          batch.map(b => getBookPrice(b.title, b.authors?.[0], null, b.bookId))
        )
        prices.forEach(price => {
          totalSavings += price // getBookPrice always returns a value now
        })
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
    </div>
  )
}

export default LibrarySavings
