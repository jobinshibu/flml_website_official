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
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="consultation" className="py-32 px-4 md:px-8 bg-brand-blue-dark text-white relative overflow-hidden border-t border-white/10">
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="consult-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#consult-grid)" />
        </svg>
      </div>

      <div className="max-w-[800px] mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-[10px] font-mono font-bold tracking-[0.3em] text-brand-blue-light mb-4">
            INITIATE DIAGNOSTIC
          </h2>
          <p className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            System Transformation.
          </p>
          <p className="text-white/60 font-mono text-sm tracking-widest uppercase">
            Configure your parameters to begin.
          </p>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm min-h-[400px] flex flex-col">
          
          {/* Progress Bar */}
          {!isSuccess && (
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-12">
              <motion.div 
                className="h-full bg-brand-blue-light"
                initial={{ width: 0 }}
                animate={{ width: `${(step / (questions.length + 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
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
                  <div className="text-[10px] font-mono text-brand-blue-light mb-4 tracking-widest">
                    STEP 0{step + 1} // {questions.length}
                  </div>
                  <h3 className="text-2xl font-bold mb-8">{questions[step].title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[step].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(option)}
                        className="text-left px-6 py-4 border border-white/10 rounded bg-white/5 hover:bg-white/10 hover:border-brand-blue-light transition-all font-mono text-sm tracking-wide group"
                      >
                        <span className="text-white/40 group-hover:text-brand-blue-light mr-3 transition-colors">[{idx + 1}]</span>
                        {option}
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
                  className="w-full max-w-md mx-auto text-center"
                >
                  <div className="w-16 h-16 rounded-full border border-brand-blue flex items-center justify-center mx-auto mb-6 bg-brand-blue/10">
                    <div className="w-2 h-2 bg-brand-blue-light rounded-full animate-ping" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Parameters Captured.</h3>
                  <p className="text-white/60 text-sm mb-8">
                    Enter your secure contact point to receive the deployment brief.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="email" 
                      required
                      placeholder="ENTER WORK EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded px-6 py-4 text-center font-mono text-sm tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-bold tracking-[0.2em] uppercase py-4 rounded transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "INITIALIZE BLUEPRINT"}
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
                  <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-8 text-green-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Transmission Secure.</h3>
                  <p className="text-white/60 mb-8 max-w-sm mx-auto">
                    A technical lead will contact you within 24 hours to discuss the diagnostic architecture.
                  </p>
                  <a 
                    href="/#clients"
                    className="text-xs font-mono tracking-widest text-brand-blue hover:text-white transition-colors inline-block mt-4"
                  >
                    [ EXPLORE DEPLOYMENTS ]
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
