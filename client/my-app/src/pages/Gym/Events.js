import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GymEvents.css';

const Events = ({ gymId }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    event_detail: '',
    gym: gymId
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('gym/events');
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
      await axios.post('/gym/events', newEvent);
      alert('Event added successfully!');
      // Refresh events list
      const response = await axios.get('/gym/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>FitFest 2025</h1>
        <p>Join us for an exciting day of fitness and fun!</p>
      </header>
      <div className="container">
        <section className="event-info">
          <h2>Event Information</h2>
          {events.map((event, index) => (
            <div key={index}>
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.gym}</p>
              <p>{event.event_detail}</p>
            </div>
          ))}
        </section>
        <section className="add-event">
          <h2>Add Event</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Event Name:</label>
            <input type="text" id="name" name="name" value={newEvent.name} onChange={handleChange} required />
            <label htmlFor="date">Event Date:</label>
            <input type="date" id="date" name="date" value={newEvent.date} onChange={handleChange} required />
            <label htmlFor="event_detail">Event Description:</label>
            <textarea id="event_detail" name="event_detail" value={newEvent.event_detail} onChange={handleChange} rows="4" required></textarea>
            <button type="submit">Add Event</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Events;
