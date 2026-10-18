const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const bookingController = require('../controllers/booking.controller');
const adminController = require('../controllers/admin.controller');
const { authenticateUser, requireAdmin } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');
const { updateBookingStatusSchema } = require('../validators/booking.validator');

// All admin routes must be protected
router.use(authenticateUser, requireAdmin);

// --- DASHBOARD OVERVIEW ---
router.get('/dashboard', adminController.getDashboardStats);

// --- VEHICLES ---
router.get('/vehicles', vehicleController.getAdminVehicles);

// --- BOOKINGS ---
router.get('/bookings', bookingController.getAdminBookings);
router.put('/bookings/:id/status', validateRequest(updateBookingStatusSchema), bookingController.adminUpdateStatus);
router.delete('/bookings/:id', adminController.deleteBooking);

// --- CUSTOMERS ---
router.get('/customers', adminController.getCustomers);
router.put('/customers/:id/status', adminController.updateCustomerStatus);
router.delete('/customers/:id', adminController.deleteCustomer);

// --- DRIVERS ---
router.get('/drivers', adminController.getDrivers);
router.post('/drivers', adminController.createDriver);
router.delete('/drivers/:id', adminController.deleteDriver);

// --- MAINTENANCE ---
router.get('/maintenance', adminController.getMaintenance);
router.post('/maintenance', adminController.createMaintenance);
router.put('/maintenance/:id/status', adminController.updateMaintenanceStatus);
router.delete('/maintenance/:id', adminController.deleteMaintenance);

// --- REPORTS ---
router.get('/reports', adminController.getReports);

module.exports = router;
