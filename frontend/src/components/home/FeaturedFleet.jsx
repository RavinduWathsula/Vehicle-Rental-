import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Gauge, Fuel, Users } from 'lucide-react';
import { searchVehicles } from '../../lib/api';
import { FALLBACK_FLEET } from '../../lib/fleetData';

const FeaturedFleet = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const data = await searchVehicles({ category: 'luxury' });
        if (data && data.length >= 3) {
          setVehicles(data.slice(0, 3));
        } else {
          const allData = await searchVehicles({});
          if (allData && allData.length >= 3) {
            setVehicles(allData.slice(0, 3));
          } else {
            setVehicles(FALLBACK_FLEET.slice(0, 3));
          }
        }
      } catch (err) {
        console.warn('Using curated fallback fleet for showcase:', err);
        setVehicles(FALLBACK_FLEET.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  const handleBookVehicle = (vehicleId) => {
    const isAuth = Boolean(localStorage.getItem('drivex_token') || localStorage.getItem('drivex_user'));
    if (!isAuth) {
      navigate('/register', { 
        state: { message: 'Registration required: Please create an account or sign in to reserve this vehicle.' } 
      });
    } else {
      navigate(`/booking/${vehicleId}`);
    }
  };

  if (loading || vehicles.length === 0) return null;

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-transparent relative overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#00E5FF] font-bold tracking-[0.3em] uppercase text-xs sm:text-sm mb-2 sm:mb-4">
              Our Collection
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Fleet</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/vehicles"
              className="group flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-white hover:text-[#00E5FF] transition-colors"
            >
              View Full Fleet
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Exactly 3 Featured Vehicles on Landing Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {vehicles.slice(0, 3).map((vehicle, index) => {
            const rawPrice = Number(vehicle.daily_price || vehicle.pricePerDay || vehicle.price_per_day || 0);
            const priceLKR = rawPrice < 1000 ? rawPrice * 300 : rawPrice;

            return (
              <motion.div
                key={vehicle.id || vehicle.slug || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-[#08090B] rounded-xl overflow-hidden border border-white/5 hover:border-[#00E5FF]/40 transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[#0A0B0E]">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-sm border border-white/10 text-xs font-bold text-white uppercase tracking-widest">
                      {vehicle.category_name || vehicle.category || 'Luxury'}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-sm text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                      Available
                    </span>
                  </div>
                  <img 
                    src={vehicle.primary_image || vehicle.image_url || vehicle.imageUrl} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <div className="min-w-0">
                        <span className="text-[#00E5FF] text-xs font-bold uppercase tracking-widest block">
                          {vehicle.brand}
                        </span>
                        <h4 className="text-lg sm:text-xl font-black text-white italic uppercase tracking-wider truncate">
                          {vehicle.model || vehicle.name}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-xl sm:text-2xl font-black text-white">LKR {priceLKR.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                          {rawPrice ? `($${rawPrice}/day)` : '/ Day'}
                        </span>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-5 sm:mb-6 pt-3 sm:pt-4 border-t border-white/5">
                      <div className="text-center p-2 bg-white/5 rounded-sm">
                        <span className="block text-xs font-bold text-white mb-1">{vehicle.seats || 4}</span>
                        <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Seats</span>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded-sm">
                        <span className="block text-xs font-bold text-white mb-1">{vehicle.transmission?.substring(0, 4)}</span>
                        <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Trans</span>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded-sm">
                        <span className="block text-xs font-bold text-white mb-1 truncate">{vehicle.fuel || vehicle.fuel_type || 'Petrol'}</span>
                        <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Fuel</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Details & Book Now */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link 
                      to={`/vehicles/${vehicle.id}`}
                      className="py-3 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-[11px] transition-colors rounded-sm flex items-center justify-center"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleBookVehicle(vehicle.id)}
                      className="py-3 text-center bg-[#00E5FF] hover:bg-white text-black font-black uppercase tracking-widest text-[11px] transition-all rounded-sm shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Book Now <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full Fleet CTA Button to Browse & Search */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            Explore Complete Fleet & Filter Vehicles <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedFleet;
