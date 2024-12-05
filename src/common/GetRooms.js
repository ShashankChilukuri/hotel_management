import React, { useState, useEffect } from 'react';
import { fetchRooms, deleteRoom } from '../api';

function GetRooms() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      setError('');
      await deleteRoom(id);
      loadRooms(); // Refresh room list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredRooms = rooms.filter(room => 
    (filterStatus === 'all' || room.status === filterStatus) &&
    (room.roomNumber.toString().includes(searchTerm) || 
     room.id.toString().includes(searchTerm))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Room Management</h3>
      
      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
            
          </div>
          <input 
            type="text" 
            placeholder="Search rooms by number or ID" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Rooms</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading rooms...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Room ID</th>
              <th className="p-4 text-left">Room Number</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No rooms found
                </td>
              </tr>
            ) : (
              filteredRooms.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{room.id}</td>
                  <td className="p-4">{room.roomNumber}</td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold 
                      ${room.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        room.status === 'Occupied' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'}
                    `}>
                      {room.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleDeleteRoom(room.id)} 
                      disabled={loading}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetRooms;