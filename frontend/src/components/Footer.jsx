import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-[#0A0B0E] pt-20 pb-10 border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center">
                <span className="text-black font-black italic text-lg leading-none">D</span>
              </div>
              <span className="text-2xl font-black tracking-widest text-white uppercase italic">
                DriveX
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the future of mobility. Premium vehicle rentals for those who demand excellence and performance in every journey.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/vehicles" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">Our Fleet</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">About Us</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">Locations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--color-drivex-accent)] transition-colors text-sm">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} DRIVEX. All rights reserved.</p>
          <p className="mt-2 md:mt-0 uppercase tracking-widest text-[var(--color-drivex-accent)]">Move Beyond.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
