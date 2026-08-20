"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Prizes", href: "#prizes" },
  { name: "Tracks", href: "#tracks" },
  { name: "Timeline", href: "#timeline" },
  { name: "Rules", href: "/rulebook" },
] as const;

const overlayEase = [0.22, 1, 0.36, 1] as const;

function AnimatedLinkText({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.035,
            ease: overlayEase,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

type NavbarProps = {
  className?: string;
  registerHref: string;
};

export function Navbar({ className, registerHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) {
      lenis?.start();
      return;
    }

    lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 640px)").matches) {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      lenis?.start();
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={cn(
          className,
          "w-full absolute top-1 px-4 sm:px-8 md:px-15 z-20 py-4 flex items-center justify-between"
        )}
      >
        <div>
          <Image
            className="pointer-events-none"
            src={"/main-logo.png"}
            width={70}
            height={70}
            alt="logo"
          />
        </div>
        <div className="hidden sm:flex text-white items-center justify-center gap-4 md:gap-10">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="text-base md:text-2xl">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            target="_blank"
            href={registerHref}
            className="hidden sm:inline text-sm sm:text-base md:text-2xl text-white"
          >
            Register Now
          </Link>
          <button
            type="button"
            className="sm:hidden text-white p-2 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-8" strokeWidth={2.25} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-50 sm:hidden bg-[#90C5EF] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: overlayEase }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <Image
                className="pointer-events-none"
                src={"/main-logo.png"}
                width={70}
                height={70}
                alt="logo"
              />
              <motion.button
                type="button"
                className="text-white p-2 -mr-2"
                aria-label="Close menu"
                onClick={close}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.35, ease: overlayEase }}
              >
                <X className="size-8" strokeWidth={2.25} />
              </motion.button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-8 text-white">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-4xl"
                  onClick={close}
                >
                  <AnimatedLinkText text={link.name} delay={0.12 + index * 0.08} />
                </Link>
              ))}
              <Link
                target="_blank"
                href={registerHref}
                className="text-4xl"
                onClick={close}
              >
                <AnimatedLinkText
                  text="Register Now"
                  delay={0.12 + NAV_LINKS.length * 0.08}
                />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
