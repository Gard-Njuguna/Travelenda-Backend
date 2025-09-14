const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userService = require('../services/userService');

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const result = await userService.getUserProfile(req.user.uid);
    res.json(result);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { displayName, email, photoURL, preferences } = req.body;
    const userData = {
      displayName,
      email,
      photoURL,
      preferences
    };
    
    const result = await userService.createOrUpdateUser(req.user.uid, userData);
    res.json(result);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/user/trips
 * @desc    Save a trip
 * @access  Private
 */
router.post('/trips', authMiddleware, async (req, res) => {
  try {
    const { destination, startDate, endDate, bookings, notes, name } = req.body;
    const tripData = {
      destination,
      startDate,
      endDate,
      bookings: bookings || [],
      notes: notes || '',
      name: name || destination,
      status: 'planned'
    };
    
    const result = await userService.saveTrip(req.user.uid, tripData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Trip save error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/user/trips
 * @desc    Get user's saved trips
 * @access  Private
 */
router.get('/trips', authMiddleware, async (req, res) => {
  try {
    const result = await userService.getUserTrips(req.user.uid);
    res.json(result);
  } catch (error) {
    console.error('Trips fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/user/trips/:tripId
 * @desc    Update a trip
 * @access  Private
 */
router.put('/trips/:tripId', authMiddleware, async (req, res) => {
  try {
    const { tripId } = req.params;
    const updateData = req.body;
    
    const result = await userService.updateTrip(req.user.uid, tripId, updateData);
    res.json(result);
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/user/trips/:tripId
 * @desc    Delete a trip
 * @access  Private
 */
router.delete('/trips/:tripId', authMiddleware, async (req, res) => {
  try {
    const { tripId } = req.params;
    
    const result = await userService.deleteTrip(req.user.uid, tripId);
    res.json(result);
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/user/saved
 * @desc    Get saved items
 * @access  Private
 */
router.get('/saved', authMiddleware, async (req, res) => {
  try {
    const result = await userService.getSavedItems(req.user.uid);
    res.json(result);
  } catch (error) {
    console.error('Get saved items error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/user/saved
 * @desc    Save an item
 * @access  Private
 */
router.post('/saved', authMiddleware, async (req, res) => {
  try {
    const { type, name, location, price, image, description, data } = req.body;
    const itemData = {
      type,
      name,
      location,
      price,
      image,
      description,
      data: data || {}
    };
    
    const result = await userService.saveItem(req.user.uid, itemData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Save item error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/user/saved/:itemId
 * @desc    Remove saved item
 * @access  Private
 */
router.delete('/saved/:itemId', authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const result = await userService.removeSavedItem(req.user.uid, itemId);
    res.json(result);
  } catch (error) {
    console.error('Remove saved item error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/user/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/preferences', authMiddleware, async (req, res) => {
  try {
    const preferences = req.body;
    
    const result = await userService.updatePreferences(req.user.uid, preferences);
    res.json(result);
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;