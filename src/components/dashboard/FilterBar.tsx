import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const PRIORITY_OPTIONS: Array<'All' | 'Standard' | 'Premium' | 'Luxury'> = ['All', 'Standard', 'Premium', 'Luxury'];

const MATERIAL_OPTIONS = [
  'All', 'Steel', 'Cement', 'Concrete', 'AAC Blocks',
  'Rebar', 'Tiles', 'Paint', 'Plumbing', 'Electrical', 'Waterproofing',
];

const priorityColors: Record<string, string> = {
  All: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
  Standard: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  Premium: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  Luxury: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
};

const priorityActiveColors: Record<string, string> = {
  All: 'bg-slate-700 text-white border-slate-700',
  Standard: 'bg-emerald-600 text-white border-emerald-600',
  Premium: 'bg-blue-600 text-white border-blue-600',
  Luxury: 'bg-indigo-600 text-white border-indigo-600',
};

export const FilterBar: React.FC = () => {
  const {
    priorityFilter,
    materialFilter,
    setPriorityFilter,
    setMaterialFilter,
    searchQuery,
    setSearchQuery,
  } = useDashboardStore();

  const hasActiveFilters =
    priorityFilter !== 'All' || materialFilter !== 'All' || searchQuery !== '';

  const clearFilters = () => {
    setPriorityFilter('All');
    setMaterialFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="px-4 lg:px-6 py-3 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Icon + Label */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 shrink-0">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filters</span>
      </div>

      {/* Priority Filters */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {PRIORITY_OPTIONS.map((opt) => {
          const isActive = priorityFilter === opt;
          return (
            <button
              key={opt}
              onClick={() => setPriorityFilter(opt)}
              className={cn(
                'px-2.5 py-0.5 text-[11px] font-bold rounded-full border transition-all cursor-pointer',
                isActive ? priorityActiveColors[opt] : priorityColors[opt]
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="w-px h-4 bg-slate-200 hidden sm:block" />

      {/* Material Tag Filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {MATERIAL_OPTIONS.slice(0, 7).map((mat) => {
          const isActive = materialFilter === mat;
          return (
            <button
              key={mat}
              onClick={() => setMaterialFilter(mat)}
              className={cn(
                'px-2.5 py-0.5 text-[11px] font-semibold rounded-full border transition-all cursor-pointer',
                isActive
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              )}
            >
              {mat}
            </button>
          );
        })}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-700 ml-auto transition-colors"
        >
          <X className="w-3 h-3" />
          Clear All
        </button>
      )}
    </div>
  );
};
