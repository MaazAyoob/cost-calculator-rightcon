import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';
import { DetailDrawer } from './DetailDrawer';
import { BottomNavigation } from './BottomNavigation';
import { BottomSheet } from '../bottom-sheet/BottomSheet';
import { ToastContainer } from '../ui/Toast';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../utils/cn';

export const AppLayout: React.FC = () => {
  const { isSidebarCollapsed } = useUIStore();
  const location = useLocation();

  // Planner gets a clean full-width canvas without the sidebar
  const isPlannerRoute = location.pathname === '/planner';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Header — always visible */}
      <TopNavigation />

      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Sidebar — hidden on /planner for clean wizard experience */}
        {!isPlannerRoute && <Sidebar />}

        {/* Main Workspace */}
        <main
          className={cn(
            'flex-1 transition-all duration-300 min-w-0 pb-20 lg:pb-10 pt-6 px-4 lg:px-8',
            isPlannerRoute
              ? 'lg:ml-0' // full width for wizard
              : isSidebarCollapsed
              ? 'lg:ml-16'
              : 'lg:ml-64'
          )}
        >
          <div className={cn('mx-auto', isPlannerRoute ? 'max-w-[1440px]' : 'max-w-7xl')}>
            <Outlet />
          </div>
        </main>

        {/* Right Detail Drawer — only on non-planner routes */}
        {!isPlannerRoute && <DetailDrawer />}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Mobile Bottom Sheet Drawer */}
      <BottomSheet />

      {/* Global Toast Stack */}
      <ToastContainer />
    </div>
  );
};
