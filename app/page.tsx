import MinecraftPreloader from "@/components/MinecraftPreloader";
import ReactLenis from "lenis/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MinecraftPreloader />
      <div className="min-h-screen w-full">
        <ReactLenis />
        {/* hero section  */}
        <div className=""></div>

        {/* prize pool section  */}
        <div className=""></div>

        {/* tracks themes  */}
        <div className=""></div>

        {/* sponsers  */}
        <div className=""></div>

        {/* timeline schdule  */}
        <div className=""></div>

        {/* faq section  */}
        <div className=""></div>

        {/* footer section  */}
        <div className=""></div>
      </div>
    </>
  );
}
