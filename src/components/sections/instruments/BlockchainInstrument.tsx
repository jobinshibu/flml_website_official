"use client";

import { useEffect, useState } from "react";

interface BlockData {
  i: number;
  data: string;
  nonce: number;
  prev: string;
  hash: string;
}

// SHA-256 implementation matching source
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

const D = "000";

export default function BlockchainInstrument() {
  const [blocks, setBlocks] = useState<BlockData[]>([
    { i: 0, data: "genesis", nonce: 0, prev: "", hash: "" },
    { i: 1, data: "Asha → Ravi: 2.5 ETH", nonce: 0, prev: "", hash: "" },
    { i: 2, data: "Ravi → Store: 120 USDT", nonce: 0, prev: "", hash: "" },
    { i: 3, data: "Store → Supplier: 0.8 ETH", nonce: 0, prev: "", hash: "" },
  ]);

  const [chainStatus, setChainStatus] = useState("chain valid");
  const [statusColor, setStatusColor] = useState("var(--ok-ink)");
  const [miningIndex, setMiningIndex] = useState<number | null>(null);

  const hashOf = (b: BlockData) => sha256(b.i + "|" + b.prev + "|" + b.data + "|" + b.nonce);

  const mineBlock = (b: BlockData) => {
    b.nonce = 0;
    for (;;) {
      b.hash = hashOf(b);
      if (b.hash.startsWith(D)) return;
      b.nonce++;
    }
  };

  const isBlockValid = (b: BlockData, allBlocks: BlockData[]) => {
    return b.hash.startsWith(D) && (b.i === 0 || b.prev === allBlocks[b.i - 1].hash);
  };

  const isCumulativeValid = (idx: number, allBlocks: BlockData[]) => {
    for (let x = 0; x <= idx; x++) {
      if (!isBlockValid(allBlocks[x], allBlocks)) return false;
    }
    return true;
  };

  // Initialize on mount
  useEffect(() => {
    const list: BlockData[] = [
      { i: 0, data: "genesis", nonce: 0, prev: "0".repeat(64), hash: "" },
      { i: 1, data: "Asha → Ravi: 2.5 ETH", nonce: 0, prev: "", hash: "" },
      { i: 2, data: "Ravi → Store: 120 USDT", nonce: 0, prev: "", hash: "" },
      { i: 3, data: "Store → Supplier: 0.8 ETH", nonce: 0, prev: "", hash: "" },
    ];
    list.forEach((b) => {
      b.prev = b.i ? list[b.i - 1].hash : "0".repeat(64);
      mineBlock(b);
    });
    setBlocks([...list]);
  }, []);

  // Update status whenever blocks change
  useEffect(() => {
    if (!blocks.length) return;
    const bad = blocks.filter((b) => !isBlockValid(b, blocks)).length;
    if (bad) {
      setChainStatus(`${bad} invalid block${bad > 1 ? "s" : ""} · tampering detected`);
      setStatusColor("var(--bad-ink)");
    } else {
      setChainStatus("chain valid");
      setStatusColor("var(--ok-ink)");
    }
  }, [blocks]);

  const handleDataChange = (index: number, val: string) => {
    const next = blocks.map((b) => ({ ...b }));
    next[index].data = val;
    // Relink
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
      mineBlock(next[index]);
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
          `chain valid · mined in ${next[index].nonce.toLocaleString("en-IN")} tries (${timeTaken} ms)`
        );
        setStatusColor("var(--ok-ink)");
      }
    }, 30);
  };

  return (
    <section className="g" id="chain-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Blockchain &amp; crypto
            </p>
            <h2>
              Edit one block. Watch the whole chain <em>break</em>.
            </h2>
          </div>
          <p className="lede">
            A real proof-of-work chain running in your browser with SHA-256. Change any transaction and every block after it turns invalid. Press Mine to repair it.
          </p>
        </div>

        <div className="bay">
          <div className="bay-head">
            <span>ledger · difficulty 3 · sha-256</span>
            <span id="chainStat" className="mono" style={{ color: statusColor }}>
              {chainStatus}
            </span>
          </div>

          <div className="chain" id="chain">
            {blocks.map((b, idx) => {
              const ok = isCumulativeValid(idx, blocks);
              return (
                <span key={b.i} className="contents">
                  {idx > 0 && (
                    <span className={`link ${ok ? "" : "bad"}`} aria-hidden="true" />
                  )}
                  <div className={`blk ${ok ? "" : "bad"}`}>
                    <div className="k">
                      block #{b.i} · nonce {b.nonce}
                    </div>
                    <label className="k" htmlFor={`bd${b.i}`}>
                      data
                    </label>
                    <input
                      id={`bd${b.i}`}
                      value={b.data}
                      onChange={(e) => handleDataChange(b.i, e.target.value)}
                    />
                    <div>
                      <div className="k">prev</div>
                      <div className="v">{b.prev.slice(0, 22)}…</div>
                    </div>
                    <div>
                      <div className="k">hash</div>
                      <div className="v h">{b.hash.slice(0, 22)}…</div>
                    </div>
                    <button onClick={() => handleMine(b.i)}>
                      {miningIndex === b.i
                        ? "mining…"
                        : ok
                        ? "✓ valid"
                        : "Mine block"}
                    </button>
                  </div>
                </span>
              );
            })}
          </div>

          <div className="web3">
            <div>
              <b>Smart contracts</b>
              <span>Token, staking, escrow and governance contracts, tested and reviewed.</span>
            </div>
            <div>
              <b>Wallets &amp; dApps</b>
              <span>Wallet integration and decentralised app front ends.</span>
            </div>
            <div>
              <b>Tokens &amp; NFTs</b>
              <span>Token launches, NFT marketplaces, minting and royalty logic.</span>
            </div>
            <div>
              <b>Exchange integrations</b>
              <span>Crypto payment gateways, exchange APIs, on-chain analytics.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

