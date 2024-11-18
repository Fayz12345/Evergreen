import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [editingUserId, setEditingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };
    fetchUsers();
  }, []);

  const generateAvatar = (name) => {
    const initials = name ? name.split(' ').map((n) => n[0]).join('') : 'U';
    return `https://ui-avatars.com/api/?name=${initials}&background=random&size=64`;
  };

  const handleEditToggle = (userId) => {
    setEditingUserId(editingUserId === userId ? null : userId);
  };

  const handleUserFieldChange = (userId, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const saveUserEdit = async (userId) => {
    const user = users.find((user) => user._id === userId);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/updatecustomer/${userId}`, user);
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const toggleUserDisable = async (userId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/toggleUserDisable/${userId}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, disabled: response.data.disabled } : user
        )
      );
    } catch (error) {
      console.error("Error disabling user:", error);
    }
  };

  // Pagination controls
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Users</h1>
        <div className='btn-toolbar mb-2 mb-md-0 mx-2'>
          <button className="btn btn-primary" onClick={() => navigate('/admin/users/add')}>
            Add Users
          </button>
        </div>
      </div>
      <div className="mt-4">
        {users.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{offset + index + 1}</td>
                  <td>
                    <img
                      src={user.avatar || generateAvatar(user.fullName)}
                      alt={user.fullName}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={user.fullName}
                        onChange={(e) => handleUserFieldChange(user._id, "fullName", e.target.value)}
                      />
                    ) : (
                      user.fullName
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={user.email}
                        onChange={(e) => handleUserFieldChange(user._id, "email", e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>{user.role || 'User'}</td>
                  <td>{user.username}</td>
                  <td>
                    {editingUserId === user._id ? (
                      <>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => saveUserEdit(user._id)}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingUserId(null)}>Cancel</button>
                      </>
                    ) : (
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditToggle(user._id)}>Edit</button>
                    )}

                    {editingUserId !== user._id && (
                      <button  
                      className={`btn btn-sm ${user.disabled ? 'btn-success' : 'btn-danger'}`}
                       onClick={() => toggleUserDisable(user._id)}>
                        {user.disabled ? "Enable" : "Disable"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users available.</p>
        )}

        {/* Pagination Controls */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(users.length / usersPerPage)}
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

export default UsersList;
