import { Link } from 'react-router-dom'
import '../styles/ItemCard.css'

function ItemCard({ item }) {
  return (
    <Link to={`/item/${item.id}`} className="item-card">
      <div className="item-card-image">
        <img src={item.image} alt={item.name} />
        {item.available && <span className="available-badge">Available</span>}
      </div>
      <div className="item-card-content">
        <h3 className="item-card-title">{item.name}</h3>
        <p className="item-card-category">{item.category}</p>
        <p className="item-card-library">{item.library.name}</p>
      </div>
    </Link>
  )
}

export default ItemCard
