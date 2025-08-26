import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * AdminRoute - केवल Admin users के लिए Protected Route
 */
function AdminRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    // अगर user login नहीं है → login page पर redirect
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    // अगर user है लेकिन admin नहीं → homepage पर redirect
    return <Navigate to="/" replace />
  }

  // ✅ सब सही → children render करो
  return children
}

export default AdminRoute