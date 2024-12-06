import React, { useState, useEffect } from 'react';
import './css/login.css';
import axios from 'axios'; // Import axios

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Focus on the username input once on mount
  useEffect(() => {
    const usernameInput = document.getElementById('username');
    if (usernameInput) usernameInput.focus();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state on submit
    setError(''); // Reset previous errors

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Assuming the user data is returned in response.data
        onLoginSuccess(response.data); // Pass user data on successful login
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      if (err.response) {
        // If there's a response error (e.g., 400 or 500 status code)
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        // If there's an error that didn't come from the server (e.g., network error)
        setError('Server error. Please try again later.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
  <h1 className="hotel-name">Hotel Management System</h1>
  <div className="login-box">
    <h2>Login to Your Account</h2>
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
      </div>
      <button type="submit" className="login-button" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  </div>
</div>

  );
}

export default Login;