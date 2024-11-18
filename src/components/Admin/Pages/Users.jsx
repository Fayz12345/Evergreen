// Import necessary dependencies and components

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios to fetch data
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]); // State for fetched users
  const navigate = useNavigate(); // Initialize the navigation hook
  const [newUser, setNewUser] = useState({
    fullName: '',
    role: 'salesrep', // Default role
    email: '',
    avatar: '', // Avatar URL or base64 image
  });

  // Fetch users from the backend (from UserList.js logic)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Users`); // Fetch users
        setUsers(response.data); // Set the fetched users in state
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser({ ...newUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  
  const addUser = async () => {
    if (newUser.fullName && newUser.role && newUser.email) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/addUsers`, newUser);
        setUsers([...users, response.data]); // Add the new user to the list
        setNewUser({ fullName: '', role: 'User', email: '', avatar: '' }); // Clear the form
        navigate('/admin/users');
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Users</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary" onClick={() => navigate('/admin/users')}>
            Go to Users List
          </button>
        </div>
      </div>

      {/* Add User Form */}
      <div className="mb-4">
        <h2>Add New User</h2>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              name="fullName"
              value={newUser.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-control"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="salesrep">Sales Rep</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 d-flex align-items-center">
            <button className="btn btn-primary w-100" onClick={addUser}>
              Add User
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Users;
