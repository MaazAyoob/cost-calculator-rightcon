// Windows Module
import { EngineInput, AreaResult } from '../types';

/** Standard window size (sq ft) by room type */
const WINDOW_SQFT_BY_ROOM = {
  bedroom:  20,  // 5x4 ft window
  living:   30,  // 6x5 ft picture window
  kitchen:  12,  // 4x3 ft
  bathroom:  6,  // 2x3 ft ventilation
  other:    12,
};

export function calculateWindows(input: EngineInput, area: AreaResult): {
  windowsCount: number;
  windowAreaSqFt: number;
} {
  const { rooms } = input;

  // 1-2 windows per bedroom, 2-3 per living, 1 per kitchen, 1 per bathroom
  const windowsCount =
    rooms.bedrooms * 2 +
    rooms.living   * 2 +
    rooms.kitchen  * 1 +
    rooms.bathrooms * 1 +
    rooms.office   * 1 +
    rooms.dining   * 1;

  // Window area
  const windowAreaSqFt =
    rooms.bedrooms  * 2 * WINDOW_SQFT_BY_ROOM.bedroom +
    rooms.living    * 2 * WINDOW_SQFT_BY_ROOM.living  +
    rooms.kitchen   * 1 * WINDOW_SQFT_BY_ROOM.kitchen +
    rooms.bathrooms * 1 * WINDOW_SQFT_BY_ROOM.bathroom +
    rooms.office    * 1 * WINDOW_SQFT_BY_ROOM.other +
    rooms.dining    * 1 * WINDOW_SQFT_BY_ROOM.other;

  return { windowsCount, windowAreaSqFt };
}
