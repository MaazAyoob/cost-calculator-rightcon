import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/cn';

export interface ChartContainerProps {
  type: 'pie' | 'donut' | 'line' | 'bar' | 'area';
  data: any[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
  height?: number;
}

const defaultColors = ['#2563EB', '#16A34A', '#F59E0B', '#93C5FD', '#8B5CF6', '#EC4899'];

export const ChartContainer: React.FC<ChartContainerProps> = ({
  type,
  data,
  dataKey = 'value',
  nameKey = 'name',
  colors = defaultColors,
  height = 280,
}) => {
  if (type === 'pie' || type === 'donut') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={type === 'donut' ? 60 : 0}
            outerRadius={90}
            paddingAngle={4}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val: number) => formatCurrency(val)} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey={nameKey} stroke="#64748B" fontSize={11} />
          <YAxis stroke="#64748B" fontSize={11} />
          <Tooltip formatter={(val: number) => formatCurrency(val)} />
          <Line type="monotone" dataKey={dataKey} stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey={nameKey} stroke="#64748B" fontSize={11} />
          <YAxis stroke="#64748B" fontSize={11} />
          <Tooltip formatter={(val: number) => formatCurrency(val)} />
          <Bar dataKey={dataKey} fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Area chart fallback
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey={nameKey} stroke="#64748B" fontSize={11} />
        <YAxis stroke="#64748B" fontSize={11} />
        <Tooltip formatter={(val: number) => formatCurrency(val)} />
        <Area type="monotone" dataKey={dataKey} stroke="#2563EB" fill="#DBEAFE" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
