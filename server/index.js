const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a member
app.post("/dietprogram", async (req, res) => {
    try {
        const { description } = req.body;
        const newDietProgram = await pool.query("INSERT INTO diet_program (description) VALUES($1) RETURNING *", [description]);
        res.json(newDietProgram.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all diet programs
app.get("/dietprogram", async (req, res) => {
    try {
        const allDietProgram = await pool.query("SELECT * FROM diet_program");
        res.json(allDietProgram.rows);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a diet program
app.get("/dietprogram/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dietProgram = await pool.query("SELECT * FROM diet_program WHERE id = $1", [id]);
        res.json(dietProgram.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a diet program
app.put("/dietprogram/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateDietProgram = await pool.query("UPDATE diet_program SET description = $1 WHERE id = $2", [description, id]);
        res.json("Diet program was updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a diet program
app.delete("/dietprogram/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDietProgram = await pool.query("DELETE FROM diet_program WHERE id = $1", [id]);
        res.json("Diet program was deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});











// now for this CREATE TABLE video (
//     id SERIAL PRIMARY KEY,
//     url TEXT
// );
app.post("/video", async (req, res) => {
    try {
        const { url } = req.body;
        const newVideo = await pool.query("INSERT INTO video (url) VALUES($1) RETURNING *", [url]);
        res.json(newVideo.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

);

// Get all videos
app.get("/video", async (req, res) => {
    try {
        const allVideos = await pool.query("SELECT * FROM video");
        res.json(allVideos.rows);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a video

app.get("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const video = await pool.query("SELECT * FROM video WHERE id = $1", [id]);
        res.json(video.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a video
app.put("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { url } = req.body;
        const updateVideo = await pool.query("UPDATE video SET url = $1 WHERE id = $2", [url, id]);
        res.json("Video was updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a video
app.delete("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteVideo = await pool.query("DELETE FROM video WHERE id = $1", [id]);
        res.json("Video was deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
