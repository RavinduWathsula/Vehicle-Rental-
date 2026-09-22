import React from 'react';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';

export const VehicleDetails = () => <Container className="py-12"><SectionHeading title="Vehicle Details" /><GlassCard>Details and 3D viewer go here.</GlassCard></Container>;
export const Booking = () => <Container className="py-12"><SectionHeading title="Complete Booking" /><GlassCard>Booking form goes here.</GlassCard></Container>;

// Auth
export const Login = () => <div className="w-full"><SectionHeading title="Welcome Back" subtitle="Sign In" /><p className="text-gray-400">Login form goes here.</p></div>;
export const Register = () => <div className="w-full"><SectionHeading title="Create Account" subtitle="Join DRIVEX" /><p className="text-gray-400">Registration form goes here.</p></div>;

// Customer Dashboard
export const CustomerDashboard = () => <div><h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2><GlassCard>Customer stats go here.</GlassCard></div>;
export const MyBookings = () => <div><h2 className="text-2xl font-bold text-white mb-6">My Bookings</h2><GlassCard>Booking history goes here.</GlassCard></div>;
export const Profile = () => <div><h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2><GlassCard>Profile form goes here.</GlassCard></div>;

// Admin Dashboard
export const AdminDashboard = () => <div><h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2><GlassCard>Admin stats go here.</GlassCard></div>;
export const AdminVehicles = () => <div><h2 className="text-2xl font-bold text-white mb-6">Manage Vehicles</h2><GlassCard>Vehicle CRUD table goes here.</GlassCard></div>;
export const AdminBookings = () => <div><h2 className="text-2xl font-bold text-white mb-6">Manage Bookings</h2><GlassCard>Booking CRUD table goes here.</GlassCard></div>;
export const AdminCustomers = () => <div><h2 className="text-2xl font-bold text-white mb-6">Manage Customers</h2><GlassCard>Customer CRUD table goes here.</GlassCard></div>;
export const AdminDrivers = () => <div><h2 className="text-2xl font-bold text-white mb-6">Manage Drivers</h2><GlassCard>Driver CRUD table goes here.</GlassCard></div>;
export const AdminMaintenance = () => <div><h2 className="text-2xl font-bold text-white mb-6">Maintenance Logs</h2><GlassCard>Maintenance CRUD table goes here.</GlassCard></div>;
export const AdminReports = () => <div><h2 className="text-2xl font-bold text-white mb-6">Reports & Analytics</h2><GlassCard>Charts go here.</GlassCard></div>;
export const AdminSettings = () => <div><h2 className="text-2xl font-bold text-white mb-6">System Settings</h2><GlassCard>Configuration goes here.</GlassCard></div>;
