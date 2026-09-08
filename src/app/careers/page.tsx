import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

const openings = [
  { title: "Frontend Engineer", text: "Build polished interfaces and product flows." },
  { title: "Backend Engineer", text: "Support services, APIs, and system logic." },
  { title: "UI / Product Designer", text: "Shape the visual and interaction language." },
  { title: "Project Coordinator", text: "Keep delivery clear and organized." },
];

export default function CareersPage() {
  return (
    <main className="bg-white px-5 pt-28 pb-10 text-[#0f172a] sm:px-8 min-h-screen">
      <div className="mx-auto max-w-[1440px]">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.28em] text-[#2563eb] hover:opacity-70 transition-opacity">
          <ArrowLeft className="h-4 w-4" />
          BACK HOME
        </Link>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-[0.66rem] font-semibold tracking-[0.4em] text-[#2563eb]">CAREERS</p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-balance">
              Careers
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#475569]">
              Placeholder openings for now. Replace these with live job roles when you are ready.
            </p>
          </div>
          <div className="relative w-full h-[300px] lg:h-[400px] rounded-[2rem] overflow-hidden border border-[#dbeafe]">
            <Image
              src="/GAL_1.jpg"
              alt="Careers at First Logic"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {openings.map((opening, index) => (
            <div key={opening.title} className={`rounded-[1.6rem] border border-[#dbeafe] p-5 ${index % 2 === 0 ? "bg-[#f8fbff]" : "bg-white"}`}>
              <Image
                src={index % 2 === 0 ? "/studio-02.svg" : "/studio-03.svg"}
                alt={`${opening.title} placeholder`}
                width={1200}
                height={800}
                className="h-64 w-full rounded-[1.2rem] object-cover"
              />
              <p className="mt-4 text-[0.62rem] tracking-[0.34em] text-[#2563eb]">{opening.title}</p>
              <p className="mt-3 text-sm leading-7 text-[#475569]">{opening.text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
