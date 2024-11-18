import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    try {
      // Attempt to parse as JSON, but if it's a plain string, return as is
      return JSON.parse(data);
    } catch (e) {
      return data; // Return plain string if parsing fails
    }
  };
  
const CustomerInfoForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
  });
  const [tradeData, setTradeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tradeId = loadFromLocalStorage("newTradeId");
    
    if (tradeId) {
      axios.get(`${process.env.REACT_APP_API_URL}/trade/${tradeId}`)
        .then(response => setTradeData(response.data))
        .catch(error => console.error('Error fetching trade data:', error));
    }

    const userId =JSON.parse(sessionStorage.getItem('user'))?._id;
    if (userId) {
      axios.get(`${process.env.REACT_APP_API_URL}/customers/${userId}`)
        .then(response => {
          const { fullName, email, phone, address } = response.data;
          setFormData({
            customerName: fullName || '',
            customerPhone: phone || '',
            customerEmail: email || '',
            customerAddress: address || '',
          });
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // localStorage.setItem('customerInfo', JSON.stringify(formData));
    // alert('Trade-in and customer information saved successfully!');
    // navigate('/tradein');
    e.preventDefault();
    const userId = JSON.parse(sessionStorage.getItem('user'))?._id;
    
    axios.put(`${process.env.REACT_APP_API_URL}/update/${userId}`, {
      fullName: formData.customerName,
      phone: formData.customerPhone,
      email: formData.customerEmail,
      address: formData.customerAddress,
    })
      .then(() => {
        alert('User information updated successfully!');
        navigate('/trade-history'); // Redirect after updating
      })
      .catch(error => console.error('Error updating user information:', error));
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center">Customer Information and Trade-In Summary</h2>

      {tradeData ? (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Device</th>
              <th>Condition</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tradeData.model.name}</td>
              <td>{tradeData.condition}</td>
              <td>{tradeData.quantity}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading trade data...</p>
      )}

      <h2 className="text-center">Enter Customer Information for Trade-In</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="customerName" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="customerPhone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="customerEmail" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="customerAddress" className="form-label">Street Address</label>
            <input
              type="text"
              className="form-control"
              id="customerAddress"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;
