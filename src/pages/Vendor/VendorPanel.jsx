import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getVendorProducts, addProduct, updateProduct } from '../../services/products';
import { getVendorOrders, updateOrderStatus } from '../../services/orders';

const VendorPanel = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadVendorData();
    }
  }, [user, activeTab]);

  const loadVendorData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const vendorProducts = await getVendorProducts(user.uid);
        setProducts(vendorProducts);
      } else if (activeTab === 'orders') {
        const vendorOrders = await getVendorOrders(user.uid);
        setOrders(vendorOrders);
      }
    } catch (error) {
      console.error('वेंडर डेटा लोड करने में त्रुटि:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await addProduct({
        ...productData,
        vendorId: user.uid,
        vendorName: user.displayName
      });
      await loadVendorData(); // रिफ्रेश करें
    } catch (error) {
      console.error('उत्पाद जोड़ने में त्रुटि:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadVendorData(); // रिफ्रेश करें
    } catch (error) {
      console.error('ऑर्डर स्थिति अपडेट करने में त्रुटि:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">वेंडर डैशबोर्ड</h1>
      
      {/* टैब्स */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            मेरे उत्पाद
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ऑर्डर
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            विश्लेषण
          </button>
        </nav>
      </div>
      
      {/* कंटेंट */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">मेरे उत्पाद</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              नया उत्पाद जोड़ें
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">आपने अभी तक कोई उत्पाद नहीं जोड़ा है</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">₹{product.price}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `स्टॉक: ${product.stock}` : 'आउट ऑफ स्टॉक'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-xl font-semibold mb-6">ऑर्डर</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">अभी तक कोई ऑर्डर नहीं है</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ऑर्डर आईडी
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ग्राहक
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      उत्पाद
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      राशि
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      स्थिति
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      कार्रवाई
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items?.length} उत्पाद
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{order.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="pending">लंबित</option>
                          <option value="confirmed">पुष्टि हुई</option>
                          <option value="shipped">शिप किया गया</option>
                          <option value="out_for_delivery">डिलीवरी के लिए तैयार</option>
                          <option value="delivered">डिलीवर हो गया</option>
                          <option value="cancelled">रद्द किया गया</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div>
          <h2 className="text-xl font-semibold mb-6">विक्रेता विश्लेषण</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center py-8">
              विश्लेषण डैशबोर्ड जल्द ही उपलब्ध होगा
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPanel;