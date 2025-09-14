const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock data for development (will be replaced with actual API calls)
const mockFlights = require('../mock/flights');
const mockHotels = require('../mock/hotels');
const mockActivities = require('../mock/activities');
const mockDestinations = require('../mock/destinations');

/**
 * @route   GET /api/travel/flights
 * @desc    Search for flights
 * @access  Public
 */
router.get('/flights', async (req, res) => {
  try {
    // In production, this would call the Amadeus API
    // const response = await axios.get('https://api.amadeus.com/v2/shopping/flight-offers', {
    //   params: req.query,
    //   headers: { Authorization: `Bearer ${process.env.AMADEUS_TOKEN}` }
    // });
    
    // For now, return mock data
    res.json(mockFlights);
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ message: 'Error searching for flights' });
  }
});

/**
 * @route   GET /api/travel/hotels
 * @desc    Search for hotels
 * @access  Public
 */
router.get('/hotels', async (req, res) => {
  try {
    // In production, this would call the LiteAPI
    // const response = await axios.get('https://api.liteapi.travel/hotels/search', {
    //   params: req.query,
    //   headers: { 'X-API-Key': process.env.LITEAPI_KEY }
    // });
    
    // For now, return mock data
    res.json(mockHotels);
  } catch (error) {
    console.error('Hotel search error:', error);
    res.status(500).json({ message: 'Error searching for hotels' });
  }
});

/**
 * @route   GET /api/travel/activities
 * @desc    Search for activities
 * @access  Public
 */
router.get('/activities', async (req, res) => {
  try {
    // In production, this would call an activities API
    // For now, return mock data
    res.json(mockActivities);
  } catch (error) {
    console.error('Activities search error:', error);
    res.status(500).json({ message: 'Error searching for activities' });
  }
});

/**
 * @route   GET /api/travel/destinations
 * @desc    Get popular destinations
 * @access  Public
 */
router.get('/destinations', async (req, res) => {
  try {
    // In production, this might be from a database or API
    // For now, return mock data
    res.json(mockDestinations);
  } catch (error) {
    console.error('Destinations error:', error);
    res.status(500).json({ message: 'Error fetching destinations' });
  }
});

module.exports = router;