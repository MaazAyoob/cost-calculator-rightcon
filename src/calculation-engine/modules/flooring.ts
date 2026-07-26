// Flooring Module
import { EngineInput, AreaResult } from '../types';
import {
  FLOOR_TILE_FACTOR,
  WALL_TILE_SQFT_PER_BATHROOM,
  GRANITE_PER_FLOOR,
} from '../data/coefficients';

export function calculateFlooring(input: EngineInput, area: AreaResult): {
  floorTilesSqFt: number;
  wallTilesSqFt: number;
  graniteSlabsSqFt: number;
  waterproofingAreaSqFt: number;
} {
  const { qualityTier, rooms, floors } = input;
  const bua = area.totalBUASqFt;

  // Floor tiles: full BUA minus structural (walls etc.) + wastage
  const floorTilesSqFt = Math.round(bua * FLOOR_TILE_FACTOR[qualityTier]);

  // Wall tiles: only bathrooms + kitchen splashback
  const bathroomWalls = rooms.bathrooms * WALL_TILE_SQFT_PER_BATHROOM;
  const kitchenSplashback = rooms.kitchen * 40;
  const wallTilesSqFt = Math.round(bathroomWalls + kitchenSplashback);

  // Granite for staircase steps (per floor transition)
  const staircaseFlights = Math.max(0, floors - 1);
  const graniteSlabsSqFt = Math.round(staircaseFlights * GRANITE_PER_FLOOR);

  // Waterproofing for wet areas (bathrooms + balconies + terrace)
  const bathroomWP = rooms.bathrooms * 80;
  const balconyWP = rooms.balcony * 60;
  const terraceWP = Math.round(area.terraceSqFt * 0.70);
  const waterproofingAreaSqFt = bathroomWP + balconyWP + terraceWP;

  return { floorTilesSqFt, wallTilesSqFt, graniteSlabsSqFt, waterproofingAreaSqFt };
}
