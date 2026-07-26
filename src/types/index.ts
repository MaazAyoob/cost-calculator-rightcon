export type QualityGrade = 'Standard' | 'Premium' | 'Luxury';
export type ProjectStatus = 'Draft' | 'Planning' | 'BOQ Approved' | 'Construction Ready';

export interface ProjectDetails {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    pincode: string;
  };
  plotSizeSqFt: number;
  builtUpAreaSqFt: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  qualityGrade: QualityGrade;
  soilType: 'Clay' | 'Sandy' | 'Rocky' | 'Loam';
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export type DashboardTab = 'overview' | 'journey' | 'materials' | 'boq' | 'budget' | 'payment' | 'export';

export interface MaterialItem {
  id: string;
  category: 'Structure' | 'Finishing' | 'MEP' | 'Fixtures' | 'Joinery';
  name: string;
  brand: string;
  unit: string;
  estimatedQuantity: number;
  ratePerUnit: number;
  totalCost: number;
  specification: string;
  selectedTier: 'Standard' | 'Premium' | 'Luxury';
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  estimatedAmount: number;
  percentage: number;
  color: string;
}

export interface PaymentMilestone {
  stage: number;
  title: string;
  description: string;
  percentage: number;
  amount: number;
  status: 'Pending' | 'Due' | 'Completed';
  targetDate: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}
