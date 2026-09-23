const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { validateRequest } = require('../middleware/validationMiddleware');
const { createBookingSchema } = require('../validators/booking.validator');
const { authenticateUser } = require('../middleware/authMiddleware');

// All booking routes require authentication
router.use(authenticateUser);

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', validateRequest(createBookingSchema), bookingController.createBooking);

// @route   POST /api/bookings/calculate
// @desc    Calculate booking price
router.post('/calculate', bookingController.calculatePrice);

// @route   GET /api/bookings/my
// @desc    Get current user's bookings
router.get('/my', bookingController.getMyBookings);

// @route   GET /api/bookings/:id
// @desc    Get specific booking details (must own it)
router.get('/:id', bookingController.getBookingById);

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
router.put('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
