import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'

/**
 * उत्पाद कार्ड कंपोनेंट
 * उत्पाद की जानकारी ग्रिड व्यू में दिखाता है
 */
export default function ProductCard({ product }) {
  return (
    <div className="card group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition duration-200"
          />
        </Link>
        
        {/* विश बटन */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition duration-200">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>

        {/* छूट बैज */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        
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

        {/* कार्ट बटन */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200">
          कार्ट में जोड़ें
        </button>
      </div>
    </div>
  )
}



// useCart hook import करें
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product);
      // सफलता नोटिफिकेशन दिखाएं
      toast.success('उत्पाद कार्ट में जोड़ा गया');
    } catch (error) {
      toast.error('त्रुटि: उत्पाद जोड़ने में विफल');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card group">
      {/* उत्पाद विवरण */}
      
      {/* कार्ट बटन */}
      <button 
        onClick={handleAddToCart}
        disabled={adding}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
      >
        {adding ? 'जोड़ रहे हैं...' : 'कार्ट में जोड़ें'}
      </button>
    </div>
  );
}