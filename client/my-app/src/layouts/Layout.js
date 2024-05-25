// src/layouts/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import GymNavbar from '../components/GymNavbar';
import AdminNavbar from '../components/AdminNavbar';

const Layout = ({ userType }) => {
  let NavbarComponent;

  switch (userType) {
    case 'user':
      NavbarComponent = UserNavbar;
      break;
    case 'gym':
      NavbarComponent = GymNavbar;
      break;
    case 'admin':
      NavbarComponent = AdminNavbar;
      break;
    default:
      NavbarComponent = null;
  }

  return (
    <div>
      {NavbarComponent && <NavbarComponent />}
      <Outlet />
    </div>
  );
};

export default Layout;
