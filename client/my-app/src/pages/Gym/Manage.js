import React, { useState } from 'react';
import axios from 'axios';
import './ManageGym.css';

const Manage = ({ gymId }) => {
  const [gymDetails, setGymDetails] = useState({
    name: '',
    location: '',
    contact: ''
  });

  const handleChange = (e) => {
    setGymDetails({ ...gymDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/gyms/${gymId}`, gymDetails);
      alert('Gym details updated successfully!');
    } catch (error) {
      console.error('Error updating gym details:', error);
    }
  };

  return (
    <div className="manage-gym">
      <header className="header">
        <h1>Manage Gym Details</h1>
      </header>
      <div className="container">
        <section className="details-container">
          <h2>Existing Gym Details</h2>
          <div className="detail">
            <span>Gym Name:</span> Gym ABC
          </div>
          <div className="detail">
            <span>Location:</span> 123 Fitness St.
          </div>
          <div className="detail">
            <span>Contact:</span> (123) 456-7890
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Gym Name:</label>
            <input type="text" id="name" name="name" value={gymDetails.name} onChange={handleChange} required />
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={gymDetails.location} onChange={handleChange} required />
            <label htmlFor="contact">Contact:</label>
            <input type="text" id="contact" name="contact" value={gymDetails.contact} onChange={handleChange} required />
            <button type="submit">Update Details</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Manage;
