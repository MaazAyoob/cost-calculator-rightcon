// Steel Module
import { EngineInput } from '../types';
import { STEEL_KG_PER_SQFT } from '../data/coefficients';
import { AreaResult } from '../types';

export function calculateSteel(input: EngineInput, area: AreaResult): {
  steelTonnes: number;
  steelKg: number;
  kgPerSqFt: number;
} {
  const kgPerSqFt = STEEL_KG_PER_SQFT[input.qualityTier];
  const steelKg = Math.round(area.totalBUASqFt * kgPerSqFt);
  const steelTonnes = parseFloat((steelKg / 1000).toFixed(1));
  return { steelTonnes, steelKg, kgPerSqFt };
}
