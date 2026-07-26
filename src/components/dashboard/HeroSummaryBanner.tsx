import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../../store/useProjectStore';
import { useUIStore } from '../../store/useUIStore';
import { useCalculationStore } from '../../store/useCalculationStore';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { Button } from '../ui/Button';
import { StatusBadge } from '../common/StatusBadge';
import {
  MapPin, DollarSign, Building2, Calendar, ShieldCheck,
  Download, PhoneCall, Share2, RefreshCw, Layers, Package,
  Clock,
} from 'lucide-react';

export const HeroSummaryBanner: React.FC = () => {
  const navigate = useNavigate();
  const { project } = useProjectStore();
  const { openModal } = useUIStore();

  const { result } = useCalculationStore();
  const { budget, area, quantities, timeline, input } = result;

  const metrics = [
    {
      icon: <DollarSign className="w-3 h-3 text-blue-600" />,
      label: 'Total Cost',
      value: <AnimatedCounter value={budget.totalProjectCost} isCurrency />,
      highlight: true,
    },
    {
      icon: <Building2 className="w-3 h-3 text-emerald-600" />,
      label: 'Built-Up Area',
      value: (
        <>
          <AnimatedCounter value={area.totalBUASqFt} />
          <span className="text-xs font-semibold text-slate-500 ml-1">Sq Ft</span>
        </>
      ),
    },
    {
      icon: <Calendar className="w-3 h-3 text-amber-600" />,
      label: 'Timeline',
      value: (
        <>
          <AnimatedCounter value={timeline.totalMonths} />
          <span className="text-xs font-semibold text-slate-500 ml-1">Months</span>
        </>
      ),
    },
    {
      icon: <ShieldCheck className="w-3 h-3 text-indigo-600" />,
      label: 'Quality Tier',
      value: <span className="text-base sm:text-lg font-extrabold text-blue-600">{input.qualityTier}</span>,
    },
    {
      icon: <Layers className="w-3 h-3 text-slate-600" />,
      label: 'Steel (Tonnes)',
      value: (
        <>
          <AnimatedCounter value={quantities.steelTonnes} />
          <span className="text-xs font-semibold text-slate-500 ml-1">T</span>
        </>
      ),
    },
    {
      icon: <Package className="w-3 h-3 text-slate-600" />,
      label: 'Cement (Bags)',
      value: (
        <>
          <AnimatedCounter value={quantities.cementBags} />
        </>
      ),
    },
    {
      icon: <Clock className="w-3 h-3 text-slate-600" />,
      label: 'Plot Size',
      value: (
        <>
          <AnimatedCounter value={area.plotAreaSqFt} />
          <span className="text-xs font-semibold text-slate-500 ml-1">Sq Ft</span>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 px-4 lg:px-8 py-4 shadow-soft-xs">
      <div className="max-w-[1700px] mx-auto space-y-4">
        {/* Top Row: Identity + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Project Identity */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight">{project.name}</h1>
              <StatusBadge status="warning" label={project.status} />
              <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">Ref: {project.id}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {input.city}, Karnataka – {project.location.pincode}
              </span>
              <span>•</span>
              <span>{input.floors} Floors</span>
              <span>•</span>
              <span>{input.rooms.bedrooms}BHK + {input.rooms.bathrooms} Bath</span>
              <span>•</span>
              <span>Auth: {input.authority}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => navigate('/report')}
            >
              Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Share2 className="w-3.5 h-3.5" />}
              onClick={() => openModal('share')}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={() => navigate('/planner')}
            >
              New Plan
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
              onClick={() => openModal('consultation')}
            >
              Book Consultation
            </Button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60">
          {metrics.map((metric, idx) => (
            <div key={idx} className="space-y-0.5 px-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                {metric.icon} {metric.label}
              </span>
              <div className="text-base sm:text-lg font-extrabold text-slate-900 flex items-baseline flex-wrap">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
