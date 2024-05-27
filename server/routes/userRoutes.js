const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Login Route
router.post(
  '/login',
  body('login').isString().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { login, password } = req.body;

      // Check if user exists
      const user = await pool.query(
        "SELECT * FROM users WHERE login = $1",
        [login]
      );

      if (user.rows.length === 0) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
      if (!isPasswordValid) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        user: {
          login: user.rows[0].login
        }
      };

      jwt.sign(payload, 'secretKey', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// User Registration Route
router.post(
  '/register',
  body('login').isString().notEmpty(),
  body('password').isString().notEmpty(),
  body('name').isString().notEmpty(),
  body('age').isInt(),
  body('dob').isDate(),
  body('sex').isString().notEmpty(),
  body('weight').isFloat(),
  body('height').isFloat(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { login, password, name, age, dob, sex, weight, height } = req.body;

      // Check if user with the same login already exists
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE login = $1",
        [login]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new user
      const newUser = await pool.query(
        "INSERT INTO users (login, password, name, age, dob, sex, weight, height) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [login, hashedPassword, name, age, dob, sex, weight, height]
      );

      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
