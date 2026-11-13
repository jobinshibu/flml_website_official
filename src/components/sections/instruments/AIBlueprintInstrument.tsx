"use client";

import { useState } from "react";

interface BlueprintData {
  summary: string;
  modules: Array<{ name: string; purpose: string }>;
  stack: {
    mobile: string;
    backend: string;
    data: string;
    infra: string;
  };
  phases: Array<{ name: string; weeks: number; deliverable: string }>;
  risks: string[];
}

const defaultExample: BlueprintData = {
  summary:
    "A two-sided home healthcare booking platform with route-optimised dispatch for therapists, dual-currency payments and multi-language support (AR/EN).",
  modules: [
    { name: "Patient app", purpose: "Search therapists, book visits, in-app payments, medical history (AR/EN)." },
    { name: "Therapist app", purpose: "Daily route, turn-by-turn navigation, patient notes and visit sign-off." },
    { name: "Dispatch engine", purpose: "Auto-assigns therapists by zone, availability and travel-time estimates." },
    { name: "Payments & payouts", purpose: "Credit cards & Apple Pay in QAR; split payouts to therapists." },
    { name: "Admin console", purpose: "Operations dashboard, schedule overrides, disputes and reporting." },
  ],
  stack: {
    mobile: "Flutter (Android · iOS)",
    backend: "Node.js · Fastify · TypeScript",
    data: "PostgreSQL + PostGIS (routes)",
    infra: "AWS me-central-1 (UAE)",
  },
  phases: [
    { name: "Blueprint", weeks: 2, deliverable: "Wireframes, schemas, API contracts" },
    { name: "Phase 1: Core", weeks: 8, deliverable: "Patient app, therapist app, dispatch" },
    { name: "Phase 2: Launch", weeks: 4, deliverable: "Admin, payments, Arabic localisation" },
    { name: "QA & Go-live", weeks: 2, deliverable: "App Store submission, load testing" },
  ],
  risks: [
    "Arabic RTL layouts need dedicated QA on Android and iOS.",
    "Address data in Qatar often relies on zone/street/building numbers rather than postcodes.",
    "Therapist location tracking requires careful battery and background permission handling.",
  ],
};

