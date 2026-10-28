import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Calendar, Banknote, Car, RefreshCw, BarChart2 } from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminReports = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    statusBreakdown: [] as any[],
    fleetBreakdown: [] as any[],
    topVehicles: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/reports');
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Analytics & Reports</h1>
          <p className="text-drivex-text-muted text-sm">Comprehensive performance metrics calculated from your real database records.</p>
        </div>
        <button 
          onClick={fetchReports}
          className="flex items-center gap-2 px-4 py-2 bg-drivex-card border border-drivex-border hover:border-drivex-accent text-drivex-text rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-drivex-accent' : ''} />
          Refresh Data
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-drivex-card p-6 rounded-2xl border border-drivex-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-drivex-accent/10 text-drivex-accent">
              <Banknote size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
              <TrendingUp size={12} /> Live
            </span>
          </div>
          <h3 className="text-drivex-text-muted text-sm font-medium mb-1 uppercase tracking-wider">Total Revenue</h3>
          <p className="text-3xl font-black text-drivex-text">
            LKR {data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-drivex-card p-6 rounded-2xl border border-drivex-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Calendar size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md border border-purple-400/20">
              Total
            </span>
          </div>
          <h3 className="text-drivex-text-muted text-sm font-medium mb-1 uppercase tracking-wider">Total Bookings</h3>
          <p className="text-3xl font-black text-drivex-text">{data.totalBookings}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-drivex-card p-6 rounded-2xl border border-drivex-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
              <Car size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md border border-orange-400/20">
              Fleet
            </span>
          </div>
          <h3 className="text-drivex-text-muted text-sm font-medium mb-1 uppercase tracking-wider">Fleet Breakdown</h3>
          <p className="text-3xl font-black text-drivex-text">
            {data.fleetBreakdown.reduce((sum, item) => sum + (parseInt(item.count) || 0), 0)} Vehicles
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Booking Status Breakdown */}
        <div className="bg-drivex-card p-6 rounded-2xl border border-drivex-border shadow-sm">
          <h3 className="text-lg font-bold text-drivex-text uppercase tracking-wider mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-drivex-accent" />
            Bookings By Status
          </h3>
          {data.statusBreakdown && data.statusBreakdown.length > 0 ? (
            <div className="space-y-4">
              {data.statusBreakdown.map((item: any) => (
                <div key={item.booking_status} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-drivex-text uppercase tracking-wider">
                    <span className="capitalize">{item.booking_status}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="h-2 bg-drivex-sidebar rounded-full overflow-hidden border border-drivex-border">
                    <div 
                      className={`h-full rounded-full ${
                        item.booking_status === 'completed' ? 'bg-green-500' :
                        item.booking_status === 'active' ? 'bg-blue-500' :
                        item.booking_status === 'confirmed' ? 'bg-purple-500' :
                        item.booking_status === 'cancelled' ? 'bg-red-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${Math.min(100, (item.count / (data.totalBookings || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-drivex-text-muted text-sm py-10 text-center">No bookings recorded yet in the database.</p>
          )}
        </div>

        {/* Top Performing Vehicles */}
        <div className="bg-drivex-card p-6 rounded-2xl border border-drivex-border shadow-sm">
          <h3 className="text-lg font-bold text-drivex-text uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart2 size={20} className="text-purple-400" />
            Top Performing Vehicles
          </h3>
          {data.topVehicles && data.topVehicles.length > 0 ? (
            <div className="space-y-3">
              {data.topVehicles.map((vehicle: any) => (
                <div key={vehicle.id} className="p-3 bg-drivex-sidebar border border-drivex-border rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-drivex-text">{vehicle.brand} {vehicle.model}</p>
                    <p className="text-xs text-drivex-text-muted">LKR {Number(vehicle.daily_price).toLocaleString()}/day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-drivex-accent">{vehicle.bookingCount} reservation{vehicle.bookingCount === 1 ? '' : 's'}</p>
                    <p className="text-xs text-drivex-text-muted">LKR {parseFloat(vehicle.totalRevenue || 0).toLocaleString()} earned</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-drivex-text-muted text-sm py-10 text-center">No vehicle rental history recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
