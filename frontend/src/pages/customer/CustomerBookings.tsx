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

const mockBookings = [];

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
          <h1 className="text-3xl font-black text-[var(--text)] italic uppercase tracking-wider mb-2">My Bookings</h1>
          <p className="text-[var(--text-muted)] text-sm">View and manage all your past, present, and future rentals.</p>
        </div>
        <Link 
          to="/dashboard/vehicles"
          className="px-6 py-2.5 bg-[var(--accent)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-xs hover:bg-[var(--accent-hover)] transition-all rounded-sm flex items-center gap-2 w-fit shadow-md shadow-[var(--accent)]/20"
        >
          <Car size={16} />
          Book New Vehicle
        </Link>
      </div>

      <div className="relative z-10 bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
        <div className="p-4 border-b border-[var(--border)] flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--sidebar)]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text"
              placeholder="Search by booking ID or vehicle..."
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm font-bold text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all w-full md:w-auto shadow-sm">
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          {mockBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-[var(--sidebar)] rounded-full flex items-center justify-center mb-6 border border-[var(--border)] shadow-sm">
                <Car className="text-[var(--text-muted)]" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] uppercase tracking-wider mb-2">No Bookings Yet</h3>
              <p className="text-[var(--text-muted)] max-w-md mb-8">You haven't made any reservations yet. Browse our exclusive fleet and book your next premium vehicle.</p>
              <Link 
                to="/dashboard/vehicles"
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-sm rounded-lg transition-all shadow-md"
              >
                Browse Fleet
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--sidebar)] border border-[var(--border)] rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center hover:bg-[var(--card-hover)] transition-colors group shadow-sm"
                >
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative border border-[var(--border)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-80 z-10" />
                    <img src={booking.image} alt={booking.vehicle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-2 left-2 z-20">
                      <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">{booking.id}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider">{booking.vehicle}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-[var(--accent)]" />
                          <span>{booking.startDate} to {booking.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-[var(--accent)]" />
                          <span>Beverly Hills, CA</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                          booking.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          booking.status === 'Active' ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20' :
                          booking.status === 'Upcoming' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {booking.status === 'Completed' && <CheckCircle2 size={12} />}
                          {booking.status === 'Active' && <Clock size={12} />}
                          {booking.status === 'Upcoming' && <Clock size={12} />}
                          {booking.status === 'Cancelled' && <XCircle size={12} />}
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:border-l md:border-[var(--border)] md:pl-6">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1">Total Amount</p>
                        <p className="text-2xl font-black text-[var(--text)]">{booking.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text)] rounded-lg transition-colors border border-[var(--border)]" title="Download Invoice">
                          <Download size={16} />
                        </button>
                        <button className="px-4 py-2 bg-[var(--card-hover)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-[var(--text)] rounded-lg transition-colors text-sm font-bold uppercase tracking-widest border border-[var(--border)] hover:border-transparent">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
