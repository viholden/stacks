import { Link } from 'react-router-dom'
import { mockItems } from '../data/mockData'
import '../styles/LibraryCard.css'

function LibraryCard({ library }) {
  // Count items at this library
  const itemCount = mockItems.filter(item => item.library.id === library.id).length
  const availableCount = mockItems.filter(item => item.library.id === library.id && item.available).length

  return (
    <Link to={`/library/${library.id}`} className="library-card">
      <div className="library-card-header">
        <h3 className="library-card-name">{library.name}</h3>
        <div className="library-card-stats">
          <span className="stat">{itemCount} items</span>
          <span className="stat available">{availableCount} available</span>
        </div>
      </div>
      
      <div className="library-card-info">
        <p className="library-address">
          {library.address}<br />
          {library.city}, {library.state} {library.zip}
        </p>
        <p className="library-phone">{library.phone}</p>
      </div>
      
      <div className="library-card-hours">
        <p><strong>Hours:</strong></p>
        <p className="hours-detail">Mon-Fri: {library.hours.weekday}</p>
        <p className="hours-detail">Sat: {library.hours.saturday}</p>
        <p className="hours-detail">Sun: {library.hours.sunday}</p>
      </div>
      
      <div className="library-card-actions">
        <a 
          href={library.mapLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="map-link"
          onClick={(e) => e.stopPropagation()}
        >
          📍 View on Map
        </a>
      </div>
    </Link>
  )
}

export default LibraryCard
