const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    // Check for duplicate email
    const existingUser = await userModel.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error('Email is already registered.');
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(userData.password, salt);

    // Create user (defaults to 'customer' role in DB and Model)
    const newUser = await userModel.create({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password_hash
    });

    return newUser;
  }

  /**
   * Authenticate a user and generate JWT
   */
  async login(email, password) {
    // Check if user exists
    const user = await userModel.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    // Check if account is active
    if (user.status !== 'active') {
      const error = new Error(`Account is ${user.status}. Please contact support.`);
      error.statusCode = 403; // Forbidden
      throw error;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT
    const payload = {
      id: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Remove password_hash before returning
    delete user.password_hash;

    return {
      user,
      token
    };
  }

  /**
   * Fetch current user profile
   */
  async getMe(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

module.exports = new AuthService();
