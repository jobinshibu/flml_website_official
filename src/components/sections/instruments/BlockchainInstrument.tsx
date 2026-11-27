"use client";

import { useEffect, useState } from "react";

interface BlockData {
  i: number;
  data: string;
  nonce: number;
  prev: string;
  hash: string;
  timestamp: string;
  gasUsed: string;
  txCount: number;
}

interface ContractCallLog {
  txHash: string;
  method: string;
  args: string;
  gasFee: string;
  status: "success" | "pending" | "reverted";
  timestamp: string;
}

// Optimized fast SHA-256 implementation
function sha256(a: string): string {
  const rr = (v: number, n: number) => (v >>> n) | (v << (32 - n));
  const K: number[] = [];
  const Hh: number[] = [];
  let pc = 0;
  const isC: { [key: number]: number } = {};
  for (let c = 2; pc < 64; c++) {
    if (!isC[c]) {
      for (let i = 0; i < 313; i += c) isC[i] = c;
      Hh[pc] = (Math.pow(c, 0.5) * 4294967296) | 0;
      K[pc++] = (Math.pow(c, 1 / 3) * 4294967296) | 0;
    }
  }
  const h = Hh.slice(0, 8);
  const b = unescape(encodeURIComponent(a));
  const w: number[] = [];
  const L = b.length * 8;
  let m = b + "\x80";
  while ((m.length % 64) - 56) m += "\x00";
  for (let i = 0; i < m.length; i++) w[i >> 2] |= m.charCodeAt(i) << ((3 - (i % 4)) * 8);
  w[w.length] = (L / 4294967296) | 0;
  w[w.length] = L;

  for (let j = 0; j < w.length; ) {
    const W = w.slice(j, (j += 16));
    const o = h.slice(0);
    for (let i = 0; i < 64; i++) {
      const w15 = W[i - 15];
      const w2 = W[i - 2];
      const A = h[0];
      const E = h[4];
      const t1 =
        h[7] +
        (rr(E, 6) ^ rr(E, 11) ^ rr(E, 25)) +
        ((E & h[5]) ^ (~E & h[6])) +
        K[i] +
        (W[i] =
          i < 16
            ? W[i]
            : (W[i - 16] +
                (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) +
                W[i - 7] +
                (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) |
              0);
      const t2 =
        (rr(A, 2) ^ rr(A, 13) ^ rr(A, 22)) + ((A & h[1]) ^ (A & h[2]) ^ (h[1] & h[2]));
      h.unshift((t1 + t2) | 0);
      h[4] = (h[4] + t1) | 0;
      h.pop();
    }
    for (let i = 0; i < 8; i++) h[i] = (h[i] + o[i]) | 0;
  }
  return h.map((x) => (x >>> 0).toString(16).padStart(8, "0")).join("");
}

const PRESET_SCENARIOS = [
  {
    id: "stablecoin",
    label: "USDT / USDC Settlement",
    badge: "E-Commerce Rails",
    blocks: [
      "Genesis: Treasury Pool Initialized (10,000,000 USDC)",
      "Merchant: Order #FL-8812 · Pay 450.00 USDT (Idempotent)",
      "Gateway: Auto-convert 450 USDT → 37,350 INR (Fee 0.15%)",
      "Settlement: Bank Payout Dispatched to Axis Bank IFSC",
    ],
  },
  {
    id: "escrow",
    label: "Multi-Sig Escrow",
    badge: "Milestone Release",
    blocks: [
      "Genesis: Escrow Contract Locked (25.00 ETH)",
      "Milestone 1: Smart Contract Audit Approved (2-of-3 Sig)",
      "Release: 7.50 ETH transferred to Developer Vault",
      "Dispute Check: Zero disputes · Next milestone unlocked",
    ],
  },
  {
    id: "rwa",
    label: "Tokenized RWA Property",
    badge: "ERC-3643 Securities",
    blocks: [
      "Genesis: Deed Vault #7281 (Lusail Marina Tower 14)",
      "Mint: 100,000 Fraction Tokens ($50.00 / Token)",
      "KYC Transfer: Investor 0x7B...9A buys 250 Tokens",
      "Yield Distribution: $3,250 Quarterly Rent Dispatched",
    ],
  },
  {
    id: "bridge",
    label: "Cross-Chain Relayer",
    badge: "Arbitrum ⇄ Solana",
    blocks: [
      "Genesis: Wormhole Relayer Bridge Contract v2.4",
      "Arbitrum L2: 12,000 USDC Locked in State Vault",
      "Proof: Merkle Root validation confirmed (Block #194,204)",
      "Solana: 12,000 Wrapped USDC Minted on Target Cluster",
    ],
  },
];

export default function BlockchainInstrument() {
  const [difficultyZeros, setDifficultyZeros] = useState<number>(3);
  const [activePreset, setActivePreset] = useState<string>("stablecoin");
  const [selectedBlockIdx, setSelectedBlockIdx] = useState<number>(1);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [chainStatus, setChainStatus] = useState("chain valid");
  const [statusColor, setStatusColor] = useState("var(--ok-ink)");
  const [miningIndex, setMiningIndex] = useState<number | null>(null);
  const [miningAll, setMiningAll] = useState<boolean>(false);

  // Smart Contract Terminal State
  const [contractLogs, setContractLogs] = useState<ContractCallLog[]>([
    {
      txHash: "0x7f9a2b...41c8",
      method: "settlePayment(merchantId, amount)",
      args: "id: 'M-902', amt: '450.00 USDT'",
      gasFee: "0.00042 ETH ($1.42)",
      status: "success",
      timestamp: "12s ago",
    },
    {
      txHash: "0x3e18cf...82d1",
      method: "verifyIdempotency(key)",
      args: "key: 'FLML-IDEMP-9402'",
      gasFee: "0.00018 ETH ($0.61)",
      status: "success",
      timestamp: "38s ago",
    },
  ]);

  const targetPrefix = "0".repeat(difficultyZeros);

  const hashOf = (b: BlockData) =>
    sha256(b.i + "|" + b.prev + "|" + b.data + "|" + b.nonce + "|" + (b.timestamp || ""));

  const mineBlockInternal = (b: BlockData, prefix: string) => {
    b.nonce = 0;
    for (;;) {
      b.hash = hashOf(b);
      if (b.hash.startsWith(prefix)) return;
      b.nonce++;
    }
  };

  const isBlockValid = (b: BlockData, allBlocks: BlockData[]) => {
    return b.hash.startsWith(targetPrefix) && (b.i === 0 || b.prev === allBlocks[b.i - 1].hash);
  };

  const isCumulativeValid = (idx: number, allBlocks: BlockData[]) => {
    for (let x = 0; x <= idx; x++) {
      if (!isBlockValid(allBlocks[x], allBlocks)) return false;
    }
    return true;
  };

  const [blocks, setBlocks] = useState<BlockData[]>([
    {
      i: 0,
      data: "Genesis: Treasury Pool Initialized (10,000,000 USDC)",
      nonce: 0,
      prev: "0".repeat(64),
      hash: "",
      timestamp: "2026-11-25 09:00:00 UTC",
      gasUsed: "142,500 gas",
      txCount: 1,
    },
    {
      i: 1,
      data: "Merchant: Order #FL-8812 · Pay 450.00 USDT (Idempotent)",
      nonce: 0,
      prev: "",
      hash: "",
      timestamp: "2026-11-25 09:02:14 UTC",
      gasUsed: "84,200 gas",
      txCount: 4,
    },
    {
      i: 2,
      data: "Gateway: Auto-convert 450 USDT → 37,350 INR (Fee 0.15%)",
      nonce: 0,
      prev: "",
      hash: "",
      timestamp: "2026-11-25 09:04:32 UTC",
      gasUsed: "98,100 gas",
      txCount: 2,
    },
    {
      i: 3,
      data: "Settlement: Bank Payout Dispatched to Axis Bank IFSC",
      nonce: 0,
      prev: "",
      hash: "",
      timestamp: "2026-11-25 09:06:50 UTC",
      gasUsed: "115,000 gas",
      txCount: 3,
    },
  ]);

  // Initial mine
  useEffect(() => {
    const list = [...blocks];
    list.forEach((b) => {
      b.prev = b.i ? list[b.i - 1].hash : "0".repeat(64);
      mineBlockInternal(b, targetPrefix);
    });
    setBlocks([...list]);
  }, [difficultyZeros]);

  // Integrity status evaluation
  useEffect(() => {
    if (!blocks.length) return;
    const bad = blocks.filter((b) => !isBlockValid(b, blocks)).length;
    if (bad) {
      setChainStatus(`${bad} invalid block${bad > 1 ? "s" : ""} · Cryptographic link broken`);
      setStatusColor("#EF4444");
    } else {
      setChainStatus(`Chain valid · Consensus target: ${difficultyZeros} leading zeroes`);
      setStatusColor("var(--ok)");
    }
  }, [blocks, difficultyZeros]);

  const handleDataChange = (index: number, val: string) => {
    const next = blocks.map((b) => ({ ...b }));
    next[index].data = val;
    next.forEach((b) => {
      b.prev = b.i ? next[b.i - 1].hash : "0".repeat(64);
      b.hash = hashOf(b);
    });
    setBlocks(next);
  };

  const handleMine = (index: number) => {
    if (isBlockValid(blocks[index], blocks)) return;
    setMiningIndex(index);

    setTimeout(() => {
      const t0 = performance.now();
      const next = blocks.map((b) => ({ ...b }));
      mineBlockInternal(next[index], targetPrefix);
      for (let x = index + 1; x < next.length; x++) {
        next[x].prev = next[x - 1].hash;
        next[x].hash = hashOf(next[x]);
      }
      setBlocks(next);
      setMiningIndex(null);

      const stillBad = next.some((v) => !isBlockValid(v, next));
      if (!stillBad) {
        const timeTaken = Math.round(performance.now() - t0);
        setChainStatus(
          `Block #${next[index].i} mined in ${next[index].nonce.toLocaleString("en-IN")} hashes (${timeTaken} ms)`
        );
        setStatusColor("var(--ok)");
      }
    }, 40);
  };

  const handleMineAll = () => {
    setMiningAll(true);
    setTimeout(() => {
      const next = blocks.map((b) => ({ ...b }));
      next.forEach((b) => {
        b.prev = b.i ? next[b.i - 1].hash : "0".repeat(64);
        mineBlockInternal(b, targetPrefix);
      });
      setBlocks(next);
      setMiningAll(false);
      setChainStatus("All blocks re-mined · Cryptographic hash tree restored");
      setStatusColor("var(--ok)");
    }, 80);
  };

  const handleCorruptChain = () => {
    if (blocks.length > 1) {
      handleDataChange(1, blocks[1].data + " [TAMPERED - EXPLOIT ATTEMPT]");
      setSelectedBlockIdx(1);
    }
  };

  const handleAddBlock = () => {
    const nextIdx = blocks.length;
    const prevHash = blocks[nextIdx - 1]?.hash || "0".repeat(64);
    const newBlock: BlockData = {
      i: nextIdx,
      data: `Contract Call: executeSettlement() · Block #${nextIdx}`,
      nonce: 0,
      prev: prevHash,
      hash: "",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
      gasUsed: "92,400 gas",
      txCount: Math.floor(Math.random() * 5) + 1,
    };
    mineBlockInternal(newBlock, targetPrefix);
    setBlocks([...blocks, newBlock]);
    setSelectedBlockIdx(nextIdx);
  };

  const handleApplyPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setActivePreset(preset.id);
    const newBlocks: BlockData[] = preset.blocks.map((dataText, idx) => ({
      i: idx,
      data: dataText,
      nonce: 0,
      prev: "0".repeat(64),
      hash: "",
      timestamp: `2026-11-25 09:0${idx * 2}:15 UTC`,
      gasUsed: `${85000 + idx * 12500} gas`,
      txCount: idx + 1,
    }));
    newBlocks.forEach((b) => {
      b.prev = b.i ? newBlocks[b.i - 1].hash : "0".repeat(64);
      mineBlockInternal(b, targetPrefix);
    });
    setBlocks(newBlocks);
    setSelectedBlockIdx(0);
  };

  const handleSimulateContractTx = (methodName: string, sampleArgs: string) => {
    const newTx: ContractCallLog = {
      txHash: "0x" + Math.random().toString(16).substring(2, 8) + "..." + Math.random().toString(16).substring(2, 6),
      method: methodName,
      args: sampleArgs,
      gasFee: "0.00028 ETH ($0.95)",
      status: "success",
      timestamp: "Just now",
    };
    setContractLogs([newTx, ...contractLogs.slice(0, 4)]);

    // Append to chain
    if (blocks.length > 0) {
      const last = blocks[blocks.length - 1];
      const updatedData = `Contract: ${methodName} (${sampleArgs})`;
      handleDataChange(last.i, updatedData);
    }
  };

  const selectedBlock = blocks[selectedBlockIdx] || blocks[0];
  const isSelectedBlockValid = isBlockValid(selectedBlock, blocks);

  return (
    <section className="g" id="chain-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Blockchain &amp; crypto engineering
            </p>
            <h2>
              Edit one transaction. Watch the whole chain <em>fracture</em>.
            </h2>
          </div>
          <p className="lede">
            A real-time proof-of-work blockchain running cryptographic SHA-256 inside your browser. Modify any state, see downstream blocks immediately turn invalid, and mine the nonces to reach consensus.
          </p>
        </div>

        {/* 1. ARCHETYPE PRESETS BAR */}
        <div style={{ marginBottom: "16px" }}>
          <div className="lbl" style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>Production Blockchain Archetypes</span>
            <span style={{ color: "var(--trace)", fontSize: "11px" }}>Click to simulate real Web3 state</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "8px" }}>
            {PRESET_SCENARIOS.map((p) => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
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
                      {p.label}
                    </strong>
                    <span style={{ fontSize: "10px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                      {p.badge}
                    </span>
                  </div>
                  <span style={{ fontSize: "11px", color: isSelected ? "var(--trace)" : "var(--muted)" }}>
                    {isSelected ? "● Active" : "→"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bay" style={{ marginBottom: "16px" }}>
          {/* Controls & Telemetry Header */}
          <div
            className="bay-head"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontWeight: 600 }}>LEDGER · SHA-256 CONSENSUS</span>
              <span className="mono" style={{ fontSize: "11.5px", color: statusColor, fontWeight: 600 }}>
                {chainStatus}
              </span>
            </div>

            {/* Quick Action Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <button
                id="tamperBtn"
                type="button"
                className="btn"
                onClick={handleCorruptChain}
                style={{
                  fontSize: "11.5px",
                  padding: "4px 10px",
                  background: "rgba(239, 68, 68, 0.12)",
                  color: "#EF4444",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  cursor: "pointer",
                }}
              >
                ⚠ Tamper Block #1
              </button>

              <button
                id="mineBtn"
                type="button"
                className="btn"
                onClick={handleMineAll}
                disabled={miningAll}
                style={{
                  fontSize: "11.5px",
                  padding: "4px 10px",
                  background: "var(--bay-2)",
                  color: "var(--ok)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                }}
              >
                {miningAll ? "Mining Consensus..." : "⛏ Re-Mine All Blocks"}
              </button>

              <button
                type="button"
                className="btn primary"
                onClick={handleAddBlock}
                style={{
                  fontSize: "11.5px",
                  padding: "4px 12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Append Block
              </button>
            </div>
          </div>

          {/* Difficulty Slider Bar */}
          <div
            style={{
              padding: "10px 18px",
              background: "var(--bay-2)",
              borderBottom: "1px solid var(--rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "var(--dim)", fontFamily: "var(--f-mono)", textTransform: "uppercase", fontSize: "11px" }}>
                Proof-of-Work Difficulty:
              </span>
              <span style={{ fontFamily: "var(--f-mono)", color: "var(--amber)", fontWeight: 700 }}>
                {difficultyZeros} leading zeroes (&quot;{targetPrefix}...&quot;)
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "11px", color: "var(--dim)" }}>Consensus Target:</span>
              {[1, 2, 3, 4].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficultyZeros(diff)}
                  style={{
                    padding: "3px 9px",
                    borderRadius: "3px",
                    border: difficultyZeros === diff ? "1px solid var(--trace)" : "1px solid var(--rule)",
                    background: difficultyZeros === diff ? "var(--trace)" : "var(--ink)",
                    color: difficultyZeros === diff ? "#080C17" : "var(--muted)",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {diff} {diff === 1 ? "Zero" : "Zeroes"}
                </button>
              ))}
            </div>
          </div>

          {/* 2. LIVE BLOCKCHAIN HORIZONTAL TRACK */}
          <div className="chain" id="chain" style={{ gap: "10px", padding: "20px 18px", overflowX: "auto" }}>
            {blocks.map((b, idx) => {
              const ok = isCumulativeValid(idx, blocks);
              const isSelected = selectedBlockIdx === idx;
              return (
                <span key={b.i} className="contents" style={{ display: "flex", alignItems: "center" }}>
                  {idx > 0 && (
                    <span
                      className={`link ${ok ? "" : "bad"}`}
                      aria-hidden="true"
                      style={{
                        flex: "0 0 24px",
                        height: "2px",
                        background: ok ? "var(--ok)" : "#EF4444",
                        boxShadow: ok ? "0 0 8px rgba(34, 197, 94, 0.4)" : "0 0 8px rgba(239, 68, 68, 0.6)",
                      }}
                    />
                  )}
                  <div
                    className={`blk ${ok ? "" : "bad"}`}
                    onClick={() => setSelectedBlockIdx(idx)}
                    style={{
                      flex: "0 0 260px",
                      border: isSelected
                        ? ok
                          ? "2px solid var(--trace)"
                          : "2px solid #EF4444"
                        : ok
                        ? "1px solid rgba(34, 197, 94, 0.4)"
                        : "1px solid #EF4444",
                      background: isSelected ? "var(--bay-2)" : ok ? "var(--ink)" : "rgba(239, 68, 68, 0.08)",
                      borderRadius: "6px",
                      padding: "14px",
                      display: "grid",
                      gap: "8px",
                      font: "11px var(--f-mono)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="k" style={{ color: "var(--dim)", fontWeight: 700 }}>
                        BLOCK #{b.i}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          background: ok ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.2)",
                          color: ok ? "var(--ok)" : "#EF4444",
                          fontWeight: 600,
                        }}
                      >
                        {ok ? "VALID" : "INVALID"}
                      </span>
                    </div>

                    <div style={{ fontSize: "10.5px", color: "var(--dim)" }}>
                      Nonce: <strong style={{ color: "var(--text)" }}>{b.nonce.toLocaleString()}</strong>
                    </div>

                    <label className="k" htmlFor={`bd${b.i}`} style={{ color: "var(--dim)", textTransform: "uppercase", fontSize: "10px" }}>
                      Data Payload:
                    </label>
                    <input
                      id={`bd${b.i}`}
                      value={b.data}
                      onChange={(e) => handleDataChange(b.i, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "100%",
                        minHeight: "36px",
                        background: "var(--ink)",
                        border: "1px solid var(--rule)",
                        color: "var(--text)",
                        borderRadius: "4px",
                        padding: "0 8px",
                        fontSize: "11.5px",
                        fontFamily: "var(--f-mono)",
                      }}
                    />

                    <div>
                      <div className="k" style={{ color: "var(--dim)", fontSize: "9.5px" }}>PREVIOUS HASH</div>
                      <div className="v" style={{ color: "var(--muted)", fontSize: "10px" }}>{b.prev.slice(0, 18)}…</div>
                    </div>

                    <div>
                      <div className="k" style={{ color: "var(--dim)", fontSize: "9.5px" }}>BLOCK HASH</div>
                      <div className="v h" style={{ color: ok ? "var(--ok)" : "#EF4444", fontWeight: 700, fontSize: "10px" }}>
                        {b.hash.slice(0, 20)}…
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMine(b.i);
                      }}
                      style={{
                        minHeight: "32px",
                        border: "1px solid var(--rule)",
                        background: ok ? "var(--ink)" : "var(--trace)",
                        color: ok ? "var(--muted)" : "#FFFFFF",
                        borderRadius: "4px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {miningIndex === b.i ? "⛏ Mining Hashes..." : ok ? "✓ Block Valid" : "Mine Block Nonce"}
                    </button>
                  </div>
                </span>
              );
            })}
          </div>

          {/* 3. CRYPTOGRAPHIC BLOCK INSPECTOR */}
          <div
            style={{
              borderTop: "1px solid var(--rule)",
              padding: "16px 20px",
              background: "var(--bay-2)",
              display: "grid",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isSelectedBlockValid ? "var(--ok)" : "#EF4444" }} />
                <strong style={{ fontSize: "13.5px", color: "var(--text)" }}>
                  Cryptographic Inspector: Block #{selectedBlock.i}
                </strong>
                <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                  [{selectedBlock.txCount} Verified Transactions · {selectedBlock.gasUsed}]
                </span>
              </div>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  navigator.clipboard.writeText(selectedBlock.hash);
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }}
                style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  background: copiedHash ? "var(--ok)" : "var(--bay)",
                  color: copiedHash ? "#080C17" : "var(--text)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                }}
              >
                {copiedHash ? "✓ Full Hash Copied" : "📋 Copy Full SHA-256"}
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "10px",
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
              }}
            >
              <div style={{ background: "var(--ink)", padding: "10px 12px", borderRadius: "4px", border: "1px solid var(--rule)" }}>
                <span style={{ color: "var(--dim)", display: "block", marginBottom: "2px" }}>FULL COMPUTED SHA-256 HASH:</span>
                <span style={{ color: isSelectedBlockValid ? "var(--ok)" : "#EF4444", wordBreak: "break-all", fontWeight: 600 }}>
                  {selectedBlock.hash || "Not yet computed"}
                </span>
              </div>
              <div style={{ background: "var(--ink)", padding: "10px 12px", borderRadius: "4px", border: "1px solid var(--rule)" }}>
                <span style={{ color: "var(--dim)", display: "block", marginBottom: "2px" }}>LINKED PARENT (PREVIOUS) HASH:</span>
                <span style={{ color: "var(--muted)", wordBreak: "break-all" }}>
                  {selectedBlock.prev}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SMART CONTRACT TERMINAL & CAPABILITIES GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "16px", marginBottom: "16px" }}>
          {/* Left: Smart Contract Sandbox */}
          <div className="bay" style={{ padding: "16px" }}>
            <div className="bay-head" style={{ marginBottom: "12px", padding: 0, border: "none" }}>
              <span style={{ fontWeight: 600 }}>Smart Contract Execution Terminal</span>
              <span style={{ fontSize: "11px", color: "var(--trace)", fontFamily: "var(--f-mono)" }}>Solidity EVM Sandbox</span>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
              <button
                type="button"
                className="chip"
                onClick={() => handleSimulateContractTx("executeDisbursement", "to: '0x94...12', amt: '1,250 USDT'")}
                style={{ fontSize: "11px", padding: "5px 10px", cursor: "pointer" }}
              >
                ▶ executeDisbursement()
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleSimulateContractTx("mintFractionalRWA", "id: #7281, tokens: 500")}
                style={{ fontSize: "11px", padding: "5px 10px", cursor: "pointer" }}
              >
                ▶ mintFractionalRWA()
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleSimulateContractTx("verifyRelayerStateProof", "chain: 'Arbitrum', root: '0x4f...'")}
                style={{ fontSize: "11px", padding: "5px 10px", cursor: "pointer" }}
              >
                ▶ verifyStateProof()
              </button>
            </div>

            {/* Live Contract Event Logs */}
            <div
              style={{
                background: "var(--ink)",
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "10px",
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                display: "grid",
                gap: "6px",
              }}
            >
              <span style={{ color: "var(--dim)", textTransform: "uppercase", fontSize: "10px" }}>Latest Contract Events:</span>
              {contractLogs.map((log, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "4px" }}>
                  <div>
                    <span style={{ color: "var(--ok)", marginRight: "6px" }}>✓</span>
                    <strong style={{ color: "var(--text)" }}>{log.method}</strong>
                    <span style={{ color: "var(--muted)", marginLeft: "6px" }}>({log.args})</span>
                  </div>
                  <span style={{ color: "var(--amber)", fontSize: "10.5px" }}>{log.gasFee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Gas & Network Latency Tracker */}
          <div className="bay" style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="bay-head" style={{ marginBottom: "12px", padding: 0, border: "none" }}>
                <span style={{ fontWeight: 600 }}>Multi-Chain Gas &amp; Cost Optimizer</span>
                <span style={{ fontSize: "10px", color: "var(--ok)", fontFamily: "var(--f-mono)" }}>LIVE PROJECTIONS</span>
              </div>

              <div style={{ display: "grid", gap: "8px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--bay-2)", borderRadius: "4px", border: "1px solid var(--rule)" }}>
                  <span style={{ color: "var(--text)" }}>Ethereum L1 (Settlement Layer)</span>
                  <strong style={{ color: "var(--amber)", fontFamily: "var(--f-mono)" }}>$3.80 - $8.50 / tx</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--bay-2)", borderRadius: "4px", border: "1px solid var(--rule)" }}>
                  <span style={{ color: "var(--text)" }}>Arbitrum / Base L2 (Optimistic Rollup)</span>
                  <strong style={{ color: "var(--trace)", fontFamily: "var(--f-mono)" }}>$0.015 - $0.04 / tx</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--bay-2)", borderRadius: "4px", border: "1px solid var(--rule)" }}>
                  <span style={{ color: "var(--text)" }}>Solana Mainnet (High Concurrency)</span>
                  <strong style={{ color: "var(--ok)", fontFamily: "var(--f-mono)" }}>&lt; $0.001 / tx</strong>
                </div>
              </div>
            </div>

            <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "12px", fontFamily: "var(--f-mono)" }}>
              FLML Architecture leverages account abstraction (ERC-4337) and relayer gas sponsorship so end users transact without needing native ETH in their wallets.
            </div>
          </div>
        </div>

        {/* Competencies Footer */}
        <div className="web3">
          <div>
            <b>Smart contracts &amp; Audits</b>
            <span>Token, staking, escrow and governance contracts, formally verified and audited.</span>
          </div>
          <div>
            <b>Wallets &amp; dApps</b>
            <span>Multi-chain non-custodial wallet connect (Wagmi, Viem, Solana Web3) and sleek frontends.</span>
          </div>
          <div>
            <b>Real-World Assets (RWA)</b>
            <span>Regulatory-compliant asset tokenization, KYC transfer restrictions and automated yields.</span>
          </div>
          <div>
            <b>Cross-Chain &amp; Indexers</b>
            <span>Sub-second subgraphs, custom blockchain indexers, and trustless state bridges.</span>
          </div>
        </div>

        <p className="proof" style={{ marginTop: "16px" }}>
          <span>Competency on display: cryptographic hashing, proof-of-work consensus, chain integrity, smart contract architecture.</span>
          <a href="/blockchain-development/">Explore blockchain &amp; crypto →</a>
        </p>
      </div>
    </section>
  );
}
