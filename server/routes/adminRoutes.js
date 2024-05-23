const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');

// Create an admin
router.post(
  '/',
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const { username, password } = req.body;
      const newAdmin = await pool.query(
        "INSERT INTO admin (login, password) VALUES ($1, $2) RETURNING *",
        [username, password]
      );
      res.json(newAdmin.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all admins
router.get('/', async (req, res) => {
  try {
    const allAdmins = await pool.query("SELECT * FROM admin");
    res.json(allAdmins.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get an admin
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await pool.query(
      "SELECT * FROM admin WHERE id = $1",
      [id]
    );
    res.json(admin.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update an admin
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updateAdmin = await pool.query(
      "UPDATE admin SET username = $1, password = $2 WHERE id = $3",
      [username, password, id]
    );
    res.json("Admin was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete an admin
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdmin = await pool.query(
      "DELETE FROM admin WHERE id = $1",
      [id]
    );
    res.json("Admin was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
