const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(
  '/',
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

module.exports = router;
