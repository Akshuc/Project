import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

function UserDirectory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-directory-container">
      <h1 style={{ fontFamily: 'monospace' }}>User Directory</h1>
      {users.map(user => (
        <Link to={`/user/${user.id}`} className="user-card" key={user.id}>
          <div style={{ marginLeft: '10px' }}>Name: {user.name}</div>
          <div style={{ marginRight: '10px' }}>Posts: {user.id}</div>
        </Link>
      ))}
    </div>
  );
}

export default UserDirectory;
