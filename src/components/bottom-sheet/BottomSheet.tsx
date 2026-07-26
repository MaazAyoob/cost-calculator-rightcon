import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bottomSheetVariant } from '../../animations/variants';
import { useUIStore } from '../../store/useUIStore';
import { X } from 'lucide-react';

export const BottomSheet: React.FC = () => {
  const { isBottomSheetOpen, closeBottomSheet } = useUIStore();

  return (
    <AnimatePresence>
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBottomSheet}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          {/* Bottom Sheet Container */}
          <motion.div
            variants={bottomSheetVariant}
            initial="closed"
            animate="open"
            exit="exit"
            className="relative w-full bg-white rounded-t-[24px] shadow-soft-xl border-t border-slate-200 p-6 z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900">Mobile Quick Actions</h3>
              <button
                onClick={closeBottomSheet}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 py-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                <span className="font-semibold text-slate-900">Active Project:</span> Serene Villa Residency
              </div>
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-100 text-xs">
                <span className="font-semibold">Quick Estimate:</span> ₹94,05,000 Total BOQ
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
