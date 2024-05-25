import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';  // Import the styles

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching user data...');
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/:id'); // Replace ':id' with the actual user ID
        console.log('Response:', response.data); // Log the response data
        if (response && response.data) {
          setUserData(response.data);
          setLoading(false);
        } else {
          setError('No data received from the server');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Log any errors
        setError(error.response ? error.response.data.message : 'An error occurred while fetching data');
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome to Your Fitness Dashboard, {userData.name}</h1>
        
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
              {/* Map through userData.events to display upcoming events */}
              {userData.events.map(event => (
                <li key={event.id}>{event.name} - {event.date}</li>
              ))}
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
