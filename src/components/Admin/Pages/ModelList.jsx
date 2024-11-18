import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/models`);
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleEditClick = (model) => {
    setEditRowId(model._id);
    setEditFormData({ ...model });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleSaveClick = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.put(`${process.env.REACT_APP_API_URL}/models/${encodedId}`, editFormData);
      setMessage('Model updated successfully');
      setEditRowId(null);
      fetchModels();
    } catch (error) {
      console.error('Error updating model:', error);
      setMessage('Error updating model');
    }
  };

  const handleDelete = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/models/${encodedId}`);
      setMessage('Model deleted successfully');
      fetchModels();
    } catch (error) {
      console.error('Error deleting model:', error);
      setMessage('Error deleting model');
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentModels = models.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Models</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary me-2" onClick={() => navigate('/admin/manufacturer')}>
            Add Manufacturer
          </button>
          <button className="btn btn-primary me-2" onClick={() => navigate('/admin/memory')}>
            Add Memory
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/admin/models/add')}>
            Add Models
          </button>
        </div>
      </div>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Memory</th>
            <th>Price (Working)</th>
            <th>Price (Defective)</th>
            <th>Price (Recycle)</th>
            <th>Incentive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentModels.map((model, index) => (
            <tr key={model._id}>
              <td>{offset + index + 1}</td>
              {editRowId === model._id ? (
                <>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>{model.memory.size}</td>
                  <td>
                    <input
                      type="number"
                      name="priceWorking"
                      value={editFormData.priceWorking}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="priceDamaged"
                      value={editFormData.priceDamaged}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>${model.priceRecycle}</td>
                  <td>
                    <input
                      type="number"
                      name="priceIncentive"
                      value={editFormData.priceIncentive}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSaveClick(model._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>{model.memory.size}</td>
                  <td>${model.priceWorking}</td>
                  <td>${model.priceDamaged}</td>
                  <td>${model.priceRecycle}</td>
                  <td>${model.priceIncentive}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditClick(model)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(model._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(models.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center mt-4'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
        disabledClassName={'disabled'}
      />
    </>
  );
};

export default ModelList;
