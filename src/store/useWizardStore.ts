import { create } from 'zustand';

export type QualityTier = 'Essential' | 'Premium' | 'Luxury';
export type CityLocation = 'Bangalore' | 'Mysore';
export type AuthorityOption = 'BBMP' | 'BDA' | 'Gram Panchayat' | 'Future Ready';
export type HouseType = 'Villa' | 'Duplex' | 'Triplex' | 'Rental' | 'Mixed Use';

export interface RoomCounts {
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  dining: number;
  living: number;
  balcony: number;
  office: number;
  pooja: number;
  utility: number;
  storeRoom: number;
}

export interface MaterialBrandSelection {
  steel: string;
  cement: string;
  doors: string;
  windows: string;
  flooring: string;
  bathroom: string;
  electrical: string;
  paint: string;
}

export interface ConfiguratorState {
  currentStep: number; // 1 to 10
  totalSteps: number;

  // Step 1: Location
  city: CityLocation;
  
  // Step 2: Authority
  authority: AuthorityOption;

  // Step 3: Plot
  plotLength: number; // ft
  plotWidth: number; // ft

  // Step 4: House
  houseType: HouseType;
  floors: number; // 1 (Ground), 2 (G+1), 3 (G+2), 4 (G+3)

  // Step 5: Parking & Tech
  parkingType: 'Normal Parking' | 'Stilt Parking';
  carCount: number;
  bikeCount: number;
  evCharging: boolean;
  liftRequired: boolean;

  // Step 6: Room Planning
  rooms: RoomCounts;

  // Step 7: Quality Tier
  qualityTier: QualityTier;

  // Step 8: Material Brands
  materialBrands: MaterialBrandSelection;

  // Computed Live Preview Metrics
  calculatedAreaSqFt: number;
  calculatedBuildableAreaSqFt: number;
  calculatedCostINR: number;
  calculatedSteelTonnes: number;
  calculatedCementBags: number;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCity: (city: CityLocation) => void;
  setAuthority: (authority: AuthorityOption) => void;
  setPlotDimensions: (length: number, width: number) => void;
  setHouseConfig: (type: HouseType, floors: number) => void;
  setParkingConfig: (parkingType: 'Normal Parking' | 'Stilt Parking', cars: number, bikes: number, ev: boolean, lift: boolean) => void;
  updateRoomCount: (room: keyof RoomCounts, delta: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  setMaterialBrand: (category: keyof MaterialBrandSelection, brand: string) => void;
  recalculateMetrics: () => void;
  resetConfigurator: () => void;
}

const initialRooms: RoomCounts = {
  bedrooms: 4,
  bathrooms: 4,
  kitchen: 1,
  dining: 1,
  living: 2,
  balcony: 2,
  office: 1,
  pooja: 1,
  utility: 1,
  storeRoom: 1,
};

const initialBrands: MaterialBrandSelection = {
  steel: 'Tata Tiscon Fe 550D',
  cement: 'UltraTech OPC 53',
  doors: 'Teakwood Custom Joinery',
  windows: 'Fenesta uPVC Double Glaze',
  flooring: 'Italian Marble Statuario',
  bathroom: 'Kohler Concealed Thermostatic',
  electrical: 'Schneider Electric & Finolex',
  paint: 'Asian Paints Royale Luxury',
};

export const useWizardStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 1,
  totalSteps: 10,

  city: 'Bangalore',
  authority: 'BBMP',
  plotLength: 60,
  plotWidth: 40,

  houseType: 'Duplex',
  floors: 3, // G+2

  parkingType: 'Stilt Parking',
  carCount: 2,
  bikeCount: 2,
  evCharging: true,
  liftRequired: true,

  rooms: initialRooms,
  qualityTier: 'Premium',
  materialBrands: initialBrands,

  calculatedAreaSqFt: 2400,
  calculatedBuildableAreaSqFt: 3850,
  calculatedCostINR: 9405000,
  calculatedSteelTonnes: 18.5,
  calculatedCementBags: 1450,

  setStep: (step) => {
    set({ currentStep: Math.min(Math.max(1, step), 10) });
    get().recalculateMetrics();
  },
  nextStep: () => {
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 10) }));
    get().recalculateMetrics();
  },
  prevStep: () => {
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) }));
    get().recalculateMetrics();
  },

  setCity: (city) => {
    set({ city });
    get().recalculateMetrics();
  },
  setAuthority: (authority) => {
    set({ authority });
    get().recalculateMetrics();
  },
  setPlotDimensions: (length, width) => {
    set({ plotLength: length, plotWidth: width });
    get().recalculateMetrics();
  },
  setHouseConfig: (houseType, floors) => {
    set({ houseType, floors });
    get().recalculateMetrics();
  },
  setParkingConfig: (parkingType, carCount, bikeCount, evCharging, liftRequired) => {
    set({ parkingType, carCount, bikeCount, evCharging, liftRequired });
    get().recalculateMetrics();
  },
  updateRoomCount: (room, delta) => {
    set((state) => ({
      rooms: {
        ...state.rooms,
        [room]: Math.max(0, state.rooms[room] + delta),
      },
    }));
    get().recalculateMetrics();
  },
  setQualityTier: (qualityTier) => {
    set({ qualityTier });
    get().recalculateMetrics();
  },
  setMaterialBrand: (category, brand) => {
    set((state) => ({
      materialBrands: { ...state.materialBrands, [category]: brand },
    }));
    get().recalculateMetrics();
  },

  recalculateMetrics: () => {
    // Update wizard preview metrics from the real calculation engine
    const { plotLength, plotWidth, floors, qualityTier } = get();
    const plotArea = plotLength * plotWidth;
    const groundCoverage = plotArea * 0.60;
    const builtUpArea = Math.round(groundCoverage * 0.92 * floors);

    // Sync quick-preview fields from the engine (full sync via useCalculationStore)
    // Import lazily to avoid circular dependency at module level
    try {
      const { useCalculationStore } = require('./useCalculationStore');
      useCalculationStore.getState().recalculate();
      const result = useCalculationStore.getState().result;
      set({
        calculatedAreaSqFt:            result.area.plotAreaSqFt,
        calculatedBuildableAreaSqFt:   result.area.totalBUASqFt,
        calculatedCostINR:             result.budget.totalProjectCost,
        calculatedSteelTonnes:         result.quantities.steelTonnes,
        calculatedCementBags:          result.quantities.cementBags,
      });
    } catch {
      // Fallback quick estimate if store not yet available
      const buaFallback = Math.round(plotArea * 0.60 * 0.92 * floors);
      set({
        calculatedAreaSqFt:            plotArea,
        calculatedBuildableAreaSqFt:   buaFallback,
        calculatedCostINR:             Math.round(buaFallback * (qualityTier === 'Luxury' ? 3400 : qualityTier === 'Premium' ? 2450 : 1750)),
        calculatedSteelTonnes:         parseFloat(((buaFallback * 4.5) / 1000).toFixed(1)),
        calculatedCementBags:          Math.round(buaFallback * 0.44),
      });
    }
  },

  resetConfigurator: () => {
    set({
      currentStep: 1,
      city: 'Bangalore',
      authority: 'BBMP',
      plotLength: 60,
      plotWidth: 40,
      houseType: 'Duplex',
      floors: 3,
      rooms: initialRooms,
      qualityTier: 'Premium',
      materialBrands: initialBrands,
    });
    get().recalculateMetrics();
  },
}));
