"use client";

import { useEffect, useRef, useState } from "react";

interface FeedItem {
  time: string;
  text: string;
  color?: string;
  badge?: string;
}

interface PodInfo {
  id: number;
  name: string;
  cpu: number;
  memory: number;
  restarts: number;
  zone: string;
  status: "running" | "terminating" | "spawning" | "killed";
  rpsShare: number;
}

const TRAFFIC_ARCHETYPES = [
  {
    id: "steady",
    label: "Steady State Production",
    desc: "Baseline 850 req/s with balanced cache hits",
    targetRps: 850,
    spikeMultiplier: 1,
  },
  {
    id: "black_friday",
    label: "Black Friday Flash Sale",
    desc: "6x surge on checkout & payments (5,200 req/s)",
    targetRps: 5200,
    spikeMultiplier: 6,
  },
  {
    id: "ddos",
    label: "L7 DDoS Attack Wave",
    desc: "WAF edge scrubbing & rate limit shield",
    targetRps: 8400,
    spikeMultiplier: 9.5,
  },
  {
    id: "viral_push",
    label: "Viral Notification Push",
    desc: "Instant 3.8x traffic burst across mobile apps",
    targetRps: 3400,
    spikeMultiplier: 4,
  },
];

const REGIONS = [
  { code: "ME-South", city: "Doha / UAE", latency: "14ms", status: "Optimal" },
  { code: "EU-Central", city: "Frankfurt", latency: "38ms", status: "Optimal" },
  { code: "US-East", city: "N. Virginia", latency: "22ms", status: "Optimal" },
  { code: "AP-South", city: "Mumbai", latency: "31ms", status: "Optimal" },
];

