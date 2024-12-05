import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateBooking({ fetchBookings }) {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Fetch customers who haven't booked yet
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customers/not-booked');
        setCustomers(response.data);
      } catch (err) {
        setError('Error fetching customers.');
      }
    };

    // Fetch available rooms
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rooms/available');
        setRooms(response.data);
      } catch (err) {
        setError('Error fetching rooms.');
      }
    };

    fetchCustomers();
    fetchRooms();
  }, []);

  const handleCreateBooking = async () => {
    if (!selectedCustomer || !selectedRoom || !checkInDate || !checkOutDate) {
      setError('Please fill all fields!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const bookingData = {
      customerId: selectedCustomer,
      roomId: selectedRoom,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/bookings', bookingData);
      setSuccessMessage('Booking created successfully!');
      fetchBookings(); // Refresh the bookings list
    } catch (err) {
      setError('Error creating booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Booking</h3>
      <div className="form-group">
        <label htmlFor="customer">Customer</label>
        <select
          id="customer"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))
          ) : (
            <option>No customers available</option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="room">Room</label>
        <select
          id="room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select Room</option>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNumber} - {room.roomType}
              </option>
            ))
          ) : (
            <option>No available rooms</option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="checkIn">Check-In Date</label>
        <input
          type="date"
          id="checkIn"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="checkOut">Check-Out Date</label>
        <input
          type="date"
          id="checkOut"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </div>

      <button onClick={handleCreateBooking} disabled={loading}>
        {loading ? 'Creating Booking...' : 'Create Booking'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default CreateBooking;
