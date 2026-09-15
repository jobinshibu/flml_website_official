"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Check,
  Clock,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    domain: "Enterprise Software",
    timeline: "Immediate (Next 30 Days)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section
      id="consultation"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#04060E] via-[#060F26] to-[#030612] text-white relative overflow-hidden border-t border-white/[0.08]"
    >
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="consult-cyber-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#2563EB" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#consult-cyber-grid)" />
        </svg>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0A369D]/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: EDITORIAL CONTENT & GUARANTEES */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1327] border border-blue-500/30 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300">
                # INITIATE PROTOCOL
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
              System <br />
              <span className="text-[#3B82F6]">
                Transformation.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8">
              Discuss your architectural bottlenecks, throughput targets, and system roadmap directly with our principal engineers.
            </p>

            {/* Key Guarantees */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#091124]/70 border border-white/10 backdrop-blur-md">
                <div className="w-9 h-9 rounded-lg bg-[#0F1B38] border border-blue-500/30 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    Confidential &amp; NDA Protected
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Your architecture, metrics, and operational workflows remain strictly confidential under mutual NDA.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#091124]/70 border border-white/10 backdrop-blur-md">
                <div className="w-9 h-9 rounded-lg bg-[#0F1B38] border border-blue-500/30 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5 shadow-sm">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    24-Hour Architect SLA
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Direct technical review and response from a senior systems architect within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COMMAND CENTER CONSULTATION FORM */}
          <div className="lg:col-span-7">
            <div className="bg-[#081024]/90 border border-blue-500/30 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.8)]">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-1">
                      Request Architectural Review
                    </h3>
                    <p className="text-xs text-slate-400 font-light mb-6">
                      Provide your technical parameters below to schedule an engineering discovery session.
                    </p>
                  </div>

                  {/* Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full bg-[#050B18] border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        suppressHydrationWarning
                        placeholder="architect@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#050B18] border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Industry & Timeline Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5">
                        Operational Sector
                      </label>
                      <select
                        value={formData.domain}
                        suppressHydrationWarning
                        onChange={(e) =>
                          setFormData({ ...formData, domain: e.target.value })
                        }
                        className="w-full bg-[#050B18] border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Enterprise Software">Enterprise Software</option>
                        <option value="E-Commerce & Retail">E-Commerce &amp; Retail</option>
                        <option value="FinTech & Real Estate">FinTech &amp; Real Estate</option>
                        <option value="Healthcare & Bio-Tech">Healthcare &amp; Bio-Tech</option>
                        <option value="Manufacturing & Logistics">Manufacturing &amp; Logistics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        suppressHydrationWarning
                        onChange={(e) =>
                          setFormData({ ...formData, timeline: e.target.value })
                        }
                        className="w-full bg-[#050B18] border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                        <option value="Quarterly (1-3 Months)">Quarterly (1-3 Months)</option>
                        <option value="Strategic Planning (3-6 Months)">Strategic Planning (3-6 Months)</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5">
                      System Objectives / Core Bottlenecks
                    </label>
                    <textarea
                      rows={3}
                      suppressHydrationWarning
                      placeholder="Briefly describe your existing stack, scaling targets, or throughput bottlenecks..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-[#050B18] border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    className="w-full bg-[#0A369D] hover:bg-[#1D4ED8] text-white font-bold text-sm tracking-wider uppercase py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(10,54,157,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-[#2563EB]/40 disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>PROCESSING REQUEST...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT CONSULTATION REQUEST</span>
                        <ArrowRight className="w-4 h-4 text-blue-200" />
                      </>
                    )}
                  </button>

                  <div className="text-[11px] font-mono text-center text-slate-400 pt-2 flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3 text-[#3B82F6]" />
                    <span>Zero spam &bull; 100% confidential senior engineer review</span>
                  </div>
                </form>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase mb-3">
                    Request Transmitted.
                  </h3>

                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 font-light leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. A principal systems architect will review your parameters and follow up at <span className="text-[#3B82F6] font-semibold">{formData.email}</span> within 24 hours.
                  </p>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        domain: "Enterprise Software",
                        timeline: "Immediate (Next 30 Days)",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono tracking-wider uppercase text-white transition-colors cursor-pointer"
                  >
                    TRANSMIT ANOTHER INQUIRY
                  </button>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
