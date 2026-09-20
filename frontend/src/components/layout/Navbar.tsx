import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'Vehicles', href: '#vehicles' },
  { name: 'Experience', href: '#experience' },
  { name: 'Locations', href: '#locations' },
  { name: 'About', href: '#about' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "py-4 px-6 md:px-10" 
            : "py-6 px-6 md:px-10 bg-transparent"
        )}
      >
        <div 
          className={cn(
            "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
            isScrolled 
              ? "glassmorphism rounded-full px-6 py-3" 
              : "px-2"
          )}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-heading font-bold tracking-widest text-white">
              DRIVEX<span className="text-[#D4AF37]">.</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#login" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
              Login
            </a>
            <Button size="sm">Book Now</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#08090B]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 md:px-10">
              <span className="text-2xl font-heading font-bold tracking-widest text-white">
                DRIVEX<span className="text-[#D4AF37]">.</span>
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl font-heading text-white hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 flex flex-col gap-4"
              >
                <Button variant="outline" className="w-full justify-center" size="lg">Login</Button>
                <Button className="w-full justify-center" size="lg">Book Now</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
