# Database

This folder contains the SQL scripts necessary to set up the MySQL database for the DRIVEX platform.

## Setup Instructions

1. Ensure MySQL is installed and running on your local machine.
2. Open your terminal or MySQL client.
3. Run the schema creation script to create the database and tables:
   ```bash
   mysql -u root -p < schema.sql
   ```
4. (Optional) Run the seed script to populate the database with mock data:
   ```bash
   mysql -u root -p < seed.sql
   ```

Note: Ensure your `.env` file in the `backend/` directory is updated with the correct MySQL credentials.
