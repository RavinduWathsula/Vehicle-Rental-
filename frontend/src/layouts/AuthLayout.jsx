import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#08090B]">
      {/* Left side - Cinematic Image/Branding */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col justify-center p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop" 
            alt="Premium Vehicle" 
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 to-[#08090B]" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center transform -rotate-12">
              <span className="text-black font-black italic text-2xl leading-none">D</span>
            </div>
          </Link>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Move <br/> <span className="text-[var(--color-drivex-accent)] italic">Beyond.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Access our exclusive fleet of high-performance and luxury vehicles. Your next journey starts here.
          </p>
        </div>
      </div>

      {/* Right side - Form Area */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex md:hidden items-center justify-center gap-2 mb-12">
            <div className="w-8 h-8 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center">
              <span className="text-black font-black italic text-lg leading-none">D</span>
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase italic">
              DriveX
            </span>
          </Link>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
