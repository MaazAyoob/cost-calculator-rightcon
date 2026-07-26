import { create } from 'zustand';
import { BudgetCategory, PaymentMilestone } from '../types';

interface BudgetState {
  totalEstimatedBudget: number;
  contingencyPercentage: number;
  categories: BudgetCategory[];
  paymentMilestones: PaymentMilestone[];
  
  updateCategoryAllocation: (id: string, amount: number) => void;
  setContingencyPercentage: (percentage: number) => void;
}

const defaultCategories: BudgetCategory[] = [
  { id: 'cat-1', name: 'Civil & Structure', allocatedAmount: 4235000, estimatedAmount: 4235000, percentage: 45, color: '#2563EB' },
  { id: 'cat-2', name: 'Finishing & Joinery', allocatedAmount: 2350000, estimatedAmount: 2350000, percentage: 25, color: '#3B82F6' },
  { id: 'cat-3', name: 'MEP (Plumbing & Electrical)', allocatedAmount: 1410000, estimatedAmount: 1410000, percentage: 15, color: '#60A5FA' },
  { id: 'cat-4', name: 'Interior & Fixtures', allocatedAmount: 940000, estimatedAmount: 940000, percentage: 10, color: '#93C5FD' },
  { id: 'cat-5', name: 'Permits & Approvals', allocatedAmount: 470000, estimatedAmount: 470000, percentage: 5, color: '#BFDBFE' },
];

const defaultMilestones: PaymentMilestone[] = [
  { stage: 1, title: 'Mobilization & Excavation', description: 'Site setup, soil testing, excavation & PCC foundation baseline', percentage: 10, amount: 940500, status: 'Completed', targetDate: 'Month 1' },
  { stage: 2, title: 'Foundation & Plinth Level', description: 'Column footings, plinth beam casting, and damp-proof course', percentage: 15, amount: 1410750, status: 'Due', targetDate: 'Month 2' },
  { stage: 3, title: 'Superstructure Slabs (GF+1F+2F)', description: 'RCC columns, floor slab casting, beam reinforcements & staircase', percentage: 30, amount: 2821500, status: 'Pending', targetDate: 'Month 4' },
  { stage: 4, title: 'Brickwork & Internal Plastering', description: 'Autoclaved aerated concrete block work, conduit wiring & plaster', percentage: 20, amount: 1881000, status: 'Pending', targetDate: 'Month 6' },
  { stage: 5, title: 'Flooring, Tiling & Joinery', description: 'Vitrified flooring, bathroom waterproofing, door frames & windows', percentage: 15, amount: 1410750, status: 'Pending', targetDate: 'Month 8' },
  { stage: 6, title: 'Painting, Fixtures & Handover', description: 'Final coat paint, CP sanitary fittings, testing, final inspection', percentage: 10, amount: 940500, status: 'Pending', targetDate: 'Month 10' },
];

export const useBudgetStore = create<BudgetState>((set) => ({
  totalEstimatedBudget: 9405000,
  contingencyPercentage: 5,
  categories: defaultCategories,
  paymentMilestones: defaultMilestones,

  updateCategoryAllocation: (id, amount) =>
    set((state) => ({
      categories: state.categories.map((cat) => (cat.id === id ? { ...cat, allocatedAmount: amount } : cat)),
    })),

  setContingencyPercentage: (contingencyPercentage) => set({ contingencyPercentage }),
}));
