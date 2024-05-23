// src/pages/User/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';  // Import the styles

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <header>
        <h1>Welcome to Your Fitness Dashboard</h1>
        
      </header>

      <main>
        <section id="bmi-graph">
          <h2>Your BMI Progress</h2>
          <canvas id="bmiChart"></canvas>
        </section>

        <section id="events-promotions">
          <div id="events">
            <h2>Upcoming Events</h2>
            <ul>
              <li>Yoga Class - May 22</li>
              <li>Cardio Blast - May 24</li>
              <li>Weight Training - May 25</li>
            </ul>
          </div>

          <div id="promotions">
            <h2>Current Promotions</h2>
            <p>50% off on all supplements!</p>
          </div>
        </section>

        <section id="update-weight">
          <h2>Update Your Weight</h2>
          <form id="weight-form">
            <label htmlFor="weight">Enter your current weight:</label>
            <input type="number" id="weight" name="weight" required />
            <button type="submit">Update</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Fitness App</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
