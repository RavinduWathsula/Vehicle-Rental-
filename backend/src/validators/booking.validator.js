const Joi = require('joi');

const createBookingSchema = Joi.object({
  vehicle_id: Joi.alternatives().try(Joi.number().integer(), Joi.string()).required(),
  driver_id: Joi.number().integer().allow(null).optional(),
  pickup_location_id: Joi.number().integer().default(1),
  return_location_id: Joi.number().integer().default(1),
  
  // Must be a valid date string
  pickup_datetime: Joi.date().iso().required(),
  
  // Return must be strictly after pickup
  return_datetime: Joi.date().iso().greater(Joi.ref('pickup_datetime')).required().messages({
    'date.greater': 'Return date must be after the pickup date.'
  }),

  // Extras should be an array of objects or IDs
  extras: Joi.array().items(
    Joi.alternatives().try(
      Joi.object({
        extra_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).default(1)
      }),
      Joi.number().integer(),
      Joi.string()
    )
  ).optional().default([])
});

// Admin schema for updating status
const updateBookingStatusSchema = Joi.object({
  booking_status: Joi.string().valid('pending', 'confirmed', 'active', 'completed', 'cancelled'),
  payment_status: Joi.string().valid('pending', 'partial', 'paid', 'refunded')
}).min(1);

module.exports = {
  createBookingSchema,
  updateBookingStatusSchema
};
