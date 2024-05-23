const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// Create an event
router.post(
  '/',
  body('description').isString().notEmpty(),
  body('date').isISO8601().toDate(),
  body('location').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description, date, location } = req.body;
      const newEvent = await pool.query(
        "INSERT INTO event (description, date, location) VALUES ($1, $2, $3) RETURNING *",
        [description, date, location]
      );
      res.json(newEvent.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all events
router.get('/', async (req, res) => {
  try {
    const allEvents = await pool.query("SELECT * FROM event");
    res.json(allEvents.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get an event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await pool.query(
      "SELECT * FROM event WHERE id = $1",
      [id]
    );
    res.json(event.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, date, location } = req.body;
    const updateEvent = await pool.query(
      "UPDATE event SET description = $1, date = $2, location = $3 WHERE id = $4",
      [description, date, location, id]
    );
    res.json("Event was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await pool.query(
      "DELETE FROM event WHERE id = $1",
      [id]
    );
    res.json("Event was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
