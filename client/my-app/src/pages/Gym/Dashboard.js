// src/pages/Gym/Dashboard.js
import React from 'react';

const GymDashboard = () => {
  return (
    // a img in the background of the dashboard
    <div
      style={{
        backgroundImage: 
        // gym picture
          'url("https://i.etsystatic.com/21526053/r/il/ed13a5/2213350280/il_fullxfull.2213350280_ssmq.jpg")',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header>
      <h1>Dashboard</h1>
      </header>
    </div>

  );
};

export default GymDashboard;
