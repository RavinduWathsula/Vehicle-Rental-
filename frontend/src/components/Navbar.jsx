import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, User, LayoutDashboard } from 'lucide-react';
import Container from './Container';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  // Synchronize authenticated user
  useEffect(() => {
    const syncUser = () => {
      try {
        const u = localStorage.getItem('drivex_user');
        const token = localStorage.getItem('drivex_token');
        if (u && token) {
          setCurrentUser(JSON.parse(u));
        } else {
          setCurrentUser(null);
        }
      } catch (e) {
        setCurrentUser(null);
      }
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  // Close mobile menu whenever path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Robust ScrollSpy for homepage navigation
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      // 1. Scrolled style trigger
      setScrolled(window.scrollY > 40);

      // 2. Active section detection with fixed header offset
      const scrollPosition = window.scrollY + 140;

      // Check if at the bottom of the page -> activate 'contact'
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection('contact');
        return;
      }

      // Sections in visual hierarchy on landing page
      const sections = [
        { id: 'home', target: 'home' },
        { id: 'fleet', target: 'fleet' },
        { id: 'about', target: 'about' },
        { id: 'how-to-work', target: 'how-to-work' },
        { id: 'contact', target: 'contact' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].target);
            return;
          }
        }
      }

      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, path, target) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(target);
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/#home', target: 'home' },
    { name: 'Fleet', path: '/#fleet', target: 'fleet' },
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
              const isFleetPage = link.target === 'fleet' && location.pathname.startsWith('/vehicles');
              const isActive = isTargetActive || isFleetPage;
              
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
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <Link
                to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                className="px-4 py-2 bg-[var(--color-drivex-accent)] text-black text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white transition-all rounded-sm shadow-lg shadow-[var(--color-drivex-accent)]/20 flex items-center gap-2"
              >
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
                <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">
                  {currentUser.role === 'admin' ? 'ADMIN' : 'VIP'}
                </span>
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Actions: Register & Hamburger Toggle */}
          <div className="flex items-center gap-2.5 md:hidden z-50">
            {currentUser ? (
              <Link 
                to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                className="px-3.5 py-1.5 bg-[var(--color-drivex-accent)] text-black text-xs font-black uppercase tracking-wider hover:bg-white transition-colors rounded-sm shadow-md"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/register"
                className="px-3.5 py-1.5 bg-[var(--color-drivex-accent)] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-sm shadow-md"
              >
                Register
              </Link>
            )}
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
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, link.target)}
                    className="py-2.5 text-base font-bold text-white/90 hover:text-[var(--color-drivex-accent)] uppercase tracking-wider transition-colors flex items-center justify-between border-b border-white/5"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-[var(--color-drivex-accent)]">→</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                {currentUser ? (
                  <Link
                    to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center bg-[var(--color-drivex-accent)] text-black font-black uppercase tracking-wider text-sm rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <LayoutDashboard size={16} /> Open Dashboard ({currentUser.name?.split(' ')[0] || 'User'})
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center bg-[var(--color-drivex-accent)] text-black font-black uppercase tracking-wider text-sm rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      Register Now
                    </Link>
                  </>
                )}
                <Link
                  to="/vehicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center bg-white/5 border border-white/10 text-white font-bold uppercase tracking-wider text-xs rounded-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Car size={15} /> Explore Full Fleet
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
