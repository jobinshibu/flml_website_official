"use client";

import { useState } from "react";

type PlatformType = "android" | "ios" | "windows" | "macos" | "web";
type ViewType = "home" | "slots" | "done";

export default function PlatformInstrument() {
  const [platform, setPlatform] = useState<PlatformType>("ios");
  const [view, setView] = useState<ViewType>("home");
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const services = [
    ["Home consultation", "45 min · ₹1,200"],
    ["Wellness session", "60 min · ₹800"],
    ["Video consultation", "20 min"],
    ["Rehab programme", "8 sessions"],
  ];

  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const takenSlots = new Set(["12:00", "17:00"]);

  const componentTrees: Record<ViewType, string[]> = {
    home: [
      "App",
      "└ Screen<Home>",
      '  ├ NavBar("Book a visit")',
      "  └ ServiceList",
      "    └ ServiceCard × 4  ◂ tap",
    ],
    slots: [
      "App",
      "└ Screen<Slots>",
      "  ├ NavBar(back)",
      "  └ Stack",
      "    ├ Heading(service)",
      "    ├ SlotGrid  ◂ select",
      "    └ PrimaryButton(confirm)",
    ],
    done: [
      "App",
      "└ Screen<Done>",
      "  └ Center",
      "    ├ AnimatedCheck  ◂ played",
      "    └ Text(booking id)",
    ],
  };

  return (
    <section className="g" id="platform-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Every platform
            </p>
            <h2>
              One product. <em>Five</em> platforms. Try it.
            </h2>
          </div>
          <p className="lede">
            A working booking flow with real state. Switch between Android, iOS, Windows, macOS and Web: the product adapts to each platform and your booking survives the switch.
          </p>
        </div>

        <div className="plat-demo">
          <div>
            {/* Device Frame */}
            <div className={`dev ${platform}`} id="dev">
              <div className="bar">
                <span>9:41</span>
                <span>●●● ▮</span>
              </div>

              {/* App Bar */}
              <div className="appbar">
                {view === "home" && <strong className="ttl">Book a visit</strong>}
                {view === "slots" && (
                  <button
                    className="back"
                    onClick={() => setView("home")}
                  >
                    ‹ Back
                  </button>
                )}
                {view === "done" && <strong className="ttl">Booked</strong>}
              </div>

              {/* Screen Area */}
              <div className="screen">
                {view === "home" && (
                  <>
                    {services.map((s, i) => (
                      <button
                        key={i}
                        className="svc"
                        onClick={() => {
                          setSelectedService(i);
                          setSelectedSlot(null);
                          setView("slots");
                        }}
                      >
                        <span>
                          {s[0]}
                          <small>{s[1]}</small>
                        </span>
                        <span aria-hidden="true">›</span>
                      </button>
                    ))}
                  </>
                )}

                {view === "slots" && selectedService !== null && (
                  <>
                    <div className="full" style={{ font: "700 18px var(--f-sans)" }}>
                      {services[selectedService][0]}
                    </div>
                    <div className="full" style={{ fontSize: "13px", color: "#6A7388" }}>
                      Tomorrow · choose a time
                    </div>
                    <div className="slots full">
                      {slots.map((t) => (
                        <button
                          key={t}
                          className="slot"
                          disabled={takenSlots.has(t)}
                          aria-pressed={selectedSlot === t}
                          onClick={() => setSelectedSlot(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      className="pbtn full"
                      disabled={!selectedSlot}
                      onClick={() => setView("done")}
                    >
                      Confirm {selectedSlot || ""}
                    </button>
                  </>
                )}

                {view === "done" && selectedService !== null && (
                  <div className="done full">
                    <div className="tick">
                      <svg
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                    </div>
                    <div style={{ font: "700 20px var(--f-sans)" }}>You&apos;re booked</div>
                    <div style={{ fontSize: "13px", color: "#6A7388", marginTop: "6px" }}>
                      {services[selectedService][0]} · tomorrow {selectedSlot}
                    </div>
                    <button
                      className="pbtn"
                      style={{ marginTop: "24px" }}
                      onClick={() => setView("home")}
                    >
                      Book another
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Platform Selector Chips */}
            <div
              className="chips"
              role="group"
              aria-label="Platform"
              style={{ justifyContent: "center", marginTop: "16px" }}
            >
              {(["android", "ios", "windows", "macos", "web"] as PlatformType[]).map((p) => (
                <button
                  key={p}
                  className="chip"
                  aria-pressed={platform === p}
                  onClick={() => setPlatform(p)}
                >
                  {p === "ios" ? "iOS" : p === "macos" ? "macOS" : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Component Tree Bay */}
          <div className="bay" style={{ width: "100%" }}>
            <div className="bay-head">
              <span>component tree</span>
              <span id="stateName">state: {view} · {platform}</span>
            </div>
            <div className="tree">
              {componentTrees[view].map((line, i) => (
                <div key={i}>
                  {line.includes("◂") ? (
                    <span className="hot">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

