import React from 'react';
import { useWizardStore, QualityTier } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Check, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const Step7QualityTier: React.FC = () => {
  const { qualityTier, setQualityTier } = useWizardStore();

  const tiers: { id: QualityTier; title: string; rate: string; desc: string; materials: string[]; idealFor: string }[] = [
    {
      id: 'Essential',
      title: 'Essential Standard',
      rate: '₹2,200 / Sq Ft',
      desc: 'High-durability structural inputs with standard branded finishing materials.',
      materials: ['Zuar/Coromandel Cement', 'Fe 500 Steel', 'Vitrified Tiles (2x2 ft)', 'Jaguar Basic Fittings', 'Tractor Emulsion'],
      idealFor: 'Rental income properties & budget-conscious home builds.',
    },
    {
      id: 'Premium',
      title: 'Premium Quality',
      rate: '₹2,650 / Sq Ft',
      desc: 'Top-tier structural engineering with luxury finishing materials and concealed fittings.',
      materials: ['UltraTech OPC 53 Cement', 'Tata Tiscon Fe 550D Steel', 'GVT Tiles (800x1600mm)', 'Kohler Sanitaryware', 'Asian Royale Paint'],
      idealFor: 'Recommended for 85% of luxury single-family homes.',
    },
    {
      id: 'Luxury',
      title: 'Ultra Luxury Grade',
      rate: '₹3,400 / Sq Ft',
      desc: 'Uncompromising Italian marble, custom teakwood joinery, and smart home automation.',
      materials: ['UltraTech Weather-Plus Cement', 'JSW Neosteel Fe 550D', 'Italian Statuario Marble', 'Grohe Thermostatic Mixers', 'Legrand Smart Touch'],
      idealFor: 'Bespoke luxury villa residences & architectural showpieces.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 7: Quality Specification Grade</h2>
        <p className="text-xs text-slate-500 mt-1">
          Choose your finishing grade. Structural safety (RCC/Steel) is maintained at maximum IS 456 standards across all tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => {
          const isSelected = qualityTier === t.id;
          return (
            <Card
              key={t.id}
              onClick={() => setQualityTier(t.id)}
              className={cn(
                'p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 relative',
                isSelected
                  ? 'bg-blue-50/50 border-blue-600 shadow-soft-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{t.rate}</span>
                    <h3 className="text-base font-extrabold text-slate-900">{t.title}</h3>
                  </div>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors',
                      isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 text-transparent'
                    )}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Included Brands:</span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {t.materials.map((mat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium italic">
                {t.idealFor}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
