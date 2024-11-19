import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import Signup from './signup';
import '../Layout/auth.css';
import Cookies from 'js-cookie';
import { RxReload } from "react-icons/rx";
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import framer-motion

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Load CAPTCHA on component mount
    if (!Cookies.get('skipCaptcha')) {
      setTimeout(() => {
        loadCaptchaEnginge(6); // Only load CAPTCHA if not skipping
      }, 100); // Adjust delay as needed
    }
    // Check for saved cookies
    const savedUsername = Cookies.get('username');
    const savedPassword = Cookies.get('password');
    const skipCaptcha = Cookies.get('skipCaptcha');

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }

    if (skipCaptcha) {
      // Skip CAPTCHA if the cookie is present
      setCaptchaInput(''); // Skip CAPTCHA validation
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate CAPTCHA unless skipCaptcha cookie is set
    if (!Cookies.get('skipCaptcha') && !validateCaptcha(captchaInput)) {
      setError("Invalid CAPTCHA. Please try again.");
      return;
    }

    if (!username) {
      setError("Username is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login`, { username, password });

      if (response.status === 200) {
        const { token, user } = response.data;
 
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isLoggedIn', 'true');

        if (rememberMe) {
          // Set cookies for username and password for autofill and skip CAPTCHA for 5 days
          Cookies.set('username', username);
          Cookies.set('password', password);
          Cookies.set('skipCaptcha', true);
        } else {
          Cookies.remove('username');
          Cookies.remove('password');
          Cookies.remove('skipCaptcha');
        }

        navigate(response.data.redirectPath);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Animation Variants
  const fadeVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <section className="slider text-white bg-dark py-5 mt-5">
        <Container>
          <Row className="justify-content-center text-center mt-5">
            <Col lg={9} md={12}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeVariants}
              >
                <h1 className="animated fadeInUp mb-3 mt-5 text-white">Join or Login</h1>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="container-xl mt-5 bg-light p-2 text-dark bg-opacity-25 mb-5"  >
        <div className="card shadow bg-light p-2 text-dark bg-opacity-75 text-left">
          <div className="card-header">
            <ul className="nav nav-tabs authTab card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'login' ? 'active' : ''} text-success`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'signup' ? 'active' : ''} text-success`}
                  onClick={() => setActiveTab('signup')}
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {!Cookies.get('skipCaptcha') && (
                  <div className="form-group mb-3">
                    <div className="captcha-container">
                      <LoadCanvasTemplate />
                      <RxReload
                        className="captcha-reload"
                        onClick={() => loadCaptchaEnginge(6)} // Reload CAPTCHA on icon click
                      />
                      <input
                        type="text"
                        className="form-control captcha-input"
                        placeholder="Enter CAPTCHA"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                      />
                    </div>
                  </div>
                )}

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
                <div className="col">
                  {/* <a href="#!">Forgot password?</a> */}
                </div>

                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success w-100 mt-3">Login</button>
                <div className="text-center">
                  {/* <p>Not a member? <a href="#!" className="text-success">Register</a></p> */}
                </div>
              </form>
            ) : (
              <Signup />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
