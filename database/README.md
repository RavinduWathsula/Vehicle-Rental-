# DRIVEX Rental Database Schema

This database, named `drivex_rental`, is designed to support the DRIVEX vehicle rental system. It uses a relational model with InnoDB as the storage engine to enforce data integrity through foreign keys and constraints.

## Entity Relationship Overview

The database consists of 14 core tables handling users, vehicles, bookings, payments, and system operations.

## Table Details

### 1. `users`
Stores user account information including customers, staff, and admins.
- **id**: Primary Key
- **email**: Unique identifier for login
- **role**: Determines permissions (`customer`, `staff`, `admin`)
- **status**: Account state (`active`, `inactive`, `suspended`)

### 2. `vehicle_categories`
Defines categories for vehicles (e.g., SUV, Sedan, Luxury).
- **id**: Primary Key
- **name**: Unique category name

### 3. `vehicles`
The core inventory table holding details of each vehicle.
- **id**: Primary Key
- **category_id**: Foreign Key to `vehicle_categories`
- **registration_number**: Unique license plate
- **status**: Current state (`available`, `rented`, `maintenance`, `inactive`)
- *Indexes*: registration_number, status

### 4. `vehicle_images`
Stores URLs for vehicle photographs.
- **id**: Primary Key
- **vehicle_id**: Foreign Key to `vehicles` (Cascade delete)
- **is_primary**: Indicates the main image to display

### 5. `locations`
Physical branches where vehicles can be picked up or returned.
- **id**: Primary Key
- **status**: Indicates if the location is currently operating

### 6. `drivers`
Profiles for chauffeurs/drivers that can be assigned to bookings.
- **id**: Primary Key
- **license_number**: Unique driving license
- **status**: Driver availability

### 7. `extras`
Add-ons available for bookings (e.g., Child Seat, GPS).
- **id**: Primary Key
- **pricing_type**: How it's charged (`per_day`, `per_booking`)

### 8. `coupons`
Discount codes applicable to bookings.
- **id**: Primary Key
- **code**: Unique promo code
- **discount_type**: `percentage` or `fixed`

### 9. `bookings`
The central transaction table connecting users, vehicles, locations, and drivers.
- **id**: Primary Key
- **booking_reference**: Unique public reference (e.g., BKG-12345)
- **user_id**: Foreign Key to `users`
- **vehicle_id**: Foreign Key to `vehicles`
- **pickup/return_location_id**: Foreign Keys to `locations`
- **driver_id**: Foreign Key to `drivers` (Nullable)
- **booking_status**: Current state of the reservation
- *Indexes*: booking_reference, user_id, vehicle_id, pickup_datetime, return_datetime, booking_status

### 10. `booking_extras`
Junction table linking bookings to their chosen extras.
- **id**: Primary Key
- **booking_id**: Foreign Key to `bookings` (Cascade delete)
- **extra_id**: Foreign Key to `extras`
- **price**: Snapshot of the price at the time of booking

### 11. `payments`
Records of financial transactions related to bookings.
- **id**: Primary Key
- **booking_id**: Foreign Key to `bookings`
- **payment_method**: Type of payment used
- **status**: Transaction state

### 12. `maintenance`
Logs vehicle service and repairs.
- **id**: Primary Key
- **vehicle_id**: Foreign Key to `vehicles`
- **status**: Progress of the maintenance

### 13. `reviews`
User feedback for completed bookings.
- **id**: Primary Key
- **booking_id**: Foreign Key to `bookings` (Unique constraint to prevent multiple reviews)
- **user_id**: Foreign Key to `users`
- **vehicle_id**: Foreign Key to `vehicles`
- **rating**: 1 to 5 scale

### 14. `notifications`
System alerts and messages for users.
- **id**: Primary Key
- **user_id**: Foreign Key to `users`
- **is_read**: Boolean flag

## Relationships & Constraints
- All tables use `InnoDB` engine to support foreign key constraints.
- Deletions are typically `RESTRICT`ed to prevent accidental data loss (e.g., you cannot delete a user if they have bookings).
- `CASCADE` is used where logically appropriate (e.g., deleting a vehicle deletes its images).
- Important query fields like dates, IDs, and statuses are indexed to optimize performance.
