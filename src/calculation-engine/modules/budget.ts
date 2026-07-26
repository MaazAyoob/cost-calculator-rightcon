// Budget Module
import { EngineInput, AreaResult, BudgetResult, BudgetHead } from '../types';
import { BUDGET_ALLOCATION, BUDGET_HEAD_COLORS } from '../data/qualityTiers';
import {
  BASE_RATE_PER_SQFT,
  GST_RATE,
  CONTRACTOR_MARGIN,
  PROFESSIONAL_FEES,
  CONTINGENCY_RATE,
  STILT_PARKING_COST_PER_CAR,
  LIFT_COST,
  EV_CHARGING_COST,
} from '../data/locationRates';

export function calculateBudget(input: EngineInput, area: AreaResult): BudgetResult {
  const { city, qualityTier, parkingType, carCount, liftRequired, evCharging } = input;

  const bua = area.totalBUASqFt;
  const baseRate = BASE_RATE_PER_SQFT[city][qualityTier];
  const baseConstructionCost = Math.round(bua * baseRate);

  // Add-ons
  const parkingCost = parkingType === 'Stilt Parking'
    ? carCount * STILT_PARKING_COST_PER_CAR[city]
    : carCount * 60000; // Normal parking (open / covered slab)

  const liftCost = liftRequired ? LIFT_COST[city][qualityTier] : 0;
  const evCost   = evCharging   ? EV_CHARGING_COST : 0;

  const constructionWithAddons = baseConstructionCost + parkingCost + liftCost + evCost;

  // Professional fees, margin, contingency
  const professionalFees = Math.round(constructionWithAddons * PROFESSIONAL_FEES[qualityTier]);
  const contractorMargin = Math.round(constructionWithAddons * CONTRACTOR_MARGIN[qualityTier]);
  const contingency      = Math.round(constructionWithAddons * CONTINGENCY_RATE[qualityTier]);
  const gstAmount        = Math.round((constructionWithAddons + professionalFees) * GST_RATE);

  const totalProjectCost = constructionWithAddons + professionalFees + contractorMargin + contingency + gstAmount;
  const costPerSqFt      = Math.round(totalProjectCost / bua);

  // Budget head breakdown
  const alloc = BUDGET_ALLOCATION[qualityTier];
  const headDefs = [
    { key: 'foundationStructure',    label: 'Foundation & Structure',  pct: alloc.foundationStructure },
    { key: 'masonry',                label: 'Masonry',                 pct: alloc.masonry },
    { key: 'roofing',                label: 'Roofing',                 pct: alloc.roofing },
    { key: 'flooring',               label: 'Flooring',                pct: alloc.flooring },
    { key: 'doorsJoinery',           label: 'Doors & Joinery',         pct: alloc.doorsJoinery },
    { key: 'windows',                label: 'Windows & Glazing',       pct: alloc.windows },
    { key: 'electrical',             label: 'Electrical',              pct: alloc.electrical },
    { key: 'plumbingSanitary',       label: 'Plumbing & Sanitary',     pct: alloc.plumbingSanitary },
    { key: 'paintingWaterproofing',  label: 'Painting',                pct: alloc.paintingWaterproofing },
    { key: 'fixturesFinishes',       label: 'Fixtures & Finishes',     pct: alloc.fixturesFinishes },
    { key: 'contingencyGST',         label: 'Contingency & GST',       pct: alloc.contingencyGST },
  ];

  const heads: BudgetHead[] = headDefs.map((h, idx) => ({
    id:              h.key,
    name:            h.label,
    percentage:      Math.round(h.pct * 100),
    allocatedAmount: Math.round(totalProjectCost * h.pct),
    color:           BUDGET_HEAD_COLORS[h.label] ?? '#94A3B8',
  }));

  // Derive sub-totals
  const structuralCost = Math.round(totalProjectCost * (alloc.foundationStructure + alloc.masonry + alloc.roofing));
  const finishingCost  = Math.round(totalProjectCost * (alloc.flooring + alloc.doorsJoinery + alloc.windows + alloc.fixturesFinishes));
  const mepCost        = Math.round(totalProjectCost * (alloc.electrical + alloc.plumbingSanitary));

  return {
    heads,
    structuralCost,
    finishingCost,
    mepCost,
    professionalFees,
    contingency,
    gstAmount,
    baseConstructionCost,
    totalProjectCost,
    costPerSqFt,
  };
}
