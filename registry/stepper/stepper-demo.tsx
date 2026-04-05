"use client"

import { useState } from "react"
import { RotateCcwIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper"

const steps = [
  {
    title: "Create account",
    description: "Sign up with your email and password",
  },
  {
    title: "Connect workspace",
    description: "Link your existing workspace or create a new one",
  },
  {
    title: "Configure settings",
    description: "Set up your preferences and notifications",
  },
  {
    title: "Invite team",
    description: "Add collaborators to your workspace",
  },
  {
    title: "Start building",
    description: "Create your first project and get started",
  },
]

function getStatus(
  index: number,
  currentStep: number,
): "complete" | "current" | "upcoming" {
  if (index < currentStep) return "complete"
  if (index === currentStep) return "current"
  return "upcoming"
}

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const isComplete = currentStep > steps.length - 1

  return (
    <div className="flex flex-col gap-6">
      <Stepper>
        {steps.map((step, i) => (
          <StepperItem key={step.title} status={getStatus(i, currentStep)}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </StepperContent>
            <StepperSeparator />
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(0)}
          disabled={currentStep === 0}
        >
          <RotateCcwIcon />
          Reset
        </Button>
        <Button
          size="sm"
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={isComplete}
        >
          Next step
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}
