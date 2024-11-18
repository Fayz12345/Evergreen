import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, { username, password });

      if (response.status === 200) {
        const { token, user } = response.data;
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', token);
        storage.setItem('user', JSON.stringify(user));
        storage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isLoggedIn', 'true');

        if (rememberMe) {
          localStorage.setItem('savedUsername', username);
          localStorage.setItem('savedPassword', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('savedUsername');
          localStorage.removeItem('savedPassword');
          localStorage.removeItem('rememberMe');
        }

        navigate(response.data.redirectPath);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="full-screen-container">
        
      <div className="col-md-6">
      
        <div className="card shadow text-left">
          <div className="card-header">
            <h3 >Login</h3>
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
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
              </div>

              {/* hCaptcha Component */}
              <HCaptcha
                sitekey="cc96a0b6-5124-4398-a7ee-420c16046a96"  // Replace with your actual hCaptcha site key
                onVerify={handleCaptchaChange}
              />

              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
