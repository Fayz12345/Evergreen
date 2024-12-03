// src/components/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { RxReload } from "react-icons/rx";
import { useTranslation } from 'react-i18next'; // Import i18n hook

const Signup = () => {

    
  const { t } = useTranslation('common'); // Load the 'common' namespace
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        email: '',
        role: 'customer', // Default role as 'customer'
        username: '',
        password: '',
        confirmPassword: '', // Not sent to backend
    });
    const [captchaInput, setCaptchaInput] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        loadCaptchaEnginge(6); // Initialize CAPTCHA
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkEmailUnique = async () => {
        try {
            const response = await axios.post(`${apiUrl}/check-email`, { email: formData.email });
            return response.data.isUnique; // Return the uniqueness status
        } catch (error) {
            console.error('Error checking email uniqueness:', error);
            return false;
        }
    };

    const validateForm = async () => {
        const { fullName, address, email, username, password, confirmPassword } = formData;
        const newErrors = {};

        if (!fullName) newErrors.fullName = 'Full Name is required';
        if (!address) newErrors.address = 'Address is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is not valid';
        } else {
            const isEmailUnique = await checkEmailUnique();
            if (!isEmailUnique) newErrors.email = 'Email is already registered';
        }

        if (!username) newErrors.username = 'Username is required';

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
        e.preventDefault(); // Prevent default form submission

        if (await validateForm()) {
            try {
                const response = await axios.post(`${apiUrl}/add-customers`, formData);

                if (response.status === 201) {
                    alert('Signup successful! You can now log in.');
                // Clear the form
                    setFormData({
                        fullName: '',
                        address: '',
                        email: '',
                        role: 'customer', // Reset role to default
                        username: '',
                        password: '',
                        confirmPassword: '',
                    });
                    setCaptchaInput(''); // Clear CAPTCHA input
                    loadCaptchaEnginge(6); // Reload CAPTCHA
                    navigate('/');
                } else {
                    alert('An unexpected error occurred. Please try again.');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('Error during signup. Please try again later.');
            }
        } else {
            setCaptchaInput(''); // Clear CAPTCHA input if validation fails
            loadCaptchaEnginge(6); // Reload CAPTCHA if validation fails
        }
    };

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">{t('fullName')}</label>
                    <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">{t('address')}</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">{t('email')}</label>
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
                    <label htmlFor="username" className="form-label">{t('username')}</label>
                    <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">{t('password')}</label>
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
                        placeholder={t('enterCaptcha')}
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                    />
                    {errors.captcha && <div className="invalid-feedback">{errors.captcha}</div>}
                </div>

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success">{t('logout')}</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
