import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';

// नई नोटिफिकेशन बनाएं
export const createNotification = async (notificationData) => {
  try {
    const notificationRef = await addDoc(collection(db, 'notifications'), {
      ...notificationData,
      createdAt: new Date(),
      read: false
    });
    
    return { success: true, id: notificationRef.id };
  } catch (error) {
    console.error('नोटिफिकेशन बनाने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// उपयोगकर्ता की नोटिफिकेशन प्राप्त करें
export const getUserNotifications = async (userId) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const notifications = [];
    
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    
    return notifications;
  } catch (error) {
    console.error('नोटिफिकेशन प्राप्त करने में त्रुटि:', error);
    throw error;
  }
};

// रियल-टाइम नोटिफिकेशन सुनें
export const subscribeToNotifications = (userId, callback) => {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    callback(notifications);
  });
};

// नोटिफिकेशन को पढ़ा हुआ चिह्नित करें
export const markAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
      readAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('नोटिफिकेशन अपडेट करने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// सिस्टम नोटिफिकेशन भेजें
export const sendSystemNotification = async (title, message, type = 'info') => {
  try {
    // सभी उपयोगकर्ताओं को नोटिफिकेशन भेजें
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    const notifications = [];
    usersSnapshot.forEach((userDoc) => {
      notifications.push({
        userId: userDoc.id,
        title,
        message,
        type,
        isSystem: true
      });
    });
    
    // बैच में नोटिफिकेशन जोड़ें
    const batch = writeBatch(db);
    notifications.forEach(notification => {
      const notificationRef = doc(collection(db, 'notifications'));
      batch.set(notificationRef, {
        ...notification,
        createdAt: new Date(),
        read: false
      });
    });
    
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('सिस्टम नोटिफिकेशन भेजने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};