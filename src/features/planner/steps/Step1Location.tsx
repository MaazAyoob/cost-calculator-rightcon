import React from 'react';
import { useWizardStore, CityLocation } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Check, MapPin, Building, Sparkles } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const Step1Location: React.FC = () => {
  const { city, setCity } = useWizardStore();

  const cities: { id: CityLocation; name: string; tag: string; index: string; desc: string }[] = [
    {
      id: 'Bangalore',
      name: 'Bengaluru Urban & Rural',
      tag: 'Tier 1 Metro',
      index: 'Base Rate + 5%',
      desc: 'High demand zone. Standard BBMP/BDA bylaws apply with regional RMC plant network.',
    },
    {
      id: 'Mysore',
      name: 'Mysuru Cultural Zone',
      tag: 'Tier 2 Heritage',
      index: 'Standard Base Rate',
      desc: 'MUDA guidelines with optimized transportation and local granite quarry access.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 1: Select Project Location</h2>
        <p className="text-xs text-slate-500 mt-1">
          Construction material pricing and labor rates vary according to regional supply chain indices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cities.map((item) => {
          const isSelected = city === item.id;
          return (
            <Card
              key={item.id}
              onClick={() => setCity(item.id)}
              className={cn(
                'p-6 cursor-pointer transition-all duration-200 space-y-4 relative overflow-hidden',
                isSelected
                  ? 'bg-blue-50/50 border-blue-600 shadow-soft-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={cn('p-2.5 rounded-xl', isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600')}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <span className="text-[11px] font-semibold text-blue-600">{item.tag}</span>
                  </div>
                </div>

                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                    isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 text-transparent'
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-200/60">
                {item.desc}
              </p>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-semibold">
                <span className="text-slate-400 text-[11px]">Cost Index:</span>
                <span className="text-slate-900">{item.index}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
