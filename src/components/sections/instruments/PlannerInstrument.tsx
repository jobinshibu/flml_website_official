"use client";

import { useMemo, useState } from "react";

const USERS = ["1k", "10k", "100k", "1M", "10M"];

interface FeatState {
  payments: boolean;
  offline: boolean;
  realtime: boolean;
  ai: boolean;
  tenant: boolean;
  desktop: boolean;
  pos: boolean;
  web3: boolean;
}

interface NodeDetail {
  title: string;
  category: string;
  tech: string;
  flmlRationale: string;
  resilience: string;
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  mob: {
    title: "Mobile Apps (Android & iOS)",
    category: "Client Layer",
    tech: "Kotlin Multiplatform / Flutter + Swift/Jetpack Compose",
    flmlRationale: "Unified business logic layer compiled to native UI binaries. Zero bridge latency, full access to platform-native secure enclaves and offline databases.",
    resilience: "Local SQLite caching with optimistic local mutation queue and background reconcile."
  },
  web: {
    title: "Web App (PWA & SSR)",
    category: "Client Layer",
    tech: "Next.js 15 (App Router, Turbopack) / React 19",
    flmlRationale: "Sub-second first contentful paint with streaming server components, hydrated with localized state machine stores.",
    resilience: "Automated service worker asset caching with fallback offline landing."
  },
  desk: {
    title: "Desktop Apps",
    category: "Client Layer",
    tech: "Tauri v2 / Rust + React / Electron",
    flmlRationale: "Lean ~18MB native installer footprint, native OS windowing, hardware-accelerated rendering and secure local socket channels.",
    resilience: "Crash-tolerant auto-updating with sandboxed native processes."
  },
  pos: {
    title: "POS Terminals",
    category: "Client Layer",
    tech: "Android POS SDK / Embedded Linux / WebSockets",
    flmlRationale: "Dedicated kiosk-mode runtime communicating with hardware peripherals (barcode scanners, thermal ESC/POS printers, EMV chip readers).",
    resilience: "Full offline receipt generation with signed local cryptographic nonces."
  },
  adm: {
    title: "Tenant Console",
    category: "Client Layer",
    tech: "Next.js enterprise backoffice / Role-Based Access Control",
    flmlRationale: "Strict multi-tenant administrative portal with audit telemetry, fine-grained RBAC, and billing self-service.",
    resilience: "Session token rotation with instant remote credential revocation."
  },
  wal: {
    title: "Web3 Wallet Connect",
    category: "Client Layer",
    tech: "EIP-6963 / Wagmi / Viem / Solana Web3.js",
    flmlRationale: "Multi-chain wallet connection handling non-custodial cryptographic signing and session preservation.",
    resilience: "Multi-RPC fallback provider cycling with auto-retry on dropped blocks."
  },
  gw: {
    title: "Edge API Gateway",
    category: "Edge & Ingress",
    tech: "Envoy Proxy / Cloudflare Workers / Kong",
    flmlRationale: "Distributed TLS 1.3 termination, IP reputation checking, token introspection, and per-tenant burst rate-limiting at the edge.",
    resilience: "Global DDoS mitigation and automatic circuit-breaking for unstable downstream microservices."
  },
  lb: {
    title: "Layer 7 Load Balancer",
    category: "Edge & Ingress",
    tech: "AWS ALB / GCP Cloud Load Balancing / Traefik",
    flmlRationale: "Cross-zone weighted path routing, gRPC connection multiplexing, and zero-downtime rolling canary deployments.",
    resilience: "Active sub-second health checks with instant outlier pod ejection."
  },
  cdn: {
    title: "Edge CDN & Anycast Cache",
    category: "Edge & Ingress",
    tech: "Fastly / Cloudflare Enterprise Cache",
    flmlRationale: "Static assets and stale-while-revalidate API responses served within 12ms of 95% of global users.",
    resilience: "Instant global purge tags and origin shield pooling to shield internal servers."
  },
  auth: {
    title: "Auth & Identity Service",
    category: "Core Services",
    tech: "Go / Rust / OIDC + Ed25519 JWT + WebAuthn",
    flmlRationale: "High-throughput, stateless token verification, passkey passwordless auth, and hierarchical tenant permission evaluation.",
    resilience: "Key rotation with asymmetric pubkey edge caching preventing auth bottleneck."
  },
  core: {
    title: "Core Business Logic API",
    category: "Core Services",
    tech: "Node.js (NestJS) / Go / Python (FastAPI)",
    flmlRationale: "Domain-Driven Design (DDD) modular monolithic or gRPC microservices implementing business rules and workflows.",
    resilience: "Horizontal pod autoscaling (HPA) governed by CPU and request queue depth."
  },
  pay: {
    title: "Payments & Ledger Service",
    category: "Core Services",
    tech: "Go / Temporal / Stripe & UPI APIs",
    flmlRationale: "Strict double-entry bookkeeping ledger with deterministic idempotency keys and outbox pattern for webhook dispatch.",
    resilience: "Automatic state-machine reconciliation with idempotent retry buffers."
  },
  rt: {
    title: "Realtime WebSocket & Media",
    category: "Core Services",
    tech: "Socket.IO / Centrifugo / LiveKit WebRTC",
    flmlRationale: "Bi-directional sub-50ms message delivery, selective forwarding units (SFU) for audio/video, and presence tracking.",
    resilience: "Redis Pub/Sub backplane clustering across multiple node instances."
  },
  ai: {
    title: "AI & LLM Inference Gateway",
    category: "Core Services",
    tech: "Python / vLLM / LangChain / Guardrails AI",
    flmlRationale: "Asynchronous task orchestration, semantic prompt caching, context window management, and PII redaction filters.",
    resilience: "Fallback model cascading (GPT-4o -> Claude 3.5 -> Gemini Flash) on API rate-limits."
  },
  ten: {
    title: "Tenant Isolation Manager",
    category: "Core Services",
    tech: "Postgres RLS / DynamoDB Partitioning",
    flmlRationale: "Guarantees zero cross-tenant data leakage via cryptographic tenant context injectors on all database queries.",
    resilience: "Tenant quota throttling preventing noisy neighbor degradation."
  },
  sync: {
    title: "Bi-directional Sync Engine",
    category: "Core Services",
    tech: "ElectricSQL / WatermelonDB / CRDTs (Yjs)",
    flmlRationale: "Conflict-free Replicated Data Types resolve concurrent edits between distributed terminals and cloud masters.",
    resilience: "Vector clocks and timestamp verification preventing data rollbacks."
  },
  inv: {
    title: "Inventory & Ledger Engine",
    category: "Core Services",
    tech: "Go / Redis Locks / PostgreSQL",
    flmlRationale: "Atomic stock decrements with distributed distributed Redlock to prevent overselling across outlets.",
    resilience: "Dead-letter queue alerting with audit reconciliation triggers."
  },
  chain: {
    title: "Blockchain Indexer & Node",
    category: "Core Services",
    tech: "The Graph / Rust Subgraph Indexer",
    flmlRationale: "Mirrors on-chain smart contract events into relational SQL models for sub-10ms query execution.",
    resilience: "Reorg-aware block confirmation thresholds with multi-node RPC validation."
  },
  doc: {
    title: "Document Database",
    category: "Data Layer",
    tech: "MongoDB Atlas / Firestore",
    flmlRationale: "Schema-flexible fast storage ideal for rapid MVP validation and dynamic JSON payloads.",
    resilience: "Automated daily point-in-time recovery and auto-scaling tier."
  },
  pg: {
    title: "Relational Database (PostgreSQL)",
    category: "Data Layer",
    tech: "PostgreSQL 16 (AWS Aurora / Supabase Cloud)",
    flmlRationale: "ACID compliance, robust foreign key guarantees, jsonb indexing, and declarative Row-Level Security.",
    resilience: "Multi-AZ synchronous replication with sub-30s automated failover."
  },
  cache: {
    title: "In-Memory Cache & Session Store",
    category: "Data Layer",
    tech: "Redis Cluster / DragonFly",
    flmlRationale: "Sub-millisecond read access for high-frequency queries, session tokens, and rate-limiting sliding windows.",
    resilience: "Redis Sentinel cluster with in-memory persistence snapshots (AOF)."
  },
  q: {
    title: "Distributed Message Broker & Queue",
    category: "Data Layer",
    tech: "Apache Kafka / RabbitMQ / AWS SQS",
    flmlRationale: "Decouples synchronous request paths from heavyweight processing (emails, analytics, payment webhooks).",
    resilience: "At-least-once delivery guarantees with exponential backoff Dead-Letter Queues."
  },
  vec: {
    title: "Vector Search Index",
    category: "Data Layer",
    tech: "pgvector / Pinecone / Qdrant",
    flmlRationale: "Sub-15ms HNSW vector similarity search for semantic knowledge retrieval and document embeddings.",
    resilience: "Metadata-filtered sharded indexing with high-recall tuning."
  },
  local: {
    title: "Embedded On-Device Storage",
    category: "Data Layer",
    tech: "SQLite (SQLCipher) / Realm / IndexedDB",
    flmlRationale: "Encrypted zero-network local storage allowing mobile and POS hardware to operate indefinitely offline.",
    resilience: "Write-ahead logging (WAL) preventing database corruption during unexpected power cuts."
  },
  ledger: {
    title: "Decentralized Settlement Ledger",
    category: "Data Layer",
    tech: "Ethereum L2 (Arbitrum / Base) / Solana",
    flmlRationale: "Trustless verifiable state ownership and smart contract settlement.",
    resilience: "Multi-validator proof-of-stake consensus."
  },
  obj: {
    title: "Object Storage & S3 Lake",
    category: "Data Layer",
    tech: "AWS S3 / Cloudflare R2",
    flmlRationale: "11 nines of durability for multimedia, exports, invoice PDFs, and database archive snapshots.",
    resilience: "Cross-region replication with automatic lifecycle tiering to Glacier cold storage."
  }
};

