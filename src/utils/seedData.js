// src/utils/seedData.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const sampleProducts = [
  {
    name: "मेन्स कॉटन टी-शर्ट",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "फैशन",
    rating: 4.5,
    reviewCount: 120
  },
  // और products...
];