export default function RealtimeScaleInstrument() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeArchetype, setActiveArchetype] = useState<string>("steady");
  const [rps, setRps] = useState(850);
  const [rpsDesc, setRpsDesc] = useState("steady");
  const [lat, setLat] = useState(58);
  const [latDesc, setLatDesc] = useState("under target");
  const [latColor, setLatColor] = useState("var(--ok)");
  const [podsCount, setPodsCount] = useState(3);
  const [maxPods, setMaxPods] = useState(16);
  const [targetLatencySla, setTargetLatencySla] = useState(120);
  const [scalePolicy, setScalePolicy] = useState<"aggressive" | "balanced">("balanced");
  const [selectedPodId, setSelectedPodId] = useState<number>(1);
  const [errRate, setErrRate] = useState("0.0%");
  const [feed, setFeed] = useState<FeedItem[]>([]);

  // Internal mutable animation loop reference
  const stateRef = useRef<{
    N: number;
    rpsArr: number[];
    latArr: number[];
    pods: number;
    load: number;
    targetLoad: number;
    spikeTicks: number;
    maxPods: number;
    targetSla: number;
    policy: "aggressive" | "balanced";
    killedPodId: number | null;
  }>({
    N: 60,
    rpsArr: Array.from({ length: 60 }, () => 820 + Math.random() * 80),
    latArr: Array.from({ length: 60 }, () => 55 + Math.random() * 10),
    pods: 3,
    load: 850,
    targetLoad: 850,
    spikeTicks: 0,
    maxPods: 16,
    targetSla: 120,
    policy: "balanced",
    killedPodId: null,
  });

  const EV = [
    { text: "POST /v1/bookings 201 (Created)", badge: "201 OK" },
    { text: "GET /v1/slots 200 (12ms cached)", badge: "CACHE HIT" },
    { text: "POST /v1/payments 202 (UPI Captured)", badge: "PAYMENT" },
    { text: "WS /realtime channel.presence_sync", badge: "WEBSOCKET" },
    { text: "POST /v1/ai/stream_reasoning 200", badge: "AI STREAM" },
    { text: "POST /v1/auth/verify_passkey 200", badge: "AUTH" },
    { text: "GET /v1/catalog 200 (Edge CDN hit)", badge: "CDN" },
    { text: "GET /healthz 200 (Kubelet probe)", badge: "HEALTH" },
  ];

  const pushFeed = (text: string, color?: string, badge?: string) => {
    const time = new Date().toTimeString().slice(0, 8);
    setFeed((prev) => [{ time, text, color, badge }, ...prev.slice(0, 14)]);
  };

  const drawChart = () => {
    const ch = canvasRef.current;
    if (!ch) return;
    const rect = ch.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ch.width = rect.width * dpr;
    ch.height = rect.height * dpr;
    const ctx = ch.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const pl = 50;
    const pr = 50;
    const pt = 18;
    const pb = 28;
    const mR = 10000;
    const mL = 400;
    const N = stateRef.current.N;

    ctx.font = '10px "JetBrains Mono",monospace';
    ctx.textBaseline = "middle";

    // Horizontal grid lines & scale labels
    for (let i = 0; i <= 4; i++) {
      const y = pt + ((h - pt - pb) * i) / 4;
      ctx.strokeStyle = "rgba(30, 41, 59, 0.7)";
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - pr, y);
      ctx.stroke();

      ctx.fillStyle = "#64748B";
      ctx.textAlign = "right";
      ctx.fillText(String(Math.round(mR * (1 - i / 4))), pl - 6, y);
      ctx.textAlign = "left";
      ctx.fillText(String(Math.round(mL * (1 - i / 4))), w - pr + 6, y);
    }

    // Dynamic SLA target dashed guide
    const currentSla = stateRef.current.targetSla;
    const yT = pt + (h - pt - pb) * (1 - currentSla / mL);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(34, 197, 94, 0.7)";
    ctx.beginPath();
    ctx.moveTo(pl, yT);
    ctx.lineTo(w - pr, yT);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(34, 197, 94, 0.9)";
    ctx.fillText(`SLA Target: ${currentSla} ms`, pl + 8, yT - 8);

    // Plot helper
    const plot = (a: number[], mx: number, col: string, fill?: string) => {
      ctx.beginPath();
      a.forEach((v, i) => {
        const x = pl + ((w - pl - pr) * i) / (N - 1);
        const y = pt + (h - pt - pb) * (1 - Math.min(v, mx) / mx);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      if (fill) {
        ctx.lineTo(w - pr, h - pb);
        ctx.lineTo(pl, h - pb);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(
        w - pr,
        pt + (h - pt - pb) * (1 - Math.min(a[N - 1], mx) / mx),
        3.5,
        0,
        7
      );
      ctx.fill();
    };

    plot(stateRef.current.rpsArr, mR, "#3B82F6", "rgba(59, 130, 246, 0.12)");
    plot(stateRef.current.latArr, mL, "#F59E0B");

    ctx.fillStyle = "#64748B";
    ctx.textAlign = "left";
    ctx.fillText("−60s history", pl, h - 8);
    ctx.textAlign = "right";
    ctx.fillText("now", w - pr, h - 8);
  };

  const handleApplyArchetype = (arch: typeof TRAFFIC_ARCHETYPES[0]) => {
    setActiveArchetype(arch.id);
    stateRef.current.targetLoad = arch.targetRps;
    stateRef.current.spikeTicks = arch.spikeMultiplier > 1 ? 30 : 0;
    pushFeed(`Scenario activated: ${arch.label}`, "var(--trace)", "SIMULATION");
  };

  const handleTriggerSpike = () => {
    stateRef.current.spikeTicks = 32;
    stateRef.current.targetLoad = 6200;
    pushFeed("CRITICAL: Sudden 6x traffic surge detected across gateways", "#EF4444", "INGRESS ALERT");
  };

  const handleKillPod = (podId: number) => {
    stateRef.current.killedPodId = podId;
    pushFeed(`CHAOS SIMULATION: Pod #${podId} killed (SIGKILL)`, "#EF4444", "KUBELET");

    setTimeout(() => {
      stateRef.current.killedPodId = null;
      pushFeed(`RECOVERY: Replacement pod for #${podId} spawned and ready in 1.4s`, "var(--ok)", "HPA");
    }, 1800);
  };

  useEffect(() => {
    stateRef.current.maxPods = maxPods;
    stateRef.current.targetSla = targetLatencySla;
    stateRef.current.policy = scalePolicy;
  }, [maxPods, targetLatencySla, scalePolicy]);

  useEffect(() => {
    const tick = () => {
      const s = stateRef.current;
      const target = s.spikeTicks > 0 ? s.targetLoad : 850;
      s.load += (target - s.load) * 0.16 + (Math.random() - 0.5) * 80;

      if (s.spikeTicks > 0) s.spikeTicks--;

      // Effective pod capacity
      const effectivePods = Math.max(1, s.pods - (s.killedPodId !== null ? 1 : 0));
      const util = s.load / (effectivePods * 520);
      const l = 42 + Math.max(0, util - 0.6) * 220 + Math.random() * 8;

      // Autoscaling decision logic
      const scaleUpThreshold = s.policy === "aggressive" ? 0.72 : 0.85;
      const scaleDownThreshold = s.policy === "aggressive" ? 0.38 : 0.28;

      if (util > scaleUpThreshold && s.pods < s.maxPods) {
        s.pods += s.policy === "aggressive" && util > 1.2 ? 2 : 1;
        s.pods = Math.min(s.pods, s.maxPods);
        pushFeed(`Autoscaler HPA: Scale Up → ${s.pods} pods (Capacity: ${(util * 100) | 0}%)`, "var(--trace)", "AUTOSCALE");
      } else if (util < scaleDownThreshold && s.pods > 3 && Math.random() < 0.25) {
        s.pods--;
        pushFeed(`Autoscaler HPA: Scale Down → ${s.pods} pods`, "var(--muted)", "AUTOSCALE");
      }

      s.rpsArr.push(s.load);
      s.rpsArr.shift();
      s.latArr.push(l);
      s.latArr.shift();

      setRps(Math.round(s.load));
      setRpsDesc(s.spikeTicks > 0 ? "surge active" : "steady");
      setLat(Math.round(l));
      setLatDesc(l > s.targetSla ? `over SLA (${s.targetSla}ms)` : `within SLA (${s.targetSla}ms)`);
      setLatColor(l > s.targetSla ? "#EF4444" : "var(--ok)");
      setPodsCount(s.pods);
      setErrRate((util > 1.15 ? Math.min(2.8, (util - 1.15) * 7) : 0).toFixed(2) + "%");

      if (Math.random() < 0.65) {
        const item = EV[(Math.random() * EV.length) | 0];
        pushFeed(item.text, undefined, item.badge);
      }

      drawChart();
    };

    tick();
    const interval = setInterval(tick, 700);
    const handleResize = () => drawChart();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activePodDetail: PodInfo = {
    id: selectedPodId,
    name: `flml-api-gateway-pod-${selectedPodId}f8`,
    cpu: Math.min(98, Math.round((rps / (podsCount * 520)) * 85 + (selectedPodId * 3) % 12)),
    memory: Math.round(310 + (selectedPodId * 22) % 120),
    restarts: selectedPodId === stateRef.current.killedPodId ? 1 : 0,
    zone: selectedPodId % 2 === 0 ? "me-central-1a" : "me-central-1b",
    status: selectedPodId === stateRef.current.killedPodId ? "killed" : selectedPodId <= podsCount ? "running" : "terminating",
    rpsShare: Math.round(rps / Math.max(1, podsCount)),
  };

  return (
    <section className="g" id="scale-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Realtime &amp; cloud infrastructure
            </p>
            <h2>
              Hit it with a traffic spike. Watch the cluster <em>scale</em>.
            </h2>
          </div>
          <p className="lede">
            A live Kubernetes telemetry console with horizontal pod autoscaling (HPA). Simulate flash sales or DDoS spikes, test kill-recovery chaos engineering, and observe p95 latency stay under budget.
          </p>
        </div>

        {/* 1. SCENARIO ARCHETYPES BAR */}
        <div style={{ marginBottom: "16px" }}>
          <div className="lbl" style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>Traffic Scenario Archetypes</span>
            <span style={{ color: "var(--trace)", fontSize: "11px" }}>Simulate multi-tier traffic events</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "8px" }}>
            {TRAFFIC_ARCHETYPES.map((arch) => {
              const isSelected = activeArchetype === arch.id;
              return (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => handleApplyArchetype(arch)}
                  className={`chip ${isSelected ? "active" : ""}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    background: isSelected ? "var(--bay-2)" : "var(--bay)",
                    border: isSelected ? "1px solid var(--trace)" : "1px solid var(--rule)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div>
                    <strong style={{ display: "block", fontSize: "12.5px", color: isSelected ? "var(--trace)" : "var(--text)" }}>
                      {arch.label}
                    </strong>
                    <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                      {arch.desc}
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: isSelected ? "var(--trace)" : "var(--muted)" }}>
                    {isSelected ? "● Live" : "→"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="rt" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "16px" }}>
          <div className="bay kpi">
            <span>Throughput (Requests / s)</span>
            <b style={{ color: "var(--trace)", fontSize: "28px" }}>{rps.toLocaleString("en-IN")}</b>
            <small style={{ color: "var(--muted)" }}>{rpsDesc}</small>
          </div>

          <div className="bay kpi">
            <span>p95 API Latency</span>
            <b style={{ color: latColor, fontSize: "28px" }}>{lat} ms</b>
            <small style={{ color: latColor }}>{latDesc}</small>
          </div>

          <div className="bay kpi">
            <span>Active Pod Instances</span>
            <b style={{ color: "var(--text)", fontSize: "28px" }}>{podsCount} / {maxPods}</b>
            <small style={{ color: "var(--ok)" }}>HPA Autoscaling Active</small>
          </div>

          <div className="bay kpi">
            <span>Edge Error Rate</span>
            <b style={{ color: errRate === "0.00%" ? "var(--ok)" : "#EF4444", fontSize: "28px" }}>{errRate}</b>
            <small style={{ color: "var(--muted)" }}>Last 60s sample window</small>
          </div>
        </div>

        <div className="rt-main" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: "16px", alignItems: "stretch" }}>
          {/* Left Bay: Chart & Pod Fleet Container */}
          <div className="bay" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="bay-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: 700 }}>Throughput &amp; p95 Latency</span>
                <span style={{ fontSize: "11px", fontFamily: "var(--f-mono)" }}>
                  <span style={{ color: "#3B82F6" }}>━ req/s</span> &nbsp;
                  <span style={{ color: "#F59E0B" }}>━ p95 ms</span>
                </span>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  id="spike"
                  type="button"
                  className="btn"
                  onClick={handleTriggerSpike}
                  style={{
                    fontSize: "11px",
                    padding: "4px 10px",
                    background: "rgba(239, 68, 68, 0.12)",
                    color: "#EF4444",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  ⚡ Simulate 6x Spike
                </button>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              id="chart"
              role="img"
              aria-label="Live chart of requests per second and p95 latency"
              style={{ display: "block", width: "100%", height: "230px" }}
            />

            {/* 2. KUBERNETES POD FLEET GRID & CHIP SELECTOR */}
            <div style={{ padding: "12px 14px", borderTop: "1px solid var(--rule)", background: "var(--bay-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Kubernetes Pod Fleet (Click pod to inspect or kill)
                </span>
                <span style={{ fontSize: "10.5px", color: "var(--trace)", fontFamily: "var(--f-mono)" }}>
                  {podsCount} of {maxPods} pods active
                </span>
              </div>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {Array.from({ length: maxPods }, (_, i) => {
                  const podNum = i + 1;
                  const isAlive = podNum <= podsCount;
                  const isKilled = podNum === stateRef.current.killedPodId;
                  const isHot = isAlive && rps / podsCount > 1000;
                  const isSelected = selectedPodId === podNum;

                  return (
                    <button
                      key={podNum}
                      type="button"
                      onClick={() => setSelectedPodId(podNum)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        border: isSelected
                          ? "2px solid var(--trace)"
                          : isKilled
                          ? "1px solid #EF4444"
                          : isAlive
                          ? isHot
                            ? "1px solid var(--amber)"
                            : "1px solid var(--rule)"
                          : "1px dashed rgba(255, 255, 255, 0.1)",
                        background: isKilled
                          ? "rgba(239, 68, 68, 0.25)"
                          : isAlive
                          ? isHot
                            ? "rgba(245, 158, 11, 0.25)"
                            : "rgba(59, 130, 246, 0.18)"
                          : "var(--ink)",
                        color: isKilled ? "#EF4444" : isAlive ? "var(--text)" : "var(--dim)",
                        fontFamily: "var(--f-mono)",
                        fontSize: "10px",
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isKilled ? "✕" : `p${podNum}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pod Telemetry Inspector Card - fills remainder of left card */}
            <div
              style={{
                flex: 1,
                padding: "14px 16px",
                borderTop: "1px solid var(--rule)",
                background: "var(--ink)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
                fontSize: "11px",
                fontFamily: "var(--f-mono)",
              }}
            >
              {/* Row 1: Core Specs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>CONTAINER POD:</span>
                  <strong style={{ color: "var(--text)" }}>#{activePodDetail.id}</strong> ({activePodDetail.zone})
                </div>
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>CPU UTILIZATION:</span>
                  <strong style={{ color: activePodDetail.cpu > 80 ? "var(--amber)" : "var(--ok)" }}>
                    {activePodDetail.cpu}% (1000m)
                  </strong>
                </div>
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>MEMORY RSS:</span>
                  <span style={{ color: "var(--text)" }}>{activePodDetail.memory} MB / 512 MB</span>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => handleKillPod(selectedPodId)}
                    disabled={selectedPodId > podsCount || selectedPodId === stateRef.current.killedPodId}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "4px",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      background: "rgba(239, 68, 68, 0.15)",
                      color: "#EF4444",
                      fontSize: "10.5px",
                      fontWeight: 600,
                      cursor: selectedPodId <= podsCount ? "pointer" : "not-allowed",
                    }}
                  >
                    ⚠ Kill Pod #{selectedPodId}
                  </button>
                </div>
              </div>

              {/* Row 2: Deep Diagnostics & Telemetry Bars */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "10px",
                  paddingTop: "10px",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.08)",
                  color: "var(--muted)",
                  fontSize: "10.5px",
                }}
              >
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>TRAFFIC SHARE:</span>
                  <span style={{ color: "var(--trace)", fontWeight: 600 }}>~{activePodDetail.rpsShare} req/s</span>
                </div>
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>HEALTH CHECKS:</span>
                  <span style={{ color: "var(--ok)" }}>✓ Liveness / Readiness (200 OK)</span>
                </div>
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>RESTARTS / CRASHES:</span>
                  <span style={{ color: activePodDetail.restarts > 0 ? "var(--amber)" : "var(--text)" }}>
                    {activePodDetail.restarts} Restarts (CrashLoop: None)
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--dim)", display: "block" }}>INGRESS TLS:</span>
                  <span style={{ color: "var(--trace)" }}>mTLS Envoy Proxy Sidecar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bay: Multi-Region Telemetry & Event Stream */}
          <div className="bay" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* 3. MULTI-REGION LATENCY POP BREAKDOWN */}
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--rule)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Global Anycast Edge Latencies
                </span>
                <span style={{ fontSize: "10px", color: "var(--ok)", fontFamily: "var(--f-mono)" }}>
                  ● 100% HEALTHY
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {REGIONS.map((reg) => (
                  <div
                    key={reg.code}
                    style={{
                      background: "var(--bay-2)",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      border: "1px solid var(--rule)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "10.5px",
                    }}
                  >
                    <div>
                      <strong style={{ display: "block", color: "var(--text)" }}>{reg.code}</strong>
                      <span style={{ fontSize: "9.5px", color: "var(--dim)" }}>{reg.city}</span>
                    </div>
                    <span style={{ color: "var(--trace)", fontFamily: "var(--f-mono)", fontWeight: 600 }}>
                      {reg.latency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. HPA AUTOSCALER TUNING CONTROLS */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--rule)",
                background: "var(--ink)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                fontSize: "11px",
              }}
            >
              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", display: "block", marginBottom: "2px" }}>
                  Scale Sensitivity Policy:
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    type="button"
                    onClick={() => setScalePolicy("balanced")}
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      fontSize: "10px",
                      borderRadius: "3px",
                      border: scalePolicy === "balanced" ? "1px solid var(--trace)" : "1px solid var(--rule)",
                      background: scalePolicy === "balanced" ? "var(--trace)" : "var(--bay-2)",
                      color: scalePolicy === "balanced" ? "#080C17" : "var(--muted)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Balanced (30s)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScalePolicy("aggressive")}
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      fontSize: "10px",
                      borderRadius: "3px",
                      border: scalePolicy === "aggressive" ? "1px solid var(--trace)" : "1px solid var(--rule)",
                      background: scalePolicy === "aggressive" ? "var(--trace)" : "var(--bay-2)",
                      color: scalePolicy === "aggressive" ? "#080C17" : "var(--muted)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Aggressive (5s)
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", display: "block", marginBottom: "2px" }}>
                  Target Latency SLA: <strong style={{ color: "var(--trace)" }}>{targetLatencySla} ms</strong>
                </span>
                <input
                  type="range"
                  min="80"
                  max="200"
                  step="20"
                  value={targetLatencySla}
                  onChange={(e) => setTargetLatencySla(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--trace)" }}
                />
              </div>
            </div>

            {/* Event Stream Header */}
            <div className="bay-head" style={{ padding: "10px 14px", borderBottom: "1px solid var(--rule)" }}>
              <span>Live Ingress Stream</span>
              <span style={{ fontSize: "10.5px", color: "var(--trace)", fontFamily: "var(--f-mono)" }}>
                WebSocket telemetry
              </span>
            </div>

            {/* Event Stream Log - flex-1 fills exactly same height as left card */}
            <div className="feed" style={{ flex: 1, minHeight: "180px", maxHeight: "250px", overflowY: "auto", padding: "10px 14px", fontSize: "11px" }}>
              {feed.map((f, i) => (
                <div key={i} style={{ marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: "var(--dim)", fontFamily: "var(--f-mono)", marginRight: "6px" }}>{f.time}</span>
                    <span style={{ color: f.color || "var(--text)" }}>{f.text}</span>
                  </div>
                  {f.badge && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "var(--f-mono)",
                        padding: "1px 5px",
                        borderRadius: "3px",
                        background: "rgba(255, 255, 255, 0.08)",
                        color: "var(--dim)",
                      }}
                    >
                      {f.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="proof" style={{ marginTop: "16px" }}>
          <span>Competency on display: Kubernetes HPA autoscaling, zero-downtime chaos resilience, multi-region low latency routing.</span>
          <a href="/cloud-backend-engineering/">Explore cloud backend engineering →</a>
        </p>
      </div>
    </section>
  );
}
