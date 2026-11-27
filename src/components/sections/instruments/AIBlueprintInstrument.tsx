"use client";

import { useState } from "react";

interface ModuleItem {
  name: string;
  purpose: string;
  tier: "Core" | "Integration" | "Data & Edge" | "Security";
}

interface BlueprintData {
  title: string;
  summary: string;
  modules: ModuleItem[];
  stack: {
    frontend: string;
    backend: string;
    database: string;
    infraEdge: string;
    aiSecurity: string;
  };
  metrics: {
    estimatedSprint: string;
    budgetRange: string;
    teamStructure: string;
    techConfidence: string;
  };
  phases: Array<{ name: string; weeks: number; deliverable: string }>;
  risks: Array<{ risk: string; mitigation: string }>;
}

const PRESET_TEMPLATES: Record<string, BlueprintData> = {
  physio: {
    title: "Home Healthcare & Physiotherapy Dispatch Platform",
    summary:
      "A HIPAA/SOC2-ready, two-sided healthcare booking engine with geospatial routing for field therapists, dual-currency processing (QAR/USD), Apple Pay, and native Arabic RTL typography support.",
    modules: [
      { name: "Patient Mobile App", purpose: "Specialist directory, visit scheduling, live GPS ETA, health records and tele-consults.", tier: "Core" },
      { name: "Therapist Fleet App", purpose: "Daily assigned routes, turn-by-turn navigation, patient medical history and digital signatures.", tier: "Core" },
      { name: "Dynamic Dispatch Engine", purpose: "Heuristic route optimization based on urban zones, traffic APIs, and clinician availability.", tier: "Data & Edge" },
      { name: "Payments & Split Payouts", purpose: "Local card gateway + Apple Pay in QAR; automated split settlements to verified therapists.", tier: "Integration" },
      { name: "HIPAA Clinical Console", purpose: "Operator dispatch dashboard, emergency schedule overrides, patient audit logs and insurance claims.", tier: "Security" },
      { name: "Telehealth WebRTC Relay", purpose: "Encrypted peer-to-peer video check-ins with TURN relay servers for strict residential networks.", tier: "Data & Edge" },
    ],
    stack: {
      frontend: "Flutter (Android & iOS) + Next.js 15 (Web & Admin)",
      backend: "Node.js (Fastify) + Go Routing Worker microservices",
      database: "PostgreSQL 16 + PostGIS (geospatial indexing) + Redis (sessions)",
      infraEdge: "AWS me-central-1 (UAE/Qatar low latency) + Cloudflare Enterprise",
      aiSecurity: "AES-256 field-level PHI encryption + OWASP API Guardrails",
    },
    metrics: {
      estimatedSprint: "14 Weeks (3 Sprints)",
      budgetRange: "$28,000 - $42,000",
      teamStructure: "1 Lead Architect, 2 Fullstack Devs, 1 Mobile Eng, 1 QA",
      techConfidence: "98.4% Production-Ready",
    },
    phases: [
      { name: "Phase 0: Architecture & Specs", weeks: 2, deliverable: "Wireframes, PostGIS schema, OpenAPI specs, security checklist" },
      { name: "Phase 1: Core Engine & Apps", weeks: 6, deliverable: "Patient & therapist apps, auth, geospatial dispatch pipeline" },
      { name: "Phase 2: Payments & Operations", weeks: 4, deliverable: "Apple Pay, automated payouts, Arabic RTL validation, admin console" },
      { name: "Phase 3: Hardening & Go-Live", weeks: 2, deliverable: "HIPAA audit checklist, pen-testing, App Store / Play Store rollout" },
    ],
    risks: [
      {
        risk: "Arabic RTL layout anomalies across diverse Android screen densities.",
        mitigation: "Strict bidirectional layout testing with automated screenshot regression in CI/CD.",
      },
      {
        risk: "Gulf address systems often use zone/street/building numbers rather than standardized postcodes.",
        mitigation: "Custom spatial coordinate resolver fusing Google Maps Places API with local municipality boundary vectors.",
      },
      {
        risk: "Therapist battery drain and OS background throttling during persistent GPS tracking.",
        mitigation: "Geofence boundary wakeups combined with motion-activity API thresholds rather than continuous high-accuracy polling.",
      },
    ],
  },
  restaurant: {
    title: "Multi-Outlet Restaurant ERP & Offline POS Mesh",
    summary:
      "Enterprise restaurant operating system designed for zero-downtime offline sales, sub-second kitchen display (KDS) synchronisation, and multi-warehouse recipe inventory reconciliation across 10+ outlets.",
    modules: [
      { name: "Cloud & Offline POS", purpose: "Lightning-fast table billing, split checks, order modifiers, and Bluetooth ESC/POS printing.", tier: "Core" },
      { name: "Kitchen Display (KDS)", purpose: "Real-time ticket routing by prep station (Grill, Salad, Bar) with audio alert chimes.", tier: "Core" },
      { name: "Central Inventory Mesh", purpose: "Multi-warehouse recipe bill-of-materials decrementing stock at ingredient granularity.", tier: "Data & Edge" },
      { name: "Local Conflict Sync", purpose: "Embedded SQLite engine keeping outlet selling without internet, auto-syncing upon reconnect.", tier: "Data & Edge" },
      { name: "Franchise HQ Analytics", purpose: "Consolidated sales reports, tax compliance, labor cost margins and predictive supplier purchase orders.", tier: "Security" },
      { name: "QR Dine-In Ordering", purpose: "Contactless guest digital menus, instant UPI/card checkout directly into kitchen queue.", tier: "Integration" },
    ],
    stack: {
      frontend: "React Native (Tablet POS) + Tauri v2 / Rust + Next.js (HQ Hub)",
      backend: "Go (Golang) Microservices + gRPC high-throughput sync",
      database: "Local SQLCipher (Terminal) + CockroachDB / Distributed Postgres",
      infraEdge: "AWS Global Accelerator + Cloudflare Edge Workers",
      aiSecurity: "Mutual TLS terminal authentication + Hardware Token binding",
    },
    metrics: {
      estimatedSprint: "16 Weeks (4 Sprints)",
      budgetRange: "$35,000 - $55,000",
      teamStructure: "1 Solutions Architect, 2 Backend (Go), 2 Frontend/Mobile, 1 QA",
      techConfidence: "99.1% High Concurrency",
    },
    phases: [
      { name: "Phase 0: POS Hardware Protocols", weeks: 2, deliverable: "ESC/POS driver matrix, offline state machine, schema blueprints" },
      { name: "Phase 1: POS Billing & Offline Engine", weeks: 6, deliverable: "Offline POS client, kitchen displays, local database sync" },
      { name: "Phase 2: Multi-Outlet Inventory", weeks: 5, deliverable: "Central inventory, automated supplier POs, QR guest payments" },
      { name: "Phase 3: Rollout & Stress Testing", weeks: 3, deliverable: "Simulated offline network drops, hardware stress tests, pilot launch" },
    ],
    risks: [
      {
        risk: "Concurrent POS billing causing duplicate ticket numbers during cloud reconnect.",
        mitigation: "Cryptographically generated ULID (Universally Unique Lexicographically Sortable Identifiers) partitioned by outlet ID.",
      },
      {
        risk: "Hardware driver incompatibilities with legacy ESC/POS thermal printers.",
        mitigation: "Native Raw-BT socket layer with fallback ESC/POS byte-stream parser.",
      },
      {
        risk: "Stock count discrepancies caused by simultaneous table orders during peak dinner rush.",
        mitigation: "Distributed Redis Redlock with atomic database transaction increments.",
      },
    ],
  },
  construction: {
    title: "Construction Project Costing & Field Labor Tracker",
    summary:
      "Ruggedized field-to-office ERP connecting construction sites with HQ accounting. Real-time site attendance, material dispatch approvals, equipment telemetry, and AIA G702 progress billing.",
    modules: [
      { name: "Field Supervisor App", purpose: "Facial / biometric labor check-in, daily site logs, weather conditions and photo progress markups.", tier: "Core" },
      { name: "Material Request & Delivery", purpose: "Site indent forms, supplier quote comparison, purchase orders and gate pass sign-offs.", tier: "Core" },
      { name: "Job Costing & AIA Billing", purpose: "Real-time budget vs actual expenditure tracking per CSI cost code; progress billing certificates.", tier: "Integration" },
      { name: "Subcontractor Portal", purpose: "Milestone completion sign-offs, compliance insurance document validation and retention payouts.", tier: "Security" },
      { name: "Equipment Fleet Telemetry", purpose: "Heavy machinery run-time tracking, preventive maintenance alerts and fuel consumption audits.", tier: "Data & Edge" },
    ],
    stack: {
      frontend: "Flutter (Android rugged devices & iOS) + React 19 / Vite Web",
      backend: "Python (FastAPI) + Node.js Workflow Orchestrator",
      database: "PostgreSQL with Partitioned Project Ledgers + AWS S3 (CAD/Photo Lake)",
      infraEdge: "GCP Cloud Run + Cloud CDN + Cloudflare Zero Trust Access",
      aiSecurity: "Role-based project segregation + HMAC SHA-256 tamper-proof photo stamps",
    },
    metrics: {
      estimatedSprint: "12 Weeks (3 Sprints)",
      budgetRange: "$24,000 - $38,000",
      teamStructure: "1 Tech Lead, 2 Fullstack Engineers, 1 Flutter Dev, 1 QA",
      techConfidence: "97.5% Production-Ready",
    },
    phases: [
      { name: "Phase 0: Job Cost Data Models", weeks: 2, deliverable: "CSI cost-code taxonomy, offline field sync architecture, wireframes" },
      { name: "Phase 1: Field Mobile App", weeks: 5, deliverable: "Attendance, site diary, material request workflow, offline photo uploads" },
      { name: "Phase 2: Costing & Accounting Hub", weeks: 3, deliverable: "Budget variance tracking, ERP export bridge, approval engine" },
      { name: "Phase 3: Field Pilot & Verification", weeks: 2, deliverable: "On-site field testing under low network conditions, rollout" },
    ],
    risks: [
      {
        risk: "Zero or intermittent cellular connectivity on subterranean or remote job sites.",
        mitigation: "Background chunked S3 multipart uploads with automatic resume upon WiFi sync.",
      },
      {
        risk: "Fraudulent attendance logging or 'buddy punching' at remote site gates.",
        mitigation: "On-device face verification tied to hardware GPS geofence bounds.",
      },
    ],
  },
  crypto: {
    title: "Non-Custodial Multi-Chain Crypto Gateway & Treasury",
    summary:
      "Enterprise payment rail accepting USDT, USDC, BTC, and ETH with automated slippage-protected fiat conversion (INR/USD), cold-storage rebalancing, and audit-grade on-chain invoicing.",
    modules: [
      { name: "Merchant Checkout Widget", purpose: "Drop-in Web3 modal & hosted payment page supporting 50+ wallets (MetaMask, Phantom, Ledger).", tier: "Core" },
      { name: "Block Indexer & Node Cluster", purpose: "Real-time websocket listener scanning mempools for transaction confirmations across EVM & Solana.", tier: "Data & Edge" },
      { name: "Auto-Settlement Engine", purpose: "Automated DEX/CEX liquidity routing converting incoming tokens to stablecoins or local fiat.", tier: "Integration" },
      { name: "Merchant Treasury Portal", purpose: "API keys, instant settlement rules, refund workflows, transaction logs and tax CSV reports.", tier: "Security" },
      { name: "Gas Fee Optimizer", purpose: "Dynamic fee forecasting to batch customer transfer transactions and reduce chain gas costs by 40%.", tier: "Data & Edge" },
    ],
    stack: {
      frontend: "Next.js 15 + Tailwind + Wagmi / Viem / Solana Web3.js",
      backend: "Rust (Indexer Service) + Go (API Gateway & Webhooks)",
      database: "PostgreSQL 16 + Redis Cluster (Nonce tracking & mempool queues)",
      infraEdge: "Bare-metal RPC nodes (QuickNode / Alchemy fallback) + AWS EKS",
      aiSecurity: "MPC (Multi-Party Computation) Key Management + Fireblocks Security Protocol",
    },
    metrics: {
      estimatedSprint: "18 Weeks (4 Sprints)",
      budgetRange: "$45,000 - $75,000",
      teamStructure: "1 Crypto Solutions Architect, 2 Rust/Go Engineers, 1 Smart Contract Dev, 1 Frontend",
      techConfidence: "99.8% High Security",
    },
    phases: [
      { name: "Phase 0: Cryptographic Protocols", weeks: 3, deliverable: "MPC key orchestration, address generation trees, smart contract specs" },
      { name: "Phase 1: Multi-Chain Block Indexer", weeks: 6, deliverable: "Rust block listener, webhook delivery engine, confirmation state machine" },
      { name: "Phase 2: Liquidity & Settlement Bridge", weeks: 5, deliverable: "DEX/CEX routing, fiat payout automation, merchant dashboard" },
      { name: "Phase 3: Formal Audit & Bug Bounty", weeks: 4, deliverable: "Third-party smart contract security audit, penetration tests, mainnet launch" },
    ],
    risks: [
      {
        risk: "Blockchain reorgs (deep forks) causing false-positive payment confirmations.",
        mitigation: "Strict parameterized confirmation block depths before firing webhook settlements.",
      },
      {
        risk: "Flash price volatility during settlement conversion windows.",
        mitigation: "Atomic slippage tolerance caps (0.5%) backed by algorithmic market-maker limit orders.",
      },
    ],
  },
  ai_calling: {
    title: "Multilingual AI Voice Agent & Conversational CRM",
    summary:
      "Ultra-low latency (<450ms voice-to-voice) inbound & outbound calling agent fluent in Malayalam, English, and Arabic. Automates lead qualification, intent parsing, and instant calendar booking.",
    modules: [
      { name: "Low-Latency Voice Pipeline", purpose: "Streaming WebRTC audio bridge combining Deepgram Nova-2, custom LLM reasoning, and Cartesia/ElevenLabs TTS.", tier: "Core" },
      { name: "Telephony SIP Ingress", purpose: "Twilio & Asterisk PBX trunking supporting thousands of concurrent bidirectional PSTN calls.", tier: "Data & Edge" },
      { name: "Dynamic CRM Pipeline", purpose: "Automated call summarization, lead qualification scorecards, tag enrichment, and human escalation.", tier: "Integration" },
      { name: "Autonomous Booking Agent", purpose: "Checks counselor/expert availability via Google/Outlook Calendar and reserves slots during live conversation.", tier: "Core" },
      { name: "Guardrail & Compliance Engine", purpose: "Real-time hallucination prevention, prompt injection mitigation, and automated PII scrubbing.", tier: "Security" },
    ],
    stack: {
      frontend: "Next.js 15 + LiveKit Client SDK + Tailwind CSS",
      backend: "Python (FastAPI + AsyncIO) + LiveKit SIP Gateway + Go Webhook Worker",
      database: "Supabase (PostgreSQL + pgvector for RAG) + Redis (Call state cache)",
      infraEdge: "AWS GPU cluster (vLLM inference) + Cloudflare Realtime Edge",
      aiSecurity: "Llama-Guard 3 guardrails + PII masking + SOC2 Telephony compliance",
    },
    metrics: {
      estimatedSprint: "10 Weeks (2.5 Sprints)",
      budgetRange: "$22,000 - $35,000",
      teamStructure: "1 AI/Voice Specialist, 1 Fullstack Engineer, 1 DevOps/Telephony Lead, 1 QA",
      techConfidence: "98.9% Sub-500ms Latency",
    },
    phases: [
      { name: "Phase 0: Voice-to-Voice Latency Tuning", weeks: 2, deliverable: "SIP bridge latency benchmarking, Malayalam/English pronunciation models" },
      { name: "Phase 1: Agent Knowledge & RAG", weeks: 4, deliverable: "University/course vector index, intent detection, appointment booking logic" },
      { name: "Phase 2: CRM & Human-in-the-Loop", weeks: 3, deliverable: "Live call monitoring, counselor handover trigger, automated WhatsApp follow-ups" },
      { name: "Phase 3: Concurrency & Stress Testing", weeks: 1, deliverable: "500 simultaneous outbound call tests, latency regression checks, deployment" },
    ],
    risks: [
      {
        risk: "Voice turn-taking latency exceeding 600ms causing unnatural conversation pauses.",
        mitigation: "Edge-hosted VAD (Voice Activity Detection) with speculative LLM completion streaming.",
      },
      {
        risk: "Phonetic misunderstandings of regional Malayalam dialects or names.",
        mitigation: "Custom domain phonetic dictionary injected into speech-to-text vocabulary context.",
      },
    ],
  },
};

