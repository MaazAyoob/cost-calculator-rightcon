import { create } from 'zustand';

interface ReportState {
  includeArchitecturalDrawings: boolean;
  includeDetailedBOQ: boolean;
  includeMaterialSpecification: boolean;
  includeCashflowSchedule: boolean;
  preparedFor: string;
  clientNotes: string;

  toggleOption: (key: 'includeArchitecturalDrawings' | 'includeDetailedBOQ' | 'includeMaterialSpecification' | 'includeCashflowSchedule') => void;
  setPreparedFor: (name: string) => void;
  setClientNotes: (notes: string) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  includeArchitecturalDrawings: true,
  includeDetailedBOQ: true,
  includeMaterialSpecification: true,
  includeCashflowSchedule: true,
  preparedFor: 'Rajesh & Ananya Sharma',
  clientNotes: 'Custom modern elevation with double-height living room & terrace solar deck.',

  toggleOption: (key) => set((state) => ({ [key]: !state[key] })),
  setPreparedFor: (preparedFor) => set({ preparedFor }),
  setClientNotes: (clientNotes) => set({ clientNotes }),
}));
