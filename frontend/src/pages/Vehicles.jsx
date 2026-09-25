import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/Container';
import VehicleCard from '../components/VehicleCard';
import Loading from '../components/Loading';
import { vehicleService } from '../services/vehicleService';

const CATEGORIES = ['All', 'City', 'SUV', 'Luxury', 'Premium', 'Family', 'Van'];
const TRANSMISSIONS = ['All', 'Automatic', 'Manual'];
const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
const SEAT_OPTIONS = ['All', '2', '4', '5', '7+'];
const AVAILABILITY = ['All', 'Available', 'Reserved'];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTransmission, setActiveTransmission] = useState('All');
  const [activeFuel, setActiveFuel] = useState('All');
  const [activeSeats, setActiveSeats] = useState('All');
  const [activeAvailability, setActiveAvailability] = useState('All');

  // Load Vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await vehicleService.getVehicles();
        setVehicles(data.data || data || []);
      } catch (err) {
        setError(err.message || 'Failed to load vehicles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Filter Logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Category Match
      if (activeCategory !== 'All') {
        if (!v.category || v.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
      }
      
      // Transmission Match
      if (activeTransmission !== 'All') {
        if (!v.transmission || v.transmission.toLowerCase() !== activeTransmission.toLowerCase()) return false;
      }
      
      // Fuel Match
      if (activeFuel !== 'All') {
        if (!v.fuel_type || v.fuel_type.toLowerCase() !== activeFuel.toLowerCase()) return false;
      }
      
      // Seats Match
      if (activeSeats !== 'All') {
        if (activeSeats === '7+') {
          if (!v.seats || v.seats < 7) return false;
        } else {
          if (!v.seats || v.seats.toString() !== activeSeats) return false;
        }
      }

      // Availability Match
      if (activeAvailability !== 'All') {
        if (!v.status || v.status.toLowerCase() !== activeAvailability.toLowerCase()) return false;
      }

      return true;
    });
  }, [vehicles, activeCategory, activeTransmission, activeFuel, activeSeats, activeAvailability]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveTransmission('All');
    setActiveFuel('All');
    setActiveSeats('All');
    setActiveAvailability('All');
  };

  return (
    <div className="w-full pt-24 pb-32 min-h-screen bg-[#040508]">
      
      {/* Header Section */}
      <Container className="mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#00E5FF] font-bold tracking-[0.3em] uppercase mb-4 text-xs"
        >
          Our Fleet
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter"
        >
          Find the vehicle built <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF]">for your journey.</span>
        </motion.h1>
      </Container>

      {/* Primary Category Pills */}
      <Container className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (idx * 0.05) }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </Container>

      <Container>
        <div className="flex flex-col xl:flex-row gap-12">
          
          {/* Secondary Advanced Filters Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full xl:w-1/4 shrink-0"
          >
            <div className="bg-[#08090B] border border-white/5 rounded-2xl p-8 sticky top-28 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Filters</h3>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-[#00E5FF] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Reset
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Transmission */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">Transmission</label>
                  <div className="flex flex-wrap gap-2">
                    {TRANSMISSIONS.map(t => (
                      <button 
                        key={t}
                        onClick={() => setActiveTransmission(t)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          activeTransmission === t ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fuel */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">Fuel Type</label>
                  <div className="flex flex-wrap gap-2">
                    {FUEL_TYPES.map(f => (
                      <button 
                        key={f}
                        onClick={() => setActiveFuel(f)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          activeFuel === f ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">Seats</label>
                  <div className="flex flex-wrap gap-2">
                    {SEAT_OPTIONS.map(s => (
                      <button 
                        key={s}
                        onClick={() => setActiveSeats(s)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          activeSeats === s ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABILITY.map(a => (
                      <button 
                        key={a}
                        onClick={() => setActiveAvailability(a)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          activeAvailability === a ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.aside>

          {/* Vehicle Grid Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="h-[500px] flex items-center justify-center">
                <Loading />
              </div>
            ) : error ? (
              <div className="h-[500px] flex flex-col items-center justify-center text-center p-8 bg-[#08090B] rounded-2xl border border-red-500/20">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Error Loading Fleet</h3>
                <p className="text-gray-400 max-w-md">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 px-8 py-3 bg-[var(--color-drivex-accent)] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm"
                >
                  Try Again
                </button>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[500px] flex flex-col items-center justify-center text-center p-12 bg-[#08090B] rounded-2xl border border-white/5 shadow-2xl"
              >
                <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-widest italic">No Vehicles Match</h3>
                <p className="text-gray-400 max-w-md mb-8">
                  We couldn't find any vehicles in our fleet matching your exact criteria. Try adjusting your filters.
                </p>
                <button 
                  onClick={resetFilters}
                  className="px-8 py-3 border border-[#00E5FF] text-[#00E5FF] font-bold uppercase tracking-widest text-xs hover:bg-[#00E5FF] hover:text-black transition-colors rounded-sm"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Vehicles;
