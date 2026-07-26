// ============================================================
// BRAND DATABASE
// Complete brand catalogue with unit pricing per quality tier
// ============================================================

export interface BrandOption {
  name: string;
  qualityTier: 'Essential' | 'Premium' | 'Luxury';
  unitRate?: number;
  description: string;
  warranty?: string;
}

export interface BrandCategory {
  id: string;
  label: string;
  unit: string;
  brands: BrandOption[];
}

export const BRAND_DATABASE: BrandCategory[] = [
  {
    id: 'steel',
    label: 'Steel (TMT Bars)',
    unit: 'per tonne',
    brands: [
      { name: 'JSW Neo Steel Fe 550D',      qualityTier: 'Essential', unitRate: 58000, description: 'High ductility seismic grade bar', warranty: '5 yr' },
      { name: 'Kamdhenu Fe 500D',            qualityTier: 'Essential', unitRate: 55000, description: 'Cold twisted deformed bar', warranty: '3 yr' },
      { name: 'Tata Tiscon Fe 550D',         qualityTier: 'Premium',   unitRate: 64000, description: 'Gold standard TMT, high ductility', warranty: '10 yr' },
      { name: 'SAIL TMT Fe 550D',            qualityTier: 'Premium',   unitRate: 62000, description: 'Public sector quality bar', warranty: '7 yr' },
      { name: 'Tata Tiscon Super Fe 600',    qualityTier: 'Luxury',    unitRate: 72000, description: 'Ultra high strength seismic grade', warranty: '15 yr' },
    ],
  },
  {
    id: 'cement',
    label: 'Cement (OPC/PPC)',
    unit: 'per 50 kg bag',
    brands: [
      { name: 'Dalmia PPC',                   qualityTier: 'Essential', unitRate: 380, description: 'Portland Pozzolana Cement' },
      { name: 'Ramco Supergrade',              qualityTier: 'Essential', unitRate: 395, description: 'Economical general purpose' },
      { name: 'ACC OPC 53',                    qualityTier: 'Premium',   unitRate: 410, description: '53-grade Ordinary Portland Cement' },
      { name: 'UltraTech OPC 53',              qualityTier: 'Premium',   unitRate: 420, description: 'India no.1 premium OPC cement' },
      { name: 'UltraTech ProTech 53+',         qualityTier: 'Luxury',    unitRate: 480, description: 'Technical grade high performance cement' },
    ],
  },
  {
    id: 'doors',
    label: 'Doors',
    unit: 'per set (frame + shutter)',
    brands: [
      { name: 'Greenply Flush Door',          qualityTier: 'Essential', unitRate: 12000, description: 'BWP marine plywood flush door', warranty: '3 yr' },
      { name: 'CenturyPly Veneer Door',       qualityTier: 'Premium',   unitRate: 18500, description: 'Real wood veneer finish interior', warranty: '5 yr' },
      { name: 'Masonite WPC Door',            qualityTier: 'Premium',   unitRate: 22000, description: 'Wood Polymer Composite waterproof door', warranty: '7 yr' },
      { name: 'Burma Teak Custom Carved',     qualityTier: 'Luxury',    unitRate: 145000, description: '45mm solid Burma teak main door', warranty: '15 yr' },
      { name: 'Ekadanta Solid Teak',          qualityTier: 'Luxury',    unitRate: 32000, description: 'Custom carved solid teak interior', warranty: '10 yr' },
    ],
  },
  {
    id: 'windows',
    label: 'Windows',
    unit: 'per sq ft',
    brands: [
      { name: 'Aluminium Single Glaze',       qualityTier: 'Essential', unitRate: 280, description: 'Powder coated aluminium section' },
      { name: 'Veka UPVC Double Glaze',       qualityTier: 'Premium',   unitRate: 680, description: 'Multichamber UPVC with 12mm air gap' },
      { name: 'Fenesta UPVC Double Glaze',    qualityTier: 'Premium',   unitRate: 780, description: '60mm profile double glazed system', warranty: '10 yr' },
      { name: 'Kommerling Triple Glaze',      qualityTier: 'Luxury',    unitRate: 1250, description: 'A-rated acoustic triple glazed', warranty: '15 yr' },
    ],
  },
  {
    id: 'flooring',
    label: 'Flooring',
    unit: 'per sq ft',
    brands: [
      { name: 'Kajaria Vitrified 2x2 ft',    qualityTier: 'Essential', unitRate: 75,  description: 'Double charged vitrified tile' },
      { name: 'Somany Vitrified 4x2 ft',     qualityTier: 'Premium',   unitRate: 140, description: 'Large format stain resistant tile' },
      { name: 'Kajaria GVT 4x2 ft',          qualityTier: 'Premium',   unitRate: 165, description: 'Glazed Vitrified Tile with digital print' },
      { name: 'Bottochino Marble Italian',   qualityTier: 'Luxury',    unitRate: 380, description: 'Italian polished marble slab tile' },
      { name: 'Statuario Marble',            qualityTier: 'Luxury',    unitRate: 520, description: 'Premium white veined statuario marble' },
    ],
  },
  {
    id: 'paint',
    label: 'Paint (Interior)',
    unit: 'per litre',
    brands: [
      { name: 'Berger WeatherCoat',           qualityTier: 'Essential', unitRate: 420, description: 'Budget exterior emulsion' },
      { name: 'Dulux EasyCare',               qualityTier: 'Essential', unitRate: 480, description: 'Washable interior emulsion' },
      { name: 'Asian Paints Apcolite',        qualityTier: 'Premium',   unitRate: 560, description: 'Semi gloss interior enamel' },
      { name: 'Asian Paints Royale Luxury',   qualityTier: 'Premium',   unitRate: 680, description: 'Teflon enriched luxury interior' },
      { name: 'Asian Paints Royale Aspira',   qualityTier: 'Luxury',    unitRate: 920, description: 'Zero VOC premium sheen emulsion', warranty: '5 yr' },
    ],
  },
  {
    id: 'electrical',
    label: 'Electrical (Wiring & Switches)',
    unit: 'per metre (wire)',
    brands: [
      { name: 'Anchor Roma Modular',          qualityTier: 'Essential', unitRate: 180, description: 'Standard modular switch range' },
      { name: 'Finolex FR Wire',              qualityTier: 'Essential', unitRate: 55,  description: 'Flame retardant copper wire' },
      { name: 'Polycab FRLS Wire',            qualityTier: 'Premium',   unitRate: 75,  description: 'Zero halogen low smoke wire' },
      { name: 'Schneider Clipsal Switches',   qualityTier: 'Premium',   unitRate: 380, description: 'Vivace modular switches per module' },
      { name: 'Legrand Arteor Glass',         qualityTier: 'Luxury',    unitRate: 680, description: 'Glass-finish touch-plate switches' },
      { name: 'Havells FRLS Wire',            qualityTier: 'Luxury',    unitRate: 95,  description: '99.97% pure copper FRLS conductor' },
    ],
  },
  {
    id: 'bathroom',
    label: 'Bathroom Fixtures',
    unit: 'per set',
    brands: [
      { name: 'Cera Standard Set',            qualityTier: 'Essential', unitRate: 22000, description: 'Wall mount WC, basin, tap set' },
      { name: 'Jaquar Basic Set',             qualityTier: 'Premium',   unitRate: 55000, description: 'Concealed cistern closet + rain shower' },
      { name: 'Kohler Veil Set',              qualityTier: 'Premium',   unitRate: 95000, description: 'Wall hung WC, thermostatic shower' },
      { name: 'Grohe Sensia Arena Set',       qualityTier: 'Luxury',    unitRate: 165000, description: 'Smart bidet closet, concealed thermostatic', warranty: '10 yr' },
    ],
  },
];

/** Get brand unit rate for a given selection; falls back to Premium base rate */
export function getBrandRate(categoryId: string, brandName: string): number {
  const cat = BRAND_DATABASE.find((c) => c.id === categoryId);
  if (!cat) return 0;
  const brand = cat.brands.find((b) => b.name === brandName);
  return brand?.unitRate ?? 0;
}

/** Get brand tier for a given selection */
export function getBrandTier(categoryId: string, brandName: string): 'Essential' | 'Premium' | 'Luxury' {
  const cat = BRAND_DATABASE.find((c) => c.id === categoryId);
  if (!cat) return 'Premium';
  const brand = cat.brands.find((b) => b.name === brandName);
  return brand?.qualityTier ?? 'Premium';
}
