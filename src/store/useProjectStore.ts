import { create } from 'zustand';
import { ProjectDetails, QualityGrade } from '../types';

interface ProjectState {
  project: ProjectDetails;
  updateProjectDetails: (details: Partial<ProjectDetails>) => void;
  setQualityGrade: (grade: QualityGrade) => void;
  resetProject: () => void;
}

const defaultProject: ProjectDetails = {
  id: 'BUN-2026-0891',
  name: 'Serene Villa Residency',
  location: {
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
  },
  plotSizeSqFt: 2400,
  builtUpAreaSqFt: 3850,
  floors: 3,
  bedrooms: 4,
  bathrooms: 5,
  parkingSpaces: 2,
  qualityGrade: 'Premium',
  soilType: 'Loam',
  status: 'Planning',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useProjectStore = create<ProjectState>((set) => ({
  project: defaultProject,
  updateProjectDetails: (details) =>
    set((state) => ({
      project: { ...state.project, ...details, updatedAt: new Date().toISOString() },
    })),
  setQualityGrade: (qualityGrade) =>
    set((state) => ({
      project: { ...state.project, qualityGrade, updatedAt: new Date().toISOString() },
    })),
  resetProject: () => set({ project: defaultProject }),
}));
