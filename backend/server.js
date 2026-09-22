require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { testConnection } = require('./src/config/database');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorMiddleware');

// Route imports
const healthRoutes = require('./src/routes/health.routes');
// TODO: Import other routes as they are built
const authRoutes = require('./src/routes/auth.routes');
// const userRoutes = require('./src/routes/user.routes');
const vehicleRoutes = require('./src/routes/vehicle.routes');
// const categoryRoutes = require('./src/routes/category.routes');
const bookingRoutes = require('./src/routes/booking.routes');
// const driverRoutes = require('./src/routes/driver.routes');
// const extraRoutes = require('./src/routes/extra.routes');
// const locationRoutes = require('./src/routes/location.routes');
// const paymentRoutes = require('./src/routes/payment.routes');
// const maintenanceRoutes = require('./src/routes/maintenance.routes');
// const reviewRoutes = require('./src/routes/review.routes');
// const couponRoutes = require('./src/routes/coupon.routes');
// const notificationRoutes = require('./src/routes/notification.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();

// --- Middleware ---
// Enable CORS for client application
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// HTTP Request logging (Development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// --- Routes ---
app.use('/api/health', healthRoutes);

// Stubbed routes for future implementation
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/api/drivers', driverRoutes);
// app.use('/api/extras', extraRoutes);
// app.use('/api/locations', locationRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/maintenance', maintenanceRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/coupons', couponRoutes);
// app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// --- Error Handling ---
// Catch-all for 404 Not Found
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection before starting the server
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      console.warn('⚠️ Server starting without database connection.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
