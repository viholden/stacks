import { createContext, useContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updateEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Create default shelves for new users
  async function createDefaultShelves(userId) {
    const defaultShelves = [
      { id: 'want-to-read', name: 'Want to Read', isDefault: true, order: 1 },
      { id: 'reading', name: 'Reading', isDefault: true, order: 2 },
      { id: 'read', name: 'Read', isDefault: true, order: 3 },
      { id: 'didnt-finish', name: "Didn't Finish", isDefault: true, order: 4 }
    ]

    const promises = defaultShelves.map(shelf =>
      setDoc(doc(db, 'users', userId, 'shelves', shelf.id), {
        ...shelf,
        createdAt: serverTimestamp()
      })
    )

    await Promise.all(promises)
  }

  // Sign up with email and password
  async function signup(email, password, username, displayName) {
    try {
      // Check if username is taken
      const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()))
      if (usernameDoc.exists()) {
        throw new Error('Username already taken')
      }

      // Create auth user
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with display name
      await updateProfile(user, { displayName })

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        username: username.toLowerCase(),
        displayName: displayName,
        bio: '',
        photoURL: user.photoURL || '',
        profileCompleted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      // Reserve username
      await setDoc(doc(db, 'usernames', username.toLowerCase()), {
        userId: user.uid,
        createdAt: serverTimestamp()
      })

      // Create default shelves
      await createDefaultShelves(user.uid)

      return user
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  // Login with email and password
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Login with Google
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(auth, provider)
      
      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (!userDoc.exists()) {
        // New Google user - need to create profile
        // Generate username from email
        const username = user.email.split('@')[0].toLowerCase()
        let finalUsername = username
        
        // Check if username is taken, append number if needed
        let counter = 1
        while ((await getDoc(doc(db, 'usernames', finalUsername))).exists()) {
          finalUsername = `${username}${counter}`
          counter++
        }

        // Create user profile
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          username: finalUsername,
          displayName: user.displayName || finalUsername,
          bio: '',
          photoURL: user.photoURL || '',
          profileCompleted: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })

        // Reserve username
        await setDoc(doc(db, 'usernames', finalUsername), {
          userId: user.uid,
          createdAt: serverTimestamp()
        })

        // Create default shelves
        await createDefaultShelves(user.uid)
      }

      return user
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    }
  }

  // Logout
  function logout() {
    return signOut(auth)
  }

  // Update user profile
  async function updateUserProfile(updates) {
    if (!currentUser) return

    try {
      const oldUsername = userProfile?.username
      const oldEmail = userProfile?.email

      // Check if username changed and validate
      if (updates.username && updates.username !== oldUsername) {
        const newUsername = updates.username.toLowerCase()
        
        // Check if new username is already taken
        const usernameDoc = await getDoc(doc(db, 'usernames', newUsername))
        if (usernameDoc.exists() && usernameDoc.data().userId !== currentUser.uid) {
          throw new Error('Username already taken')
        }

        // Remove old username mapping
        if (oldUsername) {
          await deleteDoc(doc(db, 'usernames', oldUsername))
        }

        // Create new username mapping
        await setDoc(doc(db, 'usernames', newUsername), {
          userId: currentUser.uid,
          createdAt: serverTimestamp()
        })
      }

      // Update Firestore profile
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...updates,
        updatedAt: serverTimestamp()
      }, { merge: true })

      // If displayName changed, update auth profile
      if (updates.displayName) {
        await updateProfile(currentUser, { displayName: updates.displayName })
      }

      // If email changed, update auth email
      if (updates.email && updates.email !== oldEmail) {
        await updateEmail(currentUser, updates.email)
      }

      // Reload profile
      const updatedProfile = await getDoc(doc(db, 'users', currentUser.uid))
      setUserProfile(updatedProfile.data())
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  // Load user profile from Firestore
  async function loadUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        setUserProfile(userDoc.data())
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        await loadUserProfile(user.uid)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
