import React from 'react';
import { cn } from '../../utils/cn';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'blue' | 'slate' | 'green' | 'amber';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'slate', className }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
  };

  return (
    <span className={cn('px-2 py-0.5 text-xs font-medium rounded border', styles[variant], className)}>
      {children}
    </span>
  );
};

export const Pill: React.FC<TagProps> = ({ children, variant = 'slate', className }) => {
  const styles = {
    blue: 'bg-blue-600 text-white',
    slate: 'bg-slate-800 text-white',
    green: 'bg-emerald-600 text-white',
    amber: 'bg-amber-600 text-white',
  };

  return (
    <span className={cn('px-3 py-1 text-xs font-semibold rounded-full shadow-soft-xs', styles[variant], className)}>
      {children}
    </span>
  );
};
