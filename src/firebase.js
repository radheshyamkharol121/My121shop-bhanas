import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase कॉन्फ़िगरेशन - अपना खुद का कॉन्फ़िग यहाँ डालें
const firebaseConfig = {
  apiKey: "आपकी_api_key",
  authDomain: "आपका_project.firebaseapp.com",
  projectId: "आपका_project_id",
  storageBucket: "आपका_project.appspot.com",
  messagingSenderId: "आपका_sender_id",
  appId: "आपका_app_id"
};

// Firebase ऐप इनिशियलाइज़ करें
const app = initializeApp(firebaseConfig);

// Firebase सर्विसेज एक्सपोर्ट करें
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;