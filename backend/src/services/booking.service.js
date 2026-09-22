const bookingModel = require('../models/booking.model');
const vehicleModel = require('../models/vehicle.model');
const { pool } = require('../config/database'); // For querying extras
const CONSTANTS = require('../config/constants');

class BookingService {
  /**
   * Calculate rental duration in whole days (minimum 1 day)
   */
  _calculateDurationInDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays : 1;
  }

  /**
   * Main Create Booking Logic
   */
  async createBooking(userId, payload) {
    const { 
      vehicle_id, 
      driver_id, 
      pickup_location_id, 
      return_location_id, 
      pickup_datetime, 
      return_datetime, 
      extras 
    } = payload;

    // 1. Check Vehicle exists and is active
    const vehicle = await vehicleModel.findById(vehicle_id);
    if (!vehicle || vehicle.status === 'inactive') {
      const error = new Error('Vehicle is not available for booking.');
      error.statusCode = 400;
      throw error;
    }

    // 2. Check Overlaps (Bookings, Maintenance, Driver)
    const overlapCheck = await bookingModel.findOverlaps(vehicle_id, driver_id, pickup_datetime, return_datetime);
    if (overlapCheck.conflict) {
      const error = new Error(`Scheduling conflict detected: ${overlapCheck.type}`);
      error.statusCode = 409;
      throw error;
    }

    // 3. Calculation Engine
    const rentalDays = this._calculateDurationInDays(pickup_datetime, return_datetime);
    
    // Vehicle Price
    const vehicle_amount = vehicle.daily_price * rentalDays;
    
    // Driver Price
    let driver_amount = 0;
    if (driver_id) {
      driver_amount = CONSTANTS.DRIVER_DAILY_RATE * rentalDays;
    }

    // Extras Price
    let extras_amount = 0;
    const bookingExtrasData = []; // To pass to model for insertion
    
    if (extras && extras.length > 0) {
      // Fetch current prices from DB to prevent client manipulation
      const extraIds = extras.map(e => e.extra_id);
      const [extrasDB] = await pool.query(
        'SELECT id, price, pricing_type FROM extras WHERE id IN (?) AND status = "active"',
        [extraIds]
      );

      extras.forEach(reqExtra => {
        const dbExtra = extrasDB.find(e => e.id === reqExtra.extra_id);
        if (dbExtra) {
          const qty = reqExtra.quantity || 1;
          const cost = dbExtra.pricing_type === 'per_day' 
                        ? (dbExtra.price * qty * rentalDays)
                        : (dbExtra.price * qty);
          
          extras_amount += cost;
          
          bookingExtrasData.push({
            extra_id: dbExtra.id,
            quantity: qty,
            price: dbExtra.price // snapshot price at time of booking
          });
        }
      });
    }

    // Discount (Placeholder for coupons later)
    const discount_amount = 0;

    // Subtotal
    const subtotal = vehicle_amount + driver_amount + extras_amount - discount_amount;

    // Tax
    const tax_amount = parseFloat((subtotal * CONSTANTS.TAX_RATE).toFixed(2));

    // Total
    const total_amount = subtotal + tax_amount;

    // 4. Assemble Data
    const bookingData = {
      user_id: userId,
      vehicle_id,
      driver_id: driver_id || null,
      pickup_location_id,
      return_location_id,
      pickup_datetime,
      return_datetime,
      vehicle_amount,
      driver_amount,
      extras_amount,
      discount_amount,
      tax_amount,
      total_amount,
      booking_status: 'pending',
      payment_status: 'pending'
    };

    // 5. Transactional Insert
    return await bookingModel.createBooking(bookingData, bookingExtrasData);
  }

  async getMyBookings(userId, query) {
    const limit = query.limit || 10;
    const offset = query.page ? (query.page - 1) * limit : 0;
    return await bookingModel.findByUserId(userId, limit, offset);
  }

  async getAdminBookings(query) {
    const limit = query.limit || 10;
    const offset = query.page ? (query.page - 1) * limit : 0;
    return await bookingModel.findAllAdmin(limit, offset);
  }

  async getBookingById(id, userId, userRole) {
    const booking = await bookingModel.findById(id);
    if (!booking) {
      const error = new Error('Booking not found.');
      error.statusCode = 404;
      throw error;
    }

    // Security check: Only owner or admin/staff can view
    if (booking.user_id !== userId && userRole === 'customer') {
      const error = new Error('Unauthorized to view this booking.');
      error.statusCode = 403;
      throw error;
    }

    return booking;
  }

  async cancelBooking(id, userId, userRole) {
    const booking = await this.getBookingById(id, userId, userRole);

    // Validate state transition
    if (['active', 'completed', 'cancelled'].includes(booking.booking_status)) {
      const error = new Error(`Cannot cancel a booking that is ${booking.booking_status}.`);
      error.statusCode = 400;
      throw error;
    }

    return await bookingModel.updateStatus(id, { booking_status: 'cancelled' });
  }

  async adminUpdateStatus(id, updateData) {
    const booking = await bookingModel.findById(id);
    if (!booking) {
      const error = new Error('Booking not found.');
      error.statusCode = 404;
      throw error;
    }

    // A real system would have strict FSM (Finite State Machine) validation here.
    // For now, we allow the admin to force update status.
    return await bookingModel.updateStatus(id, updateData);
  }
}

module.exports = new BookingService();
