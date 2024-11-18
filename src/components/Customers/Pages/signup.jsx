// src/components/Signup.js
import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';

import { RxReload } from "react-icons/rx";
const Signup = () => {
   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [captchaInput, setCaptchaInput] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        loadCaptchaEnginge(6); // Adjust CAPTCHA length as needed
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkEmailUnique = async () => {
        try {
            const response = await axios.post(`${apiUrl}/check-email`, { email: formData.email });
            return response.data.isUnique;
        } catch (error) {
            console.error('Error checking email uniqueness:', error);
            return false;
        }
    };

    const validateForm = async () => {
        const { name, email, password, confirmPassword } = formData;
        const newErrors = {};
    
        if (!name) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is not valid';
        } else {
            const isEmailUnique = await checkEmailUnique();
            if (!isEmailUnique) newErrors.email = 'Email is already registered';
        }
    
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
    
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
        // Validate CAPTCHA
        if (!validateCaptcha(captchaInput)) {
            newErrors.captcha = 'Invalid CAPTCHA. Please try again.';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await validateForm()) {
            localStorage.setItem('user', JSON.stringify(formData));
            alert('Signup successful! You can now log in.');
            navigate('/login');
        } else {
            setCaptchaInput(''); // Clear the CAPTCHA input if validation fails
            loadCaptchaEnginge(6); // Reload CAPTCHA if validation fails
        }
    };
    

    return (
        <div className=" mt-5">
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                  {/* CAPTCHA Section */}
            <div className="captcha-container mb-3">
                <LoadCanvasTemplate />
                <RxReload
                      className="captcha-reload"
                      onClick={() => loadCaptchaEnginge(6)} // Reload CAPTCHA on icon click
                    />
                <input
                    type="text"
                    className={`form-control ${errors.captcha ? 'is-invalid' : ''} mt-2`}
                    placeholder="Enter CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                />
                {errors.captcha && <div className="invalid-feedback">{errors.captcha}</div>}
            </div>

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success">Signup</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
