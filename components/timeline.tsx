"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import Snowfall from "react-snowfall";

const events = [
  {
    date: "20 Aug 2026",
    title: "Registration Starts",
    description: "Registrations open. Sign up and lock in your team.",
  },
  {
    date: "16–17 Sept 2026",
    title: "Online Prototype Round",
    description:
      "Problem statements drop. Start building your prototype online.",
  },
  {
    date: "25 Sept 2026",
    title: "Results & Shortlisting",
    description:
      "Online round results are out. Shortlisted teams move to the on-campus round.",
  },
  {
    date: "3 Oct 2026",
    title: "On-Campus Round",
    description:
      "Shortlisted teams come on campus to tweak, add features, polish the product, and pitch.",
  },
  {
    date: "3 Oct 2026",
    title: "Final Results",
    description: "Winners announced the same day.",
  },
] as const;

type Point = { x: number; y: number };

function curveThrough(points: Point[]) {
  if (points.length < 2) return "";

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dy = curr.y - prev.y;
    const bulge = (curr.x - prev.x) * 0.18;
    d += ` C ${prev.x - bulge} ${prev.y + dy * 0.58}, ${curr.x + bulge} ${curr.y - dy * 0.58}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function Timeline({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [path, setPath] = useState("");
  const [dots, setDots] = useState<Point[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 35%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const desktop = window.innerWidth >= 768;
      const nodes: Point[] = [];

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const card = item.querySelector("article");
        if (!card) return;
        const r = card.getBoundingClientRect();
        const left = i % 2 === 0;
        const y = r.top - box.top + 28;
        // On mobile: all dots align to the same x (straight vertical line)
        // On desktop: alternate left/right
        const x = desktop
          ? left
            ? r.right - box.left + 10
            : r.left - box.left - 10
          : 20;
        nodes.push({ x, y });
      });

      if (!nodes.length) return;

      setSize({ w: box.width, h: box.height });
      setDots(nodes);
      setPath(curveThrough(nodes));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const stroke = `timeline-stroke-${uid}`;
  const glow = `timeline-glow-${uid}`;

  return (
    <section
      id="timeline"
      className={cn(
        "w-full bg-gray-900 px-6 py-16 text-white sm:px-10 md:py-24",
        className
      )}
    >
      <Snowfall
        snowflakeCount={15}
        speed={[0, 0.5]}
        wind={[0, 0.5]}
        radius={[0.5, 1.5]}
      />
      <h1 className="text-center text-5xl leading-none sm:text-6xl md:text-7xl">
        Timeline
      </h1>

      <div ref={ref} className="relative mx-auto mt-16 max-w-5xl md:mt-20">
        {path && size.w > 0 && (
          <svg
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
            className="pointer-events-none absolute inset-0 overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id={stroke} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dff2ff" />
                <stop offset="45%" stopColor="#90C5EF" />
                <stop offset="100%" stopColor="#5aa3d8" />
              </linearGradient>
              <filter id={glow} x="-20%" y="-10%" width="140%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={path}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              d={path}
              fill="none"
              stroke={`url(#${stroke})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${glow})`}
              pathLength={1}
              style={{ pathLength: reduceMotion ? 1 : progress }}
            />

            {dots.map((dot, i) => (
              <g key={`${dot.x}-${dot.y}-${i}`}>
                <circle cx={dot.x} cy={dot.y} r="9" fill="#111827" />
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r="5"
                  fill="#90C5EF"
                  stroke="#dff2ff"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </svg>
        )}

        <ol className="space-y-8 md:space-y-24">
          {events.map((event, i) => (
            <TimelineCard
              key={`${event.title}-${event.date}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              event={event}
              side={i % 2 === 0 ? "left" : "right"}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineCard({
  ref,
  event,
  side,
  reduceMotion,
}: {
  ref: (el: HTMLLIElement | null) => void;
  event: (typeof events)[number];
  side: "left" | "right";
  reduceMotion: boolean;
}) {
  const left = side === "left";

  return (
    <li ref={ref} className="relative grid md:grid-cols-2">
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative z-10 ml-10 p-4 text-white sm:p-6 md:ml-0",
          left ? "md:col-start-1 md:mr-14" : "md:col-start-2 md:ml-14"
        )}
      >
        <p className="text-base text-white/80 sm:text-2xl">{event.date}</p>
        <h2 className="mt-1 text-2xl leading-none sm:text-4xl">{event.title}</h2>
        <p className="mt-2 text-base leading-snug text-white/75 sm:text-xl">
          {event.description}
        </p>
      </motion.article>
    </li>
  );
}
