import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CarFront, 
  CalendarCheck, 
  Heart, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { authService } from '../services/authService';
import DateTimeDisplay from '../components/ui/DateTimeDisplay';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const userStr = localStorage.getItem('drivex_user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u.name) {
          const parts = u.name.split(' ');
          u.firstName = parts[0];
          u.lastName = parts.slice(1).join(' ');
        }
        setUser(u);
      } catch (e) {}
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Close sidebar automatically on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Book Vehicle', path: '/dashboard/vehicles', icon: CarFront },
    { name: 'My Bookings', path: '/dashboard/bookings', icon: CalendarCheck },
    { name: 'Favorites', path: '/dashboard/favorites', icon: Heart },
    { name: 'Settings', path: '/dashboard/profile', icon: Settings },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-[var(--sidebar)] border-r border-[var(--border)] z-50 flex flex-col h-full transition-transform duration-300 ease-in-out shrink-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[var(--border)] lg:border-none">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[var(--accent)]/20">
              <span className="text-white font-black italic text-lg leading-none">D</span>
            </div>
            <span className="text-2xl font-black tracking-widest text-[var(--text)] uppercase italic drop-shadow-md">
              DriveX
            </span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 px-2">Menu</p>
          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/dashboard' && link.path !== '/dashboard/vehicles' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_10px_var(--accent)_inset]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-hover)]'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 sm:p-6 border-t border-[var(--border)]">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3.5 mb-3 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-cyan-600 flex items-center justify-center text-white font-bold shrink-0">
              {user?.firstName?.[0] || 'U'}
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-sm font-bold text-[var(--text)] truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        {/* Top Header */}
        <header className="h-16 sm:h-20 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-4 sm:px-6 lg:px-10 z-30 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 bg-[var(--card)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border border-[var(--border)] shrink-0"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block ml-4 text-[var(--text)]">
              <DateTimeDisplay />
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 sm:gap-4 justify-end shrink-0">
            <div className="hidden md:flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-full px-4 py-2 w-48 focus-within:w-64 transition-all focus-within:border-[var(--accent)]/50 shadow-sm">
              <Search size={16} className="text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder-[var(--text-muted)] w-full"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={toggleTheme}
                className="relative w-9 h-9 sm:w-10 sm:h-10 bg-[var(--card)] hover:bg-[var(--card-hover)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border border-[var(--border)] shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button 
                className="relative w-9 h-9 sm:w-10 sm:h-10 bg-[var(--card)] hover:bg-[var(--card-hover)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border border-[var(--border)] shadow-sm"
                aria-label="Notifications"
              >
                <Bell size={17} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-10 no-scrollbar relative bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
