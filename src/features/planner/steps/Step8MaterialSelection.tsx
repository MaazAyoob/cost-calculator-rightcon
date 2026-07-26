import React, { useState } from 'react';
import { useWizardStore, MaterialBrandSelection } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Modal } from '../../../components/modals/Modal';
import { useUIStore } from '../../../store/useUIStore';
import { Button } from '../../../components/ui/Button';
import { Check, Layers, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface BrandOption {
  name: string;
  features: string;
  warranty: string;
  costDelta: string;
}

const BRAND_CATALOG: Record<keyof MaterialBrandSelection, BrandOption[]> = {
  steel: [
    { name: 'Tata Tiscon Fe 550D', features: 'Super-ductile seismic resistant TMT bars', warranty: 'IS 1786 Certified', costDelta: 'Base Price' },
    { name: 'JSW Neosteel Fe 550D', features: 'Purity grade virgin steel with anti-corrosion coating', warranty: 'IS 1786 Certified', costDelta: '+ ₹1.5/kg' },
    { name: 'SAIL Fe 500D TMT', features: 'Public sector high-tensile structural steel', warranty: 'IS 1786 Certified', costDelta: '- ₹2.0/kg' },
  ],
  cement: [
    { name: 'UltraTech OPC 53', features: 'High early strength Portland cement for RCC slabs', warranty: 'IS 12269 Certified', costDelta: 'Base Price' },
    { name: 'ACC Concrete+ Gold', features: 'Water-repellent micro-particle cement for foundations', warranty: 'IS 1489 Certified', costDelta: '+ ₹15/bag' },
    { name: 'Birla Super OPC 53', features: 'Quick-setting structural concrete cement', warranty: 'IS 12269 Certified', costDelta: '- ₹10/bag' },
  ],
  doors: [
    { name: 'Teakwood Custom Joinery', features: 'Solid Burma teakwood main door frame & shutters', warranty: '25 Year Warranty', costDelta: 'Base Price' },
    { name: 'CenturyPly Flush Doors', features: 'Boiling waterproof marine grade flush doors', warranty: '15 Year Warranty', costDelta: '- ₹45,000 Total' },
  ],
  windows: [
    { name: 'Fenesta uPVC Double Glaze', features: 'Soundproof & thermal insulated German UPVC frames', warranty: '10 Year Warranty', costDelta: 'Base Price' },
    { name: 'Jindal Powder Coated Aluminum', features: 'Anodized slim-profile sliding window frames', warranty: '7 Year Warranty', costDelta: '- ₹35,000 Total' },
  ],
  flooring: [
    { name: 'Italian Marble Statuario', features: 'Polished 20mm natural white Italian marble slabs', warranty: 'Lifetime Polish', costDelta: 'Base Price' },
    { name: 'Kajaria GVT Vitrified Tiles (800x1600mm)', features: 'Large format glaze vitrified tiles with 2mm epoxy joint', warranty: '10 Year Warranty', costDelta: '- ₹1,20,000 Total' },
  ],
  bathroom: [
    { name: 'Kohler Concealed Thermostatic', features: 'Wall-hung WCs & thermostatic rain shower diverters', warranty: '10 Year Warranty', costDelta: 'Base Price' },
    { name: 'Grohe Eurosmart Fittings', features: 'German engineered ceramic disc taps & mixers', warranty: '10 Year Warranty', costDelta: '+ ₹40,000 Total' },
  ],
  electrical: [
    { name: 'Schneider Electric & Finolex', features: 'Modular Arteor touch switches & FR-LSH copper wires', warranty: '12 Year Warranty', costDelta: 'Base Price' },
    { name: 'Legrand & Havells', features: 'Soft-close modular switches & flame-retardant wiring', warranty: '10 Year Warranty', costDelta: '- ₹15,000 Total' },
  ],
  paint: [
    { name: 'Asian Paints Royale Luxury', features: 'Teflon surface protector with low VOC washable emulsion', warranty: '8 Year Sheen', costDelta: 'Base Price' },
    { name: 'Dulux Velvet Touch', features: 'HD color velvet feel interior emulsion', warranty: '7 Year Sheen', costDelta: '- ₹20,000 Total' },
  ],
};

export const Step8MaterialSelection: React.FC = () => {
  const { materialBrands, setMaterialBrand } = useWizardStore();
  const { openModal, closeModal } = useUIStore();
  const [activeCategoryModal, setActiveCategoryModal] = useState<keyof MaterialBrandSelection | null>(null);

  const categories: { key: keyof MaterialBrandSelection; label: string; icon: string }[] = [
    { key: 'steel', label: 'TMT Steel Rebar', icon: '⚡' },
    { key: 'cement', label: 'Structural Cement', icon: '🧱' },
    { key: 'doors', label: 'Doors & Frames', icon: '🚪' },
    { key: 'windows', label: 'Windows & Glazing', icon: '🪟' },
    { key: 'flooring', label: 'Flooring Slabs', icon: '✨' },
    { key: 'bathroom', label: 'Bathroom Fixtures', icon: '🚿' },
    { key: 'electrical', label: 'Wiring & Switches', icon: '🔌' },
    { key: 'paint', label: 'Interior Paint', icon: '🎨' },
  ];

  const handleOpenBrandModal = (catKey: keyof MaterialBrandSelection) => {
    setActiveCategoryModal(catKey);
    openModal('brand_selector');
  };

  const handleSelectBrand = (brandName: string) => {
    if (activeCategoryModal) {
      setMaterialBrand(activeCategoryModal, brandName);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 8: Material & Brand Customization</h2>
        <p className="text-xs text-slate-500 mt-1">
          Select preferred manufacturer brands per material category. Updates live estimates instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const currentSelectedBrand = materialBrands[cat.key];
          return (
            <Card
              key={cat.key}
              onClick={() => handleOpenBrandModal(cat.key)}
              className="p-5 cursor-pointer hover:border-blue-500 transition-all flex items-center justify-between group bg-white border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{cat.label}</span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {currentSelectedBrand}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                <span>Change</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Brand Selection Modal */}
      <Modal modalId="brand_selector" title={`Select Brand Specification`}>
        {activeCategoryModal && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Choose manufacturer for {activeCategoryModal.toUpperCase()} category:</p>

            <div className="space-y-3">
              {BRAND_CATALOG[activeCategoryModal].map((opt) => {
                const isSelected = materialBrands[activeCategoryModal] === opt.name;
                return (
                  <div
                    key={opt.name}
                    onClick={() => handleSelectBrand(opt.name)}
                    className={cn(
                      'p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center',
                      isSelected
                        ? 'bg-blue-50 border-blue-600 shadow-soft-xs ring-1 ring-blue-500/30'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{opt.name}</h4>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">{opt.features}</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">{opt.warranty}</span>
                    </div>

                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      {opt.costDelta}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
