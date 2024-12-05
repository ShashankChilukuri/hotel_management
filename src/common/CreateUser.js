import React, { useState } from 'react';
import { createUser } from '../api'; // Import the createUser function from your API file
import '../css/createuser.css';
const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password, role, email };

    try {
      const response = await createUser(userData);
      setSuccess('User created successfully!');
      setError('');
      // Optionally clear the form fields after successful registration
      setUsername('');
      setPassword('');
      setRole('');
      setEmail('');
    } catch (err) {
      setError('Error creating user. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="container">
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
