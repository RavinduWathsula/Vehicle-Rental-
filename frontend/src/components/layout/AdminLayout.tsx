import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Car, CalendarDays, Users, Shield, BarChart3, LogOut } from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Vehicles', path: '/admin/vehicles', icon: <Car size={20} /> },
    { label: 'Bookings', path: '/admin/bookings', icon: <CalendarDays size={20} /> },
    { label: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { label: 'Drivers', path: '/admin/drivers', icon: <Shield size={20} /> },
    { label: 'Reports', path: '/admin/reports', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-24 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/5 border-r border-[#00E5FF]/20 shrink-0 p-6 flex flex-col gap-8 md:h-[calc(100vh-6rem)] md:sticky md:top-24">
        <div>
          <h2 className="text-white font-bold text-xl">{user?.firstName} {user?.lastName}</h2>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#00E5FF]/10 text-[#00E5FF] rounded-sm mt-2">
            <Shield size={12} />
            <span className="text-[10px] font-bold tracking-widest uppercase">Admin System</span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
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
          <span className="font-medium text-sm">Logout Securely</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
