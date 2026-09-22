const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const { authenticateUser, requireAdmin } = require('../middleware/authMiddleware');

// All admin routes must be protected
router.use(authenticateUser, requireAdmin);

// @route   GET /api/admin/vehicles
// @desc    Get all vehicles (including inactive/maintenance)
// @access  Admin
router.get('/vehicles', vehicleController.getAdminVehicles);

// Note: POST, PUT, DELETE for vehicles are located in vehicle.routes.js 
// but protected with the same middlewares. They could also be mounted here.

const bookingController = require('../controllers/booking.controller');
const { validateRequest } = require('../middleware/validationMiddleware');
const { updateBookingStatusSchema } = require('../validators/booking.validator');

// @route   GET /api/admin/bookings
// @desc    Get all bookings
// @access  Admin
router.get('/bookings', bookingController.getAdminBookings);

// @route   PUT /api/admin/bookings/:id/status
// @desc    Update booking/payment status
// @access  Admin
router.put('/bookings/:id/status', validateRequest(updateBookingStatusSchema), bookingController.adminUpdateStatus);

module.exports = router;
