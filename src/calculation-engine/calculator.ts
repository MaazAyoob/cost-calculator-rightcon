// ============================================================
// MASTER CALCULATOR ORCHESTRATOR
// Runs all modules in dependency order and returns a complete
// CalculationResult. Designed to be called on every wizard change.
// Future: swap individual modules with AI-enhanced equivalents
// without changing the frontend or store interface.
// ============================================================

import { EngineInput, CalculationResult, MaterialQuantities } from './types';

import { calculateArea }             from './modules/bua';
import { calculateSteel }            from './modules/steel';
import { calculateCement }           from './modules/cement';
import { calculateMasonry }          from './modules/brick';
import { calculateFlooring }         from './modules/flooring';
import { calculatePaint }            from './modules/paint';
import { calculateDoors }            from './modules/doors';
import { calculateWindows }          from './modules/windows';
import { calculateElectrical }       from './modules/electrical';
import { calculatePlumbing }         from './modules/plumbing';
import { calculateBudget }           from './modules/budget';
import { calculateTimeline }         from './modules/timeline';
import { calculatePaymentPlan }      from './modules/payment';
import { generateBOQ }               from './modules/boq';
import { generateProcurementList }   from './modules/materials';
import { assembleReport }            from './modules/report';

export function runCalculator(input: EngineInput): CalculationResult {
  // ── STEP 1: Area ──────────────────────────────────────────
  const area = calculateArea(input);

  // ── STEP 2: Material Quantities ───────────────────────────
  const { steelTonnes, steelKg }    = calculateSteel(input, area);
  const { cementBags }              = calculateCement(input, area);
  const { aacBlocksCuM, sandCuFt, aggregateCuFt, concreteCuM } = calculateMasonry(input, area);
  const { floorTilesSqFt, wallTilesSqFt, graniteSlabsSqFt, waterproofingAreaSqFt } = calculateFlooring(input, area);
  const {
    interiorPaintAreaSqFt, exteriorPaintAreaSqFt, puttyAreaSqFt,
  } = calculatePaint(input, area);
  const { mainDoorsCount, internalDoorsCount } = calculateDoors(input);
  const { windowsCount, windowAreaSqFt }       = calculateWindows(input, area);
  const { electricalWireMetres, conduitsMetres, switchModules, lightingPoints } = calculateElectrical(input, area);
  const { cpvcSupplyMetres, swrDrainMetres, bathroomFixtureSets, floorTrapsCount } = calculatePlumbing(input, area);

  const quantities: MaterialQuantities = {
    steelTonnes,
    cementBags,
    concreteCuM,
    aacBlocksCuM,
    sandCuFt,
    aggregateCuFt,
    waterproofingAreaSqFt,
    floorTilesSqFt,
    wallTilesSqFt,
    graniteSlabsSqFt,
    interiorPaintAreaSqFt,
    exteriorPaintAreaSqFt,
    puttyAreaSqFt,
    mainDoorsCount,
    internalDoorsCount,
    windowsCount,
    windowAreaSqFt,
    electricalWireMetres,
    conduitsMetres,
    switchModules,
    lightingPoints,
    cpvcSupplyMetres,
    swrDrainMetres,
    bathroomFixtureSets,
    floorTrapsCount,
  };

  // ── STEP 3: Budget ────────────────────────────────────────
  const budget = calculateBudget(input, area);

  // ── STEP 4: Timeline ──────────────────────────────────────
  const timeline = calculateTimeline(input, area);

  // ── STEP 5: Payment Plan ──────────────────────────────────
  const paymentPlan = calculatePaymentPlan(input, budget, timeline);

  // ── STEP 6: BOQ ───────────────────────────────────────────
  const boq = generateBOQ(input, area, quantities, budget);

  // ── STEP 7: Procurement List ──────────────────────────────
  const procurement = generateProcurementList(input, quantities, budget);

  // ── STEP 8: Report Assembly ───────────────────────────────
  const report = assembleReport(input, area, quantities, budget, timeline, paymentPlan, boq, procurement);

  return {
    input,
    area,
    quantities,
    budget,
    timeline,
    paymentPlan,
    boq,
    procurement,
    report,
    calculatedAt: new Date().toISOString(),
  };
}
