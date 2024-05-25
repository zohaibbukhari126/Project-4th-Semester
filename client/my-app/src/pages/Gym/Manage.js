import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageGym.css';

const Manage = ({ gymId }) => {
  const [gymDetails, setGymDetails] = useState({
    name: '',
    location: '',
    contact: ''
  });

  useEffect(() => {
    // Fetch existing gym details
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get(`/gyms/${gymId}`);
        setGymDetails(response.data);
      } catch (error) {
        console.error('Error fetching gym details:', error);
      }
    };

    fetchGymDetails();
  }, [gymId]);

  const handleChange = (e) => {
    setGymDetails({ ...gymDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/gyms/${gymId}`, gymDetails);
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
            <span>Gym Name:</span> {gymDetails.name}
          </div>
          <div className="detail">
            <span>Location:</span> {gymDetails.location}
          </div>
          <div className="detail">
            <span>Contact:</span> {gymDetails.contact}
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
