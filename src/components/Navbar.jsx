import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * मुख्य नेविगेशन बार कंपोनेंट
 * यह उपयोगकर्ता को साइट नेविगेशन प्रदान करता है
 */
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* लोगो और मेनू आइटम */}
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4">
                <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-gray-800 text-lg">
                  हमारा स्टोर
                </span>
              </a>
            </div>
          </div>

          {/* उपयोगकर्ता मेनू */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <button
                onClick={logout}
                className="py-2 px-4 font-medium text-white bg-red-600 rounded hover:bg-red-700 transition duration-300"
              >
                लॉग आउट
              </button>
            ) : (
              <a
                href="/login"
                className="py-2 px-4 font-medium text-gray-800 rounded hover:bg-gray-200 transition duration-300"
              >
                लॉग इन
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};