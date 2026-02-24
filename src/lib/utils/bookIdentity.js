/**
 * Generate a canonical ID for a book
 * Priority: ISBN-13 > ISBN-10 > Open Library ID > Title hash
 */
export function generateCanonicalId(book) {
  // Priority 1: ISBN-13
  if (book.isbn13) {
    return `isbn13:${book.isbn13.replace(/[-\s]/g, '')}`
  }
  
  // Priority 2: ISBN-10
  if (book.isbn) {
    const isbn = book.isbn.replace(/[-\s]/g, '')
    // Check if it's actually an ISBN-13
    if (isbn.length === 13) {
      return `isbn13:${isbn}`
    }
    return `isbn10:${isbn}`
  }
  
  // Priority 3: Open Library ID
  if (book.openLibraryId) {
    return `olid:${book.openLibraryId}`
  }
  
  // Priority 4: Title hash (last resort)
  if (book.title && book.authors && book.authors.length > 0) {
    const normalized = `${book.title}-${book.authors[0]}`.toLowerCase().replace(/[^\w]/g, '')
    return `title:${hashString(normalized)}`
  }
  
  // Fallback: random ID
  return `temp:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Simple string hash function
 */
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Normalize ISBN to ISBN-13 format if possible
 */
export function normalizeISBN(isbn) {
  const cleaned = isbn.replace(/[-\s]/g, '')
  // If it's already ISBN-13, return it
  if (cleaned.length === 13) {
    return cleaned
  }
  // Return as-is for ISBN-10 or other formats
  return cleaned
}

/**
 * Check if two books are the same based on their identifiers
 */
export function areBooksEqual(book1, book2) {
  // Check ISBN-13
  if (book1.isbn13 && book2.isbn13) {
    return normalizeISBN(book1.isbn13) === normalizeISBN(book2.isbn13)
  }
  
  // Check ISBN-10
  if (book1.isbn && book2.isbn) {
    return normalizeISBN(book1.isbn) === normalizeISBN(book2.isbn)
  }
  
  // Check cross ISBN (one has ISBN-13, other has ISBN-10)
  if (book1.isbn13 && book2.isbn) {
    return normalizeISBN(book1.isbn13) === normalizeISBN(book2.isbn)
  }
  if (book1.isbn && book2.isbn13) {
    return normalizeISBN(book1.isbn) === normalizeISBN(book2.isbn13)
  }
  
  // Check Open Library ID
  if (book1.openLibraryId && book2.openLibraryId) {
    return book1.openLibraryId === book2.openLibraryId
  }
  
  // Check title + author (normalized)
  if (book1.title && book2.title && book1.authors?.[0] && book2.authors?.[0]) {
    const title1 = book1.title.toLowerCase().replace(/[^\w\s]/g, '').trim()
    const title2 = book2.title.toLowerCase().replace(/[^\w\s]/g, '').trim()
    const author1 = book1.authors[0].toLowerCase().replace(/[^\w\s]/g, '').trim()
    const author2 = book2.authors[0].toLowerCase().replace(/[^\w\s]/g, '').trim()
    
    return title1 === title2 && author1 === author2
  }
  
  return false
}

/**
 * Merge two book records, prioritizing library data over Open Library data
 * Library availability always takes precedence
 */
export function mergeBooks(libraryBook, openLibraryBook) {
  return {
    // Use canonical ID from library book
    canonicalId: libraryBook.canonicalId,
    
    // Identifiers - prefer library data
    isbn: libraryBook.isbn || openLibraryBook.isbn,
    isbn13: libraryBook.isbn13 || openLibraryBook.isbn13,
    lccn: libraryBook.lccn || openLibraryBook.lccn,
    openLibraryId: openLibraryBook.openLibraryId,
    
    // Basic info - prefer library data
    title: libraryBook.title,
    subtitle: libraryBook.subtitle || openLibraryBook.subtitle,
    authors: libraryBook.authors.length > 0 ? libraryBook.authors : openLibraryBook.authors,
    publishYear: libraryBook.publishYear || openLibraryBook.publishYear,
    publisher: libraryBook.publisher || openLibraryBook.publisher,
    language: libraryBook.language || openLibraryBook.language,
    
    // Content - prefer Open Library (usually more detailed)
    description: libraryBook.description || openLibraryBook.description,
    subjects: libraryBook.subjects || openLibraryBook.subjects,
    pageCount: libraryBook.pageCount || openLibraryBook.pageCount,
    
    // Images - prefer library, fallback to Open Library
    coverUrl: libraryBook.coverUrl || openLibraryBook.coverUrl,
    thumbnailUrl: libraryBook.thumbnailUrl || openLibraryBook.thumbnailUrl,
    
    // Formats - combine both sources
    formats: mergeFormats(libraryBook.formats, openLibraryBook.formats),
    
    // Availability - ALWAYS from library
    availability: libraryBook.availability,
    
    // Library-specific - ALWAYS from library
    libraryId: libraryBook.libraryId,
    source: libraryBook.source,
    sourceUrl: libraryBook.sourceUrl,
  }
}

/**
 * Merge format arrays, removing duplicates
 */
function mergeFormats(formats1, formats2) {
  const combined = [...formats1, ...formats2]
  return Array.from(new Set(combined))
}
