const express = require('express');
const router = express.Router();
const admin = require('../config/firebase');
const authMiddleware = require('../middleware/auth');

// @route   GET api/auth
// @desc    Get current user
// @access  Private
router.get('/', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// @route   POST api/auth/verify-token
// @desc    Verify Firebase token
// @access  Public
router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    
    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    res.json({ 
      uid: decodedToken.uid,
      email: decodedToken.email,
      isValid: true 
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token', isValid: false });
  }
});

module.exports = router;