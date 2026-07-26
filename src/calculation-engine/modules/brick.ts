// Brick/AAC Block Module
import { EngineInput, AreaResult } from '../types';
import {
  AAC_CUM_PER_SQFT,
  SAND_CUFT_PER_SQFT,
  AGGREGATE_CUFT_PER_SQFT,
  CONCRETE_CUM_PER_SQFT,
} from '../data/coefficients';

export function calculateMasonry(input: EngineInput, area: AreaResult): {
  aacBlocksCuM: number;
  sandCuFt: number;
  aggregateCuFt: number;
  concreteCuM: number;
} {
  const tier = input.qualityTier;
  const bua = area.totalBUASqFt;

  return {
    aacBlocksCuM: Math.round(bua * AAC_CUM_PER_SQFT[tier]),
    sandCuFt:     Math.round(bua * SAND_CUFT_PER_SQFT[tier]),
    aggregateCuFt: Math.round(bua * AGGREGATE_CUFT_PER_SQFT[tier]),
    concreteCuM:  Math.round(bua * CONCRETE_CUM_PER_SQFT[tier]),
  };
}
