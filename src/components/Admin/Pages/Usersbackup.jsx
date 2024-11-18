
import TitleHeader from '../../TitleHeader';
import React, { useState, useEffect } from 'react';

// Helper functions to manage local storage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('users', JSON.stringify(data));
};

const Users = () => {
  const [users, setUsers] = useState(loadFromLocalStorage());
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'User', // Default role
    email: '',
    avatar: '', // Avatar URL or base64 image
  });

  useEffect(() => {
    saveToLocalStorage(users);
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser({ ...newUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAvatar = (name) => {
    const initials = name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
      : 'U';
    return `https://ui-avatars.com/api/?name=${initials}&background=random&size=64`;
  };

  const addUser = () => {
    if (newUser.name && newUser.role && newUser.email) {
      const updatedUsers = [...users, { ...newUser, password: '123456' }];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers)); // Store users array
      setNewUser({ name: '', role: 'User', email: '', avatar: '' });
    }
  };
  
  // const clearUsers = () => {
  //   setUsers([]);
  //   localStorage.removeItem('users');
  // };

    return (
      <>

            <TitleHeader  heading={'Users'} />
 
      {/* Add User Form */}
      <div className="mb-4">
        <h2>Add New User</h2>

        {/* Row 1: Name and Role */}
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-control"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>

        {/* Row 2: Email and Avatar Upload */}
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>

        {/* Add User Button */}
        <div className="row">
          <div className="col-md-12 d-flex align-items-center">
            <button className="btn btn-primary w-100" onClick={addUser}>
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="mt-4">
        <h2>User List</h2>
        {users.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.avatar || generateAvatar(user.name)}
                      alt={user.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users added yet.</p>
        )}
      </div>

      {/* Clear Users Button */}
      {/* <button className="btn btn-danger mt-3" onClick={clearUsers}>
        Clear All Users
      </button> */}

                
         </>
    );
  }
  
  export default Users;
  