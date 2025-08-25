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

/**
 * प्रमाणीकरण कॉन्टेक्स्ट प्रदाता
 * यह ऐप के सभी भागों में उपयोगकर्ता डेटा प्रदान करता है
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // उपयोगकर्ता की प्रमाणीकरण स्थिति की सदस्यता लें
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Firebase से अतिरिक्त उपयोगकर्ता डेटा प्राप्त करें
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.exists() ? userDoc.data() : {}
        
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || userData.name || '',
          photoURL: user.photoURL || userData.photoURL || '',
          ...userData
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  /**
   * उपयोगकर्ता लॉगिन करें
   * @param {string} email - उपयोगकर्ता का ईमेल
   * @param {string} password - उपयोगकर्ता का पासवर्ड
   */
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * नए उपयोगकर्ता को पंजीकृत करें
   * @param {string} email - उपयोगकर्ता का ईमेल
   * @param {string} password - उपयोगकर्ता का पासवर्ड
   * @param {string} name - उपयोगकर्ता का नाम
   */
  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // उपयोगकर्ता प्रोफाइल अपडेट करें
      await updateProfile(userCredential.user, {
        displayName: name
      })

      // Firestore में उपयोगकर्ता डेटा सहेजें
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        name: name,
        createdAt: new Date(),
        role: 'customer'
      })

      return { success: true, user: userCredential.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // उपयोगकर्ता लॉगआउट करें
  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// ऑथ कॉन्टेक्स्ट का उपयोग करने के लिए कस्टम हुक
export function useAuth() {
  return useContext(AuthContext)
}