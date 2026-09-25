import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicles from './pages/Vehicles';
import { VehicleDetailsPage } from './pages/VehicleDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { CustomerBookings } from './pages/customer/CustomerBookings';
import { CustomerFavorites } from './pages/customer/CustomerFavorites';
import { CustomerProfile } from './pages/customer/CustomerProfile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVehicles } from './pages/admin/AdminVehicles';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminDrivers } from './pages/admin/AdminDrivers';
import { AdminMaintenance } from './pages/admin/AdminMaintenance';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Customer Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<CustomerDashboardPage />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="booking/:id" element={<BookingPage />} />
          <Route path="bookings" element={<CustomerBookings />} />
          <Route path="favorites" element={<CustomerFavorites />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="vehicles" element={<AdminVehicles />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="drivers" element={<AdminDrivers />} />
          <Route path="maintenance" element={<AdminMaintenance />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
