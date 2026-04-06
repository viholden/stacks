import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import LibraryCard from '../components/LibraryCard'
import { libraries, mockItems } from '../data/mockData'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()
  const [categoryCounts, setCategoryCounts] = useState({})

  useEffect(() => {
    // Calculate real category counts from mockItems
    const counts = {}
    mockItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    setCategoryCounts(counts)
  }, [])

  const categories = [
    { name: 'Musical Instruments', icon: '🎸' },
    { name: 'Art Supplies', icon: '🎨' },
    { name: 'Technology', icon: '💻' },
    { name: 'Tools & Equipment', icon: '🔧' },
    { name: 'Educational Kits', icon: '🧪' },
    { name: 'Games & Puzzles', icon: '🎲' },
    { name: 'Sports Equipment', icon: '⚽' },
    { name: 'Crafts & Hobbies', icon: '✂️' },
  ]

  const handleSearch = (query) => {
    navigate(`/results?q=${encodeURIComponent(query)}`)
  }

  const handleCategoryClick = (categoryName) => {
    navigate(`/results?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Track Your Reading Journey</h1>
          <p className="hero-subtitle">
            Organize your books, discover new reads, and find them at your local library
          </p>
          <div className="hero-search">
            <SearchBar onSearch={handleSearch} placeholder="Search for books, authors, or ISBNs..." />
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Everything You Need to Track Your Reading</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📚</span>
            <h3>Organize Your Library</h3>
            <p>Create custom shelves and track books you want to read, are reading, or have finished</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Discover Books Locally</h3>
            <p>Find which nearby libraries have the books you want and get direct catalog links</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Rate & Review</h3>
            <p>Keep track of your thoughts with ratings and reviews for every book you read</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Smart Recommendations</h3>
            <p>Get AI-powered suggestions based on your reading history and preferences</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Barcode Scanner</h3>
            <p>Quickly add books by scanning their barcode with your phone's camera</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Library Savings Tracker</h3>
            <p>See how much money you've saved by borrowing books from your library</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How Stacks Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Search & Add Books</h3>
            <p>Find books by title, author, or ISBN. Scan barcodes to add them instantly.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Organize Your Shelves</h3>
            <p>Add books to Want to Read, Currently Reading, or Read shelves. Create custom shelves too.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Find at Local Libraries</h3>
            <p>Discover which libraries near you have the book and check availability instantly.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track & Discover</h3>
            <p>Rate books you've read and get personalized recommendations for your next read.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
