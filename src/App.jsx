import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Header from './components/Header'
import AdminRoute from './components/AdminRoute' // ⚡ ये बनाना पड़ेगा (admin access check)

// User Pages
import Home from './pages/User/Home'
import ProductDetails from './pages/User/ProductDetails'
import Cart from './pages/User/Cart'

// Auth Pages
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

// Admin Pages
import ImportProducts from './pages/Admin/ImportProducts'
import DropshippingOrders from './pages/Admin/DropshippingOrders'

/**
 * मुख्य ऐप कंपोनेंट - पूरी वेबसाइट का मुख्य घटक
 * यह रूटिंग और प्रदाता (Providers) सेट करता है
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header + Navbar */}
            <Header />
            <Navbar />

            {/* Routes */}
            <main className="flex-grow">
              <Routes>
                {/* मुख्य पृष्ठ */}
                <Route path="/" element={<Home />} />

                {/* प्रमाणीकरण */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* उत्पाद */}
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* कार्ट */}
                <Route path="/cart" element={<Cart />} />

                {/* एडमिन */}
                <Route
                  path="/admin/import-products"
                  element={
                    <AdminRoute>
                      <ImportProducts />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/dropshipping-orders"
                  element={
                    <AdminRoute>
                      <DropshippingOrders />
                    </AdminRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* Notifications */}
            <Toaster position="top-right" />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

// 404 पेज
function NotFound() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">पृष्ठ नहीं मिला</p>
        <a href="/" className="text-blue-600 hover:underline">
          होम पेज पर वापस जाएं
        </a>
      </div>
    </div>
  )
}

export default App