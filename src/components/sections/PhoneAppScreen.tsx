"use client";

import Image from "next/image";
import { ProjectDetail } from "@/lib/productsData";
import { 
  Search, Bell, ShoppingBag, Utensils, Activity, Car, 
  MapPin, PhoneCall, Check, Star, ArrowUpRight, TrendingUp, 
  ShieldCheck, Heart, Sparkles, Filter, ChevronRight,
  Wrench, Mic, Calendar, UserCheck, MessageSquare, CreditCard,
  Building, Radio, Flame, Award, Clock, ArrowRight, Zap, RefreshCw,
  QrCode, BookOpen, Stethoscope, Share2, Layers, DollarSign,
  Wifi, Battery, Signal, Plus, Minus, Navigation, Volume2, MicOff,
  PhoneOff, Compass, AlertCircle, FileText, CheckCircle2, SlidersHorizontal,
  Home, User, Bookmark, Receipt, Users
} from "lucide-react";

interface Props {
  project: ProjectDetail;
}

// iOS Status Bar component
function IOSStatusBar() {
  return (
    <div className="w-full flex items-center justify-between px-5 pt-3 pb-1 text-white text-[10px] font-semibold select-none z-40 shrink-0">
      <span className="font-mono tracking-tight font-bold">9:41</span>
      <div className="flex items-center gap-1.5 opacity-90">
        <Signal className="w-3 h-3 fill-current" />
        <Wifi className="w-3 h-3" />
        <div className="flex items-center gap-0.5">
          <div className="w-4 h-2 rounded-[2px] border border-white/80 p-0.5 flex items-center">
            <div className="w-2.5 h-full bg-white rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Bottom Tab Navigation Bar
function BottomTabBar({ activeTab, tabs }: { activeTab: string; tabs: { name: string; icon: any }[] }) {
  return (
    <div className="w-full bg-slate-950/95 border-t border-white/10 px-4 py-2 flex items-center justify-around shrink-0 z-40">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = tab.name.toLowerCase() === activeTab.toLowerCase();
        return (
          <div key={idx} className="flex flex-col items-center gap-0.5 cursor-pointer">
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
            <span className={`text-[7px] font-mono ${isActive ? "text-cyan-400 font-bold" : "text-slate-500"}`}>{tab.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function PhoneAppScreen({ project }: Props) {
  const id = project.id.toLowerCase();

  // -------------------------------------------------------------
  // 1. CABCO - On-Demand Ride-Hailing & Taxi Dispatch (RICH NATIVE MAP APP)
  // -------------------------------------------------------------
  if (id === "cabco") {
    return (
      <div className="w-full h-full bg-[#0E131F] text-white flex flex-col justify-between font-sans select-none relative overflow-hidden">
        <IOSStatusBar />

        {/* Realistic Simulated Vector Map Canvas */}
        <div className="absolute inset-0 bg-[#0B111E] overflow-hidden pointer-events-none">
          {/* Stylized Dark Map Grid / Roads */}
          <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <path d="M -20 80 Q 80 120 160 90 T 320 180" fill="none" stroke="#2563EB" strokeWidth="6" />
            <path d="M 40 0 L 100 450" fill="none" stroke="#1E293B" strokeWidth="8" />
            <path d="M 0 220 L 300 210" fill="none" stroke="#1E293B" strokeWidth="12" />
            <path d="M 120 140 L 280 320" fill="none" stroke="#334155" strokeWidth="4" />
            {/* GPS Route Dash */}
            <path d="M 60 130 Q 110 160 150 200 T 210 240" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 3" />
          </svg>

          {/* Map Pins */}
          <div className="absolute top-24 left-12 flex flex-col items-center">
            <div className="bg-emerald-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg">PICKUP</div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black" />
          </div>

          <div className="absolute top-36 right-12 flex flex-col items-center">
            <div className="bg-amber-400 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg">DRIVER (3m)</div>
            <div className="w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-black flex items-center justify-center">
              <Car className="w-2 h-2 text-black" />
            </div>
          </div>
        </div>

        {/* Floating Top Search Bar with Destination & Passenger Details */}
        <div className="relative z-10 px-3 pt-0.5 space-y-1.5">
          <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative w-6 h-6 rounded-lg bg-blue-900/60 border border-blue-400/30 p-0.5 shrink-0 flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="24px" />
              </div>
              <div className="flex-1 truncate">
                <span className="text-[6.5px] font-mono text-cyan-400 block uppercase font-bold">Pick: Downtown Dubai Blvd</span>
                <p className="text-[9px] font-bold text-white truncate">Drop: Dubai Int. Airport Terminal 3</p>
              </div>
            </div>
            <span className="text-[6.5px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold">GPS 3M</span>
          </div>

          {/* Category Scroller (Ride Tiers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {[
              { label: "Comfort Sedan", active: true },
              { label: "Black VIP", active: false },
              { label: "XL 6-Seater", active: false },
              { label: "Airport Flat", active: false }
            ].map((tier, idx) => (
              <span 
                key={idx}
                className={`text-[7px] px-2 py-0.5 rounded-full whitespace-nowrap font-semibold border backdrop-blur-md transition-colors ${
                  tier.active 
                    ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow" 
                    : "bg-slate-950/80 text-slate-300 border-white/10"
                }`}
              >
                {tier.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Booking Drawer */}
        <div className="relative z-10 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-3 pt-2 shadow-2xl space-y-2">
          <div className="w-8 h-1 rounded-full bg-slate-700 mx-auto mb-1" />
          
          <div className="flex items-center justify-between">
            <span className="text-[7.5px] font-mono text-slate-400 tracking-wider font-bold">NEARBY DISPATCH</span>
            <span className="text-[7px] text-emerald-400 font-mono font-bold">No Surge • Fixed Rate</span>
          </div>

          {/* Vehicle Selector */}
          <div className="space-y-1.5">
            <div className="bg-blue-600/15 border border-cyan-500/40 rounded-xl p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-white">Cabco Comfort (Toyota Camry)</p>
                  <p className="text-[6.5px] text-slate-400">3 mins away • Free Wi-Fi & AC</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-cyan-300 block font-mono">AED 38.50</span>
                <span className="text-[6.5px] text-emerald-400 font-bold">Fastest</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-2 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-200">Cabco Black (Lexus ES 300h)</p>
                  <p className="text-[6.5px] text-slate-400">6 mins away • VIP Quiet Ride</p>
                </div>
              </div>
              <span className="text-[9.5px] font-bold text-slate-300 font-mono">AED 62.00</span>
            </div>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25">
            <Car className="w-3 h-3 text-black" />
            <span>CONFIRM CABCO COMFORT (AED 38.50)</span>
          </button>

          {/* Persistent Bottom Tab Bar */}
          <div className="pt-1">
            <BottomTabBar 
              activeTab="Ride" 
              tabs={[
                { name: "Ride", icon: Home },
                { name: "Activity", icon: Clock },
                { name: "Wallet", icon: CreditCard },
                { name: "Account", icon: User }
              ]} 
            />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. COOL TALK - Anonymous Audio Calling (RICH VOICE SOCIAL APP)
  // -------------------------------------------------------------
  if (id === "cool-talk") {
    return (
      <div className="w-full h-full bg-[#070D18] text-white flex flex-col justify-between font-sans select-none relative overflow-hidden">
        <IOSStatusBar />

        {/* Top Header with Live Online Ticker */}
        <div className="px-3 pt-1 pb-2 flex items-center justify-between border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg bg-sky-950 border border-sky-400/30 p-0.5 shrink-0 flex items-center justify-center">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="28px" />
            </div>
            <div>
              <span className="text-[7px] font-mono text-sky-400 font-bold block uppercase">Cool Talk Rooms</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-[9.5px] font-black text-white">Stranger Match</h4>
              </div>
            </div>
          </div>
          <span className="text-[6.5px] font-mono bg-sky-950 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-bold">
            18,240 ONLINE
          </span>
        </div>

        {/* Active Audio Waveform Visualizer Centerpiece */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 text-center space-y-2.5">
          <div className="relative">
            {/* Pulsing Avatar Halo */}
            <div className="w-20 h-20 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center animate-pulse">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/30">
                <Mic className="w-6 h-6" />
              </div>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[6.5px] font-mono bg-emerald-500 text-black px-2 py-0.2 rounded-full font-black">
              LIVE SPEAKING
            </span>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-white">Anonymous Otter #82</h4>
            <p className="text-[7.5px] font-mono text-sky-300/80 mt-0.5">Matched via: Tech, Cinema & Startups</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-[6.5px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono">Kerala, IN</span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold">04:32</span>
            </div>
          </div>

          {/* Equalizer Audio Frequency Waves */}
          <div className="flex items-center justify-center gap-1 h-9 w-full max-w-[170px] bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
            {[35, 75, 100, 60, 85, 30, 90, 50, 70, 45, 95, 35, 80, 55].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-gradient-to-t from-sky-500 to-cyan-300 rounded-full" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Audio Quality Metrics */}
          <div className="flex items-center gap-3 text-[6.5px] font-mono text-slate-400">
            <span>Bitrate: <b>64kbps Opus</b></span>
            <span>Latency: <b>38ms</b></span>
            <span className="text-emerald-400">P2P Encrypted</span>
          </div>
        </div>

        {/* Voice Control Buttons HUD */}
        <div className="px-4 pb-2 space-y-2">
          <div className="flex items-center justify-center gap-4">
            <button className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white">
              <MicOff className="w-3.5 h-3.5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/40">
              <PhoneOff className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white">
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button className="w-full py-1.5 bg-slate-900 border border-sky-500/30 text-sky-300 font-bold text-[8px] rounded-xl flex items-center justify-center gap-1.5 shadow">
            <RefreshCw className="w-2.5 h-2.5 text-sky-400" />
            <span>SKIP TO NEXT STRANGER MATCH</span>
          </button>
        </div>

        {/* Persistent Bottom Tab Bar */}
        <BottomTabBar 
          activeTab="Call" 
          tabs={[
            { name: "Call", icon: Mic },
            { name: "Rooms", icon: Radio },
            { name: "Matches", icon: Bookmark },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. FOODZER - Hyperlocal Food Delivery & Live Kitchen (RICH FOOD APP)
  // -------------------------------------------------------------
  if (id === "foodzer") {
    return (
      <div className="w-full h-full bg-[#120B05] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Delivery Address & Cart Counter */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-orange-950 border border-amber-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-amber-400 font-bold uppercase tracking-wider">Foodzer Express</span>
                  <span className="text-[6.5px] bg-amber-500/20 text-amber-300 font-mono font-bold px-1 rounded">25 MINS</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" />
                  <span>Deliver to: <b>Emerald Heights, Flat 402</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
              <div className="relative">
                <button className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full text-[7px] text-black font-black flex items-center justify-center shadow">2</span>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-amber-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search Thalassery Biriyani, Al-Faham, Burgers..." 
              className="w-full bg-amber-950/40 border border-amber-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-amber-100 placeholder:text-amber-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-[6.5px] font-mono text-amber-300 font-bold">50% OFF CODES</span>
          </div>

          {/* Horizontal Category Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Biriyani", active: true },
              { label: "Mandhi & Arabic", active: false },
              { label: "Burgers & Pizza", active: false },
              { label: "Kerala Meals", active: false },
              { label: "Desserts & Shakes", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-amber-500 text-black border-amber-400 font-bold shadow-sm" 
                    : "bg-amber-950/40 text-amber-300 border-amber-500/20 hover:border-amber-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Hero Featured Restaurant Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900 via-orange-950 to-slate-950 border border-amber-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">MALABAR KITCHEN</span>
                  <span className="text-[6.5px] font-mono text-amber-300">1.2 KM AWAY</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Special Thalassery Dum Biriyani</h3>
                <p className="text-[7.5px] text-amber-200/80 mt-0.5 line-clamp-1">Khaima rice • Ghee roast chicken • Sulaimani</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-[12px] font-black font-mono text-amber-300">₹240</span>
                  <span className="text-[8px] font-mono line-through text-amber-200/40">₹290</span>
                  <span className="text-[7px] text-amber-300 font-bold">★ 4.9 (1.4k)</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="bg-amber-400 text-black rounded-lg px-2 py-0.5 flex items-center gap-1.5 font-black text-[8px] shadow">
                    <Minus className="w-2.5 h-2.5" />
                    <span>1</span>
                    <Plus className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[7px] font-mono text-amber-300/70">With Date Pickle</span>
                </div>
              </div>

              {/* Handi Dum Biriyani SVG Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Clay Pot Bowl */}
                  <ellipse cx="35" cy="50" rx="30" ry="24" fill="#B45309" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="35" cy="40" rx="26" ry="12" fill="#FEF08A" />
                  {/* Biriyani Rice Grains & Roasted Chicken Leg */}
                  <ellipse cx="35" cy="40" rx="22" ry="9" fill="#F59E0B" />
                  <path d="M 28 36 Q 42 32 46 44 Q 38 48 28 36 Z" fill="#92400E" />
                  <circle cx="46" cy="44" r="3" fill="#D97706" />
                  {/* Steam */}
                  <path d="M 30 26 Q 32 18 30 10" stroke="#FEF9C3" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
                  <path d="M 38 24 Q 40 16 38 8" stroke="#FEF9C3" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Popular Cravings Nearby</span>
            <span className="text-[7.5px] text-amber-400 font-mono font-semibold">View Menu (18) ›</span>
          </div>

          {/* 2-Column Product Catalog Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Product Card 1 */}
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-amber-950/60 border border-amber-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[6px] font-mono font-bold">CHARCOAL</span>
                {/* Al Faham Graphic */}
                <svg viewBox="0 0 50 50" className="w-10 h-10">
                  <ellipse cx="25" cy="25" rx="16" ry="12" fill="#9A3412" stroke="#EA580C" strokeWidth="1" />
                  <line x1="16" y1="18" x2="34" y2="30" stroke="#7C2D12" strokeWidth="2" />
                  <line x1="18" y1="30" x2="32" y2="20" stroke="#7C2D12" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Peri-Peri Al-Faham</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Quarter • 2 Kuboos & Garlic</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-amber-300">₹180</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.8</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-amber-500/20 hover:bg-amber-500 border border-amber-400/40 hover:text-black text-amber-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-amber-950/60 border border-amber-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-red-500/20 text-red-300 text-[6px] font-mono font-bold">DESSERT</span>
                {/* Falooda Cup */}
                <svg viewBox="0 0 50 50" className="w-8 h-12">
                  <path d="M 16 12 L 34 12 L 28 42 L 22 42 Z" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1" />
                  <circle cx="25" cy="12" r="7" fill="#F43F5E" />
                  <circle cx="25" cy="5" r="2.5" fill="#BE123C" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Royal Malabar Falooda</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Rose milk • Kulfi ice cream</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-amber-300">₹140</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.9</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-amber-500/20 hover:bg-amber-500 border border-amber-400/40 hover:text-black text-amber-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Floating Cart Pill */}
          <div className="bg-amber-950/80 border border-amber-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-amber-500 text-black flex items-center justify-center font-black text-[8px]">
                2
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Cart Total: ₹420</p>
                <p className="text-[6.5px] text-amber-400 font-mono">Live Kitchen Tracking Enabled</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Checkout</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Food" 
          tabs={[
            { name: "Food", icon: Home },
            { name: "Search", icon: Search },
            { name: "Orders", icon: ShoppingBag },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. MYVAAHAN - Automotive Garage & OBD Telematics (RICH AUTO SERVICE APP)
  // -------------------------------------------------------------
  if (id === "myvaahan") {
    return (
      <div className="w-full h-full bg-[#080E1C] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Vehicle Selection & Live OBD Status */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-950 border border-blue-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider">MyVaahan Fleet</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Wrench className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Workshop: <b>Bay #02 • AutoHub Kochi</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                OBD-II LIVE
              </span>
            </div>
          </div>

          {/* Vehicle HUD Gauge Card with Car Silhouette Vector */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950/70 to-slate-950 border border-blue-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">KL-10-AZ-4521</span>
                  <span className="text-[6.5px] font-mono text-slate-300">38,420 KM</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Hyundai Creta 1.5 SX Turbo</h3>
                <p className="text-[7.5px] text-cyan-200/80 mt-0.5 line-clamp-1">Major 40K Service in Progress</p>

                {/* 3 Real-time Diagnostics Gauges */}
                <div className="grid grid-cols-3 gap-1 mt-2.5">
                  <div className="bg-slate-950/80 border border-white/5 rounded-lg p-1 text-center">
                    <span className="text-[6px] font-mono text-slate-400 block">Battery</span>
                    <span className="text-[8px] font-bold text-emerald-400">12.6V OK</span>
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-lg p-1 text-center">
                    <span className="text-[6px] font-mono text-slate-400 block">Engine Oil</span>
                    <span className="text-[8px] font-bold text-amber-400">18% Replace</span>
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-lg p-1 text-center">
                    <span className="text-[6px] font-mono text-slate-400 block">Brake Pads</span>
                    <span className="text-[8px] font-bold text-emerald-400">Front 60%</span>
                  </div>
                </div>
              </div>

              {/* Realistic Car Top-Down Silhouette Vector Graphic */}
              <div className="w-14 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 50 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Car Chassis */}
                  <path d="M 12 18 C 12 8 38 8 38 18 L 40 42 C 42 56 42 68 38 78 C 38 84 12 84 12 78 C 8 68 8 56 10 42 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
                  {/* Windshield */}
                  <path d="M 15 26 L 35 26 L 33 36 L 17 36 Z" fill="#0284C7" opacity="0.6" />
                  {/* Rear Window */}
                  <path d="M 16 62 L 34 62 L 32 68 L 18 68 Z" fill="#0284C7" opacity="0.6" />
                  {/* Roof */}
                  <rect x="17" y="38" width="16" height="22" rx="2" fill="#0F172A" />
                  {/* Wheels */}
                  <rect x="6" y="20" width="5" height="12" rx="2" fill="#64748B" />
                  <rect x="39" y="20" width="5" height="12" rx="2" fill="#64748B" />
                  <rect x="6" y="60" width="5" height="12" rx="2" fill="#64748B" />
                  <rect x="39" y="60" width="5" height="12" rx="2" fill="#64748B" />
                  {/* Active Sensor Ping */}
                  <circle cx="25" cy="48" r="4" fill="#38BDF8" opacity="0.7" />
                  <circle cx="25" cy="48" r="8" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4-Stage Live Workflow Stepper */}
          <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5">
            <span className="text-[7.5px] font-mono text-slate-400 block mb-1.5 uppercase font-bold">Service Stage Tracker</span>
            <div className="flex items-center justify-between text-[7px] font-mono">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Inspection</span>
              </div>
              <span className="text-slate-600">→</span>
              <div className="flex items-center gap-1 text-cyan-400 font-bold animate-pulse">
                <Wrench className="w-3 h-3" />
                <span>Repair</span>
              </div>
              <span className="text-slate-600">→</span>
              <span className="text-slate-500">Testing</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-500">Ready</span>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Authorized Spares Estimate</span>
            <span className="text-[7.5px] text-cyan-400 font-mono font-semibold">Warranty 6 Mo ›</span>
          </div>

          {/* 2 Spares Parts Rows */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <p className="text-[8.5px] font-bold text-white">Full Synthetic Oil (5W-30) + Filter</p>
                <p className="text-[6.5px] text-slate-400">Shell Helix Ultra (3.8L) • Hyundai OEM</p>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-bold font-mono text-cyan-300 block">₹3,450</span>
                <span className="text-[6.5px] text-emerald-400 font-mono">Approved ✓</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <p className="text-[8.5px] font-bold text-white">Cabin AC Carbon Filter</p>
                <p className="text-[6.5px] text-slate-400">PM2.5 Bio-Guard Anti-Bacterial</p>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-bold font-mono text-cyan-300 block">₹850</span>
                <button className="text-[6.5px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold border border-cyan-400/40">
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Quick Floating Action Bar */}
          <div className="bg-blue-950/80 border border-cyan-400/30 rounded-xl p-2 flex items-center justify-between">
            <div>
              <p className="text-[8px] font-bold text-white">Total Estimate: ₹4,300</p>
              <p className="text-[6.5px] text-cyan-400 font-mono">Ready for delivery by 6:00 PM</p>
            </div>
            <button className="px-2.5 py-1 bg-cyan-400 hover:bg-cyan-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Approve Job</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Garage" 
          tabs={[
            { name: "Garage", icon: Home },
            { name: "OBD-II", icon: Activity },
            { name: "Service", icon: Wrench },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. HEALINE - Healthcare Tele-Consult & E-Pharmacy (RICH TELEHEALTH APP)
  // -------------------------------------------------------------
  if (id === "healine") {
    return (
      <div className="w-full h-full bg-[#071518] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Patient Profile & DHA Accreditation */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-950 border border-teal-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-teal-400 font-bold uppercase tracking-wider">Healine Health</span>
                  <span className="text-[6px] bg-teal-500/20 text-teal-300 font-mono font-bold px-1 rounded border border-teal-400/30">DHA LICENSED</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Stethoscope className="w-2.5 h-2.5 text-teal-400" />
                  <span>Patient: <b>Ahmed Al-Zahra (Emirates ID: 784-****)</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Bell className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-teal-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search specialists, cardiology, symptoms, lab tests..." 
              className="w-full bg-teal-950/40 border border-teal-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-teal-100 placeholder:text-teal-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-teal-500/20 text-[6.5px] font-mono text-teal-300 font-bold">100% COVERED</span>
          </div>

          {/* 5-Day Consultation Calendar Strip */}
          <div className="bg-slate-900/80 border border-white/5 rounded-xl p-1.5">
            <div className="flex items-center justify-between text-center gap-1">
              {[
                { day: "MON", date: "12", active: false },
                { day: "TUE", date: "13", active: false },
                { day: "WED", date: "14", active: true },
                { day: "THU", date: "15", active: false },
                { day: "FRI", date: "16", active: false }
              ].map((d, i) => (
                <div 
                  key={i} 
                  className={`flex-1 py-1 rounded-lg border transition-all ${
                    d.active 
                      ? "bg-teal-500 text-black border-teal-400 font-bold shadow-sm" 
                      : "bg-teal-950/30 border-white/5 text-slate-400"
                  }`}
                >
                  <span className="text-[6px] font-mono block">{d.day}</span>
                  <span className="text-[8.5px] font-black block mt-0.5">{d.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Doctor Consultation Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 border border-teal-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-teal-400/20 text-teal-300 border border-teal-400/30">TODAY • 4:30 PM (GST)</span>
                  <span className="text-[6.5px] font-mono text-emerald-400 font-bold">CONFIRMED</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Dr. Sarah Al Mansoori</h3>
                <p className="text-[7.5px] text-teal-200/80 mt-0.5 line-clamp-1">Consultant Cardiologist • Aster Medcity Dubai</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[7px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                    Daman / NextCare 100%
                  </span>
                  <span className="text-[7px] text-amber-300 font-bold">★ 4.9 (840)</span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-teal-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-teal-300">
                    <PhoneCall className="w-2.5 h-2.5" /> Join Tele-Room
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">HD Video Ready</span>
                </div>
              </div>

              {/* Doctor Avatar SVG Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Doctor Portrait Background */}
                  <rect x="5" y="10" width="60" height="74" rx="14" fill="#042F2E" stroke="#14B8A6" strokeWidth="1" />
                  {/* Doctor Coat & Stethoscope */}
                  <ellipse cx="35" cy="40" rx="14" ry="16" fill="#F0FDF4" />
                  <path d="M 21 44 L 35 60 L 49 44 L 52 84 L 18 84 Z" fill="#FFFFFF" />
                  <path d="M 26 46 Q 35 58 44 46" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="35" cy="62" r="3" fill="#0D9488" />
                  {/* Hijab / Hair */}
                  <path d="M 22 36 C 22 22 48 22 48 36 C 48 46 22 46 22 36 Z" fill="#134E4A" />
                  <ellipse cx="35" cy="38" rx="8" ry="10" fill="#FDE68A" />
                  {/* Plus badge */}
                  <circle cx="52" cy="20" r="7" fill="#0D9488" />
                  <line x1="52" y1="16" x2="52" y2="24" stroke="#FFF" strokeWidth="1.5" />
                  <line x1="48" y1="20" x2="56" y2="20" stroke="#FFF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">E-Pharmacy Active Prescriptions</span>
            <span className="text-[7.5px] text-teal-400 font-mono font-semibold">Refill All (2) ›</span>
          </div>

          {/* 2 Prescription / Pharmacy Rows */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-teal-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-teal-400 bg-teal-950 px-1 py-0.2 rounded font-bold">DAILY CARDIO</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Atorvastatin 20mg (90 Tablets)</p>
                <p className="text-[6.5px] text-slate-400">Refill authorized by Dr. Sarah • 1 per night</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-bold text-emerald-400 block font-mono">Refill Ready</span>
                <button className="text-[6.5px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-mono font-bold border border-teal-400/40 mt-0.5">
                  Order 1-Hr
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-teal-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-cyan-400 bg-cyan-950 px-1 py-0.2 rounded font-bold">VITAMIN</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Vitamin D3 50,000 IU (12 Capsules)</p>
                <p className="text-[6.5px] text-slate-400">Weekly dose • Post-bloodwork lab marker</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-bold text-slate-400 block font-mono">In Stock</span>
                <button className="text-[6.5px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-mono font-bold border border-teal-400/40 mt-0.5">
                  Order 1-Hr
                </button>
              </div>
            </div>
          </div>

          {/* Quick Floating Tele-Room Action Bar */}
          <div className="bg-teal-950/80 border border-teal-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-teal-400 text-black flex items-center justify-center font-black text-[8px]">
                <Activity className="w-3 h-3 text-black" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Next Consult in 28 mins</p>
                <p className="text-[6.5px] text-teal-400 font-mono">Camera & Mic Tested • 100% Ready</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-teal-400 hover:bg-teal-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Enter Room</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Consult" 
          tabs={[
            { name: "Consult", icon: Home },
            { name: "Doctors", icon: Stethoscope },
            { name: "Pharmacy", icon: ShoppingBag },
            { name: "Records", icon: FileText }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 6. SCHOSYS - School Management ERP (RICH STUDENT & ACADEMICS APP)
  // -------------------------------------------------------------
  if (id === "schosys") {
    return (
      <div className="w-full h-full bg-[#080E1C] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Student Profile & Term Status */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-950 border border-indigo-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Schosys Campus</span>
                  <span className="text-[6px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-1 rounded border border-emerald-400/30">TERM 2</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <UserCheck className="w-2.5 h-2.5 text-indigo-400" />
                  <span>Student: <b>Aarav Nair (Grade 10-A • #14)</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Bell className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Academic Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Overview", active: true },
              { label: "Timetable", active: false },
              { label: "Exams & Marks", active: false },
              { label: "Fee Ledger", active: false },
              { label: "Bus Tracking", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-indigo-500 text-white border-indigo-400 font-bold shadow-sm" 
                    : "bg-indigo-950/40 text-indigo-300 border-indigo-500/20 hover:border-indigo-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Academic Report Hero Card with Donut Score Visualizer */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-indigo-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">CLASS TOPPER (3RD)</span>
                  <span className="text-[6.5px] font-mono text-indigo-300">CBSE BOARD</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Term 1 Assessment Report</h3>
                <p className="text-[7.5px] text-indigo-200/80 mt-0.5 line-clamp-1">Aggregate: 94.8% across 6 subjects</p>

                {/* 2 Circular Mini Gauges */}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <div className="bg-slate-950/80 border border-white/5 rounded-lg p-1.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-indigo-400 flex items-center justify-center text-[7.5px] font-black text-indigo-300 shrink-0">
                      96%
                    </div>
                    <div>
                      <span className="text-[6px] font-mono text-slate-400 block">Attendance</span>
                      <span className="text-[7.5px] font-bold text-white">114 / 118 D</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-lg p-1.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-emerald-400 flex items-center justify-center text-[7.5px] font-black text-emerald-300 shrink-0">
                      A+
                    </div>
                    <div>
                      <span className="text-[6px] font-mono text-slate-400 block">Grade Rank</span>
                      <span className="text-[7.5px] font-bold text-white">Top 2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Graduation / Academic Badge SVG */}
              <div className="w-14 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Mortarboard Cap */}
                  <polygon points="30,12 54,24 30,36 6,24" fill="#312E81" stroke="#818CF8" strokeWidth="1.2" />
                  <rect x="20" y="32" width="20" height="12" rx="4" fill="#1E1B4B" />
                  {/* Tassel */}
                  <line x1="30" y1="24" x2="48" y2="34" stroke="#FBBF24" strokeWidth="1.5" />
                  <circle cx="48" cy="38" r="3" fill="#F59E0B" />
                  {/* Diploma Scroll */}
                  <rect x="14" y="52" width="32" height="20" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="18" y1="58" x2="42" y2="58" stroke="#D97706" strokeWidth="1" />
                  <line x1="18" y1="64" x2="36" y2="64" stroke="#D97706" strokeWidth="1" />
                  <rect x="26" y="50" width="8" height="24" rx="2" fill="#DC2626" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Upcoming Term 2 Exams</span>
            <span className="text-[7.5px] text-indigo-400 font-mono font-semibold">Hall Ticket Ready ›</span>
          </div>

          {/* 2 Exam Cards */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-indigo-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <p className="text-[8.5px] font-bold text-white">Mathematics (Calculus & Coordinate)</p>
                <p className="text-[6.5px] text-slate-400">Thursday, 15 Nov • Hall B • 09:30 AM</p>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-bold font-mono text-indigo-300 block">100 Marks</span>
                <span className="text-[6.5px] text-amber-400 font-mono">Room 204</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-indigo-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <p className="text-[8.5px] font-bold text-white">Physics (Electromagnetism & Waves)</p>
                <p className="text-[6.5px] text-slate-400">Monday, 19 Nov • Physics Lab Bay 1</p>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-bold font-mono text-indigo-300 block">75 Marks</span>
                <span className="text-[6.5px] text-emerald-400 font-mono">Lab Verified</span>
              </div>
            </div>
          </div>

          {/* Quick Floating Action Bar */}
          <div className="bg-indigo-950/80 border border-indigo-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-indigo-500 text-white flex items-center justify-center font-black text-[8px]">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Term 1 Official Transcript</p>
                <p className="text-[6.5px] text-indigo-300 font-mono">Digitally Signed by Principal</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-indigo-500 hover:bg-indigo-400 text-white text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>PDF Card</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Campus" 
          tabs={[
            { name: "Campus", icon: Home },
            { name: "Academics", icon: BookOpen },
            { name: "Exams", icon: Award },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 7. VIVLINO - Store Debt Note & Khata Ledger (RICH KHATA APP)
  // -------------------------------------------------------------
  if (id === "vivlino") {
    return (
      <div className="w-full h-full bg-[#0A0F1D] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Merchant Profile & Currency */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-950 border border-blue-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Vivlino Khata</span>
                  <span className="text-[6px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-1 rounded border border-emerald-400/30">BAHRAIN</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Building className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Store: <b>Al Manama Wholesale Spares</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Ledger Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Receivables", active: true },
              { label: "Payables", active: false },
              { label: "Overdue (14D)", active: false },
              { label: "SMS Logs", active: false },
              { label: "Statements", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-sm" 
                    : "bg-blue-950/40 text-cyan-300 border-blue-500/20 hover:border-blue-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Outstanding Balance Hero Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-blue-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">14 UNPAID NOTES</span>
                  <span className="text-[6.5px] font-mono text-cyan-300">AUTOPAY ACTIVE</span>
                </div>
                <h3 className="text-[13px] font-black text-white leading-tight font-mono">BHD 1,840.500</h3>
                <p className="text-[7.5px] text-slate-300 mt-0.5">Total pending receivables from 12 clients</p>
                <div className="flex items-center gap-2 mt-2 pt-1 border-t border-white/5 text-[7px] font-mono">
                  <span className="text-emerald-400 font-bold">+BHD 320.000 Received Today</span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-cyan-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-cyan-300">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" /> Add Note
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">WhatsApp Reminder</span>
                </div>
              </div>

              {/* Ledger Book & Cash Sacks SVG Graphic */}
              <div className="w-14 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Ledger Book */}
                  <rect x="8" y="14" width="44" height="64" rx="4" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="1.2" />
                  <rect x="12" y="18" width="8" height="56" rx="2" fill="#0F172A" />
                  {/* Spine Ribs */}
                  <line x1="8" y1="28" x2="20" y2="28" stroke="#60A5FA" strokeWidth="1" />
                  <line x1="8" y1="42" x2="20" y2="42" stroke="#60A5FA" strokeWidth="1" />
                  <line x1="8" y1="56" x2="20" y2="56" stroke="#60A5FA" strokeWidth="1" />
                  {/* Gold Seal */}
                  <circle cx="34" cy="46" r="10" fill="#D97706" />
                  <circle cx="34" cy="46" r="7" fill="#F59E0B" />
                  <text x="34" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350F">BD</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Overdue Client Accounts</span>
            <span className="text-[7.5px] text-cyan-400 font-mono font-semibold">Send All SMS (4) ›</span>
          </div>

          {/* 2 Customer Overdue Rows */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-rose-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-rose-400 bg-rose-950 px-1 py-0.2 rounded font-bold">DUE 14 DAYS</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Ahmed Al Hiddad (Contractor)</p>
                <p className="text-[6.5px] text-slate-400">+973 3941 2284 • 40 Bags Cement Batch</p>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-bold font-mono text-rose-400 block">BHD 420.000</span>
                <button className="text-[6.5px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold border border-cyan-400/40 mt-0.5">
                  Remind SMS
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-amber-400 bg-amber-950 px-1 py-0.2 rounded font-bold">PARTIAL 50%</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Gulf Star Auto Workshop</p>
                <p className="text-[6.5px] text-slate-400">Paid BHD 200 • Balance BHD 185.500</p>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-bold font-mono text-amber-300 block">BHD 185.500</span>
                <button className="text-[6.5px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-400/40 mt-0.5">
                  Record Cash
                </button>
              </div>
            </div>
          </div>

          {/* Quick Floating Bar */}
          <div className="bg-blue-950/80 border border-cyan-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-cyan-500 text-black flex items-center justify-center font-black text-[8px]">
                <CreditCard className="w-3 h-3 text-black" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Daily Reconciliation Ready</p>
                <p className="text-[6.5px] text-cyan-300 font-mono">Verified with BenefitPay Bahrain</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-cyan-400 hover:bg-cyan-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Sync</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Khata" 
          tabs={[
            { name: "Khata", icon: Home },
            { name: "Customers", icon: Building },
            { name: "Reminders", icon: Bell },
            { name: "Reports", icon: Receipt }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 8. AMERICAN BOARD - RPA Accreditation Registry (RICH VERIFICATION APP)
  // -------------------------------------------------------------
  if (id === "american-board") {
    return (
      <div className="w-full h-full bg-[#080D1A] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Accreditation Registry Header */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-950 border border-blue-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider">American Board</span>
                  <span className="text-[6px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-1 rounded border border-emerald-400/30">AUDITED</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Credential Registry: <b>USA / Global</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                RPA &lt;28s
              </span>
            </div>
          </div>

          {/* Quick Registry Filter Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Accredited Candidates", active: true },
              { label: "RPA Log Stream", active: false },
              { label: "Blockchain Seals", active: false },
              { label: "Oracle SIS Sync", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-sm" 
                    : "bg-blue-950/40 text-cyan-300 border-blue-500/20 hover:border-blue-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Candidate Credential Certificate Hero Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-cyan-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">DISTINCTION GRADE</span>
                  <span className="text-[6.5px] font-mono text-cyan-300">CERT #AB-8492</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Elena Rostova (Global Teaching License)</h3>
                <p className="text-[7.5px] text-cyan-200/80 mt-0.5 line-clamp-1">Accredited by American Board Education Board</p>
                <div className="flex items-center gap-2 mt-2 pt-1 border-t border-white/5 text-[7px] font-mono">
                  <span className="text-emerald-400 font-bold">SHA-256 Tamper-Proof Cryptographic Hash</span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-cyan-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-cyan-300">
                    <QrCode className="w-2.5 h-2.5" /> Verify Live QR
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">PDF Transcript</span>
                </div>
              </div>

              {/* Gold Certified Seal SVG Graphic */}
              <div className="w-14 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Outer Seal Starburst */}
                  <circle cx="30" cy="38" r="24" fill="#D97706" stroke="#FBBF24" strokeWidth="1.5" />
                  <circle cx="30" cy="38" r="19" fill="#1E3A8A" stroke="#FDE68A" strokeWidth="1" />
                  {/* Eagle / Crest Silhouette */}
                  <polygon points="30,26 34,34 42,34 36,39 38,47 30,42 22,47 24,39 18,34 26,34" fill="#FBBF24" />
                  {/* Ribbons */}
                  <polygon points="22,54 22,78 28,72 34,78 34,54" fill="#DC2626" />
                  <polygon points="32,54 32,78 38,72 44,78 44,54" fill="#B91C1C" />
                </svg>
              </div>
            </div>
          </div>

          {/* Live RPA Pipeline Logs */}
          <div className="bg-slate-950/90 border border-cyan-500/20 rounded-xl p-2 font-mono text-[7px] space-y-1">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
              <span className="font-bold text-cyan-300">RPA DISPATCH STREAM</span>
              <span className="text-emerald-400">LATENCY: 22ms</span>
            </div>
            <p className="text-slate-300">[17:42:01] <span className="text-cyan-400">RPA_BOT_04:</span> Polling official registrar DB</p>
            <p className="text-slate-300">[17:42:04] <span className="text-emerald-400">HASH_MATCH:</span> Candidate #AB-8492 verified</p>
            <p className="text-slate-300">[17:42:08] <span className="text-indigo-400">CRYPTO_SEAL:</span> Tamper-proof QR digital signature affixed</p>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Mainframe SIS Integrations</span>
            <span className="text-[7.5px] text-cyan-400 font-mono font-semibold">1,480 Updated ›</span>
          </div>

          {/* Recent Audited Records */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-emerald-400 bg-emerald-950 px-1 py-0.2 rounded font-bold">DIGITAL BADGE</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Global STEM Specialist Certificate</p>
                <p className="text-[6.5px] text-slate-400">Candidate: Dr. Marcus Vance • Level 4</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-bold text-emerald-400 block font-mono">Issued ✓</span>
                <span className="text-[6.5px] text-cyan-300 font-mono">Blockchain</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-cyan-400 bg-cyan-950 px-1 py-0.2 rounded font-bold">SIS SYNC</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Oracle PeopleSoft Mainframe Bridge</p>
                <p className="text-[6.5px] text-slate-400">Automatic grade transcript ingestion pipeline</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-bold text-cyan-400 block font-mono">Synced</span>
                <span className="text-[6.5px] text-slate-400 font-mono">Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Verify" 
          tabs={[
            { name: "Verify", icon: ShieldCheck },
            { name: "Registry", icon: BookOpen },
            { name: "RPA Bots", icon: Zap },
            { name: "Audits", icon: Award }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 9. QARO - Emergency Roadside Breakdown Dispatch (RICH ROADSIDE SOS APP)
  // -------------------------------------------------------------
  if (id === "qaro") {
    return (
      <div className="w-full h-full bg-[#180A0A] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Emergency SOS Header */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-rose-700 to-red-950 border border-rose-500/40 p-1 shrink-0 shadow-md flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-rose-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-rose-400 font-bold uppercase tracking-wider">Qaro Recovery</span>
                  <span className="text-[6px] bg-rose-500/20 text-rose-300 font-mono font-bold px-1 rounded border border-rose-400/30">24/7 UAE</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-rose-400" />
                  <span>GPS: <b>Sheikh Zayed Rd, Exit 39</b></span>
                </div>
              </div>
            </div>
            <span className="text-[6.5px] font-mono text-rose-400 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              DISPATCH ACTIVE
            </span>
          </div>

          {/* Real-time Flatbed Truck ETA Hero Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 border border-rose-500/40 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">HYDRAULIC FLATBED #492</span>
                  <span className="text-[6.5px] font-mono text-rose-300 font-bold">ETA: 6 MINS</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Driver Tarek (Audi/Porsche Tow)</h3>
                <p className="text-[7.5px] text-rose-200/80 mt-0.5 line-clamp-1">Flatbed en-route with winch & jump-starter</p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-rose-500/20 text-[7px] font-mono">
                  <span className="text-slate-300">Disabled Car: Audi Q7 (DXB 4920)</span>
                  <span className="text-emerald-400 font-bold">Towing to Al Quoz</span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[8px] font-black flex items-center gap-1 shadow">
                    <PhoneCall className="w-2.5 h-2.5" /> Call Driver Tarek
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">Live GPS Link</span>
                </div>
              </div>

              {/* Flatbed Tow Truck SVG Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Truck Cab */}
                  <path d="M 12 36 L 24 36 L 28 48 L 12 48 Z" fill="#E11D48" stroke="#FDA4AF" strokeWidth="1" />
                  <rect x="12" y="48" width="18" height="18" fill="#BE123C" />
                  {/* Windshield */}
                  <polygon points="15,38 23,38 26,46 15,46" fill="#38BDF8" opacity="0.7" />
                  {/* Flatbed ramp inclined */}
                  <polygon points="28,48 64,36 66,54 28,54" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
                  {/* Hydraulic Ram */}
                  <line x1="36" y1="54" x2="48" y2="44" stroke="#F59E0B" strokeWidth="2.5" />
                  {/* Wheels */}
                  <circle cx="20" cy="66" r="6" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
                  <circle cx="50" cy="66" r="6" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
                  <circle cx="58" cy="66" r="6" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
                  {/* Flashing light bar */}
                  <rect x="16" y="32" width="8" height="4" rx="1" fill="#F59E0B" />
                </svg>
              </div>
            </div>
          </div>

          {/* Direct Tow Destination Hub */}
          <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded font-bold">CERTIFIED REPAIR WORKSHOP</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Al Quoz German Auto Care Specialists</p>
              <p className="text-slate-400 text-[7px]">Audi / Porsche Certified • 1.4 km from breakdown</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-white font-bold text-[9.5px]">AED 350</span>
              <span className="text-[6.5px] text-emerald-400 block font-mono">Insurance Covered</span>
            </div>
          </div>

          {/* Quick Floating Dispatch Button */}
          <div className="bg-rose-950/80 border border-rose-500/40 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center font-black text-[8px]">
                <Wrench className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Emergency Dispatch Locked</p>
                <p className="text-[6.5px] text-rose-300 font-mono">Dubai Police & RTA Notified</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Track GPS</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Recovery" 
          tabs={[
            { name: "Recovery", icon: AlertCircle },
            { name: "Fleet Map", icon: MapPin },
            { name: "Garages", icon: Wrench },
            { name: "Insurance", icon: ShieldCheck }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 10. KARIKKU - FMCG Tender Coconut Harvest D2C (RICH NATIVE STORE APP)
  // -------------------------------------------------------------
  if (id === "karikku") {
    return (
      <div className="w-full h-full bg-[#07150F] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Location, Brand Logo & Action Badges */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-950 border border-emerald-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Karikku Harvest</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Farm-Fresh to: <b>Calicut City</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
              <div className="relative">
                <button className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full text-[7px] text-black font-black flex items-center justify-center shadow">3</span>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-emerald-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search tender coconut, fresh pudding, shakes..." 
              className="w-full bg-emerald-950/40 border border-emerald-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-emerald-100 placeholder:text-emerald-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-[6.5px] font-mono text-emerald-300 font-bold">HARVESTED TODAY</span>
          </div>

          {/* Horizontal Category Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Fresh Harvest", active: true },
              { label: "Tender Water", active: false },
              { label: "Coconut Pudding", active: false },
              { label: "Pure Malai", active: false },
              { label: "Subscriptions", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm" 
                    : "bg-emerald-950/40 text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Hero Featured Product Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 border border-emerald-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">ZERO PRESERVATIVES</span>
                  <span className="text-[6.5px] font-mono text-emerald-300">COLD CHAIN 4°C</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Raw Diamond-Cut Tender Coconut</h3>
                <p className="text-[7.5px] text-emerald-200/80 mt-0.5 line-clamp-1">350ml naturally sweet mineral electrolyte water</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-[12px] font-black font-mono text-emerald-300">₹85</span>
                  <span className="text-[8px] font-mono line-through text-emerald-200/40">₹110</span>
                  <span className="text-[7px] text-amber-300 font-bold">★ 4.9 (2.8k)</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-emerald-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-emerald-300">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" /> Add to Bag
                  </button>
                  <span className="text-[7px] font-mono text-emerald-300/70">Straw included</span>
                </div>
              </div>

              {/* Realistic Diamond Cut Tender Coconut SVG */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Outer husk diamond trimmed shape */}
                  <polygon points="35,6 56,22 60,65 35,84 10,65 14,22" fill="#15803D" stroke="#22C55E" strokeWidth="1.2" />
                  {/* Inner diamond crown cut */}
                  <polygon points="35,10 50,24 53,46 35,54 17,46 20,24" fill="#F0FDF4" />
                  {/* Core hole with straw */}
                  <ellipse cx="35" cy="34" rx="8" ry="8" fill="#166534" />
                  <ellipse cx="35" cy="34" rx="6" ry="6" fill="#047857" />
                  {/* Straw */}
                  <line x1="35" y1="34" x2="48" y2="2" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="48" y1="2" x2="55" y2="4" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
                  {/* Water drop badge */}
                  <circle cx="35" cy="68" r="8" fill="#0284C7" opacity="0.9" />
                  <path d="M 35 63 C 33 66 31 68 31 70 C 31 72 33 74 35 74 C 37 74 39 72 39 70 C 39 68 37 66 35 63 Z" fill="#E0F2FE" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Chilled Estate Specials</span>
            <span className="text-[7.5px] text-emerald-400 font-mono font-semibold">See Menu ›</span>
          </div>

          {/* 2-Column Product Catalog Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Product Card 1 */}
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-emerald-950/60 border border-emerald-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[6px] font-mono font-bold">FRESH CHILLED</span>
                {/* Tender Pudding Cup */}
                <svg viewBox="0 0 50 50" className="w-10 h-10">
                  <path d="M 12 18 L 38 18 L 34 42 L 16 42 Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
                  <ellipse cx="25" cy="18" rx="13" ry="4" fill="#FEF9C3" />
                  <ellipse cx="25" cy="18" rx="6" ry="2" fill="#15803D" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Tender Coconut Pudding</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Rich malai cream • 180g cup</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-emerald-300">₹120</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.9</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-400/40 hover:text-black text-emerald-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-emerald-950/60 border border-emerald-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-teal-500/20 text-teal-300 text-[6px] font-mono font-bold">BOTTLED</span>
                {/* Bottled Elaneer */}
                <svg viewBox="0 0 50 50" className="w-8 h-12">
                  <rect x="22" y="6" width="6" height="5" fill="#10B981" rx="1" />
                  <rect x="16" y="11" width="18" height="32" rx="3" fill="#047857" stroke="#34D399" strokeWidth="0.8" />
                  <rect x="18" y="16" width="14" height="24" rx="2" fill="#6EE7B7" opacity="0.6" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Chilled Elaneer (500ml)</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">High electrolytes • Raw bottle</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-emerald-300">₹95</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.8</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-400/40 hover:text-black text-emerald-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Floating Checkout Bar */}
          <div className="bg-emerald-950/80 border border-emerald-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-emerald-500 text-black flex items-center justify-center font-black text-[8px]">
                3
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Cart Total: ₹300</p>
                <p className="text-[6.5px] text-emerald-400 font-mono">Guaranteed Delivery in 45 Mins</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-emerald-400 hover:bg-emerald-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Checkout</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Harvest" 
          tabs={[
            { name: "Harvest", icon: Home },
            { name: "Subscriptions", icon: Clock },
            { name: "Cart", icon: ShoppingBag },
            { name: "Account", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 11. THARA CART - Multi-Vendor B2B & B2C Marketplace (RICH WHOLESALE APP)
  // -------------------------------------------------------------
  if (id === "thara-cart") {
    return (
      <div className="w-full h-full bg-[#0B0F19] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native Marketplace Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Marketplace Search Header */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-950 border border-blue-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Thara Cart B2B</span>
                  <span className="text-[6px] bg-cyan-500/20 text-cyan-300 font-mono font-bold px-1 py-0.2 rounded border border-cyan-400/30">GST READY</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Building className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Wholesale Hub: <b>Ernakulam Yard</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
              <div className="relative">
                <button className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full text-[7px] text-black font-black flex items-center justify-center shadow">5</span>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-cyan-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search 1,400+ verified suppliers, FMCG bulk lots..." 
              className="w-full bg-blue-950/40 border border-blue-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-cyan-100 placeholder:text-cyan-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-blue-500/20 text-[6.5px] font-mono text-cyan-300 font-bold">TIERED PRICING</span>
          </div>

          {/* Horizontal Category Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Bulk Commodities", active: true },
              { label: "Spices & Agro", active: false },
              { label: "Packaging & Bags", active: false },
              { label: "Oils & Ghee", active: false },
              { label: "FMCG Daily", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-sm" 
                    : "bg-blue-950/40 text-cyan-300 border-blue-500/20 hover:border-blue-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Multi-Vendor Wholesale Spotlight Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 border border-cyan-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">VERIFIED SUPPLIER</span>
                  <span className="text-[6.5px] font-mono text-cyan-300">GST INVOICE</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Wayanad Black Pepper (50kg Gunny Lot)</h3>
                <p className="text-[7.5px] text-cyan-200/80 mt-0.5 line-clamp-1">Direct from Wayanad Agro Co-op • Grade 1 Density</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-[12px] font-black font-mono text-cyan-300">₹32,500</span>
                  <span className="text-[8px] font-mono line-through text-cyan-200/40">₹36,000</span>
                  <span className="text-[7px] text-emerald-300 font-bold font-mono">₹650/kg</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-cyan-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-cyan-300">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" /> Request Quotation
                  </button>
                  <span className="text-[7px] font-mono text-cyan-300/70">Min 2 Lots</span>
                </div>
              </div>

              {/* Wholesale Sacks / Lot SVG Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Sacks Stack */}
                  <ellipse cx="35" cy="72" rx="28" ry="12" fill="#B45309" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="35" cy="50" rx="24" ry="11" fill="#D97706" stroke="#F59E0B" strokeWidth="1" />
                  <ellipse cx="35" cy="30" rx="20" ry="10" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1" />
                  {/* Gunny Bag Stitch Line */}
                  <line x1="20" y1="30" x2="50" y2="30" stroke="#78350F" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="16" y1="50" x2="54" y2="50" stroke="#78350F" strokeWidth="1.5" strokeDasharray="3 2" />
                  {/* Label badge */}
                  <rect x="25" y="42" width="20" height="10" rx="2" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="0.8" />
                  <text x="35" y="49" textAnchor="middle" fontSize="4" fill="#93C5FD" fontWeight="bold">50 KG</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Live Wholesale Contracts</span>
            <span className="text-[7.5px] text-cyan-400 font-mono font-semibold">1,400+ Vendors ›</span>
          </div>

          {/* 2-Column Product Catalog Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Product Card 1 */}
            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-blue-950/60 border border-blue-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[6px] font-mono font-bold">50 DRUMS</span>
                {/* Drum Oil Illustration */}
                <svg viewBox="0 0 50 50" className="w-10 h-10">
                  <rect x="15" y="10" width="20" height="30" rx="3" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1" />
                  <line x1="15" y1="20" x2="35" y2="20" stroke="#93C5FD" strokeWidth="1" />
                  <line x1="15" y1="30" x2="35" y2="30" stroke="#93C5FD" strokeWidth="1" />
                  <circle cx="25" cy="14" r="3" fill="#F59E0B" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Refined Coconut Oil Drum</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">200L Industrial Food Grade</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-cyan-300">₹27,800</span>
                    <span className="text-[6.5px] text-emerald-400 block font-mono">Stock: 45</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 border border-cyan-400/40 hover:text-black text-cyan-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-blue-950/60 border border-blue-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[6px] font-mono font-bold">AGRO B2B</span>
                {/* Cardamom Spices */}
                <svg viewBox="0 0 50 50" className="w-10 h-10">
                  <ellipse cx="25" cy="25" rx="14" ry="8" fill="#15803D" stroke="#86EFAC" strokeWidth="1" transform="rotate(-30 25 25)" />
                  <line x1="14" y1="20" x2="36" y2="30" stroke="#14532D" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Cardamom 8mm Bold</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Idukki Estate • 10kg Vacuum Box</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-cyan-300">₹21,500</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.9 (42)</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 border border-cyan-400/40 hover:text-black text-cyan-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Floating Seller Switch & Dispatch Bar */}
          <div className="bg-blue-950/80 border border-cyan-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-cyan-500 text-black flex items-center justify-center font-black text-[8px]">
                5
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Wholesale Lot PO: ₹81,800</p>
                <p className="text-[6.5px] text-cyan-400 font-mono">Consolidated Dispatch • GST Breakdown</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-cyan-400 hover:bg-cyan-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Review PO</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Market" 
          tabs={[
            { name: "Market", icon: Home },
            { name: "Vendors", icon: Building },
            { name: "Orders", icon: ShoppingBag },
            { name: "Seller Hub", icon: Layers }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 12. 3MS - Financial Super-App & Utility Engine (RICH FINTECH APP)
  // -------------------------------------------------------------
  if (id === "3ms") {
    return (
      <div className="w-full h-full bg-[#080E1C] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with FinTech Portfolio Header */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-700 to-blue-950 border border-indigo-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-indigo-400 font-bold uppercase tracking-wider">3MS Super-App</span>
                  <span className="text-[6px] bg-indigo-500/20 text-indigo-300 font-mono font-bold px-1 rounded border border-indigo-400/30">KYC VERIFIED</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <CreditCard className="w-2.5 h-2.5 text-indigo-400" />
                  <span>Wallet: <b>SBI ••••• 8920 (UPI Auto)</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Bell className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick FinTech Category Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Overview", active: true },
              { label: "Send & Pay", active: false },
              { label: "Utility Bills", active: false },
              { label: "Micro-Loans", active: false },
              { label: "Investments", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-indigo-500 text-white border-indigo-400 font-bold shadow-sm" 
                    : "bg-indigo-950/40 text-indigo-300 border-indigo-500/20 hover:border-indigo-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Portfolio & Net Worth Hero Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-indigo-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">+18.4% MoM</span>
                  <span className="text-[6.5px] font-mono text-indigo-300">CONSOLIDATED</span>
                </div>
                <span className="text-[7px] font-mono text-slate-400 block uppercase">Total Balance & Deposits</span>
                <h3 className="text-[14px] font-black text-white leading-tight font-mono">₹4,82,900.50</h3>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-1 mt-2 pt-1.5 border-t border-white/5 text-[6.5px] font-mono">
                  <div className="bg-slate-950/80 p-1 rounded-lg">
                    <span className="text-slate-400 block text-[6px]">SAVINGS</span>
                    <span className="text-white font-bold">₹2.4L</span>
                  </div>
                  <div className="bg-slate-950/80 p-1 rounded-lg">
                    <span className="text-slate-400 block text-[6px]">UTILITIES</span>
                    <span className="text-cyan-400 font-bold">₹18.2K</span>
                  </div>
                  <div className="bg-slate-950/80 p-1 rounded-lg">
                    <span className="text-slate-400 block text-[6px]">CREDIT</span>
                    <span className="text-amber-400 font-bold">₹64.5K</span>
                  </div>
                </div>
              </div>

              {/* Credit Card & Chip Graphic */}
              <div className="w-14 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Card Background */}
                  <rect x="6" y="14" width="48" height="62" rx="6" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.2" />
                  {/* Chip */}
                  <rect x="12" y="24" width="12" height="9" rx="2" fill="#FBBF24" />
                  <line x1="12" y1="28" x2="24" y2="28" stroke="#B45309" strokeWidth="0.8" />
                  {/* Contactless Waves */}
                  <path d="M 42 22 Q 46 26 42 30" fill="none" stroke="#A5B4FC" strokeWidth="1" />
                  <path d="M 45 20 Q 50 26 45 32" fill="none" stroke="#A5B4FC" strokeWidth="1" />
                  {/* Card Number Dots */}
                  <circle cx="14" cy="50" r="1.5" fill="#E0E7FF" />
                  <circle cx="20" cy="50" r="1.5" fill="#E0E7FF" />
                  <circle cx="26" cy="50" r="1.5" fill="#E0E7FF" />
                  <circle cx="32" cy="50" r="1.5" fill="#E0E7FF" />
                  <text x="38" y="52" fill="#E0E7FF" fontSize="5" fontWeight="bold" fontFamily="monospace">8920</text>
                  <text x="12" y="66" fill="#818CF8" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">3MS PLATINUM</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Pending Utility Clearance</span>
            <span className="text-[7.5px] text-indigo-400 font-mono font-semibold">Pay All (₹2,450) ›</span>
          </div>

          {/* 2 Utility Payment Rows */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-blue-500/20 rounded-xl p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[8.5px]">Electricity (KSEB Kerala)</p>
                  <p className="text-slate-400 text-[6.5px]">Consumer #849204 • Due in 2 days</p>
                </div>
              </div>
              <button className="px-2 py-1 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-[7.5px] rounded-lg">
                PAY ₹2,450
              </button>
            </div>

            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[8.5px]">MSME Business Micro-Loan</p>
                  <p className="text-slate-400 text-[6.5px]">Pre-approved capital • 1.1% monthly interest</p>
                </div>
              </div>
              <span className="text-[7.5px] text-emerald-400 font-bold font-mono">APPLY ₹5L</span>
            </div>
          </div>

          {/* Floating Action Clearance Bar */}
          <div className="bg-indigo-950/80 border border-indigo-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-indigo-500 text-white flex items-center justify-center font-black text-[8px]">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Consolidated Bills: ₹2,450</p>
                <p className="text-[6.5px] text-indigo-300 font-mono">1-Tap Clearance via Auto-Debit</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-indigo-500 hover:bg-indigo-400 text-white text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Execute Pay</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Wallet" 
          tabs={[
            { name: "Wallet", icon: Home },
            { name: "Payments", icon: Zap },
            { name: "Passbook", icon: Receipt },
            { name: "Account", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 13. EDHWI - Pure Cold-Pressed Virgin Coconut Oil Storefront (RICH D2C E-COMMERCE APP)
  // -------------------------------------------------------------
  if (id === "edhwi") {
    return (
      <div className="w-full h-full bg-[#08130E] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Location, Brand Logo & Action Badges */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-1" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Edhwi Pure VCO</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Deliver to: <b>Kochi 682020</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
              <div className="relative">
                <button className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full text-[7px] text-black font-black flex items-center justify-center shadow">2</span>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-emerald-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search Extra Virgin, Cold Pressed, Copra..." 
              className="w-full bg-emerald-950/40 border border-emerald-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-emerald-100 placeholder:text-emerald-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-[6.5px] font-mono text-emerald-300 font-bold">100% ORGANIC</span>
          </div>

          {/* Horizontal Category Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "All Items", active: true },
              { label: "Virgin VCO", active: false },
              { label: "Wood Pressed", active: false },
              { label: "Baby Care", active: false },
              { label: "Raw Copra", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm" 
                    : "bg-emerald-950/40 text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Hero Featured Product Banner with Bottle Artwork */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 border border-emerald-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">BESTSELLER</span>
                  <span className="text-[6.5px] font-mono text-emerald-300">LAB CERTIFIED</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Centrifuged Extra Virgin Coconut Oil</h3>
                <p className="text-[7.5px] text-emerald-200/80 mt-0.5 line-clamp-1">Extracted in 2 hrs from fresh coconut milk</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-[12px] font-black font-mono text-emerald-300">₹499</span>
                  <span className="text-[8px] font-mono line-through text-emerald-200/40">₹620</span>
                  <span className="text-[7px] text-amber-300 font-bold">★ 4.9 (1.4k)</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-emerald-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-emerald-300">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" /> Add to Bag
                  </button>
                  <span className="text-[7px] font-mono text-emerald-300/70">500ml Glass</span>
                </div>
              </div>

              {/* Realistic Botanical Bottle Vector Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 110" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Bottle Cap */}
                  <rect x="27" y="6" width="16" height="10" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1" />
                  <rect x="29" y="16" width="12" height="6" fill="#FBBF24" />
                  {/* Bottle Neck */}
                  <path d="M 27 22 L 43 22 L 48 36 L 22 36 Z" fill="#064E3B" opacity="0.9" />
                  {/* Bottle Body */}
                  <rect x="15" y="36" width="40" height="64" rx="8" fill="url(#edhwiOilGrad)" stroke="#10B981" strokeWidth="1" />
                  {/* Oil Level & Shimmer */}
                  <rect x="18" y="44" width="34" height="52" rx="5" fill="#047857" opacity="0.8" />
                  <ellipse cx="35" cy="50" rx="14" ry="4" fill="#34D399" opacity="0.4" />
                  {/* Label on Bottle */}
                  <rect x="20" y="55" width="30" height="32" rx="3" fill="#022C22" stroke="#34D399" strokeWidth="0.8" />
                  <text x="35" y="66" textAnchor="middle" fill="#A7F3D0" fontSize="5" fontWeight="900" fontFamily="sans-serif">EDHWI</text>
                  <text x="35" y="72" textAnchor="middle" fill="#6EE7B7" fontSize="3.5" fontFamily="sans-serif">EXTRA VIRGIN</text>
                  <circle cx="35" cy="78" r="3" fill="#FBBF24" opacity="0.8" />
                  <defs>
                    <linearGradient id="edhwiOilGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#065F46" />
                      <stop offset="100%" stopColor="#022C22" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Popular Harvests</span>
            <span className="text-[7.5px] text-emerald-400 font-mono font-semibold">View All (8) ›</span>
          </div>

          {/* 2-Column Product Catalog Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Product Card 1 */}
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-emerald-950/60 border border-emerald-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[6px] font-mono font-bold">1 LITRE</span>
                {/* Copra Coconut Illustration */}
                <svg viewBox="0 0 50 50" className="w-10 h-10">
                  <circle cx="25" cy="25" r="16" fill="#78350F" />
                  <circle cx="25" cy="25" r="13" fill="#FEF3C7" />
                  <circle cx="25" cy="25" r="9" fill="#047857" opacity="0.3" />
                  <circle cx="25" cy="25" r="4" fill="#D97706" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Sun-Dried Pure Copra Oil</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Wood cold-pressed • No sulphur</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-emerald-300">₹310</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.9</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-400/40 hover:text-black text-emerald-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-emerald-950/60 border border-emerald-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[6px] font-mono font-bold">BABY CARE</span>
                {/* Baby Care Dispenser Illustration */}
                <svg viewBox="0 0 50 50" className="w-8 h-12">
                  <rect x="21" y="4" width="8" height="6" fill="#38BDF8" rx="1" />
                  <rect x="23" y="10" width="4" height="4" fill="#0284C7" />
                  <rect x="15" y="14" width="20" height="28" rx="4" fill="#0E7490" stroke="#38BDF8" strokeWidth="0.8" />
                  <ellipse cx="25" cy="28" rx="6" ry="6" fill="#E0F2FE" opacity="0.8" />
                  <text x="25" y="30" textAnchor="middle" fontSize="4" fill="#0369A1" fontWeight="bold">VCO</text>
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Baby VCO Dispenser</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Hypoallergenic • 250ml</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-emerald-300">₹365</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 5.0</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-400/40 hover:text-black text-emerald-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Floating Checkout Bar */}
          <div className="bg-emerald-950/80 border border-emerald-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-emerald-500 text-black flex items-center justify-center font-black text-[8px]">
                2
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Cart Total: ₹809</p>
                <p className="text-[6.5px] text-emerald-400 font-mono">Free Express Delivery Applied</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-emerald-400 hover:bg-emerald-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Checkout</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Shop" 
          tabs={[
            { name: "Shop", icon: Home },
            { name: "Search", icon: Search },
            { name: "Orders", icon: ShoppingBag },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 14. CLUBQ - Restaurant POS, KOT & Kitchen Order Routing (RICH RESTAURANT POS APP)
  // -------------------------------------------------------------
  if (id === "clubq") {
    return (
      <div className="w-full h-full bg-[#180F08] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Terminal Profile & Active Table */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-orange-600 to-amber-950 border border-orange-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-orange-400 font-bold uppercase tracking-wider">ClubQ POS Live</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Utensils className="w-2.5 h-2.5 text-orange-400" />
                  <span>Floor 1: <b>Table #07 (4 Guests)</b></span>
                </div>
              </div>
            </div>
            <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              KOT SENT
            </span>
          </div>

          {/* Quick Category Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Active KOTs", active: true },
              { label: "Table Layout", active: false },
              { label: "Starters", active: false },
              { label: "Mains & Biryani", active: false },
              { label: "Bar & Drinks", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-orange-500 text-black border-orange-400 font-bold shadow-sm" 
                    : "bg-orange-950/40 text-orange-300 border-orange-500/20 hover:border-orange-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Live Kitchen Order Token (KOT) Hero Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-950 via-stone-900 to-amber-950 border border-orange-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">#KOT-142</span>
                  <span className="text-[6.5px] font-mono text-orange-300">PREP TIME: 6 MIN</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Table 07 • Captain: Rahul</h3>
                <p className="text-[7.5px] text-orange-200/80 mt-0.5">Sent to Kitchen Display 2 at 12:44 PM</p>

                {/* Real-time Order Rows */}
                <div className="mt-2 space-y-1 text-[7.5px] font-mono">
                  <div className="flex justify-between text-slate-200">
                    <span>2x Malabar Chicken Dum Biryani</span>
                    <span className="text-orange-300 font-bold">₹560</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>1x Garlic Butter Naan Basket (4 pcs)</span>
                    <span className="text-orange-300 font-bold">₹180</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>2x Fresh Lime Mint Coolers</span>
                    <span className="text-orange-300 font-bold">₹160</span>
                  </div>
                </div>
              </div>

              {/* Thermal Receipt & POS Terminal SVG Graphic */}
              <div className="w-14 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* POS Body */}
                  <rect x="8" y="8" width="44" height="74" rx="8" fill="#1C1917" stroke="#EA580C" strokeWidth="1.2" />
                  {/* Screen */}
                  <rect x="12" y="14" width="36" height="34" rx="3" fill="#292524" />
                  <line x1="16" y1="22" x2="36" y2="22" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="28" x2="44" y2="28" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="16" y1="34" x2="30" y2="34" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="40" cy="38" r="4" fill="#22C55E" />
                  {/* Keypad dots */}
                  <circle cx="18" cy="56" r="2" fill="#78716C" />
                  <circle cx="30" cy="56" r="2" fill="#78716C" />
                  <circle cx="42" cy="56" r="2" fill="#78716C" />
                  <circle cx="18" cy="64" r="2" fill="#78716C" />
                  <circle cx="30" cy="64" r="2" fill="#78716C" />
                  <circle cx="42" cy="64" r="2" fill="#78716C" />
                  <rect x="18" y="72" width="24" height="4" rx="1.5" fill="#F97316" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Bill Settlement & Split</span>
            <span className="text-[7.5px] text-orange-400 font-mono font-semibold">GST 5% Added ›</span>
          </div>

          {/* Quick Actions (Print KOT, Split QR) */}
          <div className="grid grid-cols-2 gap-2 text-[7.5px] font-mono">
            <button className="py-2 bg-stone-900 border border-white/10 rounded-xl text-slate-200 font-bold flex items-center justify-center gap-1.5 hover:border-orange-500/40">
              <Receipt className="w-3 h-3 text-orange-400" />
              <span>PRINT KOT TICKET</span>
            </button>
            <button className="py-2 bg-stone-900 border border-white/10 rounded-xl text-slate-200 font-bold flex items-center justify-center gap-1.5 hover:border-cyan-500/40">
              <QrCode className="w-3 h-3 text-cyan-400" />
              <span>SHOW DYNAMIC UPI QR</span>
            </button>
          </div>

          {/* Floating Settle Bill Bar */}
          <div className="bg-stone-950/90 border border-orange-400/30 rounded-xl p-2 flex items-center justify-between">
            <div>
              <p className="text-[8px] font-bold text-white">Table Settle Total: ₹945</p>
              <p className="text-[6.5px] text-orange-400 font-mono">₹900 Items + ₹45 GST (CGST/SGST)</p>
            </div>
            <button className="px-2.5 py-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Close Table</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Floor" 
          tabs={[
            { name: "Floor", icon: Home },
            { name: "Menu", icon: Utensils },
            { name: "KOT Live", icon: Flame },
            { name: "Reports", icon: Receipt }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 15. DCOST - Merchant Directory & Discount Rewards Platform (RICH PRIVILEGES APP)
  // -------------------------------------------------------------
  if (id === "dcost") {
    return (
      <div className="w-full h-full bg-[#0D0A1C] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Member Tier & Brand Identity */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-950 border border-purple-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-purple-400 font-bold uppercase tracking-wider">DCost Privileges</span>
                  <span className="text-[6px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1 rounded border border-amber-400/30">GOLD PASS</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>Member: <b>Siddharth M (VIP #8490)</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-purple-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search 240+ partner cafes, salons, fashion outlets..." 
              className="w-full bg-purple-950/40 border border-purple-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-purple-100 placeholder:text-purple-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-purple-500/20 text-[6.5px] font-mono text-purple-300 font-bold">UP TO 40% OFF</span>
          </div>

          {/* Category Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Top Privileges", active: true },
              { label: "Dining & Cafes", active: false },
              { label: "Salons & Spas", active: false },
              { label: "Fashion Brands", active: false },
              { label: "Travel & Stays", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-purple-500 text-white border-purple-400 font-bold shadow-sm" 
                    : "bg-purple-950/40 text-purple-300 border-purple-500/20 hover:border-purple-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Digital Gold Card Pass Hero */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border border-purple-400/40 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">GOLD PRIVILEGE PASS</span>
                  <span className="text-[6.5px] font-mono text-emerald-400 font-bold">ACTIVE</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Instant 25% Off Dining & Fashion</h3>
                <p className="text-[7.5px] text-purple-200/80 mt-0.5 line-clamp-1">Valid across 240+ verified outlets in Kochi</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[7.5px] font-mono text-purple-300 bg-purple-950/80 border border-purple-500/30 px-1.5 py-0.5 rounded font-bold">
                    ID: DC-GOLD-8490
                  </span>
                  <span className="text-[7px] text-amber-300 font-mono">Saves ~₹4,800/mo</span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[8px] font-black flex items-center gap-1 shadow hover:from-purple-400 hover:to-indigo-400">
                    <QrCode className="w-2.5 h-2.5" /> Scan at Billing
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">Tap for QR</span>
                </div>
              </div>

              {/* Digital Gold Card Vector Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Card Body */}
                  <rect x="5" y="10" width="60" height="70" rx="8" fill="url(#dcostCardGrad)" stroke="#C084FC" strokeWidth="1" />
                  {/* EMV Chip */}
                  <rect x="12" y="20" width="14" height="10" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
                  <line x1="12" y1="25" x2="26" y2="25" stroke="#92400E" strokeWidth="0.8" />
                  {/* Contactless waves */}
                  <path d="M 50 18 Q 54 22 50 26" fill="none" stroke="#E9D5FF" strokeWidth="1" />
                  <path d="M 53 16 Q 58 22 53 28" fill="none" stroke="#E9D5FF" strokeWidth="1" />
                  {/* Brand text */}
                  <text x="12" y="46" fill="#F3E8FF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">DCOST</text>
                  <text x="12" y="54" fill="#C084FC" fontSize="4" fontFamily="sans-serif">GOLD VIP</text>
                  {/* QR Box */}
                  <rect x="36" y="48" width="22" height="22" rx="2" fill="#FFFFFF" />
                  <rect x="40" y="52" width="6" height="6" fill="#000000" />
                  <rect x="48" y="52" width="6" height="6" fill="#000000" />
                  <rect x="40" y="60" width="6" height="6" fill="#000000" />
                  <defs>
                    <linearGradient id="dcostCardGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#581C87" />
                      <stop offset="100%" stopColor="#1E1B4B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Partner Outlets Near You</span>
            <span className="text-[7.5px] text-purple-400 font-mono font-semibold">240+ Stores ›</span>
          </div>

          {/* 2 Merchant Rows */}
          <div className="space-y-1.5">
            <div className="bg-slate-900/80 border border-purple-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-purple-400 bg-purple-950 px-1 py-0.2 rounded font-bold">FINE DINING</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Barbeque Nation (Lulu Mall)</p>
                <p className="text-[6.5px] text-slate-400">Flat 20% off on dinner buffet • 400m away</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-emerald-400 block font-mono">20% OFF</span>
                <button className="text-[6.5px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold border border-purple-400/40 mt-0.5">
                  Claim Deal
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-purple-500/20 rounded-xl p-2 flex items-center justify-between">
              <div>
                <span className="text-[6px] font-mono text-cyan-400 bg-cyan-950 px-1 py-0.2 rounded font-bold">SALON & GROOMING</span>
                <p className="text-[8.5px] font-bold text-white mt-0.5">Toni & Guy Unisex Studio</p>
                <p className="text-[6.5px] text-slate-400">Exclusive Gold member styling packages</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-emerald-400 block font-mono">30% OFF</span>
                <button className="text-[6.5px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold border border-purple-400/40 mt-0.5">
                  Claim Deal
                </button>
              </div>
            </div>
          </div>

          {/* Quick Floating Bar */}
          <div className="bg-purple-950/80 border border-purple-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-purple-500 text-white flex items-center justify-center font-black text-[8px]">
                <QrCode className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Dynamic Offline QR Ready</p>
                <p className="text-[6.5px] text-purple-300 font-mono">Present at POS for instant discount</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-purple-500 hover:bg-purple-400 text-white text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Show QR</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Privileges" 
          tabs={[
            { name: "Privileges", icon: Home },
            { name: "Merchants", icon: Building },
            { name: "QR Pass", icon: QrCode },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 16. FLEXIFOLD - Interior Architecture & Modular Project Suite (RICH PROJECT APP)
  // -------------------------------------------------------------
  if (id === "flexifold") {
    return (
      <div className="w-full h-full bg-[#111116] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Project Name & Site Phase */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-amber-700 to-stone-950 border border-amber-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-amber-400 font-bold uppercase tracking-wider">Flexifold Studio</span>
                  <span className="text-[6px] bg-amber-500/20 text-amber-300 font-mono font-bold px-1 rounded border border-amber-400/30">SITE PHASE 4</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Building className="w-2.5 h-2.5 text-amber-400" />
                  <span>Site: <b>Skyline Penthouse 4BHK</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                78% COMPLETE
              </span>
            </div>
          </div>

          {/* Quick Project Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Execution Milestones", active: true },
              { label: "3D Floor Plans", active: false },
              { label: "Material Slabs", active: false },
              { label: "Vendor BOQ", active: false },
              { label: "Approvals", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-amber-500 text-black border-amber-400 font-bold shadow-sm" 
                    : "bg-stone-900 text-amber-300 border-amber-500/20 hover:border-amber-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Active Blueprint & Handover Hero Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-stone-900 via-amber-950/40 to-slate-950 border border-amber-400/30 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">PROJECT #FF-204</span>
                  <span className="text-[6.5px] font-mono text-cyan-300">HANDOVER: 12 DAYS</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Skyline Luxury Penthouse 4BHK</h3>
                <p className="text-[7.5px] text-slate-300 mt-0.5 line-clamp-1">Custom Italian Statuario marble • Acoustic fluted teak</p>
                
                {/* Progress bar */}
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[6.5px] font-mono text-slate-400">
                    <span>Overall Handover Progress</span>
                    <span className="text-amber-400 font-bold">78%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-cyan-400 h-full w-[78%]" />
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-amber-400 text-black text-[8px] font-black flex items-center gap-1 shadow hover:bg-amber-300">
                    <Layers className="w-2.5 h-2.5" /> View 3D Model
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">BOQ: ₹42.5L</span>
                </div>
              </div>

              {/* Architectural Isometric Blueprint SVG */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 90" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Isometric room floor */}
                  <polygon points="35,16 64,32 35,48 6,32" fill="#1C1917" stroke="#F59E0B" strokeWidth="1.2" />
                  {/* Walls */}
                  <polygon points="6,32 35,48 35,76 6,60" fill="#292524" stroke="#D97706" strokeWidth="1" />
                  <polygon points="35,48 64,32 64,60 35,76" fill="#44403C" stroke="#D97706" strokeWidth="1" />
                  {/* Interior furniture box */}
                  <polygon points="35,36 48,43 35,50 22,43" fill="#B45309" stroke="#FBBF24" strokeWidth="0.8" />
                  <polygon points="22,43 35,50 35,58 22,51" fill="#78350F" />
                  <polygon points="35,50 48,43 48,51 35,58" fill="#92400E" />
                  {/* Blueprint Grid Lines */}
                  <line x1="20" y1="24" x2="50" y2="40" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="24" x2="20" y2="40" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Work Breakdown Schedule</span>
            <span className="text-[7.5px] text-amber-400 font-mono font-semibold">4/5 Verified ›</span>
          </div>

          {/* 2 Schedule Rows */}
          <div className="space-y-1.5">
            <div className="bg-stone-900/80 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
              <div>
                <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded font-bold">DELIVERED</span>
                <p className="font-bold text-white text-[9px] mt-0.5">Modular Kitchen & Quartz Slabs</p>
                <p className="text-slate-400 text-[7px]">Material inspection verified by Site Lead</p>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            <div className="bg-stone-900/80 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
              <div>
                <span className="text-[6.5px] font-mono text-amber-400 bg-amber-950/60 px-1 py-0.2 rounded font-bold">IN PROGRESS</span>
                <p className="font-bold text-white text-[9px] mt-0.5">Master Bedroom Acoustic Wardrobe</p>
                <p className="text-slate-400 text-[7px]">Carpentry execution • Estimated handover: 3 days</p>
              </div>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          {/* Floating Action Bar */}
          <div className="bg-stone-950/90 border border-amber-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-amber-400 text-black flex items-center justify-center font-black text-[8px]">
                <Layers className="w-3 h-3 text-black" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Milestone 4 Sign-Off Ready</p>
                <p className="text-[6.5px] text-amber-300 font-mono">Releases ₹8.5L Vendor Escrow</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Sign Off</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Projects" 
          tabs={[
            { name: "Projects", icon: Home },
            { name: "3D Plans", icon: Layers },
            { name: "BOQ", icon: Receipt },
            { name: "Team", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 17. RELAX CALL - Anonymous 1-on-1 Stranger Voice Calling (RICH AUDIO SOCIAL APP)
  // -------------------------------------------------------------
  if (id === "relax-call") {
    return (
      <div className="w-full h-full bg-[#0D0819] text-white flex flex-col justify-between font-sans select-none relative overflow-hidden">
        <IOSStatusBar />

        {/* Header with Live Match Presence */}
        <div className="px-3 pt-1 pb-2 flex items-center justify-between border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-950 border border-purple-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
            </div>
            <div>
              <span className="text-[7.5px] font-mono text-purple-400 font-bold uppercase tracking-wider">Relax Call</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-[9.5px] font-black text-white">Voice Matchmaking</h4>
              </div>
            </div>
          </div>
          <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
            18,400 ONLINE
          </span>
        </div>

        {/* Pulsing Audio Radar & Frequency Ring */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 text-center space-y-2.5">
          <div className="relative">
            {/* Multiple Glowing Resonance Rings */}
            <div className="w-24 h-24 rounded-full bg-purple-950/60 border border-purple-500/40 flex items-center justify-center my-1 shadow-[0_0_35px_rgba(168,85,247,0.35)]">
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping opacity-40" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xl">
                <Volume2 className="w-7 h-7 text-white animate-pulse" />
              </div>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[6.5px] font-mono bg-emerald-500 text-black px-2 py-0.2 rounded-full font-black">
              CONNECTED
            </span>
          </div>

          <div>
            <h4 className="text-[11.5px] font-black text-white">Connected with Anonymous #729</h4>
            <p className="text-[7.5px] font-mono text-purple-300 mt-0.5">03:42 • High-Definition WebRTC Opus Audio</p>
            <span className="text-[6.5px] font-mono text-slate-400 mt-0.5 block">
              End-to-End Encrypted • No Phone Numbers Shared
            </span>
          </div>

          {/* Equalizer Frequency Visualization */}
          <div className="flex items-center justify-center gap-1 h-9 w-full max-w-[170px] bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
            {[45, 80, 100, 65, 90, 40, 95, 55, 75, 50, 85, 40, 70, 60].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-gradient-to-t from-purple-500 to-pink-400 rounded-full" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 text-[6.5px] font-mono text-slate-400">
            <span>Bitrate: <b>64kbps Opus</b></span>
            <span>Jitter: <b>1.2ms</b></span>
            <span className="text-emerald-400">100% Anonymous</span>
          </div>
        </div>

        {/* Call Action Controls */}
        <div className="px-4 pb-2 space-y-2">
          <div className="flex items-center justify-around bg-slate-950/80 border border-white/5 rounded-2xl p-2">
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white">
              <Mic className="w-3.5 h-3.5" />
              <span className="text-[6.5px] font-mono">MUTE</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
              <PhoneOff className="w-4 h-4" />
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[6.5px] font-mono">NEXT MATCH</span>
            </button>
          </div>

          <button className="w-full py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-[8px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30">
            <Heart className="w-3 h-3 text-white fill-current" />
            <span>SEND FRIEND INVITATION & CONTINUE CHAT</span>
          </button>
        </div>

        {/* Persistent Bottom Tab Bar */}
        <BottomTabBar 
          activeTab="Call" 
          tabs={[
            { name: "Call", icon: Mic },
            { name: "Topics", icon: Radio },
            { name: "Friends", icon: Heart },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 18. VESTIDO NATION - D2C Fashion & Apparel Boutique (RICH BOUTIQUE APP)
  // -------------------------------------------------------------
  if (id === "vestido-nation") {
    return (
      <div className="w-full h-full bg-[#14080F] text-white flex flex-col justify-between font-sans select-none overflow-hidden">
        <IOSStatusBar />

        {/* Scrollable Native App Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-0.5 pb-2 space-y-2.5">
          {/* Top Bar with Brand & Bag Badge */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-pink-700 to-rose-950 border border-pink-400/30 p-1 shrink-0 shadow-md flex items-center justify-center">
                <Image src={project.clientLogo} alt={project.client} fill className="object-contain p-0.5" sizes="32px" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-mono text-pink-400 font-bold uppercase tracking-wider">Vestido Boutique</span>
                  <span className="text-[6px] bg-pink-500/20 text-pink-300 font-mono font-bold px-1 rounded border border-pink-400/30">PARIS EDIT</span>
                </div>
                <div className="flex items-center gap-1 text-[8.5px] text-slate-300 font-medium">
                  <Sparkles className="w-2.5 h-2.5 text-pink-400" />
                  <span>Curated for: <b>Ria Menon</b></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                <Search className="w-3.5 h-3.5" />
              </button>
              <div className="relative">
                <button className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-500 rounded-full text-[7px] text-white font-black flex items-center justify-center shadow">3</span>
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-pink-400/80 absolute left-2.5 pointer-events-none" />
            <input 
              readOnly 
              type="text" 
              placeholder="Search silk wrap dresses, tailored blazers, co-ords..." 
              className="w-full bg-pink-950/40 border border-pink-500/25 rounded-xl pl-8 pr-3 py-1.5 text-[8.5px] text-pink-100 placeholder:text-pink-300/40 outline-none"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-pink-500/20 text-[6.5px] font-mono text-pink-300 font-bold">NEW IN</span>
          </div>

          {/* Horizontal Category Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            {[
              { label: "Summer Edit '26", active: true },
              { label: "Silk Dresses", active: false },
              { label: "Power Blazers", active: false },
              { label: "Linen Co-ords", active: false },
              { label: "Accessories", active: false }
            ].map((cat, idx) => (
              <span 
                key={idx} 
                className={`text-[7.5px] px-2.5 py-1 rounded-full whitespace-nowrap font-semibold border transition-colors ${
                  cat.active 
                    ? "bg-pink-500 text-white border-pink-400 font-bold shadow-sm" 
                    : "bg-pink-950/40 text-pink-300 border-pink-500/20 hover:border-pink-500/40"
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          {/* Haute Couture Hero Lookbook Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-950 via-rose-950 to-slate-950 border border-pink-400/40 p-3 shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex-1 pr-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[6.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">LIMITED DROP</span>
                  <span className="text-[6.5px] font-mono text-pink-300">100% MULBERRY SILK</span>
                </div>
                <h3 className="text-[11px] font-black text-white leading-tight">Handcrafted Floral Wrap Midi</h3>
                <p className="text-[7.5px] text-pink-200/80 mt-0.5 line-clamp-1">Bias cut silhouette • Custom waist drape</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-[12px] font-black font-mono text-pink-300">₹3,490</span>
                  <span className="text-[8px] font-mono line-through text-pink-200/40">₹4,990</span>
                  <span className="text-[7px] text-amber-300 font-bold">★ 4.9 (420)</span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-pink-500 text-white text-[8px] font-black flex items-center gap-1 shadow hover:bg-pink-400">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" /> Add to Bag
                  </button>
                  <span className="text-[7px] font-mono text-slate-400">Size M • 48H Dispatch</span>
                </div>
              </div>

              {/* Haute Couture Dress Mannequin SVG Graphic */}
              <div className="w-16 h-24 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 70 100" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {/* Hanger */}
                  <path d="M 35 12 L 35 6 C 35 3 32 3 30 5" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="20" y1="18" x2="50" y2="18" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Dress Silhouette */}
                  <path d="M 28 20 Q 35 28 42 20 L 46 36 L 40 44 L 54 84 L 16 84 L 30 44 L 24 36 Z" fill="url(#dressGrad)" stroke="#F43F5E" strokeWidth="1.2" />
                  {/* Waist ribbon wrap */}
                  <path d="M 27 44 Q 35 48 43 44" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="35" cy="46" r="2.5" fill="#F59E0B" />
                  <defs>
                    <linearGradient id="dressGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FB7185" />
                      <stop offset="100%" stopColor="#9F1239" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[9px] font-black tracking-wide text-white">Trending Runway Collection</span>
            <span className="text-[7.5px] text-pink-400 font-mono font-semibold">View All (32) ›</span>
          </div>

          {/* 2-Column Product Catalog Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Product Card 1 */}
            <div className="bg-slate-900/80 border border-pink-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-pink-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-pink-950/60 border border-pink-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-pink-500/20 text-pink-300 text-[6px] font-mono font-bold">BESTSELLER</span>
                {/* Midi Dress */}
                <svg viewBox="0 0 50 50" className="w-8 h-10">
                  <path d="M 18 10 L 32 10 L 36 22 L 28 26 L 38 46 L 12 46 L 22 26 L 14 22 Z" fill="#E11D48" stroke="#FDA4AF" strokeWidth="0.8" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Embroidered Chiffon Midi</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Rose Gold Trim • Evening Wear</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-pink-300">₹3,490</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 4.9</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-pink-500/20 hover:bg-pink-500 border border-pink-400/40 hover:text-white text-pink-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-slate-900/80 border border-pink-500/20 rounded-xl p-2 flex flex-col justify-between hover:border-pink-500/40 transition-colors">
              <div className="relative w-full h-16 rounded-lg bg-pink-950/60 border border-pink-500/15 flex items-center justify-center overflow-hidden mb-1.5">
                <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[6px] font-mono font-bold">POWER SUIT</span>
                {/* Structured Blazer */}
                <svg viewBox="0 0 50 50" className="w-10 h-10">
                  <path d="M 12 12 L 38 12 L 42 38 L 30 40 L 25 24 L 20 40 L 8 38 Z" fill="#1E1B4B" stroke="#818CF8" strokeWidth="0.8" />
                  <polygon points="20,12 25,24 30,12" fill="#E0E7FF" />
                </svg>
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-white leading-tight">Structured Blazer & Trousers</p>
                <p className="text-[6.5px] text-slate-400 mt-0.5">Power silhouette • Midnight Black</p>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[9.5px] font-bold font-mono text-pink-300">₹5,200</span>
                    <span className="text-[6.5px] text-amber-400 block">★ 5.0</span>
                  </div>
                  <button className="w-5 h-5 rounded-lg bg-pink-500/20 hover:bg-pink-500 border border-pink-400/40 hover:text-white text-pink-300 flex items-center justify-center font-bold">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Floating Checkout Bar */}
          <div className="bg-pink-950/80 border border-pink-400/30 rounded-xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-pink-500 text-white flex items-center justify-center font-black text-[8px]">
                3
              </div>
              <div>
                <p className="text-[8px] font-bold text-white">Bag Total: ₹8,690</p>
                <p className="text-[6.5px] text-pink-300 font-mono">Complimentary Luxury Gift Box</p>
              </div>
            </div>
            <button className="px-2.5 py-1 bg-pink-500 hover:bg-pink-400 text-white text-[7.5px] font-black rounded-lg flex items-center gap-1 shadow">
              <span>Checkout</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Shop" 
          tabs={[
            { name: "Shop", icon: Home },
            { name: "Runway", icon: Sparkles },
            { name: "Bag", icon: ShoppingBag },
            { name: "Account", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 19. KOOTUKARI - Regional Audio Social Networking Platform
  // -------------------------------------------------------------
  if (id === "kootukari") {
    return (
      <div className="w-full h-full bg-[#081216] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* App Top Navigation Bar */}
        <div className="px-3 pt-1 pb-1.5 border-b border-teal-500/20 bg-[#081216]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="relative w-7 h-7 rounded-lg bg-teal-950/80 border border-teal-500/30 p-0.5 shrink-0">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
            </div>
            <div>
              <span className="text-[6.5px] font-mono text-teal-400 font-bold uppercase tracking-wider block">MALAYALAM AUDIO CLUB</span>
              <h4 className="text-[10px] font-black text-white leading-tight">കൂട്ടുകാരി (Kootukari)</h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              1.2K LIVE
            </span>
            <button className="w-6 h-6 rounded-full bg-teal-900/50 border border-teal-500/20 flex items-center justify-center text-teal-300">
              <Bell className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-1 pb-2 space-y-2.5">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-teal-500 text-black shrink-0">All Stages</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">സിനിമ (Cinema)</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">സംഗീതം (Music)</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">രാഷ്ട്രീയം (Politics)</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Tech Talk</span>
          </div>

          {/* Active Live Stage Hero with Audio Frequency Waves & Speakers */}
          <div className="bg-gradient-to-br from-teal-950/90 via-slate-900 to-emerald-950/90 border border-teal-500/30 rounded-2xl p-2.5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-[7px] font-mono text-teal-300 mb-1.5">
              <span className="flex items-center gap-1 bg-red-950/80 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-black tracking-wide">
                <Radio className="w-2 h-2 text-red-400 animate-pulse" />
                ON STAGE NOW
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Users className="w-2.5 h-2.5" />
                842 Listening
              </span>
            </div>

            <h4 className="text-[11px] font-black text-white leading-tight">സിനിമ & സംഗീത ചർച്ചകൾ (Cinema Retro Talk)</h4>
            <p className="text-[7px] text-teal-200/80 mt-0.5">Moderator: Anjali Menon • Open Mic Community</p>

            {/* Stage Speakers Pods Visual */}
            <div className="my-2 p-2 rounded-xl bg-black/40 border border-white/5">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 ring-2 ring-emerald-400 ring-offset-1 ring-offset-black">
                      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-black text-white">AM</div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border border-black flex items-center justify-center">
                      <Mic className="w-1.5 h-1.5 text-black" />
                    </span>
                  </div>
                  <span className="text-[6.5px] font-bold text-white mt-1 truncate max-w-[45px]">Anjali</span>
                  <span className="text-[5.5px] text-emerald-400 font-mono">Speaking</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-teal-500/40 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[9px] font-bold text-teal-300">RK</div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-slate-700 border border-black flex items-center justify-center">
                      <MicOff className="w-1.5 h-1.5 text-slate-400" />
                    </span>
                  </div>
                  <span className="text-[6.5px] font-bold text-slate-300 mt-1 truncate max-w-[45px]">Rahul</span>
                  <span className="text-[5.5px] text-slate-500 font-mono">Muted</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-teal-500/40 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[9px] font-bold text-amber-300">SN</div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-slate-700 border border-black flex items-center justify-center">
                      <MicOff className="w-1.5 h-1.5 text-slate-400" />
                    </span>
                  </div>
                  <span className="text-[6.5px] font-bold text-slate-300 mt-1 truncate max-w-[45px]">Sneha</span>
                  <span className="text-[5.5px] text-slate-500 font-mono">Muted</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-dashed border-teal-500/40 p-0.5 flex items-center justify-center text-teal-400">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-[6.5px] font-bold text-teal-400 mt-1 truncate max-w-[45px]">Join Mic</span>
                  <span className="text-[5.5px] text-teal-300 font-mono">Waitlist (3)</span>
                </div>
              </div>

              {/* Live Audio Frequency Waves */}
              <div className="flex items-center justify-center gap-0.5 h-4 mt-2 px-2">
                {[14, 22, 10, 26, 18, 30, 24, 16, 28, 12, 20, 28, 14, 24, 18, 10].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-full"
                    style={{ height: `${h * 0.45}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] font-mono text-teal-300 pt-1 border-t border-white/10">
              <span className="text-slate-400">WebRTC Opus HD • 48 kHz</span>
              <span className="text-emerald-400 font-bold">Latency: 18ms</span>
            </div>
          </div>

          {/* Explore Community Rooms */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400">
              <span>FEATURED ACTIVE ROOMS</span>
              <span className="text-teal-400 font-bold">14 Online</span>
            </div>

            <div className="bg-slate-900/90 border border-white/5 hover:border-teal-500/30 rounded-xl p-2 flex items-center justify-between text-[8px] transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[6px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1 py-0.2 rounded font-bold">LATE NIGHT CHAT</span>
                  <span className="text-[6.5px] text-slate-400">312 tuned in</span>
                </div>
                <p className="font-bold text-white text-[9px]">നൊസ്റ്റാൾജിയ പാട്ടുകൾ (Melody Club)</p>
                <p className="text-slate-400 text-[7px]">Host: Harikrishnan • Playing 90s Ilaiyaraaja hits</p>
              </div>
              <button className="px-2 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg text-[7px] font-bold shrink-0">
                Tune In
              </button>
            </div>

            <div className="bg-slate-900/90 border border-white/5 hover:border-teal-500/30 rounded-xl p-2 flex items-center justify-between text-[8px] transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[6px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1 py-0.2 rounded font-bold">1-ON-1 RANDOM</span>
                  <span className="text-[6.5px] text-emerald-400">128 in queue</span>
                </div>
                <p className="font-bold text-white text-[9px]">Anonymous Malayalam Speed Call</p>
                <p className="text-slate-400 text-[7px]">Moderated voice match • Safe & private</p>
              </div>
              <button className="px-2 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-[7px] font-bold shrink-0">
                Start Call
              </button>
            </div>
          </div>
        </div>

        {/* Floating Join Stage Action Bar */}
        <div className="p-2 border-t border-teal-500/20 bg-[#081216]/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-black text-[8.5px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/25">
              <Radio className="w-3 h-3 text-black animate-pulse" />
              <span>JOIN STAGE & RAISE HAND</span>
            </button>
            <button className="w-8 h-8 rounded-xl bg-slate-900 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Rooms" 
          tabs={[
            { name: "Rooms", icon: Home },
            { name: "Topics", icon: Search },
            { name: "Host", icon: Radio },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 20. LIVE TO SMILE - Dental Clinic & Smile Design Care
  // -------------------------------------------------------------
  if (id === "live-to-smile") {
    return (
      <div className="w-full h-full bg-[#071318] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* App Top Navigation Bar */}
        <div className="px-3 pt-1 pb-1.5 border-b border-cyan-500/20 bg-[#071318]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="relative w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 p-0.5 shrink-0">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
            </div>
            <div>
              <span className="text-[6.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">DENTAL CARE & AESTHETICS</span>
              <h4 className="text-[10px] font-black text-white leading-tight">Live to Smile Clinic</h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CLINIC OPEN
            </span>
            <button className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
              <Calendar className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-1 pb-2 space-y-2.5">
          {/* Treatment Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-black shrink-0">All Services</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Invisalign Aligners</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Smile Makeover</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Implants</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Laser Whitening</span>
          </div>

          {/* Confirmed Dental Visit Hero with 3D Smile Makeover Scan Vector */}
          <div className="bg-gradient-to-br from-cyan-950/90 via-slate-900 to-teal-950/90 border border-cyan-500/30 rounded-2xl p-2.5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-[7px] font-mono text-cyan-300 mb-1">
              <span className="flex items-center gap-1 bg-cyan-900/60 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold">
                <Clock className="w-2 h-2 text-cyan-400" />
                TOMORROW • 11:30 AM
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                CHAIR RESERVED
              </span>
            </div>

            <div className="flex items-start gap-2.5 mt-1">
              <div className="flex-1">
                <h4 className="text-[11px] font-black text-white leading-tight">Digital 3D Smile Makeover Scan</h4>
                <p className="text-[7px] text-cyan-200/80 mt-0.5">Dr. Priya Nair (Cosmetic Orthodontist)</p>
                <div className="flex items-center gap-2 mt-2 text-[7px] font-mono">
                  <span className="text-slate-300">Token: <strong className="text-cyan-300">#D-12</strong></span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-300">Operatory 2</span>
                </div>
              </div>

              {/* Vector 3D Tooth / Orthodontic Aligner Illustration */}
              <div className="w-14 h-14 rounded-xl bg-cyan-950/60 border border-cyan-500/30 p-1 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 60 60" className="w-full h-full text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                  {/* Clean Dental Tooth Silhouette with Diamond Sparkle */}
                  <path d="M18 14 C14 20, 14 30, 20 48 C24 48, 25 36, 30 36 C35 36, 36 48, 40 48 C46 30, 46 20, 42 14 C38 8, 33 10, 30 12 C27 10, 22 8, 18 14 Z" fill="#0891b2" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
                  {/* Aligner Arch Wire Graphic */}
                  <path d="M16 26 C22 30, 38 30, 44 26" stroke="#a5f3fc" strokeWidth="2" strokeDasharray="2 2" fill="none" />
                  {/* Sparkle Star */}
                  <polygon points="46,12 48,16 52,18 48,20 46,24 44,20 40,18 44,16" fill="#fef08a" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[7px] font-mono">
              <span className="text-slate-400">Live to Smile Clinic, Calicut</span>
              <span className="text-cyan-300 font-bold flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                Directions
              </span>
            </div>
          </div>

          {/* Diagnostic Treatment Records & Active Plans */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400">
              <span>MY ACTIVE CARE PLANS</span>
              <span className="text-cyan-400 font-bold">In Progress</span>
            </div>

            {/* Invisalign Progress Tracker Card */}
            <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[6px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1 py-0.2 rounded font-bold">ORTHODONTICS</span>
                  <p className="font-bold text-white text-[9px] mt-0.5">Invisalign Clear Aligners</p>
                </div>
                <span className="text-[7.5px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">Tray 3 of 18</span>
              </div>
              
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[6.5px] font-mono text-slate-400">
                  <span>Wear Time: 21.5 hrs/day</span>
                  <span>16% Completed</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-[16%] h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Service Item Row */}
            <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
              <div>
                <span className="text-[6px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1 py-0.2 rounded font-bold">PREVENTIVE</span>
                <p className="font-bold text-white text-[9px] mt-0.5">Ultrasonic Scaling & Polishing</p>
                <p className="text-slate-400 text-[7px]">Deep plaque removal & fluoride enamel coating</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-mono text-white font-black block">₹1,200</span>
                <span className="text-[6.5px] text-cyan-400 font-mono">Book Next</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Consultation Booking Action Bar */}
        <div className="p-2 border-t border-cyan-500/20 bg-[#071318]/95 backdrop-blur-md shrink-0">
          <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-black text-[8.5px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25">
            <Calendar className="w-3 h-3 text-black" />
            <span>BOOK SPECIALIST DENTAL CONSULTATION</span>
          </button>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Care" 
          tabs={[
            { name: "Care", icon: Home },
            { name: "Scan", icon: Sparkles },
            { name: "Plans", icon: Receipt },
            { name: "Profile", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 21. FIRST TAP - Smart NFC Card Writer & Dynamic Business Card
  // -------------------------------------------------------------
  if (id === "first-tap") {
    return (
      <div className="w-full h-full bg-[#0A0D18] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* App Top Navigation Bar */}
        <div className="px-3 pt-1 pb-1.5 border-b border-blue-500/20 bg-[#0A0D18]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="relative w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-500/30 p-0.5 shrink-0">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
            </div>
            <div>
              <span className="text-[6.5px] font-mono text-blue-400 font-bold uppercase tracking-wider block">SMART NFC WRITER</span>
              <h4 className="text-[10px] font-black text-white leading-tight">First Tap Digital Card</h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[6.5px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded-full font-bold">
              <Radio className="w-2 h-2 text-cyan-400 animate-pulse" />
              NFC READY
            </span>
            <button className="w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500/20 flex items-center justify-center text-blue-300">
              <Share2 className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-1 pb-2 space-y-2.5">
          {/* Virtual Metallic NFC Card Hero Artwork */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-cyan-400/40 rounded-2xl p-3 shadow-xl relative overflow-hidden">
            {/* Metallic Brushed Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-[7px] font-mono text-cyan-300 tracking-widest uppercase font-black">FIRST LOGIC META LAB</span>
              {/* NFC Contactless Wave Symbol */}
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-[6.5px] font-mono text-amber-300 font-black">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-amber-300 stroke-current" fill="none" strokeWidth="2">
                  <path d="M8.5 16.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                  <path d="M12 19a8.5 8.5 0 0 0 0-14" strokeLinecap="round" />
                  <path d="M15.5 21.5a12 12 0 0 0 0-19" strokeLinecap="round" />
                </svg>
                <span>NFC</span>
              </div>
            </div>

            <div className="mt-3 relative z-10">
              <h4 className="text-[13px] font-black text-white leading-tight">Arjun V. Nair</h4>
              <p className="text-[7.5px] text-cyan-200/90 font-medium">Principal Solutions Architect</p>
              <p className="text-[6.5px] text-slate-400 font-mono mt-0.5">arjun@firstlogicmetalab.com • +91 98402 11099</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[7px] font-mono text-slate-300 relative z-10">
              <span className="text-slate-400">TAP PHONE TO EXCHANGE CONTACT</span>
              <span className="text-cyan-400 font-bold">VCF / vCard 4.0</span>
            </div>
          </div>

          {/* Real-time Card Analytics & Performance */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400">
              <span>REAL-TIME PERFORMANCE</span>
              <span className="text-emerald-400 font-bold">Updated Just Now</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2.5 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[6.5px] font-mono">PHYSICAL TAPS</span>
                  <Radio className="w-2.5 h-2.5 text-blue-400" />
                </div>
                <h3 className="text-base font-black text-white font-mono">384</h3>
                <span className="text-[6.5px] font-mono text-emerald-400">+28% this week</span>
              </div>

              <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2.5 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[6.5px] font-mono">SAVED CONTACTS</span>
                  <Users className="w-2.5 h-2.5 text-emerald-400" />
                </div>
                <h3 className="text-base font-black text-white font-mono">89</h3>
                <span className="text-[6.5px] font-mono text-cyan-400">23.1% conversion</span>
              </div>
            </div>

            {/* Quick Sharing Options */}
            <div className="grid grid-cols-2 gap-2 text-[7.5px] font-mono pt-1">
              <button className="py-2 bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 rounded-xl text-slate-300 font-bold flex items-center justify-center gap-1.5 transition-colors">
                <QrCode className="w-3 h-3 text-cyan-400" />
                <span>DYNAMIC QR</span>
              </button>
              <button className="py-2 bg-slate-900/90 border border-white/10 hover:border-blue-500/40 rounded-xl text-slate-300 font-bold flex items-center justify-center gap-1.5 transition-colors">
                <Share2 className="w-3 h-3 text-blue-400" />
                <span>AIRDROP / LINK</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Write NFC Action Bar */}
        <div className="p-2 border-t border-blue-500/20 bg-[#0A0D18]/95 backdrop-blur-md shrink-0">
          <button className="w-full py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-[8.5px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25">
            <Radio className="w-3 h-3 text-white animate-pulse" />
            <span>HOLD NEAR NFC CARD TO WRITE (NDEF)</span>
          </button>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Cards" 
          tabs={[
            { name: "Cards", icon: Home },
            { name: "Share", icon: QrCode },
            { name: "Analytics", icon: TrendingUp },
            { name: "Settings", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 22. EBOTTO - Omnichannel AI Chatbot & Customer Support
  // -------------------------------------------------------------
  if (id === "ebotto") {
    return (
      <div className="w-full h-full bg-[#08131B] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* App Top Navigation Bar */}
        <div className="px-3 pt-1 pb-1.5 border-b border-cyan-500/20 bg-[#08131B]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="relative w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 p-0.5 shrink-0">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
            </div>
            <div>
              <span className="text-[6.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">AI AGENT ENGINE</span>
              <h4 className="text-[10px] font-black text-white leading-tight">Ebotto Omnichannel</h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              WHATSAPP SYNC
            </span>
            <button className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Live Chat Thread */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-2 pb-2 space-y-2.5">
          {/* Chat Meta Header */}
          <div className="flex items-center justify-between text-[7px] font-mono text-slate-400 bg-slate-900/60 rounded-lg px-2 py-1 border border-white/5">
            <span>Customer: Rahul Nair (+91 98402 44100)</span>
            <span className="text-emerald-400 font-bold">Live Ticket #EB-491</span>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[8px] p-2.5 rounded-2xl rounded-tr-none max-w-[82%] shadow-md">
              <p className="leading-relaxed">Hi, where is my order #EB-491? It was supposed to be delivered today afternoon.</p>
              <div className="flex items-center justify-end gap-1 text-[6px] text-blue-200 mt-1">
                <span>10:42 AM</span>
                <span>✓✓</span>
              </div>
            </div>
          </div>

          {/* AI Bot message */}
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-cyan-500/30 text-white text-[8px] p-2.5 rounded-2xl rounded-tl-none max-w-[88%] shadow-lg">
              <div className="flex items-center justify-between text-[6.5px] font-mono text-cyan-400 mb-1">
                <div className="flex items-center gap-1 font-bold">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  <span>EBOTTO AI AGENT</span>
                </div>
                <span className="text-emerald-400 font-mono">Confidence: 99.4%</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Hello Rahul! Your package is currently out for delivery with Bluedart courier (AWB: 9840219). Driver is 4 stops away and estimated arrival is 11:30 AM today.
              </p>

              {/* Bot Quick Action Pills */}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                <button className="text-[6.5px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-1 rounded-lg font-mono font-bold flex items-center gap-1">
                  <MapPin className="w-2 h-2" />
                  <span>Track GPS</span>
                </button>
                <button className="text-[6.5px] bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 px-2 py-1 rounded-lg font-mono flex items-center gap-1">
                  <User className="w-2 h-2" />
                  <span>Talk to Human</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Automated Status Card */}
          <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-2 text-[7px] font-mono flex items-center justify-between">
            <span className="text-emerald-400">Automated Resolution Time: &lt;1.2s</span>
            <span className="text-slate-400">Zero Human Agent Cost</span>
          </div>
        </div>

        {/* Simulated Chat Input Box */}
        <div className="p-2 border-t border-cyan-500/20 bg-[#08131B]/95 backdrop-blur-md shrink-0">
          <div className="bg-slate-900 border border-white/15 rounded-xl p-1.5 pl-2.5 flex items-center justify-between text-[8px]">
            <span className="text-slate-400 text-[8px]">Type reply or trigger AI intent…</span>
            <div className="w-6 h-6 rounded-lg bg-cyan-500 text-black flex items-center justify-center shadow">
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </div>
          </div>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Chats" 
          tabs={[
            { name: "Chats", icon: Home },
            { name: "Bots", icon: Sparkles },
            { name: "Broadcast", icon: Radio },
            { name: "Settings", icon: User }
          ]} 
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 23. FINALFX - Multi-Tenant Restaurant POS & Kitchen Dispatch
  // -------------------------------------------------------------
  if (id === "finalfx") {
    return (
      <div className="w-full h-full bg-[#140A0D] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* App Top Navigation Bar */}
        <div className="px-3 pt-1 pb-1.5 border-b border-rose-500/20 bg-[#140A0D]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="relative w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-500/30 p-0.5 shrink-0">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
            </div>
            <div>
              <span className="text-[6.5px] font-mono text-rose-400 font-bold uppercase tracking-wider block">MULTI-TENANT RESTAURANT POS</span>
              <h4 className="text-[10px] font-black text-white leading-tight">FinalFX POS Suite</h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[6.5px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              OUTLET #3 (MALL)
            </span>
            <button className="w-6 h-6 rounded-full bg-rose-900/50 border border-rose-500/20 flex items-center justify-center text-rose-300">
              <Receipt className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-3 pt-1 pb-2 space-y-2.5">
          {/* Section Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 -mx-1 px-1">
            <span className="text-[7px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white shrink-0">All Tables</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Family AC Hall</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Rooftop Lounge</span>
            <span className="text-[7px] font-medium px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 shrink-0">Online Aggregators</span>
          </div>

          {/* Live POS Revenue & Turnover Metrics */}
          <div className="bg-gradient-to-br from-rose-950/90 via-slate-900 to-amber-950/90 border border-rose-500/30 rounded-2xl p-2.5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-[7px] font-mono text-rose-300 mb-1">
              <span>TODAY'S TURNOVER</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">148 ORDERS SERVED</span>
            </div>

            <div className="flex items-baseline justify-between mt-0.5">
              <h3 className="text-base font-black text-white font-mono">₹1,18,400<span className="text-[9px] text-slate-400">.00</span></h3>
              <span className="text-[7px] font-mono text-rose-300">92% Dine-in</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-white/10 text-[7px] font-mono">
              <div>
                <span className="text-slate-400 block text-[6px]">OCCUPIED</span>
                <span className="text-white font-bold">18 Tables</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[6px]">IN KITCHEN</span>
                <span className="text-amber-400 font-bold">6 KOTs</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[6px]">AVG PREP</span>
                <span className="text-emerald-400 font-bold">8.4 mins</span>
              </div>
            </div>
          </div>

          {/* Real-time Table Grid & Active Orders */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400">
              <span>LIVE FLOOR TICKETS</span>
              <span className="text-rose-400 font-bold">Active</span>
            </div>

            <div className="bg-slate-900/90 border border-white/5 hover:border-rose-500/30 rounded-xl p-2 flex items-center justify-between text-[8px] transition-colors">
              <div className="space-y-0.5">
                <span className="text-[6px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1 py-0.2 rounded font-bold">TABLE 4 (FAMILY)</span>
                <p className="font-bold text-white text-[9px] mt-0.5">Bill Ready: ₹3,420 • 6 Guests</p>
                <p className="text-slate-400 text-[7px]">Captain: Arun • Payment: UPI QR</p>
              </div>
              <button className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[7.5px] rounded-lg shadow">
                CLOSE BILL
              </button>
            </div>

            <div className="bg-slate-900/90 border border-white/5 hover:border-rose-500/30 rounded-xl p-2 flex items-center justify-between text-[8px] transition-colors">
              <div className="space-y-0.5">
                <span className="text-[6px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1 py-0.2 rounded font-bold">ONLINE SWIGGY ORDER</span>
                <p className="font-bold text-white text-[9px] mt-0.5">Order #FX-821 • 3 Items</p>
                <p className="text-slate-400 text-[7px]">Delivery agent arrived at dispatch counter</p>
              </div>
              <span className="text-[7.5px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                PACKED ✓
              </span>
            </div>
          </div>
        </div>

        {/* Floating Quick Action Bar */}
        <div className="p-2 border-t border-rose-500/20 bg-[#140A0D]/95 backdrop-blur-md shrink-0">
          <button className="w-full py-2 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white font-black text-[8.5px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30">
            <Utensils className="w-3 h-3 text-white" />
            <span>OPEN NEW TABLE KOT & FIRE TO KITCHEN</span>
          </button>
        </div>

        {/* Native Persistent Bottom App Navigation Bar */}
        <BottomTabBar 
          activeTab="Tables" 
          tabs={[
            { name: "Tables", icon: Home },
            { name: "Menu", icon: Utensils },
            { name: "KOT", icon: Clock },
            { name: "Sales", icon: Receipt }
          ]} 
        />
      </div>
    );
  }
  // -------------------------------------------------------------
  return (
    <div className="w-full h-full bg-[#090E17] text-white flex flex-col justify-between font-sans select-none">
      <IOSStatusBar />

      <div className="px-3 pt-1 pb-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-lg bg-slate-800 border border-white/10 p-0.5 shrink-0">
            <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
          </div>
          <div>
            <span className="text-[7px] font-mono text-cyan-400 font-bold block uppercase">{project.client}</span>
            <h4 className="text-[10px] font-black text-white truncate max-w-[130px]">{project.name}</h4>
          </div>
        </div>
        <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-1.5 py-0.5 rounded">ACTIVE</span>
      </div>

      <div className="px-3 py-1.5">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-2.5 shadow-lg">
          <span className="text-[7px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">ARCHITECTURE DEPLOYMENT</span>
          <h4 className="text-[10px] font-black text-white mt-0.5 leading-tight">{project.headline}</h4>
          <p className="text-[7.5px] text-slate-300 mt-1 line-clamp-2">{project.tagline}</p>
        </div>
      </div>

      <div className="px-3 space-y-1.5">
        <span className="text-[7.5px] font-mono text-slate-400 block">SYSTEM HIGHLIGHTS</span>
        {project.features.slice(0, 2).map((feat, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <p className="font-bold text-white text-[9px]">{feat.title}</p>
              <p className="text-slate-400 text-[7px] line-clamp-1">{feat.description}</p>
            </div>
            <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
          </div>
        ))}
      </div>

      <div className="p-3 pt-1">
        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25">
          <Zap className="w-3 h-3 text-white" />
          <span>EXPLORE LIVE APPLICATION INSTANCE</span>
        </button>
      </div>
    </div>
  );
}
