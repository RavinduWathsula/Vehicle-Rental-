const bookingService = require('../services/booking.service');

class BookingController {
  
  createBooking = async (req, res, next) => {
    try {
      const userId = req.user.id; // From authenticateUser middleware
      const booking = await bookingService.createBooking(userId, req.body);
      
      res.status(201).json({
        success: true,
        message: 'Booking created successfully.',
        data: booking
      });
    } catch (error) {
      next(error);
    }
  };

  getMyBookings = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await bookingService.getMyBookings(userId, req.query);
      
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: {
          total: result.total
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getBookingById = async (req, res, next) => {
    try {
      const booking = await bookingService.getBookingById(req.params.id, req.user.id, req.user.role);
      res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      next(error);
    }
  };

  cancelBooking = async (req, res, next) => {
    try {
      const booking = await bookingService.cancelBooking(req.params.id, req.user.id, req.user.role);
      res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully.',
        data: booking
      });
    } catch (error) {
      next(error);
    }
  };

  // --- ADMIN ---

  getAdminBookings = async (req, res, next) => {
    try {
      const result = await bookingService.getAdminBookings(req.query);
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: {
          total: result.total
        }
      });
    } catch (error) {
      next(error);
    }
  };

  adminUpdateStatus = async (req, res, next) => {
    try {
      const booking = await bookingService.adminUpdateStatus(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Booking status updated successfully.',
        data: booking
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new BookingController();
