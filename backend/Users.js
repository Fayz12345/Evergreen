import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Users');
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
      <ul>
        {Users.map((item) => (
          <li key={item._id}>
            {item.fullname}: ${item.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
