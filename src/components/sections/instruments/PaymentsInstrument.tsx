"use client";

import { useState } from "react";

interface LogEntry {
  ms: number;
  text: string;
  type?: "ok" | "bad" | "a" | "t";
}

export default function PaymentsInstrument() {
  const [state, setState] = useState<"CREATED" | "PENDING" | "CAPTURED" | "SETTLED">("CREATED");
  const [allDone, setAllDone] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>("—");
  const [simulateDrop, setSimulateDrop] = useState(true);
  const [ledger, setLedger] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { ms: 0, text: "ready. toggle network drop simulation and click pay to test idempotency.", type: "t" },
  ]);

  const ST: ("CREATED" | "PENDING" | "CAPTURED" | "SETTLED")[] = [
    "CREATED",
    "PENDING",
    "CAPTURED",
    "SETTLED",
  ];

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handlePay = async () => {
    setIsProcessing(true);
    setAllDone(false);
    setLedger(0);
    const key = "idk_" + Math.random().toString(36).slice(2, 10);
    setIdempotencyKey(key);

    let curMs = 0;
    const newLogs: LogEntry[] = [];
    const addLog = (text: string, type?: "ok" | "bad" | "a") => {
      newLogs.push({ ms: curMs, text, type });
      setLogs([...newLogs]);
    };

    setLogs([]);
    setState("CREATED");
    addLog(`POST /payments  {amount: 125000, currency: "INR", key: "${key}"}`);
    await wait(500);
    curMs += 120;
    addLog("order created · id pay_8Hq2 · status=CREATED", "ok");
    await wait(500);
    curMs += 340;

    addLog("UPI collect request sent to payer VPA");
    setState("PENDING");
    await wait(600);
    curMs += 900;

    if (simulateDrop) {
      addLog("✕ client connection dropped before response", "bad");
      await wait(700);
      curMs += 2000;
      addLog(`retry 1 · POST /payments  key: "${key}"`, "a");
      await wait(600);
      curMs += 80;
      addLog("idempotency hit → returning existing pay_8Hq2 (no new charge)", "ok");
      await wait(500);
    }

    curMs += 1400;
    addLog("webhook payment.captured · signature HMAC-SHA256 verified", "ok");
    setState("CAPTURED");
    setLedger(1);
    await wait(800);

    curMs += 86400;
    addLog("settlement batch T+1 · reconciled against bank statement", "ok");
    setAllDone(true);
    addLog(`result: 1 charge of ₹1,250${simulateDrop ? " despite a retry" : ""}`, "a");
    setIsProcessing(false);
  };

  return (
    <section className="g" id="pay-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Payments &amp; fintech
            </p>
            <h2>
              Drop the network mid-payment. Nobody gets charged <em>twice</em>.
            </h2>
          </div>
          <p className="lede">
            A UPI payment lifecycle with idempotency keys and webhook confirmation. Turn on the network failure and run it: the client retries safely and the ledger still shows one charge.
          </p>
        </div>

        <div className="pay">
          {/* Left Bay: Payment State Machine */}
          <div className="bay">
            <div className="bay-head">
              <span>payment state machine</span>
              <span>idempotency-key: {idempotencyKey}</span>
            </div>

            <div className="states">
              {ST.map((s, idx) => {
                const currentIdx = ST.indexOf(state);
                const isPassed = allDone || idx < currentIdx;
                const isCurrent = !allDone && idx === currentIdx;

                let cls = "st";
                if (allDone || isPassed) cls += " done";
                else if (isCurrent) cls += " on";

                return (
                  <span key={s} className="contents">
                    {idx > 0 && <span className="arrow" />}
                    <span className={cls}>{s}</span>
                  </span>
                );
              })}
            </div>

            <div className="pay-ctl">
              <button
                className="btn primary"
                disabled={isProcessing}
                onClick={handlePay}
              >
                Pay ₹1,250 via UPI
              </button>

              <label className="toggle" htmlFor="drop-toggle">
                <input
                  type="checkbox"
                  id="drop-toggle"
                  checked={simulateDrop}
                  onChange={(e) => setSimulateDrop(e.target.checked)}
                />
                {" "}Simulate network drop
              </label>
            </div>
          </div>

          {/* Right Bay: Server Log & Ledger */}
          <div className="bay">
            <div className="bay-head">
              <span>server log</span>
              <span>webhooks · retries</span>
            </div>

            <div className="plog">
              {logs.map((log, index) => (
                <div key={index}>
                  <span className="t">+{String(log.ms).padStart(4, "0")}ms</span>{" "}
                  <span className={log.type || ""}>{log.text}</span>
                </div>
              ))}
            </div>

            <div className="ledger">
              <span>Ledger: charges for this order</span>
              <b>{ledger}</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

