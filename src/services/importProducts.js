import { collection, addDoc, batch, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { addProduct } from './products';

// CSV डेटा को प्रोडक्ट्स में कन्वर्ट करें
export const parseCSVToProducts = (csvData, vendorId = null) => {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const products = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(value => value.trim());
    const product = {};
    
    headers.forEach((header, index) => {
      if (values[index]) {
        product[header] = values[index];
      }
    });
    
    // वेंडर आईडी जोड़ें अगर उपलब्ध है
    if (vendorId) {
      product.vendorId = vendorId;
    }
    
    // कीमत को नंबर में कन्वर्ट करें
    if (product.price) {
      product.price = parseFloat(product.price);
    }
    
    if (product.originalPrice) {
      product.originalPrice = parseFloat(product.originalPrice);
    }
    
    // स्टॉक को नंबर में कन्वर्ट करें
    if (product.stock) {
      product.stock = parseInt(product.stock);
    }
    
    products.push(product);
  }
  
  return products;
};

// JSON डेटा को प्रोडक्ट्स में कन्वर्ट करें
export const parseJSONToProducts = (jsonData, vendorId = null) => {
  let products;
  
  try {
    products = JSON.parse(jsonData);
  } catch (error) {
    throw new Error('अमान्य JSON डेटा');
  }
  
  // वेंडर आईडी जोड़ें अगर उपलब्ध है
  if (vendorId) {
    products = products.map(product => ({
      ...product,
      vendorId
    }));
  }
  
  return products;
};

// बल्क प्रोडक्ट्स इम्पोर्ट करें
export const importBulkProducts = async (products) => {
  try {
    const batch = writeBatch(db);
    const productsCollection = collection(db, 'products');
    
    // बल्क में प्रोडक्ट्स जोड़ें
    for (const product of products) {
      const productRef = doc(productsCollection);
      batch.set(productRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // बल्क कमिट करें
    await batch.commit();
    
    return { 
      success: true, 
      importedCount: products.length 
    };
  } catch (error) {
    console.error('बल्क प्रोडक्ट इम्पोर्ट करने में त्रुटि:', error);
    return { 
      success: false, 
      error: error.message,
      importedCount: 0
    };
  }
};

// एक्सटर्नल API से प्रोडक्ट्स इम्पोर्ट करें
export const importProductsFromAPI = async (apiUrl, vendorId = null) => {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const products = await response.json();
    
    // वेंडर आईडी जोड़ें अगर उपलब्ध है
    if (vendorId) {
      products.forEach(product => {
        product.vendorId = vendorId;
      });
    }
    
    // प्रोडक्ट्स इम्पोर्ट करें
    const result = await importBulkProducts(products);
    
    return result;
  } catch (error) {
    console.error('API से प्रोडक्ट इम्पोर्ट करने में त्रुटि:', error);
    return { 
      success: false, 
      error: error.message,
      importedCount: 0
    };
  }
};