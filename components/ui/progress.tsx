"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

const ProgressContext = React.createContext<{ variant?: "default" | "minecraft" }>({
  variant: "default",
})

interface ProgressProps extends ProgressPrimitive.Root.Props {
  variant?: "default" | "minecraft"
}

function Progress({
  className,
  children,
  value,
  variant = "default",
  ...props
}: ProgressProps) {
  return (
    <ProgressContext.Provider value={{ variant }}>
      <ProgressPrimitive.Root
        value={value}
        data-slot="progress"
        className={cn(
          "flex flex-col gap-2 w-full",
          variant === "minecraft" ? "font-minecraft text-white" : "",
          className
        )}
        {...props}
      >
        {children}
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  const { variant } = React.useContext(ProgressContext)
  return (
    <ProgressPrimitive.Track
      className={cn(
        variant === "minecraft"
          ? "relative flex h-6 w-full items-center overflow-hidden rounded-none bg-[#2C2C2C] border-2 border-[#8E8E8E] p-[2px]"
          : "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  const { variant } = React.useContext(ProgressContext)
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        variant === "minecraft"
          ? "h-full bg-[#55FF55] transition-all rounded-none duration-100"
          : "h-full bg-primary transition-all",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  const { variant } = React.useContext(ProgressContext)
  return (
    <ProgressPrimitive.Label
      className={cn(
        "text-sm font-medium",
        variant === "minecraft" ? "text-base tracking-wide" : "",
        className
      )}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  const { variant } = React.useContext(ProgressContext)
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        variant === "minecraft" ? "text-base tracking-wide text-white" : "",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
