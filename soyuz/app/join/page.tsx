import Image from "next/image";
import { SendForm } from "@/components/ui/formsheet";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div><Link href={"/"}>
       <Image
       className="w-2/5 p-4 max-w-64 min-w-48"
       src="/logo_soyuz_work.svg"
       alt="Берисамокат"
       width={250}
       height={50}
       ></Image></Link></div>
       <div className="text-center text-base font-forma sm:w-full sm:p-4 md:w-1/2 md:min-w-1/3 lg:w-1/3 p-4 container mx-auto">Мы проектируем коворкинг в <Link href="https://soyuzspace.ru" className="underline hover:text-blue-700" target="_blank">пространстве Союз</Link> в Туле и хотим чуть лучше узнать будущих резидентов и учесть пожелания. Будем рады вашим комментариям.</div>
      <div className="text-3xl mx-auto text-center mt-4 font-formamedium mb-4">Поделитесь мнением</div>
    <div className="sm:w-full sm:p-4 md:w-1/2 md:min-w-1/3 lg:w-1/3 p-4 container mx-auto text-left">
     
    <SendForm/>
    </div>
    </div>
  );
}
