// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/loginMiddleware');
const User = require('../models/User');

// Login route
router.post('/login', loginMiddleware, async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findById(login);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate and send JWT token for successful login
    // Example: res.json({ token: generateToken(user) });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Other authentication routes like register, logout, etc.

module.exports = router;
