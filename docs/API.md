# DRIVEX API Documentation

## Base URL
`http://localhost:5000/api`

## Endpoints

### Health Check
*   **URL:** `/health`
*   **Method:** `GET`
*   **Description:** Checks if the backend server is running and verifies the database connection status.
*   **Response:**
    ```json
    {
      "status": "success",
      "message": "DRIVEX Backend is running smoothly",
      "database": "connected",
      "timestamp": "2026-10-15T10:00:00.000Z"
    }
    ```

---
*More endpoints for users, vehicles, and bookings will be documented here as they are developed.*
