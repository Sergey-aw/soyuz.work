"use client"

import Image from "next/image";
import Link from "next/link";
import { WaitList } from "@/components/ui/waitlist";
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight } from 'lucide-react';
// import LoopsForm from "@/components/ui/loops";
export default function Home() {
  return (
    
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-0 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black/30">
    <div className="grid min-h-svh content-center bg-black/20">
      <div className="-z-10 w-fit h-fit">
      <Image
      src="/coworking_full.jpg"
      alt="Коворкинг Союз в Туле"
      sizes="(max-width: 768px) 100vw, 33vw"
      quality={75}
      fill
      style={{objectFit: "cover"}}
      ></Image></div>
      <main className="gap-12 mx-auto text-center">
       <div className="sm:text-5xl font-bold md:text-6xl font-formamedium text-white items-baseline flex justify-center">
        <div className="bg-black p-3 pl-5 pr-4 pb-2 rounded-2xl w-fit">
       <TypeAnimation
      sequence={[        
        'Soyuz.',
        2000, 
        'S',
        2000,
 
      ]}
      wrapper="span"
      speed={50}      
      repeat={Infinity}
    />
        </div><div className="pl-3">work</div></div>
       <div className="sm:text-xl font-formamedium md:text-2xl text-white">Коворкинг в пространстве Союз в Туле</div>
       <div className="pt-16">

      <WaitList/>
       </div>
      </main>
      <footer className="sm:text-base md:text-lg row-start-3 flex gap-6 pt-8 flex-wrap items-center justify-center text-white font-formamedium">
       <Link
       prefetch
       href="/join"
       className="hover:underline"
       >Расскажите, что для вас важно в коворкинге<ArrowRight className="inline" size={22}/></Link>
      </footer>
      
    </div>
  );
}
