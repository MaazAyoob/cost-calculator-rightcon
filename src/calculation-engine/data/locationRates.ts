// ============================================================
// LOCATION RATES – City-wise Base Rates & Multipliers
// ============================================================

import { CityLocation, QualityTier } from '../../store/useWizardStore';

/** Base construction cost (₹ per sq ft BUA) */
export const BASE_RATE_PER_SQFT: Record<CityLocation, Record<QualityTier, number>> = {
  Bangalore: {
    Essential: 1750,
    Premium:   2450,
    Luxury:    3400,
  },
  Mysore: {
    Essential: 1550,
    Premium:   2150,
    Luxury:    2950,
  },
};

/** Labour rate multiplier (relative to Bangalore = 1.0) */
export const LABOUR_MULTIPLIER: Record<CityLocation, number> = {
  Bangalore: 1.00,
  Mysore:    0.88,
};

/** Material transport surcharge (flat ₹ per sq ft) */
export const TRANSPORT_SURCHARGE: Record<CityLocation, number> = {
  Bangalore: 0,
  Mysore:    45,
};

/** GST rate on construction services */
export const GST_RATE = 0.12; // 12% on construction services

/** Contractor overhead & margin */
export const CONTRACTOR_MARGIN: Record<QualityTier, number> = {
  Essential: 0.12, // 12%
  Premium:   0.15, // 15%
  Luxury:    0.18, // 18%
};

/** Professional fees (Architect + Structural + MEP consultants) */
export const PROFESSIONAL_FEES: Record<QualityTier, number> = {
  Essential: 0.04, // 4% of construction cost
  Premium:   0.05, // 5%
  Luxury:    0.07, // 7%
};

/** Contingency reserve */
export const CONTINGENCY_RATE: Record<QualityTier, number> = {
  Essential: 0.08, // 8%
  Premium:   0.06, // 6%
  Luxury:    0.04, // 4%
};

/** Stilt parking cost per car (₹) */
export const STILT_PARKING_COST_PER_CAR: Record<CityLocation, number> = {
  Bangalore: 180000,
  Mysore:    145000,
};

/** Lift cost including civil work (₹) */
export const LIFT_COST: Record<CityLocation, Record<QualityTier, number>> = {
  Bangalore: { Essential: 420000, Premium: 580000, Luxury: 900000 },
  Mysore:    { Essential: 380000, Premium: 520000, Luxury: 780000 },
};

/** EV charging infrastructure (₹) */
export const EV_CHARGING_COST = 75000;
