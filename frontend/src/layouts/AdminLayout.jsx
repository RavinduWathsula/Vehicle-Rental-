import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CarFront, 
  CalendarCheck, 
  Users, 
  UserCircle, 
  Wrench, 
  PieChart, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/admin/vehicles', icon: CarFront },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Drivers', path: '/admin/drivers', icon: UserCircle },
    { name: 'Maintenance', path: '/admin/maintenance', icon: Wrench },
    { name: 'Reports', path: '/admin/reports', icon: PieChart },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#040508] overflow-hidden relative">
      {/* Creative Background for Admin */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: ['-20%', '20%', '-20%'], y: ['20%', '-20%', '20%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 blur-[120px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: ['20%', '-20%', '20%'], y: ['-20%', '20%', '-20%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDBFNUZGIiBzdHJva2Utd2lkdGg9IjAuMDUiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0wIDYwaDYwTTAgMGg2MCIvPjxwYXRoIGQ9Ik02MCAwaC0uMXY2MEg2MCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>

      {/* Admin Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col hidden md:flex shrink-0 relative z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00E5FF] to-[#00B8CC] rounded flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <span className="text-black font-black italic text-sm leading-none">D</span>
            </div>
            <span className="text-xl font-black tracking-widest text-white uppercase italic">
              Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative group overflow-hidden ${
                  isActive
                    ? 'text-black shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#00B8CC] rounded-xl" />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                )}
                <Icon size={18} className={`relative z-10 ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-[#00E5FF] transition-colors'}`} />
                <span className="uppercase tracking-widest relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/5 bg-black/20">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all uppercase tracking-widest border border-transparent hover:border-red-400/20">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Admin Header */}
        <header className="h-20 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="md:hidden flex items-center">
            {/* Mobile menu button */}
            <span className="text-lg font-bold text-white uppercase tracking-widest">Menu</span>
          </div>
          
          <div className="flex items-center gap-6 ml-auto">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00E5FF] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white uppercase tracking-wider">Super Admin</p>
                <p className="text-[10px] text-[#00E5FF] uppercase tracking-widest">System Owner</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-purple-500 p-0.5 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <div className="w-full h-full bg-[#08090B] rounded-[10px] flex items-center justify-center text-white text-sm font-black">
                  SA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
