"use client"
import Image from 'next/image'
import { CloudShader } from "@/components/ui/cloud-shader";
import Link from 'next/link';
import { Jersey_20 } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FlyingBee } from '@/components/flying-bee';
import { CountdownTimer } from '@/components/countdown-timer';
import { OverlapSection } from '@/components/overlap-section';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Timeline } from '@/components/timeline';
import { Navbar } from '@/components/navbar';
import { Tracks } from '@/components/tracks';
import DepthText from '@/components/DepthText';
import FAQ from '@/components/faq';

export const pixelFont = Jersey_20({
  weight: "400"
})

export const reg_link = "https://unstop.com/p/hack-2-ignite-gh-raisoni-international-skill-tech-university-1740694?lb=7esWD7WY"

function LandingPage() {
  return (
    <SmoothScroll>
      <div className='min-h-screen w-full'>
        <div className="h-screen w-full bg-[#90C5EF] flex flex-col items-center justify-center">
          <Navbar className={pixelFont.className} registerHref={reg_link} />
          <CloudShader
            speed={0.7}
            className="h-screen w-full absolute z-10" />

          <div className="z-20 flex items-center justify-center flex-col px-4">
            <Image
              width={500}
              height={500}
              alt='logo'
              src={'/main-logo.png'}
            />
            <div className={cn(
              pixelFont.className,
              "text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
            )}
            >Where Skills Meet Innovation.</div>
            <div className="mt-6 md:mt-10">
              <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-white rounded-md font-light transition duration-200 ease-linear">
                <Link
                  target='_blank'
                  href={reg_link}
                  className={cn(
                    pixelFont.className,
                    'flex text-black text-2xl items-center justify-center gap-2'
                  )}
                >
                  Register on
                  <Image
                    width={80}
                    height={80}
                    alt='unstop.com'
                    src={'/unstop.webp'}
                  />
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className="relative bg-[#90C5EF]">
          <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
            <CountdownTimer className={pixelFont.className} />
            <FlyingBee />
            <Image
              className='absolute bottom-0 w-full object-cover object-bottom'
              height={1000}
              width={2000}
              alt='bg'
              src={'/background.png'}
              style={{ minWidth: '100%', height: 'auto' }}
            />
          </div>
          <OverlapSection className={pixelFont.className} />
        </div>
      </div>

      <Timeline className={pixelFont.className} />

      {/* <div className="h-screen w-full flex items-start justify-center px-2 py-2 bg-gray-900">
        <Image
          className='absolute z-0 h-full w-full rounded-sm pointer-events-none'
          width={1000}
          height={1000}
          alt='woods'
          src={"/wood-background.png"}
        />
        <div className="z-10 text-white py-8">
          
        </div>
      </div> */}


      <Tracks className={pixelFont.className} />
      <div className="bg-[#90C5EF]">
        <FAQ />
      </div>

      <footer
        className="flex h-auto min-h-0 w-full items-center justify-center overflow-x-hidden bg-[#90C5EF] px-4 py-10 sm:px-8 md:px-10 md:py-24"
      >
        <div className="flex w-full flex-col items-center justify-between gap-6 px-2 sm:px-6 md:flex-row md:items-end md:gap-8 md:px-20">
          <div className="text-center md:text-left">
            <h2 className={cn(pixelFont.className, "text-2xl")}>Organized by:</h2>
            <div className="flex items-center justify-center gap-4">
              <Image
                className='h-auto w-28 rounded-md sm:w-40 md:w-[250px]'
                src={'/skill-tech.png'}
                width={250}
                height={250}
                alt='skill tech'
              />
              <Image
                className='h-auto w-24 sm:w-32 md:w-[200px]'
                src={'/uic.png'}
                width={200}
                height={200}
                alt='uic'
              />
            </div>
          </div>
          <h1 className={
            cn(
              'text-5xl tracking-tight sm:text-7xl lg:text-[20vh] text-center md:text-right',
              pixelFont.className
            )
          }
          >hack2ignite</h1>
        </div>
      </footer>
      <div className={cn(
        "flex h-auto min-h-0 w-full flex-wrap items-center justify-center gap-3 bg-[#90C5EF] px-4 pb-10"
        , pixelFont.className
      )}
      >
        <span className='text-xl'>
          for latest updates follow us :
        </span>
        <Link
          target='_blank'
          href={"https://www.instagram.com/uic_ghristu/"}
          className="inline-flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-8 sm:size-10 md:size-12" viewBox="0 0 24 24">{/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}<path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" /></svg>
        </Link>
        <Link
          target='_blank'
          href={"https://www.linkedin.com/company/unstop-igniters-club-ghristu"}
          className="inline-flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-8 sm:size-10 md:size-12" viewBox="0 0 24 24">{/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}<path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" /></svg>

        </Link>
      </div>
    </SmoothScroll>
  )
}

export default LandingPage