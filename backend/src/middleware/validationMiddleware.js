/**
 * Middleware to validate request data against a Joi schema
 * @param {Object} schema - Joi validation schema
 * @param {String} source - Request property to validate ('body', 'query', 'params')
 */
const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false, // Return all errors
      stripUnknown: true, // Remove unknown keys
    });

    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    // Replace request data with validated data (includes default values & stripped keys)
    req[source] = value;
    next();
  };
};

module.exports = {
  validateRequest
};
