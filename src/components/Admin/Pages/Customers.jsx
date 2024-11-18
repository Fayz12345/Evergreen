import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import { useNavigate } from 'react-router-dom';
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ fullName: '', address: '', email: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [csvData, setCsvData] = useState([]); // Store CSV data
  const [activeTab, setActiveTab] = useState('form'); // Track active tab
  const navigate = useNavigate(); // For navigation on submission

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addOrUpdateCustomer = async () => {
    if (newCustomer.fullName && newCustomer.address && newCustomer.email) {
      try {
        const customerData = {
          fullName: newCustomer.fullName,
          address: newCustomer.address,
          email: newCustomer.email,
          role: 'customer',
          username: newCustomer.email,
          password: '123456',
        };

        if (editIndex !== null) {
          const encryptedId = customers[editIndex]._id;
          await axios.put(`${process.env.REACT_APP_API_URL}/updatecustomer/${encryptedId}`, customerData);

          setEditIndex(null);
          
        } else {
          await axios.post(`${process.env.REACT_APP_API_URL}/add-customers`, customerData);
        }
        navigate('/admin/customers'); // Redirect to the customers list 
        setNewCustomer({ fullName: '', address: '', email: '' });
        fetchCustomers();
      } catch (error) {
        console.error('Error adding or updating customer:', error);
      }
    }
  };

  const handleCSVUpload = (data) => {
    setCsvData(data);
  };

  const uploadCSVData = async () => {
    const batchId = Date.now();
    const uploadedCustomers = csvData.map((row) => ({
      fullName: row[0],
      address: row[1],
      email: row[2],
      role: 'customer',
      username: row[2],
      password: '123456',
      batchId,
    }));

    for (const customer of uploadedCustomers) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/add-customers`, customer);
        
        navigate('/admin/customers'); // Redirect to the customers list 
      } catch (error) {
        console.error('Error uploading customer:', error);
      }
    }
    fetchCustomers();
  };

  const downloadSampleCSV = () => {
    const sampleData = 'Full Name,Address,Email\nJohn Doe,123 Main St,johndoe@example.com\n';
    const blob = new Blob([sampleData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sample_customers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavigateToCustomers = () => {
    navigate('/admin/customers');
  };
  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Customers</h1>
            <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
                 <button className="btn btn-primary" onClick={handleNavigateToCustomers}>
                    Go to Customers List
                </button>
            </div>
        </div>
      
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            Add Customer
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'csv' ? 'active' : ''}`}
            onClick={() => setActiveTab('csv')}
          >
            Batch Upload
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 'form' && (
          <div className="tab-pane active">
            <div className="card p-4 shadow-sm">
              <h4 className="mb-4">{editIndex !== null ? 'Edit Customer' : 'Add New Customer'}</h4>
              <div className="row mb-3 ">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="fullName"
                    value={newCustomer.fullName || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={newCustomer.address || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={newCustomer.email || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <button className="btn btn-primary w-100" onClick={addOrUpdateCustomer}>
                    {editIndex !== null ? 'Update Customer' : 'Add Customer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'csv' && (
          <div className="tab-pane active">
            <div className="card p-4 shadow-sm">
              <h4 className="mb-4">Batch Upload via CSV</h4>
              <div className="input-group mb-3">
                <CSVReader onFileLoaded={handleCSVUpload} />
              </div>
              <div className="d-flex">
                <button className="btn btn-primary me-2" onClick={uploadCSVData}>
                  Upload CSV Data
                </button>
                <button className="btn btn-secondary" onClick={downloadSampleCSV}>
                  Download Sample 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Customers;
