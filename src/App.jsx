import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/User/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

/**
 * मुख्य ऐप कंपोनेंट - पूरी वेबसाइट का मुख्य घटक
 * यह रूटिंग और प्रदाता (Providers) सेट करता है
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* मुख्य पृष्ठ रूट */}
              <Route path="/" element={<Home />} />
              
              {/* प्रमाणीकरण रूट */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* 404 पृष्ठ - जब कोई रूट नहीं मिलता */}
              <Route path="*" element={<div>पृष्ठ नहीं मिला</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;