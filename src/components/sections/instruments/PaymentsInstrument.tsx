"use client";

import { useState, useRef } from "react";

interface LogEntry {
  ms: number;
  text: string;
  type?: "ok" | "bad" | "a" | "t" | "info" | "head";
  badge?: string;
}

type PaymentRail = "upi" | "card" | "crossborder";
type ChaosMode = "drop" | "dup_webhook" | "double_click" | "clean";

interface RailConfig {
  id: PaymentRail;
  name: string;
  railName: string;
  currency: string;
  symbol: string;
  amount: number;
  fee: number;
  settlementTime: string;
  protocol: string;
}

const RAILS: Record<PaymentRail, RailConfig> = {
  upi: {
    id: "upi",
    name: "UPI 2.0 (NPCI)",
    railName: "NPCI / Unified Payments Interface",
    currency: "INR",
    symbol: "₹",
    amount: 12500, // ₹12,500
    fee: 0, // 0% UPI MDR
    settlementTime: "Instant (T+0)",
    protocol: "ISO 20022 XML / UPI DeepLink",
  },
  card: {
    id: "card",
    name: "Card (3DS 2.2 Tokenized)",
    railName: "Visa / Mastercard Directory Server",
    currency: "USD",
    symbol: "$",
    amount: 450, // $450
    fee: 13.05, // 2.9%
    settlementTime: "Rolling T+2",
    protocol: "EMVCo 3DS / AES-256 GCM",
  },
  crossborder: {
    id: "crossborder",
    name: "Cross-Border (SWIFT / FedNow)",
    railName: "FedNow Instant / ISO 20022 PACS.008",
    currency: "EUR",
    symbol: "€",
    amount: 2800, // €2,800
    fee: 28.0, // 1%
    settlementTime: "Instant FX / T+1 Nostro",
    protocol: "SWIFT GPI / MT103 → PACS.008",
  },
};

const STATES = ["CREATED", "AUTHORIZED", "CAPTURED", "RECONCILED"] as const;
type PaymentState = (typeof STATES)[number];

