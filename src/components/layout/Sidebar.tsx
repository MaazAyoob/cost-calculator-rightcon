import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { DashboardTab } from '../../types';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Palette,
  FileSpreadsheet,
  PieChart,
  CreditCard,
  Download,
  FileCheck2,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  tab?: DashboardTab;
}

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse } = useUIStore();
  const { activeTab, setActiveTab } = useDashboardStore();
  const location = useLocation();

  const mainNavItems: NavMenuItem[] = [
    { id: 'landing', label: 'Platform Home', icon: <Home className="w-4 h-4" />, path: '/' },
    { id: 'planner', label: 'Planning Wizard', icon: <Compass className="w-4 h-4" />, path: '/planner' },
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" />, path: '/dashboard', tab: 'overview' },
    { id: 'journey', label: 'Construction Journey', icon: <MapPin className="w-4 h-4" />, path: '/dashboard', tab: 'journey' },
    { id: 'materials', label: 'Material Palette', icon: <Palette className="w-4 h-4" />, path: '/dashboard', tab: 'materials' },
    { id: 'boq', label: 'Detailed BOQ', icon: <FileSpreadsheet className="w-4 h-4" />, path: '/dashboard', tab: 'boq' },
    { id: 'budget', label: 'Budget Breakdown', icon: <PieChart className="w-4 h-4" />, path: '/dashboard', tab: 'budget' },
    { id: 'payment', label: 'Payment Roadmap', icon: <CreditCard className="w-4 h-4" />, path: '/dashboard', tab: 'payment' },
    { id: 'export', label: 'Export Centre', icon: <Download className="w-4 h-4" />, path: '/dashboard', tab: 'export' },
    { id: 'report', label: 'Executive Report', icon: <FileCheck2 className="w-4 h-4" />, path: '/report' },
  ];

  const systemNavItems: NavMenuItem[] = [
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, path: '/settings' },
    { id: 'admin', label: 'Admin Portal', icon: <Shield className="w-4 h-4" />, path: '/admin' },
  ];

  const handleNavClick = (item: NavMenuItem) => {
    if (item.tab && location.pathname === '/dashboard') {
      setActiveTab(item.tab);
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-16 bottom-0 left-0 z-20 bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Upper Navigation Section */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!isSidebarCollapsed && (
            <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Navigation
            </h3>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const isDashboardTabMatch =
                location.pathname === '/dashboard' && item.tab && activeTab === item.tab;
              const isPathMatch = location.pathname === item.path && !item.tab;
              const isActive = isDashboardTabMatch || isPathMatch;

              return (
                <NavLink
                  key={item.id}
                  to={item.tab ? `/dashboard` : item.path}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group relative',
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200/60 shadow-soft-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <span className={cn('transition-colors', isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600')}>
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div>
          {!isSidebarCollapsed && (
            <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              System
            </h3>
          )}
          <nav className="space-y-1">
            {systemNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all group',
                    isActive
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  )}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <span className="text-slate-400 group-hover:text-slate-600">{item.icon}</span>
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <span className="text-[11px] text-slate-400 font-medium px-2">Cost Calculator</span>
        )}
        <button
          onClick={toggleSidebarCollapse}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
