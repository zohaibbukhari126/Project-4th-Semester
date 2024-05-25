// src/components/AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const AdminNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;


