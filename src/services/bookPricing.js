// Book pricing service using Google Books API + Open Library fallback
// (No API key required for basic queries)

const priceCache = new Map()

/**
 * Estimate price from page count using trade paperback industry averages.
 */
function estimateFromPageCount(pageCount) {
  if (!pageCount || pageCount <= 0) return null
  // Trade paperback ~$0.05/page, min $9.99, max $35
  const raw = Math.round(pageCount * 0.05 * 100) / 100
  return Math.min(Math.max(raw, 9.99), 35.0)
}

/**
 * Fetch page count from Open Library using a works ID (e.g. "OL12345W").
 * Tries the first edition returned by the editions endpoint.
 */
async function getPageCountFromOL(olId) {
  if (!olId) return null
  try {
    const res = await fetch(
      `https://openlibrary.org/works/${olId}/editions.json?limit=3`
    )
    if (!res.ok) return null
    const data = await res.json()
    for (const entry of (data.entries || [])) {
      const pages = entry.number_of_pages
      if (pages && pages > 0) return pages
    }
  } catch { /* ignore */ }
  return null
}

/**
 * Look up book price from Google Books API, falling back to OL for page count.
 * @param {string} title
 * @param {string} [author]
 * @param {string} [isbn]
 * @param {string} [olId] - Open Library Works ID (e.g. "OL12345W")
 * @returns {Promise<number>} Price in USD (never null — always returns an estimate)
 */
export async function getBookPrice(title, author, isbn, olId) {
  const cacheKey = isbn || olId || `${title}|${author}`
  if (priceCache.has(cacheKey)) return priceCache.get(cacheKey)

  let price = null

  try {
    const query = isbn
      ? `isbn:${isbn}`
      : `intitle:${encodeURIComponent(title)}${author ? `+inauthor:${encodeURIComponent(author)}` : ''}`

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=3&printType=books`
    )
    if (res.ok) {
      const data = await res.json()
      for (const item of (data.items || [])) {
        const saleInfo = item.saleInfo
        const volumeInfo = item.volumeInfo

        // Best case: actual price from Google Play Books sale info
        if (saleInfo?.listPrice?.amount) {
          price = saleInfo.listPrice.amount
          break
        }
        if (saleInfo?.retailPrice?.amount) {
          price = saleInfo.retailPrice.amount
          break
        }
        // Good fallback: estimate from page count
        if (volumeInfo?.pageCount) {
          price = estimateFromPageCount(volumeInfo.pageCount)
          break
        }
      }
    }
  } catch { /* fall through to OL lookup */ }

  // If Google Books had nothing useful, try Open Library for page count
  if (price === null && olId) {
    const pageCount = await getPageCountFromOL(olId)
    price = estimateFromPageCount(pageCount)
  }

  // Final fallback: median trade paperback price
  if (price === null) {
    price = 14.99
  }

  priceCache.set(cacheKey, price)
  return price
}

/**
 * Get prices for multiple books in parallel (batched to avoid rate limits).
 * @param {Array} books - Array of {title, authors, isbn, bookId} objects
 * @returns {Promise<Map>} Map of book identifier -> price
 */
export async function getBulkBookPrices(books) {
  const BATCH_SIZE = 5
  const results = new Map()

  for (let i = 0; i < books.length; i += BATCH_SIZE) {
    const batch = books.slice(i, i + BATCH_SIZE)
    const prices = await Promise.all(
      batch.map(book => getBookPrice(book.title, book.authors?.[0], book.isbn, book.bookId))
    )
    batch.forEach((book, idx) => {
      results.set(book.id || book.bookId || book.title, prices[idx])
    })
  }

  return results
}
