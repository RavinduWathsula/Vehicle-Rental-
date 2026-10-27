const { pool } = require('./src/config/database');

async function seedData() {
  try {
    const [existing] = await pool.query('SELECT COUNT(*) as count FROM vehicles');
    if (existing[0].count === 0) {
      await pool.query(`INSERT INTO vehicles (category_id, brand, model, year, registration_number, fuel_type, transmission, seats, doors, luggage_capacity, daily_price, weekly_price, monthly_price, description, status) VALUES
(1, 'Toyota', 'Yaris', 2023, 'ECO-1001', 'petrol', 'automatic', 5, 4, 2, 45.00, 270.00, 1000.00, 'Reliable and economical city car.', 'available'),
(1, 'Honda', 'Fit', 2022, 'ECO-1002', 'hybrid', 'automatic', 5, 4, 2, 48.00, 280.00, 1050.00, 'Compact with surprising interior space.', 'available'),
(2, 'Volkswagen', 'Golf', 2023, 'CMP-2001', 'petrol', 'manual', 5, 4, 3, 55.00, 320.00, 1200.00, 'A benchmark in the compact class.', 'available'),
(3, 'Toyota', 'Camry', 2024, 'MID-3001', 'hybrid', 'automatic', 5, 4, 4, 75.00, 450.00, 1700.00, 'Comfortable and spacious mid-size sedan.', 'available'),
(3, 'Honda', 'Accord', 2023, 'MID-3002', 'petrol', 'automatic', 5, 4, 4, 70.00, 420.00, 1600.00, 'Sporty and reliable family car.', 'available'),
(4, 'Toyota', 'RAV4', 2024, 'SUV-4001', 'hybrid', 'automatic', 5, 5, 5, 90.00, 540.00, 2000.00, 'Versatile and efficient SUV.', 'available'),
(4, 'Ford', 'Explorer', 2023, 'SUV-4002', 'petrol', 'automatic', 7, 5, 4, 110.00, 650.00, 2400.00, 'Large SUV with plenty of room for family and gear.', 'available'),
(5, 'Mercedes-Benz', 'E-Class', 2024, 'LUX-5001', 'petrol', 'automatic', 5, 4, 4, 150.00, 900.00, 3200.00, 'Premium executive sedan with advanced features.', 'available'),
(5, 'BMW', '5 Series', 2023, 'LUX-5002', 'diesel', 'automatic', 5, 4, 4, 140.00, 850.00, 3000.00, 'Sporty luxury sedan with excellent driving dynamics.', 'available'),
(6, 'Ford', 'Transit', 2022, 'VAN-6001', 'diesel', 'manual', 12, 4, 6, 120.00, 700.00, 2600.00, 'Spacious passenger van for group travel.', 'available')`);
      console.log('Seeded 10 vehicles');
      
      const images = [
        [1, 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80', true],
        [2, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', true],
        [3, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80', true],
        [4, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80', true],
        [5, 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80', true],
        [6, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80', true],
        [7, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80', true],
        [8, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80', true],
        [9, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80', true],
        [10, 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80', true]
      ];
      for (const img of images) {
        await pool.query('INSERT INTO vehicle_images (vehicle_id, image_url, is_primary) VALUES (?, ?, ?)', img);
      }
      console.log('Seeded vehicle images');
    }

    const [driverCount] = await pool.query('SELECT COUNT(*) as count FROM drivers');
    if (driverCount[0].count === 0) {
      await pool.query(`INSERT INTO drivers (name, phone, license_number, license_expiry, status) VALUES
('Michael Chang', '+1555123400', 'DL-MC-87654', '2028-05-15', 'available'),
('Sarah Connor', '+1555123401', 'DL-SC-98765', '2027-11-20', 'available'),
('David Miller', '+1555123402', 'DL-DM-11223', '2026-08-10', 'available')`);
      console.log('Seeded 3 drivers');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await pool.end();
  }
}

seedData();
