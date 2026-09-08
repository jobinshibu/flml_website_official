import { AlertCircle, ArrowRight, CircleSlash2, Clock3, PackageX, Workflow } from "lucide-react";

const symptoms = [
  "Delayed information",
  "Manual processes",
  "Inventory discrepancies",
  "Operational leakage",
  "Customer drop-offs",
  "Disconnected systems",
];

const indicators = [
  { label: "Lost time", value: "47%", icon: Clock3 },
  { label: "Manual effort", value: "High", icon: Workflow },
  { label: "Leakage", value: "Hidden", icon: PackageX },
  { label: "Visibility", value: "Fragmented", icon: CircleSlash2 },
];

export default function Discover() {
  return (
    <section id="diagnosis" className="relative overflow-hidden bg-[linear-gradient(180deg,_#151515_0%,_#0e0f11_100%)] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="text-[0.66rem] font-semibold tracking-[0.42em] text-white/55">
            SCENE 03 / THE SYMPTOM
          </p>
          <h2 className="mt-6 text-[clamp(2.7rem,7vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-balance">
            THE SYMPTOM IS RARELY THE PROBLEM.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
            What looks like a software request is often a sign of hidden friction: delays, leakage, disconnected information, or a process that no longer matches the business.
          </p>

          <div className="mt-10 space-y-4">
            {symptoms.map((item, index) => (
              <div key={item} className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="text-[0.62rem] tracking-[0.36em] text-white/38">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.2rem,3vw,2rem)] tracking-[-0.03em]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white/75">
              <AlertCircle className="h-5 w-5 text-[color:var(--color-gold)]" />
              <span className="text-[0.62rem] tracking-[0.34em]">DIAGNOSTIC SIGNALS</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {indicators.map((indicator) => {
                const Icon = indicator.icon;
                return (
                  <div key={indicator.label} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[0.64rem] tracking-[0.3em] text-white/50">{indicator.label}</span>
                      <Icon className="h-4 w-4 text-white/35" />
                    </div>
                    <div className="mt-6 text-3xl font-semibold tracking-[-0.05em]">{indicator.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,_rgba(255,255,255,0.09),_rgba(255,255,255,0.03))] p-6">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] [background-size:22px_22px]" />
            <div className="relative">
              <p className="text-[0.62rem] tracking-[0.36em] text-white/45">THE QUESTION WE ASK</p>
              <p className="mt-4 text-2xl leading-9 text-balance text-white/90">
                What is causing the business to behave this way?
              </p>
              <a
                href="#engineering"
                className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.3em] text-[color:var(--color-gold)]"
              >
                MOVE TO DIAGNOSIS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
