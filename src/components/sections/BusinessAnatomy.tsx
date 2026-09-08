"use client";

import { motion } from "framer-motion";

const nodes = [
  { label: "Customer", x: 12, y: 24, tone: "text-[#4d3b2a]" },
  { label: "Market", x: 82, y: 18, tone: "text-[#4d3b2a]" },
  { label: "Competitor", x: 18, y: 78, tone: "text-[#4d3b2a]" },
  { label: "Operations", x: 78, y: 76, tone: "text-[#4d3b2a]" },
  { label: "People", x: 34, y: 34, tone: "text-[#7c6142]" },
  { label: "Data", x: 66, y: 32, tone: "text-[#7c6142]" },
  { label: "Technology", x: 36, y: 66, tone: "text-[#7c6142]" },
  { label: "Revenue", x: 64, y: 64, tone: "text-[#7c6142]" },
  { label: "Business", x: 50, y: 50, core: true },
];

const links = [
  [0, 8],
  [1, 8],
  [2, 8],
  [3, 8],
  [4, 3],
  [5, 6],
  [6, 8],
  [7, 8],
  [0, 1],
  [2, 7],
];

export default function BusinessAnatomy() {
  return (
    <section id="anatomy" className="relative overflow-hidden bg-[linear-gradient(180deg,_#f5efe6_0%,_#ede2d1_100%)] px-5 py-20 text-[color:var(--color-ink)] sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[0.66rem] font-semibold tracking-[0.42em] text-[color:var(--color-muted)]">
            SCENE 02 / BUSINESS ANATOMY
          </p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-balance">
            A BUSINESS IS NOT A WEBSITE.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[color:var(--color-muted-strong)]">
            A business does not break in one place. The signal usually starts in customers, ripples through operations, and shows up later in revenue.
          </p>

          <div className="mt-10 border-l border-black/10 pl-5">
            <p className="max-w-md text-xl leading-9 text-[color:var(--color-ink)] text-balance">
              A business does not have isolated problems. Its systems are interconnected.
            </p>
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,_rgba(255,255,255,0.72),_rgba(241,230,214,0.7))] p-6 shadow-[0_24px_80px_rgba(60,41,18,0.1)]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(61,48,35,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(61,48,35,0.06)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="absolute left-8 top-8 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[0.62rem] tracking-[0.34em] text-[color:var(--color-muted)]">
            INTERCONNECTED SYSTEM
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
            {links.map(([a, b], index) => {
              const n1 = nodes[a];
              const n2 = nodes[b];
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke="rgba(49,37,24,0.24)"
                  strokeWidth="0.55"
                  strokeDasharray="0.8 1.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.08 }}
                />
              );
            })}
          </svg>

          {nodes.map((node, index) => (
            <motion.div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 + index * 0.07 }}
            >
              <div
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] ${
                  node.core
                    ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)] shadow-[0_12px_24px_rgba(32,24,17,0.28)]"
                    : "border-black/10 bg-white/75 text-[color:var(--color-ink)]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${node.core ? "bg-[color:var(--color-paper)]" : "bg-[color:var(--color-gold)]"}`} />
                {node.label}
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-6 right-6 max-w-xs rounded-[1.5rem] border border-black/10 bg-white/70 p-5 backdrop-blur-sm">
            <p className="text-[0.62rem] tracking-[0.34em] text-[color:var(--color-muted)]">THE SIGNAL</p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted-strong)]">
              We map the relationships first, so the solution is built around the real operating structure rather than a surface symptom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
