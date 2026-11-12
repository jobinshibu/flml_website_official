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

export default function PlannerInstrument() {
  const [userIndex, setUserIndex] = useState(1);
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
    setFeat((prev) => ({ ...prev, [k]: !prev[k] }));
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
    return {
      cols: [
        ["CLIENTS", C],
        ["EDGE", E],
        ["SERVICES", S],
        ["DATA", D],
      ] as const,
      log,
      tier,
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
            This is how our engagements start. Set your scale and features; the architecture, data flows and decision log update the way our architects reason through them.
          </p>
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
                onChange={(e) => setUserIndex(Number(e.target.value))}
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
          </div>

          {/* Diagram bay */}
          <div className="bay">
            <div className="bay-head">
              <span>system diagram · auto-generated</span>
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
                    return (
                      <g key={id} className="node">
                        <rect x={p.x} y={p.y} width={w} height={h} rx="4" />
                        <text x={p.x + 12} y={p.y + 19} className="t">
                          {title}
                        </text>
                        <text x={p.x + 12} y={p.y + 34} className="s">
                          {subtitle}
                        </text>
                      </g>
                    );
                  })
                )}
              </svg>
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

