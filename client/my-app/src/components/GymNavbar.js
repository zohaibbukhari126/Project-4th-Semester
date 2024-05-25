// src/components/GymNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const GymNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/gym/dashboard">Dashboard</Link></li>
        <li><Link to="/gym/events">Events</Link></li>
        <li><Link to="/gym/users">Users</Link></li>
        <li><Link to="/gym/manage">Manage</Link></li>
      </ul>
    </nav>
  );
};

export default GymNavbar;
