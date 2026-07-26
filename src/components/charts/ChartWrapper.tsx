import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../utils/cn';

export interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  height?: number | string;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  action,
  children,
  height = 300,
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <CardTitle className="text-sm">{title}</CardTitle>
          {subtitle && <p className="text-xs text-slate-500 font-normal mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="p-4" style={{ height }}>
        {children}
      </CardContent>
    </Card>
  );
};
