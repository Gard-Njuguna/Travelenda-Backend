const admin = require('../config/firebase');

/**
 * Authentication middleware to verify Firebase ID tokens
 * In development mode without Firebase credentials, it will use mock authentication
 */
const authMiddleware = async (req, res, next) => {
  // Check if we're in development mode and want to bypass auth completely
  if (process.env.NODE_ENV === 'development' && process.env.BYPASS_AUTH === 'true') {
    console.log('⚠️ Bypassing authentication in development mode');
    req.user = {
      uid: 'dev-user-id',
      email: 'dev-user@example.com',
    };
    next();
    return;
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add the user ID to the request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      // Add any other user info you need
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;