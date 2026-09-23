import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroUI = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center pointer-events-none px-4 sm:px-8">
      {/* Main Text Content */}
      <div className="z-20 text-center flex flex-col items-center w-full max-w-6xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 overflow-hidden"
        >
          <span className="text-[var(--color-drivex-accent)] font-bold tracking-[0.3em] uppercase text-sm sm:text-base mb-4 block">
            Drivex
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
            Move <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-drivex-accent)] to-[#00B8CC]">
              Beyond.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-400 text-lg sm:text-2xl font-light tracking-wide max-w-2xl mb-10"
        >
          Premium vehicles. Seamless rentals. Unforgettable journeys.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
        >
          <Link to="/vehicles">
            <Button size="lg" className="w-64 h-14 text-lg">
              Explore Vehicles
            </Button>
          </Link>
          <Link to="/vehicles">
            <Button variant="ghost" size="lg" className="w-64 h-14 text-lg group">
              Start Your Journey 
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-24 left-8 hidden md:flex flex-col gap-8 pointer-events-auto"
      >
        {[
          { label: 'Vehicles', value: '48+' },
          { label: 'Locations', value: '12' },
          { label: 'Support', value: '24/7' },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-2xl font-bold text-white italic">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-drivex-accent)] mb-3">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--color-drivex-accent)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroUI;
