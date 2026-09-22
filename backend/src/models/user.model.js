const { pool } = require('../config/database');

class UserModel {
  /**
   * Find a user by their email address
   * @param {String} email 
   * @returns {Object|null} User record or null
   */
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Find a user by their ID
   * @param {Number} id 
   * @returns {Object|null} User record or null
   */
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, phone, role, status, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Create a new user
   * @param {Object} userData 
   * @returns {Object} The created user (excluding password)
   */
  async create({ name, email, password_hash, phone = null, role = 'customer' }) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password_hash, phone, role]
    );
    
    return this.findById(result.insertId);
  }
}

module.exports = new UserModel();
