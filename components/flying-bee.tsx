"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const BEE_SIZE = 120;
const EDGE = 16;

export function FlyingBee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bob = useMotionValue(0);
  const tilt = useMotionValue(-5);
  const face = useMotionValue(1);

  const yOut = useTransform([y, bob], ([base, offset]) => {
    return (base as number) + (offset as number);
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const ctrl = animate(bob, [0, -14, 9, -11, 12, 0], {
      duration: 2.55,
      ease: "easeInOut",
      repeat: Infinity,
    });
    return () => ctrl.stop();
  }, [bob]);

  useAnimationFrame(() => {
    const current = y.get() + bob.get();
    const dy = current - lastY.current;
    lastY.current = current;
    const next = tilt.get() * 0.78 + -dy * 1.8;
    tilt.set(Math.max(-10, Math.min(10, next)));
  });

  useEffect(() => {
    if (size.w < 80 || size.h < 80) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minX = EDGE;
    const maxX = Math.max(EDGE, size.w - BEE_SIZE - EDGE);
    const minY = size.h * 0.07;
    const maxY = size.h * 0.34;

    const clampY = (value: number) => Math.min(maxY, Math.max(minY, value));

    if (reduce) {
      x.set(size.w * 0.62);
      y.set(size.h * 0.16);
      face.set(1);
      return;
    }

    const startX = x.get();
    const startY = y.get();
    if (startX === 0 && startY === 0) {
      x.set(maxX);
      y.set((minY + maxY) * 0.42);
    } else {
      x.set(Math.min(maxX, Math.max(minX, startX)));
      y.set(clampY(startY || (minY + maxY) * 0.42));
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const pickY = () => clampY(minY + Math.random() * (maxY - minY));

    async function loop() {
      let goingLeft = face.get() >= 0;

      while (!cancelled) {
        const targetX = goingLeft ? minX : maxX;
        const distance = Math.abs(targetX - x.get());
        const pxPerSec = 92 + Math.random() * 28;
        const duration = Math.max(7.5, distance / pxPerSec);

        const flightX = animate(x, targetX, {
          duration,
          ease: "linear",
        });
        const flightY = animate(y, pickY(), {
          duration,
          ease: "easeInOut",
        });

        await Promise.all([flightX.finished, flightY.finished]).catch(() => {});
        if (cancelled) break;

        goingLeft = !goingLeft;
        const lift = clampY(y.get() + (Math.random() > 0.5 ? -20 : 18));

        await Promise.all([
          animate(y, lift, { duration: 0.4, ease: "easeOut" }).finished,
          animate(face, goingLeft ? 1 : -1, {
            duration: 0.34,
            ease: [0.22, 1, 0.36, 1],
          }).finished,
        ]).catch(() => {});
        if (cancelled) break;

        await wait(180);
      }
    }

    void loop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      x.stop();
      y.stop();
      face.stop();
    };
  }, [size.w, size.h, x, y, face]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden
    >
      {size.w > 0 ? (
        <motion.div
          className="absolute top-0 left-0"
          style={{
            x,
            y: yOut,
            rotate: tilt,
            scaleX: face,
            width: BEE_SIZE,
            height: BEE_SIZE,
          }}
        >
          <Image
            src="/stock/bee.gif"
            alt=""
            width={BEE_SIZE}
            height={BEE_SIZE}
            unoptimized
            className="h-full w-full [image-rendering:pixelated]"
          />
        </motion.div>
      ) : null}
    </div>
  );
}
