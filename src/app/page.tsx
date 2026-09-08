import Opening from "@/components/sections/Opening";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import Engineering from "@/components/sections/Engineering";
import Gallery from "@/components/sections/Gallery";
import ConsultationForm from "@/components/sections/ConsultationForm";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white selection:bg-brand-blue selection:text-white">
      <Opening />
      <About />
      <Clients />
      <WhatWeBuild />
      <Engineering />
      <Gallery />
      <ConsultationForm />
    </div>
  );
}
