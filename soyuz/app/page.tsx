import Image from "next/image";
// import { WaitList } from "@/components/ui/waitlist";
import LoopsForm from "@/components/ui/loops";
export default function Home() {
  return (
    
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-0 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black/30">
    <div className="grid min-h-screen content-center bg-black/20">
      <div className="-z-10 w-fit h-fit">
      <Image
      src="/coworking_full.jpg"
      alt="Коворкинг Союз в Туле"
      sizes="(max-width: 768px) 100vw, 33vw"
      fill
      style={{objectFit: "cover"}}
      ></Image></div>
      <main className="gap-12 mx-auto text-center">
       <div className="sm:text-5xl font-bold md:text-7xl font-formamedium text-white">Soyuz.work</div>
       <div className="sm:text-xl font-formamedium md:text-2xl text-white">Коворкинг в пространстве Союз в Туле</div>
       <div className="pt-10">

      <LoopsForm/>
       </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
      </footer>
      
    </div>
  );
}
