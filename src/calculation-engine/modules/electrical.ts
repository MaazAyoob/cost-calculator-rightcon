// Electrical Module
import { EngineInput, AreaResult } from '../types';
import {
  ELECTRICAL_WIRE_M_PER_SQFT,
  CONDUIT_M_PER_SQFT,
  LIGHTING_POINTS_PER_SQFT,
  SWITCH_MODULES_PER_SQFT,
} from '../data/coefficients';

export function calculateElectrical(input: EngineInput, area: AreaResult): {
  electricalWireMetres: number;
  conduitsMetres: number;
  switchModules: number;
  lightingPoints: number;
} {
  const { qualityTier, rooms, liftRequired } = input;
  const bua = area.totalBUASqFt;

  const electricalWireMetres = Math.round(bua * ELECTRICAL_WIRE_M_PER_SQFT[qualityTier]);
  const conduitsMetres       = Math.round(bua * CONDUIT_M_PER_SQFT[qualityTier]);
  const lightingPoints       = Math.round(bua * LIGHTING_POINTS_PER_SQFT) + (liftRequired ? 8 : 0);
  const switchModules        = Math.round(bua * SWITCH_MODULES_PER_SQFT[qualityTier]) + (liftRequired ? 4 : 0);

  return { electricalWireMetres, conduitsMetres, switchModules, lightingPoints };
}
