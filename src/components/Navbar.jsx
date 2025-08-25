import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'

/**
 * मुख्य नेविगेशन बार कंपोनेंट
 * यह उपयोगकर्ता को साइट नेविगेशन प्रदान करता है
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ब्रांड लोगो */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-gray-800 hidden sm:block">
              हमारा स्टोर
            </span>
          </Link>

          {/* खोज बार */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="उत्पाद खोजें..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* दाहिने कोने के आइकन */}
          <div className="flex items-center space-x-4">
            {/* कार्ट आइकन */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* उपयोगकर्ता मेनू */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-1 p-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">{user.displayName || user.email}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      प्रोफाइल
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      मेरे ऑर्डर
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      लॉग आउट
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-secondary py-1.5 px-3 text-sm">
                  लॉग इन
                </Link>
                <Link to="/signup" className="btn-primary py-1.5 px-3 text-sm">
                  साइन अप
                </Link>
              </div>
            )}

            {/* मोबाइल मेनू बटन */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* मोबाइल मेनू */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2 mt-4">
              <Link to="/" className="px-2 py-1 text-gray-800 hover:bg-gray-100 rounded">
                होम
              </Link>
              <Link to="/categories" className="px-2 py-1 text-gray-800 hover:bg-gray-100 rounded">
                श्रेणियाँ
              </Link>
              <Link to="/offers" className="px-2 py-1 text-gray-800 hover:bg-gray-100 rounded">
                ऑफ़र्स
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}