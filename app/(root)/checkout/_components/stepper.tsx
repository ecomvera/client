"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import React from "react";

const steps = [
  {
    step: 1,
    title: "Address",
  },
  {
    step: 2,
    title: "Items",
  },
  {
    step: 3,
    title: "Summary",
  },
];

export default function Component({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
}) {
  return (
    <div className="space-y-8 text-center ">
      <Stepper value={activeStep}>
        {steps.map(({ step, title }) => (
          <StepperItem key={step} step={step} className="w-full last:w-fit max-md:items-start">
            <StepperTrigger className="rounded max-md:flex-col" onClick={() => step < activeStep && setActiveStep(step)}>
              <StepperIndicator />
              <div className="text-center md:text-left mobile:text-nowrap">
                <StepperTitle>{title}</StepperTitle>
              </div>
            </StepperTrigger>
            {step < steps.length && <StepperSeparator className="max-md:mt-3.5 md:mx-4" />}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
