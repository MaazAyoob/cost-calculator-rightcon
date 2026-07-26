// ============================================================
// CUSTOM HOOK – useCalculation
// Clean React hook wrapping calculation store state & recalculation trigger
// ============================================================

import { useCalculationStore, useArea, useQuantities, useBudgetResult, useTimeline, usePaymentResult, useBOQ, useProcurement, useReportData } from '../store/useCalculationStore';

export function useCalculation() {
  const result = useCalculationStore((s) => s.result);
  const isCalculating = useCalculationStore((s) => s.isCalculating);
  const lastCalculatedAt = useCalculationStore((s) => s.lastCalculatedAt);
  const recalculate = useCalculationStore((s) => s.recalculate);

  const area = useArea();
  const quantities = useQuantities();
  const budget = useBudgetResult();
  const timeline = useTimeline();
  const paymentPlan = usePaymentResult();
  const boq = useBOQ();
  const procurement = useProcurement();
  const report = useReportData();

  return {
    result,
    isCalculating,
    lastCalculatedAt,
    recalculate,
    area,
    quantities,
    budget,
    timeline,
    paymentPlan,
    boq,
    procurement,
    report,
  };
}
