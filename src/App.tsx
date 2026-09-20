import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { VehicleDetailsPage } from './pages/VehicleDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

import { CustomerLayout } from './components/layout/CustomerLayout';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { AdminLayout } from './components/layout/AdminLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#08090B] text-white selection:bg-[#D4AF37] selection:text-black font-sans">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/booking-confirmation/:referenceId" element={<ConfirmationPage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Customer Routes */}
            <Route 
              path="/customer" 
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin']}>
                  <CustomerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CustomerDashboardPage />} />
              <Route path="bookings" element={<div className="text-white">My Bookings View</div>} />
              <Route path="profile" element={<div className="text-white">Profile Settings View</div>} />
            </Route>

            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div className="text-white text-2xl font-bold">Admin Dashboard</div>} />
              <Route path="vehicles" element={<div className="text-white">Vehicle Management View</div>} />
              <Route path="bookings" element={<div className="text-white">Booking Management View</div>} />
              <Route path="customers" element={<div className="text-white">Customer Directory View</div>} />
              <Route path="drivers" element={<div className="text-white">Driver Approval View</div>} />
              <Route path="reports" element={<div className="text-white">Analytics & Reports View</div>} />
            </Route>

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
