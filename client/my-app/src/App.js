import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

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
  axios.defaults.baseURL = 'http://localhost:5000/api';
  axios.defaults.withCredentials = true;

  return (
    <Router>
      <Routes>
        <Route path="/user/*" element={<Layout userType="user" />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="program" element={<UserProgram />} />
          <Route path="video" element={<UserVideo />} />
          <Route path="diet" element={<UserDiet />} />
        </Route>
        <Route path="/gym/*" element={<Layout userType="gym" />}>
          <Route path="dashboard" element={<GymDashboard />} />
          <Route path="events" element={<GymEvents />} />
          <Route path="users" element={<GymUsers />} />
          <Route path="manage" element={<ManageGym />} />
        </Route>
        <Route path="/admin/*" element={<Layout userType="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
