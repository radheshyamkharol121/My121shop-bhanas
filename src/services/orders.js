import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';

// नया ऑर्डर बनाएं
export const createOrder = async (orderData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('उपयोगकर्ता लॉगिन नहीं है');

    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      userId: user.uid,
      createdAt: new Date(),
      status: 'pending',
      paymentStatus: 'pending'
    });

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error('ऑर्डर बनाने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// उपयोगकर्ता के ऑर्डर प्राप्त करें
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error('ऑर्डर प्राप्त करने में त्रुटि:', error);
    throw error;
  }
};

// ऑर्डर की स्थिति अपडेट करें
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('ऑर्डर स्थिति अपडेट करने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// रियल-टाइम ऑर्डर अपडेट सुनें
export const subscribeToOrderUpdates = (orderId, callback) => {
  const orderRef = doc(db, 'orders', orderId);
  
  return onSnapshot(orderRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    }
  });
};

// सभी ऑर्डर प्राप्त करें (एडमिन के लिए)
export const getAllOrders = async () => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error('सभी ऑर्डर प्राप्त करने में त्रुटि:', error);
    throw error;
  }
};