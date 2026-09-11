"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "domain",
    title: "IDENTIFY OPERATIONAL DOMAIN",
    options: ["E-Commerce & Retail", "Healthcare & Ed-Tech", "Real Estate & Manufacturing", "Other Enterprise Sector"]
  },
  {
    id: "scale",
    title: "SELECT SCALE OF OPERATIONS",
    options: ["Under ₹20L", "₹20L - ₹50L", "₹50L - ₹1Cr", "Over ₹1Cr"]
  },
  {
    id: "challenge",
    title: "PRIMARY OPERATIONAL BOTTLENECK",
    options: ["Legacy System Limitations", "Fragmented Operations & Data", "Scaling & Performance Issues", "Not Sure / Need Consultation"]
  }
];

export default function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelect = (option: string) => {
    if (step < questions.length) {
      setAnswers({ ...answers, [questions[step].id]: option });
      setTimeout(() => setStep(step + 1), 250);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section id="consultation" className="py-24 md:py-36 px-6 md:px-12 bg-black text-white relative border-b border-white/10">
      
      <div className="max-w-[850px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-white/50">
              06 // INITIATE DIAGNOSTIC BRIEF
            </h2>
          </div>
          <p className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-white">
            System Transformation.
          </p>
          <p className="text-white/60 font-mono text-xs tracking-widest uppercase">
            Configure your technical parameters to begin architecture evaluation.
          </p>
        </div>

        {/* Container */}
        <div className="bg-neutral-950 border border-white/15 rounded-3xl p-8 md:p-12 shadow-2xl min-h-[420px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Progress Bar */}
          {!isSuccess && (
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-10">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${(step / (questions.length + 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
            </div>
          )}

          <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* Question Steps */}
              {step < questions.length && !isSuccess && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="text-[10px] font-mono text-blue-400 mb-3 tracking-widest uppercase">
                    PARAMETER 0{step + 1} // 0{questions.length}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8 text-white">{questions[step].title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[step].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(option)}
                        className="text-left px-6 py-4 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all font-mono text-xs tracking-wide group"
                      >
                        <span className="text-white/40 group-hover:text-blue-400 mr-3 transition-colors">[{idx + 1}]</span>
                        <span className="text-white/90 group-hover:text-white transition-colors">{option}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Email / Submit Step */}
              {step === questions.length && !isSuccess && (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-md mx-auto text-center py-4"
                >
                  <div className="w-14 h-14 rounded-full border border-blue-500/50 flex items-center justify-center mx-auto mb-6 bg-blue-500/10">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Parameters Captured.</h3>
                  <p className="text-white/60 text-xs font-mono tracking-widest uppercase mb-8">
                    Enter your secure work email to receive the evaluation brief.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="email" 
                      required
                      placeholder="ENTER WORK EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded-xl px-6 py-4 text-center font-mono text-xs tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white hover:bg-neutral-200 text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-colors shadow-2xl disabled:opacity-50"
                    >
                      {isSubmitting ? "TRANSMITTING PARAMETERS..." : "INITIALIZE EVALUATION BRIEF"}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Success Step */}
              {isSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 text-emerald-400 bg-emerald-500/10">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Transmission Secure.</h3>
                  <p className="text-white/60 text-xs font-mono tracking-widest uppercase mb-6 max-w-md mx-auto leading-relaxed">
                    A principal system architect will contact you within 24 hours to review your diagnostic parameters.
                  </p>
                  <a 
                    href="/#clients"
                    className="text-xs font-mono tracking-widest text-blue-400 hover:text-white transition-colors inline-block"
                  >
                    [ EXPLORE ENTERPRISE DEPLOYMENTS ]
                  </a>
                </motion.div>
              )}
              
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

