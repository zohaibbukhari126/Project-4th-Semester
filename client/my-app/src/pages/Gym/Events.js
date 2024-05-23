import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GymEvents.css';

const Events = ({ gymId }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/gym/events/${gymId}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [gymId]);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/gym/events/${gymId}`, newEvent);
      alert('Event added successfully!');
      // Refresh events list
      const response = await axios.get(`/api/gym/events/${gymId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>FitFest 2024</h1>
        <p>Join us for an exciting day of fitness and fun!</p>
      </header>
      <div className="container">
        <section className="event-info">
          <h2>Event Information</h2>
          {events.map((event, index) => (
            <div key={index}>
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </section>
        <section className="add-event">
          <h2>Add Event</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Event Name:</label>
            <input type="text" id="name" name="name" value={newEvent.name} onChange={handleChange} required />
            <label htmlFor="description">Event Description:</label>
            <textarea id="description" name="description" value={newEvent.description} onChange={handleChange} rows="4" required></textarea>
            <label htmlFor="date">Event Date:</label>
            <input type="date" id="date" name="date" value={newEvent.date} onChange={handleChange} required />
            <label htmlFor="time">Event Time:</label>
            <input type="time" id="time" name="time" value={newEvent.time} onChange={handleChange} required />
            <label htmlFor="location">Event Location:</label>
            <
              input type="text" id="location" name="location" value={newEvent.location} onChange={handleChange} required />
            <button type="submit">Add Event</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Events;
