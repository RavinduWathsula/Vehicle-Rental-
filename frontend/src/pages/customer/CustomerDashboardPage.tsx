import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  User as UserIcon, 
  Mail, 
  Phone, 
  FileText, 
  ChevronRight, 
  Download, 
  XCircle, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  Wallet, 
  Search, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Compass, 
  Headphones, 
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCustomerBookings, type CustomerBooking } from '../../lib/api';
import { apiFetch } from '../../services/api';
import { vehicleService } from '../../services/vehicleService';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { BookingDetailsModal } from '../../components/ui/BookingDetailsModal';

export const CustomerDashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [cancellingBooking, setCancellingBooking] = useState<CustomerBooking | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<CustomerBooking | null>(null);
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);

  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed' | 'cancelled'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Load User Data
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

  // Load Bookings & Featured Fleet
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [bookingsData, vehiclesData] = await Promise.allSettled([
          getCustomerBookings(),
          vehicleService.getVehicles({ limit: 4 })
        ]);

        if (bookingsData.status === 'fulfilled') {
          setBookings(bookingsData.value || []);
        }

        if (vehiclesData.status === 'fulfilled') {
          const vData = vehiclesData.value;
          const list = vData?.data || vData || [];
          setFeaturedVehicles(Array.isArray(list) ? list.slice(0, 3) : []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleConfirmCancel = async () => {
    if (!cancellingBooking) return;
    setCancelLoading(true);
    try {
      const id = cancellingBooking.id.replace(/^BK-/, '');
      await apiFetch(`/bookings/${id}/cancel`, { method: 'PUT' });
      setCancellingBooking(null);
      const data = await getCustomerBookings();
      setBookings(data);
    } catch (err: any) {
      console.error('Failed to cancel booking:', err);
      setCancellingBooking(null);
    } finally {
      setCancelLoading(false);
    }
  };

  // Next active or upcoming journey
  const nextJourney = useMemo(() => {
    return bookings.find(b => b.status === 'active' || b.status === 'upcoming');
  }, [bookings]);

  // Tab counts
  const counts = useMemo(() => {
    return {
      upcoming: bookings.filter(b => b.status === 'upcoming').length,
      active: bookings.filter(b => b.status === 'active').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
  }, [bookings]);

  // Filtered Bookings by Tab and Search
  const filteredBookings = useMemo(() => {
    return bookings
      .filter(b => b.status === activeTab)
      .filter(b => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          b.id.toLowerCase().includes(q) ||
          b.vehicle.name.toLowerCase().includes(q) ||
          b.vehicle.brand.toLowerCase().includes(q) ||
          b.pickupLocation.toLowerCase().includes(q)
        );
      });
  }, [bookings, activeTab, searchQuery]);

  // Total Lifetime Spend calculation
  const totalLifetimeSpend = useMemo(() => {
    return bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((acc, curr) => acc + (curr.total || 0), 0);
  }, [bookings]);

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  }, []);

  // Countdown helper
  const getDepartureInfo = (dateStr: string) => {
    try {
      const target = new Date(dateStr).getTime();
      const now = new Date().setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) return 'Departs Today';
      if (diffDays === 1) return 'Departs Tomorrow';
      return `Departs in ${diffDays} days`;
    } catch {
      return 'Scheduled';
    }
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ] as const;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 border-4 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Car size={18} className="text-[var(--accent)] animate-pulse" />
          </div>
        </div>
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
          Synchronizing Garage...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16">
      
      {/* Dynamic Creative Header */}
      <header className="relative bg-gradient-to-r from-[var(--sidebar)] via-[var(--card)] to-[var(--sidebar)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-lg">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                Pilot Command Center
              </span>
              <span className="text-xs font-semibold text-[var(--text-muted)] hidden sm:inline">
                • Verified Fleet Access
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight">
              {greeting}, <span className="text-[var(--accent)]">{user?.firstName?.toUpperCase() || 'DRIVER'}</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              Welcome to your DriveX digital garage. Monitor active journeys, reserve high-performance supercars, and manage your luxury reservations in real time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0"
          >
            <Link 
              to="/dashboard/favorites"
              className="px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-[var(--card)] hover:bg-[var(--card-hover)] text-[var(--text)] border border-[var(--border)] transition-all flex items-center gap-2 shadow-sm"
            >
              <Heart size={16} className="text-rose-500" /> My Garage
            </Link>

            <Link 
              to="/dashboard/vehicles" 
              className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] transition-all flex items-center gap-2 shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <Car size={16} /> Book Supercar
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Quick Stats Grid with Real Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { 
            label: 'Active Journeys', 
            value: counts.active, 
            icon: Car, 
            badge: counts.active > 0 ? 'On Road' : 'Standby',
            accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
          },
          { 
            label: 'Upcoming Trips', 
            value: counts.upcoming, 
            icon: Calendar, 
            badge: counts.upcoming > 0 ? 'Scheduled' : 'None',
            accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' 
          },
          { 
            label: 'Completed Expeditions', 
            value: counts.completed, 
            icon: CheckCircle2, 
            badge: 'Past Trips',
            accent: 'text-blue-400 bg-blue-500/10 border-blue-500/20' 
          },
          { 
            label: 'Total Rental Value', 
            value: `LKR ${totalLifetimeSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 
            icon: Wallet, 
            badge: 'Lifetime Value',
            accent: 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20' 
          },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="group relative bg-[var(--card)] hover:bg-[var(--card-hover)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl border ${stat.accent} transition-transform group-hover:scale-110 duration-300`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--sidebar)] border border-[var(--border)] text-[var(--text-muted)]">
                {stat.badge}
              </span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight truncate">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Left Area: Cockpit / Next Journey & Bookings List (2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Active / Next Journey Telemetry Showcase */}
          {nextJourney ? (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-[var(--text)] tracking-wide flex items-center gap-2">
                  <Compass className="text-[var(--accent)]" size={20} />
                  NEXT ADVENTURE COCKPIT
                </h2>
                <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                  {nextJourney.status === 'active' ? 'Active Drive Now' : getDepartureInfo(nextJourney.pickupDate)}
                </span>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 rounded-3xl overflow-hidden backdrop-blur-md group shadow-xl transition-all"
              >
                {/* Glowing top line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                
                <div className="flex flex-col md:flex-row">
                  {/* Vehicle Visual */}
                  <div className="w-full md:w-5/12 h-56 md:h-auto relative overflow-hidden bg-black/40">
                    <img 
                      src={nextJourney.vehicle.imageUrl} 
                      alt={nextJourney.vehicle.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[var(--card)]" />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border backdrop-blur-md shadow-md ${
                        nextJourney.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse'
                          : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                      }`}>
                        {nextJourney.status === 'active' ? '● In Progress' : 'Upcoming Journey'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 text-white border border-white/20 w-fit">
                        {nextJourney.id}
                      </span>
                    </div>
                  </div>
                  
                  {/* Telemetry Information */}
                  <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-6">
                    <div>
                      <p className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">
                        {nextJourney.vehicle.brand}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-black text-[var(--text)] mb-4">
                        {nextJourney.vehicle.name}
                      </h3>
                      
                      {/* Timeline Route Visualizer */}
                      <div className="bg-[var(--sidebar)] p-4 rounded-2xl border border-[var(--border)] grid grid-cols-2 gap-4 relative">
                        <div className="space-y-1">
                          <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                            <MapPin size={12} className="text-[var(--accent)]" /> Pickup
                          </p>
                          <p className="text-sm font-bold text-[var(--text)]">
                            {new Date(nextJourney.pickupDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                            <Clock size={11} /> {nextJourney.pickupTime} • {nextJourney.pickupLocation}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                            <MapPin size={12} className="text-[var(--accent)]" /> Return
                          </p>
                          <p className="text-sm font-bold text-[var(--text)]">
                            {new Date(nextJourney.returnDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                            <Clock size={11} /> {nextJourney.returnTime} • {nextJourney.returnLocation}
                          </p>
                        </div>
                      </div>

                      {/* Chauffeur chip if assigned */}
                      {nextJourney.driver && (
                        <div className="mt-3 flex items-center justify-between p-2.5 bg-[var(--sidebar)]/60 rounded-xl border border-[var(--border)] text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-[10px]">
                              {nextJourney.driver.name.charAt(0)}
                            </div>
                            <span className="text-[var(--text)] font-medium">Chauffeur: <strong>{nextJourney.driver.name}</strong></span>
                          </div>
                          {nextJourney.driver.phone && (
                            <a href={`tel:${nextJourney.driver.phone}`} className="text-[var(--accent)] hover:underline font-mono text-[11px]">
                              {nextJourney.driver.phone}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Bottom Bar: Total & Interactive Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                      <div>
                        <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-wider">
                          Reservation Total
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-[var(--text)]">
                          LKR {nextJourney.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {nextJourney.status === 'upcoming' && (
                          <button
                            onClick={() => setCancellingBooking(nextJourney)}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 border border-red-500/20 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedBookingForDetails(nextJourney)}
                          className="flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md cursor-pointer"
                        >
                          Telemetry & Details <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          ) : (
            /* Creative Call-to-Action Hero when there are no active/upcoming bookings */
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gradient-to-br from-[var(--card)] via-[var(--sidebar)] to-[var(--card)] border border-[var(--border)] rounded-3xl p-8 overflow-hidden shadow-lg"
            >
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                  <Sparkles size={13} /> Fleet Ready For Ignition
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                  YOUR NEXT DRIVE AWAITS
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  No active road trips currently on schedule. Ignite your senses with our curated fleet of luxury performance sedans, convertible supercars, and premium SUVs.
                </p>

                {/* Quick Category shortcuts */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { label: 'Exotic & Sports', cat: 'sports' },
                    { label: 'Ultra Luxury', cat: 'luxury' },
                    { label: 'Executive SUVs', cat: 'suv' },
                    { label: 'Compact / Sedan', cat: 'sedan' }
                  ].map((c) => (
                    <Link
                      key={c.cat}
                      to={`/dashboard/vehicles?category=${c.cat}`}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--sidebar)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-[var(--text)] border border-[var(--border)] transition-all cursor-pointer shadow-sm"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    to="/dashboard/vehicles"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20"
                  >
                    Explore Fleet <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          {/* MY BOOKINGS CONSOLE */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-[var(--text)] tracking-wide">
                  MY RESERVATION ARCHIVE
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Track and review all your past and upcoming rental bookings.
                </p>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search vehicle or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                />
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 p-1.5 bg-[var(--sidebar)] rounded-2xl border border-[var(--border)] overflow-x-auto no-scrollbar shadow-inner">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === tab.id ? 'text-[var(--text-inverse)] shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeBookingTab"
                      className="absolute inset-0 bg-[var(--accent)] rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeTab === tab.id ? 'bg-black/30 text-white' : 'bg-[var(--card)] text-[var(--text-muted)]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Booking List Cards */}
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
                      className="bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 rounded-2xl p-5 hover:bg-[var(--card-hover)] transition-all group shadow-sm"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        
                        {/* Car thumbnail & ID */}
                        <div className="flex items-center gap-4 w-full md:w-4/12">
                          <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 bg-[var(--sidebar)] border border-[var(--border)] shadow-inner">
                            <img 
                              src={booking.vehicle.imageUrl} 
                              alt={booking.vehicle.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sidebar)] text-[var(--accent)] border border-[var(--border)] font-bold">
                                {booking.id}
                              </span>
                            </div>
                            <h4 className="font-bold text-[var(--text)] text-sm truncate">
                              {booking.vehicle.brand} {booking.vehicle.name}
                            </h4>
                            {booking.driver && (
                              <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                                <UserIcon size={11} className="text-[var(--accent)]" /> Chauffeur: {booking.driver.name}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Dates & Timeline */}
                        <div className="flex items-center gap-4 w-full md:w-5/12 bg-[var(--sidebar)]/50 p-2.5 rounded-xl border border-[var(--border)]/50">
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider">Pickup</p>
                            <p className="text-xs font-semibold text-[var(--text)] truncate">
                              {new Date(booking.pickupDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {booking.pickupTime}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] truncate">{booking.pickupLocation}</p>
                          </div>
                          
                          <ChevronRight size={14} className="text-[var(--border)] shrink-0" />

                          <div className="space-y-0.5 flex-1 min-w-0">
                            <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider">Return</p>
                            <p className="text-xs font-semibold text-[var(--text)] truncate">
                              {new Date(booking.returnDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {booking.returnTime}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] truncate">{booking.returnLocation}</p>
                          </div>
                        </div>

                        {/* Price & Interactive Actions */}
                        <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-3/12">
                          <div className="text-left md:text-right">
                            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Total</p>
                            <p className="font-bold text-sm text-[var(--accent)]">
                              LKR {booking.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            {booking.status === 'upcoming' && (
                              <button 
                                onClick={() => setCancellingBooking(booking)}
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors cursor-pointer" 
                                title="Cancel Booking"
                              >
                                <XCircle size={16} />
                              </button>
                            )}
                            <button 
                              onClick={() => setSelectedBookingForDetails(booking)}
                              className="p-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)] text-[var(--accent)] hover:text-[var(--text-inverse)] rounded-xl transition-colors cursor-pointer shadow-sm" 
                              title="View Full Booking Details"
                            >
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
                    className="text-center py-16 bg-[var(--card)] border border-[var(--border)] rounded-2xl space-y-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--sidebar)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--text-muted)]">
                      <Car size={26} />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text)]">No {activeTab} bookings found</h3>
                    <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                      {searchQuery 
                        ? `No reservations matching "${searchQuery}" in ${activeTab}.`
                        : `You do not have any ${activeTab} reservations at this time.`}
                    </p>
                    <div className="pt-2">
                      <Link 
                        to="/dashboard/vehicles"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] text-[var(--text-inverse)] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover)] transition-colors shadow-sm"
                      >
                        Reserve A Supercar
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

        </div>

        {/* Right Sidebar: Creative Executive Cockpit Widgets */}
        <div className="space-y-8">
          
          {/* Executive Driver Passport / ID Card */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-[var(--text)] tracking-wide flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--accent)]" />
                DRIVER PASSPORT
              </h2>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Active Member
              </span>
            </div>

            <div className="relative bg-gradient-to-b from-[var(--sidebar)] to-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 rounded-3xl p-6 shadow-md overflow-hidden transition-all">
              {/* Top ambient highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Avatar & Driver Identity */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-cyan-700 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                    {user?.firstName?.[0] || 'D'}{user?.lastName?.[0] || 'X'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[var(--sidebar)] flex items-center justify-center text-white">
                    <CheckCircle2 size={12} />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-[var(--text)] truncate">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-xs text-[var(--accent)] font-semibold flex items-center gap-1">
                    Verified High-Performance Driver
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                    ID: DX-{user?.id || '9842'}
                  </p>
                </div>
              </div>

              {/* Credential Attributes */}
              <div className="space-y-3 pt-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--sidebar)] border border-[var(--border)]">
                  <Mail size={15} className="text-[var(--accent)] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Email Address</p>
                    <p className="text-xs font-semibold text-[var(--text)] truncate">{user?.email || 'driver@drivex.com'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--sidebar)] border border-[var(--border)]">
                  <Phone size={15} className="text-[var(--accent)] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Contact Phone</p>
                    <p className="text-xs font-semibold text-[var(--text)] truncate">{user?.phone || '+94 77 123 4567'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--sidebar)] border border-[var(--border)]">
                  <FileText size={15} className="text-[var(--accent)] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Driver License</p>
                    <p className="text-xs font-mono font-bold text-[var(--text)] truncate">{user?.licenseNumber || 'B-983419-WP'}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Verified</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/dashboard/profile')}
                className="w-full mt-6 bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Manage Driver Profile
              </button>
            </div>
          </section>

          {/* Featured Luxury Fleet Showcase (Real vehicles from fleet) */}
          {featuredVehicles.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-[var(--text)] tracking-wide flex items-center gap-2">
                  <Sparkles size={18} className="text-[var(--accent)]" />
                  FEATURED SUPERCAR FLEET
                </h2>
                <Link to="/dashboard/vehicles" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-0.5">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {featuredVehicles.map((vehicle: any) => {
                  const img = vehicle.primary_image || vehicle.image_url || vehicle.imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop';
                  const price = parseFloat(vehicle.daily_price || vehicle.pricePerDay || 0);

                  return (
                    <motion.div
                      key={vehicle.id}
                      whileHover={{ scale: 1.02 }}
                      className="group bg-[var(--card)] hover:bg-[var(--card-hover)] border border-[var(--border)] hover:border-[var(--accent)]/50 rounded-2xl p-3 flex items-center gap-3.5 transition-all shadow-sm"
                    >
                      <div className="w-20 h-16 rounded-xl overflow-hidden bg-[var(--sidebar)] shrink-0 border border-[var(--border)]">
                        <img 
                          src={img} 
                          alt={vehicle.model || vehicle.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[var(--accent)]">
                          {vehicle.category_name || vehicle.category || 'Luxury'}
                        </span>
                        <h4 className="text-xs font-bold text-[var(--text)] truncate">
                          {vehicle.brand} {vehicle.model || vehicle.name}
                        </h4>
                        <p className="text-xs font-bold text-[var(--text)] mt-0.5">
                          LKR {price.toLocaleString()} <span className="text-[10px] text-[var(--text-muted)] font-normal">/ day</span>
                        </p>
                      </div>

                      <Link
                        to={`/dashboard/vehicles/${vehicle.id}`}
                        className="p-2 rounded-xl bg-[var(--sidebar)] group-hover:bg-[var(--accent)] text-[var(--text-muted)] group-hover:text-[var(--text-inverse)] border border-[var(--border)] transition-colors shrink-0"
                        title="View Vehicle"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 24/7 VIP Concierge & Assistance Widget */}
          <section>
            <div className="relative bg-gradient-to-br from-cyan-950/30 via-[var(--card)] to-[var(--sidebar)] border border-cyan-500/30 rounded-3xl p-6 shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center">
                  <Headphones size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[var(--text)] uppercase tracking-wider">
                    VIP Concierge 24/7
                  </h3>
                  <p className="text-[11px] text-[var(--accent)] font-semibold">
                    Always On Roadside Coverage
                  </p>
                </div>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-5">
                Immediate chauffeur assistance, route changes, or nationwide roadside dispatch are ready whenever you drive.
              </p>

              <div className="space-y-2.5">
                <a
                  href="tel:+94112345678"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <PhoneCall size={14} /> Emergency Helpline (+94 11 234 5678)
                </a>

                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-concierge-chat'))}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--sidebar)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm group"
                >
                  <Sparkles size={14} className="text-[var(--accent)] group-hover:text-[var(--text-inverse)] transition-colors" /> Chat with Concierge
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Interactive Booking Details Modal */}
      <BookingDetailsModal
        isOpen={!!selectedBookingForDetails}
        onClose={() => setSelectedBookingForDetails(null)}
        booking={selectedBookingForDetails}
        onCancelRequest={(b) => setCancellingBooking(b)}
      />

      {/* Cancel Reservation Modal */}
      <ConfirmModal
        isOpen={!!cancellingBooking}
        onClose={() => !cancelLoading && setCancellingBooking(null)}
        onConfirm={handleConfirmCancel}
        isLoading={cancelLoading}
        title="Cancel Reservation"
        message="Are you sure you want to cancel this booking? If a chauffeur was reserved, they will be released back to the fleet."
        confirmText="Cancel Reservation"
        item={cancellingBooking ? {
          title: cancellingBooking.vehicle.name,
          subtitle: `${cancellingBooking.pickupDate} to ${cancellingBooking.returnDate} • Total: LKR ${cancellingBooking.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          badge: cancellingBooking.id,
          imageUrl: cancellingBooking.vehicle.imageUrl
        } : null}
      />
    </div>
  );
};
