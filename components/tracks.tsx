"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const themes = [
  "FinTech",
  "Agriculture",
  "EduTech",
  "Healthcare",
  "Game Dev",
  "Environment and Sustainable Development",
  "Web3 and Blockchain",
  "AI for Good",
] as const;

export function Tracks({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="tracks"
      className={cn(
        "w-full bg-[#90C5EF] px-4 py-16 sm:px-8 md:px-10 md:py-24 min-h-screen",
        className
      )}
    >
      <h1 className="text-center text-5xl leading-none text-white sm:text-6xl md:text-7xl">
        Tracks
      </h1>

      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {themes.map((theme, i) => (
          <motion.div
            key={theme}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <ThemeCard title={theme} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ThemeCard({ title }: { title: string }) {
  return (
    <div className="border-[#584324] border-7 h-36 w-full sm:h-40 md:h-44">
      <div className="h-full w-full bg-[#E7CDA6] p-2 sm:p-3">
        <div className="flex h-full w-full items-center justify-center bg-[#ECD6B4] px-3 text-center text-xl leading-tight text-[#3a2a16] sm:text-2xl md:text-3xl">
          {title}
        </div>
      </div>
    </div>
  );
}
