CREATE DATABASE IF NOT EXISTS drivex_db;
USE drivex_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    license_number VARCHAR(50),
    role ENUM('guest', 'customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category ENUM('compact', 'sedan', 'suv', 'luxury', 'minivan', 'sport') NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    transmission ENUM('Automatic', 'Manual') NOT NULL,
    fuel ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid') NOT NULL,
    seats INT NOT NULL,
    doors INT NOT NULL,
    luggage INT NOT NULL,
    year INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference_id VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    pickup_time TIME NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    return_date DATE NOT NULL,
    return_time TIME NOT NULL,
    return_location VARCHAR(255) NOT NULL,
    status ENUM('upcoming', 'active', 'completed', 'cancelled') DEFAULT 'upcoming',
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);
