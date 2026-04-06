import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from '../components/AuthModal'
import LibrarySavings from '../components/LibrarySavings'
import '../styles/Profile.css'

function Profile() {
  const { currentUser, userProfile, updateUserProfile, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Auto-open edit mode for new users who haven't completed their profile
  useEffect(() => {
    if (userProfile && !userProfile.profileCompleted) {
      setDisplayName(userProfile.displayName || '')
      setUsername(userProfile.username || '')
      setEmail(userProfile.email || '')
      setBio(userProfile.bio || '')
      setEditing(true)
    }
  }, [userProfile])

  // Load current values when entering edit mode
  const handleStartEdit = () => {
    setDisplayName(userProfile?.displayName || '')
    setUsername(userProfile?.username || '')
    setEmail(userProfile?.email || '')
    setBio(userProfile?.bio || '')
    setEditing(true)
    setError('')
  }

  const handleCancelEdit = () => {
    setEditing(false)
    setDisplayName('')
    setUsername('')
    setEmail('')
    setBio('')
    setError('')
  }

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      setError('Display name is required')
      return
    }

    if (!username.trim()) {
      setError('Username is required')
      return
    }

    if (username.length < 3 || username.length > 30) {
      setError('Username must be 3-30 characters')
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setSaving(true)
      setError('')
      await updateUserProfile({
        displayName: displayName.trim(),
        username: username.toLowerCase().trim(),
        email: email.trim(),
        bio: bio.trim(),
        profileCompleted: true
      })
      setEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
      if (error.message === 'Username already taken') {
        setError('This username is already taken. Please choose another.')
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use by another account.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (error.code === 'auth/requires-recent-login') {
        setError('For security, please sign out and sign back in before changing your email.')
      } else {
        setError('Failed to save changes. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleSkipProfile = async () => {
    try {
      setSaving(true)
      await updateUserProfile({
        profileCompleted: true
      })
      setEditing(false)
    } catch (error) {
      console.error('Failed to skip profile setup:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  // Signed-out state
  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="signed-out-profile">
            <div className="signed-out-icon">👤</div>
            <h2>Sign In to View Your Profile</h2>
            <p>Access your reading shelves, reviews, and personalized recommendations.</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </button>
            <p className="signed-out-signup">
              Don't have an account?{' '}
              <button 
                className="link-button" 
                onClick={() => {
                  setShowAuthModal(true)
                }}
              >
                Join now
              </button>
            </p>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </div>
    )
  }

  // Loading state
  if (!userProfile) {
    return (
      <div className="profile-page">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  // Logged-in state
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-avatar-large">
            {userProfile.photoURL ? (
              <img src={userProfile.photoURL} alt={userProfile.displayName} />
            ) : (
              <span>{userProfile.displayName?.charAt(0).toUpperCase() || 'U'}</span>
            )}
          </div>
          
          {!editing ? (
            <div className="profile-info-display">
              <h1>{userProfile.displayName}</h1>
              <p className="profile-username">@{userProfile.username}</p>
              {userProfile.bio && (
                <p className="profile-bio">{userProfile.bio}</p>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={handleStartEdit}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit-form">
              <h2>{userProfile.profileCompleted ? 'Edit Profile' : 'Complete Your Profile'}</h2>
              {!userProfile.profileCompleted && (
                <p className="profile-setup-message">Welcome to Stacks! Tell us a bit about yourself to personalize your experience.</p>
              )}
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  maxLength={50}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  placeholder="Choose a username"
                  minLength={3}
                  maxLength={30}
                />
                <small>3-30 characters. Letters, numbers, and underscores only.</small>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                {userProfile.email !== email && (
                  <small className="warning-hint">Changing your email will update your login credentials.</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself and your reading interests..."
                  maxLength={500}
                  rows={4}
                />
                <small>{bio.length}/500 characters</small>
              </div>

              <div className="form-actions">
                {userProfile.profileCompleted ? (
                  <>
                    <button 
                      className="btn btn-secondary" 
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-secondary" 
                      onClick={handleSkipProfile}
                      disabled={saving}
                    >
                      Skip for Now
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Continue'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Library Savings */}
        <LibrarySavings userId={currentUser.uid} />

        <div className="profile-stats">
          <div className="stat-card" onClick={() => navigate('/shelves')}>
            <h3>My Shelves</h3>
            <p>View your reading lists</p>
            <button className="btn btn-secondary btn-full">
              Go to Shelves →
            </button>
          </div>

          <div className="stat-card">
            <h3>Account</h3>
            <div className="account-info">
              <div className="account-row">
                <span className="account-label">Username:</span>
                <span className="account-value">@{userProfile.username}</span>
              </div>
              <div className="account-row">
                <span className="account-label">Email:</span>
                <span className="account-value">{userProfile.email}</span>
              </div>
              <div className="account-row">
                <span className="account-label">Member since:</span>
                <span className="account-value">
                  {userProfile.createdAt ? 
                    new Date(userProfile.createdAt.toDate()).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    }) 
                    : 'Recently'}
                </span>
              </div>
            </div>
            <button 
              className="btn btn-danger btn-full sign-out-btn" 
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
