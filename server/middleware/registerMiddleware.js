const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
      // Check if user with the same email already exists
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Insert the new user
      const newUser = await pool.query(
        "INSERT INTO users (email, password, age, weight, height) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [email, hashedPassword, age, weight, height]
      );
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
