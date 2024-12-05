import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api'; // Assuming you have the fetchUsers function in your API file

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    (filterType === 'all' || user.role.toLowerCase() === filterType) &&
    (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">

      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
            {/* Icon placeholder (if needed) */}
          </div>
          <input
            type="text"
            placeholder="Search users by username, email, or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="receptionist">Receptionist</option>
        </select>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading users...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetUsers;
