"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import Snowfall from "react-snowfall";

const prizes = [
  {
    place: 2,
    rank: "2nd",
    amount: "50,000",
    short: "50K",
    chest: "/chest/iron-chest-.png",
    metal: "Iron",
    glow: "bg-slate-200/25",
    ring: "ring-slate-300/30",
    step: "from-slate-400/25 to-slate-700/40",
    podium: "h-16 md:h-20",
  },
  {
    place: 1,
    rank: "1st",
    amount: "70,000",
    short: "70K",
    chest: "/chest/diamond-chest-.png",
    metal: "Diamond",
    glow: "bg-cyan-300/35",
    ring: "ring-cyan-300/40",
    step: "from-cyan-300/30 to-cyan-800/40",
    podium: "h-24 md:h-28",
  },
  {
    place: 3,
    rank: "3rd",
    amount: "30,000",
    short: "30K",
    chest: "/chest/copper-chest-.png",
    metal: "Copper",
    glow: "bg-orange-400/30",
    ring: "ring-orange-300/35",
    step: "from-orange-300/25 to-orange-800/40",
    podium: "h-12 md:h-16",
  },
] as const;

export function OverlapSection({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["14vh", "0vh"]);

  return (
    <motion.section
      id="prizes"
      ref={ref}
      style={{ y: reduceMotion ? 0 : y }}
      className={cn(
        className,
        "relative z-20 -mt-[32vh] min-h-screen rounded-t-[2.5rem] bg-gray-900 text-white shadow-[0_-18px_50px_rgba(0,0,0,0.18)] will-change-transform md:rounded-t-[3.5rem]"
      )}
    >
      <Snowfall 
      snowflakeCount={15}
      speed={[0, 0.5]}
      wind={[0, 0.5]}
      radius={[0.5, 1.5]}
      />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-16 sm:px-10 md:pt-20">
        <header className="flex flex-col items-center text-center">
          <h1 className="mt-1 text-5xl leading-none sm:text-6xl md:text-7xl">
            Prize Pool: Rs.1,50,000
          </h1>
        </header>

        <div className="mt-10 grid flex-1 grid-cols-1 items-end gap-10 md:mt-6 md:grid-cols-3 md:gap-6 lg:gap-10">
          {prizes.map((prize, i) => (
            <PrizeCard
              key={prize.place}
              prize={prize}
              featured={prize.place === 1}
              delay={i * 0.12}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function PrizeCard({
  prize,
  featured,
  delay,
  reduceMotion,
}: {
  prize: (typeof prizes)[number];
  featured: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative mt-16 flex flex-col items-center rounded-2xl bg-white px-4 pb-6 pt-6 text-black",
        featured && "md:-translate-y-6",
        prize.place === 1 && "order-first md:order-none"
      )}
    >
      <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-[calc(100%-8px)] items-end">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className="relative z-0 -mr-px text-white"
          aria-hidden
        >
          <path
            d="M18 0v18H0c9.9 0 18-8.1 18-18Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="relative z-[1] rounded-t-2xl bg-white px-5 pt-1.5 pb-3 text-2xl leading-none whitespace-nowrap shadow-[0_10px_0_0_#fff] sm:px-6 sm:text-3xl">
          {prize.rank} PRIZE
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className="relative z-0 -ml-px text-white"
          aria-hidden
        >
          <path
            d="M0 0v18h18C8.1 18 0 9.9 0 0Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute top-[18%] h-36 w-36 rounded-full blur-3xl md:h-44 md:w-44",
          prize.glow
        )}
      />

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, featured ? -10 : -6, 0] }}
        transition={{
          duration: featured ? 2.8 : 3.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className={cn("relative", featured ? "w-52 sm:w-60 md:w-64" : "w-40 sm:w-44 md:w-48")}
      >
        <Image
          src={prize.chest}
          alt={`${prize.rank} place ${prize.metal} chest`}
          width={437}
          height={571}
          className="h-auto w-full [image-rendering:pixelated] drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </motion.div>

      <div className="mt-4 text-center">
        <p
          className={cn(
            "leading-none",
            featured ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"
          )}
        >
          Rs.{prize.amount}
        </p>
      </div>
    </motion.article>
  );
}
