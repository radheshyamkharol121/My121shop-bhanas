import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

// ऑथ कॉन्टेक्स्ट बनाएं
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase user listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firestore से user doc निकालो
        const userRef = doc(db, 'users', firebaseUser.uid)
        const userSnap = await getDoc(userRef)
        const userData = userSnap.exists() ? userSnap.data() : {}

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || userData.name || '',
          photoURL: firebaseUser.photoURL || userData.photoURL || '',
          role: userData.role || 'customer', // 👈 default role
          ...userData
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // 🔹 Login
  const login = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCred.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // 🔹 Signup
  const signup = async (email, password, name, role = 'customer') => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)

      // DisplayName सेट करना
      await updateProfile(userCred.user, { displayName: name })

      // Firestore में doc बनाना
      await setDoc(doc(db, 'users', userCred.user.uid), {
        uid: userCred.user.uid,
        email,
        name,
        role, // default: customer, लेकिन manually admin भी डाल सकते हो
        createdAt: new Date()
      })

      return { success: true, user: userCred.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // 🔹 Logout
  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = { user, login, signup, logout }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// 🔹 Custom hook
export function useAuth() {
  return useContext(AuthContext)
}