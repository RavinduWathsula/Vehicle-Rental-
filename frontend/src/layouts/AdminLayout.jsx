import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Vehicles', path: '/admin/vehicles' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Customers', path: '/admin/customers' },
    { name: 'Drivers', path: '/admin/drivers' },
    { name: 'Maintenance', path: '/admin/maintenance' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#08090B] overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#111218] border-r border-white/5 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--color-drivex-accent)] rounded-sm flex items-center justify-center">
              <span className="text-black font-black italic text-xs leading-none">D</span>
            </div>
            <span className="text-lg font-black tracking-widest text-white uppercase italic">
              DriveX Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path))
                  ? 'bg-[var(--color-drivex-accent)]/10 text-[var(--color-drivex-accent)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-[#111218]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden flex items-center">
            {/* Mobile menu button would go here */}
            <span className="text-lg font-bold text-white">Menu</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
