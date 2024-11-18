import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layout/AdminLogin.css'; // Make sure to import the custom CSS

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate to the dashboard on successful login

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation logic
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true'); // Save login status
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="full-screen-container">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header text-center">
            <h3>Admin Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
