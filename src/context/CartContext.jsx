import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CartContext = createContext();

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: true
  });
  const { user } = useAuth();

  // Firebase से cart डेटा लोड करें
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      try {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        
        if (cartSnap.exists()) {
          dispatch({ type: 'SET_CART', payload: cartSnap.data().items || [] });
        } else {
          dispatch({ type: 'SET_CART', payload: [] });
        }
      } catch (error) {
        console.error('Cart लोड करने में त्रुटि:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCart();
  }, [user]);

  // Firebase में cart डेटा सेव करें
  useEffect(() => {
    const saveCart = async () => {
      if (!user || state.loading) return;

      try {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: state.items }, { merge: true });
      } catch (error) {
        console.error('Cart सेव करने में त्रुटि:', error);
      }
    };

    saveCart();
  }, [state.items, user, state.loading]);

  // Cart में आइटम जोड़ें
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Cart से आइटम निकालें
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  // आइटम की मात्रा अपडेट करें
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  // Cart साफ़ करें
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // कुल मूल्य गणना
  const totalAmount = state.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // कुल आइटम गणना
  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const value = {
    items: state.items,
    loading: state.loading,
    totalAmount,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};