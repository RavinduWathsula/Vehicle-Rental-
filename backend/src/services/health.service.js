/**
 * Health Service
 * Handles business logic for the health check endpoint.
 */
class HealthService {
  /**
   * Retrieves the current health status of the application
   * @returns {Object} Health status
   */
  getHealthStatus() {
    return {
      success: true,
      message: 'DRIVEX API is running',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new HealthService();
