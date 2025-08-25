import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase कॉन्फ़िगरेशन - अपना खुद का कॉन्फ़िग यहाँ डालें
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase ऐप इनिशियलाइज़ करें
const app = initializeApp(firebaseConfig);

// Firebase सर्विसेज एक्सपोर्ट करें
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;