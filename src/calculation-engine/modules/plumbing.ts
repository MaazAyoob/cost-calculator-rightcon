// Plumbing Module
import { EngineInput, AreaResult } from '../types';
import {
  CPVC_M_PER_SQFT,
  SWR_M_PER_SQFT,
  BATHROOM_FIXTURES_PER_BATH,
  FLOOR_TRAPS_PER_BATH,
} from '../data/coefficients';

export function calculatePlumbing(input: EngineInput, area: AreaResult): {
  cpvcSupplyMetres: number;
  swrDrainMetres: number;
  bathroomFixtureSets: number;
  floorTrapsCount: number;
} {
  const { rooms } = input;
  const bua = area.totalBUASqFt;

  const cpvcSupplyMetres   = Math.round(bua * CPVC_M_PER_SQFT);
  const swrDrainMetres     = Math.round(bua * SWR_M_PER_SQFT);
  const bathroomFixtureSets = rooms.bathrooms * BATHROOM_FIXTURES_PER_BATH;
  const floorTrapsCount    = rooms.bathrooms * FLOOR_TRAPS_PER_BATH +
                              rooms.kitchen  * 1 +
                              rooms.balcony  * 1;

  return { cpvcSupplyMetres, swrDrainMetres, bathroomFixtureSets, floorTrapsCount };
}
