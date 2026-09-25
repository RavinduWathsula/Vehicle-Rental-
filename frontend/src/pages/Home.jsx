import React from 'react';
import { motion } from 'framer-motion';
import NewHero from '../components/home/NewHero';
import FeaturedFleet from '../components/home/FeaturedFleet';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AboutSection from '../components/home/AboutSection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import ContactSection from '../components/home/ContactSection';
import FinalCTA from '../components/home/FinalCTA';
import { ExperienceSection } from '../components/home/ExperienceSection';

const CreativeBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#040508] pointer-events-none">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDBFNUZGIiBzdHJva2Utd2lkdGg9IjAuMDUiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0wIDYwaDYwTTAgMGg2MCIvPjxwYXRoIGQ9Ik02MCAwaC0uMXY2MEg2MCIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
    
    {/* Animated Glowing Orbs */}
    <motion.div 
      animate={{ 
        x: ['-20%', '20%', '-20%'],
        y: ['-20%', '20%', '-20%'],
        scale: [1, 1.5, 1],
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(ellipse_at_center,_var(--color-drivex-accent)_0%,_transparent_70%)] opacity-20 blur-[80px] rounded-full"
    />
    
    <motion.div 
      animate={{ 
        x: ['20%', '-20%', '20%'],
        y: ['20%', '-20%', '20%'],
        scale: [1.2, 1, 1.2],
      }}
      transition={{ 
        duration: 25, 
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
      className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(ellipse_at_center,_#9D4EDD_0%,_transparent_70%)] opacity-20 blur-[100px] rounded-full"
    />

    <motion.div 
      animate={{ 
        x: ['-10%', '10%', '-10%'],
        y: ['10%', '-10%', '10%'],
      }}
      transition={{ 
        duration: 18, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_#00B8CC_0%,_transparent_60%)] opacity-10 blur-[120px] rounded-full"
    />

    {/* Grain Overlay */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
    
    {/* Bottom Gradient Fade */}
    <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#040508] to-transparent z-10" />
  </div>
);

const Home = () => {
  return (
    <div className="w-full relative text-white">
      <CreativeBackground />
      
      <div className="relative z-10 w-full">
        <div id="home">
          <NewHero />
        </div>
        
        <FeaturedFleet />
        <ExperienceSection />
        
        <div id="about">
          <WhyChooseUs />
          <AboutSection />
        </div>
        
        <div id="how-to-work">
          <HowItWorks />
        </div>
        
        <Testimonials />
        
        <div id="contact">
          <ContactSection />
        </div>
        
        <FinalCTA />
      </div>
    </div>
  );
};

export default Home;
