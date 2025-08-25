import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { initiateRazorpayPayment } from '../../services/payments';
import { createOrder } from '../../services/orders';
import { loadRazorpay } from '../../services/payments';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    state: '',
    city: '',
    house: '',
    area: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const { user } = useAuth();
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Razorpay स्क्रिप्ट प्रीलोड करें
    loadRazorpay();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // ऑर्डर डेटा तैयार करें
      const orderData = {
        items: cartItems,
        totalAmount,
        customerName: address.fullName,
        customerEmail: user.email,
        customerPhone: address.phone,
        customerAddress: `${address.house}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`,
        paymentMethod,
        status: 'pending',
        paymentStatus: 'pending'
      };

      // ऑर्डर बनाएं
      const orderResult = await createOrder(orderData);
      
      if (!orderResult.success) {
        throw new Error(orderResult.error);
      }

      // Razorpay पेमेंट शुरू करें
      if (paymentMethod === 'razorpay') {
        const paymentResult = await initiateRazorpayPayment({
          orderId: orderResult.orderId,
          amount: totalAmount,
          customerName: address.fullName,
          customerEmail: user.email,
          customerPhone: address.phone,
          customerAddress: `${address.house}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`,
          onSuccess: (response) => {
            // पेमेंट सफल होने पर
            handlePaymentSuccess(orderResult.orderId, response);
          },
          onFailure: (response) => {
            // पेमेंट विफल होने पर
            handlePaymentFailure(orderResult.orderId, response);
          }
        });
      } else if (paymentMethod === 'cod') {
        // Cash on Delivery
        handlePaymentSuccess(orderResult.orderId, { paymentMethod: 'cod' });
      }
    } catch (error) {
      console.error('ऑर्डर प्लेस करने में त्रुटि:', error);
      alert(`ऑर्डर प्लेस करने में त्रुटि: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (orderId, paymentResponse) => {
    try {
      // ऑर्डर स्थिति अपडेट करें
      await updateOrderStatus(orderId, 'confirmed');
      
      // कार्ट साफ़ करें
      clearCart();
      
      // सफलता पृष्ठ पर नेविगेट करें
      navigate('/order-success', { 
        state: { 
          orderId, 
          paymentId: paymentResponse.razorpay_payment_id || 'COD' 
        } 
      });
    } catch (error) {
      console.error('पेमेंट सक्सेस हैंडलिंग में त्रुटि:', error);
    }
  };

  const handlePaymentFailure = async (orderId, paymentResponse) => {
    try {
      // ऑर्डर स्थिति अपडेट करें
      await updateOrderStatus(orderId, 'payment_failed');
      
      // विफलता पृष्ठ पर नेविगेट करें
      navigate('/order-failed', { 
        state: { 
          orderId, 
          error: paymentResponse.error ? paymentResponse.error.description : 'अज्ञात त्रुटि' 
        } 
      });
    } catch (error) {
      console.error('पेमेंट फेल्योर हैंडलिंग में त्रुटि:', error);
    }
  };

  const validateForm = () => {
    // फॉर्म वैलिडेशन लॉजिक
    const requiredFields = ['fullName', 'phone', 'pincode', 'state', 'city', 'house', 'area'];
    for (const field of requiredFields) {
      if (!address[field] || address[field].trim() === '') {
        alert(`कृपया ${field} फ़ील्ड भरें`);
        return false;
      }
    }
    
    if (address.phone.length !== 10) {
      alert('कृपया सही फोन नंबर दर्ज करें');
      return false;
    }
    
    if (address.pincode.length !== 6) {
      alert('कृपया सही पिनकोड दर्ज करें');
      return false;
    }
    
    return true;
  };

  if (cartItems.length === 0) {
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
      <h1 className="text-2xl font-bold mb-6">चेकआउट</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* डिलीवरी एड्रेस */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">डिलीवरी का पता</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">पूरा नाम *</label>
              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">मोबाइल नंबर *</label>
              <input
                type="tel"
                name="phone"
                value={address.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">पिन कोड *</label>
                <input
                  type="text"
                  name="pincode"
                  value={address.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">राज्य *</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">शहर/कस्बा *</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">फ्लैट/हाउस नं./बिल्डिंग नं. *</label>
              <input
                type="text"
                name="house"
                value={address.house}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">क्षेत्र/कॉलोनी/सड़क नं. *</label>
              <input
                type="text"
                name="area"
                value={address.area}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>
        </div>
        
        {/* ऑर्डर सारांश */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ऑर्डर सारांश</h2>
          
          <div className="mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">मात्रा: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('hi-IN')}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>उत्पाद मूल्य</span>
              <span>₹{totalAmount.toLocaleString('hi-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>डिलीवरी शुल्क</span>
              <span className="text-green-600">मुफ़्त</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>कुल राशि</span>
              <span>₹{totalAmount.toLocaleString('hi-IN')}</span>
            </div>
          </div>
          
          {/* भुगतान विधि */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">भुगतान विधि चुनें</h3>
            
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">क्रेडिट/डेबिट कार्ड या UPI</p>
                  <p className="text-sm text-gray-600">तुरंत भुगतान करें</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">कैश ऑन डिलीवरी</p>
                  <p className="text-sm text-gray-600">डिलीवरी पर भुगतान करें</p>
                </div>
              </label>
            </div>
          </div>
          
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'प्रोसेसिंग...' : `₹${totalAmount.toLocaleString('hi-IN')} का भुगतान करें`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;