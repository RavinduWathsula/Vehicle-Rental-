const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRequest } = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const { authenticateUser } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRequest(registerSchema), authController.register);

// @route   POST /api/auth/login
// @desc    Login user and return JWT
// @access  Public
router.post('/login', validateRequest(loginSchema), authController.login);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', authenticateUser, authController.getMe);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public (or Private if you prefer they must be logged in to log out)
router.post('/logout', authController.logout);

module.exports = router;
