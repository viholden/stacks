import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AuthModal.css'

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode) // 'login' or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signup, login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  if (!isOpen) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'signup') {
      // Signup validation
      if (password !== confirmPassword) {
        return setError('Passwords do not match')
      }

      if (password.length < 6) {
        return setError('Password must be at least 6 characters')
      }

      if (username.length < 3) {
        return setError('Username must be at least 3 characters')
      }

      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return setError('Username can only contain letters, numbers, and underscores')
      }

      try {
        setLoading(true)
        await signup(email, password, username, displayName || username)
        onClose()
        navigate('/profile') // Redirect to profile setup
      } catch (error) {
        console.error('Signup error:', error)
        if (error.message === 'Username already taken') {
          setError('This username is already taken. Please choose another.')
        } else if (error.code === 'auth/email-already-in-use') {
          setError('An account with this email already exists')
        } else if (error.code === 'auth/invalid-email') {
          setError('Invalid email address')
        } else if (error.code === 'auth/weak-password') {
          setError('Password is too weak')
        } else {
          setError('Failed to create account. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    } else {
      // Login
      try {
        setLoading(true)
        await login(email, password)
        onClose()
      } catch (error) {
        console.error('Login error:', error)
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setError('Invalid email or password')
        } else if (error.code === 'auth/invalid-email') {
          setError('Invalid email address')
        } else {
          setError('Failed to sign in. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }
  }

  async function handleGoogleAuth() {
    try {
      setError('')
      setLoading(true)
      const result = await loginWithGoogle()
      onClose()
      // Redirect to profile if it's a new user (this will be detected by Profile page)
      navigate('/profile')
    } catch (error) {
      console.error('Google auth error:', error)
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError('')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="auth-modal-header">
          <h2>{mode === 'login' ? 'Welcome Back!' : 'Join Stacks'}</h2>
          <p>
            {mode === 'login' 
              ? 'Sign in to track your reading journey' 
              : 'Create an account to start tracking your books'}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  required
                  placeholder="Choose a username"
                  minLength={3}
                  maxLength={30}
                  disabled={loading}
                />
                <small>Only letters, numbers, and underscores. 3-30 characters.</small>
              </div>

              <div className="form-group">
                <label htmlFor="displayName">Display Name (Optional)</label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should we call you?"
                  maxLength={50}
                  disabled={loading}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
              minLength={6}
              disabled={loading}
            />
            {mode === 'signup' && <small>At least 6 characters</small>}
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? (mode === 'signup' ? 'Creating Account...' : 'Signing In...') 
                     : (mode === 'signup' ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button 
          type="button" 
          className="btn btn-google btn-full" 
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
            <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-switch">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={switchMode} className="link-button">
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={switchMode} className="link-button">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
