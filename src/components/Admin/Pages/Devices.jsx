import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for API calls
import CSVReader from 'react-csv-reader';
import TitleHeader from '../../TitleHeader';
import ReactPaginate from 'react-paginate';

const Devices = () => {
  const [devices, setDevices] = useState([]); // State for devices
  const [newDevice, setNewDevice] = useState({
    modelName: '',
    memory: '',
    priceWorking: 0,
    priceNonWorking: 0,
    priceRecycle: 0,
    image: '',
  });
  const [editingId, setEditingId] = useState(null); // Track editing device by ID
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const itemsPerPage = 5; // Number of items per page

  // Fetch devices from the backend when the component mounts
  useEffect(() => {
    fetchDevices();
  }, []);

  // API call to fetch all devices
  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices`);
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDevice({ ...newDevice, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or update a device via the API
  const addOrUpdateDevice = async () => {
    try {
      if (editingId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/devices/${editingId}`, newDevice);
        setEditingId(null); // Reset editing state
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/devices`, newDevice);
      }
      fetchDevices(); // Refresh devices list
      setNewDevice({
        modelName: '',
        memory: '',
        priceWorking: 0,
        priceNonWorking: 0,
        priceRecycle: 0,
        image: '',
      });
    } catch (error) {
      console.error('Error adding/updating device:', error);
    }
  };

  // Edit a device
  const handleEdit = (device) => {
    setNewDevice(device);
    setEditingId(device._id);
  };

  // Delete a device via the API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/devices/${id}`);
      fetchDevices(); // Refresh devices list
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  // Handle CSV upload
  const handleCSVUpload = async (data) => {
    const parsedDevices = data.slice(1).map((row) => ({
      modelName: row[0],
      memory: row[1],
      priceWorking: parseFloat(row[2]),
      priceNonWorking: parseFloat(row[3]),
      priceRecycle: 0,
      image: '',
    }));
    for (const device of parsedDevices) {
      await axios.post(`${process.env.REACT_APP_API_URL}/devices`, device);
    }
    fetchDevices(); // Refresh devices list
  };

  // Handle pagination
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const offset = currentPage * itemsPerPage;
  const paginatedDevices = devices.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(devices.length / itemsPerPage);

  return (
    <>
      <TitleHeader heading="Devices" />

      <div className="mb-4">
        <h2>{editingId ? 'Edit Device' : 'Add New Device'}</h2>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Model Name"
              name="modelName"
              value={newDevice.modelName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Memory (e.g., 64GB, 128GB)"
              name="memory"
              value={newDevice.memory}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-2">
            <label>Price (Working)</label>
            <input
              type="number"
              className="form-control"
              name="priceWorking"
              value={newDevice.priceWorking}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label>Price (Defective)</label>
            <input
              type="number"
              className="form-control"
              name="priceNonWorking"
              value={newDevice.priceNonWorking}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-2">
            <label>Price (Recycle)</label>
            <input type="number" className="form-control" value={0} readOnly />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <button className="btn btn-primary w-100" onClick={addOrUpdateDevice}>
              {editingId ? 'Update Device' : 'Add Device'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2>Add Devices via CSV</h2>
        <CSVReader
          onFileLoaded={handleCSVUpload}
          inputStyle={{ color: 'black', marginBottom: '10px' }}
        />
      </div>

      <div className="mt-4">
        <h2>Device List</h2>
        {devices.length > 0 ? (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Model Name</th>
                  <th>Memory</th>
                  <th>Price (Working)</th>
                  <th>Price (Defective)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDevices.map((device, index) => (
                  <tr key={device._id}>
                    <td>{offset + index + 1}</td>
                    <td>{device.modelName}</td>
                    <td>{device.memory}</td>
                    <td>${device.priceWorking}</td>
                    <td>${device.priceNonWorking}</td>
                    <td>
                      <button className="btn btn-warning me-2" onClick={() => handleEdit(device)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(device._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          </>
        ) : (
          <p>No devices added yet.</p>
        )}
      </div>
    </>
  );
};

export default Devices;
