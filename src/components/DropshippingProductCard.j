import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createDropshippingOrder } from '../services/dropshipping';
import { Star, Truck, Clock } from 'lucide-react';

const DropshippingProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!user) {
      alert('कार्ट में जोड़ने के लिए कृपया लॉगिन करें');
      return;
    }

    setAdding(true);
    try {
      // अगर प्रोडक्ट ड्रॉपशिपिंग है तो ड्रॉपशिपिंग ऑर्डर बनाएं
      if (product.isDropshipping) {
        const orderResult = await createDropshippingOrder({
          productId: product.id,
          productName: product.name,
          quantity: 1,
          customerId: user.uid,
          customerName: user.displayName || user.email,
          supplierId: product.supplierId,
          status: 'pending',
          price: product.price
        });

        if (!orderResult.success) {
          throw new Error(orderResult.error);
        }
      }

      // सामान्य कार्ट में जोड़ें
      await addToCart(product);
      
      alert('उत्पाद सफलतापूर्वक कार्ट में जोड़ा गया');
    } catch (error) {
      console.error('उत्पाद जोड़ने में त्रुटि:', error);
      alert(`त्रुटि: ${error.message}`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card group relative">
      {/* ड्रॉपशिपिंग बैज */}
      {product.isDropshipping && (
        <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
          <Truck className="h-3 w-3 mr-1" />
          ड्रॉपशिपिंग
        </div>
      )}
      
      {/* स्टॉक स्थिति */}
      {product.estimatedDelivery && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {product.estimatedDelivery}
        </div>
      )}
      
      <div className="relative">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition duration-200"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-2">
          {/* रेटिंग */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= (product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">({product.reviewCount || 0})</span>
          </div>
        </div>

        {/* कीमत */}
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* सप्लायर जानकारी */}
        {product.supplierName && (
          <p className="text-sm text-gray-500 mb-3">
            सप्लायर: {product.supplierName}
          </p>
        )}

        {/* कार्ट बटन */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {adding ? 'जोड़ रहे हैं...' : 'कार्ट में जोड़ें'}
        </button>
      </div>
    </div>
  );
};

export default DropshippingProductCard;