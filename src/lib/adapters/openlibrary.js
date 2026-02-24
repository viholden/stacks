import { generateCanonicalId } from '../utils/bookIdentity.js'

export class OpenLibraryAdapter {
  baseUrl = 'https://openlibrary.org'
  
  /**
   * Search for books by ISBN
   */
  async searchByISBN(isbn) {
    try {
      const cleanISBN = isbn.replace(/[-\s]/g, '')
      const url = `${this.baseUrl}/api/books?bibkeys=ISBN:${cleanISBN}&format=json&jscmd=data`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      const bookData = data[`ISBN:${cleanISBN}`]
      if (!bookData) return null
      
      return this.transformToBook(bookData, cleanISBN)
    } catch (error) {
      console.error('OpenLibrary ISBN search error:', error)
      return null
    }
  }
  
  /**
   * Search for books by title and/or author
   */
  async search(query, limit = 10) {
    try {
      const url = `${this.baseUrl}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      const results = data.docs || []
      
      return results.map((result) => this.transformSearchResultToBook(result))
    } catch (error) {
      console.error('OpenLibrary search error:', error)
      throw error // Re-throw so the UI can show the error
    }
  }
  
  /**
   * Get cover image URL by ISBN or cover ID
   */
  getCoverUrl(isbn, coverId, size = 'M') {
    if (isbn) {
      return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`
    }
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    }
    return undefined
  }
  
  /**
   * Transform OpenLibrary work data to our Book type
   */
  transformToBook(data, isbn) {
    const authors = data.authors?.map((a) => a.name) || []
    const publishYear = data.publish_date ? parseInt(data.publish_date) : undefined
    
    const book = {
      isbn: data.identifiers?.isbn_10?.[0] || isbn,
      isbn13: data.identifiers?.isbn_13?.[0],
      title: data.title || 'Unknown Title',
      subtitle: data.subtitle,
      authors,
      publishYear,
      publisher: data.publishers?.[0],
      description: undefined, // OpenLibrary API doesn't always include description
      subjects: data.subjects?.slice(0, 5),
      pageCount: data.number_of_pages,
      coverUrl: data.cover?.large || data.cover?.medium || this.getCoverUrl(isbn),
      thumbnailUrl: data.cover?.small || this.getCoverUrl(isbn, undefined, 'S'),
      formats: ['physical'],
      availability: {
        status: 'not-in-library',
      },
      source: 'OpenLibrary',
    }
    
    return {
      ...book,
      canonicalId: generateCanonicalId(book),
    }
  }
  
  /**
   * Transform OpenLibrary search result to our Book type
   */
  transformSearchResultToBook(result) {
    const isbn = result.isbn?.[0]
    const isbn13 = result.isbn?.find((i) => i.length === 13)
    
    // Extract OLID from key (e.g., "/works/OL45804W" -> "OL45804W")
    const openLibraryId = result.key ? result.key.split('/').pop() : undefined
    
    const book = {
      isbn: isbn13 || isbn,
      isbn13,
      openLibraryId,
      title: result.title,
      authors: result.author_name || [],
      publishYear: result.publish_year?.[0],
      publisher: result.publisher?.[0],
      language: result.language?.[0],
      subjects: result.subject?.slice(0, 5),
      coverUrl: result.cover_i ? this.getCoverUrl(undefined, result.cover_i) : undefined,
      thumbnailUrl: result.cover_i ? this.getCoverUrl(undefined, result.cover_i, 'S') : undefined,
      formats: ['physical'],
      availability: {
        status: 'not-in-library',
      },
      source: 'OpenLibrary',
    }
    
    return {
      ...book,
      canonicalId: generateCanonicalId(book),
    }
  }
}

export const openLibrary = new OpenLibraryAdapter()
