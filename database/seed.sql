USE drivex_db;

-- Seed Users
INSERT INTO users (first_name, last_name, email, password_hash, phone, license_number, role)
VALUES 
('Admin', 'User', 'admin@drivex.com', 'hashed_password_here', '+1 (555) 000-0000', 'DL-0000000', 'admin'),
('John', 'Doe', 'customer@drivex.com', 'hashed_password_here', '+1 (555) 123-4567', 'DL-1234567', 'customer');

-- Seed Vehicles
INSERT INTO vehicles (name, brand, category, price_per_day, transmission, fuel, seats, doors, luggage, year, image_url)
VALUES 
('Model S Plaid', 'Tesla', 'luxury', 199.00, 'Automatic', 'Electric', 5, 4, 2, 2024, 'https://images.unsplash.com/photo-1617788138017-80ad40651399'),
('911 Carrera', 'Porsche', 'sport', 250.00, 'Automatic', 'Petrol', 2, 2, 1, 2023, 'https://images.unsplash.com/photo-1503376760367-11ea8eb22247');

-- Seed Bookings
INSERT INTO bookings (reference_id, user_id, vehicle_id, pickup_date, pickup_time, pickup_location, return_date, return_time, return_location, status, total_price)
VALUES 
('DX-A8F9K2', 2, 1, '2026-10-15', '10:00:00', 'LAX', '2026-10-18', '10:00:00', 'LAX', 'upcoming', 711.70);
