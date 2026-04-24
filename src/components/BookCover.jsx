import { useState, useEffect } from 'react'

// In-memory cache for Google Books cover URLs
const coverCache = new Map()

/**
 * Fetch cover from Google Books API.
 * Returns the highest-res image available, or null.
 */
async function fetchGoogleBooksCover(title, authors) {
  const key = `${title}|${(authors || []).join(',')}`
  if (coverCache.has(key)) return coverCache.get(key)

  try {
    const q = `intitle:${encodeURIComponent(title)}${authors?.[0] ? `+inauthor:${encodeURIComponent(authors[0])}` : ''}`
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=3&printType=books`
    )
    if (!res.ok) { coverCache.set(key, null); return null }
    const data = await res.json()

    // Find the first item that actually has an image
    let best = null
    for (const item of (data.items || [])) {
      const links = item.volumeInfo?.imageLinks
      if (!links) continue
      // Prefer the largest variant
      const raw = links.extraLarge || links.large || links.medium || links.small || links.thumbnail
      if (raw) {
        best = raw
          .replace('http://', 'https://')
          .replace('&edge=curl', '')
          .replace(/zoom=\d/, 'zoom=0')  // zoom=0 is the largest Google supports
        break
      }
    }

    coverCache.set(key, best)
    return best
  } catch {
    coverCache.set(key, null)
    return null
  }
}

/**
 * BookCover — shows the best available cover image.
 *
 * Priority:
 *   1. Open Library cover shown immediately (if coverId exists) — instant display
 *   2. Google Books cover fetched in background — replaces OL when ready (higher quality)
 *   3. OL cover kept as fallback if Google Books finds nothing
 *   4. Letter placeholder if both fail
 *
 * The `size` prop maps to Open Library suffixes: S / M / L
 */
export default function BookCover({ coverId, title, authors, size = 'M', className, style }) {
  const olUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    : null

  // Start with OL cover for instant render, upgrade to Google Books when ready
  const [src, setSrc] = useState(olUrl)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Reset to OL cover when book changes
    setSrc(olUrl)
    setFailed(false)

    if (!title) return

    // Always fetch Google Books in the background — it's higher quality
    let cancelled = false
    fetchGoogleBooksCover(title, authors).then(url => {
      if (cancelled) return
      if (url) {
        // Got a Google Books cover — use it
        setSrc(url)
      } else if (!olUrl) {
        // No Google Books cover and no OL cover — show placeholder
        setSrc(null)
      }
      // If no GB cover but OL exists, keep OL (already set above)
    })
    return () => { cancelled = true }
  }, [coverId, title, (authors || []).join(',')])

  if (!src || failed) {
    return (
      <div className={className || 'book-cover-placeholder'} style={style}>
        <span>{(title || '?').charAt(0)}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={title || 'Book cover'}
      className={className}
      style={style}
      onError={() => {
        // Current source failed — try the other one
        if (src !== olUrl && olUrl) {
          setSrc(olUrl)
        } else if (title) {
          fetchGoogleBooksCover(title, authors).then(url => {
            if (url) setSrc(url)
            else setFailed(true)
          })
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

