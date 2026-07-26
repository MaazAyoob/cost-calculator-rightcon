import React from 'react';
import { useWizardStore } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Maximize2, MoveHorizontal, MoveVertical, Layers } from 'lucide-react';

export const Step3PlotDetails: React.FC = () => {
  const { plotLength, plotWidth, setPlotDimensions, calculatedAreaSqFt, calculatedBuildableAreaSqFt } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 3: Plot Dimensions & Boundaries</h2>
        <p className="text-xs text-slate-500 mt-1">
          Adjust plot length and width. Real-time FAR math calculates approximate buildable footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders & Controls */}
        <Card className="p-6 space-y-6">
          {/* Plot Length Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <MoveVertical className="w-4 h-4 text-blue-600" /> Plot Length (Depth)
              </span>
              <span className="text-blue-600 text-sm font-extrabold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {plotLength} Feet
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={120}
              step={1}
              value={plotLength}
              onChange={(e) => setPlotDimensions(Number(e.target.value), plotWidth)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>20 Ft</span>
              <span>60 Ft (Standard)</span>
              <span>120 Ft</span>
            </div>
          </div>

          {/* Plot Width Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <MoveHorizontal className="w-4 h-4 text-blue-600" /> Plot Width (Facing)
              </span>
              <span className="text-blue-600 text-sm font-extrabold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {plotWidth} Feet
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={1}
              value={plotWidth}
              onChange={(e) => setPlotDimensions(plotLength, Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>20 Ft</span>
              <span>40 Ft (Standard)</span>
              <span>100 Ft</span>
            </div>
          </div>

          {/* Calculated Summary */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Plot Area</span>
              <span className="text-base font-extrabold text-slate-900">{calculatedAreaSqFt} Sq Ft</span>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60">
              <span className="text-[10px] text-blue-600 font-semibold uppercase block">Buildable Footprint</span>
              <span className="text-base font-extrabold text-blue-700">~{calculatedBuildableAreaSqFt} Sq Ft</span>
            </div>
          </div>
        </Card>

        {/* Visual Plot Diagram */}
        <Card className="p-6 bg-slate-900 text-white flex flex-col justify-between overflow-hidden relative">
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Plot Footprint Schematic</span>
            <span className="text-xs font-extrabold text-blue-400">{plotWidth}' x {plotLength}'</span>
          </div>

          <div className="my-6 flex items-center justify-center relative">
            <svg viewBox="0 0 240 180" className="w-full h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Boundary */}
              <rect x="30" y="20" width="180" height="140" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" rx="4" />
              <text x="100" y="15" fill="#94A3B8" fontSize="10" fontWeight="700">{plotWidth} FT</text>
              <text x="5" y="95" fill="#94A3B8" fontSize="10" fontWeight="700">{plotLength} FT</text>

              {/* Inner Built Footprint */}
              <rect x="50" y="40" width="140" height="100" fill="#2563EB" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="2" rx="4" />
              <text x="75" y="95" fill="#FFFFFF" fontSize="11" fontWeight="800">BUILT AREA (~80%)</text>
            </svg>
          </div>

          <div className="text-[11px] text-slate-400 z-10 flex justify-between">
            <span>Road Facing: East</span>
            <span>Setback Buffer: ~10%</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
