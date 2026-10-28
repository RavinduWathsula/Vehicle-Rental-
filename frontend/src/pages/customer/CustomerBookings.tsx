import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCustomerBookings, type CustomerBooking } from '../../lib/api';

export const CustomerBookings = () => {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getCustomerBookings();
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching customer bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(b => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      b.id.toLowerCase().includes(term) ||
      b.vehicle.name.toLowerCase().includes(term) ||
      b.vehicle.brand.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
        <div className="flex items-center gap-3">
          <button 
            onClick={loadBookings}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-[var(--accent)]' : ''} />
            Refresh
          </button>
          <Link 
            to="/dashboard/vehicles"
            className="px-6 py-2.5 bg-[var(--accent)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-xs hover:bg-[var(--accent-hover)] transition-all rounded-sm flex items-center gap-2 w-fit shadow-md shadow-[var(--accent)]/20"
          >
            <Car size={16} />
            Book New Vehicle
          </Link>
        </div>
      </div>

      <div className="relative z-10 bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
        <div className="p-4 border-b border-[var(--border)] flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--sidebar)]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text"
              placeholder="Search by booking ID or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-2 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm font-bold text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-all w-full md:w-auto shadow-sm"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="confirmed">Confirmed</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          {filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-[var(--sidebar)] rounded-full flex items-center justify-center mb-6 border border-[var(--border)] shadow-sm">
                <Car className="text-[var(--text-muted)]" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] uppercase tracking-wider mb-2">No Bookings Yet</h3>
              <p className="text-[var(--text-muted)] max-w-md mb-8">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No reservations matched your filter criteria.'
                  : "You haven't made any reservations yet. Browse our exclusive fleet and book your next premium vehicle."}
              </p>
              <Link 
                to="/dashboard/vehicles"
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold uppercase tracking-widest text-sm rounded-lg transition-all shadow-md"
              >
                Browse Fleet
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => {
                const isCompleted = booking.status === 'completed';
                const isActive = booking.status === 'active';
                const isConfirmed = (booking.status as string) === 'confirmed' || booking.status === 'upcoming';
                const isCancelled = booking.status === 'cancelled';

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[var(--sidebar)] border border-[var(--border)] rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center hover:bg-[var(--card-hover)] transition-colors group shadow-sm"
                  >
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative border border-[var(--border)]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-60 z-10" />
                      <img 
                        src={booking.vehicle.imageUrl} 
                        alt={booking.vehicle.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute bottom-2 left-2 z-20">
                        <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">{booking.id}</span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-[var(--text)] uppercase tracking-wider">{booking.vehicle.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-[var(--accent)]" />
                            <span>{booking.pickupDate} to {booking.returnDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[var(--accent)]" />
                            <span>{booking.pickupLocation}</span>
                          </div>
                        </div>

                        {booking.driver && (
                          <div className="flex items-center gap-3 bg-[var(--card)] px-3.5 py-2 rounded-xl border border-[var(--border)] w-fit">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--accent)] shrink-0 bg-[var(--sidebar)] flex items-center justify-center shadow-sm">
                              {booking.driver.profileImage ? (
                                <img 
                                  src={booking.driver.profileImage} 
                                  alt={booking.driver.name} 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <span className="text-xs font-bold text-[var(--accent)]">
                                  {booking.driver.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div className="text-xs">
                              <span className="text-[var(--text-muted)] block text-[10px] uppercase tracking-wider font-semibold">Chauffeur</span>
                              <span className="font-bold text-[var(--text)]">{booking.driver.name}</span>
                              {booking.driver.phone && (
                                <span className="text-[var(--text-muted)] ml-2 font-mono">({booking.driver.phone})</span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                            isCompleted ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            isActive ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20' :
                            isConfirmed ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                            isCancelled ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            'bg-orange-500/10 text-orange-400 border-orange-500/20'
                          }`}>
                            {isCompleted && <CheckCircle2 size={12} />}
                            {isActive && <Clock size={12} />}
                            {isConfirmed && <CheckCircle2 size={12} />}
                            {isCancelled && <XCircle size={12} />}
                            {!isCompleted && !isActive && !isConfirmed && !isCancelled && <Clock size={12} />}
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:border-l md:border-[var(--border)] md:pl-6 w-full md:w-auto">
                        <div className="text-left md:text-right">
                          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1">Total Amount</p>
                          <p className="text-2xl font-black text-[var(--text)]">
                            LKR {booking.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
