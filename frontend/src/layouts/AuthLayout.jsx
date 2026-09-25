import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#040508] overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2072&auto=format&fit=crop" 
          alt="Premium Vehicle" 
          className="w-full h-full object-cover object-center grayscale-[40%]"
        />
        
        {/* Gradients to darken edges and focus center */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040508] via-[#040508]/60 to-[#040508]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040508] via-transparent to-[#040508]" />
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-12 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold group"
      >
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      {/* Floating Animated Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -50, 0],
          x: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none z-0"
      />
      <motion.div 
        animate={{ 
          y: [0, 50, 0],
          x: [0, -40, 0],
          opacity: [0.2, 0.5, 0.2] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none z-0"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 gap-12">
        
        {/* Left Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 bg-[#00E5FF] rounded-sm flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="text-black font-black italic text-3xl leading-none">D</span>
            </div>
            <span className="text-3xl font-black tracking-widest text-white uppercase italic">
              DriveX
            </span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-6">
            Unlock <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF]">
              The Fleet.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-md tracking-wide">
            Experience automotive perfection. Login to manage your bookings or register to gain exclusive access to the world's most premium vehicles.
          </p>
        </motion.div>

        {/* Right Form Area */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
