import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const MemoryList = () => {
  const [message, setMessage] = useState('');
  const [memories, setMemories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editSize, setEditSize] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/memories`);
      setMemories(response.data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const handleEdit = (memory) => {
    setEditId(memory._id);
    setEditSize(memory.size);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditSize('');
  };

  const handleSaveEdit = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.put(`${process.env.REACT_APP_API_URL}/memories/${encodedId}`, { size: editSize });
      setMessage('Memory updated successfully');
      setEditId(null);
      fetchMemories();
    } catch (error) {
      console.error('Error updating memory:', error);
      setMessage('Error updating memory');
    }
  };

  const handleDelete = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/memories/${encodedId}`);
      setMessage('Memory deleted successfully');
      fetchMemories();
    } catch (error) {
      console.error('Error deleting memory:', error);
      setMessage('Error deleting memory');
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentMemories = memories.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Memory</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary" onClick={() => navigate('/admin/memory/add')}>
            Add Memory
          </button>
        </div>
      </div>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMemories.map((memory, index) => (
            <tr key={memory._id}>
              <td>{offset + index + 1}</td>
              <td>
                {editId === memory._id ? (
                  <input
                    type="text"
                    value={editSize}
                    onChange={(e) => setEditSize(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  memory.size
                )}
              </td>
              <td>
                {editId === memory._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSaveEdit(memory._id)}
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
                      onClick={() => handleEdit(memory)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(memory._id)}
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
        pageCount={Math.ceil(memories.length / itemsPerPage)}
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

export default MemoryList;
