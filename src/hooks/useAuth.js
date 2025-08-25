import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

/**
 * प्रमाणीकरण (Authentication) के लिए कस्टम हुक
 * यह उपयोगकर्ता लॉगिन, साइनअप और लॉगआउट प्रबंधित करता है
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // उपयोगकर्ता की प्रमाणीकरण स्थिति की सदस्यता लें
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * उपयोगकर्ता लॉगिन करें
   * @param {string} email - उपयोगकर्ता का ईमेल
   * @param {string} password - उपयोगकर्ता का पासवर्ड
   */
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * नए उपयोगकर्ता को पंजीकृत करें
   * @param {string} email - उपयोगकर्ता का ईमेल
   * @param {string} password - उपयोगकर्ता का पासवर्ड
   */
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // उपयोगकर्ता लॉगआउट करें
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { user, loading, login, signup, logout };
};