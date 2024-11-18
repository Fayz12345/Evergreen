import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import TitleHeader from '../../TitleHeader';

import ReactPaginate from 'react-paginate';
// Helper functions to load and save data from localStorage
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Sample CSV content
const sampleCSVContent = `name,device,condition,quantity,value,status
John Doe,iPhone 12,Working,1,500,Pending
Jane Smith,Samsung Galaxy S10,Non-Working,2,300,Pending
Alice Johnson,Google Pixel 5,Recycle,1,50,Completed
Bob Lee,iPhone XR,Working,3,400,Pending`;

const createSampleCSV = () => {
  const blob = new Blob([sampleCSVContent], { type: 'text/csv' });
  return URL.createObjectURL(blob);
};

const Trade = () => {
  const [customers] = useState(loadFromLocalStorage('customers'));
  const [devices] = useState(loadFromLocalStorage('devices'));
  const [history, setHistory] = useState(loadFromLocalStorage('tradeInHistory'));
  const [currentPage, setCurrentPage] = useState(0); // Track the current page

  const itemsPerPage = 5; // Set items per page
  const [manualEntry, setManualEntry] = useState({
    name: '',
    device: '',
    condition: 'Working',
    quantity: 1,
    value: 0,
    status: 'Pending',
  });

  useEffect(() => {
    saveToLocalStorage('tradeInHistory', history);
  }, [history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualEntry({ ...manualEntry, [name]: value });

    if (name === 'device') {
      const selectedDevice = devices.find((device) => device.modelName === value);
      if (selectedDevice) {
        setManualEntry({
          ...manualEntry,
          device: value,
          condition: 'Working',
          value: selectedDevice.priceWorking,
        });
      }
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // Update the current page
  };



  const handleConditionChange = (e) => {
    const condition = e.target.value;
    const selectedDevice = devices.find((device) => device.modelName === manualEntry.device);
    let value = 0;
    if (selectedDevice) {
      if (condition === 'Working') value = selectedDevice.priceWorking;
      else if (condition === 'Non-Working') value = selectedDevice.priceNonWorking;
      else value = selectedDevice.priceRecycle;
    }
    setManualEntry({ ...manualEntry, condition, value });
  };

  const addManualEntry = () => {
    if (manualEntry.name && manualEntry.device && manualEntry.quantity > 0) {
      setHistory((prev) => [...prev, { ...manualEntry, quantity: parseInt(manualEntry.quantity) }]);
      setManualEntry({ name: '', device: '', condition: 'Working', quantity: 1, value: 0, status: 'Pending' });
    }
  };

  // const clearHistory = () => {
  //   setHistory([]);
  //   localStorage.removeItem('tradeInHistory');
  // };

  const handleCSVUpload = (data) => {
    const uploadedData = data.map((row) => ({
      name: row[0],
      device: row[1],
      condition: row[2],
      quantity: parseInt(row[3]),
      value: parseFloat(row[4]),
      status: row[5] || 'Pending',
    }));
    setHistory((prev) => [...prev, ...uploadedData]);
  };

  const updateStatus = (index, newStatus) => {
    const updatedHistory = [...history];
    // Prevent status change if it is already approved
    if (updatedHistory[index].status === 'Approved') return;
    
    updatedHistory[index].status = newStatus;
    setHistory(updatedHistory);
  };

  const totalQuantity = history.reduce((acc, entry) => acc + entry.quantity, 0);
  // Calculate the paginated devices
  const offset = currentPage * itemsPerPage;
  const paginatedDevices = history.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(history.length / itemsPerPage);
  return (
   <>
          <TitleHeader heading="Trade-In" />


            <div className="mb-4">
              <h2>Manual</h2>

              {/* Customer Name */}
              <div className="row">
                <div className="col-md-12 mb-2">
                  <select
                    className="form-control"
                    name="name"
                    value={manualEntry.name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer, index) => (
                      <option key={index} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Device Selection */}
              <div className="row">
                <div className="col-md-6 mb-2">
                  <select
                    className="form-control"
                    name="device"
                    value={manualEntry.device}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Device</option>
                    {devices.map((device, index) => (
                      <option key={index} value={device.modelName}>
                        {device.modelName} ({device.memory})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Selection */}
                <div className="col-md-6 mb-2">
                  <select
                    className="form-control"
                    name="condition"
                    value={manualEntry.condition}
                    onChange={handleConditionChange}
                  >
                    <option value="Working">Working</option>
                    <option value="Non-Working">Non-Working</option>
                    <option value="Recycle">Recycle</option>
                  </select>
                </div>
              </div>

              {/* Quantity and Value */}
              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    name="quantity"
                    value={manualEntry.quantity}
                    min="1"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Trade-In Value"
                    name="value"
                    value={manualEntry.value}
                    readOnly
                  />
                </div>
              </div>

              <button className="btn btn-primary w-100 mt-2" onClick={addManualEntry}>
                Add Entry
              </button>
            </div>


            <div className="mb-4">
              <h2>Upload CSV</h2>
              <CSVReader onFileLoaded={handleCSVUpload} />
              <a href={createSampleCSV()} download="trade-in-sample.csv" className="btn btn-secondary mt-3">
                Download Sample CSV
              </a>
            </div>

            <div className="mt-4">
              <h2>History</h2>
              {history.length > 0 ? (
                <>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Device</th>
                      <th>Condition</th>
                      <th>Quantity</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                       {paginatedDevices.map((entry, index) => (
                        <tr key={index}>
                          <td>{offset + index + 1}</td>
                          <td>{entry.name}</td>
                          <td>{entry.device}</td>
                          <td>{entry.condition}</td>
                          <td>{entry.quantity}</td>
                          <td>${entry.value}</td>
                          <td>
                            <select
                              value={entry.status}
                              onChange={(e) => updateStatus(index, e.target.value)}
                              className="form-control"
                              disabled={entry.status === 'Approved'} // Disable dropdown if status is 'Approved'
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                     
                   
                  </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                  />
                </>
              ) : (
                <p>No trade-in history available.</p>
              )}
             
              <h4>Total Devices: {totalQuantity}</h4>
            </div>

            {/* <button className="btn btn-danger mt-3" onClick={clearHistory}>
              Clear History
            </button> */}
       
        
    </>
  );
};

export default Trade;
