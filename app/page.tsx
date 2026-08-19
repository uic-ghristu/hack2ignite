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

const pixelFont = Jersey_20({
  weight: "400"
})

export const reg_link = "https://unstop.com/o/5zXnaj1?lb=hPo8wViC&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Abhaynim8618"

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
    </SmoothScroll>
  )
}

export default LandingPage