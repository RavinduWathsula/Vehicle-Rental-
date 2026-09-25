const vehicleModel = require('../models/vehicle.model');
const { buildVehicleQuery } = require('../utils/queryBuilder');

class VehicleService {
  async getAllVehicles(query, includeAll = false) {
    // If includeAll is false, we only show 'available' vehicles
    const queryContext = { ...query, includeAll };
    const queryParams = buildVehicleQuery(queryContext);
    
    const { total, data } = await vehicleModel.findAll(queryParams);
    
    // Calculate pagination metadata
    const page = parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
    const limit = parseInt(query.limit, 10) > 0 ? parseInt(query.limit, 10) : 10;
    const totalPages = Math.ceil(total / limit);
    
    return {
      vehicles: data,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    };
  }

  async getVehicleById(id) {
    const vehicle = await vehicleModel.findById(id);
    if (!vehicle) {
      const error = new Error('Vehicle not found.');
      error.statusCode = 404;
      throw error;
    }
    return vehicle;
  }

  async getVehicleImages(id) {
    // Ensure vehicle exists
    await this.getVehicleById(id);
    return await vehicleModel.findImages(id);
  }

  async getAvailability(id, startDate, endDate) {
    await this.getVehicleById(id);
    const isAvailable = await vehicleModel.checkAvailability(id, startDate, endDate);
    return { available: isAvailable };
  }

  async createVehicle(vehicleData) {
    // Check for duplicate registration
    const existing = await vehicleModel.findByRegistration(vehicleData.registration_number);
    if (existing) {
      const error = new Error('A vehicle with this registration number already exists.');
      error.statusCode = 409;
      throw error;
    }
    
    // Extract image_url if provided
    const imageUrl = vehicleData.image_url;
    delete vehicleData.image_url;

    const newVehicle = await vehicleModel.create(vehicleData);

    // If an image was provided, add it to vehicle_images
    if (imageUrl) {
      const pool = require('../config/db');
      await pool.execute(
        'INSERT INTO vehicle_images (vehicle_id, image_url, is_primary) VALUES (?, ?, ?)',
        [newVehicle.id, imageUrl, true]
      );
    }
    
    return newVehicle;
  }

  async updateVehicle(id, vehicleData) {
    await this.getVehicleById(id); // Ensure exists

    if (vehicleData.registration_number) {
      const existing = await vehicleModel.findByRegistration(vehicleData.registration_number, id);
      if (existing) {
        const error = new Error('A vehicle with this registration number already exists.');
        error.statusCode = 409;
        throw error;
      }
    }

    return await vehicleModel.update(id, vehicleData);
  }

  async deleteVehicle(id) {
    await this.getVehicleById(id); // Ensure exists
    
    try {
      await vehicleModel.delete(id);
    } catch (err) {
      // If there's a foreign key constraint failure (e.g., existing bookings)
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        const error = new Error('Cannot delete this vehicle because it has associated records (like bookings).');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }
}

module.exports = new VehicleService();
