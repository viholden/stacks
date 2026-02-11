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
          <h1 className="hero-title">Discover What Your Library Has Beyond Books</h1>
          <p className="hero-subtitle">
            From musical instruments to art supplies, explore unique items available at libraries near you
          </p>
          <div className="hero-search">
            <SearchBar onSearch={handleSearch} placeholder="Search for instruments, tools, games, and more..." />
          </div>
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">
                {categoryCounts[category.name] || 0} items
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="libraries">
        <h2 className="section-title">Explore Libraries</h2>
        <div className="libraries-grid">
          {libraries.slice(0, 3).map((library) => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How Stacks Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Search & Discover</h3>
            <p>Browse items available at libraries in your area</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Find Details</h3>
            <p>See availability, location, and item descriptions</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Reserve at Library</h3>
            <p>Click through to the library's page to complete your reservation</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
