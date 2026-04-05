"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StepperSize = "sm" | "default" | "lg"
type StepperStatus = "complete" | "current" | "upcoming"

const StepperContext = React.createContext<{ size: StepperSize }>({
  size: "default",
})

const StepperItemContext = React.createContext<{ status: StepperStatus }>({
  status: "upcoming",
})

function Stepper({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"ol"> & { size?: StepperSize }) {
  return (
    <StepperContext value={{ size }}>
      <ol
        data-slot="stepper"
        data-size={size}
        role="list"
        aria-label="Progress"
        className={cn("flex flex-col overflow-hidden", className)}
        {...props}
      />
    </StepperContext>
  )
}

function StepperItem({
  className,
  status = "upcoming",
  ...props
}: React.ComponentProps<"li"> & { status?: StepperStatus }) {
  const { size } = React.useContext(StepperContext)

  return (
    <StepperItemContext value={{ status }}>
      <li
        data-slot="stepper-item"
        data-status={status}
        {...(status === "current"
          ? { "aria-current": "step" as const }
          : {})}
        className={cn(
          "group/stepper-item relative flex items-center last:pb-0 [&:last-child>[data-slot=stepper-separator]]:hidden",
          size === "sm" && "gap-2 pb-4",
          size === "default" && "gap-2.5 pb-6",
          size === "lg" && "gap-3 pb-8",
          className
        )}
        {...props}
      />
    </StepperItemContext>
  )
}

function StepperIndicator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = React.useContext(StepperContext)
  const { status } = React.useContext(StepperItemContext)

  return (
    <div
      data-slot="stepper-indicator"
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
        size === "sm" && "size-4",
        size === "default" && "size-5",
        size === "lg" && "size-6",
        status === "complete" && "border-primary bg-primary",
        status === "current" && "border-primary bg-background",
        status === "upcoming" && "border-border bg-background",
        className
      )}
      {...props}
    >
      <CheckIcon
        className={cn(
          "absolute text-primary-foreground transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          size === "sm" && "size-2.5",
          size === "default" && "size-3",
          size === "lg" && "size-3.5",
          status === "complete"
            ? "scale-100 opacity-100 blur-0"
            : "scale-[0.25] opacity-0 blur-[4px]"
        )}
      />
      <span
        className={cn(
          "absolute rounded-full bg-primary transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          size === "sm" && "size-1",
          size === "default" && "size-1.5",
          size === "lg" && "size-2",
          status === "current"
            ? "scale-100 opacity-100 blur-0"
            : "scale-[0.25] opacity-0 blur-[4px]"
        )}
      />
    </div>
  )
}

function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = React.useContext(StepperContext)
  const { status } = React.useContext(StepperItemContext)

  return (
    <div
      data-slot="stepper-separator"
      aria-hidden="true"
      className={cn(
        "absolute h-full w-px -translate-x-1/2 bg-border",
        size === "sm" && "left-2 top-4",
        size === "default" && "left-[10px] top-5",
        size === "lg" && "left-3 top-6",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full origin-top bg-primary transition-[scale] duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
          status === "complete" ? "scale-y-100" : "scale-y-0"
        )}
      />
    </div>
  )
}

function StepperContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-content"
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function StepperTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = React.useContext(StepperContext)
  const { status } = React.useContext(StepperItemContext)

  return (
    <div
      data-slot="stepper-title"
      className={cn(
        "font-semibold leading-none tracking-tight transition-[color] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
        size === "sm" && "text-xs",
        size === "default" && "text-sm",
        size === "lg" && "text-base",
        status === "upcoming" && "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { size } = React.useContext(StepperContext)
  const { status } = React.useContext(StepperItemContext)

  return (
    <p
      data-slot="stepper-description"
      className={cn(
        "text-muted-foreground transition-[opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
        size === "sm" && "text-xs",
        size === "default" && "text-xs",
        size === "lg" && "text-sm",
        status === "upcoming" && "opacity-50",
        className
      )}
      {...props}
    />
  )
}

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperDescription,
}
