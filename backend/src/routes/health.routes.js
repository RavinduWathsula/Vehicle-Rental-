const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

// @route   GET /api/health
// @desc    Get API health status
// @access  Public
router.get('/', healthController.getHealth);

module.exports = router;
