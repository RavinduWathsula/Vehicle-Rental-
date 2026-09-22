const authService = require('../services/auth.service');

class AuthController {
  /**
   * Handle user registration
   */
  register = async (req, res, next) => {
    try {
      const newUser = await authService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: {
          user: newUser
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handle user login
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handle retrieving current user profile
   */
  getMe = async (req, res, next) => {
    try {
      const userId = req.user.id; // Injected by authenticateUser middleware
      const user = await authService.getMe(userId);
      
      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handle user logout (Client-side token destruction focus)
   */
  logout = (req, res) => {
    // In a standard JWT setup, logout is handled by the client dropping the token.
    // If using cookies, we would clear the cookie here.
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  };
}

module.exports = new AuthController();
