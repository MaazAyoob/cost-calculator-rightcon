import React from 'react';
import { useWizardStore, HouseType } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Check, Home, Building2, Layers, ShieldCheck } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const Step4HouseConfig: React.FC = () => {
  const { houseType, floors, setHouseConfig } = useWizardStore();

  const types: { id: HouseType; title: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'Villa', title: 'Luxury Villa', desc: 'Single family luxury residence with double-height living & private garden.', icon: <Home className="w-5 h-5" /> },
    { id: 'Duplex', title: 'Independent Duplex', desc: '2-Level modern duplex with internal wooden/marble staircase.', icon: <Building2 className="w-5 h-5" /> },
    { id: 'Triplex', title: 'Triplex Mansion', desc: '3-Level grand residence featuring terrace sky deck & home theater.', icon: <Layers className="w-5 h-5" /> },
    { id: 'Rental', title: 'Multi-Tenant Rental', desc: 'Optimized floor plan with independent 2BHK/1BHK rental units per floor.', icon: <Building2 className="w-5 h-5" /> },
    { id: 'Mixed Use', title: 'Commercial + Residential', desc: 'Ground floor retail/office shop space with upper residential quarters.', icon: <Building2 className="w-5 h-5" /> },
  ];

  const floorOptions = [
    { count: 1, label: 'Ground Only (G)', desc: 'Single floor horizontal residence.' },
    { count: 2, label: 'G + 1 Floor', desc: 'Standard 2-storey home.' },
    { count: 3, label: 'G + 2 Floors', desc: 'Triplex or Ground + 2 Units.' },
    { count: 4, label: 'G + 3 Floors', desc: 'Maximum allowable urban elevation.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 4: House Type & Floor Count</h2>
        <p className="text-xs text-slate-500 mt-1">
          Select overall architectural configuration and vertical storey count.
        </p>
      </div>

      {/* House Type Selection */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Residence Style</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {types.map((t) => {
            const isSelected = houseType === t.id;
            return (
              <Card
                key={t.id}
                onClick={() => setHouseConfig(t.id, floors)}
                className={cn(
                  'p-4 cursor-pointer transition-all duration-200 space-y-2 relative',
                  isSelected
                    ? 'bg-blue-50/50 border-blue-600 shadow-soft-sm ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                )}
              >
                <div className="flex justify-between items-center">
                  <div className={cn('p-2 rounded-lg', isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600')}>
                    {t.icon}
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <h4 className="text-xs font-bold text-slate-900">{t.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{t.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floor Elevation Selection */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Number of Storeys</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {floorOptions.map((f) => {
            const isSelected = floors === f.count;
            return (
              <Card
                key={f.count}
                onClick={() => setHouseConfig(houseType, f.count)}
                className={cn(
                  'p-4 cursor-pointer transition-all duration-200 space-y-2 text-center',
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-soft-md'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                )}
              >
                <div className="text-lg font-extrabold">{f.label}</div>
                <p className={cn('text-[11px]', isSelected ? 'text-blue-100' : 'text-slate-500')}>{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
