import React from 'react';
import { useWizardStore } from '../../store/useWizardStore';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';
import { Card, CardContent } from '../../components/ui/Card';
import { ProgressIndicator } from '../../components/common/ProgressIndicator';
import { Building2, DollarSign, Layers, HardHat, Compass, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

export const LivePreviewPanel: React.FC = () => {
  const {
    currentStep,
    totalSteps,
    city,
    authority,
    houseType,
    floors,
    qualityTier,
    calculatedBuildableAreaSqFt,
    calculatedCostINR,
    calculatedSteelTonnes,
    calculatedCementBags,
  } = useWizardStore();

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <aside className="w-full lg:w-[380px] xl:w-[420px] bg-white border border-slate-200/80 rounded-2xl p-6 shadow-soft-md shrink-0 space-y-6 self-start sticky top-24">
      {/* Header & Progress */}
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Live Project Estimate</h3>
              <p className="text-[11px] text-slate-400 font-medium">Real-time Engineering Calculation</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-extrabold bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
            {progressPercentage}% Complete
          </span>
        </div>
        <ProgressIndicator value={progressPercentage} size="sm" color="bg-blue-600" />
      </div>

      {/* House Schematic Illustration */}
      <div className="relative h-44 w-full bg-slate-900 rounded-xl overflow-hidden p-4 flex flex-col justify-between text-white border border-slate-800 shadow-soft-sm">
        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] font-extrabold tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded uppercase">
            {houseType} • G+{floors - 1}
          </span>
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {qualityTier} Grade
          </span>
        </div>

        {/* Vector SVG Vector Architectural House Illustration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 100 H180" stroke="#38BDF8" strokeWidth="2" />
            <rect x="40" y="40" width="120" height="60" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="30,40 100,10 170,40" stroke="#38BDF8" strokeWidth="2" />
            <line x1="100" y1="40" x2="100" y2="100" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>

        <div className="z-10 space-y-0.5">
          <span className="text-[11px] text-slate-400 font-medium">{city} ({authority} Authority)</span>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            <AnimatedCounter value={calculatedCostINR} isCurrency />
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Built-Up Area</span>
          <div className="text-base font-extrabold text-slate-900">
            <AnimatedCounter value={calculatedBuildableAreaSqFt} /> <span className="text-xs font-medium text-slate-500">Sq Ft</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Steel</span>
          <div className="text-base font-extrabold text-blue-600">
            {calculatedSteelTonnes} <span className="text-xs font-medium text-slate-500">Tonnes</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Cement</span>
          <div className="text-base font-extrabold text-slate-900">
            <AnimatedCounter value={calculatedCementBags} /> <span className="text-xs font-medium text-slate-500">Bags</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quality Grade</span>
          <div className="text-base font-extrabold text-emerald-600">{qualityTier}</div>
        </div>
      </div>

      {/* Instant Impact Assurance */}
      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-emerald-900 text-xs flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Every choice updates your BOQ & budget in real time.</span>
      </div>
    </aside>
  );
};
