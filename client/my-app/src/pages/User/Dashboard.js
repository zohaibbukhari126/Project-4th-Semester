import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/dashboard'); 
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Weight: {user.weight}</p>
      <p>Height: {user.height}</p>
      <p>BMI: {user.BMI}</p>
      <p>Gym: {user.gym}</p>
      <p>Program ID: {user.program_id}</p>
    </div>
  );
};

export default UserDashboard;
