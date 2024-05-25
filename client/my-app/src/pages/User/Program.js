import React from 'react';
import { Link } from 'react-router-dom';
import './Program.css';

const UserProgram = () => {
  return (
    <div className="program-body">
      <header>
        <h1>User Program</h1>
      </header>
      <div className="container">
        <h2><span style={{color: "white"}}>Your Program</span></h2>
        <p>Based on your BMI, you are recommended the following options:</p>
        <div className="program-buttons">
          <Link to="/user/video" className="btn">Video</Link>
          <Link to="/user/diet" className="btn">Diet</Link>
        </div>
      </div>
    </div>
  );
};

export default UserProgram;