export default function PaymentsInstrument() {
  const [activeRail, setActiveRail] = useState<PaymentRail>("upi");
  const [chaosMode, setChaosMode] = useState<ChaosMode>("drop");
  const [state, setState] = useState<PaymentState>("CREATED");
  const [allDone, setAllDone] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>("idk_live_9f82a1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ledgerCount, setLedgerCount] = useState(0);
  const [journalEntries, setJournalEntries] = useState<
    { account: string; type: "DR" | "CR"; amount: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<"logs" | "ledger" | "webhook">("logs");
  const [webhookPayload, setWebhookPayload] = useState<string | null>(null);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      ms: 0,
      text: "Gateway initialized. Select payment rail and chaos scenario to test zero-loss resilience.",
      type: "info",
    },
  ]);

  const runCounterRef = useRef(0);
  const rail = RAILS[activeRail];

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleExecutePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setAllDone(false);
    setLedgerCount(0);
    setJournalEntries([]);
    setWebhookPayload(null);

    runCounterRef.current += 1;
    const key = `idk_${activeRail}_` + Math.random().toString(36).substring(2, 9);
    setIdempotencyKey(key);

    let curMs = 0;
    const currentLogs: LogEntry[] = [];
    const addLog = (
      text: string,
      type?: LogEntry["type"],
      badge?: string
    ) => {
      currentLogs.push({ ms: curMs, text, type, badge });
      setLogs([...currentLogs]);
    };

    setLogs([]);
    setState("CREATED");

    // Step 1: POST Payment Intent
    addLog(
      `POST /v1/charges (Amount: ${rail.symbol}${rail.amount.toLocaleString()}, Rail: ${rail.id.toUpperCase()})`,
      "head",
      "HTTP 200"
    );
    addLog(`Header: Idempotency-Key: ${key}`, "info", "HEADER");
    await wait(400);

    curMs += 94;
    addLog(`Order order_${Math.random().toString(36).substring(2, 7)} created in status=CREATED`, "ok", "SQL INSERT");
    await wait(350);

    // Step 2: Customer Authorization / 3DS / UPI PIN
    curMs += 280;
    if (activeRail === "upi") {
      addLog(`Dispatched UPI Intent collect to payer VPA @okhdfcbank via NPCI switch`, "info", "NPCI");
    } else if (activeRail === "card") {
      addLog(`Initiating frictionless 3DS 2.2 challenge with Issuing Bank ACS server`, "info", "EMVCo");
    } else {
      addLog(`Initiating FedNow PACS.008 credit transfer via ISO 20022 message bus`, "info", "FEDNOW");
    }
    setState("AUTHORIZED");
    await wait(500);

    // Step 3: Handle Chaos Scenarios
    if (chaosMode === "drop") {
      curMs += 420;
      addLog(`⚡ NETWORK DROPPED: Client socket abruptly terminated before HTTP response ACK`, "bad", "SOCKET DROP");
      await wait(750);

      curMs += 1200;
      addLog(`Client SDK timeout triggered. Safe auto-retry initiating with identical Idempotency-Key...`, "a", "AUTO RETRY");
      await wait(450);

      curMs += 65;
      addLog(`POST /v1/charges  (Retry 1, Header: Idempotency-Key: ${key})`, "head", "RETRY #1");
      addLog(`Redis Idempotency Cache HIT: Lock verified. Serving cached response without duplicate charge!`, "ok", "IDEMPOTENT HIT");
      await wait(550);
    } else if (chaosMode === "dup_webhook") {
      curMs += 310;
      addLog(`Bank processed payment. Pushing asynchronous event to merchant webhook endpoint...`, "info", "WEBHOOK");
      await wait(400);

      curMs += 80;
      addLog(`⚡ DUPLICATE WEBHOOK: Gateway received duplicate payment.captured event (Network replay attack)`, "a", "REPLAY DETECTED");
      await wait(450);

      addLog(`HMAC-SHA256 signature verified. Webhook ID event_wh_901 seen in Redis dedup window (TTL: 86400s)`, "ok", "DEDUP VERIFIED");
      addLog(`Idempotently returned HTTP 200 OK. Ignored secondary mutation.`, "ok", "SKIPPED");
      await wait(450);
    } else if (chaosMode === "double_click") {
      curMs += 150;
      addLog(`⚡ DOUBLE-CLICK BURST: Payer hammered 'Pay' button 2x concurrently within 12ms!`, "bad", "RACE COND");
      await wait(500);

      curMs += 45;
      addLog(`Thread 1 acquired Postgres advisory lock 'pg_advisory_xact_lock(${key})'`, "ok", "DB MUTEX");
      addLog(`Thread 2 queued on lock → returned HTTP 409 Conflict / Idempotent mirror response`, "a", "MUTEX BLOCKED");
      await wait(550);
    }

    // Step 4: Webhook capture
    curMs += 380;
    const signature = "v1,t=1740001928,sig=" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    addLog(`Webhook 'payment.captured' received. Signature: ${signature.substring(0, 24)}... verified.`, "ok", "HMAC VALID");
    setState("CAPTURED");
    setLedgerCount(1);

    const netAmount = (rail.amount - rail.fee).toFixed(2);
    setJournalEntries([
      { account: `Bank Clearing Escrow (${rail.currency})`, type: "DR", amount: `${rail.symbol}${rail.amount.toLocaleString()}` },
      { account: `Merchant Net Settlement Payable`, type: "CR", amount: `${rail.symbol}${netAmount}` },
      ...(rail.fee > 0
        ? [{ account: `Payment Gateway Fee & GST`, type: "CR" as const, amount: `${rail.symbol}${rail.fee.toFixed(2)}` }]
        : []),
    ]);

    setWebhookPayload(
      JSON.stringify(
        {
          id: `evt_pay_${Math.random().toString(36).substring(2, 8)}`,
          event: "payment.captured",
          rail: rail.id,
          amount: rail.amount,
          currency: rail.currency,
          idempotency_key: key,
          status: "captured",
          charges: [
            {
              id: `ch_${Math.random().toString(36).substring(2, 9)}`,
              paid: true,
              captured: true,
              refunded: false,
            },
          ],
          fee_breakdown: {
            processing_fee: rail.fee,
            net_settlement: Number(netAmount),
          },
          signature: signature,
        },
        null,
        2
      )
    );

    await wait(600);

    // Step 5: T+0 / T+1 Settlement & Recon
    curMs += 520;
    addLog(`Settlement automated via ${rail.settlementTime}. Bank MT940 / CAMT.053 reconciliation matched 100%.`, "ok", "RECON MATCHED");
    setState("RECONCILED");
    setAllDone(true);
    addLog(`Transaction completed with ZERO duplicate charges and balanced double-entry ledger.`, "head", "SUCCESS");

    setIsProcessing(false);
  };

  return (
    <section className="g" id="pay-demo">
      <div className="wrap">
        <div className="sechead" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
          <div>
            <p className="eyebrow">Payments &amp; fintech engineering</p>
            <h2>
              Drop the network mid-payment. Nobody gets charged <em>twice</em>.
            </h2>
          </div>
          <p className="lede" style={{ maxWidth: "540px" }}>
            Production-grade payment infrastructure engineered for strict zero-loss consistency. Test network timeouts, duplicate webhooks, and concurrency bursts against atomic idempotency locks and double-entry books.
          </p>
        </div>

        {/* TOP STATUS BAR: Payment Rails & Active Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div className="bay" style={{ padding: "12px 14px" }}>
            <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
              Selected Payment Rail
            </span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {(Object.keys(RAILS) as PaymentRail[]).map((rKey) => {
                const isSelected = activeRail === rKey;
                return (
                  <button
                    key={rKey}
                    id={`rail-${rKey}`}
                    type="button"
                    onClick={() => {
                      if (!isProcessing) {
                        setActiveRail(rKey);
                        setAllDone(false);
                        setState("CREATED");
                      }
                    }}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: isSelected ? "1px solid var(--trace)" : "1px solid var(--rule)",
                      background: isSelected ? "rgba(59, 130, 246, 0.2)" : "var(--bay-2)",
                      color: isSelected ? "var(--trace)" : "var(--muted)",
                      fontSize: "11px",
                      fontFamily: "var(--f-mono)",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: isProcessing ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {rKey.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bay" style={{ padding: "12px 14px" }}>
            <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
              Charge Amount &amp; Currency
            </span>
            <strong style={{ fontSize: "16px", color: "var(--text)", fontFamily: "var(--f-mono)" }}>
              {rail.symbol}{rail.amount.toLocaleString()} {rail.currency}
            </strong>
            <span style={{ fontSize: "10px", color: "var(--dim)", display: "block", marginTop: "2px" }}>
              {rail.railName}
            </span>
          </div>

          <div className="bay" style={{ padding: "12px 14px" }}>
            <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
              Clearing Protocol
            </span>
            <span style={{ fontSize: "12px", color: "var(--trace)", fontFamily: "var(--f-mono)", fontWeight: 600, display: "block" }}>
              {rail.protocol}
            </span>
            <span style={{ fontSize: "10px", color: "var(--ok)", display: "block", marginTop: "2px" }}>
              Settlement: {rail.settlementTime}
            </span>
          </div>

          <div className="bay" style={{ padding: "12px 14px" }}>
            <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
              Ledger Charges Count
            </span>
            <b style={{ fontSize: "18px", color: ledgerCount === 1 ? "var(--ok)" : ledgerCount > 1 ? "#EF4444" : "var(--muted)", fontFamily: "var(--f-display)" }}>
              {ledgerCount} charge {ledgerCount === 1 ? "(Exactly 1)" : ""}
            </b>
            <span style={{ fontSize: "10px", color: "var(--dim)", display: "block", marginTop: "2px" }}>
              Double-entry audit verified
            </span>
          </div>
        </div>

        {/* MAIN INTERACTIVE 2-BAY DECK */}
        <div className="pay" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)", gap: "16px", alignItems: "stretch" }}>
          {/* Left Bay: Payment State Machine & Chaos Suite */}
          <div className="bay" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="bay-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <span style={{ fontWeight: 700 }}>Payment State Machine</span>
              <span style={{ fontSize: "10.5px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
                Key: <code style={{ color: "var(--trace)" }}>{idempotencyKey}</code>
              </span>
            </div>

            {/* Visual State Progression */}
            <div
              style={{
                padding: "20px 16px",
                background: "var(--bay-2)",
                borderBottom: "1px solid var(--rule)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowX: "auto",
                gap: "8px",
              }}
            >
              {STATES.map((s, idx) => {
                const currentIdx = STATES.indexOf(state);
                const isPassed = allDone || idx < currentIdx;
                const isCurrent = !allDone && idx === currentIdx;

                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: "90px" }}>
                    <div
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: "4px",
                        border: isPassed
                          ? "1px solid var(--ok)"
                          : isCurrent
                          ? "1px solid var(--amber)"
                          : "1px solid var(--rule)",
                        background: isPassed
                          ? "rgba(16, 185, 129, 0.12)"
                          : isCurrent
                          ? "rgba(245, 158, 11, 0.18)"
                          : "var(--ink)",
                        color: isPassed ? "var(--ok)" : isCurrent ? "var(--amber)" : "var(--dim)",
                        fontFamily: "var(--f-mono)",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        textAlign: "center",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isPassed ? `✓ ${s}` : isCurrent ? `● ${s}` : s}
                    </div>
                    {idx < STATES.length - 1 && (
                      <span
                        style={{
                          margin: "0 6px",
                          color: idx < currentIdx ? "var(--ok)" : "var(--rule)",
                          fontSize: "12px",
                        }}
                      >
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chaos Scenarios & Trigger Control */}
            <div style={{ padding: "16px", borderBottom: "1px solid var(--rule)", background: "var(--ink)" }}>
              <span style={{ fontSize: "10.5px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "10px" }}>
                Inject Chaos Scenario (Fault Simulation)
              </span>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                <button
                  id="chaos-drop"
                  type="button"
                  onClick={() => setChaosMode("drop")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "4px",
                    textAlign: "left",
                    border: chaosMode === "drop" ? "1px solid #EF4444" : "1px solid var(--rule)",
                    background: chaosMode === "drop" ? "rgba(239, 68, 68, 0.14)" : "var(--bay-2)",
                    color: chaosMode === "drop" ? "#EF4444" : "var(--muted)",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <strong style={{ display: "block" }}>⚡ Network Drop</strong>
                  <span style={{ fontSize: "9.5px", color: "var(--dim)" }}>Socket terminates before response</span>
                </button>

                <button
                  id="chaos-dup-webhook"
                  type="button"
                  onClick={() => setChaosMode("dup_webhook")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "4px",
                    textAlign: "left",
                    border: chaosMode === "dup_webhook" ? "1px solid var(--amber)" : "1px solid var(--rule)",
                    background: chaosMode === "dup_webhook" ? "rgba(245, 158, 11, 0.14)" : "var(--bay-2)",
                    color: chaosMode === "dup_webhook" ? "var(--amber)" : "var(--muted)",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <strong style={{ display: "block" }}>↻ Duplicate Webhook</strong>
                  <span style={{ fontSize: "9.5px", color: "var(--dim)" }}>Out-of-order replay delivery</span>
                </button>

                <button
                  id="chaos-double-click"
                  type="button"
                  onClick={() => setChaosMode("double_click")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "4px",
                    textAlign: "left",
                    border: chaosMode === "double_click" ? "1px solid #8B5CF6" : "1px solid var(--rule)",
                    background: chaosMode === "double_click" ? "rgba(139, 92, 246, 0.14)" : "var(--bay-2)",
                    color: chaosMode === "double_click" ? "#8B5CF6" : "var(--muted)",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <strong style={{ display: "block" }}>⚡ Double-Click Burst</strong>
                  <span style={{ fontSize: "9.5px", color: "var(--dim)" }}>Concurrent 12ms race condition</span>
                </button>

                <button
                  id="chaos-clean"
                  type="button"
                  onClick={() => setChaosMode("clean")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "4px",
                    textAlign: "left",
                    border: chaosMode === "clean" ? "1px solid var(--ok)" : "1px solid var(--rule)",
                    background: chaosMode === "clean" ? "rgba(16, 185, 129, 0.14)" : "var(--bay-2)",
                    color: chaosMode === "clean" ? "var(--ok)" : "var(--muted)",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <strong style={{ display: "block" }}>✓ Clean Path</strong>
                  <span style={{ fontSize: "9.5px", color: "var(--dim)" }}>Nominal happy flow</span>
                </button>
              </div>

              {/* Pay Action CTA Button */}
              <button
                id="payBtn"
                type="button"
                className="btn primary"
                disabled={isProcessing}
                onClick={handleExecutePayment}
                style={{
                  width: "100%",
                  padding: "12px 18px",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                }}
              >
                {isProcessing ? (
                  <span>Processing {rail.name}...</span>
                ) : (
                  <span>
                    Initiate {rail.symbol}{rail.amount.toLocaleString()} Charge via {rail.name}
                  </span>
                )}
              </button>
            </div>

            {/* Bottom Card: Double Entry Journal Details (Fills remaining height) */}
            <div
              style={{
                flex: 1,
                padding: "14px 16px",
                background: "var(--bay-2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
                fontSize: "11px",
                fontFamily: "var(--f-mono)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Automated Double-Entry Ledger Posting
                </span>
                <span style={{ color: journalEntries.length > 0 ? "var(--ok)" : "var(--dim)", fontSize: "10px" }}>
                  {journalEntries.length > 0 ? "● BALANCED (Σ DR == Σ CR)" : "Awaiting settlement"}
                </span>
              </div>

              <div style={{ display: "grid", gap: "6px" }}>
                {journalEntries.length === 0 ? (
                  <div style={{ color: "var(--dim)", fontStyle: "italic", padding: "8px 0" }}>
                    Run a charge above to view real-time journal debits, credits, and escrow allocation.
                  </div>
                ) : (
                  journalEntries.map((j, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "4px 8px",
                        background: "var(--ink)",
                        borderRadius: "3px",
                        border: "1px solid var(--rule)",
                      }}
                    >
                      <span>
                        <span style={{ color: j.type === "DR" ? "#3B82F6" : "var(--amber)", fontWeight: 700, marginRight: "6px" }}>
                          [{j.type}]
                        </span>
                        {j.account}
                      </span>
                      <strong style={{ color: "var(--text)" }}>{j.amount}</strong>
                    </div>
                  ))
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.08)",
                  fontSize: "10px",
                  color: "var(--dim)",
                }}
              >
                <span>Compliance: PCI-DSS v4.0 / RBI Guidelines</span>
                <span>Audit Lock: Immutable Append-Only</span>
              </div>
            </div>
          </div>

          {/* Right Bay: Server Logs, Webhook Payload & Signature Inspector */}
          <div className="bay" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Bay Header with Tab Switcher */}
            <div
              className="bay-head"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                padding: "8px 12px",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  type="button"
                  onClick={() => setActiveTab("logs")}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "3px",
                    border: activeTab === "logs" ? "1px solid var(--trace)" : "1px solid transparent",
                    background: activeTab === "logs" ? "var(--bay-2)" : "transparent",
                    color: activeTab === "logs" ? "var(--text)" : "var(--muted)",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: activeTab === "logs" ? 600 : 400,
                  }}
                >
                  Live Server Telemetry
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("webhook")}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "3px",
                    border: activeTab === "webhook" ? "1px solid var(--trace)" : "1px solid transparent",
                    background: activeTab === "webhook" ? "var(--bay-2)" : "transparent",
                    color: activeTab === "webhook" ? "var(--text)" : "var(--muted)",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: activeTab === "webhook" ? 600 : 400,
                  }}
                >
                  Webhook Payload JSON
                </button>
              </div>

              <span style={{ fontSize: "10px", color: "var(--trace)", fontFamily: "var(--f-mono)" }}>
                IDEMPOTENCY LOCK: SECURE
              </span>
            </div>

            {/* Content Tab 1: Live Logs */}
            {activeTab === "logs" && (
              <div
                className="plog"
                style={{
                  flex: 1,
                  minHeight: "360px",
                  maxHeight: "480px",
                  overflowY: "auto",
                  padding: "12px 14px",
                  fontSize: "11px",
                  lineHeight: "1.7",
                }}
              >
                {logs.map((log, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <span className="t">+{String(log.ms).padStart(4, "0")}ms</span>{" "}
                      <span
                        className={log.type || ""}
                        style={{
                          color:
                            log.type === "bad"
                              ? "#EF4444"
                              : log.type === "ok"
                              ? "var(--ok)"
                              : log.type === "a"
                              ? "var(--amber)"
                              : log.type === "head"
                              ? "var(--trace)"
                              : "var(--muted)",
                          fontWeight: log.type === "head" ? 600 : 400,
                        }}
                      >
                        {log.text}
                      </span>
                    </div>
                    {log.badge && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontFamily: "var(--f-mono)",
                          padding: "1px 5px",
                          borderRadius: "3px",
                          background:
                            log.type === "bad"
                              ? "rgba(239, 68, 68, 0.18)"
                              : log.type === "ok"
                              ? "rgba(16, 185, 129, 0.18)"
                              : log.type === "a"
                              ? "rgba(245, 158, 11, 0.18)"
                              : "rgba(255, 255, 255, 0.08)",
                          color:
                            log.type === "bad"
                              ? "#EF4444"
                              : log.type === "ok"
                              ? "var(--ok)"
                              : log.type === "a"
                              ? "var(--amber)"
                              : "var(--dim)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {log.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Content Tab 2: Webhook Payload JSON */}
            {activeTab === "webhook" && (
              <div
                style={{
                  flex: 1,
                  minHeight: "360px",
                  maxHeight: "480px",
                  overflowY: "auto",
                  padding: "12px 14px",
                  background: "var(--ink)",
                  fontFamily: "var(--f-mono)",
                  fontSize: "11px",
                  color: "#C9D1E2",
                }}
              >
                {webhookPayload ? (
                  <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                    {webhookPayload}
                  </pre>
                ) : (
                  <div style={{ color: "var(--dim)", fontStyle: "italic", paddingTop: "20px", textAlign: "center" }}>
                    No webhook received yet. Execute a payment to inspect the signed HMAC-SHA256 payload.
                  </div>
                )}
              </div>
            )}

            {/* Bottom Status Footnote */}
            <div
              style={{
                padding: "10px 14px",
                borderTop: "1px solid var(--rule)",
                background: "var(--ink)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "10.5px",
                fontFamily: "var(--f-mono)",
              }}
            >
              <span style={{ color: "var(--dim)" }}>Strict Idempotency Check:</span>
              <strong style={{ color: "var(--ok)" }}>ACTIVE (0 Double-Charges)</strong>
            </div>
          </div>
        </div>

        <p className="proof" style={{ marginTop: "16px" }}>
          <span>Competency on display: Zero-downtime distributed idempotency, UPI 2.0 / 3DS 2.2 tokenization, double-entry ledger reconciliation, ISO 20022 message bus.</span>
          <a href="/fintech-payments/">Explore payments &amp; fintech engineering →</a>
        </p>
      </div>
    </section>
  );
}
