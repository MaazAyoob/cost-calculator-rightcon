import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../store/useDashboardStore';
import { CONSTRUCTION_STAGES } from '../../constants/constructionStages';
import { Button } from '../ui/Button';
import { Tag } from '../common/Tag';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency } from '../../utils/cn';
import {
  X,
  GitCompare,
  DollarSign,
  Clock,
  Layers,
  Package,
  ChevronRight,
} from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const { compareActivityIds, isCompareDrawerOpen, clearCompare, setCompareDrawerOpen, setSelectedActivityId } =
    useDashboardStore();

  // Resolve activities from IDs
  const activities = compareActivityIds.map((id) => {
    for (const stage of CONSTRUCTION_STAGES) {
      const found = stage.activities.find((a) => a.id === id);
      if (found) return { activity: found, stage };
    }
    return null;
  }).filter(Boolean) as { activity: (typeof CONSTRUCTION_STAGES)[0]['activities'][0]; stage: typeof CONSTRUCTION_STAGES[0] }[];

  if (!isCompareDrawerOpen || activities.length < 1) return null;

  const [a, b] = activities;

  const metricRows = [
    {
      label: 'Estimated Cost',
      icon: <DollarSign className="w-3.5 h-3.5 text-blue-600" />,
      aVal: a ? formatCurrency(a.activity.estimatedCost) : '—',
      bVal: b ? formatCurrency(b.activity.estimatedCost) : '—',
    },
    {
      label: 'Est. Quantity',
      icon: <Package className="w-3.5 h-3.5 text-emerald-600" />,
      aVal: a?.activity.estimatedQuantity ?? '—',
      bVal: b?.activity.estimatedQuantity ?? '—',
    },
    {
      label: 'Est. Duration',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
      aVal: a?.activity.estimatedDuration ?? '—',
      bVal: b?.activity.estimatedDuration ?? '—',
    },
    {
      label: 'Quality Grade',
      icon: <Layers className="w-3.5 h-3.5 text-indigo-600" />,
      aVal: a?.activity.qualityIndicator ?? '—',
      bVal: b?.activity.qualityIndicator ?? '—',
    },
  ];

  return (
    <AnimatePresence>
      {isCompareDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setCompareDrawerOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200/80 shadow-soft-xl rounded-t-3xl overflow-hidden max-h-[70vh] flex flex-col"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <GitCompare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Activity Comparison</h3>
                  <p className="text-[11px] text-slate-400">
                    {compareActivityIds.length === 1
                      ? 'Select one more activity to compare'
                      : 'Side-by-side analysis'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={clearCompare}>
                  <X className="w-4 h-4" /> Clear
                </Button>
                <button
                  onClick={() => setCompareDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* Activity Names Row */}
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center">
                  Metric
                </div>
                <div
                  className="p-3 bg-blue-50 rounded-xl border border-blue-200/60 space-y-1 cursor-pointer hover:bg-blue-100/60 transition-colors"
                  onClick={() => a && setSelectedActivityId(a.activity.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-500 uppercase">{a?.stage.number} {a?.stage.title}</span>
                    <ChevronRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="font-bold text-slate-900 leading-snug">{a?.activity.title ?? 'Select Activity'}</div>
                  {a && (
                    <StatusBadge
                      status={a.activity.qualityIndicator === 'Luxury' ? 'info' : 'neutral'}
                      label={a.activity.qualityIndicator}
                    />
                  )}
                </div>
                <div
                  className={`p-3 rounded-xl border space-y-1 ${
                    b
                      ? 'bg-indigo-50 border-indigo-200/60 cursor-pointer hover:bg-indigo-100/60'
                      : 'bg-slate-50 border-dashed border-slate-300'
                  } transition-colors`}
                  onClick={() => b && setSelectedActivityId(b.activity.id)}
                >
                  {b ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase">{b.stage.number} {b.stage.title}</span>
                        <ChevronRight className="w-3 h-3 text-indigo-400" />
                      </div>
                      <div className="font-bold text-slate-900 leading-snug">{b.activity.title}</div>
                      <StatusBadge
                        status={b.activity.qualityIndicator === 'Luxury' ? 'info' : 'neutral'}
                        label={b.activity.qualityIndicator}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-2 text-center">
                      <span className="text-xs text-slate-400 font-medium">Click Compare on any card to add</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Metric Comparison Rows */}
              <div className="space-y-2">
                {metricRows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-4 text-xs items-center">
                    <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                      {row.icon}
                      <span>{row.label}</span>
                    </div>
                    <div className="p-2.5 bg-blue-50/60 rounded-lg font-bold text-slate-900 border border-blue-100">
                      {row.aVal}
                    </div>
                    <div className="p-2.5 bg-indigo-50/60 rounded-lg font-bold text-slate-900 border border-indigo-100">
                      {row.bVal}
                    </div>
                  </div>
                ))}
              </div>

              {/* Material Tags Comparison */}
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  Materials
                </div>
                <div className="flex flex-wrap gap-1">
                  {a?.activity.materialTags.map((tag, idx) => (
                    <Tag key={idx} variant="blue">{tag}</Tag>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {b?.activity.materialTags.map((tag, idx) => (
                    <Tag key={idx} variant="blue">{tag}</Tag>
                  )) ?? <span className="text-slate-400">—</span>}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
