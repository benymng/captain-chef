import { useState } from "react";

const useStep = (max, min = 1, initialStep = min) => {
  const [step, setStep] = useState(initialStep);

  const nextStep = () => {
    if (step < max) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > min) setStep(step - 1);
  };

  const moreStepsForward = () => {
    return step < max;
  };

  const moreStepsBackward = () => {
    return step > min;
  };

  const setInitialStep = () => {
    setStep(initialStep);
  };

  return [
    step,
    nextStep,
    previousStep,
    moreStepsForward,
    moreStepsBackward,
    setInitialStep,
  ];
};

export default useStep;
