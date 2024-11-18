import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/Users');
        // console.log(response.data); // Log to verify the avatar data
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            {/* Display the user's avatar */}
            {user.avatar && (
              <img
                src={`${user.avatar}`}
                alt={`${user.fullName}'s avatar`}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
              />
            )}
            <div>
              <strong>{user.fullName}</strong>: {user.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
