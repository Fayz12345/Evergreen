import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
const Manufacturer = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null); // Track encrypted ID for edit
  const navigate = useNavigate(); // Initialize the navigation hook


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update manufacturer with encrypted ID
        const encodedId = encodeURIComponent(editId); // Encode encrypted ID
        await axios.put(`${process.env.REACT_APP_API_URL}/manufacturers/${encodedId}`, { name });
        setMessage('Manufacturer updated successfully');
      } else {
        // Add new manufacturer
        await axios.post(`${process.env.REACT_APP_API_URL}/manufacturers`, { name });
        setMessage('Manufacturer added successfully');
      }
      setName('');
      setEditId(null); // Reset edit mode
      navigate('/admin/manufacturer');
    } catch (error) {
      console.error('Error saving manufacturer:', error);
      setMessage('Error saving manufacturer');
    }
  };


  return (
    <>
     <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Add Manufacturer</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary" onClick={() => navigate('/admin/manufacturer')}>
            Go to Manufacturer List
          </button>
        </div>
      </div>
      <div className="container mt-5">
       
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter manufacturer name"
              required
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        {message && <div className="alert alert-info">{message}</div>}
      </div>
     
    </>
  );
};

export default Manufacturer;
