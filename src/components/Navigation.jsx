import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'
import '../styles/Navigation.css'

function Navigation() {
  const location = useLocation()
  const { currentUser, userProfile } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <>
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
            <Link to="/shelves" className={`nav-link ${isActive('/shelves')}`}>
              My Shelves
            </Link>
            <Link to="/events" className={`nav-link ${isActive('/events')}`}>
              Events
            </Link>
            <Link to="/libraries" className={`nav-link ${isActive('/libraries')}`}>
              Library of Things
            </Link>
            
            {currentUser ? (
              <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                {userProfile?.username || 'Profile'}
              </Link>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="nav-link nav-button nav-signin">
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  )
}

export default Navigation
