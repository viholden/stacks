import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'
import '../styles/Navigation.css'

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, userProfile, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
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
            <Link to="/libraries" className={`nav-link ${isActive('/libraries')}`}>
              Libraries
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                  {userProfile?.username || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="nav-link nav-button">
                  Sign Out
                </button>
              </>
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
