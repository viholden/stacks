import { useState } from 'react'
import { openLibrary } from '../../lib/adapters/openlibrary'
import { 
  findNearbyLibraries, 
  getLibrarySearchUrl 
} from '../../lib/library-registry/finder'
import { 
  geocodeLocation, 
  getCurrentLocation, 
  reverseGeocode 
} from '../../lib/library-registry/geocoding'
import './Discover.css'

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState('')
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  
  const [showLibraryFinder, setShowLibraryFinder] = useState(false)
  const [locationInput, setLocationInput] = useState('')
  const [nearbyLibraries, setNearbyLibraries] = useState([])
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    console.log('Starting search for:', searchQuery)
    setIsSearching(true)
    setSearchError(null)
    setShowLibraryFinder(false)
    
    try {
      const results = await openLibrary.search(searchQuery, 20)
      console.log('Search results:', results)
      setBooks(results)
      
      if (results.length === 0) {
        setSearchError('No books found. Try a different search term.')
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchError(error instanceof Error ? error.message : 'Failed to search. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleFindInLibrary = (book) => {
    setSelectedBook(book)
    setShowLibraryFinder(true)
    setNearbyLibraries([])
    setLocationInput('')
  }

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true)
    try {
      const coords = await getCurrentLocation()
      const location = await reverseGeocode(coords)
      setLocationInput(location.formattedAddress || `${location.city}, ${location.state}`)
      
      const nearby = findNearbyLibraries(coords, 50)
      console.log('Nearby libraries found:', nearby.length)
      setNearbyLibraries(nearby)
      
      if (nearby.length === 0) {
        alert('No libraries found within 50 miles of your location. We cover all of California.')
      }
    } catch (error) {
      console.error('Location error:', error)
      alert('Could not get your location. Please enter it manually.')
    } finally {
      setIsLoadingLocation(false)
    }
  }

  const handleSearchLocation = async (e) => {
    e.preventDefault()
    if (!locationInput.trim()) return

    setIsLoadingLocation(true)
    try {
      const coords = await geocodeLocation(locationInput)
      console.log('Geocoded location:', coords)
      
      const nearby = findNearbyLibraries(coords, 50)
      console.log('Nearby libraries found:', nearby.length)
      setNearbyLibraries(nearby)
      
      if (nearby.length === 0) {
        alert('No libraries found within 50 miles. We cover all of California - try a different CA city!')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      alert('Could not find that location. Please try a different city, zip code, or address.')
    } finally {
      setIsLoadingLocation(false)
    }
  }

  const getDirectSearchUrl = (district) => {
    if (!selectedBook) return ''
    return getLibrarySearchUrl(district, selectedBook.title, selectedBook.isbn || selectedBook.isbn13)
  }

  return (
    <div className="discover-page">
      <div className="discover-header">
        <h1>Discover Books</h1>
        <p>Search for any book and find libraries near you that have it</p>
      </div>

      {/* Book Search */}
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <div className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books by title, author, or ISBN..."
              className="search-input"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="search-button"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {searchError && (
            <div className="error-message">
              {searchError}
            </div>
          )}
        </form>
      </div>

      {/* Search Results */}
      {books.length > 0 && !showLibraryFinder && (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.canonicalId} className="book-card">
              <div className="book-cover">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                  />
                ) : (
                  <div className="no-cover">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                {book.authors.length > 0 && (
                  <p className="book-author">
                    by {book.authors.join(', ')}
                  </p>
                )}
                {book.publishYear && (
                  <p className="book-year">
                    Published: {book.publishYear}
                  </p>
                )}
                <button
                  onClick={() => handleFindInLibrary(book)}
                  className="find-button"
                >
                  📚 Find in Library Near You
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Library Finder Modal */}
      {showLibraryFinder && selectedBook && (
        <div className="library-finder">
          <div className="finder-header">
            <div>
              <h2>Find "{selectedBook.title}"</h2>
              <p>Enter your location to find nearby libraries</p>
            </div>
            <button
              onClick={() => setShowLibraryFinder(false)}
              className="close-button"
            >
              ×
            </button>
          </div>

          {/* Location Input */}
          <form onSubmit={handleSearchLocation} className="location-form">
            <div className="location-input-group">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city, zip code, or address..."
                className="location-input"
              />
              <button
                type="submit"
                disabled={isLoadingLocation}
                className="location-button"
              >
                {isLoadingLocation ? 'Searching...' : 'Search'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLoadingLocation}
              className="current-location-button"
            >
              📍 Use My Current Location
            </button>
          </form>

          {/* Nearby Libraries Results */}
          {nearbyLibraries.length > 0 && (
            <div className="libraries-list">
              <h3>Libraries Near You</h3>
              <div className="libraries-grid">
                {nearbyLibraries.map(({ district, closestBranch, distance }) => (
                  <a
                    key={district.id}
                    href={getDirectSearchUrl(district)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="library-item"
                  >
                    <div className="library-content">
                      <div className="library-details">
                        <h4>{closestBranch.name} ({district.shortName})</h4>
                        <p className="library-address">
                          {closestBranch.location.address}, {closestBranch.location.city}
                        </p>
                        <p className="library-distance">
                          {distance.toFixed(1)} miles away
                        </p>
                      </div>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {nearbyLibraries.length === 0 && locationInput && !isLoadingLocation && (
            <div className="no-results">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>No libraries found nearby</h3>
              <p>Currently covering all of California:</p>
              <p className="coverage-info">
                <strong>Southern California:</strong><br />
                Los Angeles • Culver City • Santa Monica • Torrance<br />
                Long Beach • Palos Verdes • Orange County • San Diego<br />
                <br />
                <strong>Northern California:</strong><br />
                San Francisco • Oakland • San Jose • Berkeley • Sacramento • Fresno
              </p>
              <p>Try a different California location or check back for more states!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
