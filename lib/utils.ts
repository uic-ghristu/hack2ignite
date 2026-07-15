import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const playClickSound = () => {
  try {
    const audio = new Audio("/click.mp3")
    audio.play()
  } catch (e) {
    console.warn("Failed to play click sound:", e)
  }
}