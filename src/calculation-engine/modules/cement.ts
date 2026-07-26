// Cement Module
import { EngineInput, AreaResult } from '../types';
import { CEMENT_BAGS_PER_SQFT } from '../data/coefficients';

export function calculateCement(input: EngineInput, area: AreaResult): {
  cementBags: number;
  bagsPerSqFt: number;
} {
  const bagsPerSqFt = CEMENT_BAGS_PER_SQFT[input.qualityTier];
  const cementBags = Math.round(area.totalBUASqFt * bagsPerSqFt);
  return { cementBags, bagsPerSqFt };
}
