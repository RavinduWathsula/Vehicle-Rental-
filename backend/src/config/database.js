const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'drivex_rental',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    try {
      const dbName = process.env.DB_NAME || 'drivex_rental';
      const [cols] = await connection.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'drivers' AND COLUMN_NAME = 'profile_image'`,
        [dbName]
      );
      if (cols.length === 0) {
        await connection.query('ALTER TABLE drivers ADD COLUMN profile_image MEDIUMTEXT DEFAULT NULL');
        console.log('✅ Auto-migrated: Added profile_image column to drivers table');
      }
    } catch (schemaErr) {
      console.warn('⚠️ Driver schema check warning:', schemaErr.message);
    }
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};
