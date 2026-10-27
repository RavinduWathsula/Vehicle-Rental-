const { pool } = require('../config/database');

class AdminController {
  /**
   * Get Dashboard Overview Stats
   */
  getDashboardStats = async (req, res, next) => {
    try {
      // 1. Total Revenue
      const [revRows] = await pool.query(
        "SELECT COALESCE(SUM(total_amount), 0) as totalRevenue FROM bookings WHERE booking_status != 'cancelled'"
      );
      const totalRevenue = parseFloat(revRows[0].totalRevenue) || 0;

      // 2. Active Bookings
      const [actRows] = await pool.query(
        "SELECT COUNT(*) as activeBookings FROM bookings WHERE booking_status IN ('active', 'confirmed')"
      );
      const activeBookings = parseInt(actRows[0].activeBookings) || 0;

      // 3. Total Customers
      const [custRows] = await pool.query(
        "SELECT COUNT(*) as totalCustomers FROM users WHERE role = 'customer'"
      );
      const totalCustomers = parseInt(custRows[0].totalCustomers) || 0;

      // 4. Fleet Size
      const [fleetRows] = await pool.query(
        "SELECT COUNT(*) as fleetSize FROM vehicles"
      );
      const fleetSize = parseInt(fleetRows[0].fleetSize) || 0;

      // 5. Recent Bookings (up to 5)
      const [recentBookings] = await pool.query(
        `SELECT b.id, b.booking_reference, b.pickup_datetime, b.return_datetime, 
                b.total_amount, b.booking_status, b.payment_status,
                v.brand, v.model, 
                u.name as customer_name, u.email as customer_email
         FROM bookings b
         JOIN vehicles v ON b.vehicle_id = v.id
         JOIN users u ON b.user_id = u.id
         ORDER BY b.created_at DESC
         LIMIT 5`
      );

      res.status(200).json({
        success: true,
        data: {
          stats: {
            totalRevenue,
            activeBookings,
            totalCustomers,
            fleetSize
          },
          recentBookings
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get All Customers with booking summary
   */
  getCustomers = async (req, res, next) => {
    try {
      const [customers] = await pool.query(
        `SELECT u.id, u.name, u.email, u.phone, u.role, u.status, u.created_at,
                COUNT(b.id) as total_bookings,
                COALESCE(SUM(CASE WHEN b.booking_status != 'cancelled' THEN b.total_amount ELSE 0 END), 0) as total_spent
         FROM users u
         LEFT JOIN bookings b ON u.id = b.user_id
         WHERE u.role = 'customer'
         GROUP BY u.id
         ORDER BY u.created_at DESC`
      );

      res.status(200).json({
        success: true,
        data: customers
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Customer Status (active / suspended / inactive)
   */
  updateCustomerStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!['active', 'suspended', 'inactive'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      await pool.query('UPDATE users SET status = ? WHERE id = ? AND role = ?', [status, id, 'customer']);

      res.status(200).json({
        success: true,
        message: 'Customer status updated successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Customer
   */
  deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM users WHERE id = ? AND role = ?', [id, 'customer']);
      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Drivers
   */
  getDrivers = async (req, res, next) => {
    try {
      const [drivers] = await pool.query(
        'SELECT * FROM drivers ORDER BY created_at DESC'
      );
      res.status(200).json({
        success: true,
        data: drivers
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create Driver
   */
  createDriver = async (req, res, next) => {
    try {
      const { name, phone, license_number, license_expiry, status = 'available' } = req.body;
      if (!name || !phone || !license_number) {
        return res.status(400).json({ success: false, message: 'Name, phone, and license number are required.' });
      }

      const expiry = license_expiry || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const [result] = await pool.query(
        'INSERT INTO drivers (name, phone, license_number, license_expiry, status) VALUES (?, ?, ?, ?, ?)',
        [name, phone, license_number, expiry, status]
      );

      const [newDriver] = await pool.query('SELECT * FROM drivers WHERE id = ?', [result.insertId]);

      res.status(201).json({
        success: true,
        message: 'Driver added successfully.',
        data: newDriver[0]
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Driver
   */
  deleteDriver = async (req, res, next) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM drivers WHERE id = ?', [id]);
      res.status(200).json({
        success: true,
        message: 'Driver deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Driver
   */
  updateDriver = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, phone, license_number, license_expiry, status } = req.body;

      const fields = [];
      const values = [];

      if (name !== undefined) { fields.push('name = ?'); values.push(name); }
      if (phone !== undefined) { fields.push('phone = ?'); values.push(phone); }
      if (license_number !== undefined) { fields.push('license_number = ?'); values.push(license_number); }
      if (license_expiry !== undefined) { fields.push('license_expiry = ?'); values.push(license_expiry); }
      if (status !== undefined) { fields.push('status = ?'); values.push(status); }

      if (fields.length === 0) {
        return res.status(400).json({ success: false, message: 'No fields to update' });
      }

      values.push(id);
      await pool.query(`UPDATE drivers SET ${fields.join(', ')} WHERE id = ?`, values);

      const [updated] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);
      res.status(200).json({
        success: true,
        message: 'Driver updated successfully.',
        data: updated[0]
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Maintenance Records
   */
  getMaintenance = async (req, res, next) => {
    try {
      const [records] = await pool.query(
        `SELECT m.*, v.brand, v.model, v.registration_number
         FROM maintenance m
         JOIN vehicles v ON m.vehicle_id = v.id
         ORDER BY m.created_at DESC`
      );
      res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create Maintenance Record
   */
  createMaintenance = async (req, res, next) => {
    try {
      const { vehicle_id, maintenance_type, description, start_date, end_date, cost, status = 'scheduled', notes } = req.body;
      if (!vehicle_id || !maintenance_type || !start_date) {
        return res.status(400).json({ success: false, message: 'Vehicle, maintenance type, and start date are required.' });
      }

      const [result] = await pool.query(
        `INSERT INTO maintenance (vehicle_id, maintenance_type, description, start_date, end_date, cost, status, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [vehicle_id, maintenance_type, description || '', start_date, end_date || null, cost || 0, status, notes || '']
      );

      // If scheduled or in_progress, update vehicle status to maintenance
      if (status === 'in_progress') {
        await pool.query("UPDATE vehicles SET status = 'maintenance' WHERE id = ?", [vehicle_id]);
      }

      const [newRecord] = await pool.query(
        `SELECT m.*, v.brand, v.model, v.registration_number
         FROM maintenance m
         JOIN vehicles v ON m.vehicle_id = v.id
         WHERE m.id = ?`,
        [result.insertId]
      );

      res.status(201).json({
        success: true,
        message: 'Maintenance scheduled successfully.',
        data: newRecord[0]
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Maintenance Status
   */
  updateMaintenanceStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await pool.query('UPDATE maintenance SET status = ? WHERE id = ?', [status, id]);

      // If completed, check if vehicle can be restored to available
      if (status === 'completed') {
        const [rec] = await pool.query('SELECT vehicle_id FROM maintenance WHERE id = ?', [id]);
        if (rec.length > 0) {
          await pool.query("UPDATE vehicles SET status = 'available' WHERE id = ?", [rec[0].vehicle_id]);
        }
      }

      res.status(200).json({
        success: true,
        message: 'Maintenance record updated successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Maintenance Record
   */
  deleteMaintenance = async (req, res, next) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM maintenance WHERE id = ?', [id]);
      res.status(200).json({
        success: true,
        message: 'Maintenance record deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete Booking
   */
  deleteBooking = async (req, res, next) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM booking_extras WHERE booking_id = ?', [id]);
      await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
      res.status(200).json({
        success: true,
        message: 'Booking deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get Reports Summary
   */
  getReports = async (req, res, next) => {
    try {
      // 1. Overall Totals
      const [rev] = await pool.query(
        "SELECT COALESCE(SUM(total_amount), 0) as totalRevenue, COUNT(*) as totalBookings FROM bookings WHERE booking_status != 'cancelled'"
      );

      // 2. Status Breakdown
      const [statusBreakdown] = await pool.query(
        "SELECT booking_status, COUNT(*) as count FROM bookings GROUP BY booking_status"
      );

      // 3. Fleet Status Breakdown
      const [fleetBreakdown] = await pool.query(
        "SELECT status, COUNT(*) as count FROM vehicles GROUP BY status"
      );

      // 4. Top Vehicles by bookings
      const [topVehicles] = await pool.query(
        `SELECT v.id, v.brand, v.model, v.daily_price, COUNT(b.id) as bookingCount, COALESCE(SUM(b.total_amount), 0) as totalRevenue
         FROM vehicles v
         LEFT JOIN bookings b ON v.id = b.vehicle_id AND b.booking_status != 'cancelled'
         GROUP BY v.id
         ORDER BY bookingCount DESC
         LIMIT 5`
      );

      res.status(200).json({
        success: true,
        data: {
          totalRevenue: parseFloat(rev[0].totalRevenue) || 0,
          totalBookings: parseInt(rev[0].totalBookings) || 0,
          statusBreakdown,
          fleetBreakdown,
          topVehicles
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AdminController();
