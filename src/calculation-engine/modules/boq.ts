// BOQ Generator Module — 50+ line items across 13 categories
import { EngineInput, AreaResult, MaterialQuantities, BudgetResult, BOQItem, BOQCategory } from '../types';
import { UNIT_RATES_PREMIUM, MATERIAL_QUALITY_MULTIPLIER } from '../data/qualityTiers';

let _seq = 0;
function nextCode(prefix: string): string {
  _seq++;
  return `${prefix}-${String(_seq).padStart(3, '0')}`;
}

function rate(baseRate: number, multiplier: number): number {
  return Math.round(baseRate * multiplier);
}

export function generateBOQ(
  input: EngineInput,
  area: AreaResult,
  qty: MaterialQuantities,
  budget: BudgetResult
): BOQItem[] {
  _seq = 0;
  const { qualityTier, materialBrands, city } = input;
  const m = MATERIAL_QUALITY_MULTIPLIER[qualityTier];
  const r = UNIT_RATES_PREMIUM;
  const bua = area.totalBUASqFt;

  const items: BOQItem[] = [];

  const add = (
    category: BOQCategory,
    prefix: string,
    description: string,
    unit: string,
    quantity: number,
    unitRate: number,
    brand: string,
    remarks = ''
  ): void => {
    const amount = Math.round(quantity * unitRate);
    items.push({
      code: nextCode(prefix),
      category,
      description,
      unit,
      quantity: Math.round(quantity),
      unitRate: Math.round(unitRate),
      amount,
      brand,
      remarks,
    });
  };

  // ── Site Preparation ──────────────────────────────────────
  add('Site Preparation', 'SP', 'Topsoil Clearing & Land Demarcation', 'Sq Ft', area.plotAreaSqFt, rate(r.sitePreparationPerSqFt, m.structural), 'Total Station Survey', 'incl. benchmarking');
  add('Site Preparation', 'SP', 'Excavation – Column Pits (JCB)', 'Cu M', qty.concreteCuM * 0.4, rate(r.earthworkPerCuM, m.structural), 'Lokesh Plant Hire', '');
  add('Site Preparation', 'SP', 'Anti-Termite Chemical Treatment', 'Sq Ft', area.plotAreaSqFt, 18, 'Chlorpyrifos 20% EC', 'IS 6313 compliant');
  add('Site Preparation', 'SP', 'Temporary Site Shed & Utility', 'LS', 1, 75000, 'GI Sheet Enclosure', 'incl. 3-phase connection');

  // ── Foundation ─────────────────────────────────────────────
  add('Foundation', 'FD', 'PCC M10 Bed below Footings', 'Cu M', qty.concreteCuM * 0.08, rate(r.pccPerCuM, m.structural), 'UltraTech OPC 53', '100mm thickness');
  add('Foundation', 'FD', 'Isolated Column Footing RMC M25', 'Cu M', qty.concreteCuM * 0.22, rate(r.rmc25PerCuM, m.structural), 'UltraTech RMC', '50mm cover to rebar');
  add('Foundation', 'FD', 'Footing Reinforcement TMT Fe 550D', 'Tonne', qty.steelTonnes * 0.20, rate(r.tmtSteelPerTonne, m.structural), materialBrands.steel, 'IS 13920 seismic detailing');

  // ── Plinth ─────────────────────────────────────────────────
  add('Plinth', 'PL', 'Plinth Beam RMC M25', 'Cu M', qty.concreteCuM * 0.08, rate(r.rmc25PerCuM, m.structural), 'UltraTech RMC', '');
  add('Plinth', 'PL', 'Plinth Beam TMT Steel', 'Tonne', qty.steelTonnes * 0.08, rate(r.tmtSteelPerTonne, m.structural), materialBrands.steel, 'continuous ring beam');
  add('Plinth', 'PL', 'Earth Backfilling & Plate Compaction', 'Cu M', area.buildableAreaSqFt * 0.5 / 35.31, rate(r.earthworkPerCuM * 0.8, 1), 'Quarry Dust + Red Earth', '150mm layers');
  add('Plinth', 'PL', 'DPC PCC M20 with Waterproofing', 'Sq Ft', area.buildableAreaSqFt, rate(18, m.structural), 'Dr. Fixit Pidiproof LW+', '50mm DPC coat');

  // ── RCC Structure ──────────────────────────────────────────
  add('RCC Structure', 'RC', 'Column RMC M25 (all floors)', 'Cu M', qty.concreteCuM * 0.18, rate(r.rmc25PerCuM, m.structural), 'UltraTech RMC', 'pump placed');
  add('RCC Structure', 'RC', 'Column TMT Rebar Fe 550D', 'Tonne', qty.steelTonnes * 0.30, rate(r.tmtSteelPerTonne, m.structural), materialBrands.steel, '8 nos 20mm + stirrups @100mm');
  add('RCC Structure', 'RC', 'Beam & Slab RMC M25', 'Cu M', qty.concreteCuM * 0.52, rate(r.rmc25PerCuM, m.structural), 'UltraTech RMC', 'monolithic pour');
  add('RCC Structure', 'RC', 'Slab & Beam TMT Steel', 'Tonne', qty.steelTonnes * 0.42, rate(r.tmtSteelPerTonne, m.structural), materialBrands.steel, '10mm@125mm + 8mm dist.');
  add('RCC Structure', 'RC', 'RCC Staircase Waist Slab', 'Cu M', qty.concreteCuM * 0.06, rate(r.rmc25PerCuM, m.structural), 'UltraTech RMC', '150mm slab, 150R×300T');
  add('RCC Structure', 'RC', 'Scaffolding & Formwork (Hire)', 'Sq Ft', bua * 0.9, rate(55, m.structural), 'Cuplock System – Hire', 'film-faced plywood');

  // ── Masonry ────────────────────────────────────────────────
  add('Masonry', 'MA', 'AAC Block 150mm Outer Walls', 'Cu M', qty.aacBlocksCuM * 0.55, rate(r.aacBlock6InchPerCuM, m.structural), 'Birla Aerocon Grade 1', 'thin-bed polymer mortar');
  add('Masonry', 'MA', 'AAC Block 100mm Inner Partitions', 'Cu M', qty.aacBlocksCuM * 0.45, rate(r.aacBlock6InchPerCuM * 0.85, m.structural), 'Birla Aerocon Grade 1', '3mm joint adhesive');
  add('Masonry', 'MA', 'RCC Lintel Beams over Openings', 'RM', input.rooms.bedrooms * 2 + input.rooms.bathrooms + 6, rate(850, m.structural), 'M20 in-situ concrete', '230mm × 150mm lintel');
  add('Masonry', 'MA', 'Precast Chajja Sunshades', 'RM', input.rooms.bedrooms * 1.5 + 4, rate(1200, m.structural), 'M20 RCC + 2mm drip groove', '450mm projection');
  add('Masonry', 'MA', 'GI Chicken Mesh at RCC Joints', 'RM', (area.totalBUASqFt * 0.4), rate(18, 1), 'GI 22g 150mm width', '100mm lap each side');

  // ── Roofing ────────────────────────────────────────────────
  add('Roofing', 'RF', 'Terrace Waterproofing Brick Bat Coba', 'Sq Ft', area.terraceSqFt, rate(85, m.finishing), 'Dr. Fixit + IWC', 'IS 3067 compliant');
  add('Roofing', 'RF', 'Roof Screed & Slope Finishing', 'Sq Ft', area.terraceSqFt, rate(45, m.finishing), 'OPC 53 screed mortar', '2% slope to drains');
  add('Roofing', 'RF', 'Parapet Wall RCC + Plaster', 'RM', Math.round(Math.sqrt(area.plotAreaSqFt) * 4 * 0.8), rate(2200, m.structural), 'M20 RCC + plaster', '900mm height');

  // ── Flooring ───────────────────────────────────────────────
  add('Flooring', 'FL', 'Living & Bedroom Floor Tiles (4×2 ft)', 'Sq Ft', qty.floorTilesSqFt * 0.70, rate(r.vitrifiedTilePerSqFt, m.finishing), materialBrands.flooring, 'MYK adhesive + epoxy grout');
  add('Flooring', 'FL', 'Bathroom & Kitchen Anti-skid Tiles', 'Sq Ft', qty.floorTilesSqFt * 0.15, rate(85, m.finishing), 'Johnson Endura Anti-skid', 'slip resistance R11');
  add('Flooring', 'FL', 'Bathroom Wall Tiles (glazed, 2×1 ft)', 'Sq Ft', qty.wallTilesSqFt, rate(r.wallTilePerSqFt, m.finishing), 'Kajaria Glamour Wall', 'full wall up to 7ft');
  add('Flooring', 'FL', 'Granite Staircase Treads & Risers', 'Sq Ft', qty.graniteSlabsSqFt, rate(r.graniteStepPerSqFt, m.finishing), 'Jet Black Granites 20mm', '3 anti-skid grooves');
  add('Flooring', 'FL', 'Floor Tile Tile Adhesive & Grouting', 'Sq Ft', qty.floorTilesSqFt, rate(22, 1), 'MYK Laticrete 254', '100% coverage');

  // ── Doors & Joinery ────────────────────────────────────────
  add('Doors & Joinery', 'DJ', 'Main Entrance Solid Teak Door Set', 'Sets', qty.mainDoorsCount, rate(r.mainDoorPerSet, m.joinery), materialBrands.doors, '45mm shutter, SS hinges, digital lock');
  add('Doors & Joinery', 'DJ', 'Internal Flush Veneer Door Sets', 'Sets', qty.internalDoorsCount, rate(r.interiorDoorPerSet, m.joinery), 'CenturyPly Veneer', 'marine ply BWP');
  add('Doors & Joinery', 'DJ', 'Teak Wood Door Frames', 'RM', (qty.mainDoorsCount + qty.internalDoorsCount) * 7, rate(1800, m.joinery), 'Plantation Teak 4×3 inch', '');
  add('Doors & Joinery', 'DJ', 'SS Mortise Lock Sets', 'Sets', qty.internalDoorsCount, rate(3200, m.joinery), 'Godrej Ultralock / Yale', '');

  // ── Windows & Glazing ──────────────────────────────────────
  add('Windows & Glazing', 'WG', 'UPVC Double Glazed Windows', 'Sq Ft', qty.windowAreaSqFt, rate(r.upvcWindowPerSqFt, m.joinery), materialBrands.windows, '12mm air gap, mosquito mesh');
  add('Windows & Glazing', 'WG', 'MS Grille Fabrication & Install', 'Sq Ft', qty.windowAreaSqFt * 0.70, rate(280, m.structural), 'SS 304 tube grille', 'powder coated black');

  // ── Electrical ─────────────────────────────────────────────
  add('Electrical', 'EL', 'FRLS Copper Wire Pulling', 'Metres', qty.electricalWireMetres, rate(r.wirePerMetre, m.mep), materialBrands.electrical, '1.5/2.5/4.0 sqmm mixed circuit');
  add('Electrical', 'EL', 'PVC Conduit Pipe & Box Fixing', 'Metres', qty.conduitsMetres, rate(r.conduitPerMetre, m.mep), 'Asiahi / Precision PVC', '25mm heavy duty');
  add('Electrical', 'EL', 'Modular Switch & Socket Plates', 'Modules', qty.switchModules, rate(r.switchModulePerUnit, m.mep), materialBrands.electrical, '');
  add('Electrical', 'EL', 'LED Concealed Spotlights', 'Points', qty.lightingPoints, rate(r.lightPointPerUnit, m.mep), 'Philips LED / Havells', 'CRI>90 warm white');
  add('Electrical', 'EL', 'Chemical Earthing Pits (x2)', 'Units', 2, rate(22000, m.mep), 'Marconite Gel Earth System', '<1 Ohm verified');
  add('Electrical', 'EL', 'Distribution Boards (MCB + RCCB)', 'Units', Math.ceil(input.floors * 1.5), rate(24000, m.mep), 'Schneider / Legrand DB', '30mA RCCB protection');
  add('Electrical', 'EL', 'Armoured Cable from BESCOM Meter', 'RM', 12, rate(1800, m.mep), '4 core 16 sqmm XLPE', '');

  // ── Plumbing & Sanitary ─────────────────────────────────────
  add('Plumbing & Sanitary', 'PS', 'CPVC Hot & Cold Supply Pipes', 'Metres', qty.cpvcSupplyMetres, rate(r.cpvcPipePerMetre, m.mep), 'Astral CPVC Pro SDR11', '10 bar rated at 82°C');
  add('Plumbing & Sanitary', 'PS', 'SWR Soil & Waste Drainage Pipes', 'Metres', qty.swrDrainMetres, rate(r.swrPipePerMetre, m.mep), 'Supreme Ring-fit SWR', '110mm + 75mm dia');
  add('Plumbing & Sanitary', 'PS', 'Floor Traps & Gratings', 'Units', qty.floorTrapsCount, rate(850, m.mep), 'Jaquar / Cera SS Floor Trap', '50mm deep seal');
  add('Plumbing & Sanitary', 'PS', 'CP Bathroom Fixture Sets', 'Sets', qty.bathroomFixtureSets, rate(r.bathroomSetPerUnit, m.fixtures), materialBrands.bathroom, 'WC + basin + shower set');
  add('Plumbing & Sanitary', 'PS', 'Overhead Water Tank 2000L', 'Units', 1, rate(28000, m.mep), 'Sintex 4-layer UV', 'with ball cock & inlet valve');
  add('Plumbing & Sanitary', 'PS', 'Booster Pressure Pump', 'Units', 1, rate(35000, m.mep), 'Grundfos CM / Wilo', '0.75HP VFD constant pressure');
  add('Plumbing & Sanitary', 'PS', 'Kitchen Sink SS 2 Bowl', 'Units', input.rooms.kitchen, rate(12000, m.fixtures), 'Nirali / Franke', '304 grade, anti-scratch coating');

  // ── Painting & Waterproofing ────────────────────────────────
  add('Painting & Waterproofing', 'PW', 'Interior Gypsum Wall Putty + Primer', 'Sq Ft', qty.puttyAreaSqFt, rate(16, m.finishing), 'Asian Paints Acrylic Putty', '2 coats + alkali primer');
  add('Painting & Waterproofing', 'PW', 'Interior Luxury Emulsion 2 Coats', 'Sq Ft', qty.interiorPaintAreaSqFt, rate(22, m.finishing), materialBrands.paint, 'Teflon surface protector');
  add('Painting & Waterproofing', 'PW', 'Exterior Weather Proof Emulsion', 'Sq Ft', qty.exteriorPaintAreaSqFt, rate(18, m.finishing), 'Asian Paints Apex Ultima', '7-year weatherproof warranty');
  add('Painting & Waterproofing', 'PW', 'Bathroom 2-Comp Polymer Waterproofing', 'Sq Ft', qty.waterproofingAreaSqFt, rate(r.waterproofingPerSqFt, m.finishing), 'Dr. Fixit Fastflex 2C', '300mm vertical turn-up');

  // ── Fixtures & Finishes ────────────────────────────────────
  add('Fixtures & Finishes', 'FF', 'BLDC Ceiling Fans', 'Units', input.rooms.bedrooms + input.rooms.living + input.rooms.office, rate(6500, m.fixtures), 'Atomberg Renesa BLDC', '28W, remote control, 5-speed');
  add('Fixtures & Finishes', 'FF', 'Modular Kitchen – Cabinets & Counter', 'RM', input.rooms.kitchen * 12, rate(18000, m.finishing), 'Sleek / Haecker Modular', 'Quartz countertop + HDHMR carcass');
  add('Fixtures & Finishes', 'FF', 'Lift Installation (if applicable)', 'Units', input.liftRequired ? 1 : 0, rate(580000, m.fixtures), 'Schindler / Otis 6-person', '630 kg rated, MRL type');
  add('Fixtures & Finishes', 'FF', 'EV Charging Point (if applicable)', 'Units', input.evCharging ? input.carCount : 0, rate(38000, m.mep), 'Tata Power EZ Charge 7.2kW', 'Type 2 AC charger');

  return items.filter((item) => item.quantity > 0);
}
