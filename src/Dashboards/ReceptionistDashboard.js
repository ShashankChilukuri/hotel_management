import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReceptionistDashboard() {
  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAvailableRooms = async () => {
    if (!date) return;
    setLoading(true);
    const response = await fetch(`http://localhost:8080/api/rooms/available?date=${date}`);
    const data = await response.json();
    setRooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, [date]);

  return (
    <div>
      <h1>Receptionist Dashboard</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <h2>Available Rooms</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {rooms.map(room => (
            <li key={room.id}>{room.roomNumber}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReceptionistDashboard;
