import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car } from 'lucide-react';
import Container from './Container';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['home', 'about', 'how-to-work', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location]);

  const handleNavClick = (e, path, target) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(target);
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/#home', target: 'home' },
    { name: 'Fleet', path: '/vehicles', target: 'fleet' },
    { name: 'About', path: '/#about', target: 'about' },
    { name: 'How it Works', path: '/#how-to-work', target: 'how-to-work' },
    { name: 'Contact', path: '/#contact', target: 'contact' }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || isMobileMenuOpen 
          ? 'bg-[#08090B]/95 backdrop-blur-xl border-b border-white/10 py-3.5 sm:py-4 shadow-2xl' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="w-8 h-8 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[var(--color-drivex-accent)]/20">
              <span className="text-black font-black italic text-lg leading-none">D</span>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase italic drop-shadow-md">
              DriveX
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isTargetActive = activeSection === link.target && location.pathname === '/';
              const isFleetActive = link.path === '/vehicles' && location.pathname.startsWith('/vehicles');
              const isActive = isTargetActive || isFleetActive;
              
              if (link.path.startsWith('/#')) {
                return (
                  <a 
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, link.target)}
                    className={`relative py-2 text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${
                      isActive 
                        ? 'text-[var(--color-drivex-accent)]' 
                        : scrolled 
                          ? 'text-white hover:text-[var(--color-drivex-accent)]' 
                          : 'text-gray-100 drop-shadow-md hover:text-[var(--color-drivex-accent)]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-drivex-accent)] shadow-[0_0_8px_var(--color-drivex-accent)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-2 text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${
                    isActive 
                      ? 'text-[var(--color-drivex-accent)]' 
                      : scrolled 
                        ? 'text-white hover:text-[var(--color-drivex-accent)]' 
                        : 'text-gray-100 drop-shadow-md hover:text-[var(--color-drivex-accent)]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-drivex-accent)] shadow-[0_0_8px_var(--color-drivex-accent)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login"
              className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-drivex-accent)] ${
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

          {/* Mobile Actions: Register & Hamburger Toggle */}
          <div className="flex items-center gap-2.5 md:hidden z-50">
            <Link 
              to="/register"
              className="px-3.5 py-1.5 bg-[var(--color-drivex-accent)] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-sm shadow-md"
            >
              Register
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white bg-white/5 border border-white/10 rounded-sm focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} className="text-[var(--color-drivex-accent)]" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#08090B]/98 border-b border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                  if (link.path.startsWith('/#')) {
                    return (
                      <a
                        key={link.name}
                        href={link.path}
                        onClick={(e) => handleNavClick(e, link.path, link.target)}
                        className="py-2.5 text-base font-bold text-white/90 hover:text-[var(--color-drivex-accent)] uppercase tracking-wider transition-colors flex items-center justify-between border-b border-white/5"
                      >
                        <span>{link.name}</span>
                        <span className="text-xs text-[var(--color-drivex-accent)]">→</span>
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-base font-bold text-white/90 hover:text-[var(--color-drivex-accent)] uppercase tracking-wider transition-colors flex items-center justify-between border-b border-white/5"
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-[var(--color-drivex-accent)]">→</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/vehicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center bg-[var(--color-drivex-accent)] text-black font-black uppercase tracking-wider text-sm rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Car size={16} /> Explore Fleet
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
