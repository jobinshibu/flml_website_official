import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BadgeCheck } from "lucide-react";

const clientLogos = Array.from({ length: 50 }, (_, index) => `CLIENT ${String(index + 1).padStart(2, "0")}`);

export default function ClientsPage() {
  return (
    <main className="bg-white px-5 py-10 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-[1440px]">
        <Link href="/" className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.28em] text-[#2563eb]">
          <ArrowLeft className="h-4 w-4" />
          BACK HOME
        </Link>

        <section className="mt-8">
          <p className="text-[0.66rem] font-semibold tracking-[0.4em] text-[#2563eb]">CLIENTS</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-balance">
            Client logos
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#475569]">
            Placeholder tiles are used for now. Replace each tile with the approved logo asset whenever you are ready.
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {clientLogos.map((name, index) => (
            <div key={name} className="rounded-[1.4rem] border border-[#dbeafe] bg-[#f8fbff] p-5">
              <div className="flex items-center justify-between">
                <BadgeCheck className="h-4 w-4 text-[#2563eb]" />
                <span className="text-[0.58rem] tracking-[0.28em] text-[#64748b]">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-8 overflow-hidden rounded-[1rem] border border-dashed border-[#bfdbfe] bg-white">
                <Image
                  src="/studio-02.svg"
                  alt={`${name} logo placeholder`}
                  width={1200}
                  height={800}
                  className="h-24 w-full object-cover"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
