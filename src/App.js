import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './Dashboards/AdminDashboard';
import ManagerDashboard from './Dashboards/ManagerDashboard';
import ReceptionistDashboard from './Dashboards/ReceptionistDashboard';
import './css/App.css';

function App() {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Save user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  // Function to redirect based on user role
  const getRedirectRoute = () => {
    if (user) {
      const role = user.role.toLowerCase(); // Normalize role to lowercase
      switch (role) {
        case 'admin':
          return '/admin-dashboard';
        case 'manager':
          return '/manager-dashboard';
        case 'receptionist':
          return '/receptionist-dashboard';
        default:
          return '/';
      }
    }
    return '/';
  };

  return (
    <Router>
      <div >
        <Routes>
          {/* Route for the login page */}
          <Route
            path="/"
            element={user ? <Navigate to={getRedirectRoute()} /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          {/* Direct routes to role-based dashboards */}
          <Route
            path="/admin-dashboard"
            element={user && user.role.toLowerCase() === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/manager-dashboard"
            element={user && user.role.toLowerCase() === 'manager' ? <ManagerDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/receptionist-dashboard"
            element={user && user.role.toLowerCase() === 'receptionist' ? <ReceptionistDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          {/* Route for adding a room */}
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
