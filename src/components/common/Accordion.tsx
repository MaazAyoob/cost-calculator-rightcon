import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200/80 rounded-[12px] bg-white overflow-hidden shadow-soft-xs mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        <ChevronDown
          className={cn('w-4 h-4 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180 text-blue-600')}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