const ARCH_PRESETS: {
  id: string;
  label: string;
  badge: string;
  users: number;
  feats: FeatState;
}[] = [
  {
    id: "fintech",
    label: "Fintech & Payments",
    badge: "PCI · ACID",
    users: 2,
    feats: {
      payments: true,
      offline: false,
      realtime: false,
      ai: false,
      tenant: true,
      desktop: false,
      pos: false,
      web3: false,
    },
  },
  {
    id: "ai_saas",
    label: "AI Agent SaaS",
    badge: "RAG · Streaming",
    users: 2,
    feats: {
      payments: true,
      offline: false,
      realtime: true,
      ai: true,
      tenant: true,
      desktop: false,
      pos: false,
      web3: false,
    },
  },
  {
    id: "pos_retail",
    label: "Offline POS & Retail",
    badge: "Zero-Downtime",
    users: 1,
    feats: {
      payments: true,
      offline: true,
      realtime: false,
      ai: false,
      tenant: false,
      desktop: true,
      pos: true,
      web3: false,
    },
  },
  {
    id: "hyper_scale",
    label: "Global Multi-Tenant",
    badge: "10M Active",
    users: 4,
    feats: {
      payments: true,
      offline: false,
      realtime: true,
      ai: true,
      tenant: true,
      desktop: false,
      pos: false,
      web3: false,
    },
  },
];

