import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase/config'
import { collection, addDoc, doc, setDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import './GoodreadsImport.css'

/**
 * Parse a CSV string handling quoted fields with commas
 */
function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

/**
 * Map Goodreads shelf name to Stacks shelf
 */
function mapShelf(goodreadsShelf) {
  const lower = (goodreadsShelf || '').toLowerCase().trim()
  if (lower === 'read') return 'read'
  if (lower === 'currently-reading') return 'reading'
  if (lower === 'to-read') return 'want-to-read'
  return null // Skip unknown shelves
}

export default function GoodreadsImport({ onComplete }) {
  const { currentUser, userProfile } = useAuth()
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  async function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file from Goodreads.')
      return
    }

    try {
      setImporting(true)
      setError(null)
      setResults(null)

      const text = await file.text()
      const lines = text.split('\n').filter(l => l.trim())
      if (lines.length < 2) {
        setError('CSV file appears to be empty.')
        return
      }

      // Parse header
      const headers = parseCSVLine(lines[0])
      const titleIdx = headers.findIndex(h => h.toLowerCase() === 'title')
      const authorIdx = headers.findIndex(h => h.toLowerCase() === 'author')
      const isbnIdx = headers.findIndex(h => h.toLowerCase() === 'isbn' || h.toLowerCase() === 'isbn13')
      const ratingIdx = headers.findIndex(h => h.toLowerCase() === 'my rating')
      const shelfIdx = headers.findIndex(h => h.toLowerCase() === 'exclusive shelf')
      const reviewIdx = headers.findIndex(h => h.toLowerCase() === 'my review')
      const dateReadIdx = headers.findIndex(h => h.toLowerCase() === 'date read')

      if (titleIdx === -1) {
        setError('Could not find "Title" column in CSV. Make sure this is a Goodreads export.')
        return
      }

      const books = []
      for (let i = 1; i < lines.length; i++) {
        const fields = parseCSVLine(lines[i])
        if (fields.length <= titleIdx) continue

        const title = fields[titleIdx]
        if (!title) continue

        books.push({
          title,
          author: authorIdx >= 0 ? fields[authorIdx] : '',
          isbn: isbnIdx >= 0 ? fields[isbnIdx].replace(/[="]/g, '') : '',
          rating: ratingIdx >= 0 ? parseInt(fields[ratingIdx]) || 0 : 0,
          shelf: shelfIdx >= 0 ? fields[shelfIdx] : '',
          review: reviewIdx >= 0 ? fields[reviewIdx] : '',
          dateRead: dateReadIdx >= 0 ? fields[dateReadIdx] : ''
        })
      }

      setProgress({ current: 0, total: books.length })

      let imported = 0
      let skipped = 0
      let errors = 0

      for (let i = 0; i < books.length; i++) {
        const book = books[i]
        setProgress({ current: i + 1, total: books.length })

        const shelfId = mapShelf(book.shelf)
        if (!shelfId) {
          skipped++
          continue
        }

        try {
          // Check if book already exists in this shelf
          const shelfBooksRef = collection(db, 'users', currentUser.uid, 'shelves', shelfId, 'books')
          const existing = await getDocs(
            query(shelfBooksRef, where('title', '==', book.title))
          )
          if (!existing.empty) {
            skipped++
            continue
          }

          // Look up book on Open Library for cover and work ID
          let coverId = null
          let workKey = null
          try {
            const searchQuery = book.isbn || book.title
            const res = await fetch(
              `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=1`
            )
            const data = await res.json()
            if (data.docs && data.docs.length > 0) {
              coverId = data.docs[0].cover_i
              workKey = data.docs[0].key
            }
          } catch {
            // OK to skip cover lookup
          }

          const bookData = {
            bookId: workKey ? workKey.replace('/works/', '') : book.title.toLowerCase().replace(/\s+/g, '-'),
            title: book.title,
            authors: book.author ? [book.author] : [],
            covers: coverId ? [coverId] : [],
            addedAt: serverTimestamp(),
            importedFrom: 'goodreads'
          }

          if (shelfId === 'read' && book.dateRead) {
            bookData.completedAt = serverTimestamp()
          }
          if (shelfId === 'reading') {
            bookData.startedAt = serverTimestamp()
          }

          await addDoc(shelfBooksRef, bookData)

          // Save review if present
          if (book.review && book.review.trim() && book.rating > 0) {
            await addDoc(collection(db, 'reviews'), {
              bookId: bookData.bookId,
              userId: currentUser.uid,
              username: (userProfile?.username || 'anonymous').toLowerCase(),
              rating: book.rating,
              reviewText: book.review.trim(),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              likesCount: 0,
              likedBy: [],
              importedFrom: 'goodreads'
            })
          } else if (book.rating > 0) {
            // Save rating even without review
            await addDoc(collection(db, 'ratings'), {
              bookId: bookData.bookId,
              userId: currentUser.uid,
              rating: book.rating,
              createdAt: serverTimestamp()
            })
          }

          imported++
        } catch (err) {
          console.error(`Error importing "${book.title}":`, err)
          errors++
        }
      }

      setResults({ imported, skipped, errors, total: books.length })
    } catch (err) {
      console.error('Import error:', err)
      setError('Failed to import. Please check your file and try again.')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="goodreads-import">
      <h3>📚 Import from Goodreads</h3>
      <p className="import-instructions">
        Export your Goodreads library as CSV from{' '}
        <a href="https://www.goodreads.com/review/import" target="_blank" rel="noopener noreferrer">
          goodreads.com/review/import
        </a>
        , then upload it here.
      </p>

      {error && <div className="import-error">{error}</div>}

      {!importing && !results && (
        <label className="import-upload-btn">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <span className="btn btn-primary">Choose CSV File</span>
        </label>
      )}

      {importing && (
        <div className="import-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.current / Math.max(progress.total, 1)) * 100}%` }}
            />
          </div>
          <p>Importing {progress.current} of {progress.total} books...</p>
        </div>
      )}

      {results && (
        <div className="import-results">
          <h4>Import Complete!</h4>
          <ul>
            <li>✅ {results.imported} books imported</li>
            {results.skipped > 0 && <li>⏭️ {results.skipped} skipped (already exist or unknown shelf)</li>}
            {results.errors > 0 && <li>❌ {results.errors} failed</li>}
          </ul>
          <button className="btn btn-primary" onClick={() => { setResults(null); if (onComplete) onComplete() }}>
            Done
          </button>
        </div>
      )}
    </div>
  )
}
