// src/components/CreateCustomer.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateCustomer({ fetchCustomers }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [govid, setGovid] = useState('');
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateCustomer = async () => {
    if (!name || !email || !phoneNumber || !address || !govid) {
      setError('Please fill all fields!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    const customerData = {
      name,
      email,
      phoneNumber,
      address,
      govid,
      booked,
    };

    try {
      await axios.post('http://localhost:8080/api/customers', customerData);
      setSuccessMessage('Customer created successfully!');
      fetchCustomers();
    } catch (err) {
      setError('Error creating customer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Customer</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="govid">Gov ID</label>
        <input
          type="text"
          id="govid"
          value={govid}
          onChange={(e) => setGovid(e.target.value)}
        />
      </div>

      <button onClick={handleCreateCustomer} disabled={loading}>
        {loading ? 'Creating Customer...' : 'Create Customer'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default CreateCustomer;
