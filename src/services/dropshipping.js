import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';

// नया ड्रॉपशिपिंग सप्लायर जोड़ें
export const addDropshippingSupplier = async (supplierData) => {
  try {
    const supplierRef = await addDoc(collection(db, 'dropshipping_suppliers'), {
      ...supplierData,
      createdAt: new Date(),
      status: 'active'
    });
    
    return { success: true, id: supplierRef.id };
  } catch (error) {
    console.error('ड्रॉपशिपिंग सप्लायर जोड़ने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// ड्रॉपशिपिंग सप्लायर अपडेट करें
export const updateDropshippingSupplier = async (supplierId, updateData) => {
  try {
    const supplierRef = doc(db, 'dropshipping_suppliers', supplierId);
    await updateDoc(supplierRef, {
      ...updateData,
      updatedAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('ड्रॉपशिपिंग सप्लायर अपडेट करने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// सभी ड्रॉपशिपिंग सप्लायर प्राप्त करें
export const getDropshippingSuppliers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dropshipping_suppliers'));
    const suppliers = [];
    
    querySnapshot.forEach((doc) => {
      suppliers.push({ id: doc.id, ...doc.data() });
    });
    
    return suppliers;
  } catch (error) {
    console.error('ड्रॉपशिपिंग सप्लायर प्राप्त करने में त्रुटि:', error);
    throw error;
  }
};

// ड्रॉपशिपिंग ऑर्डर बनाएं
export const createDropshippingOrder = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, 'dropshipping_orders'), {
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    });
    
    return { success: true, id: orderRef.id };
  } catch (error) {
    console.error('ड्रॉपशिपिंग ऑर्डर बनाने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};

// ड्रॉपशिपिंग ऑर्डर स्थिति अपडेट करें
export const updateDropshippingOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'dropshipping_orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('ड्रॉपशिपिंग ऑर्डर स्थिति अपडेट करने में त्रुटि:', error);
    return { success: false, error: error.message };
  }
};