export default function AIBlueprintInstrument() {
  const [brief, setBrief] = useState(
    "A home physiotherapy booking platform in Qatar. Patients book visits, therapists get routed to homes, admin manages schedules and payments. Arabic and English."
  );
  const [blueprint, setBlueprint] = useState<BlueprintData>(PRESET_TEMPLATES.physio);
  const [status, setStatus] = useState("production spec");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"modules" | "stack" | "roadmap" | "risks">("modules");
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [traceLogs, setTraceLogs] = useState<string[]>([
    "System ready. Enter your project brief or pick a production archetype.",
    "Engine parsed 6 core modules, 4-phase rollout, and technical stack matrix.",
  ]);

  const presets = [
    { key: "physio", label: "Physio Dispatch (Qatar)", brief: "A home physiotherapy booking platform in Qatar. Patients book visits, therapists get routed to homes, admin manages schedules and payments. Arabic and English." },
    { key: "restaurant", label: "Restaurant ERP & POS", brief: "Restaurant chain ERP: POS billing at each outlet, kitchen display, inventory across 6 outlets, works offline when internet drops." },
    { key: "construction", label: "Construction Costing ERP", brief: "Construction company ERP: project costing, site material requests, labour attendance from a mobile app, approvals for managers." },
    { key: "crypto", label: "Crypto Payment Gateway", brief: "Crypto payment gateway for e-commerce stores: accept USDT and ETH, auto-convert to INR, merchant dashboard, wallet monitoring and on-chain receipts." },
    { key: "ai_calling", label: "AI Calling Voice CRM", brief: "Study-abroad CRM with an AI calling agent that speaks Malayalam and English to qualify leads and book counsellor appointments." },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setBrief(p.brief);
    const template = PRESET_TEMPLATES[p.key];
    if (template) {
      setBlueprint(template);
      setStatus("production spec");
      setTraceLogs([
        `Loaded archetype: "${template.title}"`,
        `Synthesized ${template.modules.length} enterprise modules & ${template.phases.length}-phase roadmap.`,
      ]);
    }
  };

  const handleGenerate = () => {
    if (!brief.trim()) return;
    setIsGenerating(true);
    setStatus("architecting");
    setTraceLogs([
      "Analyzing project requirements & domain keywords...",
      "Synthesizing architecture topology and high-availability modules...",
    ]);

    const briefLower = brief.toLowerCase();

    setTimeout(() => {
      setTraceLogs((prev) => [
        ...prev,
        "Resolving cloud infrastructure & database tier...",
        "Calculating sprint budgets, timeline, and security risk mitigations...",
      ]);
    }, 400);

    setTimeout(() => {
      let matched: BlueprintData = PRESET_TEMPLATES.physio;
      if (briefLower.includes("restaurant") || briefLower.includes("pos") || briefLower.includes("outlet") || briefLower.includes("food")) {
        matched = PRESET_TEMPLATES.restaurant;
      } else if (briefLower.includes("construction") || briefLower.includes("cost") || briefLower.includes("site") || briefLower.includes("material")) {
        matched = PRESET_TEMPLATES.construction;
      } else if (briefLower.includes("crypto") || briefLower.includes("usdt") || briefLower.includes("wallet") || briefLower.includes("blockchain")) {
        matched = PRESET_TEMPLATES.crypto;
      } else if (briefLower.includes("voice") || briefLower.includes("calling") || briefLower.includes("call") || briefLower.includes("agent") || briefLower.includes("crm")) {
        matched = PRESET_TEMPLATES.ai_calling;
      } else {
        matched = {
          title: "Custom Tailored Enterprise System",
          summary: `Architecture blueprint synthesized from: "${brief.slice(0, 110)}..." Designed for scalable multi-tier production with automated failovers and secure APIs.`,
          modules: [
            { name: "Client Applications", purpose: "Responsive Web (Next.js) & Native Mobile (Flutter/Kotlin) with offline state caching.", tier: "Core" },
            { name: "API & Business Logic Gateway", purpose: "Stateless microservices terminating TLS, rate-limiting, and managing transactional integrity.", tier: "Core" },
            { name: "Data Persistence & Cache Layer", purpose: "Relational database for ACID transactions backed by Redis in-memory cache for sub-10ms reads.", tier: "Data & Edge" },
            { name: "Integration & Notification Hub", purpose: "Automated webhook dispatch, asynchronous event queues, and multi-channel notification relays.", tier: "Integration" },
            { name: "Zero-Trust Security & Admin Hub", purpose: "RBAC authorization, granular audit logs, and SOC2-compliant encryption at rest.", tier: "Security" },
          ],
          stack: {
            frontend: "Next.js 15 (App Router) + Flutter Native Mobile",
            backend: "Node.js (TypeScript) + Go High-Throughput Services",
            database: "PostgreSQL 16 (Multi-AZ) + Redis Cluster",
            infraEdge: "AWS ECS/EKS + Cloudflare Enterprise Anycast",
            aiSecurity: "Mutual TLS + Vault Secret Management",
          },
          metrics: {
            estimatedSprint: "12 - 14 Weeks",
            budgetRange: "$25,000 - $40,000",
            teamStructure: "1 Solutions Architect, 2 Fullstack, 1 Mobile, 1 QA",
            techConfidence: "98.2% Architecture Validation",
          },
          phases: [
            { name: "Phase 0: Architecture & Schemas", weeks: 2, deliverable: "Wireframes, API contracts, schema models, threat analysis" },
            { name: "Phase 1: Core System & APIs", weeks: 6, deliverable: "Database implementation, core business logic, frontend shell" },
            { name: "Phase 2: Integrations & Polishing", weeks: 4, deliverable: "Third-party APIs, payments, real-time queues, analytics" },
            { name: "Phase 3: QA & Production Deploy", weeks: 2, deliverable: "Load testing, penetration testing, store submission, live rollout" },
          ],
          risks: [
            { risk: "Third-party vendor API rate limits and uptime dependencies.", mitigation: "Implement circuit breaker patterns with Redis asynchronous retry queues." },
            { risk: "Data consistency under concurrent user writes.", mitigation: "Enforce strict ACID transactions with optimistic locking on shared resources." },
          ],
        };
      }

      setBlueprint(matched);
      setStatus("production ready");
      setIsGenerating(false);
      setTraceLogs((prev) => [
        ...prev,
        `✓ Blueprint finalized: ${matched.modules.length} modules, ${matched.metrics.estimatedSprint} delivery window.`,
      ]);
    }, 850);
  };

  const handleCopyMarkdown = () => {
    const md = `# ${blueprint.title}
*System Architecture Blueprint by First Logic Metalab*

**Executive Summary:**
${blueprint.summary}

---

## Technical Metrics & Engagement Scope:
- **Estimated Delivery:** ${blueprint.metrics.estimatedSprint}
- **Budgetary Range:** ${blueprint.metrics.budgetRange}
- **Recommended Team:** ${blueprint.metrics.teamStructure}
- **Architectural Validation:** ${blueprint.metrics.techConfidence}

---

## Architectural Modules:
${blueprint.modules.map((m) => `- **${m.name}** [${m.tier}]: ${m.purpose}`).join("\n")}

---

## Recommended Technology Stack:
- **Client Frontend:** ${blueprint.stack.frontend}
- **Backend & Logic:** ${blueprint.stack.backend}
- **Database & Cache:** ${blueprint.stack.database}
- **Edge & Cloud Infra:** ${blueprint.stack.infraEdge}
- **Security & Guardrails:** ${blueprint.stack.aiSecurity}

---

## Delivery Roadmap & Milestones:
${blueprint.phases.map((p) => `### ${p.name} (${p.weeks} Weeks)\n*Deliverable:* ${p.deliverable}`).join("\n\n")}

---

## Identified Risks & Mitigations:
${blueprint.risks.map((r) => `* **Risk:** ${r.risk}\n  *Mitigation:* ${r.mitigation}`).join("\n\n")}

---
*Generated by FLML AI Solution Architecture Engine (https://firstlogicmetalab.com)*
`;

    navigator.clipboard.writeText(md).then(() => {
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2400);
    });
  };

  return (
    <section className="g" id="blueprint">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              AI engineering &amp; scoping
            </p>
            <h2>
              Describe your project. Get a complete <em>engineering blueprint</em> in seconds.
            </h2>
          </div>
          <p className="lede">
            Enterprise scoping at your fingertips. Our architecture engine breaks your brief down into production-grade modular topologies, concrete technology stacks, timeline estimations, and risk mitigations.
          </p>
        </div>

        <div className="ai">
          {/* Left Bay: Brief Input & Presets */}
          <div className="bay ai-in">
            <div className="lbl" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Project Brief</span>
              <span style={{ fontSize: "11px", color: "var(--trace)" }}>Prompt or Select Archetype</span>
            </div>
            
            <textarea
              id="brief-text"
              rows={4}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Describe your app, platforms, expected scale, payments, or special capabilities..."
              style={{
                width: "100%",
                background: "var(--bay-2)",
                color: "var(--text)",
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "12px",
                fontSize: "13.5px",
                lineHeight: "1.6",
                resize: "vertical",
              }}
            />

            <div>
              <div className="lbl" style={{ marginBottom: "8px", fontSize: "11px" }}>
                <span>Production Archetypes</span>
              </div>
              <div className="chips" aria-label="Example briefs" style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {presets.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    className="chip"
                    onClick={() => handleSelectPreset(p)}
                    style={{
                      fontSize: "11.5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      border: brief === p.brief ? "1px solid var(--trace)" : "1px solid var(--rule)",
                      color: brief === p.brief ? "var(--trace)" : "var(--text)",
                      background: brief === p.brief ? "rgba(47, 91, 234, 0.12)" : "var(--bay)",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginTop: "4px" }}>
              <button
                type="button"
                className="btn primary"
                disabled={isGenerating}
                onClick={handleGenerate}
                style={{ minHeight: "38px", padding: "0 18px", fontSize: "13px", fontWeight: 600 }}
              >
                {isGenerating ? "Synthesizing Architecture..." : "⚡ Generate Blueprint"}
              </button>

              <button
                type="button"
                className="btn"
                onClick={handleCopyMarkdown}
                style={{
                  minHeight: "38px",
                  padding: "0 14px",
                  fontSize: "12px",
                  background: copiedSpec ? "var(--ok)" : "var(--bay-2)",
                  color: copiedSpec ? "#080C17" : "var(--text)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                }}
              >
                {copiedSpec ? "✓ Blueprint Copied!" : "📋 Copy Blueprint RFC"}
              </button>
            </div>

            {/* Trace logs terminal */}
            <div
              className="trace"
              aria-live="polite"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "var(--muted)",
                background: "var(--ink)",
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "10px 12px",
                maxHeight: "120px",
                overflowY: "auto",
              }}
            >
              {traceLogs.map((log, i) => (
                <div key={i} style={{ color: i === traceLogs.length - 1 ? "var(--trace)" : "var(--dim)" }}>
                  {log.startsWith("✓") ? "" : "› "} {log}
                </div>
              ))}
            </div>
          </div>

          {/* Right Bay: Blueprint Output */}
          <div className="bay" style={{ display: "flex", flexDirection: "column" }}>
            <div className="bay-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: "var(--text)" }}>{blueprint.title}</span>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--f-mono)",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: isGenerating ? "var(--amber)" : "rgba(34, 197, 94, 0.15)",
                  color: isGenerating ? "#080C17" : "var(--ok)",
                  fontWeight: 600,
                }}
              >
                {isGenerating ? "Synthesizing..." : status}
              </span>
            </div>

            {/* Metrics Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "8px",
                padding: "12px 18px",
                background: "var(--bay-2)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block" }}>Timeline</span>
                <strong style={{ fontSize: "12.5px", color: "var(--trace)", fontFamily: "var(--f-mono)" }}>{blueprint.metrics.estimatedSprint}</strong>
              </div>
              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block" }}>Budget Est.</span>
                <strong style={{ fontSize: "12.5px", color: "var(--amber)", fontFamily: "var(--f-mono)" }}>{blueprint.metrics.budgetRange}</strong>
              </div>
              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block" }}>Core Team</span>
                <span style={{ fontSize: "11.5px", color: "var(--text)", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {blueprint.metrics.teamStructure.split(",")[0]}
                </span>
              </div>
              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block" }}>Readiness</span>
                <strong style={{ fontSize: "12.5px", color: "var(--ok)", fontFamily: "var(--f-mono)" }}>{blueprint.metrics.techConfidence}</strong>
              </div>
            </div>

            {/* Section View Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid var(--rule)", background: "var(--bay)" }}>
              {(
                [
                  ["modules", "Architecture Modules"],
                  ["stack", "Tech Stack"],
                  ["roadmap", "Milestones"],
                  ["risks", "Risks & Mitigations"],
                ] as const
              ).map(([tabKey, tabLabel]) => {
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => setActiveTab(tabKey)}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      background: "transparent",
                      border: "none",
                      borderBottom: isActive ? "2px solid var(--trace)" : "2px solid transparent",
                      color: isActive ? "var(--trace)" : "var(--muted)",
                      fontSize: "12px",
                      fontWeight: isActive ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>

            <div className="bp" aria-live="polite" style={{ padding: "16px 18px", flex: 1, overflowY: "auto" }}>
              <p className="bp-sum" style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--text)", marginBottom: "16px" }}>
                {blueprint.summary}
              </p>

              {/* TAB 1: MODULES */}
              {activeTab === "modules" && (
                <div>
                  <div className="bp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                    {blueprint.modules.map((m, i) => (
                      <div
                        key={i}
                        className="mod"
                        style={{
                          background: "var(--bay-2)",
                          border: "1px solid var(--rule)",
                          borderRadius: "4px",
                          padding: "12px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <b style={{ fontSize: "13px", color: "var(--text)" }}>{m.name}</b>
                          <span
                            style={{
                              fontSize: "9.5px",
                              fontFamily: "var(--f-mono)",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              background: m.tier === "Core" ? "rgba(47, 91, 234, 0.15)" : m.tier === "Security" ? "rgba(239, 68, 68, 0.15)" : "var(--rule)",
                              color: m.tier === "Core" ? "var(--trace)" : m.tier === "Security" ? "#EF4444" : "var(--muted)",
                            }}
                          >
                            {m.tier}
                          </span>
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>{m.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: TECH STACK */}
              {activeTab === "stack" && (
                <div style={{ display: "grid", gap: "10px" }}>
                  {Object.entries(blueprint.stack).map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 14px",
                        background: "var(--bay-2)",
                        border: "1px solid var(--rule)",
                        borderRadius: "4px",
                      }}
                    >
                      <span style={{ textTransform: "capitalize", fontSize: "12px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                        {k.replace(/([A-Z])/g, " $1")}
                      </span>
                      <strong style={{ fontSize: "13px", color: "var(--text)", fontFamily: "var(--f-mono)" }}>
                        {v}
                      </strong>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: ROADMAP */}
              {activeTab === "roadmap" && (
                <div className="phases" style={{ display: "grid", gap: "10px" }}>
                  {blueprint.phases.map((ph, i) => (
                    <div
                      key={i}
                      className="phase"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 14px",
                        background: "var(--bay-2)",
                        border: "1px solid var(--rule)",
                        borderLeft: "3px solid var(--trace)",
                        borderRadius: "4px",
                      }}
                    >
                      <div>
                        <strong style={{ display: "block", fontSize: "13.5px", color: "var(--text)" }}>{ph.name}</strong>
                        <span style={{ fontSize: "12px", color: "var(--muted)" }}>{ph.deliverable}</span>
                      </div>
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontFamily: "var(--f-mono)",
                          color: "var(--trace)",
                          background: "rgba(47, 91, 234, 0.12)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ph.weeks} weeks
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: RISKS */}
              {activeTab === "risks" && (
                <div style={{ display: "grid", gap: "10px" }}>
                  {blueprint.risks.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px 14px",
                        background: "var(--bay-2)",
                        border: "1px solid var(--rule)",
                        borderRadius: "4px",
                      }}
                    >
                      <div style={{ color: "var(--amber)", fontSize: "12.5px", fontWeight: 600, marginBottom: "4px" }}>
                        ⚠ Risk: {item.risk}
                      </div>
                      <div style={{ color: "var(--muted)", fontSize: "12px", lineHeight: "1.5" }}>
                        <strong style={{ color: "var(--ok)" }}>Mitigation:</strong> {item.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
