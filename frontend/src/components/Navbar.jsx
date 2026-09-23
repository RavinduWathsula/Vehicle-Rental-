import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const handleNavClick = (e, path, target) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/#home', target: 'home' },
    { name: 'About', path: '/#about', target: 'about' },
    { name: 'How to Work', path: '/#how-to-work', target: 'how-to-work' },
    { name: 'Contact', path: '/#contact', target: 'contact' }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#08090B]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[var(--color-drivex-accent)]/20">
              <span className="text-black font-black italic text-lg leading-none">D</span>
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase italic drop-shadow-md">
              DriveX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path, link.target)}
                className={`relative py-2 text-sm font-bold tracking-wider uppercase transition-colors hover:text-[var(--color-drivex-accent)] ${
                  scrolled ? 'text-white' : 'text-gray-100 drop-shadow-md'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className={`hidden md:block text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-drivex-accent)] ${
                scrolled ? 'text-white' : 'text-gray-100'
              }`}
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="px-5 py-2.5 bg-[var(--color-drivex-accent)] text-black text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-sm shadow-lg shadow-[var(--color-drivex-accent)]/20"
            >
              Register
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
