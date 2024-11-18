import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const customersPerPage = 10; // Define number of customers per page
  const navigate = useNavigate();

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

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData({ ...customers[index] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.put(`${process.env.REACT_APP_API_URL}/updatecustomer/${encodedId}`, editFormData);
      setEditIndex(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      await axios.delete(`${process.env.REACT_APP_API_URL}/customers/${encodedId}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // Pagination logic
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * customersPerPage;
  const currentCustomers = customers.slice(offset, offset + customersPerPage);

  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Customers</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary" onClick={() => navigate('/admin/customers/add')}>
            Add Customers
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2>Customer List</h2>
        {customers.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  {editIndex === index ? (
                    <>
                      <td>{offset + index + 1}</td>
                      <td>
                        <input
                          type="text"
                          name="fullName"
                          value={editFormData.fullName}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="address"
                          value={editFormData.address}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSaveClick(customer._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{offset + index + 1}</td>
                      <td>{customer.fullName}</td>
                      <td>{customer.address}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(customer._id)}
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
        ) : (
          <p>No customers added yet.</p>
        )}

        {/* Pagination Controls */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(customers.length / customersPerPage)}
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
      </div>
    </>
  );
};

export default CustomersList;
