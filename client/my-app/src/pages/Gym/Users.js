import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/users`);
        console.log('Users:', response.data); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="body">
      <header>
        <h1>Gym Users</h1>
      </header>
      <div className="container">
        <h2>List of Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.sex}</td>
                <td>{user.bmi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
