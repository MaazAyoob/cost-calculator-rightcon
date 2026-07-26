// ============================================================
// CUSTOM HOOK – useWizardStep
// Clean React hook managing wizard step bounds, progress %, and navigation
// ============================================================

import { useWizardStore } from '../store/useWizardStore';

export function useWizardStep() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const totalSteps = useWizardStore((s) => s.totalSteps);
  const setStep = useWizardStore((s) => s.setStep);
  const nextStep = useWizardStore((s) => s.nextStep);
  const prevStep = useWizardStore((s) => s.prevStep);

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    totalSteps,
    progressPercentage,
    isFirstStep,
    isLastStep,
    setStep,
    nextStep,
    prevStep,
  };
}
