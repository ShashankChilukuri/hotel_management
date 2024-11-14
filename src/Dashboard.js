import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard({ user }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = () => {
    // API call to fetch rooms (Admin, Manager, Receptionist can see rooms)
    fetch(`/api/rooms/available?date=${selectedDate.toISOString()}`)
      .then((response) => response.json())
      .then((data) => setRooms(data));
  };

  const fetchBookings = () => {
    // Fetch bookings based on role
    fetch(`/api/bookings`)
      .then((response) => response.json())
      .then((data) => setBookings(data));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchRooms();
  };

  const handleBooking = (roomId) => {
    if (user.role === 'RECEPTIONIST' || user.role === 'MANAGER' || user.role === 'ADMIN') {
      fetch(`/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, checkInDate: selectedDate }),
      }).then(() => fetchBookings());
    }
  };

  const handleCheckInOut = (bookingId, action) => {
    if (user.role === 'RECEPTIONIST' || user.role === 'MANAGER' || user.role === 'ADMIN') {
      fetch(`/api/checkinout/${action}/${bookingId}`, { method: 'POST' })
        .then(() => fetchBookings());
    }
  };

  const handleRoomManagement = (action, roomId) => {
    if (user.role === 'ADMIN' || user.role === 'MANAGER') {
      let method = 'POST';
      if (action === 'delete') {
        method = 'DELETE';
      }
      fetch(`/api/rooms/${roomId}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
      }).then(() => fetchRooms());
    }
  };

  const renderRoomActions = (room) => {
    if (user.role === 'ADMIN' || user.role === 'MANAGER') {
      return (
        <div>
          <button onClick={() => handleRoomManagement('delete', room.id)}>Delete Room</button>
          <button onClick={() => handleRoomManagement('update', room.id)}>Update Room</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Dashboard - {user.role}</h1>
      <Calendar value={selectedDate} onChange={handleDateChange} />
      <div>
        <h2>Available Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              Room Number: {room.roomNumber}
              <button onClick={() => handleBooking(room.id)}>Book Room</button>
              {renderRoomActions(room)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Past Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              Room: {booking.roomId} | Check-in: {booking.checkInDate}
              <button onClick={() => handleCheckInOut(booking.id, 'checkin')}>Check-in</button>
              <button onClick={() => handleCheckInOut(booking.id, 'checkout')}>Check-out</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
