import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CarFront, 
  CalendarCheck, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$124,500', trend: '+14.5%', icon: DollarSign, color: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/10' },
  { label: 'Active Bookings', value: '142', trend: '+5.2%', icon: CalendarCheck, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Total Customers', value: '8,459', trend: '+12.1%', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Fleet Size', value: '245', trend: '0%', icon: CarFront, color: 'text-orange-400', bg: 'bg-orange-400/10' },
];

const recentBookings = [
  { id: 'BK-7829', customer: 'Alex Johnson', vehicle: 'Porsche 911 GT3 RS', date: 'Oct 15 - Oct 18', status: 'Active', amount: '$4,200' },
  { id: 'BK-7830', customer: 'Sarah Williams', vehicle: 'Mercedes G63 AMG', date: 'Oct 16 - Oct 20', status: 'Pending', amount: '$3,800' },
  { id: 'BK-7831', customer: 'Michael Chen', vehicle: 'Lamborghini Urus', date: 'Oct 14 - Oct 15', status: 'Completed', amount: '$1,500' },
  { id: 'BK-7832', customer: 'Emma Davis', vehicle: 'Range Rover Sport', date: 'Oct 18 - Oct 25', status: 'Active', amount: '$2,100' },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-sm">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            
            <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</h3>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:border-[#00E5FF]/30 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Recent Bookings</h2>
            <button className="text-[#00E5FF] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4 text-sm font-medium text-white">{booking.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-300">{booking.customer}</td>
                    <td className="py-4 px-4 text-sm text-gray-300">{booking.vehicle}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        booking.status === 'Active' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {booking.status === 'Completed' && <CheckCircle2 size={12} />}
                        {booking.status === 'Active' && <Clock size={12} />}
                        {booking.status === 'Pending' && <Clock size={12} />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-white">{booking.amount}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#00E5FF]/20 to-purple-500/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md group hover:border-[#00E5FF]/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 relative z-10">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button className="p-4 bg-black/60 hover:bg-[#00E5FF] hover:text-black border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group/btn">
                <CarFront size={20} className="text-[#00E5FF] group-hover/btn:text-black" />
                <span className="text-xs font-bold text-white group-hover/btn:text-black uppercase tracking-wider">Add Vehicle</span>
              </button>
              <button className="p-4 bg-black/60 hover:bg-purple-500 hover:text-white border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group/btn">
                <CalendarCheck size={20} className="text-purple-400 group-hover/btn:text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">New Booking</span>
              </button>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:border-purple-500/30 transition-colors">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4">System Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <span>Server Load</span>
                  <span className="text-[#00E5FF]">24%</span>
                </div>
                <div className="h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '24%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00B8CC] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)]" 
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <span>Database Capacity</span>
                  <span className="text-green-400">42%</span>
                </div>
                <div className="h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]" 
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <span>Storage</span>
                  <span className="text-orange-400">78%</span>
                </div>
                <div className="h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
