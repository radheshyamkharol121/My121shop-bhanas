import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { getAllOrders } from '../../services/orders';
import { getProducts } from '../../services/products';
import { getUsers } from '../../services/users';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // सभी डेटा एक साथ लोड करें
      const [orders, products, users] = await Promise.all([
        getAllOrders(),
        getProducts(),
        getUsers()
      ]);

      // आंकड़े तैयार करें
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      
      // श्रेणी के अनुसार डेटा तैयार करें
      const categorySales = {};
      orders.forEach(order => {
        order.items?.forEach(item => {
          if (item.category) {
            categorySales[item.category] = (categorySales[item.category] || 0) + (item.price * item.quantity);
          }
        });
      });
      
      const categoryChartData = Object.keys(categorySales).map(category => ({
        name: category,
        value: categorySales[category]
      }));

      // महीने के अनुसार बिक्री डेटा तैयार करें
      const monthlySales = {};
      orders.forEach(order => {
        const month = new Date(order.createdAt?.toDate()).getMonth();
        monthlySales[month] = (monthlySales[month] || 0) + (order.totalAmount || 0);
      });
      
      const salesChartData = [
        { month: 'जन', sales: monthlySales[0] || 0 },
        { month: 'फर', sales: monthlySales[1] || 0 },
        { month: 'मार्च', sales: monthlySales[2] || 0 },
        { month: 'अप्रै', sales: monthlySales[3] || 0 },
        { month: 'मई', sales: monthlySales[4] || 0 },
        { month: 'जून', sales: monthlySales[5] || 0 },
        { month: 'जुला', sales: monthlySales[6] || 0 },
        { month: 'अग', sales: monthlySales[7] || 0 },
        { month: 'सित', sales: monthlySales[8] || 0 },
        { month: 'अक्टू', sales: monthlySales[9] || 0 },
        { month: 'नव', sales: monthlySales[10] || 0 },
        { month: 'दिस', sales: monthlySales[11] || 0 },
      ];

      // स्टेट सेट करें
      setStats({
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
        totalProducts: products.length,
        totalUsers: users.length
      });
      
      setRecentOrders(orders.slice(0, 5));
      setSalesData(salesChartData);
      setCategoryData(categoryChartData);
    } catch (error) {
      console.error('डैशबोर्ड डेटा लोड करने में त्रुटि:', error);
    }
  };

  // पाई चार्ट के लिए रंग
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">एडमिन डैशबोर्ड</h1>
      
      {/* स्टैट्स कार्ड्स */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">कुल ऑर्डर</h3>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">कुल राजस्व</h3>
          <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">लंबित ऑर्डर</h3>
          <p className="text-2xl font-bold">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">उत्पाद</h3>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">उपयोगकर्ता</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>
      
      {/* चार्ट्स */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">मासिक बिक्री</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'बिक्री']} />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">श्रेणी के अनुसार बिक्री</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`₹${value}`, 'बिक्री']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* हाल के ऑर्डर */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">हाल के ऑर्डर</h3>
        <div className="overflow-x-auto">
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
                  तारीख
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  राशि
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  स्थिति
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.createdAt?.toDate().toLocaleDateString('hi-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.totalAmount?.toLocaleString('hi-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;