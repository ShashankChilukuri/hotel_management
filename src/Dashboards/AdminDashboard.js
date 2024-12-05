import React, { useState, useEffect } from 'react';
import GetBookings from '../common/GetBookings'; // Import GetBookings
import CreateCustomer from '../common/CreateCustomer';
import GetRooms from '../common/GetRooms';
import CreateRoom from '../common/CreateRoom';
import '../css/AdminDashboard.css';
import CreateBooking from '../common/CreateBooking';
import GetCustomers from '../common/GetCustomers';
import GetUsers from '../common/GetUsers';
import CreateUser from '../common/CreateUser';

function AdminDashboard({ onLogout }) {
  const [currentSection, setCurrentSection] = useState('Home');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        
        <button onClick={() => handleSectionChange('Home')}>Home</button>
        <button onClick={() => handleSectionChange('createBooking')}>Create Booking</button>
        <button onClick={() => handleSectionChange('getBookings')}>Get All Bookings</button>
        <button onClick={() => handleSectionChange('createRoom')}>Create Room</button>
        <button onClick={() => handleSectionChange('getRooms')}>Get All Rooms</button>
        <button onClick={() => handleSectionChange('createCustomer')}>Create Customer</button>
        <button onClick={() => handleSectionChange('getCustomers')}>Get All Customers</button>
        <button onClick={() => handleSectionChange('createUser')}>Create User</button>
        <button onClick={() => handleSectionChange('getUsers')}>Get All Users</button>
        {/* Logout Button */}
        <button onClick={onLogout}>Logout</button>
      </div>

      <div className="main-content">
      
        <h1><h2>Admin Dashboard</h2></h1>
        {currentSection === 'Home' && (
          <div className="welcome-section">
            <h3>Welcome to the Admin Dashboard</h3>
            <p>Manage rooms, bookings, customers, and users easily from the sidebar.</p>
          </div>
        )}
        {currentSection === 'getRooms' && (
          <div>
            <h1>All Rooms</h1>
            <GetRooms />
          </div>
        )}

        {currentSection === 'createRoom' && (
          <div>
            <h1>Create Rooms</h1>
            <CreateRoom />
          </div>
        )}

        {currentSection === 'getBookings' && (
          <div>
            <h1>Get Bookings</h1>
            <GetBookings />
          </div>
        )}

        {currentSection === 'createBooking' && (
          <div>
            <h1>Create Booking</h1>
            <CreateBooking />
          </div>
        )}

        {currentSection === 'getCustomers' && (
          <div><h1>All Customers</h1>
            <GetCustomers />
          </div>
        )}

        {currentSection === 'createCustomer' && (
          <div>
            <h1>Create Customers</h1>
            <CreateCustomer />
          </div>
        )}

        {currentSection === 'getUsers' && (
          <div>
            <h1>All Users</h1>
            <GetUsers />
          </div>
        )}

        {currentSection === 'createUser' && (
          <div>
            <h1>Create Users</h1>
            <CreateUser />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
