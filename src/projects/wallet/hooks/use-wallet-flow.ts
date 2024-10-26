import { useState } from 'react';

export const useWalletFlow = () => {
  const [step, setStep] = useState(0);
  const [flow, setFlow] = useState<'create' | 'import'>('create');
  const [completedSteps, setCompletedSteps] = useState([true, false, false, false]);

  const nextStep = () => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[step] = true;
    setCompletedSteps(newCompletedSteps);
    setStep(step + 1);
  };

  return {
    step,
    setStep,
    flow,
    setFlow,
    completedSteps,
    nextStep,
  };
};