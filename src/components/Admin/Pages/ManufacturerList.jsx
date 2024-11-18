import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const ManufacturerList = () => {
  const [message, setMessage] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of manufacturers per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/manufacturers`);
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const handleEdit = (manufacturer) => {
    setEditId(manufacturer._id);
    setEditName(manufacturer.name);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  const handleSaveEdit = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.put(`${process.env.REACT_APP_API_URL}/manufacturers/${encodedId}`, { name: editName });
      setMessage('Manufacturer updated successfully');
      setEditId(null);
      fetchManufacturers();
    } catch (error) {
      console.error('Error updating manufacturer:', error);
      setMessage('Error updating manufacturer');
    }
  };

  const handleDelete = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/manufacturers/${encodedId}`);
      setMessage('Manufacturer deleted successfully');
      fetchManufacturers();
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
      setMessage('Error deleting manufacturer');
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentManufacturers = manufacturers.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Manufacturers</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary" onClick={() => navigate('/admin/manufacturer/add')}>
            Add Manufacturer
          </button>
        </div>
      </div>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentManufacturers.map((manufacturer, index) => (
            <tr key={manufacturer._id}>
              <td>{offset + index + 1}</td>
              <td>
                {editId === manufacturer._id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  manufacturer.name
                )}
              </td>
              <td>
                {editId === manufacturer._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSaveEdit(manufacturer._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(manufacturer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(manufacturer._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(manufacturers.length / itemsPerPage)}
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

export default ManufacturerList;
