// src/components/GymNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const GymNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/gym/dashboard">Gym Dashboard</Link>
        </li>
        <li>
          <Link to="/gym/events">Gym Events</Link>
        </li>
        <li>
          <Link to="/gym/users">Gym Users</Link>
        </li>
        <li>
          <Link to="/gym/manage">Manage Gym</Link>
        </li>
      </ul>
    </nav>
  );
};

export default GymNavbar;
