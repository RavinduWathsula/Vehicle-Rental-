const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const { validateRequest } = require('../middleware/validationMiddleware');
const { createVehicleSchema, updateVehicleSchema } = require('../validators/vehicle.validator');
const { authenticateUser, requireAdmin } = require('../middleware/authMiddleware');

// --- PUBLIC ROUTES ---
// @route   GET /api/vehicles
// @desc    Get all active vehicles with optional filtering and pagination
router.get('/', vehicleController.getAllVehicles);

// @route   GET /api/vehicles/:id
// @desc    Get vehicle by ID
router.get('/:id', vehicleController.getVehicleById);

// @route   GET /api/vehicles/:id/images
// @desc    Get vehicle images
router.get('/:id/images', vehicleController.getVehicleImages);

// @route   GET /api/vehicles/:id/availability
// @desc    Check vehicle availability for dates
router.get('/:id/availability', vehicleController.getAvailability);

// --- ADMIN ROUTES (Mounted under /api/vehicles but protected) ---
// Note: Some admin routes might also live under /api/admin/vehicles, 
// but placing standard REST operations here with protection is also common.

// @route   POST /api/vehicles
// @desc    Create a new vehicle
// @access  Admin
router.post('/', authenticateUser, requireAdmin, validateRequest(createVehicleSchema), vehicleController.createVehicle);

// @route   PUT /api/vehicles/:id
// @desc    Update a vehicle
// @access  Admin
router.put('/:id', authenticateUser, requireAdmin, validateRequest(updateVehicleSchema), vehicleController.updateVehicle);

// @route   DELETE /api/vehicles/:id
// @desc    Delete a vehicle
// @access  Admin
router.delete('/:id', authenticateUser, requireAdmin, vehicleController.deleteVehicle);

module.exports = router;
