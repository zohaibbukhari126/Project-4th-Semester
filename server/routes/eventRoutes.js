// routes/eventRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');



const router = express.Router();

// Create an event (only gym users can create events)
router.post(
  '/events',
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, date, gym, event_detail } = req.body;
      const newEvent = await pool.query(
        "INSERT INTO event (name, date, gym, event_detail) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, date, gym, event_detail]
      );
      res.json(newEvent.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all events (any authenticated user can view events)
router.get('/events', async (req, res) => {
  try {
    const allEvents = await pool.query('SELECT * FROM event');
    res.json(allEvents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
