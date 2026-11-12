"use client";

import AppStudioInstrument from "./instruments/AppStudioInstrument";
import PlannerInstrument from "./instruments/PlannerInstrument";
import AIBlueprintInstrument from "./instruments/AIBlueprintInstrument";
import PlatformInstrument from "./instruments/PlatformInstrument";
import BlockchainInstrument from "./instruments/BlockchainInstrument";
import TradingBotInstrument from "./instruments/TradingBotInstrument";
import RealtimeScaleInstrument from "./instruments/RealtimeScaleInstrument";
import PaymentsInstrument from "./instruments/PaymentsInstrument";

export default function FirstLogicInstrumentSuite() {
  return (
    <div className="firstlogic-instrument-suite w-full text-left font-sans flex flex-col space-y-12">
      <link rel="stylesheet" href="/instruments.css" />
      <AppStudioInstrument />
      <PlannerInstrument />
      <AIBlueprintInstrument />
      <PlatformInstrument />
      <BlockchainInstrument />
      <TradingBotInstrument />
      <RealtimeScaleInstrument />
      <PaymentsInstrument />
    </div>
  );
}
