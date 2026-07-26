import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: React.ReactNode;
  iconBgColor?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden hover:shadow-soft-md transition-shadow', className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
          {icon && (
            <div className={cn('p-2.5 rounded-lg flex items-center justify-center', iconBgColor)}>
              {icon}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
          {trend && (
            <div
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold gap-1',
                trend.isNeutral
                  ? 'bg-slate-100 text-slate-600'
                  : trend.isPositive
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-rose-50 text-rose-700 border border-rose-200/60'
              )}
            >
              {trend.isNeutral ? (
                <Minus className="w-3 h-3" />
              ) : trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.value}
            </div>
          )}
        </div>

        {subtext && <p className="mt-1 text-xs text-slate-500 font-normal">{subtext}</p>}
      </CardContent>
    </Card>
  );
};
