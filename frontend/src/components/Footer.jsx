import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  const handleNavClick = (e, path, target) => {
    // If we're on the homepage and clicking a hash link, scroll to it
    if (location.pathname === '/' && target) {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If not on homepage, the default Link behavior will navigate to /#target which is handled by router
  };

  return (
    <footer className="bg-[#040508] relative overflow-hidden border-t border-white/5 pt-24 pb-12">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-[#00E5FF] rounded-sm flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-black font-black italic text-2xl leading-none">D</span>
              </div>
              <span className="text-2xl font-black tracking-widest text-white uppercase italic">
                DriveX
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Experience the future of mobility. We provide access to the world's most exclusive fleet of high-performance and luxury vehicles, tailored for those who demand excellence in every journey.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all text-xs font-bold">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all text-xs font-bold">
                IN
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all text-xs font-bold">
                FB
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/vehicles" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/#about" onClick={(e) => handleNavClick(e, '/#about', 'about')} className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/#how-to-work" onClick={(e) => handleNavClick(e, '/#how-to-work', 'how-to-work')} className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/#contact" onClick={(e) => handleNavClick(e, '/#contact', 'contact')} className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00E5FF] text-sm transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Exclusive Offers</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive priority access to new fleet arrivals and seasonal driving experiences.</p>
            <form className="relative mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-500" />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
                className="w-full bg-[#08090B] border border-white/10 rounded-sm pl-10 pr-24 py-3 text-white placeholder-gray-600 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all text-sm outline-none"
              />
              <button 
                type="submit"
                className="absolute inset-y-1 right-1 px-4 bg-[#00E5FF] text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} DRIVEX PREMIUM RENTALS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span className="text-[#00E5FF] font-black italic uppercase tracking-[0.2em] text-xs">Move Beyond.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
