import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  badge?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  action,
  badge,
  className,
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6', className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-slate-500 max-w-2xl">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
};
