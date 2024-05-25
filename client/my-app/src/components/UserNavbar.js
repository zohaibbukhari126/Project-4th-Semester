// src/components/UserNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const UserNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/user/dashboard">Dashboard</Link></li>
        <li><Link to="/user/profile">Profile</Link></li>
        <li><Link to="/user/program">Program</Link></li>
        <li><Link to="/user/video">Video</Link></li>
        <li><Link to="/user/diet">Diet</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
