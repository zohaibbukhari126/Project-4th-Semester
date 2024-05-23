const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');

// Create a program
router.post(
  '/',
  body('type').isString().notEmpty(),
  body('diet_program_id').isInt(),
  body('video_id').isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { type, diet_program_id, video_id } = req.body;
      const newProgram = await pool.query(
        "INSERT INTO program (type, diet_program_id, video_id) VALUES ($1, $2, $3) RETURNING *",
        [type, diet_program_id, video_id]
      );
      res.json(newProgram.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all programs
router.get('/', async (req, res) => {
  try {
    const allPrograms = await pool.query("SELECT * FROM program");
    res.json(allPrograms.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a program
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const program = await pool.query(
      "SELECT * FROM program WHERE id = $1",
      [id]
    );
    res.json(program.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a program
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, diet_program_id, video_id } = req.body;
    const updateProgram = await pool.query(
      "UPDATE program SET type = $1, diet_program_id = $2, video_id = $3 WHERE id = $4",
      [type, diet_program_id, video_id, id]
    );
    res.json("Program was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a program
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProgram = await pool.query(
      "DELETE FROM program WHERE id = $1",
      [id]
    );
    res.json("Program was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
