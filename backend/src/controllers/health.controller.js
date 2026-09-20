const db = require('../config/db');

exports.checkHealth = async (req, res) => {
  try {
    // Attempt a simple database query to verify full end-to-end connectivity
    await db.query('SELECT 1');
    
    res.status(200).json({
      status: 'success',
      message: 'DRIVEX Backend is running smoothly',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // If DB is down, still return backend is running, but DB is disconnected
    res.status(200).json({
      status: 'success',
      message: 'DRIVEX Backend is running (Database disconnected)',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
