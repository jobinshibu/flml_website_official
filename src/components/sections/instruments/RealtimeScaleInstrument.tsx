"use client";

import { useEffect, useRef, useState } from "react";

interface FeedItem {
  time: string;
  text: string;
  color?: string;
}

export default function RealtimeScaleInstrument() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [rps, setRps] = useState(850);
  const [rpsDesc, setRpsDesc] = useState("steady");
  const [lat, setLat] = useState(58);
  const [latDesc, setLatDesc] = useState("under 120 ms target");
  const [latColor, setLatColor] = useState("var(--ok-ink)");
  const [pods, setPods] = useState(2);
  const [errRate, setErrRate] = useState("0.0%");
  const [feed, setFeed] = useState<FeedItem[]>([]);

  const stateRef = useRef({
    N: 60,
    rpsArr: Array.from({ length: 60 }, () => 820 + Math.random() * 80),
    latArr: Array.from({ length: 60 }, () => 58 + Math.random() * 10),
    pods: 2,
    load: 850,
    spike: 0,
  });

  const EV = [
    "POST /v1/bookings 201",
    "GET /v1/slots 200",
    "POST /v1/payments 202",
    "webhook payment.captured ✓",
    "WS presence.join",
    "GET /v1/catalog 200 (cache hit)",
    "POST /v1/orders 201",
    "POST /v1/ai/complete 200",
    "POST /v1/auth/otp 200",
    "GET /v1/reports/daily 200",
  ];

  const pushFeed = (text: string, color?: string) => {
    const time = new Date().toTimeString().slice(0, 8);
    setFeed((prev) => [{ time, text, color }, ...prev.slice(0, 15)]);
  };

  const drawChart = () => {
    const ch = canvasRef.current;
    if (!ch) return;
    const rect = ch.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ch.width = rect.width * dpr;
    ch.height = rect.height * dpr;
    const c = ch.getContext("2d");
    if (!c) return;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const pl = 44;
    const pr = 44;
    const pt = 16;
    const pb = 24;
    const mR = 4000;
    const mL = 400;
    const N = stateRef.current.N;

    c.font = '10px "JetBrains Mono",monospace';
    c.textBaseline = "middle";

    for (let i = 0; i <= 4; i++) {
      const y = pt + ((h - pt - pb) * i) / 4;
      c.strokeStyle = "#1A2540";
      c.beginPath();
      c.moveTo(pl, y);
      c.lineTo(w - pr, y);
      c.stroke();
      c.fillStyle = "#5D6A86";
      c.textAlign = "right";
      c.fillText(String(Math.round(mR * (1 - i / 4))), pl - 6, y);
      c.textAlign = "left";
      c.fillText(String(Math.round(mL * (1 - i / 4))), w - pr + 6, y);
    }

    const yT = pt + (h - pt - pb) * (1 - 120 / mL);
    c.setLineDash([4, 4]);
    c.strokeStyle = "rgba(61,220,151,.5)";
    c.beginPath();
    c.moveTo(pl, yT);
    c.lineTo(w - pr, yT);
    c.stroke();
    c.setLineDash([]);
    c.fillStyle = "rgba(61,220,151,.85)";
    c.fillText("target 120 ms", pl + 6, yT - 8);

    const plot = (a: number[], mx: number, col: string, fill?: string) => {
      c.beginPath();
      a.forEach((v, i) => {
        const x = pl + ((w - pl - pr) * i) / (N - 1);
        const y = pt + (h - pt - pb) * (1 - Math.min(v, mx) / mx);
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      });
      c.strokeStyle = col;
      c.lineWidth = 1.8;
      c.stroke();
      if (fill) {
        c.lineTo(w - pr, h - pb);
        c.lineTo(pl, h - pb);
        c.closePath();
        c.fillStyle = fill;
        c.fill();
      }
      c.fillStyle = col;
      c.beginPath();
      c.arc(
        w - pr,
        pt + (h - pt - pb) * (1 - Math.min(a[N - 1], mx) / mx),
        3.5,
        0,
        7
      );
      c.fill();
    };

    plot(stateRef.current.rpsArr, mR, "#5B93FF", "rgba(91,147,255,.10)");
    plot(stateRef.current.latArr, mL, "#FFB02E");
    c.fillStyle = "#5D6A86";
    c.textAlign = "left";
    c.fillText("−60 s", pl, h - 8);
    c.textAlign = "right";
    c.fillText("now", w - pr, h - 8);
  };

  const handleSpike = () => {
    stateRef.current.spike = 26;
    pushFeed("traffic spike: 4× normal load", "var(--bad-ink)");
  };

  useEffect(() => {
    const tick = () => {
      const s = stateRef.current;
      s.load +=
        ((s.spike > 0 ? 3300 : 850) - s.load) * 0.18 + (Math.random() - 0.5) * 60;
      if (s.spike > 0) s.spike--;
      const util = s.load / (s.pods * 520);
      const l = 48 + Math.max(0, util - 0.6) * 260 + Math.random() * 8;

      if (util > 0.82 && s.pods < 12) {
        s.pods++;
        pushFeed(`autoscaler: +1 instance → ${s.pods} (utilisation ${(util * 100) | 0}%)`, "var(--signal)");
      } else if (util < 0.35 && s.pods > 2 && Math.random() < 0.3) {
        s.pods--;
        pushFeed(`autoscaler: −1 instance → ${s.pods}`, "var(--brand-ink)");
      }

      s.rpsArr.push(s.load);
      s.rpsArr.shift();
      s.latArr.push(l);
      s.latArr.shift();

      setRps(Math.round(s.load));
      setRpsDesc(s.spike > 0 ? "spike in progress" : "steady");
      setLat(Math.round(l));
      setLatDesc(l > 120 ? "over target · scaling" : "under 120 ms target");
      setLatColor(l > 120 ? "var(--bad-ink)" : "var(--ok-ink)");
      setPods(s.pods);
      setErrRate((util > 1.05 ? Math.min(3, (util - 1) * 8) : 0).toFixed(1) + "%");

      if (Math.random() < 0.7) {
        pushFeed(EV[(Math.random() * EV.length) | 0]);
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

  return (
    <section className="g" id="scale-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Realtime &amp; scale
            </p>
            <h2>
              Hit it with a traffic spike. It <em>scales</em>.
            </h2>
          </div>
          <p className="lede">
            A live operations console streaming simulated events. Press the spike button: load jumps, latency climbs, the autoscaler adds instances and brings latency back under target.
          </p>
        </div>

        <div className="rt">
          <div className="bay kpi">
            <span>requests / s</span>
            <b>{rps.toLocaleString("en-IN")}</b>
            <small style={{ color: "var(--muted)" }}>{rpsDesc}</small>
          </div>

          <div className="bay kpi">
            <span>p95 latency</span>
            <b>{lat} ms</b>
            <small style={{ color: latColor }}>{latDesc}</small>
          </div>

          <div className="bay kpi">
            <span>instances</span>
            <b>{pods}</b>
            <small style={{ color: "var(--muted)" }}>autoscaling 2–12</small>
          </div>

          <div className="bay kpi">
            <span>error rate</span>
            <b>{errRate}</b>
            <small style={{ color: "var(--muted)" }}>last 30 s</small>
          </div>

          <div className="rt-main">
            {/* Chart bay */}
            <div className="bay">
              <div className="bay-head">
                <span>throughput &amp; latency · last 60 s</span>
                <span>
                  <span style={{ color: "var(--trace)" }}>━ req/s</span> &nbsp;
                  <span style={{ color: "var(--amber)" }}>━ p95 ms</span>
                </span>
              </div>

              <canvas
                ref={canvasRef}
                id="chart"
                role="img"
                aria-label="Live chart of requests per second and p95 latency"
              />

              <div className="pods" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => {
                  const isOn = i < pods;
                  const isHot = isOn && rps / pods > 1100;
                  return (
                    <div
                      key={i}
                      className={`pod ${isOn ? (isHot ? "on hot" : "on") : ""}`}
                    >
                      {isOn ? "p" + (i + 1) : ""}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event feed bay */}
            <div className="bay">
              <div className="bay-head">
                <span>event stream</span>
                <button
                  className="btn primary"
                  onClick={handleSpike}
                  style={{ minHeight: "32px", padding: "0 12px", fontSize: "12px" }}
                >
                  Simulate spike
                </button>
              </div>

              <div className="feed">
                {feed.map((f, i) => (
                  <div key={i}>
                    <span style={{ color: "var(--ink-dim)" }}>{f.time}</span>{" "}
                    <span style={{ color: f.color || "var(--ink-muted)" }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

