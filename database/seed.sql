USE drivex_rental;

-- Password for all seed users is 'password123'
-- Hash is a standard bcrypt hash for 'password123' (e.g. $2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxep68p.gLpG.7Ixy)
SET @dev_password_hash = '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxep68p.gLpG.7Ixy';

-- Seed Users
INSERT INTO users (name, email, password_hash, phone, role, status) VALUES
('Admin User', 'admin@drivex.com', @dev_password_hash, '+1234567890', 'admin', 'active'),
('Staff User', 'staff@drivex.com', @dev_password_hash, '+1234567891', 'staff', 'active'),
('John Doe', 'john.doe@example.com', @dev_password_hash, '+1987654321', 'customer', 'active'),
('Jane Smith', 'jane.smith@example.com', @dev_password_hash, '+1987654322', 'customer', 'active'),
('Alice Johnson', 'alice.j@example.com', @dev_password_hash, '+1987654323', 'customer', 'active');

-- Seed Vehicle Categories
INSERT INTO vehicle_categories (name, description) VALUES
('Economy', 'Small, fuel-efficient cars ideal for city driving and short trips.'),
('Compact', 'Slightly larger than economy, offering a good balance of size and fuel efficiency.'),
('Mid-size', 'Comfortable cars with more interior space, suitable for families and longer journeys.'),
('SUV', 'Sport Utility Vehicles offering more space, power, and often 4WD capability.'),
('Luxury', 'High-end vehicles providing superior comfort, performance, and features.'),
('Van', 'Large vehicles designed to carry groups of people or cargo.');

-- Seed Vehicles (10 realistic vehicles)
INSERT INTO vehicles (category_id, brand, model, year, registration_number, fuel_type, transmission, seats, doors, luggage_capacity, daily_price, weekly_price, monthly_price, description, status) VALUES
(1, 'Toyota', 'Yaris', 2023, 'ECO-1001', 'petrol', 'automatic', 5, 4, 2, 45.00, 270.00, 1000.00, 'Reliable and economical city car.', 'available'),
(1, 'Honda', 'Fit', 2022, 'ECO-1002', 'hybrid', 'automatic', 5, 4, 2, 48.00, 280.00, 1050.00, 'Compact with surprising interior space.', 'available'),
(2, 'Volkswagen', 'Golf', 2023, 'CMP-2001', 'petrol', 'manual', 5, 4, 3, 55.00, 320.00, 1200.00, 'A benchmark in the compact class.', 'available'),
(3, 'Toyota', 'Camry', 2024, 'MID-3001', 'hybrid', 'automatic', 5, 4, 4, 75.00, 450.00, 1700.00, 'Comfortable and spacious mid-size sedan.', 'available'),
(3, 'Honda', 'Accord', 2023, 'MID-3002', 'petrol', 'automatic', 5, 4, 4, 70.00, 420.00, 1600.00, 'Sporty and reliable family car.', 'available'),
(4, 'Toyota', 'RAV4', 2024, 'SUV-4001', 'hybrid', 'automatic', 5, 5, 5, 90.00, 540.00, 2000.00, 'Versatile and efficient SUV.', 'available'),
(4, 'Ford', 'Explorer', 2023, 'SUV-4002', 'petrol', 'automatic', 7, 5, 4, 110.00, 650.00, 2400.00, 'Large SUV with plenty of room for family and gear.', 'available'),
(5, 'Mercedes-Benz', 'E-Class', 2024, 'LUX-5001', 'petrol', 'automatic', 5, 4, 4, 150.00, 900.00, 3200.00, 'Premium executive sedan with advanced features.', 'available'),
(5, 'BMW', '5 Series', 2023, 'LUX-5002', 'diesel', 'automatic', 5, 4, 4, 140.00, 850.00, 3000.00, 'Sporty luxury sedan with excellent driving dynamics.', 'available'),
(6, 'Ford', 'Transit', 2022, 'VAN-6001', 'diesel', 'manual', 12, 4, 6, 120.00, 700.00, 2600.00, 'Spacious passenger van for group travel.', 'available');

-- Seed Locations
INSERT INTO locations (name, address, city, phone, latitude, longitude, status) VALUES
('Downtown Office', '123 Main St, City Center', 'Metropolis', '+1234567800', 40.7128, -74.0060, 'active'),
('Airport Branch', 'Terminal 1, International Airport', 'Metropolis', '+1234567801', 40.6413, -73.7781, 'active'),
('Northside Station', '456 North Ave', 'Metropolis', '+1234567802', 40.8090, -73.9624, 'active');

-- Seed Drivers
INSERT INTO drivers (name, phone, license_number, license_expiry, status) VALUES
('Michael Chang', '+1555123400', 'DL-MC-87654', '2028-05-15', 'available'),
('Sarah Connor', '+1555123401', 'DL-SC-98765', '2027-11-20', 'available'),
('David Miller', '+1555123402', 'DL-DM-11223', '2026-08-10', 'available');

-- Seed Extras
INSERT INTO extras (name, description, price, pricing_type, status) VALUES
('Child Seat', 'Safety seat for infants and toddlers.', 10.00, 'per_day', 'active'),
('GPS Navigation', 'Standalone GPS device for easy navigation.', 5.00, 'per_day', 'active'),
('Additional Driver', 'Allow another person to drive the rental vehicle.', 15.00, 'per_day', 'active'),
('Prepaid Fuel', 'Prepay for a full tank of fuel at a discounted rate.', 60.00, 'per_booking', 'active'),
('Insurance Plus', 'Comprehensive coverage with zero deductible.', 25.00, 'per_day', 'active');
