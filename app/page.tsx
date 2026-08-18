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

const pixelFont = Jersey_20({
  weight: "400"
})


function LandingPage() {
  return (
    <SmoothScroll>
    <div className='min-h-screen w-full'>
      <div className="h-screen w-full bg-[#90C5EF] flex flex-col items-center justify-center">
        <nav 
        className={cn(
          pixelFont.className,
          'w-full absolute top-1 px-15 z-20 py-4 flex items-center justify-between'
        )}
        >
          <div className="">
              <Image
              className='pointer-events-none'
              src={'/main-logo.png'}
              width={100}
              height={100}
              alt='logo'
              />
          </div>
          <div className="flex text-white items-center justify-center gap-10">

          {
            [{name: "Prizes", href: "#prizes"}, {name: "Tracks", href: "#"}, {name: "Timeline", href: "#timeline"}].map((link)=>
              <Link key={link.name} href={link.href} className='text-2xl'>{link.name}</Link>
          )
        }
        </div>
        <div className="">
          <button
          className='text-2xl text-white'
          >
            Register Now
          </button>
        </div>
        </nav>
        <CloudShader 
        speed={0.7}
        className="h-screen w-full absolute z-10" />
        
        {/* //main hero section  */}
        <div className="z-20 flex items-center justify-center flex-col">
          <Image
            width={500}
            height={500}
            alt='logo'
            src={'/main-logo.png'}
          />
          <div className={cn(
            pixelFont.className,
            "text-white text-4xl"
          )}
          >Where Skills Meet Innovation.</div>
          <div className="mt-10">
            <button className='border px-10 py-2 rounded-md flex items-center justify-center gap-2'>
              Register on <Image height={80} width={80} alt='unstop.com' src={'/unstop.webp'}/>
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
            className='absolute bottom-0 w-full'
            height={1000}
            width={2000}
            alt='bg'
            src={'/background.png'}
          />
        </div>
        <OverlapSection className={pixelFont.className} />
      </div>      
    </div>

    <Timeline className={pixelFont.className} />
    </SmoothScroll>
  )
}

export default LandingPage