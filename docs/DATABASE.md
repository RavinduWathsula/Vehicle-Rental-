# DRIVEX Database Architecture

## Relational Schema Overview

The DRIVEX platform uses MySQL. The current schema includes three primary tables: `users`, `vehicles`, and `bookings`.

### `users` Table
Stores customer and admin profiles.
*   `id` (INT, Primary Key)
*   `first_name` (VARCHAR)
*   `last_name` (VARCHAR)
*   `email` (VARCHAR, Unique)
*   `password_hash` (VARCHAR) - Stored securely.
*   `phone` (VARCHAR)
*   `license_number` (VARCHAR)
*   `role` (ENUM: 'guest', 'customer', 'admin')

### `vehicles` Table
Stores the inventory of premium vehicles available for rent.
*   `id` (INT, Primary Key)
*   `name` (VARCHAR) - e.g., 'Model S Plaid'
*   `brand` (VARCHAR) - e.g., 'Tesla'
*   `category` (ENUM) - e.g., 'luxury', 'sport'
*   `price_per_day` (DECIMAL)
*   `transmission` (ENUM)
*   `fuel` (ENUM)
*   `seats`, `doors`, `luggage` (INT)
*   `year` (INT)
*   `image_url` (VARCHAR)

### `bookings` Table
Tracks reservations. Links users to vehicles.
*   `id` (INT, Primary Key)
*   `reference_id` (VARCHAR, Unique) - e.g., 'DX-A8F9K2'
*   `user_id` (INT, Foreign Key -> `users.id`)
*   `vehicle_id` (INT, Foreign Key -> `vehicles.id`)
*   `pickup_date`, `return_date` (DATE)
*   `pickup_time`, `return_time` (TIME)
*   `pickup_location`, `return_location` (VARCHAR)
*   `status` (ENUM: 'upcoming', 'active', 'completed', 'cancelled')
*   `total_price` (DECIMAL)

### Relationships
*   **One-to-Many**: One `user` can have multiple `bookings`.
*   **One-to-Many**: One `vehicle` can be associated with multiple `bookings`.
