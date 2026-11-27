"use client";

import { useState } from "react";

type PlatformType = "android" | "ios" | "windows" | "macos" | "web";
type ScreenTab = "book" | "consultants" | "history";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  rating: string;
  reviews: number;
  doctor: string;
  doctorRole: string;
  badge?: string;
  avatar: string;
}

export default function PlatformInstrument() {
  const [platform, setPlatform] = useState<PlatformType>("web");
  const [activeTab, setActiveTab] = useState<ScreenTab>("book");
  const [viewStep, setViewStep] = useState<"services" | "detail" | "slots" | "confirmed">("services");

  const [selectedServiceId, setSelectedServiceId] = useState<string>("rehab");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM");
  const [patientName, setPatientName] = useState<string>("Alex Morgan");
  const [isHomeVisit, setIsHomeVisit] = useState<boolean>(true);
  const [reminderNotification, setReminderNotification] = useState<boolean>(true);

  const services: ServiceItem[] = [
    {
      id: "rehab",
      name: "Orthopedic Rehab",
      category: "Physical Therapy",
      duration: "60 min",
      price: "$95",
      rating: "4.9",
      reviews: 142,
      doctor: "Dr. Sarah Chen, DPT",
      doctorRole: "Senior Sports Physiotherapist",
      badge: "Popular",
      avatar: "SC",
    },
    {
      id: "telehealth",
      name: "Video Consultation",
      category: "Telehealth HD",
      duration: "30 min",
      price: "$45",
      rating: "4.8",
      reviews: 98,
      doctor: "Dr. Marcus Vance, MD",
      doctorRole: "Orthopedic Surgeon & Specialist",
      badge: "Fast Track",
      avatar: "MV",
    },
    {
      id: "neuro",
      name: "Neuro Recovery",
      category: "Motor Rehabilitation",
      duration: "75 min",
      price: "$130",
      rating: "5.0",
      reviews: 64,
      doctor: "Dr. Elena Rostova",
      doctorRole: "Clinical Neurotherapist",
      avatar: "ER",
    },
    {
      id: "spine",
      name: "Spinal Decompression",
      category: "Posture & Spine Care",
      duration: "45 min",
      price: "$80",
      rating: "4.9",
      reviews: 112,
      doctor: "Dr. Tariq Al-Mansoor",
      doctorRole: "Spine & Posture Biomechanist",
      badge: "In-Clinic",
      avatar: "TM",
    },
  ];

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const availableSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "02:15 PM", available: true },
    { time: "03:45 PM", available: true },
    { time: "05:00 PM", available: false },
  ];

  const isLaptop = platform === "web";
  const isDesktopMonitor = platform === "macos" || platform === "windows";
  const isMobile = platform === "ios" || platform === "android";

  const componentTreeLogs: Record<string, string[]> = {
    services: [
      "App (Single Shared Codebase)",
      ` └ ${platform.toUpperCase()} AdaptiveScaffold`,
      isMobile ? "   ├ HeaderAppBar (Status bar & Navigation)" : "   ├ DesktopWindowChrome (Window controls & Title)",
      isMobile ? "   ├ CategoryPills(selected: 'All Specialties')" : "   ├ SplitNavigationLayout (Sidebar + Care Directory)",
      "   ├ ServiceCardsGrid / ListView (virtualized)",
      `   │  └ CardItem(${currentService.name}) ◂ tap to inspect`,
      isMobile ? "   └ BottomNavBar (tabs: [Care, Doctors, History])" : "   └ DesktopStatusBar (SQLite: Synced · 12ms)",
    ],
    detail: [
      "App (Single Shared Codebase)",
      ` └ ${platform.toUpperCase()} AdaptiveScaffold`,
      isMobile ? "   ├ NavigationBar(back: true)" : "   ├ WindowTitleBar(title: 'Specialist Detail')",
      `   ├ DoctorHeroCard(${currentService.doctor})`,
      "   ├ ServiceSpecificationSheet",
      "   │  ├ Toggle(In-home GPS Visit vs Clinic)",
      "   │  └ PricingSummaryRow(currency: USD/QAR)",
      "   └ PrimaryActionCTA('Select Appointment Slot') ◂ tap",
    ],
    slots: [
      "App (Single Shared Codebase)",
      ` └ ${platform.toUpperCase()} AdaptiveScaffold`,
      isMobile ? "   ├ NavigationBar(back: true)" : "   ├ WindowTitleBar(title: 'Schedule Appointment')",
      "   ├ DatePickerTimeline(Tomorrow, Dec 2)",
      "   ├ TimeSlotGrid(6 slots, capacity: 4 open)",
      `   │  └ SelectedTimeChip('${selectedSlot}') ◂ active`,
      "   ├ PatientField(value: 'Alex Morgan')",
      "   └ ConfirmationCTA('Book Now & Sync Calendar') ◂ click",
    ],
    confirmed: [
      "App (Single Shared Codebase)",
      ` └ ${platform.toUpperCase()} AdaptiveScaffold`,
      "   ├ SuccessHeroBadge(animated: checkmark)",
      "   ├ BookingPassCard(Ticket #FL-9428)",
      "   ├ RealtimeSyncBadge(status: 'State synced to all devices')",
      "   └ ActionRow(Add to Calendar, Reschedule, Share)",
    ],
  };

  return (
    <section className="g" id="platform-demo">
      <div className="wrap">
        <div className="sechead">
          <div>
            <p className="eyebrow">
              Every platform · Single core logic
            </p>
            <h2>
              One product. <em>Five</em> platforms. Try it.
            </h2>
          </div>
          <p className="lede">
            A working booking flow with real state. Switch between Android, iOS, Windows, macOS and Web: the product adapts to each platform with authentic hardware frames and your booking survives the switch.
          </p>
        </div>

        {/* Platform Selector Chips */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "28px",
            padding: "12px 18px",
            background: "var(--bay)",
            borderRadius: "6px",
            border: "1px solid var(--rule)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", fontFamily: "var(--f-mono)", color: "var(--trace)", textTransform: "uppercase" }}>
              Active Form Factor:
            </span>
            <strong style={{ fontSize: "13px", color: "var(--text)" }}>
              {platform === "web" ? "MacBook Laptop (Browser Web Chrome)" :
               platform === "macos" ? "iMac Desktop Display (macOS Native Cocoa)" :
               platform === "windows" ? "Desktop Workstation (Windows 11 Fluent)" :
               platform === "ios" ? "iPhone 16 Pro (Apple iOS)" :
               "Google Pixel (Android 15 Material 3)"}
            </strong>
          </div>

          <div className="chips" role="group" aria-label="Platform" style={{ margin: 0 }}>
            {(
              [
                ["android", "Android"],
                ["ios", "iOS"],
                ["windows", "Windows"],
                ["macos", "macOS"],
                ["web", "Web"],
              ] as const
            ).map(([pKey, pLabel]) => (
              <button
                key={pKey}
                type="button"
                className="chip"
                aria-pressed={platform === pKey}
                onClick={() => setPlatform(pKey)}
                style={{
                  fontSize: "12px",
                  padding: "6px 14px",
                  fontWeight: platform === pKey ? 600 : 400,
                  border: platform === pKey ? "1px solid var(--trace)" : "1px solid var(--rule)",
                  color: platform === pKey ? "var(--trace)" : "var(--text)",
                  background: platform === pKey ? "rgba(47, 91, 234, 0.16)" : "var(--bay-2)",
                }}
              >
                {pLabel}
              </button>
            ))}
          </div>
        </div>

        <div
          className="plat-demo"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0, 320px) minmax(0, 1fr)" : "minmax(0, 560px) minmax(0, 1fr)",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {/* DEVICE PREVIEW BAY WITH PHYSICAL HARDWARE FRAMING */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

            {/* 1. MACBOOK LAPTOP FRAME (For "web") */}
            {isLaptop && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "540px",
                  position: "relative",
                  marginBottom: "26px",
                  perspective: "1000px",
                }}
              >
                {/* Laptop Screen Bezel */}
                <div
                  style={{
                    background: "#0B0C10",
                    borderRadius: "16px 16px 2px 2px",
                    padding: "10px 10px 14px",
                    boxShadow: "0 25px 60px -20px rgba(0, 0, 0, 0.95), inset 0 0 0 1.5px #3A3E48",
                    position: "relative",
                  }}
                >
                  {/* Web Camera Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "4px",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#1E2230",
                    }}
                  />

                  {/* Browser Chrome Header */}
                  <div
                    style={{
                      height: "30px",
                      background: "#131722",
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 10px",
                      gap: "12px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {/* Traffic Lights */}
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5F56" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFBD2E" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27C93F" }} />
                    </div>

                    {/* URL Bar */}
                    <div
                      style={{
                        flex: 1,
                        background: "#090B10",
                        borderRadius: "4px",
                        padding: "2px 12px",
                        fontSize: "10.5px",
                        fontFamily: "var(--f-mono)",
                        color: "#94A3B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ color: "#64748B" }}>🔒</span>
                      <span>firstlogicmetalab.com/care/book</span>
                    </div>
                  </div>

                  {/* DOCTOR HEALTHCARE APP WORKSPACE (LAPTOP VIEW) */}
                  <div
                    style={{
                      background: "#0E1322",
                      minHeight: "300px",
                      display: "grid",
                      gridTemplateColumns: "135px 1fr",
                      overflow: "hidden",
                      borderRadius: "0 0 6px 6px",
                      color: "#FFFFFF",
                    }}
                  >
                    {/* Left Sidebar */}
                    <div
                      style={{
                        background: "rgba(18, 26, 44, 0.95)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "12px 8px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <span style={{ fontSize: "9px", fontFamily: "var(--f-mono)", color: "var(--trace)", textTransform: "uppercase", paddingLeft: "6px", marginBottom: "4px" }}>
                          CARE CLINIC
                        </span>
                        <button
                          type="button"
                          onClick={() => { setActiveTab("book"); setViewStep("services"); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 8px",
                            borderRadius: "5px",
                            border: "none",
                            background: activeTab === "book" ? "var(--trace)" : "transparent",
                            color: activeTab === "book" ? "#fff" : "#94A3B8",
                            fontSize: "11px",
                            fontWeight: activeTab === "book" ? 600 : 400,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span>🩺</span> Care
                        </button>
                        <button
                          type="button"
                          onClick={() => { setActiveTab("consultants"); setViewStep("detail"); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 8px",
                            borderRadius: "5px",
                            border: "none",
                            background: activeTab === "consultants" ? "var(--trace)" : "transparent",
                            color: activeTab === "consultants" ? "#fff" : "#94A3B8",
                            fontSize: "11px",
                            fontWeight: activeTab === "consultants" ? 600 : 400,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span>👨‍⚕️</span> Doctors
                        </button>
                        <button
                          type="button"
                          onClick={() => { setActiveTab("history"); setViewStep("confirmed"); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 8px",
                            borderRadius: "5px",
                            border: "none",
                            background: activeTab === "history" ? "var(--trace)" : "transparent",
                            color: activeTab === "history" ? "#fff" : "#94A3B8",
                            fontSize: "11px",
                            fontWeight: activeTab === "history" ? 600 : 400,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span>📋</span> History
                        </button>
                      </div>

                      <div style={{ background: "rgba(255, 255, 255, 0.04)", borderRadius: "4px", padding: "6px", fontSize: "9px", color: "#64748B" }}>
                        <span style={{ color: "#10B981", display: "block" }}>● Web PWA</span>
                        <span>Offline Synced</span>
                      </div>
                    </div>

                    {/* Right Content View */}
                    <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
                      {/* Step 1: Services Directory */}
                      {viewStep === "services" && (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <strong style={{ fontSize: "13.5px", color: "#FFFFFF" }}>Clinical Services</strong>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8", display: "block" }}>Doha, Qatar · In-Home Specialist Care</span>
                            </div>
                            <span style={{ fontSize: "9.5px", background: "rgba(47, 91, 234, 0.2)", color: "#60A5FA", padding: "2px 7px", borderRadius: "10px" }}>
                              4 Available
                            </span>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            {services.map((svc) => (
                              <div id={`svc-${svc.id}`} key={svc.id} onClick={() => { setSelectedServiceId(svc.id); setViewStep("detail"); }}
                                style={{
                                  background: selectedServiceId === svc.id ? "rgba(47, 91, 234, 0.2)" : "rgba(25, 34, 58, 0.7)",
                                  border: selectedServiceId === svc.id ? "1.5px solid #3B82F6" : "1px solid rgba(255, 255, 255, 0.08)",
                                  borderRadius: "8px",
                                  padding: "10px",
                                  cursor: "pointer",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  gap: "6px",
                                }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                  <div>
                                    <strong style={{ fontSize: "12px", color: "#fff", display: "block" }}>{svc.name}</strong>
                                    <span style={{ fontSize: "10px", color: "#94A3B8" }}>{svc.doctor}</span>
                                  </div>
                                  <strong style={{ fontSize: "12px", color: "#38BDF8" }}>{svc.price}</strong>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", color: "#64748B" }}>
                                  <span>⏱ {svc.duration}</span>
                                  <span style={{ color: "#FBBF24" }}>★ {svc.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Step 2: Doctor Detail */}
                      {viewStep === "detail" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                          <div style={{ background: "rgba(25, 34, 58, 0.8)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #60A5FA)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "11px" }}>
                                {currentService.avatar}
                              </div>
                              <div>
                                <strong style={{ fontSize: "13px", color: "#fff", display: "block" }}>{currentService.doctor}</strong>
                                <span style={{ fontSize: "10px", color: "#94A3B8" }}>{currentService.doctorRole}</span>
                              </div>
                            </div>
                            <span style={{ fontSize: "9.5px", color: "#10B981", display: "block", marginTop: "8px" }}>✓ Verified Medical Practitioner · QCHP</span>
                            <p style={{ fontSize: "10.5px", color: "#CBD5E1", lineHeight: 1.4, marginTop: "6px" }}>
                              Specializing in acute rehabilitative therapy, biometric assessment, and post-surgical recovery plans.
                            </p>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "rgba(25, 34, 58, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8" }}>In-Home Visit:</span>
                              <input type="checkbox" checked={isHomeVisit} onChange={(e) => setIsHomeVisit(e.target.checked)} style={{ accentColor: "var(--trace)" }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8" }}>SMS Push Alert:</span>
                              <input type="checkbox" checked={reminderNotification} onChange={(e) => setReminderNotification(e.target.checked)} style={{ accentColor: "var(--trace)" }} />
                            </div>
                            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <strong style={{ fontSize: "15px", color: "#38BDF8" }}>{currentService.price}</strong>
                              <button
                                type="button"
                                onClick={() => setViewStep("slots")}
                                style={{ background: "var(--trace)", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                              >
                                Select Slot →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Slots */}
                      {viewStep === "slots" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <strong style={{ fontSize: "12.5px", color: "#fff" }}>Available Slots Tomorrow ({currentService.name})</strong>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                            {availableSlots.map((slot) => {
                              const isSelected = selectedSlot === slot.time;
                              return (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedSlot(slot.time)}
                                  style={{
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: isSelected ? "1.5px solid #3B82F6" : "1px solid rgba(255, 255, 255, 0.1)",
                                    background: isSelected ? "rgba(47, 91, 234, 0.3)" : slot.available ? "rgba(25, 34, 58, 0.7)" : "rgba(20, 26, 42, 0.4)",
                                    color: isSelected ? "#60A5FA" : slot.available ? "#FFFFFF" : "#64748B",
                                    cursor: slot.available ? "pointer" : "not-allowed",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {slot.time}
                                </button>
                              );
                            })}
                          </div>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                            <input
                              type="text"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              placeholder="Patient full name"
                              style={{ flex: 1, background: "rgba(19, 26, 44, 0.9)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#fff" }}
                            />
                            <button
                              type="button"
                              onClick={() => setViewStep("confirmed")}
                              style={{ background: "var(--trace)", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontSize: "11.5px", fontWeight: 700, cursor: "pointer" }}
                            >
                              Confirm Booking ({selectedSlot})
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Confirmed */}
                      {viewStep === "confirmed" && (
                        <div style={{ background: "rgba(25, 34, 58, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#10B981", color: "#fff", display: "grid", placeItems: "center", fontSize: "11px" }}>✓</span>
                              <strong style={{ fontSize: "13.5px", color: "#fff" }}>Booking Confirmed: {currentService.name}</strong>
                            </div>
                            <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                              {currentService.doctor} · Tomorrow at {selectedSlot} · Patient: {patientName}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setViewStep("services")}
                            style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", cursor: "pointer" }}
                          >
                            Book Another
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* MacBook Aluminum Laptop Base & Notch */}
                <div
                  style={{
                    position: "relative",
                    width: "108%",
                    left: "-4%",
                    height: "12px",
                    background: "linear-gradient(180deg, #D5D9E1, #9499A5 45%, #6E7380)",
                    borderRadius: "2px 2px 14px 14px",
                    boxShadow: "0 16px 30px -8px rgba(0,0,0,0.9)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      transform: "translateX(-50%)",
                      width: "60px",
                      height: "4px",
                      background: "#5B6170",
                      borderRadius: "0 0 4px 4px",
                    }}
                  />
                </div>
              </div>
            )}

            {/* 2. DESKTOP IMAC MONITOR WITH METALLIC STAND (For "macos" and "windows") */}
            {isDesktopMonitor && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  position: "relative",
                  marginBottom: "46px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* iMac Display Screen */}
                <div
                  style={{
                    width: "100%",
                    background: "#0B0C10",
                    borderRadius: "10px",
                    padding: "8px",
                    boxShadow: "0 30px 70px -25px rgba(0, 0, 0, 0.95), inset 0 0 0 1.5px #3A3E48",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {/* Native App Window Chrome */}
                  <div
                    style={{
                      height: "32px",
                      background: "#161C2A",
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 12px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      position: "relative",
                    }}
                  >
                    {platform === "macos" ? (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F56" }} />
                        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FFBD2E" }} />
                        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#27C93F" }} />
                      </div>
                    ) : (
                      <div style={{ fontSize: "11px", color: "#94A3B8" }}>⊞ FirstLogic Care · WinUI 3</div>
                    )}

                    <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#CBD5E1", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                      Clinical Operations Workstation
                    </span>

                    {platform === "windows" && (
                      <div style={{ display: "flex", gap: "10px", color: "#94A3B8", fontSize: "11px" }}>
                        <span>—</span>
                        <span>☐</span>
                        <span>✕</span>
                      </div>
                    )}
                  </div>

                  {/* iMac Desktop Inner Grid */}
                  <div
                    style={{
                      background: "#0E1322",
                      minHeight: "280px",
                      display: "grid",
                      gridTemplateColumns: "135px 1fr",
                      overflow: "hidden",
                      borderRadius: "0 0 6px 6px",
                      color: "#FFFFFF",
                    }}
                  >
                    {/* Left Sidebar */}
                    <div
                      style={{
                        background: "rgba(18, 26, 44, 0.95)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "12px 8px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <span style={{ fontSize: "9px", fontFamily: "var(--f-mono)", color: "var(--trace)", textTransform: "uppercase", paddingLeft: "6px", marginBottom: "4px" }}>
                          NAVIGATOR
                        </span>
                        <button
                          type="button"
                          onClick={() => { setActiveTab("book"); setViewStep("services"); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 8px",
                            borderRadius: "5px",
                            border: "none",
                            background: activeTab === "book" ? "var(--trace)" : "transparent",
                            color: activeTab === "book" ? "#fff" : "#94A3B8",
                            fontSize: "11px",
                            fontWeight: activeTab === "book" ? 600 : 400,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span>🩺</span> Care
                        </button>
                        <button
                          type="button"
                          onClick={() => { setActiveTab("consultants"); setViewStep("detail"); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 8px",
                            borderRadius: "5px",
                            border: "none",
                            background: activeTab === "consultants" ? "var(--trace)" : "transparent",
                            color: activeTab === "consultants" ? "#fff" : "#94A3B8",
                            fontSize: "11px",
                            fontWeight: activeTab === "consultants" ? 600 : 400,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span>👨‍⚕️</span> Doctors
                        </button>
                        <button
                          type="button"
                          onClick={() => { setActiveTab("history"); setViewStep("confirmed"); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 8px",
                            borderRadius: "5px",
                            border: "none",
                            background: activeTab === "history" ? "var(--trace)" : "transparent",
                            color: activeTab === "history" ? "#fff" : "#94A3B8",
                            fontSize: "11px",
                            fontWeight: activeTab === "history" ? 600 : 400,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span>📋</span> History
                        </button>
                      </div>

                      <div style={{ background: "rgba(255, 255, 255, 0.04)", borderRadius: "4px", padding: "6px", fontSize: "9px", color: "#64748B" }}>
                        <span style={{ color: "#10B981", display: "block" }}>● Local SQLite</span>
                        <span>Multi-Region Sync</span>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
                      {viewStep === "services" && (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <strong style={{ fontSize: "13.5px", color: "#FFFFFF" }}>Clinical Services</strong>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8", display: "block" }}>Doha, Qatar · In-Home Specialist Care</span>
                            </div>
                            <span style={{ fontSize: "9.5px", background: "rgba(47, 91, 234, 0.2)", color: "#60A5FA", padding: "2px 7px", borderRadius: "10px" }}>
                              4 Available
                            </span>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            {services.map((svc) => (
                              <div id={`svc-${svc.id}`} key={svc.id} onClick={() => { setSelectedServiceId(svc.id); setViewStep("detail"); }}
                                style={{
                                  background: selectedServiceId === svc.id ? "rgba(47, 91, 234, 0.2)" : "rgba(25, 34, 58, 0.7)",
                                  border: selectedServiceId === svc.id ? "1.5px solid #3B82F6" : "1px solid rgba(255, 255, 255, 0.08)",
                                  borderRadius: "8px",
                                  padding: "10px",
                                  cursor: "pointer",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  gap: "6px",
                                }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                  <div>
                                    <strong style={{ fontSize: "12px", color: "#fff", display: "block" }}>{svc.name}</strong>
                                    <span style={{ fontSize: "10px", color: "#94A3B8" }}>{svc.doctor}</span>
                                  </div>
                                  <strong style={{ fontSize: "12px", color: "#38BDF8" }}>{svc.price}</strong>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", color: "#64748B" }}>
                                  <span>⏱ {svc.duration}</span>
                                  <span style={{ color: "#FBBF24" }}>★ {svc.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {viewStep === "detail" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
                          <div style={{ background: "rgba(25, 34, 58, 0.8)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #60A5FA)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "11px" }}>
                                {currentService.avatar}
                              </div>
                              <div>
                                <strong style={{ fontSize: "13px", color: "#fff", display: "block" }}>{currentService.doctor}</strong>
                                <span style={{ fontSize: "10px", color: "#94A3B8" }}>{currentService.doctorRole}</span>
                              </div>
                            </div>
                            <span style={{ fontSize: "9.5px", color: "#10B981", display: "block", marginTop: "8px" }}>✓ Verified Medical Practitioner · QCHP</span>
                            <p style={{ fontSize: "10.5px", color: "#CBD5E1", lineHeight: 1.4, marginTop: "6px" }}>
                              Specializing in acute rehabilitative therapy, biometric assessment, and post-surgical recovery plans.
                            </p>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "rgba(25, 34, 58, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8" }}>In-Home Visit:</span>
                              <input type="checkbox" checked={isHomeVisit} onChange={(e) => setIsHomeVisit(e.target.checked)} style={{ accentColor: "var(--trace)" }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8" }}>SMS Push Alert:</span>
                              <input type="checkbox" checked={reminderNotification} onChange={(e) => setReminderNotification(e.target.checked)} style={{ accentColor: "var(--trace)" }} />
                            </div>
                            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <strong style={{ fontSize: "15px", color: "#38BDF8" }}>{currentService.price}</strong>
                              <button
                                type="button"
                                onClick={() => setViewStep("slots")}
                                style={{ background: "var(--trace)", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                              >
                                Select Slot →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {viewStep === "slots" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <strong style={{ fontSize: "12.5px", color: "#fff" }}>Available Slots Tomorrow ({currentService.name})</strong>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                            {availableSlots.map((slot) => {
                              const isSelected = selectedSlot === slot.time;
                              return (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedSlot(slot.time)}
                                  style={{
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: isSelected ? "1.5px solid #3B82F6" : "1px solid rgba(255, 255, 255, 0.1)",
                                    background: isSelected ? "rgba(47, 91, 234, 0.3)" : slot.available ? "rgba(25, 34, 58, 0.7)" : "rgba(20, 26, 42, 0.4)",
                                    color: isSelected ? "#60A5FA" : slot.available ? "#FFFFFF" : "#64748B",
                                    cursor: slot.available ? "pointer" : "not-allowed",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {slot.time}
                                </button>
                              );
                            })}
                          </div>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                            <input
                              type="text"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              placeholder="Patient full name"
                              style={{ flex: 1, background: "rgba(19, 26, 44, 0.9)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#fff" }}
                            />
                            <button
                              type="button"
                              onClick={() => setViewStep("confirmed")}
                              style={{ background: "var(--trace)", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontSize: "11.5px", fontWeight: 700, cursor: "pointer" }}
                            >
                              Confirm Booking ({selectedSlot})
                            </button>
                          </div>
                        </div>
                      )}

                      {viewStep === "confirmed" && (
                        <div style={{ background: "rgba(25, 34, 58, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#10B981", color: "#fff", display: "grid", placeItems: "center", fontSize: "11px" }}>✓</span>
                              <strong style={{ fontSize: "13.5px", color: "#fff" }}>Booking Confirmed: {currentService.name}</strong>
                            </div>
                            <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                              {currentService.doctor} · Tomorrow at {selectedSlot} · Patient: {patientName}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setViewStep("services")}
                            style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", cursor: "pointer" }}
                          >
                            Book Another
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* REAL METALLIC STAND NECK (ANGLED) */}
                <div
                  style={{
                    width: "68px",
                    height: "36px",
                    background: "linear-gradient(90deg, #8C919C, #D1D5DB 50%, #8C919C)",
                    clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)",
                    marginTop: "-1px",
                    zIndex: 1,
                  }}
                />

                {/* METALLIC HORIZONTAL FOOT BASE */}
                <div
                  style={{
                    width: "160px",
                    height: "7px",
                    borderRadius: "4px",
                    background: "linear-gradient(180deg, #E5E7EB, #9CA3AF)",
                    boxShadow: "0 14px 22px -6px rgba(0, 0, 0, 0.8)",
                  }}
                />
              </div>
            )}

            {/* 3. SMARTPHONE (iOS / ANDROID) */}
            {isMobile && (
              <div
                style={{
                  width: "240px",
                  borderRadius: platform === "ios" ? "38px" : "24px",
                  background: "linear-gradient(145deg, #3A3F4B, #15181F 40%, #2A2E38 70%, #0E1015)",
                  padding: "8px",
                  boxShadow: "0 40px 80px -30px rgba(0,0,0,0.95), inset 0 0 0 1.5px #565C69",
                  marginBottom: "20px",
                }}
              >
                {/* Mobile Phone Screen */}
                <div
                  style={{
                    background: "#0E1322",
                    borderRadius: platform === "ios" ? "32px" : "18px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Status Bar */}
                  <div
                    style={{
                      height: "26px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 14px",
                      fontSize: "10px",
                      color: "#fff",
                      fontFamily: "var(--f-mono)",
                    }}
                  >
                    <span>9:41</span>
                    <span style={{ fontSize: "9px" }}>5G 100%</span>
                  </div>

                  {/* Header Bar */}
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "rgba(19, 26, 44, 0.95)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {viewStep !== "services" && (
                        <button
                          type="button"
                          onClick={() => setViewStep(viewStep === "confirmed" ? "services" : viewStep === "slots" ? "detail" : "services")}
                          style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", display: "grid", placeItems: "center", fontSize: "11px" }}
                        >
                          ←
                        </button>
                      )}
                      <div>
                        <strong style={{ fontSize: "12px", color: "#fff", display: "block" }}>
                          {viewStep === "services" ? "Care Services" : viewStep === "detail" ? "Doctor Detail" : viewStep === "slots" ? "Select Slot" : "Confirmed"}
                        </strong>
                        <span style={{ fontSize: "9px", color: "#94A3B8" }}>Doha · In-Home Care</span>
                      </div>
                    </div>
                    <span style={{ fontSize: "8.5px", background: "rgba(47, 91, 234, 0.2)", color: "#60A5FA", padding: "2px 6px", borderRadius: "8px" }}>
                      {platform.toUpperCase()}
                    </span>
                  </div>

                  {/* Mobile Screen Content */}
                  <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {viewStep === "services" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {services.map((svc) => (
                          <div id={`svc-${svc.id}`} key={svc.id} onClick={() => { setSelectedServiceId(svc.id); setViewStep("detail"); }}
                            style={{
                              background: selectedServiceId === svc.id ? "rgba(47, 91, 234, 0.2)" : "rgba(25, 34, 58, 0.7)",
                              border: selectedServiceId === svc.id ? "1px solid #3B82F6" : "1px solid rgba(255, 255, 255, 0.08)",
                              borderRadius: "8px",
                              padding: "8px 10px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "linear-gradient(135deg, #1E3A8A, #3B82F6)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: "10px" }}>
                                {svc.avatar}
                              </div>
                              <div>
                                <strong style={{ fontSize: "11.5px", color: "#FFFFFF" }}>{svc.name}</strong>
                                <span style={{ fontSize: "9.5px", color: "#94A3B8", display: "block" }}>{svc.doctor}</span>
                              </div>
                            </div>
                            <strong style={{ fontSize: "11.5px", color: "#38BDF8" }}>{svc.price}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {viewStep === "detail" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ background: "rgba(25, 34, 58, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "10px" }}>
                          <strong style={{ fontSize: "12px", color: "#FFFFFF", display: "block" }}>{currentService.doctor}</strong>
                          <span style={{ fontSize: "9.5px", color: "#94A3B8" }}>{currentService.doctorRole}</span>
                          <span style={{ fontSize: "9px", color: "#10B981", display: "block", marginTop: "2px" }}>✓ Licensed Clinical Care</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px" }}>
                          <strong style={{ fontSize: "14px", color: "#38BDF8" }}>{currentService.price}</strong>
                          <button
                            type="button"
                            onClick={() => setViewStep("slots")}
                            style={{ background: "var(--trace)", color: "#FFFFFF", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                          >
                            Select Slot →
                          </button>
                        </div>
                      </div>
                    )}

                    {viewStep === "slots" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                          {availableSlots.map((slot) => {
                            const isSelected = selectedSlot === slot.time;
                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={!slot.available}
                                onClick={() => setSelectedSlot(slot.time)}
                                style={{
                                  padding: "6px 4px",
                                  borderRadius: "6px",
                                  border: isSelected ? "1.5px solid #3B82F6" : "1px solid rgba(255, 255, 255, 0.1)",
                                  background: isSelected ? "rgba(47, 91, 234, 0.3)" : slot.available ? "rgba(25, 34, 58, 0.7)" : "rgba(20, 26, 42, 0.4)",
                                  color: isSelected ? "#60A5FA" : slot.available ? "#FFFFFF" : "#64748B",
                                  fontSize: "10px",
                                  fontWeight: 600,
                                }}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={() => setViewStep("confirmed")}
                          style={{ marginTop: "4px", background: "var(--trace)", color: "#FFFFFF", border: "none", borderRadius: "6px", padding: "8px 0", fontSize: "11.5px", fontWeight: 700, cursor: "pointer", width: "100%" }}
                        >
                          Confirm ({selectedSlot})
                        </button>
                      </div>
                    )}

                    {viewStep === "confirmed" && (
                      <div style={{ textAlign: "center", padding: "10px 4px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#10B981", margin: "0 auto 6px", display: "grid", placeItems: "center", fontSize: "16px", color: "#fff" }}>
                          ✓
                        </div>
                        <strong style={{ fontSize: "13px", color: "#FFFFFF", display: "block" }}>Confirmed!</strong>
                        <span style={{ fontSize: "10px", color: "#94A3B8" }}>{currentService.doctor} · {selectedSlot}</span>
                        <button
                          type="button"
                          onClick={() => setViewStep("services")}
                          style={{ marginTop: "10px", background: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "10px", cursor: "pointer" }}
                        >
                          Book Another
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mobile Bottom Navigation */}
                  <div
                    style={{
                      height: "38px",
                      background: "rgba(14, 19, 34, 0.98)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      fontSize: "9px",
                      color: "#94A3B8",
                    }}
                  >
                    <div onClick={() => { setActiveTab("book"); setViewStep("services"); }} style={{ textAlign: "center", cursor: "pointer", color: activeTab === "book" ? "#60A5FA" : "#94A3B8" }}>
                      <span>Care</span>
                    </div>
                    <div onClick={() => { setActiveTab("consultants"); setViewStep("detail"); }} style={{ textAlign: "center", cursor: "pointer", color: activeTab === "consultants" ? "#60A5FA" : "#94A3B8" }}>
                      <span>Doctors</span>
                    </div>
                    <div onClick={() => { setActiveTab("history"); setViewStep("confirmed"); }} style={{ textAlign: "center", cursor: "pointer", color: activeTab === "history" ? "#60A5FA" : "#94A3B8" }}>
                      <span>History</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <span style={{ fontSize: "11px", color: "var(--dim)", fontFamily: "var(--f-mono)" }}>
              {isLaptop ? "MacBook Laptop Frame · Web Safari / Chromium View" :
               isDesktopMonitor ? "iMac Desktop Monitor Frame with Stand · Native App View" :
               "Smartphone Frame · Native Touch View"}
            </span>
          </div>

          {/* RIGHT COMPONENT TREE BAY */}
          <div className="bay" style={{ width: "100%", alignSelf: "stretch", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="bay-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600 }}>component tree</span>
              <span style={{ fontSize: "11px", fontFamily: "var(--f-mono)", color: "var(--trace)" }}>
                state: {viewStep} · {platform}
              </span>
            </div>

            <div
              className="tree"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: "12px",
                lineHeight: 1.85,
                padding: "16px",
                background: "var(--bay-2)",
                borderRadius: "4px",
                border: "1px solid var(--rule)",
                overflowX: "auto",
                flex: 1,
              }}
            >
              {componentTreeLogs[viewStep].map((line, i) => (
                <div key={i} style={{ color: line.includes("◂") ? "var(--amber)" : line.includes("AdaptiveScaffold") ? "var(--trace)" : "var(--muted)" }}>
                  {line}
                </div>
              ))}
            </div>

            {/* Parity & State Inspector */}
            <div
              style={{
                background: "var(--ink)",
                border: "1px dashed var(--rule)",
                borderRadius: "4px",
                padding: "12px 14px",
                fontSize: "11.5px",
                fontFamily: "var(--f-mono)",
                color: "var(--dim)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "var(--trace)" }}>Shared State Mirror:</span>
                <span style={{ color: "var(--ok)" }}>● Live Across Platforms</span>
              </div>
              <div>serviceId: &quot;{selectedServiceId}&quot; | slot: &quot;{selectedSlot}&quot;</div>
              <div>patient: &quot;{patientName}&quot; | inHome: {isHomeVisit ? "true" : "false"} | reminders: {reminderNotification ? "true" : "false"}</div>
              <div style={{ marginTop: "4px", color: "var(--muted)", fontSize: "10.5px" }}>
                Switching between Android, iOS, Windows, macOS, and Web preserves your selected doctor appointment &amp; patient session state.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
