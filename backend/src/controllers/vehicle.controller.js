const vehicleService = require('../services/vehicle.service');

class VehicleController {
  // --- PUBLIC ENDPOINTS ---

  getAllVehicles = async (req, res, next) => {
    try {
      const result = await vehicleService.getAllVehicles(req.query, false);
      res.status(200).json({
        success: true,
        data: result.vehicles,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  };

  getVehicleById = async (req, res, next) => {
    try {
      const vehicle = await vehicleService.getVehicleById(req.params.id);
      res.status(200).json({
        success: true,
        data: vehicle
      });
    } catch (error) {
      next(error);
    }
  };

  getVehicleImages = async (req, res, next) => {
    try {
      const images = await vehicleService.getVehicleImages(req.params.id);
      res.status(200).json({
        success: true,
        data: images
      });
    } catch (error) {
      next(error);
    }
  };

  getAvailability = async (req, res, next) => {
    try {
      const { startDate, endDate } = req.query;
      const availability = await vehicleService.getAvailability(req.params.id, startDate, endDate);
      res.status(200).json({
        success: true,
        data: availability
      });
    } catch (error) {
      next(error);
    }
  };

  // --- ADMIN ENDPOINTS ---

  getAdminVehicles = async (req, res, next) => {
    try {
      // Admins can see all statuses (inactive, maintenance, rented)
      const result = await vehicleService.getAllVehicles(req.query, true);
      res.status(200).json({
        success: true,
        data: result.vehicles,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  };

  createVehicle = async (req, res, next) => {
    try {
      const vehicle = await vehicleService.createVehicle(req.body);
      res.status(201).json({
        success: true,
        message: 'Vehicle created successfully.',
        data: vehicle
      });
    } catch (error) {
      next(error);
    }
  };

  updateVehicle = async (req, res, next) => {
    try {
      const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Vehicle updated successfully.',
        data: vehicle
      });
    } catch (error) {
      next(error);
    }
  };

  deleteVehicle = async (req, res, next) => {
    try {
      await vehicleService.deleteVehicle(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Vehicle deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new VehicleController();
