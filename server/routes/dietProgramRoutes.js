const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');

// Create a diet program
router.post(
  '/',
  body('description').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description } = req.body;
      const newDietProgram = await pool.query(
        "INSERT INTO diet_program (description) VALUES($1) RETURNING *",
        [description]
      );
      res.json(newDietProgram.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all diet programs
router.get('/', async (req, res) => {
  try {
    const allDietProgram = await pool.query("SELECT * FROM diet_program");
    res.json(allDietProgram.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a diet program
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dietProgram = await pool.query(
      "SELECT * FROM diet_program WHERE id = $1",
      [id]
    );
    res.json(dietProgram.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a diet program
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateDietProgram = await pool.query(
      "UPDATE diet_program SET description = $1 WHERE id = $2",
      [description, id]
    );
    res.json("Diet program was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a diet program
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDietProgram = await pool.query(
      "DELETE FROM diet_program WHERE id = $1",
      [id]
    );
    res.json("Diet program was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
