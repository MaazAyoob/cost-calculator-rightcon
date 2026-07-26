// ============================================================
// CALCULATION ENGINE – TYPES
// Central type registry for all engine inputs and outputs
// ============================================================

import { QualityTier, CityLocation, HouseType, RoomCounts, MaterialBrandSelection } from '../store/useWizardStore';

// ────────────────────────────────────────────────────────────
// INPUT MODEL
// ────────────────────────────────────────────────────────────

export interface EngineInput {
  city: CityLocation;
  authority: string;
  plotLength: number; // ft
  plotWidth: number;  // ft
  houseType: HouseType;
  floors: number;     // total floor count incl. Ground (1 = G, 2 = G+1 ...)
  parkingType: 'Normal Parking' | 'Stilt Parking';
  carCount: number;
  bikeCount: number;
  evCharging: boolean;
  liftRequired: boolean;
  rooms: RoomCounts;
  qualityTier: QualityTier;
  materialBrands: MaterialBrandSelection;
}

// ────────────────────────────────────────────────────────────
// AREA RESULTS
// ────────────────────────────────────────────────────────────

export interface AreaResult {
  plotAreaSqFt: number;
  buildableAreaSqFt: number;  // ground coverage
  buaPerFloorSqFt: number;    // usable BUA per floor
  totalBUASqFt: number;       // across all floors
  superBUASqFt: number;       // with 15% common area
  parkingAreaSqFt: number;
  terraceSqFt: number;
  totalConstructedSqFt: number;
}

// ────────────────────────────────────────────────────────────
// MATERIAL QUANTITIES
// ────────────────────────────────────────────────────────────

export interface MaterialQuantities {
  // Structure
  steelTonnes: number;
  cementBags: number;
  concreteCuM: number;        // RMC volume
  // Masonry
  aacBlocksCuM: number;
  sandCuFt: number;
  aggregateCuFt: number;
  // Waterproofing
  waterproofingAreaSqFt: number;
  // Flooring
  floorTilesSqFt: number;
  wallTilesSqFt: number;
  graniteSlabsSqFt: number;
  // Finishing
  interiorPaintAreaSqFt: number;
  exteriorPaintAreaSqFt: number;
  puttyAreaSqFt: number;
  // Openings
  mainDoorsCount: number;
  internalDoorsCount: number;
  windowsCount: number;
  windowAreaSqFt: number;
  // Electrical
  electricalWireMetres: number;
  conduitsMetres: number;
  switchModules: number;
  lightingPoints: number;
  // Plumbing
  cpvcSupplyMetres: number;
  swrDrainMetres: number;
  bathroomFixtureSets: number;
  floorTrapsCount: number;
}

// ────────────────────────────────────────────────────────────
// BOQ
// ────────────────────────────────────────────────────────────

export type BOQCategory =
  | 'Site Preparation'
  | 'Foundation'
  | 'Plinth'
  | 'RCC Structure'
  | 'Masonry'
  | 'Roofing'
  | 'Flooring'
  | 'Doors & Joinery'
  | 'Windows & Glazing'
  | 'Electrical'
  | 'Plumbing & Sanitary'
  | 'Painting & Waterproofing'
  | 'Fixtures & Finishes';

export interface BOQItem {
  code: string;
  category: BOQCategory;
  description: string;
  unit: string;
  quantity: number;
  unitRate: number;      // ₹
  amount: number;        // ₹
  brand: string;
  remarks: string;
}

// ────────────────────────────────────────────────────────────
// BUDGET
// ────────────────────────────────────────────────────────────

export interface BudgetHead {
  id: string;
  name: string;
  percentage: number;
  allocatedAmount: number;
  color: string;
}

export interface BudgetResult {
  heads: BudgetHead[];
  structuralCost: number;
  finishingCost: number;
  mepCost: number;
  professionalFees: number;
  contingency: number;
  gstAmount: number;
  baseConstructionCost: number;
  totalProjectCost: number;
  costPerSqFt: number;
}

// ────────────────────────────────────────────────────────────
// TIMELINE
// ────────────────────────────────────────────────────────────

export interface TimelineStage {
  stageNumber: string;
  title: string;
  startMonth: number;
  durationMonths: number;
  endMonth: number;
  isCriticalPath: boolean;
}

export interface TimelineResult {
  totalMonths: number;
  stages: TimelineStage[];
  constructionStartDate: string;
  estimatedHandoverDate: string;
}

// ────────────────────────────────────────────────────────────
// PAYMENT PLAN
// ────────────────────────────────────────────────────────────

export interface PaymentMilestone {
  stage: number;
  title: string;
  description: string;
  percentage: number;
  amount: number;
  targetDate: string;
  status: 'Completed' | 'Due' | 'Upcoming';
  bankDisbursement: boolean;
}

// ────────────────────────────────────────────────────────────
// PROCUREMENT LIST
// ────────────────────────────────────────────────────────────

export interface ProcurementItem {
  id: string;
  trade: string;
  item: string;
  brand: string;
  specification: string;
  quantity: number;
  unit: string;
  unitRate: number;
  totalCost: number;
  supplierNote: string;
  leadTimeDays: number;
}

// ────────────────────────────────────────────────────────────
// REPORT DATA
// ────────────────────────────────────────────────────────────

export interface ReportData {
  projectId: string;
  generatedAt: string;
  clientName: string;
  engineVersion: string;
  input: EngineInput;
  area: AreaResult;
  quantities: MaterialQuantities;
  budget: BudgetResult;
  boq: BOQItem[];
  timeline: TimelineResult;
  paymentPlan: PaymentMilestone[];
  procurement: ProcurementItem[];
  recommendations: string[];
}

// ────────────────────────────────────────────────────────────
// MASTER CALCULATION RESULT
// ────────────────────────────────────────────────────────────

export interface CalculationResult {
  input: EngineInput;
  area: AreaResult;
  quantities: MaterialQuantities;
  budget: BudgetResult;
  timeline: TimelineResult;
  paymentPlan: PaymentMilestone[];
  boq: BOQItem[];
  procurement: ProcurementItem[];
  report: ReportData;
  calculatedAt: string;
}
