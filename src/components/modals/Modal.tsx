import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalScaleVariant } from '../../animations/variants';
import { useUIStore } from '../../store/useUIStore';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ModalProps {
  modalId: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  subtitle,
  children,
  className,
  maxWidth = 'md',
}) => {
  const { activeModal, closeModal } = useUIStore();
  const isOpen = activeModal === modalId;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  const maxWidths = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            variants={modalScaleVariant}
            initial="closed"
            animate="open"
            exit="exit"
            className={cn(
              'relative w-full bg-white rounded-[18px] shadow-soft-xl border border-slate-200 overflow-hidden z-10',
              maxWidths[maxWidth],
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{title}</h3>
                  {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
