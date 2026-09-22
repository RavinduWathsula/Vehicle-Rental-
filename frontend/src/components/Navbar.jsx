import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from './Container';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/vehicles' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-black font-black italic text-lg leading-none">D</span>
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase italic">
              DriveX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-sm font-medium tracking-wider uppercase transition-colors hover:text-[var(--color-drivex-accent)] ${
                  location.pathname === link.path ? 'text-[var(--color-drivex-accent)]' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="hidden md:block text-sm font-medium text-white hover:text-[var(--color-drivex-accent)] transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/vehicles"
              className="px-5 py-2.5 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-[var(--color-drivex-accent)] transition-colors rounded-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
