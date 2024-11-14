import React, { useState, useEffect } from 'react';

function AddBooking() {
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  // Fetch available rooms from the backend
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rooms/available?date=' + checkInDate);
        const data = await response.json();
        if (response.ok) {
          setAvailableRooms(data); // Assuming the data is an array of room numbers
        } else {
          setErrorMessage('Failed to fetch available rooms');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching available rooms');
        console.error(error);
      }
    };

    if (checkInDate) {
      fetchAvailableRooms();
    }
  }, [checkInDate]); // Trigger fetching when checkInDate changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for fields
    if (!roomNumber || !checkInDate || !checkOutDate) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Validate check-out date (should be after check-in date)
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }

    const bookingData = { roomNumber, checkInDate, checkOutDate };

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Booking created successfully');
        // Reset form and error message on successful booking
        setRoomNumber('');
        setCheckInDate('');
        setCheckOutDate('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Failed to create booking');
      }
    } catch (error) {
      setErrorMessage('Error occurred while creating booking');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Booking</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Number</label>
          <select
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          >
            <option value="">Select a room</option>
            {availableRooms.map((room) => (
              <option key={room} value={room}>
                Room {room}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>

        <div>
          <label>Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>

        <button type="submit">Create Booking</button>
      </form>

      <div>
        <h2>Available Rooms</h2>
        <ul>
          {availableRooms.map((room) => (
            <li key={room}>
              <strong>Room {room}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddBooking;
