const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define port
const PORT = process.env.PORT || 5000;

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Travelenda API' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// API routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/user', require('./src/routes/user'));
app.use('/api/travel', require('./src/routes/travel'));
app.use('/api/blog', require('./src/routes/blog'));
app.use('/api/weather', require('./src/routes/weather'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});