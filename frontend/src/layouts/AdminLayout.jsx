import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import DateTimeDisplay from '../components/ui/DateTimeDisplay';
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
  Bell,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

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
    <div className="flex h-screen bg-drivex-bg overflow-hidden relative transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-drivex-sidebar backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-drivex-sidebar border-r border-drivex-border flex flex-col shrink-0 z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-drivex-border">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-drivex-accent rounded items-center justify-center transform group-hover:rotate-12 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex">
              <span className="text-drivex-text-inverse font-black italic text-sm leading-none">D</span>
            </div>
            <span className="text-xl font-black tracking-widest text-drivex-text uppercase italic">
              Admin
            </span>
          </Link>
          <button className="lg:hidden text-drivex-text-muted hover:text-drivex-text" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative group overflow-hidden ${
                  isActive
                    ? 'text-drivex-accent bg-drivex-accent/10 border border-drivex-accent/20 shadow-sm' 
                    : 'text-drivex-text-muted hover:text-drivex-text hover:bg-drivex-card-hover'
                }`}
              >
                <Icon size={18} className={`relative z-10 ${isActive ? 'text-drivex-accent' : 'text-drivex-text-muted group-hover:text-drivex-text transition-colors'}`} />
                <span className="uppercase tracking-widest relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-drivex-border bg-drivex-sidebar">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-drivex-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-widest border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Admin Header */}
        <header className="h-20 bg-drivex-bg/80 backdrop-blur-md border-b border-drivex-border flex items-center justify-between px-6 lg:px-8 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-drivex-text-muted hover:text-drivex-text transition-colors p-2 bg-drivex-card border border-drivex-border rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block text-drivex-text">
              <DateTimeDisplay />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="relative p-2.5 bg-drivex-card hover:bg-drivex-card-hover border border-drivex-border rounded-full text-drivex-text-muted hover:text-drivex-text transition-colors shadow-sm"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="relative p-2.5 bg-drivex-card hover:bg-drivex-card-hover border border-drivex-border rounded-full text-drivex-text-muted hover:text-drivex-text transition-colors shadow-sm">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-drivex-accent rounded-full border-2 border-drivex-card"></span>
            </button>
            <div className="h-8 w-px bg-drivex-border"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-drivex-text uppercase tracking-wider">Super Admin</p>
                <p className="text-[10px] text-drivex-accent uppercase tracking-widest">System Owner</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-drivex-accent to-purple-500 p-0.5 shadow-sm">
                <div className="w-full h-full bg-drivex-card rounded-[10px] flex items-center justify-center text-drivex-text text-sm font-black">
                  SA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-drivex-bg transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
