import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  CreditCard, 
  User as UserIcon, 
  Mail, 
  Phone, 
  FileText, 
  ChevronRight,
  Download,
  XCircle,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCustomerBookings, type CustomerBooking } from '../../lib/api';

export const CustomerDashboardPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('drivex_user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u.name) {
          const parts = u.name.split(' ');
          u.firstName = parts[0];
          u.lastName = parts.slice(1).join(' ');
        }
        setUser(u);
      } catch (e) {}
    }
  }, []);
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed' | 'cancelled'>('upcoming');

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const data = await getCustomerBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings', error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const nextJourney = useMemo(() => {
    return bookings.find(b => b.status === 'upcoming' || b.status === 'active');
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => b.status === activeTab);
  }, [bookings, activeTab]);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ] as const;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <p className="text-[#00E5FF] text-sm font-bold tracking-[0.2em] uppercase">Digital Garage</p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            GOOD MORNING, <span className="text-white/80">{user?.firstName?.toUpperCase() || 'DRIVER'}</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Link to="/dashboard/vehicles" className="bg-[#00E5FF] text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2">
            <Car size={16} /> Book Vehicle
          </Link>
        </motion.div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Rentals', value: bookings.filter(b => b.status === 'active').length, icon: Car },
          { label: 'Upcoming', value: bookings.filter(b => b.status === 'upcoming').length, icon: Calendar },
          { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: CheckCircle2 },
          { label: 'DriveX Points', value: '2,450', icon: CreditCard },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (i * 0.05) }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-[#00E5FF]">
                <stat.icon size={20} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area: Next Journey & Bookings */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* YOUR NEXT JOURNEY */}
          {nextJourney && (
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Car className="text-[#00E5FF]" /> 
                YOUR NEXT JOURNEY
              </h2>
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md group"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src={nextJourney.vehicle.imageUrl} 
                      alt={nextJourney.vehicle.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#08090B]/80 backdrop-blur-md text-[#00E5FF] px-3 py-1 rounded-full text-xs font-bold border border-[#00E5FF]/30 uppercase">
                        {nextJourney.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-3/5 flex flex-col justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium">{nextJourney.vehicle.brand}</p>
                      <h3 className="text-2xl font-bold text-white mb-6">{nextJourney.vehicle.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-1">
                          <p className="text-white/50 text-xs uppercase tracking-wider">Pickup</p>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Calendar size={14} className="text-[#00E5FF]" />
                            {new Date(nextJourney.pickupDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Clock size={14} className="text-[#00E5FF]" />
                            {nextJourney.pickupTime}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-white/50 text-xs uppercase tracking-wider">Return</p>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Calendar size={14} className="text-[#00E5FF]" />
                            {new Date(nextJourney.returnDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Clock size={14} className="text-[#00E5FF]" />
                            {nextJourney.returnTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Total</p>
                        <p className="text-xl font-bold text-white">${nextJourney.total.toFixed(2)}</p>
                      </div>
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-[#00E5FF] hover:text-black text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                        View Details <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* MY BOOKINGS */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6">MY BOOKINGS</h2>
            
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-6 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id ? 'text-black' : 'text-white hover:text-white/80'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#00E5FF] rounded-lg"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Booking List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        {/* Car & ID */}
                        <div className="flex items-center gap-4 w-full md:w-1/3">
                          <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-white/10">
                            <img src={booking.vehicle.imageUrl} alt={booking.vehicle.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-1 font-mono">{booking.id}</p>
                            <h4 className="font-bold text-white">{booking.vehicle.brand} {booking.vehicle.name}</h4>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-6 w-full md:w-1/3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-1.5 text-xs text-white/60">
                              <Calendar size={12} /> {new Date(booking.pickupDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-white/60">
                              <MapPin size={12} /> <span className="truncate max-w-[120px]">{booking.pickupLocation}</span>
                            </div>
                          </div>
                          <div className="text-white/20"><ChevronRight size={16} /></div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-1.5 text-xs text-white/60">
                              <Calendar size={12} /> {new Date(booking.returnDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-white/60">
                              <MapPin size={12} /> <span className="truncate max-w-[120px]">{booking.returnLocation}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-1/3">
                          <div className="text-left md:text-right">
                            <p className="text-xs text-white/50">Total</p>
                            <p className="font-bold text-[#00E5FF]">${booking.total.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {booking.status === 'completed' && (
                              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors" title="Download Receipt">
                                <Download size={16} />
                              </button>
                            )}
                            {(booking.status === 'upcoming') && (
                              <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors" title="Cancel Booking">
                                <XCircle size={16} />
                              </button>
                            )}
                            <button className="p-2 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 rounded-lg text-[#00E5FF] transition-colors" title="View Booking">
                              <Eye size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <Car className="mx-auto h-12 w-12 text-white/20 mb-3" />
                    <h3 className="text-lg font-medium text-white mb-1">No {activeTab} bookings</h3>
                    <p className="text-white/50 text-sm">You don't have any {activeTab} bookings at the moment.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

        </div>

        {/* Sidebar: Profile Section */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-6">DRIVER PROFILE</h2>
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00E5FF] to-cyan-600 flex items-center justify-center text-black text-2xl font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-[#00E5FF] text-sm flex items-center gap-1">
                    <CheckCircle2 size={14} /> Verified Member
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Email Address</p>
                    <p className="text-sm text-white font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Phone Number</p>
                    <p className="text-sm text-white font-medium">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Driving License</p>
                    <p className="text-sm text-white font-medium font-mono">{user?.licenseNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl text-sm font-bold transition-colors">
                Edit Profile
              </button>
            </div>
          </section>

          {/* Quick Stats or info could go here in the future */}
          <div className="bg-gradient-to-br from-[#00E5FF]/20 to-transparent border border-[#00E5FF]/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
              <CreditCard size={100} className="text-[#00E5FF]" />
            </div>
            <h3 className="text-[#00E5FF] font-black tracking-widest uppercase mb-1 flex items-center gap-2">
              DriveX Black
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Elite Member Status
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-white">2,450 pts</span>
                <span className="text-white/50">5,000 pts</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00E5FF] to-cyan-300 w-1/2 rounded-full" />
              </div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest text-right">To Next Tier</p>
            </div>

            <button className="w-full text-white text-sm font-bold bg-white/10 hover:bg-[#00E5FF] hover:text-black py-3 rounded-xl transition-colors">
              View Rewards
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-[#00E5FF]" />
              Payment Method
            </h3>
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 mb-4">
              <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs italic">VISA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-white/50">Expires 12/28</p>
              </div>
            </div>
            <button className="text-white text-xs font-bold uppercase tracking-widest hover:text-[#00E5FF] transition-colors underline decoration-white/30 hover:decoration-[#00E5FF]/50 underline-offset-4">
              Manage Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
