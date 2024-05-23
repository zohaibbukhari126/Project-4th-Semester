const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');

// Create a video
router.post(
  '/',
  body('url').isURL(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { url } = req.body;
      const newVideo = await pool.query(
        "INSERT INTO video (url) VALUES($1) RETURNING *",
        [url]
      );
      res.json(newVideo.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get all videos
router.get('/', async (req, res) => {
  try {
    const allVideos = await pool.query("SELECT * FROM video");
    res.json(allVideos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a video
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const video = await pool.query(
      "SELECT * FROM video WHERE id = $1",
      [id]
    );
    res.json(video.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a video
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    const updateVideo = await pool.query(
      "UPDATE video SET url = $1 WHERE id = $2",
      [url, id]
    );
    res.json("Video was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a video
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVideo = await pool.query(
      "DELETE FROM video WHERE id = $1",
      [id]
    );
    res.json("Video was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
