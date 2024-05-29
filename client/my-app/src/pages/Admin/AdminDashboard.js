// src/pages/Admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/user'); 
      if (response.data) {
        setUsers(response.data);
      } else {
        setUsers([]); 
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]); 
    }
  };

  const handleEdit = (userId) => {
    
 

    console.log(`Edit user with ID: ${userId}`);
  };


  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/user/${userId}`); // Replace with your API endpoint
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      {users && users.length > 0 ? ( 
        <Table>
          <thead>
            <tr>
            
              <Th>Name</Th>
              
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                
                <Td>{user.name}</Td>
             
                <Td>
                  
                  <Button onClick={() => handleDelete(user.login)}>Delete</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No users found.</p> // Message if users array is empty
      )}
    </Container>
  );
};

export default AdminDashboard;
