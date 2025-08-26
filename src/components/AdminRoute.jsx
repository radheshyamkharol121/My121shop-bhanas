import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/**
 * AdminRoute - Protected Route for Admin Pages
 */
function AdminRoute({ children }) {
  const { user } = useContext(AuthContext)

  // अगर user login नहीं है → तो login page पर redirect
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // अगर user admin नहीं है → तो homepage पर redirect
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // अगर सब सही है → children component render करो
  return children
}

export default AdminRoute