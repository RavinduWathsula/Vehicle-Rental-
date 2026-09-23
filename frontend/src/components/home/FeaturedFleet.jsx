import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getExtras, searchVehicles } from '../../lib/api';

const FeaturedFleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const data = await searchVehicles({ category: 'luxury' });
        // Take top 3 for the showcase, if not enough luxury, try all
        if (data && data.length >= 3) {
          setVehicles(data.slice(0, 3));
        } else {
          const allData = await searchVehicles({});
          setVehicles((allData || []).slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to fetch featured fleet:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  if (loading || vehicles.length === 0) return null;

  return (
    <section id="fleet" className="py-24 bg-[#040508] relative overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-4">Our Collection</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Fleet</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 md:mt-0"
          >
            <Link 
              to="/vehicles"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors"
            >
              View Full Fleet
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-[#08090B] rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-[#0A0B0E]">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-sm border border-white/10">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{vehicle.category}</span>
                </div>
                <img 
                  src={vehicle.image_url || vehicle.imageUrl} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">{vehicle.brand}</span>
                    <h4 className="text-xl font-black text-white italic uppercase tracking-wider">{vehicle.name || vehicle.model}</h4>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-white">${vehicle.pricePerDay || vehicle.price_per_day}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">/ Day</span>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6 pt-4 border-t border-white/5">
                  <div className="text-center p-2 bg-white/5 rounded-sm">
                    <span className="block text-xs font-bold text-white mb-1">{vehicle.seats}</span>
                    <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Seats</span>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-sm">
                    <span className="block text-xs font-bold text-white mb-1">{vehicle.transmission?.substring(0,4)}</span>
                    <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Trans</span>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-sm">
                    <span className="block text-xs font-bold text-white mb-1">{vehicle.fuel || vehicle.fuel_type}</span>
                    <span className="block text-[8px] text-gray-400 uppercase tracking-widest">Fuel</span>
                  </div>
                </div>

                <Link 
                  to={`/vehicles/${vehicle.id}`}
                  className="block w-full py-3 text-center bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-colors rounded-sm"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedFleet;
