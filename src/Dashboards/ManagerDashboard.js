import React, { useState } from 'react';
import GetBookings from '../common/GetBookings'; // Import GetBookings
import CreateCustomer from '../common/CreateCustomer';
import GetRooms from '../common/GetRooms';
import CreateRoom from '../common/CreateRoom';
import '../css/AdminDashboard.css';
import CreateBooking from '../common/CreateBooking';
import GetCustomers from '../common/GetCustomers';

function ManagerDashboard({onLogout}) {
  const [currentSection, setCurrentSection] = useState('getRooms');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Manager Dashboard</h2>
        <button onClick={() => handleSectionChange('Home')}>Home</button>
        <button onClick={() => handleSectionChange('createBooking')}>Create Booking</button>
        <button onClick={() => handleSectionChange('getBookings')}>Get All Bookings</button>
        <button onClick={() => handleSectionChange('createRoom')}>Create Room</button>
        <button onClick={() => handleSectionChange('getRooms')}>Get All Rooms</button>
        <button onClick={() => handleSectionChange('createCustomer')}>Create Customer</button>
        <button onClick={() => handleSectionChange('getCustomers')}>Get All Customers</button>
        <button onClick={() => handleSectionChange('getUsers')}>Get All Users</button>
        <button onClick={onLogout}>Logout</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1>{currentSection.replace(/([A-Z])/g, ' $1').toUpperCase()}</h1>

        {currentSection === 'Home' && (
          <div className="welcome-section">
            <h1>Welcome to the Manager Dashboard</h1>
            <p>Manage rooms, bookings, customers, and users easily from the sidebar.</p>
          </div>
        )}

        {currentSection === 'getRooms' && (
          <div>
            <h2>All Rooms</h2>
            <GetRooms/>
          </div>
        )}

        {currentSection === 'createRoom' && (
          <div>
            <CreateRoom />
          </div>
        )}

        {currentSection === 'getBookings' && (
          <div>
            <GetBookings />
          </div>
        )}

        {currentSection === 'createBooking' && (
          <div>
            <CreateBooking/>
          </div>
        )}

        {currentSection === 'getCustomers' && (
          <div>
            <h2>All Customers</h2>
            <GetCustomers/>
          </div>
        )}

        

        {currentSection === 'getUsers' && (
          <div>
            <h2>All Users</h2>
            {/* Add User fetching code */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
