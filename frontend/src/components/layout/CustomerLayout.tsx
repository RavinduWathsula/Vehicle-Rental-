import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, CalendarDays, User as UserIcon, LogOut } from 'lucide-react';

export const CustomerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/customer', icon: <LayoutDashboard size={20} /> },
    { label: 'My Bookings', path: '/customer/bookings', icon: <CalendarDays size={20} /> },
    { label: 'Profile Settings', path: '/customer/profile', icon: <UserIcon size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#08090B] pt-24 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/5 border-r border-white/10 shrink-0 p-6 flex flex-col gap-8 md:h-[calc(100vh-6rem)] md:sticky md:top-24">
        <div>
          <h2 className="text-white font-bold text-xl">{user?.firstName} {user?.lastName}</h2>
          <p className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase mt-1">Customer</p>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#00E5FF]/10 text-[#00E5FF]' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
