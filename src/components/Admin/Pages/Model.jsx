import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const Model = () => {
  const [name, setName] = useState(''); // Model name state
  const [manufacturerId, setManufacturerId] = useState('');
  const [memoryId, setMemoryId] = useState('');
  const [priceWorking, setPriceWorking] = useState(0);
  const [priceDamaged, setpriceDamaged] = useState(0);
  const [message, setMessage] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [memories, setMemories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [priceIncentive, setpriceIncentive] = useState(0); // Incentive price state
  
  const navigate = useNavigate(); // Initialize the navigation hook
  useEffect(() => {
    fetchManufacturers();
    fetchMemories();
  }, []);


  const fetchManufacturers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/manufacturers`);
      console.log(response.data);
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const fetchMemories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/memories`);
      console.log(response.data);
      setMemories(response.data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const modelData = {
        name,
        manufacturerId,
        memoryId,
        priceWorking,
        priceDamaged,
        priceIncentive,
      };

      if (editId) {
        const encodedId = encodeURIComponent(editId);
        await axios.put(`${process.env.REACT_APP_API_URL}/models/${encodedId}`, modelData);
      
        setMessage('Model updated successfully');
        
      navigate('/admin/models'); // Adjust this path based on your routing setup


      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/models`, modelData);
        setMessage('Model added successfully');
        navigate('/admin/models'); // Adjust this path based on your routing setup

      }

      // Reset the form
      setName('');
      setManufacturerId('');
      setMemoryId('');
      setPriceWorking(0);
      setpriceDamaged(0);
      setpriceIncentive(0);
      setEditId(null);

    } catch (error) {
      console.error('Error saving model:', error);
      setMessage('Error saving model');
    }
  };




  return (
    <>
    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Models</h1>
            <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
                 <button className="btn btn-primary" onClick={() => navigate('/admin/models')}>
                    Go to Models List
                </button>
            </div>
        </div>
      
    <div className="container mt-5">
      <h2>{editId ? 'Edit Model' : 'Add Model'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Model Name Field */}
        <div className="mb-3">
          <label htmlFor="modelName" className="form-label">Model Name</label>
          <input
            id="modelName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter model name"
            required
          />
        </div>

        {/* Manufacturer Dropdown */}
        <div className="mb-3">
          <label htmlFor="manufacturerSelect" className="form-label">Select Manufacturer</label>
          <select
            id="manufacturerSelect"
            className="form-control"
            value={manufacturerId}
            onChange={(e) => setManufacturerId(e.target.value)}
            required
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Memory Dropdown */}
        <div className="mb-3">
          <label htmlFor="memorySelect" className="form-label">Select Memory</label>
          <select
            id="memorySelect"
            className="form-control"
            value={memoryId}
            onChange={(e) => setMemoryId(e.target.value)}
            required
          >
            <option value="">Select Memory</option>
            {memories.map((memory) => (
              <option key={memory._id} value={memory._id}>
                {memory.size}
              </option>
            ))}
          </select>
        </div>

        {/* Working Price Field */}
        <div className="mb-3">
          <label htmlFor="priceWorking" className="form-label">Price (Working)</label>
          <input
            type="number"
            id="priceWorking"
            className="form-control"
            value={priceWorking}
            onChange={(e) => setPriceWorking(Number(e.target.value))}
            required
          />
        </div>

        {/* Non-Working Price Field */}
        <div className="mb-3">
          <label htmlFor="priceDamaged" className="form-label">Price (Defective)</label>
          <input
            type="number"
            id="priceDamaged"
            className="form-control"
            value={priceDamaged}
            onChange={(e) => setpriceDamaged(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priceIncentive" className="form-label">Incentive Price</label>
          <input
            type="number"
            id="priceIncentive"
            className="form-control"
            value={priceIncentive}
            onChange={(e) => setpriceIncentive(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editId ? 'Update' : 'Save'}
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>

    </>
  );
};

export default Model;
