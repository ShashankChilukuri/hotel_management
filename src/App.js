import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './Dashboards/AdminDashboard';
import ManagerDashboard from './Dashboards/ManagerDashboard';
import ReceptionistDashboard from './Dashboards/ReceptionistDashboard';
import AddRoom from './common/AddRoom';  // Assuming this is the AddRoom component
import AddBooking from './common/AddBooking';  // Assuming this is the AddBooking component
import './css/App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Update the user state with the logged-in user data
  };

  // Function to redirect based on user role
  const redirectToDashboard = () => {
    if (user) {
      switch (user.role) {
        case 'admin':
          return <Navigate to="/admin-dashboard" />;
        case 'manager':
          return <Navigate to="/manager-dashboard" />;
        case 'receptionist':
          return <Navigate to="/receptionist-dashboard" />;
        default:
          return <Navigate to="/" />;
      }
    }
    return <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route for the login page */}
          <Route
            path="/"
            element={user ? redirectToDashboard() : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          {/* Direct routes to role-based dashboards */}
          <Route
            path="/admin-dashboard"
            element={user && user.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/manager-dashboard"
            element={user && user.role === 'manager' ? <ManagerDashboard user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/receptionist-dashboard"
            element={user && user.role === 'receptionist' ? <ReceptionistDashboard user={user} /> : <Navigate to="/" />}
          />
          {/* Route for adding a room */}
          <Route
            path="/add-room"
            element={user && user.role === 'admin' ? <AddRoom /> : <Navigate to="/" />}
          />
          {/* Route for adding a booking */}
          <Route
            path="/add-booking"
            element={user && user.role === 'admin' ? <AddBooking /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
