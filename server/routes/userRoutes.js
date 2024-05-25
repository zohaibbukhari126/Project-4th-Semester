const express = require('express');
const router = express.Router();
const pool = require('../db');
// const registerMiddleware = require('../middleware/registerMiddleware');
// const loginMiddleware = require('../middleware/loginMiddleware');
const { body, validationResult } = require('express-validator');

// Register a user
// router.use('/register', registerMiddleware);

// // Login a user
// router.use('/login', loginMiddleware);


// Create a user
router.post(
  '/',
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  body('age').isInt(),
  body('weight').isFloat(),
  body('height').isFloat(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    try {
      const { email, password, age, weight, height } = req.body;
      const newUser = await pool.query(
        "INSERT INTO users (email, password, age, weight, height) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [email, password, age, weight, height]
      );
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, age, weight, height } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET email = $1, password = $2, age = $3, weight = $4, height = $5 WHERE id = $6",
      [email, password, age, weight, height, id]
    );
    res.json("User was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );
    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
