/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error Details:', err);

  // Default error format
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Custom structure for different known errors (e.g., MySQL errors)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Resource already exists.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

/**
 * 404 Not Found Middleware
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
