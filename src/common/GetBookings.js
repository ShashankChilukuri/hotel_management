import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadBookings();
  }, [filterType]);  // Depend on filterType to reload bookings whenever it changes

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      let url = 'http://localhost:8080/api/bookings';

      if (filterType !== 'all') {
        url = `http://localhost:8080/api/bookings/status?status=${filterType}`;
      }

      const response = await axios.get(url);
      let filteredData = response.data;

      // Apply search filtering after loading the data
      if (searchTerm) {
        filteredData = filteredData.filter(booking =>
          booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.room.roomNumber.toString().includes(searchTerm) ||
          booking.id.toString().includes(searchTerm)
        );
      }

      setBookings(filteredData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      
      
      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Find bookings by customer, room, or ID" 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}  // Set filterType directly
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Bookings</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">Customer Name</th>
              <th className="p-4 text-left">Room Number</th>
              <th className="p-4 text-left">Check-In</th>
              <th className="p-4 text-left">Check-Out</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{booking.id}</td>
                  <td className="p-4">{booking.customer.name}</td>
                  <td className="p-4">{booking.room.roomNumber}</td>
                  <td className="p-4">{booking.checkIn}</td>
                  <td className="p-4">{booking.checkOut}</td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold 
                      ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'Canceled' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'}`}
                    >
                      {booking.status}
                    </span>
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

export default GetBookings;
