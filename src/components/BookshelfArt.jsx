import { useState, useMemo } from 'react'
import './BookshelfArt.css'

const SPINE_COLORS = [
  '#7C4DFF', '#448AFF', '#66BB6A', '#FFA726', '#EC407A',
  '#AB47BC', '#26C6DA', '#8D6E63', '#78909C', '#EF5350',
  '#42A5F5', '#26A69A', '#D4E157', '#FF7043', '#5C6BC0',
  '#29B6F6', '#9CCC65', '#FFCA28', '#F06292', '#26C6DA',
]

// Deterministic pseudo-random based on string seed
function seededRandom(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return (hash % 1000) / 1000
}

function getSpineProps(book) {
  const seed = book.bookId || book.title || String(Math.random())
  const r1 = seededRandom(seed)
  const r2 = seededRandom(seed + 'w')
  const r3 = seededRandom(seed + 'c')
  return {
    height: 110 + Math.floor(r1 * 80),   // 110–190px
    width: 24 + Math.floor(r2 * 18),      // 24–42px
    color: SPINE_COLORS[Math.floor(r3 * SPINE_COLORS.length)],
  }
}

function getFilteredBooks(books, filter) {
  const now = new Date()
  return books.filter(book => {
    const ts = book.completedAt || book.createdAt
    if (!ts) return filter === 'year' // include undated in year view
    const date = ts.toDate ? ts.toDate() : new Date(ts)
    if (filter === 'week') {
      const weekAgo = new Date(now)
      weekAgo.setDate(now.getDate() - 7)
      return date >= weekAgo
    }
    if (filter === 'month') {
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }
    // year
    return date.getFullYear() === now.getFullYear()
  })
}

export default function BookshelfArt({ books = [] }) {
  const [filter, setFilter] = useState('year')

  const filtered = useMemo(() => getFilteredBooks(books, filter), [books, filter])

  const counts = useMemo(() => ({
    week: getFilteredBooks(books, 'week').length,
    month: getFilteredBooks(books, 'month').length,
    year: getFilteredBooks(books, 'year').length,
  }), [books])

  return (
    <div className="bookshelf-art">
      <div className="bookshelf-art-header">
        <h3>My Reading Year</h3>
        <div className="bookshelf-art-filters">
          {[
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'year', label: 'This Year' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`shelf-filter-btn${filter === key ? ' active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className="shelf-filter-count">{counts[key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bookshelf-art-scene">
        <div className="bookshelf-art-rail">
          {filtered.length === 0 ? (
            <div className="bookshelf-art-empty">
              <span>No books read {filter === 'week' ? 'this week' : filter === 'month' ? 'this month' : 'this year'} yet</span>
            </div>
          ) : (
            filtered.map(book => {
              const { height, width, color } = getSpineProps(book)
              return (
                <div
                  key={book.id || book.bookId}
                  className="book-spine"
                  style={{ height, width, backgroundColor: color }}
                  title={`${book.title}${book.authors?.length ? ' — ' + book.authors[0] : ''}`}
                >
                  <span className="spine-title">{book.title}</span>
                </div>
              )
            })
          )}
        </div>
        <div className="bookshelf-art-plank" />
      </div>

      {filtered.length > 0 && (
        <p className="bookshelf-art-count">
          {filtered.length} book{filtered.length !== 1 ? 's' : ''} read
        </p>
      )}
    </div>
  )
}
