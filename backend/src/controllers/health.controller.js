const healthService = require('../services/health.service');

/**
 * Health Controller
 * Handles HTTP requests related to system health
 */
class HealthController {
  /**
   * Get API health status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getHealth = (req, res, next) => {
    try {
      const status = healthService.getHealthStatus();
      return res.status(200).json({
        success: status.success,
        message: status.message
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new HealthController();
