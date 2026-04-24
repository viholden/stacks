import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { db } from '../firebase/config'
import AuthModal from '../components/AuthModal'
import LibrarySavings from '../components/LibrarySavings'
import ReadingGoal from '../components/ReadingGoal'
import '../styles/Profile.css'

function Profile() {
  const { currentUser, userProfile, updateUserProfile, logout, uploadProfilePicture, updatePrivacySettings, followUser, unfollowUser } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  // Social features
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState(null)
  const [uploadingPicture, setUploadingPicture] = useState(false)
  const [searchUsername, setSearchUsername] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const [inviteLink, setInviteLink] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [showFollowingModal, setShowFollowingModal] = useState(false)
  const [followersData, setFollowersData] = useState([])
  const [followingData, setFollowingData] = useState([])
  
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

  // Load recommended users
  useEffect(() => {
    if (currentUser && userProfile) {
      loadRecommendedUsers()
    }
  }, [currentUser, userProfile])

  // Generate invite link
  useEffect(() => {
    if (userProfile?.username) {
      const baseUrl = window.location.origin
      setInviteLink(`${baseUrl}/user/${userProfile.username}`)
    }
  }, [userProfile])

  // Handle profile picture selection
  const handleProfilePictureSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Profile picture must be under 5MB')
        return
      }
      setProfilePicture(file)
      setProfilePicturePreview(URL.createObjectURL(file))
    }
  }

  // Upload profile picture
  const handleUploadProfilePicture = async () => {
    if (!profilePicture) return

    try {
      setUploadingPicture(true)
      setError('')
      await uploadProfilePicture(profilePicture)
      
      // Clear file state (AuthContext already updated userProfile)
      setProfilePicture(null)
      setProfilePicturePreview(null)
      
      alert('Profile picture updated successfully!')
    } catch (error) {
      console.error('Failed to upload profile picture:', error)
      setError('Failed to upload profile picture. Please try again.')
    } finally {
      setUploadingPicture(false)
    }
  }

  // Search for users
  const handleSearchUsers = async () => {
    if (!searchUsername.trim()) return

    try {
      setSearching(true)
      const q = query(
        collection(db, 'users'),
        where('username', '>=', searchUsername.toLowerCase()),
        where('username', '<=', searchUsername.toLowerCase() + '\uf8ff'),
        limit(10)
      )
      
      const snapshot = await getDocs(q)
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUser.uid)
      
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setSearching(false)
    }
  }

  // Load recommended users (random users not followed)
  const loadRecommendedUsers = async () => {
    try {
      const q = query(collection(db, 'users'), limit(20))
      const snapshot = await getDocs(q)
      
      const following = userProfile?.following || []
      const recommendations = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => 
          user.id !== currentUser.uid && 
          !following.includes(user.id)
        )
        .slice(0, 5)
      
      setRecommendedUsers(recommendations)
    } catch (error) {
      console.error('Error loading recommendations:', error)
    }
  }

  // Copy invite link
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }

  // Toggle privacy
  const handleTogglePrivacy = async () => {
    try {
      await updatePrivacySettings(!userProfile.isPrivate)
    } catch (error) {
      console.error('Failed to update privacy:', error)
      setError('Failed to update privacy settings.')
    }
  }

  // Load followers data
  const loadFollowersData = async () => {
    try {
      const followers = userProfile?.followers || []
      const followersPromises = followers.map(async (uid) => {
        const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', uid), limit(1)))
        return userDoc.docs[0] ? { id: userDoc.docs[0].id, ...userDoc.docs[0].data() } : null
      })
      const data = (await Promise.all(followersPromises)).filter(Boolean)
      setFollowersData(data)
      setShowFollowersModal(true)
    } catch (error) {
      console.error('Error loading followers:', error)
    }
  }

  // Load following data
  const loadFollowingData = async () => {
    try {
      const following = userProfile?.following || []
      const followingPromises = following.map(async (uid) => {
        const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', uid), limit(1)))
        return userDoc.docs[0] ? { id: userDoc.docs[0].id, ...userDoc.docs[0].data() } : null
      })
      const data = (await Promise.all(followingPromises)).filter(Boolean)
      setFollowingData(data)
      setShowFollowingModal(true)
    } catch (error) {
      console.error('Error loading following:', error)
    }
  }

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
            {userProfile.profilePictureUrl ? (
              <img src={userProfile.profilePictureUrl} alt={userProfile.displayName} />
            ) : userProfile.photoURL ? (
              <img src={userProfile.photoURL} alt={userProfile.displayName} />
            ) : (
              <span>{userProfile.displayName?.charAt(0).toUpperCase() || 'U'}</span>
            )}
          </div>
          
          {/* Profile Picture Upload */}
          <div className="profile-picture-upload">
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureSelect}
              style={{ display: 'none' }}
            />
            {profilePicturePreview ? (
              <div className="picture-preview">
                <img src={profilePicturePreview} alt="Preview" />
                <div className="picture-actions">
                  <button
                    className="btn btn-primary btn-small"
                    onClick={handleUploadProfilePicture}
                    disabled={uploadingPicture}
                  >
                    {uploadingPicture ? 'Uploading...' : 'Upload'}
                  </button>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => {
                      setProfilePicture(null)
                      setProfilePicturePreview(null)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="profilePicture" className="upload-label">
                Change Profile Picture
              </label>
            )}
          </div>
          
          {!editing ? (
            <div className="profile-info-display">
              <h1>{userProfile.displayName}</h1>
              <p className="profile-username">@{userProfile.username}</p>
              {userProfile.bio && (
                <p className="profile-bio">{userProfile.bio}</p>
              )}
              
              {/* Social Stats */}
              <div className="social-stats">
                <button 
                  className="stat-button" 
                  onClick={loadFollowersData}
                >
                  <span className="stat-number">{userProfile.followers?.length || 0}</span>
                  <span className="stat-label">Followers</span>
                </button>
                <button 
                  className="stat-button" 
                  onClick={loadFollowingData}
                >
                  <span className="stat-number">{userProfile.following?.length || 0}</span>
                  <span className="stat-label">Following</span>
                </button>
              </div>
              
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

        {/* Reading Goal */}
        <ReadingGoal />

        {/* Account and Shelves Grid */}
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
              <div className="account-row">
                <span className="account-label">Privacy:</span>
                <label className="privacy-toggle">
                  <input
                    type="checkbox"
                    checked={userProfile.isPrivate || false}
                    onChange={handleTogglePrivacy}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">
                    {userProfile.isPrivate ? 'Private Account' : 'Public Account'}
                  </span>
                </label>
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

        {/* Social Features Section */}
        <div className="social-features-section">
          {/* User Search */}
          <div className="social-card">
            <h3>Find Friends</h3>
            <div className="user-search">
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Search by username..."
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchUsers()}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSearchUsers}
                  disabled={searching}
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map(user => (
                    <div key={user.id} className="user-result">
                      <div 
                        className="user-result-info"
                        onClick={() => navigate(`/user/${user.username}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="user-avatar-small">
                          {user.profilePictureUrl ? (
                            <img src={user.profilePictureUrl} alt={user.displayName} />
                          ) : (
                            <span>{user.displayName?.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <div className="user-result-name">{user.displayName}</div>
                          <div className="user-result-username">@{user.username}</div>
                        </div>
                      </div>
                      <button
                        className={`btn btn-small ${
                          userProfile.following?.includes(user.id) ? 'btn-secondary' : 'btn-primary'
                        }`}
                        onClick={async () => {
                          try {
                            if (userProfile.following?.includes(user.id)) {
                              await unfollowUser(user.id)
                            } else {
                              await followUser(user.id)
                            }
                          } catch (error) {
                            console.error('Follow/unfollow error:', error)
                          }
                        }}
                      >
                        {userProfile.following?.includes(user.id) ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recommended Users */}
          {recommendedUsers.length > 0 && (
            <div className="social-card">
              <h3>Suggested for You</h3>
              <div className="recommended-users">
                {recommendedUsers.map(user => (
                  <div key={user.id} className="user-result">
                    <div 
                      className="user-result-info"
                      onClick={() => navigate(`/user/${user.username}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="user-avatar-small">
                        {user.profilePictureUrl ? (
                          <img src={user.profilePictureUrl} alt={user.displayName} />
                        ) : (
                          <span>{user.displayName?.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <div className="user-result-name">{user.displayName}</div>
                        <div className="user-result-username">@{user.username}</div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={async () => {
                        try {
                          await followUser(user.id)
                          setRecommendedUsers(prev => prev.filter(u => u.id !== user.id))
                        } catch (error) {
                          console.error('Follow error:', error)
                        }
                      }}
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invite Friends */}
          <div className="social-card">
            <h3>Invite Friends</h3>
            <p>Share your profile with friends</p>
            <div className="invite-link-container">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="invite-link-input"
              />
              <button
                className="btn btn-primary"
                onClick={handleCopyInviteLink}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Followers Modal */}
        {showFollowersModal && (
          <div className="modal-overlay" onClick={() => setShowFollowersModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Followers</h2>
                <button 
                  className="modal-close" 
                  onClick={() => setShowFollowersModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {followersData.length === 0 ? (
                  <p className="no-results">No followers yet</p>
                ) : (
                  <div className="users-list">
                    {followersData.map(user => (
                      <div key={user.id} className="user-item">
                        <div 
                          className="user-item-info"
                          onClick={() => {
                            navigate(`/user/${user.username}`)
                            setShowFollowersModal(false)
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="user-avatar-small">
                            {user.profilePictureUrl ? (
                              <img src={user.profilePictureUrl} alt={user.displayName} />
                            ) : (
                              <span>{user.displayName?.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div>
                            <div className="user-item-name">{user.displayName}</div>
                            <div className="user-item-username">@{user.username}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Following Modal */}
        {showFollowingModal && (
          <div className="modal-overlay" onClick={() => setShowFollowingModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Following</h2>
                <button 
                  className="modal-close" 
                  onClick={() => setShowFollowingModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {followingData.length === 0 ? (
                  <p className="no-results">Not following anyone yet</p>
                ) : (
                  <div className="users-list">
                    {followingData.map(user => (
                      <div key={user.id} className="user-item">
                        <div 
                          className="user-item-info"
                          onClick={() => {
                            navigate(`/user/${user.username}`)
                            setShowFollowingModal(false)
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="user-avatar-small">
                            {user.profilePictureUrl ? (
                              <img src={user.profilePictureUrl} alt={user.displayName} />
                            ) : (
                              <span>{user.displayName?.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div>
                            <div className="user-item-name">{user.displayName}</div>
                            <div className="user-item-username">@{user.username}</div>
                          </div>
                        </div>
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={async () => {
                            try {
                              await unfollowUser(user.id)
                              setFollowingData(prev => prev.filter(u => u.id !== user.id))
                            } catch (error) {
                              console.error('Unfollow error:', error)
                            }
                          }}
                        >
                          Unfollow
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
