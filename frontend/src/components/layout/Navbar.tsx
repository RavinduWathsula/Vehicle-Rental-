import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Vehicles', href: '/vehicles' },
  { name: 'About', href: '/#about' },
  { name: 'How It Works', href: '/#how-to-work' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Auth state
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth
    const userStr = localStorage.getItem('drivex_user');
    if (userStr) {
      try { setUser(JSON.parse(userStr)); } catch (e) {}
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('drivex_token');
    localStorage.removeItem('drivex_user');
    setUser(null);
    navigate('/');
  };

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
            <Link to="/" className="text-2xl font-heading font-bold tracking-widest text-white">
              DRIVEX<span className="text-[#00E5FF]">.</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group uppercase tracking-widest"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#00E5FF] transition-colors uppercase tracking-widest">
                  <UserIcon size={16} />
                  {user.firstName || 'Dashboard'}
                </Link>
                <button onClick={handleLogout} className="text-white/50 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-white hover:text-[#00E5FF] transition-colors uppercase tracking-widest">
                  Login
                </Link>
                <Link to="/register">
                  <Button size="sm" className="font-bold uppercase tracking-widest text-xs border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors bg-transparent shadow-[0_0_15px_rgba(0,229,255,0.2)]">Sign Up</Button>
                </Link>
              </>
            )}
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
                DRIVEX<span className="text-[#00E5FF]">.</span>
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
                  className="text-3xl font-heading text-white hover:text-[#00E5FF] transition-colors uppercase tracking-widest"
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
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-center bg-[#00E5FF] text-black hover:bg-white" size="lg">Dashboard</Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-center text-red-400 border-red-400/50 hover:bg-red-500/10" size="lg" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center border-white/20 hover:bg-white/10" size="lg">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-center bg-[#00E5FF] text-black hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.3)]" size="lg">Sign Up</Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
