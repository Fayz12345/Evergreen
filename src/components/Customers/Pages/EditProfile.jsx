import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch current user data from sessionStorage
        const userData = JSON.parse(sessionStorage.getItem('user'));
        console.log(userData.phone);
        if (!userData) {
            navigate('/login'); // Redirect to login if user data is missing
        } else {
            setUser({
                fullName: userData.fullName || '',
                email: userData.email || '',
                password: '', // Leave password blank initially
                phone: userData.phone || '', // Leave password blank initially
            });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming you have an API to update user profile
        const response = await fetch('/api/update-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const updatedUser = await response.json();
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            setMessage('Profile updated successfully!');
            setTimeout(() => navigate('/profile'), 1500); // Redirect to profile page after update
        } else {
            setMessage('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                {message && <p className="text-success">{message}</p>}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary ms-3" 
                        onClick={() => navigate('/profile')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
