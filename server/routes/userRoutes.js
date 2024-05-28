const express = require('express');
const router = express.Router();
const pool = require('../db');
const registerMiddleware = require('../middleware/registerMiddleware');
const loginMiddleware = require('../middleware/loginMiddleware');
const { body, validationResult } = require('express-validator');

// Register a user
router.use('/register', registerMiddleware);


// Login a user
router.use('/login', loginMiddleware);


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
        "INSERT INTO users (login, password, age, weight, height) VALUES ($1, $2, $3, $4, $5) RETURNING *",
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
      "SELECT * FROM users WHERE login = $1",
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
      "UPDATE users SET login = $1, password = $2, age = $3, weight = $4, height = $5 WHERE id = $6",
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
      "DELETE FROM users WHERE login = $1",
      [id]
    );
    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});





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
  // body('login').isString().notEmpty(),
  // body('password').isString().notEmpty(),
  // body('name').isString().notEmpty(),
  // body('role').isString().notEmpty(),
  // body('age').isInt(),
  // body('dob').isDate(),
  // body('sex').isString().notEmpty(),
  // body('weight').isFloat(),
  // body('height').isFloat(),
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      const { login, password, name, role
        // , age, dob, sex, weight, height 
      } = req.body;
console.log(login, password, name, role);
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
        "INSERT INTO users (login, password, name,role) VALUES ($1, $2, $3, $4) RETURNING *",
        [login, hashedPassword, name, role]
      );

      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);




module.exports = router;