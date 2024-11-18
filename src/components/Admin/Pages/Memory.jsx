import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const Memory = () => {
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memoryData = { size };
      
        // Add new memory
        await axios.post(`${process.env.REACT_APP_API_URL}/memories`, memoryData);
        setMessage('Memory added successfully');
     
      setSize('');
      navigate('/admin/memory');
    } catch (error) {
      console.error('Error adding memory:', error);
      setMessage('Error adding memory');
    }
  };
 

  return (
    <>
   
    
    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Memory</h1>
            <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
                 <button className="btn btn-primary" onClick={() => navigate('/admin/memory')}>
                    Go to Memory List
                </button>
            </div>
        </div>
    <div className="container mt-5">
    <h2>Add Memory</h2>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Enter memory size (e.g., 128GB)"
            required
          />
          <button type="submit" className="btn btn-primary"> Add</button>
        </div>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
      </div>
    </>
  );
};

export default Memory;
