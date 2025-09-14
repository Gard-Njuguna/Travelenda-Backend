require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const hotelRoutes = require('./routes/hotels');
const flightRoutes = require('./routes/flights');
const weatherRoutes = require('./routes/weather');
const bookingRoutes = require('./routes/booking');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/booking', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travelenda API! Your journey starts here – sustainably!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Oops, something went wrong on our end. Let\'s try that again!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Travelenda server is running on port ${PORT}`);
});