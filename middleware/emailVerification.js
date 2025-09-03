import User from '../models/User.js';

// Middleware to check if email is verified for protected routes
const requireEmailVerification = async (req, res, next) => {
  try {
    if (!req.user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email address before accessing this resource. Check your inbox for the verification email.'
      });
    }
    next();
  } catch (error) {
    console.error('Email verification middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking email verification'
    });
  }
};

export { requireEmailVerification };