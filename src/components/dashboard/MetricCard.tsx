import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  isCurrency?: boolean;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
  badge?: string;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'rose' | 'slate';
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-50/70',
    border: 'border-blue-200/60',
    iconBg: 'bg-blue-100 text-blue-700',
    text: 'text-blue-600',
  },
  emerald: {
    bg: 'bg-emerald-50/70',
    border: 'border-emerald-200/60',
    iconBg: 'bg-emerald-100 text-emerald-700',
    text: 'text-emerald-600',
  },
  amber: {
    bg: 'bg-amber-50/70',
    border: 'border-amber-200/60',
    iconBg: 'bg-amber-100 text-amber-700',
    text: 'text-amber-600',
  },
  indigo: {
    bg: 'bg-indigo-50/70',
    border: 'border-indigo-200/60',
    iconBg: 'bg-indigo-100 text-indigo-700',
    text: 'text-indigo-600',
  },
  rose: {
    bg: 'bg-rose-50/70',
    border: 'border-rose-200/60',
    iconBg: 'bg-rose-100 text-rose-700',
    text: 'text-rose-600',
  },
  slate: {
    bg: 'bg-slate-50/70',
    border: 'border-slate-200/60',
    iconBg: 'bg-slate-100 text-slate-700',
    text: 'text-slate-700',
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  isCurrency = false,
  icon,
  trend,
  subtitle,
  badge,
  colorScheme = 'blue',
}) => {
  const styles = colorStyles[colorScheme];

  return (
    <Card className={cn('transition-all hover:shadow-soft-md border', styles.border)}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
          <div className={cn('p-2 rounded-xl text-sm font-bold', styles.iconBg)}>{icon}</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              <AnimatedCounter value={value} isCurrency={isCurrency} />
            </span>
            {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
            {trend && (
              <span
                className={cn(
                  'font-bold px-1.5 py-0.5 rounded-md text-[10px]',
                  trend.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                )}
              >
                {trend.value}
              </span>
            )}
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200/60">
                {badge}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
