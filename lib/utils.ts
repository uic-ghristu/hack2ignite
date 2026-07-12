import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()

    const bufferSize = ctx.sampleRate * 0.05
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 750 + Math.random() * 100
    filter.Q.value = 3.5

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start()
    noise.stop(ctx.currentTime + 0.05)
  } catch (e) {
    console.warn("Audio Context blocked or failed to initialize:", e)
  }
}