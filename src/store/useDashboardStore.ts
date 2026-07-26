import { create } from 'zustand';
import { DashboardTab } from '../types';

interface DashboardState {
  activeTab: DashboardTab;
  selectedStageId: string;
  selectedActivityId: string | null;
  searchQuery: string;
  viewMode: 'grid' | 'table';
  
  // Filtering & Search
  priorityFilter: 'All' | 'Standard' | 'Premium' | 'Luxury';
  materialFilter: string;
  
  // Bookmarks & Comparison
  bookmarkedActivityIds: string[];
  compareActivityIds: string[];
  isCompareDrawerOpen: boolean;

  setActiveTab: (tab: DashboardTab) => void;
  setSelectedStageId: (stageId: string) => void;
  setSelectedActivityId: (activityId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'table') => void;
  setPriorityFilter: (filter: 'All' | 'Standard' | 'Premium' | 'Luxury') => void;
  setMaterialFilter: (material: string) => void;
  toggleBookmark: (activityId: string) => void;
  toggleCompare: (activityId: string) => void;
  clearCompare: () => void;
  setCompareDrawerOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: 'overview',
  selectedStageId: 'stage-02',
  selectedActivityId: 'act-02-1',
  searchQuery: '',
  viewMode: 'grid',
  
  priorityFilter: 'All',
  materialFilter: 'All',
  
  bookmarkedActivityIds: ['act-02-1', 'act-04-1'],
  compareActivityIds: [],
  isCompareDrawerOpen: false,

  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedStageId: (selectedStageId) => set({ selectedStageId }),
  setSelectedActivityId: (selectedActivityId) => set({ selectedActivityId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setViewMode: (viewMode) => set({ viewMode }),
  
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  setMaterialFilter: (materialFilter) => set({ materialFilter }),
  
  toggleBookmark: (activityId) =>
    set((state) => ({
      bookmarkedActivityIds: state.bookmarkedActivityIds.includes(activityId)
        ? state.bookmarkedActivityIds.filter((id) => id !== activityId)
        : [...state.bookmarkedActivityIds, activityId],
    })),
    
  toggleCompare: (activityId) =>
    set((state) => {
      const exists = state.compareActivityIds.includes(activityId);
      if (exists) {
        return {
          compareActivityIds: state.compareActivityIds.filter((id) => id !== activityId),
        };
      }
      if (state.compareActivityIds.length >= 2) {
        // Swap out the second item if already 2 items selected
        return {
          compareActivityIds: [state.compareActivityIds[0], activityId],
          isCompareDrawerOpen: true,
        };
      }
      return {
        compareActivityIds: [...state.compareActivityIds, activityId],
        isCompareDrawerOpen: true,
      };
    }),
    
  clearCompare: () => set({ compareActivityIds: [], isCompareDrawerOpen: false }),
  setCompareDrawerOpen: (isCompareDrawerOpen) => set({ isCompareDrawerOpen }),
}));
