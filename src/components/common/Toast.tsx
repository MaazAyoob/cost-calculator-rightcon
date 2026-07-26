import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  const icons = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-500" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-xl shadow-soft-lg border border-slate-200/80"
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-900">{toast.title}</h4>
              {toast.description && <p className="text-xs text-slate-500 mt-0.5">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
