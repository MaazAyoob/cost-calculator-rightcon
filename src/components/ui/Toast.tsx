import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore, ToastType } from '../../store/useToastStore';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  error: <AlertCircle className="w-4 h-4 text-rose-600" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-600" />,
  info: <Info className="w-4 h-4 text-blue-600" />,
};

const bgMap: Record<ToastType, string> = {
  success: 'bg-emerald-50/95 border-emerald-200 text-emerald-950',
  error: 'bg-rose-50/95 border-rose-200 text-rose-950',
  warning: 'bg-amber-50/95 border-amber-200 text-amber-950',
  info: 'bg-blue-50/95 border-blue-200 text-blue-950',
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={cn(
              'pointer-events-auto p-3.5 rounded-2xl border shadow-soft-lg backdrop-blur-md flex items-start gap-3 text-xs',
              bgMap[toast.type]
            )}
          >
            <div className="shrink-0 mt-0.5">{iconMap[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold leading-tight">{toast.title}</div>
              {toast.message && <div className="text-[11px] opacity-80 mt-0.5 leading-snug">{toast.message}</div>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
