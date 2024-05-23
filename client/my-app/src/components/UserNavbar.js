// src/components/UserNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const UserNavbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/user/dashboard">User Dashboard</Link>
        </li>
        <li>
          <Link to="/user/profile">User Profile</Link>
        </li>
        <li>
          <Link to="/user/program">User Program</Link>
        </li>
        <li>
          <Link to="/user/video">User Video</Link>
        </li>
        <li>
          <Link to="/user/diet">User Diet</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
