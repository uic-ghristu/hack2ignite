"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ScheduleItem {
  phase: string;
  duration: string;
  dates: string;
  badge: string;
  description: string;
  icon: string;
}

const scheduleEvents: ScheduleItem[] = [
  {
    phase: "Round 0: Registration Phase",
    duration: "20+ Days",
    dates: "18 July – 10 August",
    badge: "Open for All",
    description: "Open registration for participants across the country hosted on unstop.com. Assemble your team and ignite your ideas!",
    icon: "📝",
  },
  {
    phase: "Round 1: Qualifier Round",
    duration: "48 Hours",
    dates: "12 August",
    badge: "Online Prototype",
    description: "Registered teams receive problem statements. Teams must build & submit their working prototype and PPT deck within 48 hours.",
    icon: "💻",
  },
  {
    phase: "Evaluation & Shortlisting",
    duration: "15 Days",
    dates: "14 August – 15 August",
    badge: "Top 20 Review",
    description: "Comprehensive evaluation of prototype & presentation submissions to shortlist the top 20 teams for the offline finals.",
    icon: "🎯",
  },
  {
    phase: "Round 2: Offline Final Pitch",
    duration: "12 Hours",
    dates: "29 August",
    badge: "On-Campus Final",
    description: "Top 20 shortlisted teams pitch their solutions live and showcase working prototypes before our esteemed judging panel on-campus.",
    icon: "⚔️",
  },
  {
    phase: "Result Announcement",
    duration: "Same Day",
    dates: "29 August",
    badge: "Victory & Prizes",
    description: "Winners announced live on stage! Prize pool, trophies, and swags distributed at the grand closing ceremony.",
    icon: "🏆",
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // Exactly Two Colors: Day (#7DAAFF) -> Night (#284B8D)
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.85],
    ["#7DAAFF", "#284B8D"]
  );

  // Sun (Day Celestial Body): Appears top left during daytime, glides rightwards & sets down/fades as night arrives
  const sunX = useTransform(smoothProgress, [0, 0.55], ["5vw", "48vw"]);
  const sunY = useTransform(smoothProgress, [0, 0.55], ["0px", "70px"]);
  const sunOpacity = useTransform(smoothProgress, [0, 0.42, 0.55], [1, 1, 0]);

  // Moon (Night Celestial Body): Rises from downside as sky darkens & glides across night sky
  const moonX = useTransform(smoothProgress, [0.45, 1], ["45vw", "80vw"]);
  const moonY = useTransform(smoothProgress, [0.45, 0.65, 1], ["75px", "0px", "15px"]);
  const moonOpacity = useTransform(smoothProgress, [0.42, 0.55, 1], [0, 1, 1]);

  // Central Progress Line height
  const lineHeight = useTransform(smoothProgress, [0.05, 0.95], ["0%", "100%"]);

  // Cloud Opacities for Day vs Night Transition
  const dayCloudOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const nightCloudOpacity = useTransform(smoothProgress, [0.35, 0.9], [0, 1]);

  // Cloud Parallax Movements
  const cloudX1 = useTransform(smoothProgress, [0, 1], [0, -180]);
  const cloudX2 = useTransform(smoothProgress, [0, 1], [0, 220]);
  const cloudX3 = useTransform(smoothProgress, [0, 1], [0, -240]);
  const cloudX4 = useTransform(smoothProgress, [0, 1], [0, 260]);
  const cloudX5 = useTransform(smoothProgress, [0, 1], [0, -200]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-[240vh] w-full py-16 px-4 overflow-hidden select-none"
    >
      {/* Dynamic Minecraft Clouds Layer */}
      {/* Day Clouds */}
      <motion.div
        style={{ opacity: dayCloudOpacity, x: cloudX1 }}
        animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-10 left-4 w-72 md:w-96 pointer-events-none drop-shadow-md z-0"
      >
        <Image
          src="/stock/day-cloud.png"
          alt="Day Cloud 1"
          width={400}
          height={200}
          className="w-full h-auto object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>

      <motion.div
        style={{ opacity: dayCloudOpacity, x: cloudX2 }}
        animate={{ y: [0, -15, 0], x: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 9.5, ease: "easeInOut", delay: 1 }}
        className="absolute top-32 right-6 w-80 md:w-[28rem] pointer-events-none drop-shadow-md z-0"
      >
        <Image
          src="/stock/day-cloud-2.png"
          alt="Day Cloud 2"
          width={450}
          height={220}
          className="w-full h-auto object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>

      <motion.div
        style={{ opacity: dayCloudOpacity, x: cloudX5 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 2 }}
        className="absolute top-96 left-1/3 w-64 md:w-80 pointer-events-none drop-shadow-md z-0 opacity-80"
      >
        <Image
          src="/stock/day-cloud.png"
          alt="Day Cloud 3"
          width={350}
          height={180}
          className="w-full h-auto object-contain pointer-events-none select-none scale-x-[-1]"
          draggable={false}
        />
      </motion.div>

      {/* Night Clouds */}
      <motion.div
        style={{ opacity: nightCloudOpacity, x: cloudX3 }}
        animate={{ y: [0, -14, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
        className="absolute top-1/3 left-8 w-80 md:w-[32rem] pointer-events-none drop-shadow-2xl z-0"
      >
        <Image
          src="/stock/night-cloud.png"
          alt="Night Cloud 1"
          width={500}
          height={250}
          className="w-full h-auto object-contain opacity-90 pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>

      <motion.div
        style={{ opacity: nightCloudOpacity, x: cloudX4 }}
        animate={{ y: [0, -18, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-2/3 right-10 w-84 md:w-[34rem] pointer-events-none drop-shadow-2xl z-0"
      >
        <Image
          src="/stock/night-cloud.png"
          alt="Night Cloud 2"
          width={520}
          height={260}
          className="w-full h-auto object-contain opacity-85 pointer-events-none select-none scale-x-[-1]"
          draggable={false}
        />
      </motion.div>

      <motion.div
        style={{ opacity: nightCloudOpacity, x: cloudX1 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2.5 }}
        className="absolute bottom-20 left-12 w-72 md:w-96 pointer-events-none drop-shadow-2xl z-0"
      >
        <Image
          src="/stock/night-cloud.png"
          alt="Night Cloud 3"
          width={400}
          height={200}
          className="w-full h-auto object-contain opacity-75 pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>

      {/* Sticky Square Sun & Moon Header Sky Bar */}
      <div className="sticky top-12 z-30 w-full pointer-events-none mb-6 h-24">
        {/* Pure White Minecraft Sun (Daytime -> Sets Down) */}
        <motion.div
          style={{ x: sunX, y: sunY, opacity: sunOpacity }}
          className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 pointer-events-none drop-shadow-[0_0_24px_rgba(255,255,255,0.9)]"
        >
          <div className="absolute -inset-3 bg-white/40 border-2 border-black/30 shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
          <div className="relative w-full h-full bg-white border-4 border-black shadow-[6px_6px_0_#000] p-1.5 flex flex-col justify-between">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-black" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-black" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-black" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-black" />

            <div className="w-full h-full border-2 border-black/20 p-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-2.5 h-2.5 bg-yellow-100/80" />
                <div className="w-3.5 h-2.5 bg-black/10" />
              </div>
              <div className="flex justify-between items-end">
                <div className="w-3.5 h-2.5 bg-black/10" />
                <div className="w-2.5 h-2.5 bg-yellow-100/80" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pure White Minecraft Moon (Rises from Downside -> Night Sky) */}
        <motion.div
          style={{ x: moonX, y: moonY, opacity: moonOpacity }}
          className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 pointer-events-none drop-shadow-[0_0_24px_rgba(255,255,255,0.8)]"
        >
          <div className="absolute -inset-3 bg-sky-100/30 border-2 border-black/30 shadow-[0_0_30px_rgba(255,255,255,0.7)]" />
          <div className="relative w-full h-full bg-white border-4 border-black shadow-[6px_6px_0_#000] p-1.5 flex flex-col justify-between">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-black" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-black" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-black" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-black" />

            <div className="w-full h-full border-2 border-black/20 p-1 flex flex-col justify-between">
              <div className="flex flex-col justify-around h-full">
                <div className="w-3 h-3 bg-slate-300/80 border border-slate-400 ml-auto" />
                <div className="w-2.5 h-2.5 bg-slate-300/80 border border-slate-400 ml-2" />
                <div className="w-4 h-2 bg-slate-300/60 border border-slate-400 ml-6" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="minecraft-font text-4xl md:text-6xl text-white drop-shadow-[0_4px_0_#000] tracking-wider uppercase">
          Timeline & Schedule
        </h2>
        <p className="minecraft-font text-amber-200 text-lg md:text-2xl mt-4 drop-shadow-[0_2px_0_#000]">
          Follow the journey from registration to the grand finale
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-5xl mx-auto z-10 pb-24">
        {/* Track Line Background (Grey/Black Minecraft Rail) */}
        <div className="absolute left-1/2 top-4 bottom-4 w-3 -translate-x-1/2 bg-black/40 border-2 border-amber-950/60 rounded-none z-0" />

        {/* Animated Central Progress Line (Gold Minecraft Pixel Line) */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-4 w-3 -translate-x-1/2 bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 border-x-2 border-black z-0 shadow-[0_0_14px_rgba(251,191,36,0.9)]"
        />

        {/* Timeline Items */}
        <div className="flex flex-col gap-24 relative z-10">
          {scheduleEvents.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Box (Minecraft Styled Card) */}
                <div className="w-full md:w-[45%]">
                  <div className="relative bg-[#262626] border-4 border-black p-6 shadow-[6px_6px_0_#000] hover:translate-y-[-2px] transition-transform">
                    {/* Corner Pixel Trims */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-black" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-black" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-black" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-black" />

                    {/* Top Header Row */}
                    <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-3 mb-4">
                      <span className="minecraft-font text-amber-400 text-xs md:text-sm bg-neutral-900 border border-amber-600 px-3 py-1 uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span className="minecraft-font text-emerald-400 text-sm md:text-base font-bold">
                        {item.duration}
                      </span>
                    </div>

                    {/* Phase Title */}
                    <h3 className="minecraft-font text-white text-xl md:text-2xl mb-2 flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span>{item.phase}</span>
                    </h3>

                    {/* Dates */}
                    <p className="minecraft-font text-yellow-300 text-sm md:text-base mb-4">
                      📅 {item.dates}
                    </p>

                    {/* Description */}
                    <p className="minecraft-font text-neutral-300 text-sm leading-relaxed border-t border-neutral-800 pt-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Diamond/Emerald Node Icon */}
                <div className="relative my-6 md:my-0 flex items-center justify-center z-20">
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 45 }}
                    className="w-12 h-12 bg-emerald-500 border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center rotate-45 cursor-pointer hover:bg-yellow-400 transition-colors"
                  >
                    <div className="-rotate-45 minecraft-font text-black font-bold text-xs">
                      {index + 1}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for opposite side alignment */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
