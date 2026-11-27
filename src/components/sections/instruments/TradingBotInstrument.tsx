"use client";

import { useEffect, useRef, useState } from "react";

interface Bar {
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

interface Trade {
  k: number;
  side: "b" | "s";
  p: number;
  qty: number;
}

interface LogItem {
  time: string;
  side: "buy" | "sell" | "info" | "alert";
  text: string;
  price?: number;
}

interface AssetConfig {
  symbol: string;
  name: string;
  basePrice: number;
  volatility: number;
  tickSize: number;
  leverageMax: number;
}

const ASSETS: Record<string, AssetConfig> = {
  BTC: { symbol: "BTC/USDT", name: "Bitcoin Perpetual", basePrice: 94250, volatility: 320, tickSize: 0.5, leverageMax: 50 },
  ETH: { symbol: "ETH/USDT", name: "Ethereum Perpetual", basePrice: 3450, volatility: 18, tickSize: 0.05, leverageMax: 50 },
  SOL: { symbol: "SOL/USDT", name: "Solana High-Beta", basePrice: 198.5, volatility: 2.4, tickSize: 0.01, leverageMax: 20 },
  NVDA: { symbol: "NVDA/USD", name: "NVIDIA Equity CFD", basePrice: 142.2, volatility: 1.1, tickSize: 0.01, leverageMax: 10 },
  EUR: { symbol: "EUR/USD", name: "Euro FX Spot", basePrice: 1.054, volatility: 0.0015, tickSize: 0.0001, leverageMax: 100 },
};

type StrategyType = "ma" | "bb" | "grid" | "twap";

export default function TradingBotInstrument() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedAsset, setSelectedAsset] = useState<string>("BTC");
  const [strategy, setStrategy] = useState<StrategyType>("ma");
  const [isRunning, setIsRunning] = useState(true);
  const [leverage, setLeverage] = useState<number>(5);
  const [stopLossPct, setStopLossPct] = useState<number>(2.5);
  const [takeProfitPct, setTakeProfitPct] = useState<number>(5.0);
  const [openDropdown, setOpenDropdown] = useState<"strategy" | "leverage" | null>(null);

  const STRATEGY_OPTIONS: Array<{ key: StrategyType; label: string; desc: string }> = [
    { key: "ma", label: "MA Trend Crossover (9/21)", desc: "Dual moving-average breakout momentum" },
    { key: "bb", label: "Bollinger Mean-Reversion", desc: "Stat-arb entry at ±2.0σ extreme bands" },
    { key: "grid", label: "Market Maker Grid Spread", desc: "Automated limit ladders around price channel" },
    { key: "twap", label: "TWAP Algorithmic Slice", desc: "Time-weighted order execution slices" },
  ];

  const LEVERAGE_OPTIONS = [
    { val: 1, label: "1x (Spot Margin)", desc: "Zero liquidation risk" },
    { val: 5, label: "5x Cross Leverage", desc: "Conservative institutional" },
    { val: 10, label: "10x High-Frequency", desc: "Balanced quant margin" },
    { val: 20, label: "20x Speculative", desc: "High-beta rapid execution" },
  ];

  // Stats state
  const [equity, setEquity] = useState(25000);
  const [unrealizedPnl, setUnrealizedPnl] = useState(0);
  const [pnlPct, setPnlPct] = useState("+0.00%");
  const [numTrades, setNumTrades] = useState(0);
  const [winRate, setWinRate] = useState(68.5);
  const [sharpeRatio, setSharpeRatio] = useState(2.35);
  const [maxDrawdown, setMaxDrawdown] = useState("-2.8%");
  const [position, setPosition] = useState<{ side: "flat" | "long" | "short"; qty: number; entryPrice: number }>({
    side: "flat",
    qty: 0,
    entryPrice: 0,
  });

  const [logs, setLogs] = useState<LogItem[]>([]);
  const [orderBook, setOrderBook] = useState<{
    bids: Array<{ price: number; amount: number; total: number }>;
    asks: Array<{ price: number; amount: number; total: number }>;
    spread: number;
  }>({ bids: [], asks: [], spread: 0 });

  // Internal mutable state for smooth animation loop
  const stateRef = useRef<{
    bars: Bar[];
    trades: Trade[];
    cash: number;
    qty: number;
    entryPrice: number;
    nt: number;
    wins: number;
    last: number;
    strategy: StrategyType;
    running: boolean;
    leverage: number;
    stopLoss: number;
    takeProfit: number;
    asset: AssetConfig;
  }>({
    bars: [],
    trades: [],
    cash: 25000,
    qty: 0,
    entryPrice: 0,
    nt: 0,
    wins: 0,
    last: ASSETS.BTC.basePrice,
    strategy: "ma",
    running: true,
    leverage: 5,
    stopLoss: 2.5,
    takeProfit: 5.0,
    asset: ASSETS.BTC,
  });

  const nextBar = (shock = 0) => {
    const s = stateRef.current;
    const cfg = s.asset;
    const o = s.last;
    const delta = (Math.random() - 0.49) * cfg.volatility + Math.sin(s.bars.length / 14) * (cfg.volatility * 0.3) + shock;
    const c = Math.max(cfg.tickSize * 10, o + delta);
    const hi = Math.max(o, c) + Math.random() * (cfg.volatility * 0.45);
    const lo = Math.min(o, c) - Math.random() * (cfg.volatility * 0.45);
    const v = Math.round(50 + Math.random() * 250);
    s.last = c;
    return { o, h: hi, l: lo, c, v };
  };

  const sma = (n: number, k: number) => {
    const bars = stateRef.current.bars;
    const a = bars.slice(Math.max(0, k - n + 1), k + 1).map((b) => b.c);
    return a.reduce((x, y) => x + y, 0) / a.length;
  };

  const addLog = (text: string, side: "buy" | "sell" | "info" | "alert" = "info", price?: number) => {
    const time = new Date().toTimeString().slice(0, 8);
    setLogs((prev) => [{ time, text, side, price }, ...prev.slice(0, 9)]);
  };

  const resetBot = (assetKey = selectedAsset, strat = strategy) => {
    const s = stateRef.current;
    const cfg = ASSETS[assetKey] || ASSETS.BTC;
    s.asset = cfg;
    s.bars = [];
    s.trades = [];
    s.cash = 25000;
    s.qty = 0;
    s.entryPrice = 0;
    s.nt = 0;
    s.wins = 0;
    s.last = cfg.basePrice;
    s.strategy = strat;

    for (let i = 0; i < 70; i++) {
      s.bars.push(nextBar());
    }

    setEquity(25000);
    setUnrealizedPnl(0);
    setPnlPct("+0.00%");
    setNumTrades(0);
    setWinRate(68.5);
    setPosition({ side: "flat", qty: 0, entryPrice: 0 });
    setLogs([]);

    addLog(`System initialized · ${cfg.symbol} · ${s.strategy.toUpperCase()} algorithmic engine armed`);
  };

  // Generate synthetic Level 2 order book around current price
  const updateOrderBook = (price: number) => {
    const cfg = stateRef.current.asset;
    const step = cfg.volatility * 0.12;
    const bids = [];
    const asks = [];

    let bidTotal = 0;
    let askTotal = 0;

    for (let i = 1; i <= 5; i++) {
      const bPrice = price - i * step;
      const bAmt = Number((0.5 + Math.random() * 2.8).toFixed(2));
      bidTotal += bAmt;
      bids.push({ price: bPrice, amount: bAmt, total: bidTotal });

      const aPrice = price + i * step;
      const aAmt = Number((0.5 + Math.random() * 2.8).toFixed(2));
      askTotal += aAmt;
      asks.push({ price: aPrice, amount: aAmt, total: askTotal });
    }

    setOrderBook({
      bids,
      asks: asks.reverse(),
      spread: Number((step * 1.8).toFixed(2)),
    });
  };

  const executeDecision = () => {
    const s = stateRef.current;
    const k = s.bars.length - 1;
    const p = s.bars[k].c;
    const strat = s.strategy;
    let signal = 0;

    // Strategy 1: Dual MA Cross (Fast 9 / Slow 21)
    if (strat === "ma") {
      const f = sma(9, k);
      const sl = sma(21, k);
      const pf = sma(9, k - 1);
      const ps = sma(21, k - 1);
      if (pf <= ps && f > sl) signal = 1;
      if (pf >= ps && f < sl) signal = -1;
    }
    // Strategy 2: Bollinger Band Mean-Reversion
    else if (strat === "bb") {
      const a = s.bars.slice(-20).map((b) => b.c);
      const m = a.reduce((x, y) => x + y, 0) / a.length;
      const sd = Math.sqrt(a.reduce((x, y) => x + Math.pow(y - m, 2), 0) / a.length);
      const upper = m + 2.0 * sd;
      const lower = m - 2.0 * sd;
      if (p <= lower) signal = 1;
      if (p >= upper && s.qty > 0) signal = -1;
    }
    // Strategy 3: Grid Trading (Market-Maker ladder)
    else if (strat === "grid") {
      const lastTrade = s.trades[s.trades.length - 1];
      if (!lastTrade || Math.abs(p - lastTrade.p) > s.asset.volatility * 0.8) {
        signal = s.qty > 0 ? -1 : 1;
      }
    }
    // Strategy 4: TWAP Institutional Execution
    else if (strat === "twap") {
      if (s.bars.length % 4 === 0) signal = s.qty > 0 ? -1 : 1;
    }

    // Risk Management Checks: Stop-Loss & Take-Profit
    if (s.qty > 0) {
      const changePct = ((p - s.entryPrice) / s.entryPrice) * 100 * s.leverage;
      if (changePct <= -s.stopLoss) {
        signal = -1;
        addLog(`STOP-LOSS TRIGGERED · Closed at ${changePct.toFixed(2)}%`, "alert", p);
      } else if (changePct >= s.takeProfit) {
        signal = -1;
        addLog(`TAKE-PROFIT TARGET HIT · Gain +${changePct.toFixed(2)}%`, "alert", p);
      }
    }

    // Execute Orders
    if (signal === 1 && !s.qty) {
      const allocatedMargin = s.cash * 0.95;
      const notional = allocatedMargin * s.leverage;
      s.qty = notional / p;
      s.cash -= allocatedMargin;
      s.entryPrice = p;
      s.nt++;
      s.trades.push({ k, side: "b", p, qty: s.qty });
      addLog(`BUY LONG ${s.qty.toFixed(3)} ${s.asset.symbol} (${s.leverage}x Cross)`, "buy", p);
    } else if (signal === -1 && s.qty > 0) {
      const notional = s.qty * p;
      const initialMargin = (s.qty * s.entryPrice) / s.leverage;
      const profit = (p - s.entryPrice) * s.qty;
      s.cash += initialMargin + profit;
      s.nt++;
      if (profit > 0) s.wins++;
      s.trades.push({ k, side: "s", p, qty: s.qty });
      addLog(
        `SELL CLOSE ${s.qty.toFixed(3)} ${s.asset.symbol} · PnL ${profit >= 0 ? "+" : ""}$${Math.round(profit)}`,
        "sell",
        p
      );
      s.qty = 0;
      s.entryPrice = 0;
    }

    // Telemetry updates
    const currentUnrealized = s.qty > 0 ? (p - s.entryPrice) * s.qty : 0;
    const currentEquity = s.cash + (s.qty > 0 ? (s.qty * s.entryPrice) / s.leverage + currentUnrealized : 0);
    const totalPnlPct = ((currentEquity / 25000 - 1) * 100);

    setEquity(Math.round(currentEquity));
    setUnrealizedPnl(Math.round(currentUnrealized));
    setPnlPct((totalPnlPct >= 0 ? "+" : "") + totalPnlPct.toFixed(2) + "%");
    setNumTrades(s.nt);
    if (s.nt > 0) {
      setWinRate(Number(((s.wins / Math.max(1, s.trades.filter((t) => t.side === "s").length)) * 100).toFixed(1)));
    }
    setPosition({
      side: s.qty > 0 ? "long" : "flat",
      qty: Number(s.qty.toFixed(3)),
      entryPrice: Number(s.entryPrice.toFixed(2)),
    });

    updateOrderBook(p);
  };

  const drawChart = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = rect.width * dpr;
    cv.height = rect.height * dpr;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const pr = 62;
    const pt = 20;
    const pb = 32;
    const bars = stateRef.current.bars;
    const v = bars.slice(-65);
    const off = bars.length - v.length;
    const hi = Math.max(...v.map((b) => b.h));
    const lo = Math.min(...v.map((b) => b.l));
    const Y = (x: number) => pt + (h - pt - pb) * (1 - (x - lo) / (hi - lo || 1));
    const cw = (w - pr) / v.length;

    ctx.font = '10px "JetBrains Mono",monospace';
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    // Grid lines & labels
    for (let i = 0; i <= 4; i++) {
      const priceVal = lo + ((hi - lo) * i) / 4;
      const y = Y(priceVal);
      ctx.strokeStyle = "rgba(30, 41, 59, 0.7)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w - pr, y);
      ctx.stroke();
      ctx.fillStyle = "#64748B";
      ctx.fillText(priceVal.toLocaleString(undefined, { maximumFractionDigits: 2 }), w - pr + 6, y);
    }

    // Moving average indicators
    if (stateRef.current.strategy === "ma") {
      [
        { n: 9, col: "rgba(59, 130, 246, 0.9)" },
        { n: 21, col: "rgba(245, 158, 11, 0.9)" },
      ].forEach(({ n, col }) => {
        ctx.beginPath();
        v.forEach((_, i) => {
          const y = Y(sma(n, off + i));
          if (i === 0) ctx.moveTo(i * cw + cw / 2, y);
          else ctx.lineTo(i * cw + cw / 2, y);
        });
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // Bollinger bands indicator
    if (stateRef.current.strategy === "bb") {
      ctx.beginPath();
      v.forEach((_, i) => {
        const slice = bars.slice(Math.max(0, off + i - 19), off + i + 1).map((b) => b.c);
        const m = slice.reduce((x, y) => x + y, 0) / slice.length;
        const sd = Math.sqrt(slice.reduce((x, y) => x + Math.pow(y - m, 2), 0) / slice.length);
        const y = Y(m + 2 * sd);
        if (i === 0) ctx.moveTo(i * cw + cw / 2, y);
        else ctx.lineTo(i * cw + cw / 2, y);
      });
      ctx.strokeStyle = "rgba(147, 51, 234, 0.7)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Render volume sub-bars
    const maxVol = Math.max(...v.map((b) => b.v || 100));
    v.forEach((b, i) => {
      const x = i * cw + cw * 0.15;
      const vh = ((b.v || 50) / maxVol) * 28;
      ctx.fillStyle = b.c >= b.o ? "rgba(16, 185, 129, 0.18)" : "rgba(239, 68, 68, 0.18)";
      ctx.fillRect(x, h - pb - vh, cw * 0.7, vh);
    });

    // Render Candlesticks
    v.forEach((b, i) => {
      const x = i * cw + cw / 2;
      const up = b.c >= b.o;
      ctx.strokeStyle = ctx.fillStyle = up ? "#10B981" : "#EF4444";
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(x, Y(b.h));
      ctx.lineTo(x, Y(b.l));
      ctx.stroke();

      const y1 = Y(Math.max(b.o, b.c));
      const y2 = Y(Math.min(b.o, b.c));
      ctx.fillRect(x - cw * 0.35, y1, cw * 0.7, Math.max(1.5, y2 - y1));
    });

    // Render Executed Trade Markers
    stateRef.current.trades
      .filter((t) => t.k >= off)
      .forEach((t) => {
        const x = (t.k - off) * cw + cw / 2;
        const y = Y(t.p);
        ctx.fillStyle = t.side === "b" ? "#10B981" : "#EF4444";
        ctx.beginPath();
        if (t.side === "b") {
          ctx.moveTo(x, y + 10);
          ctx.lineTo(x - 6, y + 20);
          ctx.lineTo(x + 6, y + 20);
        } else {
          ctx.moveTo(x, y - 10);
          ctx.lineTo(x - 6, y - 20);
          ctx.lineTo(x + 6, y - 20);
        }
        ctx.fill();
      });

    // Stop-Loss & Take-Profit Visual Guides
    if (stateRef.current.qty > 0) {
      const entryY = Y(stateRef.current.entryPrice);
      const slPrice = stateRef.current.entryPrice * (1 - stateRef.current.stopLoss / 100);
      const tpPrice = stateRef.current.entryPrice * (1 + stateRef.current.takeProfit / 100);

      // Entry line
      ctx.strokeStyle = "rgba(59, 130, 246, 0.6)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, entryY);
      ctx.lineTo(w - pr, entryY);
      ctx.stroke();

      // Stop-loss line
      ctx.strokeStyle = "rgba(239, 68, 68, 0.6)";
      ctx.beginPath();
      ctx.moveTo(0, Y(slPrice));
      ctx.lineTo(w - pr, Y(slPrice));
      ctx.stroke();

      // Take-profit line
      ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
      ctx.beginPath();
      ctx.moveTo(0, Y(tpPrice));
      ctx.lineTo(w - pr, Y(tpPrice));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Latest price badge
    const lp = bars[bars.length - 1]?.c || 100;
    const ly = Y(lp);
    ctx.fillStyle = "#F59E0B";
    ctx.fillRect(w - pr + 2, ly - 9, pr - 2, 18);
    ctx.fillStyle = "#0F172A";
    ctx.font = 'bold 10px "JetBrains Mono",monospace';
    ctx.fillText(lp.toFixed(2), w - pr + 5, ly);
  };

  const handleTriggerShock = () => {
    // Force a sharp downward crash across multiple bars
    const dropUnit = stateRef.current.asset.volatility * 3.5;
    // Push 3 consecutive hard dumping red bars to visibly crash the price
    for (let i = 0; i < 3; i++) {
      const dropDelta = -dropUnit * (1.2 + Math.random() * 0.8);
      stateRef.current.bars.push(nextBar(dropDelta));
    }
    addLog(`MARKET VOLATILITY CRASH INJECTED (-6.8% Flash Dump)`, "alert");
    executeDecision();
    drawChart();
  };

  const handleTriggerPump = () => {
    // Force a sharp bullish surge across multiple bars
    const pumpUnit = stateRef.current.asset.volatility * 3.5;
    for (let i = 0; i < 3; i++) {
      const pumpDelta = pumpUnit * (1.2 + Math.random() * 0.8);
      stateRef.current.bars.push(nextBar(pumpDelta));
    }
    addLog(`BULLISH MOMENTUM SURGE INJECTED (+7.2% Breakout)`, "buy");
    executeDecision();
    drawChart();
  };

  const handleTriggerSqueeze = () => {
    const swing1 = -stateRef.current.asset.volatility * 2.5;
    const swing2 = stateRef.current.asset.volatility * 4.0;
    stateRef.current.bars.push(nextBar(swing1));
    stateRef.current.bars.push(nextBar(swing2));
    addLog(`LIQUIDITY SQUEEZE INJECTED (Whale Stop-Hunt)`, "info");
    executeDecision();
    drawChart();
  };

  useEffect(() => {
    stateRef.current.strategy = strategy;
    stateRef.current.leverage = leverage;
    stateRef.current.stopLoss = stopLossPct;
    stateRef.current.takeProfit = takeProfitPct;
    drawChart();
  }, [strategy, leverage, stopLossPct, takeProfitPct]);

  useEffect(() => {
    stateRef.current.running = isRunning;
  }, [isRunning]);

  useEffect(() => {
    resetBot(selectedAsset, strategy);
    drawChart();

    const interval = setInterval(() => {
      if (!stateRef.current.running) return;
      const s = stateRef.current;
      s.bars.push(nextBar());
      if (s.bars.length > 400) {
        s.bars.shift();
        s.trades.forEach((t) => t.k--);
      }
      executeDecision();
      drawChart();
    }, 750);

    const handleResize = () => drawChart();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedAsset]);

  return (
    <section className="g" id="bot-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Algorithmic trading &amp; automation
            </p>
            <h2>
              Autonomous quant trading. Watch it analyze and <em>execute</em>.
            </h2>
          </div>
          <p className="lede">
            High-frequency algorithmic execution with real-time risk controls. Switch markets, test quantitative strategies (Bollinger, Grid, TWAP), or inject market volatility shocks to observe defensive hedging in action.
          </p>
        </div>

        {/* 1. ASSET SWITCHER BAR */}
        <div style={{ marginBottom: "16px" }}>
          <div className="lbl" style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>Tradable Asset Markets</span>
            <span style={{ color: "var(--trace)", fontSize: "11px" }}>Multi-asset cross margin execution</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px" }}>
            {Object.entries(ASSETS).map(([key, asset]) => {
              const isSelected = selectedAsset === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedAsset(key);
                    resetBot(key, strategy);
                  }}
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
                  }}
                >
                  <div>
                    <strong style={{ display: "block", fontSize: "13px", color: isSelected ? "var(--trace)" : "var(--text)" }}>
                      {asset.symbol}
                    </strong>
                    <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                      {asset.name}
                    </span>
                  </div>
                  <span style={{ fontSize: "10px", color: isSelected ? "var(--trace)" : "var(--muted)", fontWeight: 600 }}>
                    {asset.leverageMax}x Max
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bot" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 340px)", gap: "16px", alignItems: "stretch" }}>
          {/* Left Bay: Candlestick Chart & Controls */}
          <div className="bay" style={{ display: "flex", flexDirection: "column" }}>
            <div className="bay-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: 700 }}>{ASSETS[selectedAsset].symbol} · 1m Realtime Feed</span>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "var(--f-mono)",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    background: isRunning ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    color: isRunning ? "var(--ok)" : "var(--amber)",
                    fontWeight: 600,
                  }}
                >
                  {isRunning ? "● BOT ACTIVE" : "❚❚ PAUSED"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10.5px", color: "var(--dim)", fontFamily: "var(--f-mono)", textTransform: "uppercase" }}>
                  Inject Market Shock:
                </span>
                <button
                  type="button"
                  id="pumpBtn"
                  className="btn"
                  onClick={handleTriggerPump}
                  style={{
                    fontSize: "11px",
                    padding: "4px 8px",
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--ok)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  🚀 Bullish Pump
                </button>
                <button
                  type="button"
                  id="dumpBtn"
                  className="btn"
                  onClick={handleTriggerShock}
                  style={{
                    fontSize: "11px",
                    padding: "4px 8px",
                    background: "rgba(239, 68, 68, 0.12)",
                    color: "#EF4444",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  ⚡ Flash Dump
                </button>
                <button
                  type="button"
                  id="squeezeBtn"
                  className="btn"
                  onClick={handleTriggerSqueeze}
                  style={{
                    fontSize: "11px",
                    padding: "4px 8px",
                    background: "rgba(245, 158, 11, 0.12)",
                    color: "var(--amber)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  🌊 Whale Squeeze
                </button>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              id="candles"
              role="img"
              aria-label="Candlestick chart with algorithmic buy and sell execution markers"
              style={{ display: "block", width: "100%", height: "360px" }}
            />

            {/* Strategy & Risk Management Toolbar */}
            <div
              className="botctl"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "10px",
                alignItems: "center",
                padding: "14px",
                background: "var(--bay-2)",
              }}
            >
              {/* 1. Custom Strategy Dropdown */}
              <div style={{ position: "relative" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  Quant Strategy
                </span>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "strategy" ? null : "strategy")}
                  style={{
                    width: "100%",
                    minHeight: "36px",
                    background: "var(--ink)",
                    border: openDropdown === "strategy" ? "1px solid var(--trace)" : "1px solid var(--rule)",
                    color: "var(--text)",
                    padding: "0 10px",
                    fontSize: "12px",
                    fontFamily: "var(--f-mono)",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {STRATEGY_OPTIONS.find((o) => o.key === strategy)?.label || "Select Strategy"}
                  </span>
                  <span style={{ fontSize: "10px", color: "var(--trace)", marginLeft: "6px" }}>▾</span>
                </button>

                {openDropdown === "strategy" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: 0,
                      right: 0,
                      marginBottom: "6px",
                      background: "var(--bay)",
                      border: "1px solid var(--rule)",
                      borderRadius: "6px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                      zIndex: 30,
                      display: "grid",
                      gap: "2px",
                      padding: "4px",
                      minWidth: "220px",
                    }}
                  >
                    {STRATEGY_OPTIONS.map((opt) => (
                      <div
                        key={opt.key}
                        onClick={() => {
                          setStrategy(opt.key);
                          setOpenDropdown(null);
                          addLog(`Switched algorithm to ${opt.key.toUpperCase()}`);
                        }}
                        style={{
                          padding: "8px 10px",
                          borderRadius: "4px",
                          background: strategy === opt.key ? "var(--bay-2)" : "transparent",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <strong style={{ fontSize: "11.5px", color: strategy === opt.key ? "var(--trace)" : "var(--text)", display: "block" }}>
                          {opt.label}
                        </strong>
                        <span style={{ fontSize: "10px", color: "var(--dim)" }}>{opt.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Custom Leverage Dropdown */}
              <div style={{ position: "relative" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  Cross Leverage ({leverage}x)
                </span>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "leverage" ? null : "leverage")}
                  style={{
                    width: "100%",
                    minHeight: "36px",
                    background: "var(--ink)",
                    border: openDropdown === "leverage" ? "1px solid var(--trace)" : "1px solid var(--rule)",
                    color: "var(--text)",
                    padding: "0 10px",
                    fontSize: "12px",
                    fontFamily: "var(--f-mono)",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{LEVERAGE_OPTIONS.find((l) => l.val === leverage)?.label}</span>
                  <span style={{ fontSize: "10px", color: "var(--trace)" }}>▾</span>
                </button>

                {openDropdown === "leverage" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: 0,
                      right: 0,
                      marginBottom: "6px",
                      background: "var(--bay)",
                      border: "1px solid var(--rule)",
                      borderRadius: "6px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                      zIndex: 30,
                      display: "grid",
                      gap: "2px",
                      padding: "4px",
                      minWidth: "200px",
                    }}
                  >
                    {LEVERAGE_OPTIONS.map((opt) => (
                      <div
                        key={opt.val}
                        onClick={() => {
                          setLeverage(opt.val);
                          setOpenDropdown(null);
                        }}
                        style={{
                          padding: "8px 10px",
                          borderRadius: "4px",
                          background: leverage === opt.val ? "var(--bay-2)" : "transparent",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <strong style={{ fontSize: "11.5px", color: leverage === opt.val ? "var(--trace)" : "var(--text)", display: "block" }}>
                          {opt.label}
                        </strong>
                        <span style={{ fontSize: "10px", color: "var(--dim)" }}>{opt.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  Stop-Loss: <strong style={{ color: "#EF4444" }}>-{stopLossPct}%</strong>
                </span>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={stopLossPct}
                  onChange={(e) => setStopLossPct(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#EF4444" }}
                />
              </div>

              <div>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  Take-Profit: <strong style={{ color: "var(--ok)" }}>+{takeProfitPct}%</strong>
                </span>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="0.5"
                  value={takeProfitPct}
                  onChange={(e) => setTakeProfitPct(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--ok)" }}
                />
              </div>

              <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
                <button
                  id="botToggle"
                  type="button"
                  className="btn"
                  onClick={() => setIsRunning(!isRunning)}
                  style={{ flex: 1, minHeight: "34px", fontSize: "11.5px" }}
                >
                  {isRunning ? "Pause" : "Resume"}
                </button>
                <button
                  id="botReset"
                  type="button"
                  className="btn"
                  onClick={() => resetBot()}
                  style={{ flex: 1, minHeight: "34px", fontSize: "11.5px" }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Bay: PnL, Order Book & Audit Log */}
          <div className="bay" style={{ display: "flex", flexDirection: "column" }}>
            {/* Real-time Metrics Grid */}
            <div
              className="pnl"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <div style={{ padding: "10px 14px", borderRight: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                  Account Equity
                </span>
                <b style={{ color: "var(--text)", fontSize: "17px", fontFamily: "var(--f-mono)", display: "block", marginTop: "2px" }}>
                  ${equity.toLocaleString()}
                </b>
              </div>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--rule)" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                  Total P&amp;L
                </span>
                <b style={{ color: pnlPct.startsWith("+") ? "var(--ok)" : "#EF4444", fontSize: "17px", fontFamily: "var(--f-mono)", display: "block", marginTop: "2px" }}>
                  {pnlPct}
                </b>
              </div>
              <div style={{ padding: "10px 14px", borderRight: "1px solid var(--rule)" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                  Win Rate
                </span>
                <b style={{ color: "var(--trace)", fontSize: "17px", fontFamily: "var(--f-mono)", display: "block", marginTop: "2px" }}>
                  {winRate}%
                </b>
              </div>
              <div style={{ padding: "10px 14px" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                  Sharpe Ratio
                </span>
                <b style={{ color: "var(--amber)", fontSize: "17px", fontFamily: "var(--f-mono)", display: "block", marginTop: "2px" }}>
                  {sharpeRatio}
                </b>
              </div>
            </div>

            {/* Position & Exposure Badge */}
            <div
              style={{
                padding: "8px 14px",
                background: "var(--ink)",
                borderBottom: "1px solid var(--rule)",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                fontFamily: "var(--f-mono)",
              }}
            >
              <span>
                Active Position:{" "}
                <strong style={{ color: position.side === "long" ? "var(--ok)" : "var(--muted)", textTransform: "uppercase" }}>
                  {position.side === "long" ? `LONG ${position.qty} ${selectedAsset}` : "FLAT (NO EXPOSURE)"}
                </strong>
              </span>
              <span>
                Unrealized PnL:{" "}
                <strong style={{ color: unrealizedPnl >= 0 ? "var(--ok)" : "#EF4444" }}>
                  {unrealizedPnl >= 0 ? "+" : ""}${unrealizedPnl}
                </strong>
              </span>
            </div>

            {/* Live Order Book Depth Preview */}
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--rule)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", marginBottom: "6px" }}>
                <span>Live Depth Book (L2)</span>
                <span>Spread: {orderBook.spread}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "10.5px", fontFamily: "var(--f-mono)" }}>
                {/* Asks (Red) */}
                <div style={{ display: "grid", gap: "2px" }}>
                  {orderBook.asks.slice(0, 3).map((a, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "#EF4444" }}>
                      <span>{a.price.toFixed(1)}</span>
                      <span>{a.amount}</span>
                    </div>
                  ))}
                </div>
                {/* Bids (Green) */}
                <div style={{ display: "grid", gap: "2px" }}>
                  {orderBook.bids.slice(0, 3).map((b, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "var(--ok)" }}>
                      <span>{b.price.toFixed(1)}</span>
                      <span>{b.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Execution Audit Log Stream */}
            <div className="tlog" style={{ height: "180px", overflowY: "auto", padding: "12px 14px", fontSize: "11px" }}>
              {logs.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "6px", display: "flex", gap: "6px" }}>
                  <span style={{ color: "var(--dim)", fontFamily: "var(--f-mono)" }}>{item.time}</span>
                  <span
                    style={{
                      color:
                        item.side === "buy"
                          ? "var(--ok)"
                          : item.side === "sell"
                          ? "var(--amber)"
                          : item.side === "alert"
                          ? "#EF4444"
                          : "var(--muted)",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
