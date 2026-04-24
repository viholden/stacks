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
import { doc, setDoc, getDoc, serverTimestamp, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
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
        profilePictureUrl: '',
        isPrivate: false,
        followers: [],
        following: [],
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
          profilePictureUrl: '',
          isPrivate: false,
          followers: [],
          following: [],
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
      console.error('Load profile error:', error)
    }
  }

  // Upload profile picture — stored as compressed base64 in Firestore (no Storage needed)
  async function uploadProfilePicture(file) {
    if (!currentUser) throw new Error('No user logged in')

    try {
      // Resize & compress to ~200x200 JPEG via canvas
      const dataUrl = await resizeImageToDataUrl(file, 200, 200, 0.75)

      // Store directly on the user doc
      await updateDoc(doc(db, 'users', currentUser.uid), {
        profilePictureUrl: dataUrl,
        updatedAt: serverTimestamp()
      })

      await updateProfile(currentUser, { photoURL: dataUrl })
      setUserProfile(prev => prev ? { ...prev, profilePictureUrl: dataUrl } : prev)

      return dataUrl
    } catch (error) {
      console.error('Profile picture upload error:', error)
      throw error
    }
  }

  // Helper: resize image file to a data URL using canvas
  function resizeImageToDataUrl(file, maxW, maxH, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const scale = Math.min(maxW / img.width, maxH / img.height, 1)
          const w = Math.round(img.width * scale)
          const h = Math.round(img.height * scale)
          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          canvas.getContext('2d').drawImage(img, 0, 0, w, h)
          resolve(canvas.toDataURL('image/jpeg', quality))
        }
        img.onerror = reject
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Follow a user
  async function followUser(targetUserId) {
    if (!currentUser) throw new Error('No user logged in')
    if (targetUserId === currentUser.uid) throw new Error('Cannot follow yourself')

    try {
      // Add to current user's following list
      await updateDoc(doc(db, 'users', currentUser.uid), {
        following: arrayUnion(targetUserId),
        updatedAt: serverTimestamp()
      })

      // Add to target user's followers list
      await updateDoc(doc(db, 'users', targetUserId), {
        followers: arrayUnion(currentUser.uid),
        updatedAt: serverTimestamp()
      })

      // Reload profile
      await loadUserProfile(currentUser.uid)
    } catch (error) {
      console.error('Follow error:', error)
      throw error
    }
  }

  // Unfollow a user
  async function unfollowUser(targetUserId) {
    if (!currentUser) throw new Error('No user logged in')

    try {
      // Remove from current user's following list
      await updateDoc(doc(db, 'users', currentUser.uid), {
        following: arrayRemove(targetUserId),
        updatedAt: serverTimestamp()
      })

      // Remove from target user's followers list
      await updateDoc(doc(db, 'users', targetUserId), {
        followers: arrayRemove(currentUser.uid),
        updatedAt: serverTimestamp()
      })

      // Reload profile
      await loadUserProfile(currentUser.uid)
    } catch (error) {
      console.error('Unfollow error:', error)
      throw error
    }
  }

  // Update privacy settings
  async function updatePrivacySettings(isPrivate) {
    if (!currentUser) throw new Error('No user logged in')

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        isPrivate: isPrivate,
        updatedAt: serverTimestamp()
      })

      // Reload profile
      await loadUserProfile(currentUser.uid)
    } catch (error) {
      console.error('Privacy update error:', error)
      throw error
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
    updateUserProfile,
    uploadProfilePicture,
    followUser,
    unfollowUser,
    updatePrivacySettings
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
