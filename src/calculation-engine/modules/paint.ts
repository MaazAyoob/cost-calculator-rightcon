// Paint Module
import { EngineInput, AreaResult } from '../types';
import { INTERIOR_PAINT_FACTOR, EXTERIOR_PAINT_FACTOR } from '../data/coefficients';

/** Rough perimeter in ft (assumes near-square footprint) */
function estimatePerimeterFt(plotArea: number): number {
  const side = Math.sqrt(plotArea);
  return Math.round(side * 4);
}

export function calculatePaint(input: EngineInput, area: AreaResult): {
  interiorPaintAreaSqFt: number;
  exteriorPaintAreaSqFt: number;
  puttyAreaSqFt: number;
  interiorPaintLitres: number;
  exteriorPaintLitres: number;
  puttyKg: number;
} {
  const { floors } = input;
  const bua = area.totalBUASqFt;
  const FLOOR_HEIGHT_FT = 10;

  // Interior: walls (3.5 × BUA) + ceiling (BUA)
  const interiorPaintAreaSqFt = Math.round(bua * INTERIOR_PAINT_FACTOR);

  // Exterior: perimeter × height per floor × floors
  const perimeter = estimatePerimeterFt(area.plotAreaSqFt);
  const exteriorRaw = perimeter * FLOOR_HEIGHT_FT * floors * EXTERIOR_PAINT_FACTOR;
  const exteriorPaintAreaSqFt = Math.round(exteriorRaw);

  // Putty on interior walls + ceiling
  const puttyAreaSqFt = interiorPaintAreaSqFt;

  // Litres: 1 litre covers ~100 sqft for 2 coats of emulsion
  const interiorPaintLitres = Math.ceil(interiorPaintAreaSqFt / 45);   // 45 sqft / litre × 2 coats
  const exteriorPaintLitres = Math.ceil(exteriorPaintAreaSqFt / 60);   // 60 sqft / litre × 2 coats
  const puttyKg = Math.round(puttyAreaSqFt * 0.55);                    // ~550g / sqft

  return {
    interiorPaintAreaSqFt,
    exteriorPaintAreaSqFt,
    puttyAreaSqFt,
    interiorPaintLitres,
    exteriorPaintLitres,
    puttyKg,
  };
}
