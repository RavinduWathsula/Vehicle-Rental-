import React from 'react';
import { motion } from 'framer-motion';
import VehicleCard from '../VehicleCard';
import SectionHeading from '../SectionHeading';
import Button from '../Button';
import { Link } from 'react-router-dom';

const mockVehicles = [
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
  }
];

const FindYourRide = () => {
  return (
    <section className="py-32 relative bg-[#040508] z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading 
          title="Find Your Ride." 
          subtitle="Precision Engineering" 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {mockVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/vehicles">
            <Button variant="outline" size="lg">View Full Database</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindYourRide;
