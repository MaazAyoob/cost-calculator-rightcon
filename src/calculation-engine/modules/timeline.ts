// Timeline Module
import { EngineInput, AreaResult, TimelineResult, TimelineStage } from '../types';

/** Base stage durations in weeks at Premium quality, adjusted by quality & floors */
const BASE_STAGE_WEEKS: Record<string, number> = {
  'Site Preparation':       1,
  'Foundation':             3,
  'Plinth':                 2,
  'RCC Structure':          4,
  'Roof Slab':              3,
  'Brick Masonry':          3,
  'Internal Plaster':       2,
  'Waterproofing':          1,
  'Flooring':               3,
  'Electrical Work':        2,
  'Plumbing':               2,
  'Painting':               2,
  'Fixtures & Finishes':    2,
  'Final Inspection & Handover': 1,
};

const QUALITY_DURATION_FACTOR: Record<string, number> = {
  Essential: 0.9, // faster, fewer complex finishes
  Premium:   1.0,
  Luxury:    1.35, // more complex detailing
};

export function calculateTimeline(input: EngineInput, area: AreaResult): TimelineResult {
  const { floors, qualityTier } = input;
  const stageNames = Object.keys(BASE_STAGE_WEEKS);
  const qualFactor = QUALITY_DURATION_FACTOR[qualityTier];
  const floorFactor = 1 + (floors - 1) * 0.20; // +20% per extra floor

  let currentMonth = 0;
  const stages: TimelineStage[] = stageNames.map((name, idx) => {
    const baseWeeks = BASE_STAGE_WEEKS[name];
    const adjustedWeeks = baseWeeks * qualFactor * floorFactor;
    const durationMonths = parseFloat((adjustedWeeks / 4.33).toFixed(1));
    const startMonth = parseFloat(currentMonth.toFixed(1));
    currentMonth += durationMonths;
    const endMonth = parseFloat(currentMonth.toFixed(1));

    return {
      stageNumber: String(idx + 1).padStart(2, '0'),
      title: name,
      startMonth,
      durationMonths,
      endMonth,
      isCriticalPath: ['Foundation', 'RCC Structure', 'Roof Slab', 'Flooring'].includes(name),
    };
  });

  const totalMonths = Math.ceil(currentMonth);

  const today = new Date();
  const handoverDate = new Date(today);
  handoverDate.setMonth(handoverDate.getMonth() + totalMonths);

  return {
    totalMonths,
    stages,
    constructionStartDate: today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    estimatedHandoverDate: handoverDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
  };
}
