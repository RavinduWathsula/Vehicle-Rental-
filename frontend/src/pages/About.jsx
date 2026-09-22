import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';

const About = () => {
  return (
    <div className="w-full pt-12 pb-32">
      {/* Hero */}
      <div className="w-full h-[50vh] relative mb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555626906-fcf10d6851b4?q=80&w=2070&auto=format&fit=crop" 
            alt="About DRIVEX" 
            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] to-transparent" />
          <div className="absolute inset-0 cinematic-gradient opacity-80" />
        </div>
        <Container className="h-full relative z-10 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-4">
              The <span className="text-[var(--color-drivex-accent)]">DRIVEX</span> Standard
            </h1>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
              Redefining luxury mobility for those who accept no compromises.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Engineering <br/><span className="text-[var(--color-drivex-accent)]">Excellence</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Founded on the principle that the journey matters just as much as the destination, DRIVEX provides exclusive access to the world's most sought-after vehicles. 
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't just rent cars. We provide an end-to-end luxury experience. From our meticulously maintained fleet to our 24/7 concierge service, every detail is engineered to exceed expectations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[var(--color-drivex-accent)] blur-[100px] opacity-10 rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop" 
              alt="Interior" 
              className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10 border border-white/10"
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default About;
