const bcrypt = require('bcryptjs');
const pool = require('./src/config/db');

async function createAdmin() {
  try {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash('admin123', salt);
    
    // Check if admin already exists
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', ['admin@drivex.com']);
    
    if (rows.length > 0) {
      console.log('Admin user already exists!');
      console.log('Email: admin@drivex.com');
      console.log('Password: admin123 (or whatever you set previously)');
    } else {
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)',
        ['Super Admin', 'admin@drivex.com', passwordHash, 'admin', 'active']
      );
      console.log('Admin user created successfully!');
      console.log('Email: admin@drivex.com');
      console.log('Password: admin123');
    }
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  } finally {
    process.exit();
  }
}

createAdmin();
