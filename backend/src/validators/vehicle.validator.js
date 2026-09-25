const Joi = require('joi');

const createVehicleSchema = Joi.object({
  category_id: Joi.number().integer().required(),
  brand: Joi.string().max(100).required(),
  model: Joi.string().max(100).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  registration_number: Joi.string().max(50).required(),
  fuel_type: Joi.string().valid('petrol', 'diesel', 'electric', 'hybrid').required(),
  transmission: Joi.string().valid('manual', 'automatic').required(),
  seats: Joi.number().integer().min(1).max(50).required(),
  doors: Joi.number().integer().min(1).max(10).required(),
  luggage_capacity: Joi.number().integer().min(0).required(),
  daily_price: Joi.number().precision(2).positive().required(),
  weekly_price: Joi.number().precision(2).positive().required(),
  monthly_price: Joi.number().precision(2).positive().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('available', 'rented', 'maintenance', 'inactive').default('available'),
  image_url: Joi.string().uri().allow('', null)
});

const updateVehicleSchema = Joi.object({
  category_id: Joi.number().integer(),
  brand: Joi.string().max(100),
  model: Joi.string().max(100),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1),
  registration_number: Joi.string().max(50),
  fuel_type: Joi.string().valid('petrol', 'diesel', 'electric', 'hybrid'),
  transmission: Joi.string().valid('manual', 'automatic'),
  seats: Joi.number().integer().min(1).max(50),
  doors: Joi.number().integer().min(1).max(10),
  luggage_capacity: Joi.number().integer().min(0),
  daily_price: Joi.number().precision(2).positive(),
  weekly_price: Joi.number().precision(2).positive(),
  monthly_price: Joi.number().precision(2).positive(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('available', 'rented', 'maintenance', 'inactive')
}).min(1); // At least one field must be provided for update

module.exports = {
  createVehicleSchema,
  updateVehicleSchema
};
