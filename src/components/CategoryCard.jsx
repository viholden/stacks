import { Link } from 'react-router-dom'
import '../styles/CategoryCard.css'

function CategoryCard({ category, itemCount, libraryId, icon }) {
  return (
    <Link 
      to={`/library/${libraryId}/category/${encodeURIComponent(category)}`}
      className="category-card"
    >
      <div className="category-card-content">
        {icon && <span className="category-icon">{icon}</span>}
        <h3 className="category-name">{category}</h3>
        <p className="category-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
      </div>
    </Link>
  )
}

export default CategoryCard
