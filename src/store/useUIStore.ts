import { create } from 'zustand';
import { ToastMessage } from '../types';
import { useToastStore } from './useToastStore';

interface UIState {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  isDrawerOpen: boolean;
  drawerTitle: string;
  drawerContentId: string | null;
  isBottomSheetOpen: boolean;
  bottomSheetContentId: string | null;
  activeModal: string | null;
  toasts: ToastMessage[];

  // Actions
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  openDrawer: (title: string, contentId: string) => void;
  closeDrawer: () => void;
  openBottomSheet: (contentId: string) => void;
  closeBottomSheet: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isSidebarCollapsed: false,
  isDrawerOpen: false,
  drawerTitle: '',
  drawerContentId: null,
  isBottomSheetOpen: false,
  bottomSheetContentId: null,
  activeModal: null,
  toasts: [],

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleSidebarCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  openDrawer: (title, contentId) => set({ isDrawerOpen: true, drawerTitle: title, drawerContentId: contentId }),
  closeDrawer: () => set({ isDrawerOpen: false, drawerContentId: null }),
  openBottomSheet: (contentId) => set({ isBottomSheetOpen: true, bottomSheetContentId: contentId }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false, bottomSheetContentId: null }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),

  addToast: (toast) => {
    // Delegate to useToastStore which is what ToastContainer renders
    // Map 'description' field (from ToastMessage) to 'message' (ToastItem)
    useToastStore.getState().addToast({
      type: (toast.type === 'danger' ? 'error' : (toast.type as any)) ?? 'info',
      title: toast.title,
      message: toast.description,
    });
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
