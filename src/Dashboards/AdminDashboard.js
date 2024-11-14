import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null); // Reset error state on each new fetch

    try {
      const response = await axios.get('http://localhost:8080/api/rooms');
      setRooms(response.data);
    } catch (err) {
      setError('Error fetching rooms data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError(null); // Reset error state on each new fetch

    try {
      const response = await axios.get('http://localhost:8080/api/bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Error fetching bookings data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = () => {
    navigate('/add-room');
  };

  const handleAddBooking = () => {
    navigate('/add-booking');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleAddRoom}>Add Room</button>
      <button onClick={handleAddBooking}>Add Booking</button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      <h2>Rooms</h2>
      {loading ? <p>Loading rooms...</p> : (
        Array.isArray(rooms) && rooms.length > 0
          ? <ul>{rooms.map(room => <li key={room.id}>{room.roomNumber} - {room.type}</li>)}</ul>
          : <p>No rooms available</p>
      )}

      <h2>Bookings</h2>
      {loading ? <p>Loading bookings...</p> : (
        Array.isArray(bookings) && bookings.length > 0
          ? <ul>{bookings.map(booking => <li key={booking.id}>Booking ID: {booking.id}</li>)}</ul>
          : <p>No bookings available</p>
      )}
    </div>
  );
}

export default AdminDashboard;
