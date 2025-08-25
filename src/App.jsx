import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/User/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ProductDetails from './pages/User/ProductDetails'
import Cart from './pages/User/Cart'

/**
 * मुख्य ऐप कंपोनेंट - पूरी वेबसाइट का मुख्य घटक
 * यह रूटिंग और प्रदाता (Providers) सेट करता है
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* मुख्य पृष्ठ रूट */}
              <Route path="/" element={<Home />} />
              
              {/* प्रमाणीकरण रूट */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* उत्पाद रूट */}
              <Route path="/product/:id" element={<ProductDetails />} />
              
              {/* कार्ट रूट */}
              <Route path="/cart" element={<Cart />} />
              
              {/* 404 पृष्ठ - जब कोई रूट नहीं मिलता */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  )
}

// 404 कंपोनेंट
function NotFound() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">पृष्ठ नहीं मिला</p>
        <a href="/" className="text-blue-600 hover:underline">होम पेज पर वापस जाएं</a>
      </div>
    </div>
  )
}

export default App