import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA3a6lSIE1952iZUkIfWtozzWlrZbcXM5E",
  authDomain: "my121shop-56021.firebaseapp.com",
  databaseURL: "https://my121shop-56021-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my121shop-56021",
  storageBucket: "my121shop-56021.firebasestorage.app",
  messagingSenderId: "772439515291",
  appId: "1:772439515291:web:6f1cd87e0117390726663e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;