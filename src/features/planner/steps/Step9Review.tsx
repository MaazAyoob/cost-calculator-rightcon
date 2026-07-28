import React from 'react';
import { useWizardStore } from '../../../store/useWizardStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/cn';
import { Edit2, Sparkles, CheckCircle2, ShieldCheck, MapPin, Building2, Home } from 'lucide-react';

export const Step9Review: React.FC = () => {
  const {
    city,
    authority,
    plotLength,
    plotWidth,
    houseType,
    floors,
    parkingType,
    carCount,
    bikeCount,
    evCharging,
    liftRequired,
    rooms,
    qualityTier,
    materialBrands,
    calculatedBuildableAreaSqFt,
    calculatedCostINR,
    calculatedSteelTonnes,
    calculatedCementBags,
    setStep,
  } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 9: Complete Specification Review</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review all configured parameters before generating your final BOQ and financial dashboard.
        </p>
      </div>

      {/* Hero Summary Card */}
      <Card className="p-6 bg-slate-900 text-white shadow-soft-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">Cost Calculator Spec</span>
            <h3 className="text-xl font-bold">{houseType} • G+{floors - 1} Elevation</h3>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold w-fit">
            {qualityTier} Grade
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Total BOQ Cost</span>
            <span className="text-lg font-extrabold text-white">{formatCurrency(calculatedCostINR)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Built-Up Area</span>
            <span className="text-lg font-extrabold text-white">{calculatedBuildableAreaSqFt} Sq Ft</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Steel Rebar</span>
            <span className="text-lg font-extrabold text-blue-400">{calculatedSteelTonnes} Tonnes</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Cement Bags</span>
            <span className="text-lg font-extrabold text-white">{calculatedCementBags} Bags</span>
          </div>
        </div>
      </Card>

      {/* Review Details Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Location & Authority */}
        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Location & Sanction</span>
            <button onClick={() => setStep(1)} className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between"><span>City Location:</span> <strong className="text-slate-900">{city}</strong></div>
            <div className="flex justify-between"><span>Sanction Authority:</span> <strong className="text-slate-900">{authority}</strong></div>
          </div>
        </Card>

        {/* Plot & House Config */}
        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Plot & Elevation</span>
            <button onClick={() => setStep(3)} className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between"><span>Plot Size:</span> <strong className="text-slate-900">{plotWidth}' x {plotLength}' ({plotWidth * plotLength} Sq Ft)</strong></div>
            <div className="flex justify-between"><span>House Type & Floors:</span> <strong className="text-slate-900">{houseType} (G+{floors - 1})</strong></div>
          </div>
        </Card>

        {/* Parking & Tech */}
        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Parking & Amenities</span>
            <button onClick={() => setStep(5)} className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between"><span>Parking Type:</span> <strong className="text-slate-900">{parkingType}</strong></div>
            <div className="flex justify-between"><span>Vehicles:</span> <strong className="text-slate-900">{carCount} Cars • {bikeCount} Bikes</strong></div>
            <div className="flex justify-between"><span>EV Charging & Lift:</span> <strong className="text-slate-900">{evCharging ? 'EV Ready' : 'No EV'} • {liftRequired ? 'Lift Installed' : 'No Lift'}</strong></div>
          </div>
        </Card>

        {/* Room Counts */}
        <Card className="p-4 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Room Allocation</span>
            <button onClick={() => setStep(6)} className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between"><span>Bedrooms & Bathrooms:</span> <strong className="text-slate-900">{rooms.bedrooms} BHK • {rooms.bathrooms} Baths</strong></div>
            <div className="flex justify-between"><span>Living & Dining:</span> <strong className="text-slate-900">{rooms.living} Living • {rooms.dining} Dining</strong></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
