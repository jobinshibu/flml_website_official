"use client";

import { useEffect, useRef, useState } from "react";

interface Bar {
  o: number;
  h: number;
  l: number;
  c: number;
}

interface Trade {
  k: number;
  side: "b" | "s";
  p: number;
}

interface LogItem {
  time: string;
  text: string;
  cls: string;
}

export default function TradingBotInstrument() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [strategy, setStrategy] = useState<"ma" | "mr" | "mo">("ma");
  const [isRunning, setIsRunning] = useState(true);
  const [equity, setEquity] = useState(10000);
  const [pnl, setPnl] = useState("0.00%");
  const [numTrades, setNumTrades] = useState(0);
  const [position, setPosition] = useState<"flat" | "long">("flat");
  const [logs, setLogs] = useState<LogItem[]>([]);

  // Internal mutable state for high frequency animation loop
  const stateRef = useRef<{
    bars: Bar[];
    trades: Trade[];
    cash: number;
    qty: number;
    nt: number;
    last: number;
    strategy: "ma" | "mr" | "mo";
    running: boolean;
  }>({
    bars: [],
    trades: [],
    cash: 10000,
    qty: 0,
    nt: 0,
    last: 100,
    strategy: "ma",
    running: true,
  });

  const nextBar = () => {
    const s = stateRef.current;
    const o = s.last;
    const c = Math.max(5, o + (Math.random() - 0.5) * 1.8 + Math.sin(s.bars.length / 18) * 0.12);
    const hi = Math.max(o, c) + Math.random() * 0.6;
    const lo = Math.min(o, c) - Math.random() * 0.6;
    s.last = c;
    return { o, h: hi, l: lo, c };
  };

  const sma = (n: number, k: number) => {
    const bars = stateRef.current.bars;
    const a = bars.slice(Math.max(0, k - n + 1), k + 1).map((b) => b.c);
    return a.reduce((x, y) => x + y, 0) / a.length;
  };

  const addLog = (text: string, cls = "") => {
    const time = new Date().toTimeString().slice(0, 8);
    setLogs((prev) => [{ time, text, cls }, ...prev.slice(0, 11)]);
  };

  const resetBot = () => {
    const s = stateRef.current;
    s.bars = [];
    s.trades = [];
    s.cash = 10000;
    s.qty = 0;
    s.nt = 0;
    s.last = 100;
    for (let i = 0; i < 60; i++) {
      s.bars.push(nextBar());
    }
    setEquity(10000);
    setPnl("0.00%");
    setNumTrades(0);
    setPosition("flat");
    setLogs([]);

    const stratName =
      s.strategy === "ma"
        ? "Moving-average crossover (9/21)"
        : s.strategy === "mr"
        ? "Mean reversion (±1.5σ)"
        : "Momentum breakout (20)";
    addLog(`bot started · capital 10,000 USDT · ${stratName}`);
  };

  const decide = () => {
    const s = stateRef.current;
    const k = s.bars.length - 1;
    const p = s.bars[k].c;
    const strat = s.strategy;
    let g = 0;

    if (strat === "ma") {
      const f = sma(9, k);
      const sl = sma(21, k);
      const pf = sma(9, k - 1);
      const ps = sma(21, k - 1);
      if (pf <= ps && f > sl) g = 1;
      if (pf >= ps && f < sl) g = -1;
    } else if (strat === "mr") {
      const a = s.bars.slice(-20).map((b) => b.c);
      const m = a.reduce((x, y) => x + y, 0) / a.length;
      const sd = Math.sqrt(a.reduce((x, y) => x + Math.pow(y - m, 2), 0) / a.length);
      if (p < m - 1.5 * sd) g = 1;
      if (p > m + 0.3 * sd && s.qty) g = -1;
    } else if (strat === "mo") {
      const a = s.bars.slice(-21, -1);
      const hi = Math.max(...a.map((b) => b.h));
      const lo = Math.min(...a.map((b) => b.l));
      if (p > hi) g = 1;
      if (p < lo || (s.qty && p < sma(10, k))) g = -1;
    }

    if (g === 1 && !s.qty) {
      s.qty = s.cash / p;
      s.cash = 0;
      s.nt++;
      s.trades.push({ k, side: "b", p });
      addLog(`BUY  ${s.qty.toFixed(2)} @ ${p.toFixed(2)}`, "b");
    } else if (g === -1 && s.qty) {
      s.cash = s.qty * p;
      s.nt++;
      s.trades.push({ k, side: "s", p });
      addLog(`SELL ${s.qty.toFixed(2)} @ ${p.toFixed(2)} → ${s.cash.toFixed(0)} USDT`, "s");
      s.qty = 0;
    }

    const eq = s.cash + s.qty * p;
    const plVal = (eq / 10000 - 1) * 100;
    setEquity(Math.round(eq));
    setPnl((plVal >= 0 ? "+" : "") + plVal.toFixed(2) + "%");
    setNumTrades(s.nt);
    setPosition(s.qty ? "long" : "flat");
  };

  const draw = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = rect.width * dpr;
    cv.height = rect.height * dpr;
    const c = cv.getContext("2d");
    if (!c) return;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const pr = 48;
    const pt = 14;
    const pb = 14;
    const bars = stateRef.current.bars;
    const v = bars.slice(-70);
    const off = bars.length - v.length;
    const hi = Math.max(...v.map((b) => b.h));
    const lo = Math.min(...v.map((b) => b.l));
    const Y = (x: number) => pt + (h - pt - pb) * (1 - (x - lo) / (hi - lo || 1));
    const cw = (w - pr) / v.length;

    c.font = '10px "JetBrains Mono",monospace';
    c.textBaseline = "middle";
    c.textAlign = "left";

    // Grid lines & labels
    for (let i = 0; i <= 4; i++) {
      const x = lo + ((hi - lo) * i) / 4;
      const y = Y(x);
      c.strokeStyle = "#1A2540";
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(w - pr, y);
      c.stroke();
      c.fillStyle = "#5D6A86";
      c.fillText(x.toFixed(1), w - pr + 6, y);
    }

    // Moving average curves
    if (stateRef.current.strategy === "ma") {
      [
        [9, "rgba(91,147,255,.9)"],
        [21, "rgba(255,176,46,.8)"],
      ].forEach(([n, col]) => {
        c.beginPath();
        v.forEach((b, i) => {
          const y = Y(sma(Number(n), off + i));
          i ? c.lineTo(i * cw + cw / 2, y) : c.moveTo(i * cw + cw / 2, y);
        });
        c.strokeStyle = String(col);
        c.lineWidth = 1.3;
        c.stroke();
      });
    }

    // Candlesticks
    v.forEach((b, i) => {
      const x = i * cw + cw / 2;
      const up = b.c >= b.o;
      c.strokeStyle = c.fillStyle = up ? "#3DDC97" : "#FF6B6B";
      c.beginPath();
      c.moveTo(x, Y(b.h));
      c.lineTo(x, Y(b.l));
      c.stroke();
      const y1 = Y(Math.max(b.o, b.c));
      const y2 = Y(Math.min(b.o, b.c));
      c.fillRect(x - cw * 0.32, y1, cw * 0.64, Math.max(1, y2 - y1));
    });

    // Trade markers
    stateRef.current.trades
      .filter((t) => t.k >= off)
      .forEach((t) => {
        const x = (t.k - off) * cw + cw / 2;
        const y = Y(t.p);
        c.fillStyle = t.side === "b" ? "#3DDC97" : "#FF6B6B";
        c.beginPath();
        if (t.side === "b") {
          c.moveTo(x, y + 8);
          c.lineTo(x - 6, y + 18);
          c.lineTo(x + 6, y + 18);
        } else {
          c.moveTo(x, y - 8);
          c.lineTo(x - 6, y - 18);
          c.lineTo(x + 6, y - 18);
        }
        c.fill();
      });

    // Latest price badge
    const lp = bars[bars.length - 1]?.c || 100;
    const ly = Y(lp);
    c.fillStyle = "#FFB02E";
    c.fillRect(w - pr + 2, ly - 8, pr - 2, 16);
    c.fillStyle = "#1A1204";
    c.fillText(lp.toFixed(2), w - pr + 6, ly);
  };

  useEffect(() => {
    stateRef.current.strategy = strategy;
    draw();
  }, [strategy]);

  useEffect(() => {
    stateRef.current.running = isRunning;
  }, [isRunning]);

  useEffect(() => {
    resetBot();
    draw();

    const interval = setInterval(() => {
      if (!stateRef.current.running) return;
      const s = stateRef.current;
      s.bars.push(nextBar());
      if (s.bars.length > 400) {
        s.bars.shift();
        s.trades.forEach((t) => t.k--);
      }
      decide();
      draw();
    }, 800);

    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="g" id="bot-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Bots &amp; automation
            </p>
            <h2>
              A trading bot, live. Change its <em>strategy</em> mid-run.
            </h2>
          </div>
          <p className="lede">
            An automated agent reading a market feed, deciding and acting with no human in the loop. Market data here is simulated; this is not financial advice.
          </p>
        </div>

        <div className="bot">
          {/* Left Bay: Chart & Controls */}
          <div className="bay">
            <div className="bay-head">
              <span>DEMO/USDT · 1m candles · simulated</span>
              <span>
                {isRunning ? (
                  <>
                    <span className="dot" /> running
                  </>
                ) : (
                  "paused"
                )}
              </span>
            </div>

            <canvas
              ref={canvasRef}
              id="candles"
              role="img"
              aria-label="Candlestick chart with the bot's buy and sell markers"
            />

            <div className="botctl">
              <label htmlFor="strat-select" className="lbl" style={{ margin: 0 }}>
                Strategy
              </label>
              <select
                id="strat-select"
                value={strategy}
                onChange={(e) => {
                  const s = e.target.value as "ma" | "mr" | "mo";
                  setStrategy(s);
                  const stratName =
                    s === "ma"
                      ? "Moving-average crossover (9/21)"
                      : s === "mr"
                      ? "Mean reversion (±1.5σ)"
                      : "Momentum breakout (20)";
                  addLog(`strategy switched → ${stratName}`);
                }}
              >
                <option value="ma">Moving-average crossover (9/21)</option>
                <option value="mr">Mean reversion (±1.5σ)</option>
                <option value="mo">Momentum breakout (20)</option>
              </select>

              <button
                className="btn"
                style={{ minHeight: "40px" }}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>

              <button
                className="btn"
                style={{ minHeight: "40px" }}
                onClick={() => {
                  resetBot();
                  draw();
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Bay: P&L and Log */}
          <div className="bay">
            <div className="pnl">
              <div>
                <span>Equity</span>
                <b>{equity.toLocaleString("en-IN")}</b>
              </div>
              <div>
                <span>P&amp;L</span>
                <b style={{ color: pnl.startsWith("+") ? "var(--ok-ink)" : "var(--bad-ink)" }}>
                  {pnl}
                </b>
              </div>
              <div>
                <span>Trades</span>
                <b>{numTrades}</b>
              </div>
              <div>
                <span>Position</span>
                <b>{position}</b>
              </div>
            </div>

            <div className="tlog">
              {logs.map((item, idx) => (
                <div key={idx}>
                  <span style={{ color: "var(--ink-dim)" }}>{item.time}</span>{" "}
                  <span className={item.cls}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

