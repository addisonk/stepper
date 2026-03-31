"use client"

import { useState } from "react"
import { RotateCcwIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper"

type Size = "sm" | "default" | "lg"
type Status = "complete" | "current" | "upcoming"

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

function getStatus(index: number, currentStep: number): Status {
  if (index < currentStep) return "complete"
  if (index === currentStep) return "current"
  return "upcoming"
}

export default function Page() {
  const [size, setSize] = useState<Size>("default")
  const [currentStep, setCurrentStep] = useState(0)
  const isComplete = currentStep > steps.length - 1

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Stepper
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            A vertical stepper component with animated transitions and size
            variants. Built with shadcn/ui conventions.
          </p>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Installation
            </p>
            <code className="block rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm">
              npx shadcn@latest add
              https://stepper-component.vercel.app/r/stepper.json
            </code>
          </div>
        </div>

        {/* Interactive demo */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Size:
            </span>
            <ToggleGroup
              type="single"
              value={size}
              onValueChange={(value) => {
                if (value) setSize(value as Size)
              }}
            >
              <ToggleGroupItem value="sm">sm</ToggleGroupItem>
              <ToggleGroupItem value="default">default</ToggleGroupItem>
              <ToggleGroupItem value="lg">lg</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(0)}
              disabled={currentStep === 0}
            >
              <RotateCcwIcon data-icon="inline-start" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={isComplete}
            >
              Next step
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-8">
          <Stepper size={size}>
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
        </div>

        {/* Title only variant */}
        <h2 className="mt-16 mb-6 text-xl font-semibold tracking-tight">
          Title Only
        </h2>
        <div className="rounded-xl border bg-card p-8">
          <Stepper>
            <StepperItem status="complete">
              <StepperIndicator />
              <StepperTitle>Create account</StepperTitle>
              <StepperSeparator />
            </StepperItem>
            <StepperItem status="complete">
              <StepperIndicator />
              <StepperTitle>Connect workspace</StepperTitle>
              <StepperSeparator />
            </StepperItem>
            <StepperItem status="current">
              <StepperIndicator />
              <StepperTitle>Configure settings</StepperTitle>
              <StepperSeparator />
            </StepperItem>
            <StepperItem status="upcoming">
              <StepperIndicator />
              <StepperTitle>Invite team</StepperTitle>
              <StepperSeparator />
            </StepperItem>
            <StepperItem status="upcoming">
              <StepperIndicator />
              <StepperTitle>Start building</StepperTitle>
              <StepperSeparator />
            </StepperItem>
          </Stepper>
        </div>

        {/* Step states reference */}
        <h2 className="mt-16 mb-6 text-xl font-semibold tracking-tight">
          Step States
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {(["complete", "current", "upcoming"] as const).map((status) => (
            <div key={status} className="rounded-xl border bg-card p-6">
              <p className="mb-4 text-sm font-medium capitalize text-muted-foreground">
                {status}
              </p>
              <Stepper size="sm">
                <StepperItem status={status}>
                  <StepperIndicator />
                  <StepperContent>
                    <StepperTitle>First step</StepperTitle>
                    <StepperDescription>Step description</StepperDescription>
                  </StepperContent>
                  <StepperSeparator />
                </StepperItem>
                <StepperItem status={status}>
                  <StepperIndicator />
                  <StepperContent>
                    <StepperTitle>Second step</StepperTitle>
                    <StepperDescription>Step description</StepperDescription>
                  </StepperContent>
                  <StepperSeparator />
                </StepperItem>
              </Stepper>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
