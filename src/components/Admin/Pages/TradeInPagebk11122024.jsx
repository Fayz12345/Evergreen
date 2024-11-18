import React, { useState, useEffect } from 'react';
import TitleHeader from '../../TitleHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TradeInPage = () => {
  const [device, setDevice] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [customer, setCustomer] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('working');
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [priceWorking, setPriceWorking] = useState(0);
  const [priceDamaged, setPriceDamaged] = useState(0);
  const [priceRecycle, setPriceRecycle] = useState(0);

  const navigate = useNavigate();
  const userId = JSON.parse(sessionStorage.getItem('user'))?._id;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/customers`)
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));

    axios.get(`${process.env.REACT_APP_API_URL}/manufacturers`)
      .then(response => setManufacturers(response.data))
      .catch(error => console.error('Error fetching manufacturers:', error));
  }, []);

  useEffect(() => {
    const selectedModel = models.find((m) => m._id === model);
    if (selectedModel) {
      setPriceWorking(selectedModel.priceWorking);
      setPriceDamaged(selectedModel.priceDamaged);
      setPriceRecycle(selectedModel.priceRecycle);
    }
  }, [model, models]); // Add 'models'
  
  
  // Handle manufacturer change and fetch related models
  const handleManufacturerChange = async (e) => {
    const manufacturerId = e.target.value;
    setManufacturer(manufacturerId);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/models?manufacturer=${manufacturerId}`);
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

   // Fetch devices based on the search input
   const handleDeviceSearch = async (e) => {
    const searchQuery = e.target.value;
    setDevice(searchQuery);

    if (searchQuery.length > 1) { // Only search if input length > 1
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices/search?q=${searchQuery}`);
        setSearchResults(response.data); // Update search results
      } catch (error) {
        console.error('Error searching devices:', error);
      }
    } else {
      setSearchResults([]); // Clear results if search query is too short
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/trade`, {
        modelId: model,
        customerId: customer,
        quantity,
        condition,
        priceWorking,
        priceDamaged,
        priceRecycle,
        addedBy: userId,
      });
      navigate('/admin/trade-history');
    } catch (error) {
      console.error('Error saving trade:', error);
    }
  };

  return (
    <>
      <TitleHeader heading={'Trade-In Form'} />
      <div className="mt-5">
        <div className="row justify-content-center">
          <div className={`col-md-6 ${!model ? 'd-flex justify-content-center align-items-center' : ''}`}>
            <div className="card select-device p-4" style={!model ? { width: '100%', maxWidth: '400px' } : {}}>
              <h5 className="text-center">Search your device</h5>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search for your device"
                value={device}
                onChange={handleDeviceSearch} 
              />
               {/* Display search results as a list */}
               {searchResults.length > 0 && (
                <ul className="list-group">
                  {searchResults.map((result) => (
                    <li
                      key={result._id}
                      className="list-group-item"
                      onClick={() => {
                        setDevice(result.modelName);
                        setModel(result._id); // Set selected device
                        setSearchResults([]); // Clear search results
                      }}
                    >
                      {result.modelName} - {result.memory}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mb-3">
                <label>Select the Customer</label>
                <select
                  className="form-control"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {customers.map((cust) => (
                    <option key={cust._id} value={cust._id}>
                      {cust.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Select the Manufacturer</label>
                <select
                  className="form-control"
                  value={manufacturer}
                  onChange={handleManufacturerChange} // Updated function call
                >
                  <option value="">Select Manufacturer</option>
                  {manufacturers.map((man) => (
                    <option key={man._id} value={man._id}>
                      {man.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Select the Model (with memory)</label>
                <select
                  className="form-control"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!manufacturer}
                >
                  <option value="">Select Model</option>
                  {models.map((mod) => (
                    <option key={mod._id} value={mod._id}>
                      {mod.name} - {mod.memory.size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {model && (
            <div className="col-md-6 Trade-form">
              <form className="card p-4 text-center" onSubmit={handleSubmit}>
                <h5 className="mb-3">
                  {models.find((m) => m._id === model)?.name} - {models.find((m) => m._id === model)?.memory.size}
                </h5>

                <input type="hidden" name="addedBy" value={userId} />

                <div className="mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Select Condition</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="condition"
                      value="Working"
                      checked={condition === 'Working'}
                      onChange={() => setCondition('Working')}
                    />
                    <label className="form-check-label">Working</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="condition"
                      value="Defective"
                      checked={condition === 'Defective'}
                      onChange={() => setCondition('Defective')}
                    />
                    <label className="form-check-label">Defective</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="condition"
                      value="Recycled"
                      checked={condition === 'Recycled'}
                      onChange={() => setCondition('Recycled')}
                    />
                    <label className="form-check-label">Recycled</label>
                  </div>
                </div>

                <button type="submit" className="btn btn-success mt-3">
                  Submit Trade
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TradeInPage;