export default function AIBlueprintInstrument() {
  const [brief, setBrief] = useState(
    "A home physiotherapy booking platform in Qatar. Patients book visits, therapists get routed to homes, admin manages schedules and payments. Arabic and English."
  );
  const [blueprint, setBlueprint] = useState<BlueprintData>(defaultExample);
  const [status, setStatus] = useState("example");
  const [isGenerating, setIsGenerating] = useState(false);
  const [trace, setTrace] = useState("model output streams here as it is written…");

  const presets = [
    {
      label: "restaurant ERP",
      brief:
        "Restaurant chain ERP: POS billing at each outlet, kitchen display, inventory across 6 outlets, works offline when internet drops.",
    },
    {
      label: "construction ERP",
      brief:
        "Construction company ERP: project costing, site material requests, labour attendance from a mobile app, approvals for managers.",
    },
    {
      label: "crypto gateway",
      brief:
        "Crypto payment gateway for e-commerce stores: accept USDT and ETH, auto-convert to INR, merchant dashboard, wallet monitoring and on-chain receipts.",
    },
    {
      label: "AI calling CRM",
      brief:
        "Study-abroad CRM with an AI calling agent that speaks Malayalam and English to qualify leads and book counsellor appointments.",
    },
  ];

  const generateLocal = (t: string): BlueprintData => {
    const s = t.toLowerCase();
    const has = (...k: string[]) => k.some((x) => s.includes(x));
    const m: Array<{ name: string; purpose: string }> = [];

    if (has("book", "appointment", "visit", "slot"))
      m.push({ name: "Booking engine", purpose: "Availability, slots, reschedules and reminders." });
    if (has("erp", "inventory", "stock", "outlet", "branch"))
      m.push({ name: "Inventory & branches", purpose: "Stock per location, transfers and reorder levels." });
    if (has("bill", "pos", "restaurant", "retail"))
      m.push({ name: "POS & billing", purpose: "Point of sale, invoicing, tax and daily reports." });
    if (has("pay", "upi", "invoice", "payout"))
      m.push({ name: "Payments", purpose: "Gateway integration, invoices and reconciliation." });
    if (has("ai", "agent", "call", "voice", "chat"))
      m.push({ name: "AI agent", purpose: "Conversational agent with transcripts and human handoff." });
    if (has("crm", "lead"))
      m.push({ name: "CRM pipeline", purpose: "Leads, stages, follow-ups and assignment." });
    if (has("crypto", "blockchain", "token", "wallet", "nft"))
      m.push({ name: "Blockchain layer", purpose: "Smart contracts, wallets and on-chain events." });
    if (has("construction", "site", "project"))
      m.push({ name: "Project costing", purpose: "Budgets vs actuals per site and material requests." });
    if (has("offline"))
      m.push({ name: "Offline sync", purpose: "On-device data that syncs when online." });

    m.push(
      { name: "Admin console", purpose: "Roles, approvals, reports and settings." },
      { name: "Apps", purpose: "Android, iOS and web clients for staff and customers." }
    );

    return {
      summary:
        "Draft blueprint generated in your browser from keywords in the brief. Talk to our architects for a full plan.",
      modules: m.slice(0, 7),
      stack: {
        mobile: "Android · iOS · web",
        backend: "Node.js services",
        data: has("erp", "construction", "restaurant", "retail")
          ? "PostgreSQL"
          : "Managed document DB",
        infra: has("offline") ? "Cloud + on-site sync" : "Cloud, autoscaling",
      },
      phases: [
        { name: "Blueprint", weeks: 2, deliverable: "Architecture and flows" },
        { name: "Build", weeks: m.length + 3, deliverable: "Core modules" },
        { name: "Launch", weeks: 2, deliverable: "QA and rollout" },
      ],
      risks: [
        "Scope must be fixed in the blueprint phase.",
        "Integrations depend on third-party API access.",
        "Data migration from existing systems.",
      ],
    };
  };

  const handleGenerate = () => {
    if (!brief.trim()) return;
    setIsGenerating(true);
    setStatus("architecting");
    setTrace("browser demo: scanning the brief for domain signals…");

    setTimeout(() => {
      const res = generateLocal(brief);
      setBlueprint(res);
      setStatus("browser draft");
      setTrace("done");
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section className="g" id="blueprint">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              AI engineering
            </p>
            <h2>
              Describe your project. Get a <em>blueprint</em> in seconds.
            </h2>
          </div>
          <p className="lede">
            A working AI feature, not a mockup. Your brief goes to a language model with an architect’s instructions and comes back as structured data: modules, stack, phases and risks.
          </p>
        </div>

        <div className="ai">
          {/* Left Bay: Brief Input & Presets */}
          <div className="bay ai-in">
            <label htmlFor="brief-text" className="lbl">
              Project brief
            </label>
            <textarea
              id="brief-text"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />

            <div className="chips" aria-label="Example briefs">
              {presets.map((p) => (
                <button
                  key={p.label}
                  className="chip"
                  onClick={() => setBrief(p.brief)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                className="btn primary"
                disabled={isGenerating}
                onClick={handleGenerate}
              >
                Generate blueprint
              </button>

              <span className="mono" style={{ fontSize: "11px", color: "var(--dim)" }}>
                browser demo mode
              </span>
            </div>

            <div className="trace" aria-hidden="true">
              {trace}
            </div>
          </div>

          {/* Right Bay: Blueprint Output */}
          <div className="bay">
            <div className="bay-head">
              <span>blueprint · structured output</span>
              <span>
                {isGenerating ? (
                  <span className="thinking">
                    <i />
                    <i />
                    <i /> architecting
                  </span>
                ) : (
                  status
                )}
              </span>
            </div>

            <div className="bp" aria-live="polite">
              <p className="bp-sum">{blueprint.summary}</p>

              <div>
                <span className="lbl">Architecture modules</span>
                <div className="bp-grid">
                  {blueprint.modules.map((m, i) => (
                    <div key={i} className="mod">
                      <b>{m.name}</b>
                      <span>{m.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="lbl">Technology stack</span>
                <div className="stackrow">
                  {Object.entries(blueprint.stack).map(([k, v]) => (
                    <div key={k}>
                      <span>{k}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="lbl">Delivery roadmap</span>
                <div className="phases">
                  {blueprint.phases.map((ph, i) => (
                    <div key={i} className="phase">
                      <div>
                        <b>{ph.name}</b>
                        <span>{ph.deliverable}</span>
                      </div>
                      <span className="wks">{ph.weeks} wks</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="lbl">Architecture risks &amp; mitigations</span>
                <ul className="risks">
                  {blueprint.risks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

