import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  // अपना Firebase कॉन्फ़िगरेशन यहाँ डालें
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// उत्पाद डेटा
const products = [
  {
    name: "मेन्स कॉटन टी-शर्ट",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "फैशन",
    description: "उच्च गुणवत्ता वाली कॉटन टी-शर्ट, आरामदायक और स्टाइलिश",
    rating: 4.5,
    reviewCount: 120,
    stock: 50,
    vendorId: "vendor1",
    vendorName: "फैशन हब",
    createdAt: new Date()
  },
  {
    name: "वायरलेस इयरफोन",
    price: 1499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    category: "इलेक्ट्रॉनिक्स",
    description: "हाई-क्वालिटी वायरलेस इयरफोन, 20 घंटे की बैटरी लाइफ",
    rating: 4.2,
    reviewCount: 85,
    stock: 30,
    vendorId: "vendor2",
    vendorName: "इलेक्ट्रो मार्ट",
    createdAt: new Date()
  },
  // और उत्पाद...
];

// उपयोगकर्ता डेटा
const users = [
  {
    uid: "user1",
    email: "customer@example.com",
    name: "राहुल शर्मा",
    role: "customer",
    createdAt: new Date(),
    addresses: [
      {
        fullName: "राहुल शर्मा",
        phone: "9876543210",
        pincode: "110001",
        state: "दिल्ली",
        city: "दिल्ली",
        house: "123",
        area: "कनॉट प्लेस",
        isDefault: true
      }
    ]
  },
  {
    uid: "vendor1",
    email: "vendor@example.com",
    name: "फैशन हब",
    role: "vendor",
    createdAt: new Date(),
    storeDetails: {
      name: "फैशन हब",
      description: "फैशनेबल कपड़ों का स्टोर",
      category: "फैशन",
      rating: 4.5
    }
  },
  // और उपयोगकर्ता...
];

// डेटा जोड़ने की फ़ंक्शन
const seedData = async () => {
  try {
    console.log('फायरबेस में डेटा जोड़ना शुरू...');
    
    // उत्पाद जोड़ें
    for (const product of products) {
      await addDoc(collection(db, 'products'), product);
      console.log(`उत्पाद जोड़ा: ${product.name}`);
    }
    
    // उपयोगकर्ता जोड़ें
    for (const user of users) {
      await addDoc(collection(db, 'users'), user);
      console.log(`उपयोगकर्ता जोड़ा: ${user.name}`);
    }
    
    console.log('सभी डेटा सफलतापूर्वक जोड़ा गया!');
  } catch (error) {
    console.error('डेटा जोड़ने में त्रुटि:', error);
  }
};

// स्क्रिप्ट चलाएं
seedData();