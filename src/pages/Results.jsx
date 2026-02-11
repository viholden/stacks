import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import ItemCard from '../components/ItemCard'
import { mockItems } from '../data/mockData'
import '../styles/Results.css'

const ITEMS_PER_PAGE = 24

function Results() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  useEffect(() => {
    let items = mockItems

    if (query) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (category) {
      items = items.filter(item => item.category === category)
    }

    if (activeFilter === 'available') {
      items = items.filter(item => item.available)
    }

    setFilteredItems(items)
    setCurrentPage(1) // Reset to first page when filters change
  }, [query, category, activeFilter])

  const handleSearch = (newQuery) => {
    navigate(`/results?q=${encodeURIComponent(newQuery)}`)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = filteredItems.slice(startIndex, endIndex)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="results">
      <div className="results-header">
        <div className="results-search">
          <SearchBar onSearch={handleSearch} initialValue={query} />
        </div>
        <div className="results-info">
          <h1 className="results-title">
            {category ? category : query ? `Results for "${query}"` : 'All Items'}
          </h1>
          <p className="results-count">
            {filteredItems.length} items found
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        </div>
        <div className="results-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Items
          </button>
          <button
            className={`filter-btn ${activeFilter === 'available' ? 'active' : ''}`}
            onClick={() => setActiveFilter('available')}
          >
            Available Now
          </button>
        </div>
      </div>

      <div className="results-grid">
        {currentItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1
              // Show first, last, current, and adjacent pages
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="pagination-ellipsis">...</span>
              }
              return null
            })}
          </div>

          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No items found. Try a different search or browse our categories.</p>
        </div>
      )}
    </div>
  )
}

export default Results
