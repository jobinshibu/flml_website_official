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
  Home, User, Bookmark, Receipt
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
  // 1. CABCO - On-Demand Ride-Hailing & Taxi Dispatch (MAP-FIRST UI)
  // -------------------------------------------------------------
  if (id === "cabco") {
    return (
      <div className="w-full h-full bg-[#0E131F] text-white flex flex-col justify-between font-sans select-none relative overflow-hidden">
        <IOSStatusBar />

        {/* Realistic Simulated Vector Map Canvas */}
        <div className="absolute inset-0 bg-[#0B111E] overflow-hidden pointer-events-none">
          {/* Stylized Dark Map Grid / Roads */}
          <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <path d="M -20 80 Q 80 120 160 90 T 320 180" fill="none" stroke="#2563EB" strokeWidth="6" />
            <path d="M 40 0 L 100 450" fill="none" stroke="#1E293B" strokeWidth="8" />
            <path d="M 0 220 L 300 210" fill="none" stroke="#1E293B" strokeWidth="12" />
            <path d="M 120 140 L 280 320" fill="none" stroke="#334155" strokeWidth="4" />
            {/* GPS Route Dash */}
            <path d="M 60 130 Q 110 160 150 200 T 210 240" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 3" />
          </svg>

          {/* Map Pins */}
          <div className="absolute top-28 left-12 flex flex-col items-center">
            <div className="bg-emerald-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg">PICKUP</div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black" />
          </div>

          <div className="absolute top-44 right-14 flex flex-col items-center">
            <div className="bg-amber-400 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg">DRIVER (3m)</div>
            <div className="w-3 h-3 bg-amber-400 rounded-full border-2 border-black flex items-center justify-center">
              <Car className="w-2 h-2 text-black" />
            </div>
          </div>
        </div>

        {/* Floating Top Search Bar */}
        <div className="relative z-10 px-3 pt-1">
          <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-2xl flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <div className="flex-1 truncate">
              <span className="text-[7.5px] font-mono text-slate-400 block uppercase">Destination</span>
              <p className="text-[9.5px] font-bold text-white truncate">Dubai Int. Airport • Terminal 3</p>
            </div>
            <span className="text-[7px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">GPS OK</span>
          </div>
        </div>

        {/* Bottom Booking Drawer */}
        <div className="relative z-10 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-3 shadow-2xl space-y-2">
          <div className="w-8 h-1 rounded-full bg-slate-700 mx-auto" />
          
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono text-slate-400 tracking-wider">AVAILABLE FLEET</span>
            <span className="text-[7.5px] text-emerald-400 font-mono">No Surge Pricing</span>
          </div>

          {/* Vehicle Selector */}
          <div className="space-y-1.5">
            <div className="bg-blue-600/15 border border-cyan-500/40 rounded-xl p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold text-white">Cabco Comfort (Camry)</p>
                  <p className="text-[7px] text-slate-400">3 mins away • 4 Seats</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-cyan-300 block">AED 38.50</span>
                <span className="text-[7px] text-emerald-400">Fastest</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-2 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold text-slate-200">Cabco Black (Lexus ES)</p>
                  <p className="text-[7px] text-slate-400">6 mins away • VIP Quiet Ride</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-300">AED 62.00</span>
            </div>
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black text-[10px] rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25">
            <span>BOOK CABCO COMFORT</span>
            <ArrowRight className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. COOL TALK - Anonymous Audio Calling (VOICE HUD UI)
  // -------------------------------------------------------------
  if (id === "cool-talk") {
    return (
      <div className="w-full h-full bg-[#070D18] text-white flex flex-col justify-between font-sans select-none relative overflow-hidden">
        <IOSStatusBar />

        {/* Top Header */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10.5px] font-black text-sky-400">COOL TALK LIVE</span>
          </div>
          <span className="text-[7.5px] font-mono bg-sky-950 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full">18,240 ONLINE</span>
        </div>

        {/* Active Audio Waveform Visualizer Centerpiece */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 text-center space-y-3">
          <div className="relative">
            {/* Glowing Avatar Rings */}
            <div className="w-20 h-20 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center animate-pulse">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/30">
                <Mic className="w-6 h-6" />
              </div>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-mono bg-emerald-500 text-black px-1.5 py-0.2 rounded-full font-bold">SPEAKING</span>
          </div>

          <div>
            <h4 className="text-xs font-black text-white">Anonymous Otter (Kerala)</h4>
            <p className="text-[8px] font-mono text-sky-300/80 mt-0.5">Matched via: Tech & Startup Talk</p>
            <p className="text-[9.5px] font-mono text-slate-400 mt-1">04:32</p>
          </div>

          {/* Simulated Equalizer Audio Bars */}
          <div className="flex items-center justify-center gap-1 h-8 w-full max-w-[160px]">
            {[40, 75, 100, 60, 85, 30, 90, 50, 70, 45, 95, 35].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-gradient-to-t from-sky-500 to-cyan-300 rounded-full" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Voice Control Buttons HUD */}
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <button className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white">
              <MicOff className="w-4 h-4" />
            </button>
            <button className="w-11 h-11 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/40">
              <PhoneOff className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <button className="w-full py-2 bg-slate-900 border border-sky-500/30 text-sky-300 font-bold text-[8.5px] rounded-xl flex items-center justify-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-sky-400" />
            <span>SKIP TO NEXT STRANGER MATCH</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. FOODZER - Food Delivery (RESTAURANT & DISH STEPPER UI)
  // -------------------------------------------------------------
  if (id === "foodzer") {
    return (
      <div className="w-full h-full bg-[#110B07] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* Top Header Location & Search */}
        <div className="px-3 pt-1 pb-2 border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <span className="text-[7.5px] font-mono text-amber-400 font-bold block leading-none">DELIVERING TO</span>
                <p className="text-[9.5px] font-bold text-white leading-tight">Emerald Heights, Flat 402</p>
              </div>
            </div>
            <span className="text-[7.5px] font-mono text-amber-300 bg-amber-950 border border-amber-500/30 px-2 py-0.5 rounded-full">25 MINS</span>
          </div>
        </div>

        {/* Cuisine Filter Pills */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto text-[7.5px] font-bold">
          <span className="bg-amber-400 text-black px-2 py-0.5 rounded-full shrink-0">Biriyani</span>
          <span className="bg-slate-900 text-slate-300 border border-white/10 px-2 py-0.5 rounded-full shrink-0">Mandhi</span>
          <span className="bg-slate-900 text-slate-300 border border-white/10 px-2 py-0.5 rounded-full shrink-0">Burgers</span>
          <span className="bg-slate-900 text-slate-300 border border-white/10 px-2 py-0.5 rounded-full shrink-0">Juices</span>
        </div>

        {/* Menu Items with Steppers */}
        <div className="flex-1 px-3 space-y-2 overflow-y-auto">
          {/* Restaurant Header */}
          <div className="bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/30 rounded-xl p-2 flex items-center justify-between">
            <div>
              <span className="text-[7px] text-amber-400 font-mono font-bold">MALABAR KITCHEN</span>
              <h4 className="text-[10px] font-extrabold text-white">Thalassery Dum Specialty</h4>
              <p className="text-[7px] text-slate-400">4.9 ★ (1.4k reviews) • 1.2 km</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          {/* Dish 1 */}
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between">
            <div className="flex-1">
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded font-bold">BESTSELLER</span>
              <p className="text-[9px] font-bold text-white mt-0.5">Special Thalassery Dum Biriyani</p>
              <p className="text-[7px] text-slate-400">Served with date pickle, raita & sulaimani</p>
              <span className="text-[9.5px] font-black text-amber-400 mt-0.5 block">₹240</span>
            </div>
            {/* Stepper */}
            <div className="bg-amber-400 text-black rounded-lg px-2 py-1 flex items-center gap-1.5 font-bold text-[8px] shadow-sm">
              <Minus className="w-2.5 h-2.5" />
              <span>1</span>
              <Plus className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Dish 2 */}
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between">
            <div className="flex-1">
              <span className="text-[6.5px] font-mono text-amber-400 bg-amber-950/60 px-1 py-0.2 rounded font-bold">CHARCOAL</span>
              <p className="text-[9px] font-bold text-white mt-0.5">Peri-Peri Al-Faham (Quarter)</p>
              <p className="text-[7px] text-slate-400">Includes 2 Kuboos & Garlic Toum</p>
              <span className="text-[9.5px] font-black text-amber-400 mt-0.5 block">₹180</span>
            </div>
            <div className="bg-slate-800 border border-amber-500/40 text-amber-300 rounded-lg px-2 py-1 flex items-center gap-1 font-bold text-[8px]">
              <Plus className="w-2.5 h-2.5" />
              <span>ADD</span>
            </div>
          </div>
        </div>

        {/* Floating Cart Pill */}
        <div className="p-3 pt-1">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-xl p-2 px-3 flex items-center justify-between shadow-lg shadow-amber-500/25">
            <div>
              <span className="text-[7px] font-mono uppercase font-black">1 ITEM IN CART</span>
              <p className="text-[10px] font-black leading-none">₹240 • VIEW CHECKOUT</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. MYVAAHAN - Automotive Garage ERP (DIAGNOSTIC WORKSHOP UI)
  // -------------------------------------------------------------
  if (id === "myvaahan") {
    return (
      <div className="w-full h-full bg-[#0B0F19] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* Workshop Header */}
        <div className="px-3 pt-1 pb-2 border-b border-blue-500/20 flex items-center justify-between">
          <div>
            <span className="text-[7px] font-mono text-cyan-400 block font-bold">WORKSHOP ERP #BAY-02</span>
            <h4 className="text-[10.5px] font-black text-white">MyVaahan Diagnostics</h4>
          </div>
          <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE OBD
          </span>
        </div>

        {/* Vehicle HUD Gauge Card */}
        <div className="px-3 py-1.5">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-900 border border-blue-500/30 rounded-2xl p-2.5 shadow-lg">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-[7px] font-mono text-slate-400">VEHICLE DETAILS</span>
                <p className="text-[10px] font-black text-white">Hyundai Creta 1.5 SX (Petrol)</p>
                <p className="text-[7px] font-mono text-cyan-400">KL-10-AZ-4521 • 38,420 KM</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-cyan-400">
                <Car className="w-5 h-5" />
              </div>
            </div>

            {/* Health Indicators */}
            <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/5 text-center">
              <div className="bg-slate-950/80 p-1 rounded-lg">
                <span className="text-[6.5px] font-mono text-slate-400 block">Battery</span>
                <span className="text-[8.5px] font-bold text-emerald-400">12.6V OK</span>
              </div>
              <div className="bg-slate-950/80 p-1 rounded-lg">
                <span className="text-[6.5px] font-mono text-slate-400 block">Oil Life</span>
                <span className="text-[8.5px] font-bold text-amber-400">18% Replace</span>
              </div>
              <div className="bg-slate-950/80 p-1 rounded-lg">
                <span className="text-[6.5px] font-mono text-slate-400 block">Brakes</span>
                <span className="text-[8.5px] font-bold text-emerald-400">Front 60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Workflow Stepper */}
        <div className="px-3">
          <span className="text-[7.5px] font-mono text-slate-400 block mb-1">SERVICE STAGE TRACKER</span>
          <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-xl border border-white/5 text-[7px] font-mono">
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

        {/* Parts Approval List */}
        <div className="px-3 space-y-1.5">
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <p className="font-bold text-white text-[9px]">Full Synthetic Oil (5W-30) + Filter</p>
              <p className="text-slate-400 text-[7px]">Shell Helix Ultra (3.8L)</p>
            </div>
            <span className="font-mono text-cyan-400 font-bold">₹3,450</span>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25">
            <Wrench className="w-3 h-3 text-white" />
            <span>AUTHORIZE SERVICE & SPARES</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. HEALINE - Healthcare Tele-Consult & E-Pharmacy (CLINIC PORTAL UI)
  // -------------------------------------------------------------
  if (id === "healine") {
    return (
      <div className="w-full h-full bg-[#071318] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* Doctor Header */}
        <div className="px-3 pt-1 pb-2 border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[7px] font-mono text-teal-400 font-bold block">UAE HIPAA PORTAL</span>
              <h4 className="text-[10px] font-black text-white">My Healine Tele-Clinic</h4>
            </div>
          </div>
          <span className="text-[7px] font-mono text-teal-300 bg-teal-950 border border-teal-500/30 px-1.5 py-0.5 rounded">DHA LICENSED</span>
        </div>

        {/* Calendar Day Strip */}
        <div className="px-3 py-1">
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
                className={`flex-1 py-1.5 rounded-xl border ${d.active ? "bg-teal-500 text-black border-teal-400 font-bold" : "bg-slate-900/60 border-white/5 text-slate-400"}`}
              >
                <span className="text-[6.5px] font-mono block">{d.day}</span>
                <span className="text-[9px] font-black block mt-0.5">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Doctor Consultation Card */}
        <div className="px-3 space-y-2">
          <div className="bg-gradient-to-br from-teal-950/80 to-slate-900 border border-teal-500/30 rounded-2xl p-2.5 shadow-lg">
            <div className="flex items-center justify-between text-[7px] font-mono text-teal-300 mb-1">
              <span>TODAY • 4:30 PM (GST)</span>
              <span className="text-emerald-400 font-bold">CONFIRMED</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-black text-xs">
                DR
              </div>
              <div>
                <h4 className="text-[10px] font-extrabold text-white">Dr. Sarah Al Mansoori</h4>
                <p className="text-[7.5px] text-slate-300">Consultant Cardiologist • Aster Dubai</p>
                <p className="text-[7px] text-teal-400 font-mono mt-0.5">Insurance: Daman / NextCare 100%</p>
              </div>
            </div>
          </div>

          {/* E-Pharmacy Quick Refill */}
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between">
            <div>
              <span className="text-[6.5px] font-mono text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded font-bold">ACTIVE PRESCRIPTION</span>
              <p className="text-[9px] font-bold text-white mt-0.5">Atorvastatin 20mg (90 Tablets)</p>
              <p className="text-[7px] text-slate-400">Refill authorized by Dr. Sarah</p>
            </div>
            <span className="text-[8px] font-bold text-emerald-400">Refill Ready</span>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/25">
            <PhoneCall className="w-3 h-3 text-black" />
            <span>ENTER TELE-CONSULTATION ROOM</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 6. SCHOSYS - School Management ERP (STUDENT ATTENDANCE & GRADES UI)
  // -------------------------------------------------------------
  if (id === "schosys") {
    return (
      <div className="w-full h-full bg-[#080E1C] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* Student Bar */}
        <div className="px-3 pt-1 pb-2 border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold text-[10px]">
              AN
            </div>
            <div>
              <span className="text-[7px] font-mono text-indigo-400 font-bold block">GRADE 10-A • ROLL #14</span>
              <h4 className="text-[10px] font-black text-white">Aarav Nair</h4>
            </div>
          </div>
          <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded-full">TERM 2</span>
        </div>

        {/* Circular Donut Metric Strip */}
        <div className="px-3 py-1.5 grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-2.5 flex items-center gap-2.5">
            {/* Simulated Donut Chart */}
            <div className="relative w-9 h-9 rounded-full border-4 border-indigo-500 flex items-center justify-center text-[8px] font-black text-indigo-300 shrink-0">
              96%
            </div>
            <div>
              <span className="text-[7px] font-mono text-slate-400 block">ATTENDANCE</span>
              <span className="text-[9.5px] font-bold text-white">114 / 118 Days</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-2.5 flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full border-4 border-emerald-500 flex items-center justify-center text-[8px] font-black text-emerald-300 shrink-0">
              A+
            </div>
            <div>
              <span className="text-[7px] font-mono text-slate-400 block">GPA RANK</span>
              <span className="text-[9.5px] font-bold text-white">Class Rank 3rd</span>
            </div>
          </div>
        </div>

        {/* Exam Timetable List */}
        <div className="px-3 space-y-1.5">
          <span className="text-[7.5px] font-mono text-slate-400 block">UPCOMING TERM 2 EXAMS</span>
          
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <p className="font-bold text-white text-[9px]">Mathematics (Algebra & Trig)</p>
              <p className="text-slate-400 text-[7px]">Thursday, 15 Nov • Hall B • 09:30 AM</p>
            </div>
            <span className="text-indigo-400 font-mono font-bold">100 Marks</span>
          </div>

          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <p className="font-bold text-white text-[9px]">Physics (Electromagnetism)</p>
              <p className="text-slate-400 text-[7px]">Monday, 19 Nov • Lab Bay 1</p>
            </div>
            <span className="text-indigo-400 font-mono font-bold">75 Marks</span>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25">
            <BookOpen className="w-3 h-3 text-white" />
            <span>DOWNLOAD PROGRESS CARD & RECEIPT</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 7. VIVLINO - Store Debt Note & Khata Ledger (FINANCE LEDGER UI)
  // -------------------------------------------------------------
  if (id === "vivlino") {
    return (
      <div className="w-full h-full bg-[#0A0F1D] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* Ledger Header */}
        <div className="px-3 pt-1 pb-2 border-b border-blue-500/20 flex items-center justify-between">
          <div>
            <span className="text-[7px] font-mono text-blue-400 font-bold block">MERCHANT KHATA #BAH-91</span>
            <h4 className="text-[10.5px] font-black text-white">Vivlino Debt Notes</h4>
          </div>
          <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-1.5 py-0.5 rounded">AUTOPAY ACTIVE</span>
        </div>

        {/* Big Balance Amount Card */}
        <div className="px-3 py-1.5">
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-3 shadow-lg">
            <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest block">Total Pending Receivables</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-black text-white">BHD 1,840.500</span>
              <span className="text-[8px] font-mono text-amber-400 font-bold">14 Notes</span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[7.5px]">
              <span className="text-slate-400">Automated Reminders: Sent 12 today</span>
              <span className="text-emerald-400 font-bold">+BHD 320 Received</span>
            </div>
          </div>
        </div>

        {/* Customer Accounts */}
        <div className="px-3 space-y-1.5">
          <span className="text-[7.5px] font-mono text-slate-400 block">OVERDUE CLIENTS</span>
          
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-rose-400 bg-rose-950/60 px-1 py-0.2 rounded font-bold">DUE 14 DAYS</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Ahmed Al Hiddad (Contractor)</p>
              <p className="text-slate-400 text-[7px]">+973 3941 2284 • 40 Bags Cement</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-rose-400 font-bold block text-[9.5px]">BHD 420.000</span>
              <span className="text-[7px] text-cyan-400 font-bold">Remind SMS</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-amber-400 bg-amber-950/60 px-1 py-0.2 rounded font-bold">PARTIAL PAID</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Gulf Star Auto Workshop</p>
              <p className="text-slate-400 text-[7px]">Paid BHD 200 • Bal BHD 185.500</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-amber-300 font-bold block text-[9.5px]">BHD 185.500</span>
              <span className="text-[7px] text-emerald-400">Paid 50%</span>
            </div>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25">
            <CreditCard className="w-3 h-3 text-white" />
            <span>+ RECORD NEW CUSTOMER DEBT NOTE</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 8. AMERICAN BOARD - RPA Accreditation Registry (AUDIT PIPELINE UI)
  // -------------------------------------------------------------
  if (id === "american-board") {
    return (
      <div className="w-full h-full bg-[#080D1A] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* RPA Header */}
        <div className="px-3 pt-1 pb-2 border-b border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[7px] font-mono text-blue-400 font-bold block">RPA REGISTRY ENGINE</span>
              <h4 className="text-[10px] font-black text-white">American Board Verify</h4>
            </div>
          </div>
          <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded-full">AUDITED</span>
        </div>

        {/* Live Terminal RPA Log Strip */}
        <div className="px-3 py-1.5">
          <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-2.5 font-mono text-[7px] shadow-lg space-y-1">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
              <span>RPA PIPELINE LOG</span>
              <span className="text-emerald-400">LATENCY &lt; 28s</span>
            </div>
            <p className="text-slate-300">[17:42:01] <span className="text-cyan-400">RPA_WORKER_04:</span> Poll registrar DB</p>
            <p className="text-slate-300">[17:42:04] <span className="text-emerald-400">HASH_MATCH:</span> Candidate #AB-8492 verified</p>
            <p className="text-slate-300">[17:42:08] <span className="text-indigo-400">CRYPTO_SEAL:</span> Tamper-proof QR signed</p>
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="px-3 space-y-1.5">
          <span className="text-[7.5px] font-mono text-slate-400 block">ACCREDITATION DISPATCHES</span>
          
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded font-bold">DIGITAL BADGE</span>
              <p className="font-bold text-white text-[9px] mt-0.5">International Teaching License</p>
              <p className="text-slate-400 text-[7px]">Candidate: Elena Rostova • Grade: Distinction</p>
            </div>
            <span className="font-mono text-emerald-400 font-bold text-[8.5px]">Verified</span>
          </div>

          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded font-bold">LEGACY BRIDGE</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Oracle SIS Mainframe Sync</p>
              <p className="text-slate-400 text-[7px]">1,480 transcript records updated today</p>
            </div>
            <span className="font-mono text-cyan-400 font-bold text-[8.5px]">Synced</span>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25">
            <QrCode className="w-3 h-3 text-white" />
            <span>SCAN CANDIDATE CREDENTIAL QR</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 9. QARO - Emergency Roadside Breakdown Dispatch (EMERGENCY SOS UI)
  // -------------------------------------------------------------
  if (id === "qaro") {
    return (
      <div className="w-full h-full bg-[#180A0A] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* Emergency SOS Header */}
        <div className="px-3 pt-1 pb-2 border-b border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[7px] font-mono text-rose-400 font-bold block">24/7 UAE BREAKDOWN</span>
              <h4 className="text-[10px] font-black text-white">Qaro Road Recovery</h4>
            </div>
          </div>
          <span className="text-[7px] font-mono text-rose-400 bg-rose-950 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            DISPATCH ACTIVE
          </span>
        </div>

        {/* Real-time Flatbed Truck ETA Card */}
        <div className="px-3 py-1.5">
          <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 border border-rose-500/40 rounded-2xl p-3 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[7.5px] font-mono text-rose-300 font-bold">RECOVERY TRUCK #492</span>
              <span className="text-[9px] font-black text-amber-400">ETA: 6 MINS</span>
            </div>
            <p className="text-[10px] font-black text-white">Sheikh Zayed Road, Exit 39 (Near Al Barsha)</p>
            <div className="flex items-center justify-between text-[7.5px] text-slate-400 pt-1 border-t border-rose-500/20">
              <span>Driver: Tarek (Flatbed Tow)</span>
              <span className="text-rose-400 font-bold">Vehicle: Audi Q7 (Plate 4920)</span>
            </div>
          </div>
        </div>

        {/* Nearby Certified Dubai Garages */}
        <div className="px-3 space-y-1.5">
          <span className="text-[7.5px] font-mono text-slate-400 block">DIRECT TOW DESTINATION</span>
          
          <div className="bg-slate-900/90 border border-white/5 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded font-bold">RECOMMENDED</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Al Quoz German Auto Care</p>
              <p className="text-slate-400 text-[7px]">Audi / Porsche Certified • 1.4 km</p>
            </div>
            <span className="font-mono text-white font-bold text-[9px]">AED 350</span>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30">
            <Car className="w-3 h-3 text-white" />
            <span>DISPATCH EMERGENCY FLATBED TRUCK</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 10. KARIKKU - FMCG Tender Coconut Harvest D2C (ECOMMERCE STORE UI)
  // -------------------------------------------------------------
  if (id === "karikku") {
    return (
      <div className="w-full h-full bg-[#08150F] text-white flex flex-col justify-between font-sans select-none">
        <IOSStatusBar />

        {/* D2C Store Header */}
        <div className="px-3 pt-1 pb-2 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 p-0.5 shrink-0">
              <Image src={project.clientLogo} alt={project.client} fill className="object-contain" sizes="28px" />
            </div>
            <div>
              <span className="text-[7px] font-mono text-emerald-400 block font-bold">FARM TO DOORSTEP</span>
              <h4 className="text-[10px] font-black text-emerald-200">Karikku Natural</h4>
            </div>
          </div>
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full text-[6px] text-black font-black flex items-center justify-center">2</span>
          </div>
        </div>

        {/* Farm Fresh Product Card */}
        <div className="px-3 py-1.5">
          <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-2.5 shadow-lg">
            <div className="flex items-center justify-between text-[7px] font-mono text-emerald-300 mb-1">
              <span>TODAY'S HARVEST</span>
              <span className="text-emerald-400 font-bold">ZERO PRESERVATIVES</span>
            </div>
            <h4 className="text-[10.5px] font-black text-white leading-tight">Pure Raw Tender Coconut Water</h4>
            <p className="text-[7.5px] text-emerald-200/80 mt-0.5">Bottled within 4 hours • Natural electrolytes</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">Estate Fresh</span>
              <span className="text-[7px] text-emerald-400">Same-Day Delivery</span>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="px-3 space-y-1.5">
          <div className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded font-bold">ORGANIC</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Tender Water (500ml Pet Bottle)</p>
              <p className="text-slate-400 text-[7px]">High potassium • 0 added sugar</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-emerald-300 font-bold block text-[9.5px]">₹95</span>
              <span className="text-[7px] text-amber-400">4.9 ★</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-2 flex items-center justify-between text-[8px]">
            <div>
              <span className="text-[6.5px] font-mono text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded font-bold">COLD-PRESSED</span>
              <p className="font-bold text-white text-[9px] mt-0.5">Virgin Coconut Oil (1000ml)</p>
              <p className="text-slate-400 text-[7px]">Centrifuge extracted • Raw Grade</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-emerald-300 font-bold block text-[9.5px]">₹480</span>
              <span className="text-[7px] text-amber-400">5.0 ★</span>
            </div>
          </div>
        </div>

        <div className="p-3 pt-1">
          <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-[9px] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20">
            <ShoppingBag className="w-3 h-3 text-black" />
            <span>CHECKOUT VIA RAZORPAY (₹575)</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Default Template (used with domain styling for other apps)
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
