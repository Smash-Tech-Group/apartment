import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Home,
  Users,
  Car,
  CreditCard,
  TrendingUp,
  HelpCircle,
  Settings,
  Search,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/properties', label: 'Stay Listings', icon: Home },
  { path: '/admin/rides', label: 'Car Listings', icon: Car },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/reports', label: 'Report', icon: TrendingUp },
  { path: '/admin/support', label: 'Support', icon: HelpCircle },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout = ({ children, title }) => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex font-sans text-gray-800 antialiased">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100 mb-6">
            {/* Hexagonal house logo in orange */}
            <div className="shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2L35 10.5V29.5L20 38L5 29.5V10.5L20 2Z" fill="#ff6b00" />
                <path d="M20 10L30 16V27L20 33L10 27V16L20 10Z" fill="white" />
                <path d="M20 14L26 19.5V25.5H14V19.5L20 14Z" fill="#ff6b00" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[#1a174d] font-bold text-xl leading-none tracking-tight">Smash</span>
              <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold mt-0.5">Apartments</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/admin' && location.pathname.startsWith(item.path));
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-4 py-3.5 px-6 font-medium text-sm rounded-r-2xl transition-all ${
                    isActive
                      ? 'text-[#ff6b00] bg-[#FFF5F0] border-l-[3px] border-[#ff6b00] -ml-3 pl-[27px]'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#ff6b00]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with logged in user */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-[#1a174d] text-sm font-semibold truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard" className="flex-1 px-3 py-2 text-xs text-[#1a174d] hover:bg-white border border-gray-200 rounded-xl text-center transition-all font-medium">
              User Panel
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium flex items-center justify-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-transparent px-6 lg:px-8 py-5 flex items-center justify-between z-30">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {/* Mobile menu trigger */}
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-xl shadow-sm border border-gray-100">
              <Menu className="w-5 h-5" />
            </button>

            {/* Mockup Search Bar */}
            <div className="relative flex-1 group hidden sm:block">
              <div className="flex items-center bg-[#EDEDF5] rounded-full pl-6 pr-1 py-1 w-full max-w-[400px] border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all shadow-sm">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-transparent border-none text-sm placeholder:text-gray-400 focus:outline-none text-[#1a174d] py-1.5"
                />
                <button className="w-9 h-9 rounded-full bg-[#ff6b00] hover:bg-orange-600 transition-colors flex items-center justify-center text-white shadow-md">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#ff6b00] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md cursor-default">
              <span className="w-2 h-2 bg-white rounded-full inline-block animate-pulse"></span>
              <span>Super Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content area */}
        <main className="flex-1 px-6 lg:px-8 pb-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
