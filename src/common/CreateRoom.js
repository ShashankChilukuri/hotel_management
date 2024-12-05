// src/components/CreateRoom.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateRoom({ fetchRooms }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Available');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateRoom = async () => {
    if (!roomNumber || !roomType || !price) {
      setError('Please fill all fields!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    const roomData = { roomNumber, roomType, price, status };

    try {
      await axios.post('http://localhost:8080/api/rooms', roomData);
      setSuccessMessage('Room created successfully!');
      fetchRooms();
    } catch (err) {
      setError('Error creating room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Room</h3>
      <div className="form-group">
        <label htmlFor="roomNumber">Room Number</label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="roomType">Room Type</label>
        <input
          type="text"
          id="roomType"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button onClick={handleCreateRoom} disabled={loading}>
        {loading ? 'Creating Room...' : 'Create Room'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default CreateRoom;
