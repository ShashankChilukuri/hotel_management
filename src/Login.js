import React, { useState, useEffect } from 'react';
import './css/login.css';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();  // Initialize useNavigate

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
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        onLoginSuccess(result.data); // Pass user data on successful login
        redirectToDashboard(result.data.role); // Navigate to the appropriate dashboard based on role
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Redirect based on user role
  const redirectToDashboard = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin-dashboard');  // Navigate to admin dashboard
        break;
      case 'manager':
        navigate('/manager-dashboard');  // Navigate to manager dashboard
        break;
      case 'receptionist':
        navigate('/receptionist-dashboard');  // Navigate to receptionist dashboard
        break;
      default:
        setError('Unknown role. Unable to redirect.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="hotel-name">The Grand Haven</h1>
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
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
