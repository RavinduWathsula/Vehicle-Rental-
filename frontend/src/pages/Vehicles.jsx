import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import VehicleCard from '../components/VehicleCard';
import Input from '../components/Input';
import Select from '../components/Select';
import Loading from '../components/Loading';
import { vehicleService } from '../services/vehicleService';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="w-full pt-12 pb-32">
      {/* Header Banner */}
      <div className="w-full h-[40vh] relative mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" 
            alt="Fleet Header" 
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent" />
        </div>
        <Container className="h-full relative z-10 flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Our <span className="text-[var(--color-drivex-accent)] italic">Fleet</span></h1>
            <p className="text-gray-400 max-w-xl text-lg">Browse our exclusive collection of premium, luxury, and high-performance vehicles ready for your next journey.</p>
          </motion.div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/4"
          >
            <div className="bg-[#111218] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-drivex-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filter Vehicles
              </h3>
              
              <div className="space-y-5">
                <Input placeholder="Search brand or model..." />
                
                <Select 
                  label="Category"
                  options={[
                    { value: 'luxury', label: 'Luxury' },
                    { value: 'sports', label: 'Sports' },
                    { value: 'suv', label: 'SUV' }
                  ]}
                />
                
                <Select 
                  label="Fuel Type"
                  options={[
                    { value: 'petrol', label: 'Petrol' },
                    { value: 'electric', label: 'Electric' },
                    { value: 'hybrid', label: 'Hybrid' }
                  ]}
                />
              </div>
            </div>
          </motion.aside>

          {/* Vehicle Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <Loading />
              </div>
            ) : error ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 bg-[#111218] rounded-xl border border-red-500/20">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-400 max-w-md">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-6 px-6 py-2 bg-[var(--color-drivex-accent)] text-black font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                >
                  Try Again
                </button>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 bg-[#111218] rounded-xl border border-white/5">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
                <p className="text-gray-400 max-w-md">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Vehicles;
