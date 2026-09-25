import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  ChevronRight,
  Download,
  XCircle,
  CheckCircle2,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockBookings = [
  { id: 'BK-7829', vehicle: 'Porsche 911 GT3 RS', startDate: '2023-10-15', endDate: '2023-10-18', status: 'Active', amount: '$4,200', image: 'https://images.unsplash.com/photo-1503376713217-1f19f2a01337?q=80&w=3200&auto=format&fit=crop' },
  { id: 'BK-7612', vehicle: 'Mercedes G63 AMG', startDate: '2023-09-02', endDate: '2023-09-05', status: 'Completed', amount: '$1,950', image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=3200&auto=format&fit=crop' },
  { id: 'BK-7504', vehicle: 'Range Rover Sport', startDate: '2023-08-10', endDate: '2023-08-14', status: 'Completed', amount: '$1,800', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=3200&auto=format&fit=crop' },
  { id: 'BK-7840', vehicle: 'Lamborghini Urus', startDate: '2023-11-20', endDate: '2023-11-22', status: 'Upcoming', amount: '$1,500', image: 'https://images.unsplash.com/photo-1662994435923-380d92383823?q=80&w=3200&auto=format&fit=crop' }
];

export const CustomerBookings = () => {
  return (
    <div className="space-y-6 pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: ['-20%', '20%', '-20%'], y: ['20%', '-20%', '20%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[radial-gradient(ellipse_at_center,_var(--color-drivex-accent)_0%,_transparent_50%)] opacity-[0.03] blur-[100px] rounded-full"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-wider mb-2">My Bookings</h1>
          <p className="text-gray-400 text-sm">View and manage all your past, present, and future rentals.</p>
        </div>
        <Link 
          to="/dashboard/vehicles"
          className="px-6 py-2.5 bg-[#00E5FF] text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all rounded-sm flex items-center gap-2 w-fit"
        >
          <Car size={16} />
          Book New Vehicle
        </Link>
      </div>

      <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/40">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search by booking ID or vehicle..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#00E5FF] transition-all w-full md:w-auto">
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {mockBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center hover:bg-white/5 transition-colors group"
              >
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img src={booking.image} alt={booking.vehicle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 z-20">
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{booking.id}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">{booking.vehicle}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#00E5FF]" />
                        <span>{booking.startDate} to {booking.endDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#00E5FF]" />
                        <span>Beverly Hills, CA</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        booking.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        booking.status === 'Active' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' :
                        booking.status === 'Upcoming' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {booking.status === 'Completed' && <CheckCircle2 size={12} />}
                        {booking.status === 'Active' && <Clock size={12} />}
                        {booking.status === 'Upcoming' && <Clock size={12} />}
                        {booking.status === 'Cancelled' && <XCircle size={12} />}
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:border-l md:border-white/10 md:pl-6">
                    <div className="text-left md:text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-2xl font-black text-white">{booking.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10" title="Download Invoice">
                        <Download size={16} />
                      </button>
                      <button className="px-4 py-2 bg-white/10 hover:bg-[#00E5FF] hover:text-black text-white rounded-lg transition-colors text-sm font-bold uppercase tracking-widest border border-white/10 hover:border-transparent">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
