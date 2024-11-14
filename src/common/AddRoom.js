import React, { useState } from 'react';
import axios from 'axios';

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      roomNumber,
      type,
      price: parseFloat(price),  // Ensure price is a float
      available
    };

    try {
      // Send a POST request to the backend API to add the room
      const response = await axios.post('http://localhost:8080/api/rooms', roomData);

      // If successful, display success message
      setMessage(response.data);
    } catch (error) {
      // Handle error (e.g., room already exists or server error)
      setMessage('Error adding room: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div>
      <h2>Add New Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Room Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable(!available)}
          />
        </div>
        <button type="submit">Add Room</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddRoom;
