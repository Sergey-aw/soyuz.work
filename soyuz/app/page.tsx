import Image from "next/image";

export default function Home() {
  return (
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black/30">
      <div className="-z-10 w-fit h-fit">
      <Image
      src="/coworking.jpeg"
      alt="Коворкинг Союз в Туле"
      sizes="(max-width: 768px) 100vw, 33vw"
      fill
      style={{objectFit: "cover"}}
      ></Image></div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mx-auto">
       <div className="sm:text-5xl font-bold md:text-7xl font-formamedium shadow">Soyuz.work</div>
       <div className="sm:text-xl font-formamedium md:text-2xl">Коворкинг в пространстве Союз в Туле</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
      </footer>
      
    </div>
  );
}
