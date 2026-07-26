// ============================================================
// CALCULATION STORE
// Central Zustand store for all engine outputs.
// Call recalculate() whenever wizard inputs change.
// ============================================================

import { create } from 'zustand';
import { CalculationResult, EngineInput } from '../calculation-engine/types';
import { runCalculator } from '../calculation-engine/calculator';
import {
  useWizardStore,
  QualityTier,
  CityLocation,
  HouseType,
  RoomCounts,
  MaterialBrandSelection,
} from './useWizardStore';

// Build EngineInput from the wizard store state
function buildInput(): EngineInput {
  const s = useWizardStore.getState();
  return {
    city:            s.city,
    authority:       s.authority,
    plotLength:      s.plotLength,
    plotWidth:       s.plotWidth,
    houseType:       s.houseType,
    floors:          s.floors,
    parkingType:     s.parkingType,
    carCount:        s.carCount,
    bikeCount:       s.bikeCount,
    evCharging:      s.evCharging,
    liftRequired:    s.liftRequired,
    rooms:           s.rooms,
    qualityTier:     s.qualityTier,
    materialBrands:  s.materialBrands,
  };
}

// Generate initial calculation immediately
const initialInput = buildInput();
const initialResult = runCalculator(initialInput);

interface CalculationStore {
  result: CalculationResult;
  isCalculating: boolean;
  lastCalculatedAt: string;
  recalculate: () => void;
}

export const useCalculationStore = create<CalculationStore>((set) => ({
  result:            initialResult,
  isCalculating:     false,
  lastCalculatedAt:  initialResult.calculatedAt,

  recalculate: () => {
    set({ isCalculating: true });
    // Synchronous run – < 2ms. Wrapped in setTimeout(0) to allow
    // the calling setter to complete its own state update first.
    setTimeout(() => {
      const input = buildInput();
      const result = runCalculator(input);
      set({ result, isCalculating: false, lastCalculatedAt: result.calculatedAt });
    }, 0);
  },
}));

// ── Selector helpers (for clean component usage) ──────────
export const useArea           = () => useCalculationStore((s) => s.result.area);
export const useQuantities     = () => useCalculationStore((s) => s.result.quantities);
export const useBudgetResult   = () => useCalculationStore((s) => s.result.budget);
export const useTimeline       = () => useCalculationStore((s) => s.result.timeline);
export const usePaymentResult  = () => useCalculationStore((s) => s.result.paymentPlan);
export const useBOQ            = () => useCalculationStore((s) => s.result.boq);
export const useProcurement    = () => useCalculationStore((s) => s.result.procurement);
export const useReportData     = () => useCalculationStore((s) => s.result.report);
