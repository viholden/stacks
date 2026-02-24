import { Link, useLocation } from 'react-router-dom'
import '../styles/Navigation.css'

function Navigation() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Stacks</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/discover" className={`nav-link ${isActive('/discover')}`}>
            Discover
          </Link>
          <Link to="/results" className={`nav-link ${isActive('/results')}`}>
            Browse
          </Link>
          <Link to="/libraries" className={`nav-link ${isActive('/libraries')}`}>
            Libraries
          </Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
