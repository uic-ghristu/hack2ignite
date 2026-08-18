"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TARGET_MS = new Date(2026, 9, 3, 21, 0, 0).getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function remainingFrom(now: number): Remaining {
  const diff = Math.max(0, TARGET_MS - now);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}

export function CountdownTimer({ className }: { className?: string }) {
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setTime(remainingFrom(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const days = time ? pad(time.days) : "--";
  const hours = time ? pad(time.hours) : "--";
  const minutes = time ? pad(time.minutes) : "--";
  const seconds = time ? pad(time.seconds) : "--";

  return (
    <div
      className={cn(
        className,
        "pointer-events-none absolute top-[8%] left-1/2 z-[5] w-full -translate-x-1/2 px-4 text-center text-white"
      )}
      role="timer"
      aria-live="polite"
      aria-label={
        time
          ? `${time.days} days ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds remaining`
          : "Loading countdown"
      }
    >
       <h1 className="text-3xl">Time until hackathon starts</h1>
      <div className="flex items-start justify-center gap-1.5 text-5xl leading-none sm:gap-2 sm:text-6xl md:text-7xl lg:text-8xl">
        <TimePart value={days} label="days" />
        <span className="translate-y-[-0.06em] opacity-80">:</span>
        <TimePart value={hours} label="hours" />
        <span className="translate-y-[-0.06em] opacity-80">:</span>
        <TimePart value={minutes} label="min" />
        <span className="translate-y-[-0.06em] opacity-80">:</span>
        <TimePart value={seconds} label="sec" />
      </div>
    </div>
  );
}

function TimePart({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[1.4em] flex-col items-center">
      <span>{value}</span>
      <span className="mt-2 text-lg tracking-[0.18em] text-white/80 sm:text-xl md:text-2xl">
        {label}
      </span>
    </div>
  );
}
