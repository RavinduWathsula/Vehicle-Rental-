const Joi = require('joi');

const createBookingSchema = Joi.object({
  vehicle_id: Joi.number().integer().required(),
  driver_id: Joi.number().integer().allow(null).optional(),
  pickup_location_id: Joi.number().integer().required(),
  return_location_id: Joi.number().integer().required(),
  
  // Must be a valid date string and pickup must be in the future
  pickup_datetime: Joi.date().iso().min('now').required().messages({
    'date.min': 'Pickup date must be in the future.'
  }),
  
  // Return must be strictly after pickup
  return_datetime: Joi.date().iso().greater(Joi.ref('pickup_datetime')).required().messages({
    'date.greater': 'Return date must be after the pickup date.'
  }),

  // Extras should be an array of objects: { extra_id: 1, quantity: 1 }
  extras: Joi.array().items(
    Joi.object({
      extra_id: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).default(1)
    })
  ).optional().default([])

  // NOTE: We strictly DO NOT validate or accept pricing info from the client payload.
  // The service layer completely calculates total_amount, tax, etc.
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
