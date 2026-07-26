// Doors Module
import { EngineInput } from '../types';

export function calculateDoors(input: EngineInput): {
  mainDoorsCount: number;
  internalDoorsCount: number;
} {
  const { rooms, floors } = input;

  // 1 main door per floor (ground entry + first floor terrace + roof)
  const mainDoorsCount = 1; // typically 1 main door per home

  // Internal doors: each bedroom, bathroom, utility, office, pooja, store
  const internalDoorsCount =
    rooms.bedrooms +
    rooms.bathrooms +
    rooms.utility +
    rooms.office +
    rooms.pooja +
    rooms.storeRoom +
    (floors > 1 ? 1 : 0); // terrace access door

  return { mainDoorsCount, internalDoorsCount };
}
