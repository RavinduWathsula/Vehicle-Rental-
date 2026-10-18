const { pool } = require('./src/config/database');

async function seedData() {
  try {
    const [locs] = await pool.query('SELECT COUNT(*) as count FROM locations');
    if (locs[0].count === 0) {
      await pool.query(`INSERT INTO locations (name, address, city, phone, latitude, longitude, status) VALUES
        ('Downtown Office', '123 Main St, City Center', 'Metropolis', '+1234567800', 40.7128, -74.0060, 'active'),
        ('Airport Branch', 'Terminal 1, International Airport', 'Metropolis', '+1234567801', 40.6413, -73.7781, 'active'),
        ('Northside Station', '456 North Ave', 'Metropolis', '+1234567802', 40.8090, -73.9624, 'active')`);
      console.log('Seeded locations');
    }

    const [exts] = await pool.query('SELECT COUNT(*) as count FROM extras');
    if (exts[0].count === 0) {
      await pool.query(`INSERT INTO extras (name, description, price, pricing_type, status) VALUES
        ('Child Seat', 'Safety seat for infants and toddlers.', 10.00, 'per_day', 'active'),
        ('GPS Navigation', 'Standalone GPS device for easy navigation.', 5.00, 'per_day', 'active'),
        ('Additional Driver', 'Allow another person to drive the rental vehicle.', 15.00, 'per_day', 'active'),
        ('Prepaid Fuel', 'Prepay for a full tank of fuel at a discounted rate.', 60.00, 'per_booking', 'active'),
        ('Insurance Plus', 'Comprehensive coverage with zero deductible.', 25.00, 'per_day', 'active')`);
      console.log('Seeded extras');
    }

    const [cats] = await pool.query('SELECT COUNT(*) as count FROM vehicle_categories');
    if (cats[0].count <= 1) {
      await pool.query(`INSERT IGNORE INTO vehicle_categories (name, description) VALUES
        ('Economy', 'Small, fuel-efficient cars ideal for city driving and short trips.'),
        ('Compact', 'Slightly larger than economy, offering a good balance of size and fuel efficiency.'),
        ('Mid-size', 'Comfortable cars with more interior space, suitable for families and longer journeys.'),
        ('SUV', 'Sport Utility Vehicles offering more space, power, and often 4WD capability.'),
        ('Luxury', 'High-end vehicles providing superior comfort, performance, and features.'),
        ('Van', 'Large vehicles designed to carry groups of people or cargo.')`);
      console.log('Seeded categories');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    process.exit(0);
  }
}

seedData();
