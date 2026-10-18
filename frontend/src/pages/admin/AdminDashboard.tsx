import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CarFront, 
  CalendarCheck, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Plus,
  RefreshCw
} from 'lucide-react';
import { apiFetch } from '../../services/api';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: {
      totalRevenue: 0,
      activeBookings: 0,
      totalCustomers: 0,
      fleetSize: 0
    },
    recentBookings: [] as any[]
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/dashboard');
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `$${(data.stats.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
      icon: DollarSign, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'Active Bookings', 
      value: (data.stats.activeBookings || 0).toString(), 
      icon: CalendarCheck, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
    { 
      label: 'Total Customers', 
      value: (data.stats.totalCustomers || 0).toString(), 
      icon: Users, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10' 
    },
    { 
      label: 'Fleet Size', 
      value: (data.stats.fleetSize || 0).toString(), 
      icon: CarFront, 
      color: 'text-orange-500', 
      bg: 'bg-orange-500/10' 
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-drivex-text italic uppercase tracking-wider mb-2">Dashboard Overview</h1>
          <p className="text-drivex-text-muted text-sm">Welcome back, Admin. Live data connected to your database.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchDashboardData}
            className="p-2.5 bg-drivex-card border border-drivex-border hover:border-drivex-accent text-drivex-text rounded-sm transition-all shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-drivex-accent' : ''} />
          </button>
          <button 
            onClick={() => navigate('/admin/reports')}
            className="px-6 py-2.5 bg-drivex-accent text-drivex-text-inverse font-bold uppercase tracking-widest text-xs hover:bg-drivex-accent-hover shadow-md shadow-drivex-accent/20 transition-all rounded-sm"
          >
            View Reports
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {statCards.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-drivex-card border border-drivex-border rounded-2xl relative overflow-hidden group hover:border-drivex-accent transition-colors shadow-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-drivex-accent/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                <TrendingUp size={12} />
                Live
              </span>
            </div>
            
            <h3 className="text-drivex-text-muted text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</h3>
            <p className="text-3xl font-black text-drivex-text">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 relative z-10">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-drivex-card border border-drivex-border rounded-2xl p-6 group hover:border-drivex-accent transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-drivex-text uppercase tracking-wider">Recent Bookings</h2>
            <button 
              onClick={() => navigate('/admin/bookings')}
              className="text-drivex-accent text-xs font-bold uppercase tracking-widest hover:text-drivex-text transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-drivex-border">
                  <th className="py-3 px-4 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Ref / ID</th>
                  <th className="py-3 px-4 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-4 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Vehicle</th>
                  <th className="py-3 px-4 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-xs font-bold text-drivex-text-muted uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.recentBookings && data.recentBookings.length > 0 ? (
                  data.recentBookings.map((booking: any) => {
                    const status = booking.booking_status || 'pending';
                    const isCompleted = status === 'completed';
                    const isActive = status === 'active';
                    const isCancelled = status === 'cancelled';

                    return (
                      <tr key={booking.id} className="border-b border-drivex-border hover:bg-drivex-card-hover transition-colors group">
                        <td className="py-4 px-4 text-sm font-medium text-drivex-text">
                          {booking.booking_reference || `BK-${booking.id}`}
                        </td>
                        <td className="py-4 px-4 text-sm text-drivex-text-muted">
                          <p className="text-drivex-text font-bold">{booking.customer_name || 'Customer'}</p>
                          <p className="text-xs text-drivex-text-muted">{booking.customer_email || ''}</p>
                        </td>
                        <td className="py-4 px-4 text-sm text-drivex-text font-medium">
                          {booking.brand} {booking.model}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            isCompleted ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                            isActive ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                            isCancelled ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                            'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }`}>
                            {isCompleted && <CheckCircle2 size={12} />}
                            {isActive && <Clock size={12} />}
                            {isCancelled && <XCircle size={12} />}
                            {!isCompleted && !isActive && !isCancelled && <Clock size={12} />}
                            {status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-drivex-text">
                          ${parseFloat(booking.total_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-drivex-text-muted">
                      No customer bookings yet. When users book vehicles on the website, they will appear here in real time.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Live Summary */}
        <div className="space-y-6">
          <div className="bg-drivex-sidebar border border-drivex-border rounded-2xl p-6 relative overflow-hidden group hover:border-drivex-accent transition-colors shadow-sm">
            <h2 className="text-lg font-bold text-drivex-text uppercase tracking-wider mb-4 relative z-10">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button 
                onClick={() => navigate('/admin/vehicles')}
                className="p-4 bg-drivex-card hover:bg-drivex-accent hover:text-drivex-text-inverse border border-drivex-border rounded-xl flex flex-col items-center justify-center gap-2 transition-all group/btn shadow-sm"
              >
                <CarFront size={20} className="text-drivex-accent group-hover/btn:text-drivex-text-inverse" />
                <span className="text-xs font-bold text-drivex-text group-hover/btn:text-drivex-text-inverse uppercase tracking-wider">Fleet</span>
              </button>
              <button 
                onClick={() => navigate('/admin/bookings')}
                className="p-4 bg-drivex-card hover:bg-drivex-accent hover:text-drivex-text-inverse border border-drivex-border rounded-xl flex flex-col items-center justify-center gap-2 transition-all group/btn shadow-sm"
              >
                <CalendarCheck size={20} className="text-purple-500 group-hover/btn:text-drivex-text-inverse" />
                <span className="text-xs font-bold text-drivex-text group-hover/btn:text-drivex-text-inverse uppercase tracking-wider">Bookings</span>
              </button>
              <button 
                onClick={() => navigate('/admin/customers')}
                className="p-4 bg-drivex-card hover:bg-drivex-accent hover:text-drivex-text-inverse border border-drivex-border rounded-xl flex flex-col items-center justify-center gap-2 transition-all group/btn shadow-sm"
              >
                <Users size={20} className="text-green-500 group-hover/btn:text-drivex-text-inverse" />
                <span className="text-xs font-bold text-drivex-text group-hover/btn:text-drivex-text-inverse uppercase tracking-wider">Customers</span>
              </button>
              <button 
                onClick={() => navigate('/admin/drivers')}
                className="p-4 bg-drivex-card hover:bg-drivex-accent hover:text-drivex-text-inverse border border-drivex-border rounded-xl flex flex-col items-center justify-center gap-2 transition-all group/btn shadow-sm"
              >
                <Plus size={20} className="text-orange-500 group-hover/btn:text-drivex-text-inverse" />
                <span className="text-xs font-bold text-drivex-text group-hover/btn:text-drivex-text-inverse uppercase tracking-wider">Drivers</span>
              </button>
            </div>
          </div>

          <div className="bg-drivex-card border border-drivex-border rounded-2xl p-6 group hover:border-drivex-accent transition-colors shadow-sm">
            <h2 className="text-lg font-bold text-drivex-text uppercase tracking-wider mb-4">Database Connection</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-drivex-text-muted">MySQL Database</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                  <CheckCircle2 size={12} /> Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-drivex-text-muted">Database Name</span>
                <span className="font-mono text-xs text-drivex-text">drivex_rental</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-drivex-text-muted">Sync Mode</span>
                <span className="text-drivex-accent font-bold text-xs uppercase">Live Bi-directional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
