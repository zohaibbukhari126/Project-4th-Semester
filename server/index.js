const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }

  

));
app.use(bodyParser.json());

// Import routes

const dietProgramRoutes = require('./routes/dietProgramRoutes');
const videoRoutes = require('./routes/videoRoutes');
const programRoutes = require('./routes/programRoutes');
const gymRoutes = require('./routes/gymRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');







// Use routes
app.use('/api/dietPrograms', dietProgramRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/gym/events', eventRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/users', userRoutes);


//authentification







// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Gym Management API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

