// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import UserNavbar from './components/UserNavbar';
import GymNavbar from './components/GymNavbar';
import AdminNavbar from './components/AdminNavbar';
import UserDashboard from './pages/User/Dashboard';
import UserProfile from './pages/User/Profile';
import UserProgram from './pages/User/Program';
import UserVideo from './pages/User/Video';
import UserDiet from './pages/User/Diet';
import GymDashboard from './pages/Gym/Dashboard';
import GymEvents from './pages/Gym/Events';
import GymUsers from './pages/Gym/Users';
import ManageGym from './pages/Gym/Manage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import axios from 'axios';

const App = () => {
  const location = useLocation();

  axios.defaults.baseURL = 'http://localhost:5000/api';
  axios.defaults.withCredentials = true;
  

  return (
    <div>
      {location.pathname.startsWith('/gym') && <GymNavbar />}
      {location.pathname.startsWith('/user') && <UserNavbar />}
      {location.pathname.startsWith('/admin') && <AdminNavbar />}
      <Routes>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/program" element={<UserProgram />} />
        <Route path="/user/video" element={<UserVideo />} />
        <Route path="/user/diet" element={<UserDiet />} />
        <Route path="/gym/dashboard" element={<GymDashboard />} />
        <Route path="/gym/events" element={<GymEvents />} />
        <Route path="/gym/users" element={<GymUsers />} />
        <Route path="/gym/manage" element={<ManageGym />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
