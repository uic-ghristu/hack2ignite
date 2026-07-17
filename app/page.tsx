"use client"
import React from "react";
import MinecraftPreloader from "@/components/MinecraftPreloader";
import TimelineSection from "@/components/TimelineSection";
import { Button } from "@/components/ui/button";
import { playClickSound } from "@/lib/utils";
import ReactLenis from "lenis/react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";

import PrizePoolSection from "@/components/PrizePoolSection";

export default function LandingPage() {
  return (
    <>
      {/* <MinecraftPreloader /> */}
      <div className="min-h-screen w-full">
        <ReactLenis />
        <nav className="absolute w-full flex items-center justify-between px-10 py-5 z-20">
          <Image
            src={'/main-logo.png'}
            height={100}
            width={100}
            className="pointer-events-none select-none"
            alt="hack2ignite"
          />
          <div className="flex minecraft-font text-white gap-10 items-center justify-center font-bold">
            {
              [
                { name: 'Prizes', link: '' },
                { name: 'Tracks', link: '' },
                { name: 'Timeline', link: '' },

              ].map(links => <button key={links.name}>{links.name}</button>)
            }
          </div>
          <div className="">
            <Button
              variant={"minecraft"}
              onClick={() => {
                playClickSound()
              }}
            >
              <h1 className="text-lg">
                Register
              </h1>
            </Button>
          </div>
        </nav>
        {/* hero section  */}
        <HeroSection />

        {
          // TIMELINE NOT UPTO EXPECTATION AND SHOULD BE CHANGED!!!
        }
        <TimelineSection />

        {/* prize pool section  */}
        <PrizePoolSection />

        {/* tracks themes  */}
        <div className="h-screen w-full"></div>

        {/* sponsers  */}
        <div className="h-screen w-full"></div>

        {/* faq section  */}
        <div className="h-screen w-full"></div>

        {/* footer section  */}
        <div className="h-screen w-full"></div>
      </div>
    </>
  );
}
