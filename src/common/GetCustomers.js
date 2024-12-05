import React, { useState, useEffect } from 'react';
import { fetchCustomers } from '../api';

function GetCustomers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => 
    (filterType === 'all' || customer.booked.toString() === filterType) &&
    (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     customer.id.toString().includes(searchTerm))
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
            placeholder="Search customers by name, email, or ID" 
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
          <option value="all">All Customers</option>
          <option value="true">Booked</option>
          <option value="false">Not Booked</option>
        </select>
      </div>

      {loading && <p className="text-blue-500 text-center">Loading customers...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Customer ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">ID Proof</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{customer.id}</td>
                  <td className="p-4">{customer.name}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">{customer.govid}</td>
                  <td className="p-4">
                    {customer.booked ? "Booked" : "Not Booked"}
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

export default GetCustomers;
