import { useParams } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import Map from '../components/Map'
import { mockItems, libraries } from '../data/mockData'
import '../styles/Library.css'

function Library() {
  const { id } = useParams()
  const library = libraries.find(l => l.id === id)
  const libraryItems = mockItems.filter(item => item.library.id === id)

  if (!library) {
    return <div className="library-not-found">Library not found</div>
  }

  // Group items by category
  const categories = libraryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  // Category icons
  const categoryIcons = {
    'Educational Kits': '🎓',
    'Musical Instruments': '🎵',
    'Games & Puzzles': '🎲',
    'Crafts & Hobbies': '🎨',
    'Tools & Equipment': '🔧',
    'Sports Equipment': '⚽',
    'Technology': '💻',
    'Other': '📦'
  }

  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="library-title">{library.name}</h1>
        <div className="library-info">
          <div className="info-section">
            <h3>Address</h3>
            <p>{library.address}</p>
            <p>{library.city}, {library.state} {library.zip}</p>
          </div>
          <div className="info-section">
            <h3>Hours</h3>
            <p>Monday - Friday: {library.hours.weekday}</p>
            <p>Saturday: {library.hours.saturday}</p>
            <p>Sunday: {library.hours.sunday}</p>
          </div>
          <div className="info-section">
            <h3>Contact</h3>
            <p>{library.phone}</p>
            <a href={library.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        </div>
      </div>

      <section className="library-map-section">
        <h2>Location</h2>
        <Map 
          libraries={libraries}
          center={library.coordinates}
          zoom={15}
          height="350px"
          showSingleLibrary={library.id}
        />
      </section>

      <section className="library-items-section">
        <h2>Browse by Category</h2>
        <p className="category-description">Explore our collection of {libraryItems.length} items</p>
        <div className="categories-grid">
          {Object.entries(categories)
            .sort(([, a], [, b]) => b.length - a.length) // Sort by item count descending
            .map(([category, items]) => (
              <CategoryCard
                key={category}
                category={category}
                itemCount={items.length}
                libraryId={library.id}
                icon={categoryIcons[category] || '📦'}
              />
            ))}
        </div>
      </section>
    </div>
  )
}

export default Library
