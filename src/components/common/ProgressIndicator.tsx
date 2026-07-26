import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressIndicatorProps {
  value: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: string;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  size = 'md',
  showLabel = false,
  color = 'bg-blue-600',
  className,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-slate-600">
          <span>Progress</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60', heights[size])}>
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', color)}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
