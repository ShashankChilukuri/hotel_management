import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManagerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8080/api/bookings');
    const data = await response.json();
    setBookings(data);
    setLoading(false);
  };

  const handleCheckIn = async (bookingId) => {
    const response = await fetch(`http://localhost:8080/api/checkin/${bookingId}`, {
      method: 'POST',
    });
    if (response.ok) {
      alert('Checked in successfully');
      fetchBookings();
    }
  };

  const handleCheckOut = async (bookingId) => {
    const response = await fetch(`http://localhost:8080/api/checkout/${bookingId}`, {
      method: 'POST',
    });
    if (response.ok) {
      alert('Checked out successfully');
      fetchBookings();
    }
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <h2>Bookings</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              {booking.id}
              <button onClick={() => handleCheckIn(booking.id)}>Check In</button>
              <button onClick={() => handleCheckOut(booking.id)}>Check Out</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManagerDashboard;
