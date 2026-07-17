"use client"
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";

function FleeingSprite({
  children,
  style,
  animate,
  transition,
  className,
  repelForce = 70,
}: {
  children: React.ReactNode;
  style?: any;
  animate?: any;
  transition?: any;
  className?: string;
  repelForce?: number;
}) {
  const [repel, setRepel] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - e.clientX;
    const dy = centerY - e.clientY;
    const dist = Math.hypot(dx, dy) || 1;

    // Direct offset away from mouse cursor
    const pushX = (dx / dist) * repelForce;
    const pushY = (dy / dist) * repelForce;

    setRepel({ x: pushX, y: pushY });
  };

  const handleMouseLeave = () => {
    setRepel({ x: 0, y: 0 });
  };

  return (
    <motion.div
      style={style}
      className={`${className} pointer-events-auto cursor-grab active:cursor-grabbing select-none`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        drag
        dragSnapToOrigin
        whileDrag={{ scale: 1.15 }}
        animate={{ x: repel.x, y: repel.y }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full h-full"
      >
        <motion.div
          animate={animate}
          transition={transition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  // Parallax scroll movements to right / custom transforms
  const allyX = useTransform(smoothProgress, [0, 1], [0, 160]);
  const beeX = useTransform(smoothProgress, [0, 1], [0, 220]);
  const technoX = useTransform(smoothProgress, [0, 1], [0, 140]);

  // Steve initially offscreen right (100%), moves left into view on scroll
  const steveX = useTransform(smoothProgress, [0, 0.7], ["25%", "10%"]);

  return (
    <div ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-start overflow-hidden border-b-5 border-black">
      <Image
        src={'/hero-light-mode.png'}
        className="absolute -z-10 w-full h-full object-cover pointer-events-none select-none"
        height={1920}
        width={1080}
        alt="minecraft-bg"
        draggable={false}
      />

      {/* Left Side: 3 Allies with Floating, Scroll Parallax & Cursor Avoidance */}
      {/* Ally 1 (Normal, Upper Left) */}
      <FleeingSprite
        style={{ x: allyX }}
        animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
        className="absolute top-16 left-12 md:left-24 z-10 w-14 h-14 md:w-24 md:h-24 drop-shadow-lg"
      >
        <Image
          src="/stock/ally.gif"
          alt="Ally 1"
          width={128}
          height={128}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Ally 2 (Inverted, Mid Upper Left) */}
      <FleeingSprite
        style={{ x: allyX }}
        animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }}
        transition={{ repeat: Infinity, duration: 8.4, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-36 left-36 md:left-64 z-10 w-12 h-12 md:w-20 md:h-20 drop-shadow-lg scale-x-[-1]"
      >
        <Image
          src="/stock/ally.gif"
          alt="Ally 2 (Inverted)"
          width={112}
          height={112}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Ally 3 (Normal, Mid Lower Left) */}
      <FleeingSprite
        style={{ x: allyX }}
        animate={{ y: [0, -7, 0], rotate: [0, 3, -2, 0] }}
        transition={{ repeat: Infinity, duration: 8.0, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-64 left-8 md:left-16 z-10 w-16 h-16 md:w-28 md:h-28 drop-shadow-lg"
      >
        <Image
          src="/stock/ally.gif"
          alt="Ally 3"
          width={144}
          height={144}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Right Side: 4 Bees with Floating, Scroll Parallax & Cursor Avoidance */}
      {/* Bee 1 (Normal, Upper Right) */}
      <FleeingSprite
        style={{ x: beeX }}
        animate={{ y: [0, -9, 0], rotate: [0, -3, 3, 0] }}
        transition={{ repeat: Infinity, duration: 7.0, ease: "easeInOut" }}
        className="absolute top-16 right-12 md:right-28 z-10 w-14 h-14 md:w-24 md:h-24 drop-shadow-lg"
      >
        <Image
          src="/stock/bee.gif"
          alt="Bee 1"
          width={128}
          height={128}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Bee 2 (Inverted, Mid Upper Right) */}
      <FleeingSprite
        style={{ x: beeX }}
        animate={{ y: [0, -11, 0], rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 9.0, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-36 right-40 md:right-72 z-10 w-12 h-12 md:w-20 md:h-20 drop-shadow-lg scale-x-[-1]"
      >
        <Image
          src="/stock/bee.gif"
          alt="Bee 2 (Inverted)"
          width={112}
          height={112}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Bee 3 (Normal, Mid Lower Right) */}
      <FleeingSprite
        style={{ x: beeX }}
        animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
        transition={{ repeat: Infinity, duration: 8.2, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-60 right-16 md:right-32 z-10 w-16 h-16 md:w-28 md:h-28 drop-shadow-lg"
      >
        <Image
          src="/stock/bee.gif"
          alt="Bee 3"
          width={144}
          height={144}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Bee 4 (Inverted, Upper Outer Right) */}
      <FleeingSprite
        style={{ x: beeX }}
        animate={{ y: [0, -7, 0], rotate: [0, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 7.8, ease: "easeInOut", delay: 1.8 }}
        className="absolute top-24 right-4 md:right-10 z-10 w-10 h-10 md:w-16 md:h-16 drop-shadow-lg scale-x-[-1]"
      >
        <Image
          src="/stock/bee.gif"
          alt="Bee 4 (Inverted)"
          width={96}
          height={96}
          className="w-full h-full object-contain pointer-events-none select-none"
          unoptimized
          draggable={false}
        />
      </FleeingSprite>

      {/* Lower Left: Technoblade */}
      <motion.div
        style={{ x: technoX }}
        className="absolute bottom-25 left-5 z-10 w-44 h-44 md:w-60 md:h-60 pointer-events-none drop-shadow-2xl select-none"
      >
        <Image
          src="/stock/technoblade.png"
          alt="Technoblade"
          width={240}
          height={240}
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>

      {/* Lower Right: Steve (Initially out of window on right, moves left on scroll) */}
      <motion.div
        style={{ x: steveX }}
        className="absolute bottom-4 right-0 z-10 w-52 h-52 md:w-90 md:h-90 pointer-events-none drop-shadow-2xl select-none"
      >
        <Image
          src="/stock/steve.png"
          alt="Steve"
          width={288}
          height={288}
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>

      <Image
        src={'/main-logo.png'}
        width={1000}
        height={1000}
        alt="hack2ignite"
        className="h-80 w-150 mt-30 z-10 drop-shadow-xl pointer-events-none select-none"
        draggable={false}
      />
      <div className="mt-10 z-50 flex items-center justify-center gap-10">
        <Button variant={"minecraft"} className={"text-xl px-5 py-5"}>
          Register
        </Button>
        <Button variant={"minecraft"} className={"text-xl px-5 py-5"}>
          Tracks
        </Button>
      </div>
    </div>
  );
}
