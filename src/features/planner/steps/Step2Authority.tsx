import React from 'react';
import { useWizardStore, AuthorityOption } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Check, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const Step2Authority: React.FC = () => {
  const { authority, setAuthority } = useWizardStore();

  const authorities: { id: AuthorityOption; name: string; timeline: string; setback: string; rules: string }[] = [
    {
      id: 'BBMP',
      name: 'BBMP (Bruhat Bengaluru Mahanagara Palike)',
      timeline: '30 - 45 Days Approval',
      setback: '8% Front / 10% Rear Setback',
      rules: 'FAR 1.75 - 2.25 based on road width (30ft+). Rainwater harvesting mandatory.',
    },
    {
      id: 'BDA',
      name: 'BDA (Bangalore Development Authority)',
      timeline: '45 - 60 Days Approval',
      setback: '10% Mandatory Setbacks',
      rules: 'Strict layout compliance. Structural stability certificate & NOC required.',
    },
    {
      id: 'Gram Panchayat',
      name: 'Gram Panchayat (Panchayat Limits)',
      timeline: '15 - 20 Days Approval',
      setback: 'Flexible Setbacks',
      rules: '9/11 Form conversion required. Lower scrutiny fees with local sanction.',
    },
    {
      id: 'Future Ready',
      name: 'Future Ready (Self-Sanction Baseline)',
      timeline: 'Instant Pre-Approval',
      setback: 'Standard 1.5m Setback',
      rules: 'High-density urban layout design optimized for loan pre-sanction.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 2: Municipal Sanction Authority</h2>
        <p className="text-xs text-slate-500 mt-1">
          Authority bylaws define your maximum Floor Area Ratio (FAR) and setback requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {authorities.map((item) => {
          const isSelected = authority === item.id;
          return (
            <Card
              key={item.id}
              onClick={() => setAuthority(item.id)}
              className={cn(
                'p-5 cursor-pointer transition-all duration-200 space-y-3 relative',
                isSelected
                  ? 'bg-blue-50/50 border-blue-600 shadow-soft-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                <div
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors shrink-0',
                    isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 text-transparent'
                  )}
                >
                  <Check className="w-3 h-3" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.rules}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] font-semibold">
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span>{item.timeline}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <FileCheck className="w-3 h-3 text-emerald-600" />
                  <span>{item.setback}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
