import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, AlertCircle, Lock, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { isBefore, startOfDay, parseISO } from 'date-fns';

export const BookingWidget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });
  
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('drivex_token');
      const user = localStorage.getItem('drivex_user');
      setIsAuthenticated(Boolean(token || user));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!isAuthenticated) {
      setError('Registration is required before entering reservation details. Please register or sign in.');
      return;
    }
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleDisabledClick = () => {
    if (!isAuthenticated) {
      setError('Please create an account or sign in to enter booking details.');
    }
  };

  const validate = () => {
    if (!formData.pickupLocation || !formData.returnLocation || !formData.pickupDate || !formData.returnDate) {
      return 'Please fill in all location and date fields.';
    }

    const today = startOfDay(new Date());
    const pickupDate = parseISO(formData.pickupDate);
    const returnDate = parseISO(formData.returnDate);

    if (isBefore(pickupDate, today)) {
      return 'Pickup date cannot be in the past.';
    }

    if (isBefore(returnDate, pickupDate) || formData.pickupDate === formData.returnDate) {
      return 'Return date must be after the pickup date.';
    }

    if (!formData.pickupTime || !formData.returnTime) {
      return 'Please select valid pickup and return times.';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Registration is required before booking. Please create an account or sign in.');
      navigate('/register', { 
        state: { message: 'Please create an account or sign in to complete your booking.' } 
      });
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Navigate to vehicles page with search query parameters
    const params = new URLSearchParams(formData);
    navigate(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-30 px-4 md:px-10">
      <form 
        onSubmit={handleSubmit}
        className="glassmorphism rounded-xl p-6 md:p-8 flex flex-col gap-6 cinematic-shadow border-white/10 relative overflow-hidden bg-[#08090B]/90 backdrop-blur-2xl"
      >
        {/* Auth Guard Banner */}
        {!isAuthenticated ? (
          <div className="bg-gradient-to-r from-cyan-950/40 via-amber-950/20 to-black/60 border border-[#00E5FF]/30 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center shrink-0 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Lock size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Registration Required to Reserve</span>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-sm">
                    Guests Locked
                  </span>
                </h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  To ensure verified fleet dispatch, you must register or sign in before typing booking itineraries or reserving vehicles.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/register"
                className="px-5 py-2.5 bg-[#00E5FF] hover:bg-white text-black font-black uppercase text-xs tracking-wider rounded-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] text-center flex-1 md:flex-initial"
              >
                Register to Book
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-wider rounded-sm transition-colors border border-white/20 text-center flex-1 md:flex-initial"
              >
                Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-[#00E5FF] border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="font-bold uppercase tracking-wider">Instant Reservation Engine Active</span>
            </div>
            <span className="text-gray-400 hidden sm:inline">Enter trip details to browse matching luxury fleet</span>
          </div>
        )}

        {/* Form Inputs Grid */}
        <div 
          onClick={handleDisabledClick}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${
            !isAuthenticated ? 'cursor-not-allowed select-none' : ''
          }`}
        >
          {/* Pickup Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium flex items-center justify-between">
              <span>Pickup Location</span>
              {!isAuthenticated && <Lock size={12} className="text-amber-400" />}
            </label>
            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 ${!isAuthenticated ? 'text-white/20' : 'text-white/40'}`} size={18} />
              <input 
                type="text" 
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                disabled={!isAuthenticated}
                readOnly={!isAuthenticated}
                placeholder={!isAuthenticated ? 'Register to enter pickup location' : 'City, Airport, or Station'} 
                className={`w-full rounded-sm py-3 pl-10 pr-4 text-white text-sm transition-colors ${
                  !isAuthenticated 
                    ? 'bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed placeholder-gray-500' 
                    : 'bg-white/5 border border-white/10 focus:outline-none focus:border-[#00E5FF]'
                }`}
              />
            </div>
          </div>

          {/* Return Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium flex items-center justify-between">
              <span>Return Location</span>
              {!isAuthenticated && <Lock size={12} className="text-amber-400" />}
            </label>
            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 ${!isAuthenticated ? 'text-white/20' : 'text-white/40'}`} size={18} />
              <input 
                type="text" 
                name="returnLocation"
                value={formData.returnLocation}
                onChange={handleChange}
                disabled={!isAuthenticated}
                readOnly={!isAuthenticated}
                placeholder={!isAuthenticated ? 'Register to enter return location' : 'City, Airport, or Station'} 
                className={`w-full rounded-sm py-3 pl-10 pr-4 text-white text-sm transition-colors ${
                  !isAuthenticated 
                    ? 'bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed placeholder-gray-500' 
                    : 'bg-white/5 border border-white/10 focus:outline-none focus:border-[#00E5FF]'
                }`}
              />
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium flex items-center justify-between">
              <span>Pickup Date & Time</span>
              {!isAuthenticated && <Lock size={12} className="text-amber-400" />}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${!isAuthenticated ? 'text-white/20' : 'text-white/40'}`} size={18} />
                <input 
                  type="date" 
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  readOnly={!isAuthenticated}
                  className={`w-full rounded-sm py-3 pl-10 pr-2 text-white text-sm transition-colors [color-scheme:dark] ${
                    !isAuthenticated 
                      ? 'bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed' 
                      : 'bg-white/5 border border-white/10 focus:outline-none focus:border-[#00E5FF]'
                  }`}
                />
              </div>
              <div className="relative w-24">
                <input 
                  type="time" 
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  readOnly={!isAuthenticated}
                  className={`w-full rounded-sm py-3 px-2 text-white text-sm transition-colors [color-scheme:dark] ${
                    !isAuthenticated 
                      ? 'bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed' 
                      : 'bg-white/5 border border-white/10 focus:outline-none focus:border-[#00E5FF]'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/60 uppercase tracking-widest font-medium flex items-center justify-between">
              <span>Return Date & Time</span>
              {!isAuthenticated && <Lock size={12} className="text-amber-400" />}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${!isAuthenticated ? 'text-white/20' : 'text-white/40'}`} size={18} />
                <input 
                  type="date" 
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  readOnly={!isAuthenticated}
                  className={`w-full rounded-sm py-3 pl-10 pr-2 text-white text-sm transition-colors [color-scheme:dark] ${
                    !isAuthenticated 
                      ? 'bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed' 
                      : 'bg-white/5 border border-white/10 focus:outline-none focus:border-[#00E5FF]'
                  }`}
                />
              </div>
              <div className="relative w-24">
                <input 
                  type="time" 
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  readOnly={!isAuthenticated}
                  className={`w-full rounded-sm py-3 px-2 text-white text-sm transition-colors [color-scheme:dark] ${
                    !isAuthenticated 
                      ? 'bg-white/[0.02] border border-white/5 opacity-50 cursor-not-allowed' 
                      : 'bg-white/5 border border-white/10 focus:outline-none focus:border-[#00E5FF]'
                  }`}
                />
              </div>
            </div>
          </div>

        </div>

        {error && (
          <div className="flex items-center gap-2 text-amber-300 bg-amber-400/10 p-3 rounded-sm border border-amber-400/30">
            <AlertCircle size={18} className="shrink-0 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 mt-2">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            {!isAuthenticated 
              ? '🔒 Register now to unlock full booking controls, real-time rates, and instant reservations.' 
              : '✓ Instant digital confirmation with 24/7 VIP concierge roadside assistance.'}
          </p>

          {!isAuthenticated ? (
            <Button 
              type="button" 
              onClick={() => navigate('/register')}
              size="lg" 
              className="px-10 w-full sm:w-auto bg-[#00E5FF] hover:bg-white text-black font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              <Lock size={16} /> REGISTER TO BOOK
            </Button>
          ) : (
            <Button type="submit" size="lg" className="px-12 w-full sm:w-auto flex items-center justify-center gap-2">
              FIND MY RIDE <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
