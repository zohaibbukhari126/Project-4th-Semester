const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// Create a gym
router.post(
  '/',
  body('login').isString().notEmpty(),
  body('password').isString().notEmpty(),
  body('gym_details').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    try {
      const { login, password, gym_details} = req.body;
      const newGym = await pool.query(
        "INSERT INTO gym (login, password, gym_details) VALUES ($1, $2, $3) RETURNING *",
        [login, password, gym_details]
      );
      res.json(newGym.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all gyms
router.get('/', async (req, res) => {
  try {
    const allGyms = await pool.query("SELECT * FROM gym");
    res.json(allGyms.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a gym
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await pool.query(
      "SELECT * FROM gym WHERE id = $1",
      [id]
    );
    res.json(gym.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a gym
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { login, password, gym_details, upcoming_details } = req.body;
    const updateGym = await pool.query(
      "UPDATE gym SET login = $1, password = $2, gym_details = $3 = $4 WHERE id = $5",
      [login, password, gym_details, id]
    );
    res.json("Gym was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a gym
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGym = await pool.query(
      "DELETE FROM gym WHERE id = $1",
      [id]
    );
    res.json("Gym was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
