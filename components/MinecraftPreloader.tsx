"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Progress } from "@/components/ui/progress"

export default function MinecraftPreloader({
  onComplete,
}: {
  onComplete?: () => void
}) {
  const [chunksLoaded, setChunksLoaded] = React.useState(0)
  const [status, setStatus] = React.useState("Loading world...")
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [showPreloader, setShowPreloader] = React.useState(true)

  const totalChunks = 47

  const percentage = Math.floor((chunksLoaded / totalChunks) * 100)

  React.useEffect(() => {
    if (chunksLoaded >= totalChunks) {
      setIsLoaded(true)
      setStatus("World loaded!")
      return
    }

    const progressSimulation = () => {
      const remaining = totalChunks - chunksLoaded
      const step = Math.min(
        remaining,
        Math.floor(Math.random() * 4) + 1
      )

      setChunksLoaded((prev) => prev + step)

      let nextDelay = Math.floor(Math.random() * 150) + 100
      const currentProgress = chunksLoaded + step

      if (currentProgress === 12 || currentProgress === 28 || currentProgress === 38) {
        nextDelay = Math.floor(Math.random() * 400) + 300
      }

      if (currentProgress < 12) {
        setStatus("Preparing spawn area...")
      } else if (currentProgress < 24) {
        setStatus("Generating terrain...")
      } else if (currentProgress < 38) {
        setStatus("Building structures...")
      } else if (currentProgress < totalChunks) {
        setStatus("Lighting chunks...")
      } else {
        setShowPreloader(false)
      }

      timerId = setTimeout(progressSimulation, nextDelay)
    }

    let timerId = setTimeout(progressSimulation, 250)
    return () => clearTimeout(timerId)
  }, [chunksLoaded])

  const [gridBlocks] = React.useState(() => {
    const cols = 12
    const rows = 8
    const blocksList = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = c - 5.5
        const dy = r - 3.5
        const dist = Math.sqrt(dx * dx + dy * dy)
        const delay = dist * 0.04 + Math.random() * 0.3

        blocksList.push({
          id: r * cols + c,
          col: c,
          row: r,
          delay,
        })
      }
    }
    return blocksList
  })

  if (!showPreloader) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none bg-black">
      <div className="absolute inset-0 minecraft-bg-dirt image-pixelated brightness-[0.4]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_15%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!isLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md flex flex-col items-center gap-6"
            >
              <div className="font-minecraft text-4xl text-white tracking-widest text-minecraft-shadow uppercase select-none text-center">
                {percentage}%
              </div>

              <Progress value={percentage} variant="minecraft" className="w-full" />

              <div className="flex flex-col items-center gap-1.5 font-minecraft text-xl text-[#B0B0B0] text-minecraft-shadow">
                <span>{status}</span>
                <span className="text-[#808080]">
                  {chunksLoaded}/{totalChunks} chunks
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
