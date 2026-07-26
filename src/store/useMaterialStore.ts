import { create } from 'zustand';
import { MaterialItem } from '../types';

interface MaterialState {
  materials: MaterialItem[];
  selectedCategoryFilter: string;
  updateMaterialTier: (id: string, tier: 'Standard' | 'Premium' | 'Luxury') => void;
  setCategoryFilter: (category: string) => void;
}

const defaultMaterials: MaterialItem[] = [
  // Structure
  { id: 'mat-1', category: 'Structure', name: 'OPC 53 Grade Cement', brand: 'UltraTech / ACC', unit: 'Bags', estimatedQuantity: 1450, ratePerUnit: 420, totalCost: 609000, specification: 'High strength Portland cement for RCC slabs & columns', selectedTier: 'Premium' },
  { id: 'mat-2', category: 'Structure', name: 'TMT Steel Bars (Fe 550D)', brand: 'Tata Tiscon / JSW', unit: 'Tonnes', estimatedQuantity: 18.5, ratePerUnit: 64000, totalCost: 1184000, specification: 'Corrosion resistant thermo-mechanically treated bars', selectedTier: 'Premium' },
  { id: 'mat-3', category: 'Structure', name: 'AAC Blocks (6 inch)', brand: 'Birla Aerocon', unit: 'Cubic Metres', estimatedQuantity: 120, ratePerUnit: 3800, totalCost: 456000, specification: 'Lightweight thermal insulated masonry blocks', selectedTier: 'Premium' },
  { id: 'mat-4', category: 'Structure', name: 'M25 Ready Mix Concrete', brand: 'UltraTech RMC / ACC Concrete', unit: 'Cubic Metres', estimatedQuantity: 280, ratePerUnit: 4800, totalCost: 1344000, specification: 'Design mix RMC for foundation & superstructure slabs', selectedTier: 'Premium' },
  { id: 'mat-5', category: 'Structure', name: 'Coarse River Sand / M-Sand', brand: 'Karnataka Mining Authorized', unit: 'Cubic Feet', estimatedQuantity: 4200, ratePerUnit: 65, totalCost: 273000, specification: 'Double-washed manufactured sand for plaster & RCC', selectedTier: 'Standard' },

  // Finishing
  { id: 'mat-6', category: 'Finishing', name: 'Italian Marble Flooring', brand: 'Bottochino / Statuario', unit: 'Sq Ft', estimatedQuantity: 2200, ratePerUnit: 450, totalCost: 990000, specification: 'Polished premium natural marble slab tiles', selectedTier: 'Luxury' },
  { id: 'mat-7', category: 'Finishing', name: 'Exterior Weatherproof Paint', brand: 'Asian Paints Apex Ultima', unit: 'Litres', estimatedQuantity: 350, ratePerUnit: 520, totalCost: 182000, specification: 'Dustproof silicone enriched exterior emulsion', selectedTier: 'Premium' },
  { id: 'mat-8', category: 'Finishing', name: 'Vitrified Living Room Tiles (4x2 ft)', brand: 'Kajaria / Somany', unit: 'Sq Ft', estimatedQuantity: 1600, ratePerUnit: 140, totalCost: 224000, specification: 'Double-charged stain resistant vitrified tiles', selectedTier: 'Premium' },
  { id: 'mat-9', category: 'Finishing', name: 'Internal Royale Emulsion Paint', brand: 'Asian Paints Royale Luxury', unit: 'Litres', estimatedQuantity: 480, ratePerUnit: 680, totalCost: 326400, specification: 'Teflon surface protector washable sheen emulsion', selectedTier: 'Luxury' },
  { id: 'mat-10', category: 'Finishing', name: 'Gypsum False Ceiling Boards', brand: 'Saint-Gobain Gyproc', unit: 'Sq Ft', estimatedQuantity: 2800, ratePerUnit: 110, totalCost: 308000, specification: '12.5mm moisture resistant false ceiling gypsum sheets', selectedTier: 'Premium' },

  // MEP
  { id: 'mat-11', category: 'MEP', name: 'FRLS Copper Wiring', brand: 'Havells / Polycab', unit: 'Metres', estimatedQuantity: 3200, ratePerUnit: 85, totalCost: 272000, specification: 'Flame retardant low smoke 99.97% pure copper conductors', selectedTier: 'Premium' },
  { id: 'mat-12', category: 'MEP', name: 'CPVC Plumbing Pipes & Fittings', brand: 'Astral / Ashirvad', unit: 'Metres', estimatedQuantity: 850, ratePerUnit: 220, totalCost: 187000, specification: 'SDR 11 hot & cold water pressure resistant pipes', selectedTier: 'Premium' },
  { id: 'mat-13', category: 'MEP', name: 'Modular Distribution Boards & MCBs', brand: 'Schneider Electric / Legrand', unit: 'Units', estimatedQuantity: 4, ratePerUnit: 24000, totalCost: 96000, specification: 'IP43 enclosed distribution boards with RCCB protection', selectedTier: 'Luxury' },
  { id: 'mat-14', category: 'MEP', name: 'SWR Sewage Drainage Pipes', brand: 'Supreme / Prince', unit: 'Metres', estimatedQuantity: 420, ratePerUnit: 340, totalCost: 142800, specification: 'Ring-fit rubber gasket soil waste & rainwater pipes', selectedTier: 'Standard' },

  // Fixtures
  { id: 'mat-15', category: 'Fixtures', name: 'CP & Sanitaryware Fittings', brand: 'Kohler / Grohe', unit: 'Sets', estimatedQuantity: 5, ratePerUnit: 95000, totalCost: 475000, specification: 'Concealed thermostatic mixers and wall-hung closets', selectedTier: 'Luxury' },
  { id: 'mat-16', category: 'Fixtures', name: 'Modular Switches & Sockets', brand: 'Legrand Arteor / Schneider', unit: 'Modules', estimatedQuantity: 240, ratePerUnit: 480, totalCost: 115200, specification: 'Glass finish modular touch plates & USB charging ports', selectedTier: 'Luxury' },
  { id: 'mat-17', category: 'Fixtures', name: 'LED Concealed Architectural Lights', brand: 'Philips / Havells LED', unit: 'Units', estimatedQuantity: 110, ratePerUnit: 850, totalCost: 93500, specification: 'CRI>90 warm white dimmable ceiling spotlights', selectedTier: 'Premium' },

  // Joinery
  { id: 'mat-18', category: 'Joinery', name: 'Teak Wood Main Door & Frame', brand: 'Burma Teak Wood Custom', unit: 'Sets', estimatedQuantity: 1, ratePerUnit: 145000, totalCost: 145000, specification: 'First grade solid Burma teak frame with 45mm carved shutter', selectedTier: 'Luxury' },
  { id: 'mat-19', category: 'Joinery', name: 'UPVC Double Glazed Windows', brand: 'Fenesta / Kommerling', unit: 'Sq Ft', estimatedQuantity: 480, ratePerUnit: 780, totalCost: 374400, specification: 'Multichamber sound-insulated sliding UPVC windows with mosquito mesh', selectedTier: 'Premium' },
  { id: 'mat-20', category: 'Joinery', name: 'Flush Internal Doors', brand: 'Greenlam / CenturyPly', unit: 'Sets', estimatedQuantity: 10, ratePerUnit: 18500, totalCost: 185000, specification: 'BWP grade marine plywood flush doors with veneer finish', selectedTier: 'Premium' },
];

export const useMaterialStore = create<MaterialState>((set) => ({
  materials: defaultMaterials,
  selectedCategoryFilter: 'All',

  updateMaterialTier: (id, tier) =>
    set((state) => ({
      materials: state.materials.map((mat) => (mat.id === id ? { ...mat, selectedTier: tier } : mat)),
    })),

  setCategoryFilter: (category) => set({ selectedCategoryFilter: category }),
}));
