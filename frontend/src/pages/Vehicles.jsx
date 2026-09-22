import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import VehicleCard from '../components/VehicleCard';
import Input from '../components/Input';
import Select from '../components/Select';
import Loading from '../components/Loading';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mocking vehicle data for now since backend MySQL is unreachable.
  // In a real flow, this would call vehicleService.getVehicles()
  useEffect(() => {
    setTimeout(() => {
      setVehicles([
        {
          id: 1,
          brand: 'Porsche',
          model: '911 GT3 RS',
          year: 2024,
          transmission: 'PDK Automatic',
          fuel_type: 'petrol',
          daily_price: '1200.00',
          status: 'available',
          images: [{ image_url: 'https://images.unsplash.com/photo-1503376760367-1b612164d402?q=80&w=2070&auto=format&fit=crop' }]
        },
        {
          id: 2,
          brand: 'Mercedes-Benz',
          model: 'G63 AMG',
          year: 2023,
          transmission: 'Automatic',
          fuel_type: 'petrol',
          daily_price: '900.00',
          status: 'available',
          images: [{ image_url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1974&auto=format&fit=crop' }]
        },
        {
          id: 3,
          brand: 'Lamborghini',
          model: 'Huracan EVO',
          year: 2024,
          transmission: 'Automatic',
          fuel_type: 'petrol',
          daily_price: '1500.00',
          status: 'rented',
          images: [{ image_url: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=1974&auto=format&fit=crop' }]
        }
      ]);
      setIsLoading(false);
    }, 1000);
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
