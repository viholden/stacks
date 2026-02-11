import { useParams, Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { mockItems, libraries } from '../data/mockData'
import '../styles/CategoryItems.css'

function CategoryItems() {
  const { id, category } = useParams()
  const library = libraries.find(l => l.id === id)
  const categoryItems = mockItems.filter(
    item => item.library.id === id && item.category === decodeURIComponent(category)
  )

  if (!library) {
    return <div className="category-not-found">Library not found</div>
  }

  if (categoryItems.length === 0) {
    return (
      <div className="category-empty">
        <h2>No items found in this category</h2>
        <Link to={`/library/${id}`} className="btn btn-primary">
          Back to Library
        </Link>
      </div>
    )
  }

  // Get category icon
  const categoryIcons = {
    'Educational Kits': '🎓',
    'Musical Instruments': '🎵',
    'Games & Puzzles': '🎲',
    'Crafts & Hobbies': '🎨',
    'Tools & Equipment': '🔧',
    'Other': '📦'
  }

  return (
    <div className="category-items-page">
      <div className="category-header">
        <Link to={`/library/${id}`} className="back-button">
          ← Back to {library.name}
        </Link>
        <div className="category-title-section">
          {categoryIcons[decodeURIComponent(category)] && (
            <span className="category-icon-large">
              {categoryIcons[decodeURIComponent(category)]}
            </span>
          )}
          <div>
            <h1 className="category-title">{decodeURIComponent(category)}</h1>
            <p className="category-subtitle">
              {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'} at {library.name}
            </p>
          </div>
        </div>
      </div>

      <div className="category-items-grid">
        {categoryItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default CategoryItems
