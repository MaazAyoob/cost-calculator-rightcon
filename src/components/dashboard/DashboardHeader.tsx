import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useProjectStore } from '../../store/useProjectStore';
import { useUIStore } from '../../store/useUIStore';
import { DashboardTab } from '../../types';
import {
  LayoutDashboard,
  MapPin,
  Palette,
  FileSpreadsheet,
  PieChart,
  CreditCard,
  Download,
  Search,
  Bell,
  Settings,
  Building2,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, searchQuery, setSearchQuery } = useDashboardStore();
  const { project } = useProjectStore();
  const { openModal } = useUIStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'journey', label: 'Construction Journey', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'materials', label: 'Materials', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'boq', label: 'Detailed BOQ', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
    { id: 'budget', label: 'Budget', icon: <PieChart className="w-3.5 h-3.5" /> },
    { id: 'payment', label: 'Payment Plan', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'export', label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    if (isSearchOpen) searchRef.current?.focus();
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-soft-xs">
      {/* Top Row */}
      <div className="h-14 flex items-center justify-between px-4 lg:px-8 border-b border-slate-100/80">
        {/* Left: Logo + Project */}
        <div className="flex items-center gap-5">
          <div onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-soft-xs">
              C
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm">COST CALCULATOR</span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-blue-50 text-blue-700 rounded border border-blue-200/60 uppercase">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none">Construction Platform</p>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 pl-5 border-l border-slate-200/80">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-100 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">{project.name}</div>
                <div className="text-[10px] text-slate-400 leading-none">{project.location.city} • {project.builtUpAreaSqFt} Sq Ft</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-2">
          {/* Expandable Search */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stages, activities, materials..."
                    className="w-64 h-8 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => openModal('notifications')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full ring-1 ring-white" />
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-extrabold ring-2 ring-blue-500/20">
              RS
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation Row with Animated Indicator */}
      <div className="px-4 lg:px-8 h-10 flex items-end relative overflow-x-auto scrollbar-none">
        <nav className="flex items-end h-full gap-0.5">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  'relative flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap h-full border-b-2',
                  isActive
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-blue-50 rounded-t-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {t.icon}
                  {t.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
