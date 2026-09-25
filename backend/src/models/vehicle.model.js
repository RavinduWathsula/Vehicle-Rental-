const { pool } = require('../config/database');

class VehicleModel {
  async findAll({ whereClause, orderByClause, limitClause, values, countValues }) {
    // Get total count for pagination
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM vehicles ${whereClause}`,
      countValues
    );
    const total = countResult[0].total;

    // Get paginated results
    const [rows] = await pool.execute(
      `SELECT v.*, c.name as category_name, 
        (SELECT image_url FROM vehicle_images vi WHERE vi.vehicle_id = v.id ORDER BY is_primary DESC LIMIT 1) as primary_image
       FROM vehicles v 
       LEFT JOIN vehicle_categories c ON v.category_id = c.id 
       ${whereClause} 
       ${orderByClause} 
       ${limitClause}`,
      values
    );

    return { total, data: rows };
  }

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT v.*, c.name as category_name,
        (SELECT image_url FROM vehicle_images vi WHERE vi.vehicle_id = v.id ORDER BY is_primary DESC LIMIT 1) as primary_image
       FROM vehicles v 
       LEFT JOIN vehicle_categories c ON v.category_id = c.id 
       WHERE v.id = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async findImages(vehicleId) {
    const [rows] = await pool.execute(
      'SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY is_primary DESC',
      [vehicleId]
    );
    return rows;
  }

  async findByRegistration(registrationNumber, excludeId = null) {
    let query = 'SELECT id FROM vehicles WHERE registration_number = ?';
    const values = [registrationNumber];
    
    if (excludeId) {
      query += ' AND id != ?';
      values.push(excludeId);
    }
    
    const [rows] = await pool.execute(query, values);
    return rows.length > 0 ? rows[0] : null;
  }

  async create(vehicleData) {
    const fields = Object.keys(vehicleData);
    const placeholders = fields.map(() => '?').join(', ');
    const values = Object.values(vehicleData);

    const [result] = await pool.execute(
      `INSERT INTO vehicles (${fields.join(', ')}) VALUES (${placeholders})`,
      values
    );

    return this.findById(result.insertId);
  }

  async update(id, vehicleData) {
    const fields = Object.keys(vehicleData);
    const updates = fields.map(field => `${field} = ?`).join(', ');
    const values = [...Object.values(vehicleData), id];

    await pool.execute(
      `UPDATE vehicles SET ${updates} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM vehicles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  async checkAvailability(vehicleId, startDate, endDate) {
    // Check if there are any active bookings for this vehicle that overlap with the given dates
    // For now, if startDate and endDate are not provided, we just check if it's currently 'rented'
    if (!startDate || !endDate) {
      const vehicle = await this.findById(vehicleId);
      return vehicle && vehicle.status === 'available';
    }

    const [rows] = await pool.execute(
      `SELECT id FROM bookings 
       WHERE vehicle_id = ? 
       AND booking_status IN ('confirmed', 'active')
       AND (
         (pickup_datetime <= ? AND return_datetime >= ?) OR
         (pickup_datetime <= ? AND return_datetime >= ?) OR
         (pickup_datetime >= ? AND return_datetime <= ?)
       )`,
      [vehicleId, endDate, startDate, startDate, endDate, startDate, endDate]
    );
    
    return rows.length === 0;
  }
}

module.exports = new VehicleModel();
