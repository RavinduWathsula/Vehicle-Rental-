import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';

const DashboardLayout = () => {
  const location = useLocation();

  const links = [
    { name: 'Overview', path: '/dashboard' },
    { name: 'My Bookings', path: '/dashboard/bookings' },
    { name: 'Profile Settings', path: '/dashboard/profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#08090B]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="bg-[#111218] border border-white/5 rounded-xl p-6 sticky top-32">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">My Account</h3>
                <nav className="space-y-2">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-md text-sm font-medium transition-all ${
                        location.pathname === link.path 
                          ? 'bg-[var(--color-drivex-accent)]/10 text-[var(--color-drivex-accent)] border border-[var(--color-drivex-accent)]/20' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button className="w-full text-left px-4 py-3 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all mt-8">
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>
            
            {/* Main Content Area */}
            <div className="flex-grow min-w-0">
              <Outlet />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