export default function PlannerInstrument() {
  const [userIndex, setUserIndex] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("gw");
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const [feat, setFeat] = useState<FeatState>({
    payments: true,
    offline: false,
    realtime: false,
    ai: false,
    tenant: false,
    desktop: false,
    pos: false,
    web3: false,
  });

  const toggleFeat = (k: keyof FeatState) => {
    setActivePreset(null);
    setFeat((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const applyPreset = (preset: typeof ARCH_PRESETS[0]) => {
    setActivePreset(preset.id);
    setUserIndex(preset.users);
    setFeat(preset.feats);
  };

  const model = useMemo(() => {
    const u = userIndex;
    const big = u >= 2;
    const huge = u >= 3;
    const C: [string, string, string][] = [];
    const E: [string, string, string][] = [];
    const S: [string, string, string][] = [];
    const D: [string, string, string][] = [];
    const log: string[] = [];

    C.push(["mob", "Mobile apps", "Android · iOS"], ["web", "Web app", "responsive · PWA"]);
    if (feat.desktop) C.push(["desk", "Desktop apps", "Windows · macOS"]);
    if (feat.pos) C.push(["pos", "POS terminals", "retail · hospitality"]);
    if (feat.tenant) C.push(["adm", "Tenant console", "per-org admin"]);
    if (feat.web3) C.push(["wal", "Wallet / dApp", "web3 connect"]);

    E.push(["gw", "API gateway", "auth · rate limits"]);
    if (big) E.push(["lb", "Load balancer", "L7 · health checks"]);
    if (huge) E.push(["cdn", "CDN / edge", "static + cached API"]);

    S.push(["auth", "Auth service", "tokens · OTP · roles"], ["core", "Core API", "business logic"]);
    if (feat.payments) S.push(["pay", "Payments service", "UPI · cards · webhooks"]);
    if (feat.realtime) S.push(["rt", "Realtime service", "WebSocket · WebRTC/TURN"]);
    if (feat.ai) S.push(["ai", "AI service", "LLM · RAG · guardrails"]);
    if (feat.tenant) S.push(["ten", "Tenant manager", "isolation · billing"]);
    if (feat.desktop || feat.pos)
      S.push(["sync", "Sync engine", feat.pos ? "outlets ⇄ cloud" : "desktop ⇄ cloud"]);
    if (feat.pos) S.push(["inv", "Inventory & billing", "multi-outlet · tax"]);
    if (feat.web3) S.push(["chain", "Chain service", "contracts · indexer"]);

    const doc = u <= 1 && !feat.tenant;
    D.push([
      doc ? "doc" : "pg",
      doc ? "Document DB" : "PostgreSQL",
      doc ? "managed · realtime" : huge ? "primary + read replicas" : "managed · backups",
    ]);
    if (big) D.push(["cache", "Redis cache", "hot reads · sessions"]);
    if (feat.payments || big) D.push(["q", "Event queue", "async · retries"]);
    if (feat.ai) D.push(["vec", "Vector index", "embeddings"]);
    if (feat.offline || feat.desktop || feat.pos)
      D.push(["local", "On-device DB", "encrypted · offline sync"]);
    if (feat.web3) D.push(["ledger", "Blockchain", "on-chain state"]);
    D.push(["obj", "Object storage", "files · media"]);

    log.push(
      `Sized for ${USERS[u]} users: ${
        [
          "single region, managed services, low fixed cost",
          "single region with autoscaling",
          "load-balanced, cached, asynchronous processing",
          "multi-zone, read replicas, CDN at the edge",
          "multi-region active-active, sharded data",
        ][u]
      }.`
    );
    log.push(
      doc
        ? "A managed document database keeps the first version fast to ship and cheap to run."
        : "PostgreSQL for relational integrity" +
            (feat.tenant ? " with row-level security per tenant." : " and reporting.")
    );
    if (big) log.push("Redis absorbs repeated reads so the database scales with writes, not views.");
    if (feat.payments)
      log.push("Payments isolated in their own service; every charge carries an idempotency key.");
    if (feat.offline)
      log.push("Offline-first: writes land on the device and sync when the network returns.");
    if (feat.realtime)
      log.push("Realtime over WebSockets; calls via WebRTC with TURN relays for strict networks.");
    if (feat.ai)
      log.push("AI behind its own service with retrieval, output validation and cost limits.");
    if (feat.tenant)
      log.push("Tenancy enforced in the data layer, so one organisation can never read another.");
    if (feat.desktop)
      log.push("Windows and macOS apps share business logic with mobile and sync through one engine.");
    if (feat.pos)
      log.push("POS terminals keep selling offline; sales and stock reconcile across outlets when the network returns.");
    if (feat.web3)
      log.push("Only trust-critical state goes on-chain; an indexer mirrors chain events for fast queries.");

    const tier = Math.min(5, 1 + u + (feat.realtime || feat.ai || feat.web3 ? 1 : 0));

    // Dynamic cost & latency calculations
    const costMap = [
      { min: 35, max: 90, p95: "< 45ms", avail: "99.9%" },
      { min: 140, max: 320, p95: "< 35ms", avail: "99.95%" },
      { min: 580, max: 1250, p95: "< 24ms", avail: "99.99%" },
      { min: 1800, max: 3900, p95: "< 16ms", avail: "99.995%" },
      { min: 5200, max: 11500, p95: "< 10ms", avail: "99.999%" },
    ];
    let cost = costMap[u];
    const featCostMultiplier = 1 + (feat.ai ? 0.35 : 0) + (feat.realtime ? 0.2 : 0) + (feat.payments ? 0.15 : 0);
    const estMin = Math.round(cost.min * featCostMultiplier);
    const estMax = Math.round(cost.max * featCostMultiplier);

    return {
      cols: [
        ["CLIENTS", C],
        ["EDGE", E],
        ["SERVICES", S],
        ["DATA", D],
      ] as const,
      log,
      tier,
      estSpend: `$${estMin.toLocaleString()} - $${estMax.toLocaleString()}/mo`,
      p95Latency: cost.p95,
      availTarget: cost.avail,
    };
  }, [userIndex, feat]);

  // Diagram rendering math
  const X = [18, 240, 462, 684];
  const w = 198;
  const h = 44;
  const pos: Record<string, { x: number; y: number }> = {};

  model.cols.forEach(([_, items], ci) => {
    const gap = Math.min(56, 370 / Math.max(items.length, 1));
    const top = 40 + (380 - gap * items.length) / 2;
    items.forEach(([id], i) => {
      pos[id] = { x: X[ci], y: top + i * gap };
    });
  });

  const edges: { d: string; delay: number }[] = [];
  for (let ci = 0; ci < 3; ci++) {
    const a = model.cols[ci][1];
    const b = model.cols[ci + 1][1];
    a.forEach((na, i) =>
      b.forEach((nb, j) => {
        if (ci === 0 && j > 0 && nb[0] !== "lb" && nb[0] !== "cdn") return;
        if (ci === 1 && i !== a.length - 1) return;
        if (ci === 2 && Math.abs(i / a.length - j / b.length) >= 0.42) return;

        const p = pos[na[0]];
        const q = pos[nb[0]];
        if (!p || !q) return;
        const x1 = p.x + w;
        const y1 = p.y + h / 2;
        const x2 = q.x;
        const y2 = q.y + h / 2;
        const mx = (x1 + x2) / 2;
        const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        edges.push({ d, delay: -(i + j) * 0.3 });
      })
    );
  }

  const tierNames = [
    "",
    "Tier 1 · MVP / low traffic",
    "Tier 2 · Growing production",
    "Tier 3 · High availability",
    "Tier 4 · Enterprise scale",
    "Tier 5 · Multi-region fault-tolerant",
  ];

  // Active node inspector details
  const activeDetail = NODE_DETAILS[selectedNodeId] || {
    title: "Edge API Gateway",
    category: "Edge & Ingress",
    tech: "Envoy Proxy / Cloudflare Workers",
    flmlRationale: "Unified entrypoint terminating TLS and enforcing security rate-limits.",
    resilience: "Global DDoS mitigation and automatic circuit-breaking."
  };

  const handleExportMarkdown = () => {
    const totalComponents = model.cols.reduce((acc, c) => acc + c[1].length, 0);
    const spec = `# FLML Solution Architecture Blueprint
**Scale:** ${USERS[userIndex]} Monthly Active Users
**Tier:** ${tierNames[model.tier]}
**Estimated Cloud Spend:** ${model.estSpend}
**p95 Latency SLA:** ${model.p95Latency} | **Target Availability:** ${model.availTarget}
**Total Component Nodes:** ${totalComponents}

---

## Active Topologies:
${model.cols
  .map(
    ([colName, items]) =>
      `### ${colName}\n` +
      items.map(([id, title, subtitle]) => `- **${title}** (\`${id}\`): ${subtitle}`).join("\n")
  )
  .join("\n\n")}

---

## Architecture Decisions & Logic:
${model.log.map((line) => `* ${line}`).join("\n")}

Generated by First Logic Metalab Architecture Engine (https://firstlogicmetalab.com)
`;

    navigator.clipboard.writeText(spec).then(() => {
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2400);
    });
  };

  const handleDownloadSVG = () => {
    const svgEl = document.getElementById("archSvg");
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flml-architecture-${USERS[userIndex]}-users.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="g" id="planner">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Solution architecture
            </p>
            <h2>
              Change the requirements. Watch the system <em>redesign</em> itself.
            </h2>
          </div>
          <p className="lede">
            This is how our engagements start. Pick a production archetype or set custom scale and capabilities; the architecture, live topologies, cloud economics, and engineering decision log update instantly.
          </p>
        </div>

        {/* 1. ARCHETYPE PRESETS BAR */}
        <div className="arch-presets-wrap" style={{ marginBottom: "16px" }}>
          <div className="lbl" style={{ marginBottom: "8px" }}>
            <span>Architecture Archetypes</span>
            <span style={{ color: "var(--trace)", fontSize: "11px" }}>1-Click Production Blueprints</span>
          </div>
          <div className="arch-presets-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px" }}>
            {ARCH_PRESETS.map((p) => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`chip arch-preset-card ${isSelected ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: isSelected ? "var(--bay-2)" : "var(--bay)",
                    border: isSelected ? "1px solid var(--trace)" : "1px solid var(--rule)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                  }}
                >
                  <div>
                    <strong style={{ display: "block", fontSize: "13px", color: isSelected ? "var(--trace)" : "var(--text)" }}>
                      {p.label}
                    </strong>
                    <span style={{ fontSize: "10.5px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                      {p.badge}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "2px 7px",
                      borderRadius: "10px",
                      background: isSelected ? "var(--trace)" : "var(--rule)",
                      color: isSelected ? "#080C17" : "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {USERS[p.users]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="arch">
          {/* Controls bay */}
          <div className="bay ctrl">
            <div>
              <label className="lbl" htmlFor="users">
                Expected users <output id="usersOut">{USERS[userIndex]}</output>
              </label>
              <input
                type="range"
                id="users"
                min="0"
                max="4"
                step="1"
                value={userIndex}
                onChange={(e) => {
                  setActivePreset(null);
                  setUserIndex(Number(e.target.value));
                }}
              />
            </div>

            <div>
              <div className="lbl">Capabilities</div>
              <div className="chips" id="feat">
                {(
                  [
                    ["payments", "payments"],
                    ["offline", "offline-first"],
                    ["realtime", "chat / calls"],
                    ["ai", "AI features"],
                    ["tenant", "multi-tenant SaaS"],
                    ["pos", "POS & retail"],
                    ["desktop", "Windows / macOS apps"],
                    ["web3", "blockchain / web3"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    className="chip"
                    aria-pressed={feat[key]}
                    onClick={() => toggleFeat(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="lbl">Infrastructure tier</div>
              <div className="tier">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`dot ${i < model.tier ? "on" : ""}`}
                  />
                ))}
              </div>
              <div
                id="tierName"
                className="mono"
                style={{ fontSize: "12px", color: "var(--muted)", marginTop: "8px" }}
              >
                {tierNames[model.tier]}
              </div>
            </div>

            {/* 2. COST & PERFORMANCE ESTIMATOR WIDGET */}
            <div
              className="arch-metrics-box"
              style={{
                borderTop: "1px dashed var(--rule)",
                paddingTop: "16px",
                display: "grid",
                gap: "10px",
              }}
            >
              <div className="lbl" style={{ marginBottom: "2px" }}>
                <span>Infrastructure Economics</span>
                <span style={{ color: "var(--ok)", fontSize: "10px" }}>ESTIMATED</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{
                    background: "var(--bay-2)",
                    padding: "8px 10px",
                    borderRadius: "4px",
                    border: "1px solid var(--rule)",
                  }}
                >
                  <span style={{ color: "var(--dim)", fontSize: "10.5px", display: "block" }}>Monthly Spend</span>
                  <strong style={{ color: "var(--amber)", fontSize: "12.5px", fontFamily: "var(--f-mono)" }}>
                    {model.estSpend}
                  </strong>
                </div>
                <div
                  style={{
                    background: "var(--bay-2)",
                    padding: "8px 10px",
                    borderRadius: "4px",
                    border: "1px solid var(--rule)",
                  }}
                >
                  <span style={{ color: "var(--dim)", fontSize: "10.5px", display: "block" }}>p95 Latency</span>
                  <strong style={{ color: "var(--trace)", fontSize: "12.5px", fontFamily: "var(--f-mono)" }}>
                    {model.p95Latency}
                  </strong>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11px",
                  color: "var(--muted)",
                  fontFamily: "var(--f-mono)",
                  padding: "4px 2px",
                }}
              >
                <span>Target SLA: <strong style={{ color: "var(--ok)" }}>{model.availTarget}</strong></span>
                <span>Active Nodes: <strong style={{ color: "var(--text)" }}>{model.cols.reduce((acc, c) => acc + c[1].length, 0)}</strong></span>
              </div>
            </div>

            {/* 4. EXPORT BUTTONS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }}>
              <button
                type="button"
                className="btn"
                onClick={handleExportMarkdown}
                style={{
                  fontSize: "11.5px",
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  background: copiedSpec ? "var(--ok)" : "var(--bay-2)",
                  color: copiedSpec ? "#080C17" : "var(--text)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                }}
              >
                {copiedSpec ? "✓ Spec Copied" : "📋 Copy RFC"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={handleDownloadSVG}
                style={{
                  fontSize: "11.5px",
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  background: "var(--bay-2)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                }}
              >
                📥 Export SVG
              </button>
            </div>
          </div>

          {/* Diagram bay */}
          <div className="bay">
            <div className="bay-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>system diagram · auto-generated · click any node to inspect</span>
              <span id="archCount">
                {model.cols.reduce((acc, c) => acc + c[1].length, 0)} components
              </span>
            </div>

            <div className="dscroll">
              <svg
                id="archSvg"
                viewBox="0 0 900 430"
                role="img"
                aria-label="System architecture diagram for the selected requirements"
              >
                {/* Column Headers */}
                {model.cols.map(([name], ci) => (
                  <text key={name} className="colhead" x={X[ci]} y="22">
                    {name}
                  </text>
                ))}

                {/* Edges */}
                {edges.map((e, idx) => (
                  <g key={idx}>
                    <path className="edge" d={e.d} />
                    <path
                      className="flow"
                      d={e.d}
                      style={{ animationDelay: `${e.delay}s` }}
                    />
                  </g>
                ))}

                {/* Nodes */}
                {model.cols.map(([, items]) =>
                  items.map(([id, title, subtitle]) => {
                    const p = pos[id];
                    if (!p) return null;
                    const isSelected = selectedNodeId === id;
                    return (
                      <g
                        key={id}
                        className={`node ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedNodeId(id)}
                        style={{ cursor: "pointer" }}
                      >
                        <rect
                          x={p.x}
                          y={p.y}
                          width={w}
                          height={h}
                          rx="4"
                          style={{
                            stroke: isSelected ? "var(--trace)" : undefined,
                            strokeWidth: isSelected ? "2px" : undefined,
                            fill: isSelected ? "rgba(47, 91, 234, 0.18)" : undefined,
                            transition: "all 0.15s ease",
                          }}
                        />
                        <text x={p.x + 12} y={p.y + 19} className="t" style={{ fontWeight: isSelected ? 600 : 400 }}>
                          {title}
                        </text>
                        <text x={p.x + 12} y={p.y + 34} className="s" style={{ fill: isSelected ? "var(--trace)" : undefined }}>
                          {subtitle}
                        </text>
                      </g>
                    );
                  })
                )}
              </svg>
            </div>

            {/* 3. INTERACTIVE NODE INSPECTOR CARD */}
            <div
              className="arch-node-inspector"
              style={{
                borderTop: "1px solid var(--rule)",
                padding: "14px 18px",
                background: "var(--bay-2)",
                display: "grid",
                gap: "6px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--trace)", display: "inline-block" }} />
                  <strong style={{ fontSize: "14px", color: "var(--text)" }}>{activeDetail.title}</strong>
                  <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>[{activeDetail.category}]</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--f-mono)",
                    color: "var(--amber)",
                    background: "rgba(201, 164, 92, 0.12)",
                    padding: "3px 8px",
                    borderRadius: "3px",
                  }}
                >
                  Tech: {activeDetail.tech}
                </span>
              </div>
              <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--text)" }}>FLML Rationale:</strong> {activeDetail.flmlRationale}
              </p>
              <div style={{ fontSize: "11.5px", color: "var(--dim)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <span style={{ color: "var(--ok)" }}>🛡️ Failure Mode &amp; High-Availability:</span>
                <span>{activeDetail.resilience}</span>
              </div>
            </div>

            <div className="log" id="archLog" aria-live="polite">
              {model.log.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
