const { pool } = require('../config/database');

class BookingModel {

  /**
   * Generates a new booking reference inside a transaction
   */
  async _generateBookingReference(connection) {
    const year = new Date().getFullYear();
    // Use FOR UPDATE to lock the row and prevent race conditions if we had a sequence table,
    // but without one, we can count rows for this year and increment.
    // For extreme scale, a sequence table is better, but this works for standard throughput.
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM bookings WHERE YEAR(created_at) = ? FOR UPDATE',
      [year]
    );
    
    const count = rows[0].count + 1;
    // Format: DX-2026-000001
    return `DX-${year}-${String(count).padStart(6, '0')}`;
  }

  /**
   * Check for vehicle/driver overlaps (Bookings & Maintenance)
   */
  async findOverlaps(vehicleId, driverId, startDate, endDate) {
    // Check Vehicle Bookings
    const [bookingRows] = await pool.execute(
      `SELECT id FROM bookings 
       WHERE vehicle_id = ? 
       AND booking_status IN ('pending', 'confirmed', 'active')
       AND (
         (pickup_datetime <= ? AND return_datetime >= ?) OR
         (pickup_datetime <= ? AND return_datetime >= ?) OR
         (pickup_datetime >= ? AND return_datetime <= ?)
       )`,
      [vehicleId, endDate, startDate, startDate, endDate, startDate, endDate]
    );
    
    if (bookingRows.length > 0) return { conflict: true, type: 'vehicle_booking' };

    // Check Vehicle Maintenance
    const [maintenanceRows] = await pool.execute(
      `SELECT id FROM maintenance 
       WHERE vehicle_id = ? 
       AND status IN ('scheduled', 'in_progress')
       AND (
         (start_date <= ? AND end_date >= ?) OR
         (start_date <= ? AND end_date >= ?) OR
         (start_date >= ? AND end_date <= ?)
       )`,
      // Maintenance dates are usually DATE not DATETIME, but logic is same
      [vehicleId, endDate, startDate, startDate, endDate, startDate, endDate]
    );

    if (maintenanceRows.length > 0) return { conflict: true, type: 'maintenance' };

    // Check Driver (if requested)
    if (driverId) {
      const [driverRows] = await pool.execute(
        `SELECT id FROM bookings 
         WHERE driver_id = ? 
         AND booking_status IN ('pending', 'confirmed', 'active')
         AND (
           (pickup_datetime <= ? AND return_datetime >= ?) OR
           (pickup_datetime <= ? AND return_datetime >= ?) OR
           (pickup_datetime >= ? AND return_datetime <= ?)
         )`,
        [driverId, endDate, startDate, startDate, endDate, startDate, endDate]
      );
      if (driverRows.length > 0) return { conflict: true, type: 'driver' };
    }

    return { conflict: false };
  }

  /**
   * Main Creation (Transactional)
   */
  async createBooking(bookingData, extrasArray) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 1. Generate Ref
      const booking_reference = await this._generateBookingReference(connection);
      bookingData.booking_reference = booking_reference;

      // 2. Insert Booking
      const fields = Object.keys(bookingData);
      const placeholders = fields.map(() => '?').join(', ');
      const values = Object.values(bookingData);

      const [result] = await connection.execute(
        `INSERT INTO bookings (${fields.join(', ')}) VALUES (${placeholders})`,
        values
      );
      const bookingId = result.insertId;

      // 3. Insert Extras
      if (extrasArray && extrasArray.length > 0) {
        // Bulk insert array mapping
        const extraValues = [];
        const extraPlaceholders = extrasArray.map(extra => {
          extraValues.push(bookingId, extra.extra_id, extra.quantity, extra.price);
          return '(?, ?, ?, ?)';
        }).join(', ');

        await connection.execute(
          `INSERT INTO booking_extras (booking_id, extra_id, quantity, price) VALUES ${extraPlaceholders}`,
          extraValues
        );
      }

      await connection.commit();
      connection.release();
      
      return await this.findById(bookingId);
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error; // Let service layer catch and format
    }
  }

  async findById(id) {
    // Get main booking
    const [rows] = await pool.execute(
      `SELECT b.*, 
        v.brand as vehicle_brand, v.model as vehicle_model,
        u.name as customer_name, u.email as customer_email,
        d.name as driver_name,
        pl.name as pickup_location_name,
        rl.name as return_location_name
       FROM bookings b
       JOIN vehicles v ON b.vehicle_id = v.id
       JOIN users u ON b.user_id = u.id
       LEFT JOIN drivers d ON b.driver_id = d.id
       JOIN locations pl ON b.pickup_location_id = pl.id
       JOIN locations rl ON b.return_location_id = rl.id
       WHERE b.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;
    const booking = rows[0];

    // Get extras
    const [extraRows] = await pool.execute(
      `SELECT be.*, e.name as extra_name, e.pricing_type 
       FROM booking_extras be 
       JOIN extras e ON be.extra_id = e.id 
       WHERE be.booking_id = ?`,
      [id]
    );

    booking.extras = extraRows;
    return booking;
  }

  async findByUserId(userId, limit = 10, offset = 0) {
    const [rows] = await pool.execute(
      `SELECT b.id, b.booking_reference, b.pickup_datetime, b.return_datetime, b.total_amount, b.booking_status,
        v.brand, v.model
       FROM bookings b
       JOIN vehicles v ON b.vehicle_id = v.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), parseInt(offset)]
    );
    
    const [countRow] = await pool.execute(
      'SELECT COUNT(*) as total FROM bookings WHERE user_id = ?',
      [userId]
    );

    return { data: rows, total: countRow[0].total };
  }

  async findAllAdmin(limit = 10, offset = 0) {
    const [rows] = await pool.execute(
      `SELECT b.id, b.booking_reference, b.pickup_datetime, b.return_datetime, b.total_amount, b.booking_status,
        v.brand, v.model, u.name as customer_name
       FROM bookings b
       JOIN vehicles v ON b.vehicle_id = v.id
       JOIN users u ON b.user_id = u.id
       ORDER BY b.created_at DESC
       LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );
    
    const [countRow] = await pool.execute('SELECT COUNT(*) as total FROM bookings');
    return { data: rows, total: countRow[0].total };
  }

  async updateStatus(id, updateData) {
    const fields = Object.keys(updateData);
    if (fields.length === 0) return;

    const updates = fields.map(f => `${f} = ?`).join(', ');
    const values = [...Object.values(updateData), id];

    await pool.execute(
      `UPDATE bookings SET ${updates} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }
}

module.exports = new BookingModel();
