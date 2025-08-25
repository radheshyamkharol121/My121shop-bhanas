import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">कार्ट देखने के लिए लॉगिन करें</h2>
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          लॉगिन करें
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">आपके कार्ट में कोई आइटम नहीं है</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          खरीदारी जारी रखें
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">शॉपिंग कार्ट</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {items.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-8 text-center">{item.quantity}</span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="ml-4">
                  <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('hi-IN')}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ऑर्डर सारांश</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>कुल आइटम ({totalItems})</span>
              <span>₹{totalAmount.toLocaleString('hi-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>डिलीवरी शुल्क</span>
              <span className="text-green-600">मुफ़्त</span>
            </div>
          </div>
          
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>कुल राशि</span>
              <span>₹{totalAmount.toLocaleString('hi-IN')}</span>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            चेकआउट करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;