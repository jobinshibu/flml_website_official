"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Mic, MicOff, Volume2, VolumeX, Send, Sparkles, 
  X, ArrowRight, ShieldCheck, Compass, Move
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Helper to render inline bold text cleanly (used in speech bubbles and drawer)
function renderInlineFormatted(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, pIdx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={pIdx} className="font-bold text-white tracking-wide">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Custom Markdown formatter to render **bold**, bullet points, and paragraphs cleanly
function renderFormattedMessage(text: string) {
  const clean = text.replace(/\[\[.*?\]\]/g, "").trim();
  const lines = clean.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lIdx} className="h-1" />;

        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || /^\d+\./.test(trimmed);

        return (
          <p key={lIdx} className={`leading-relaxed ${isBullet ? "pl-2" : ""}`}>
            {renderInlineFormatted(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function GlobalLogiCopilot() {
  const router = useRouter();

  // Dialog / Chat Drawer Open State
  const [isOpen, setIsOpen] = useState(false);

  // Position of the Free-Floating Mascot in screen viewport
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Chat message state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! Welcome to **First Logic Meta Lab**.\n\nWhether you're exploring how to build a high-performance mobile app, scale your cloud infrastructure, or solve a complex operational bottleneck, I'm here to consult and brainstorm with you.\n\nWhat kind of business or product idea brings you here today?",
      timestamp: "Now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botState, setBotState] = useState<"idle" | "wave" | "listen" | "happy" | "speaking" | "flight">("idle");
  const [speechBubbleText, setSpeechBubbleText] = useState("Hi there! Welcome to First Logic Meta Lab. How can I help you today? ✨");
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  
  // Voice Controls
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  // Lead Generation form trigger
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const speechRecRef = useRef<any>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bubbleTimeoutRef = useRef<any>(null);
  const chatDrawerRef = useRef<HTMLDivElement>(null);

  // Close chat when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (chatDrawerRef.current && !chatDrawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Initialize Mascot Position to bottom-right (above brand logo)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initX = Math.max(window.innerWidth - 120, 20);
      const initY = Math.max(window.innerHeight - 170, 20);
      setPosition({ x: initX, y: initY });
      setIsInitialized(true);

      // Auto-hide initial welcome bubble after 8 seconds
      bubbleTimeoutRef.current = setTimeout(() => {
        setShowSpeechBubble(false);
      }, 8000);
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, showLeadForm]);

  // Speech Recognition Setup (Barge-in: if user starts speaking, cancel AI speech immediately)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onstart = () => {
      setIsListening(true);
      setBotState("listen");
    };

    rec.onresult = (event: any) => {
      // Barge-in: immediately stop AI speaking if human voice is detected!
      stopSpeaking();

      let live = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        if (item.isFinal) {
          const finalTxt = item[0].transcript.trim();
          if (finalTxt) {
            setInputValue("");
            setInterimTranscript("");
            handleSendMessage(finalTxt);
          }
        } else {
          live += item[0].transcript;
        }
      }
      if (live) {
        setInterimTranscript(live);
      }
    };

    rec.onerror = (e: any) => {
      if (e.error !== "no-speech" && e.error !== "aborted") {
        console.warn("Speech recognition error:", e.error);
      }
      setIsListening(false);
      setBotState("idle");
    };

    rec.onend = () => {
      setIsListening(false);
      setBotState("idle");
    };

    speechRecRef.current = rec;

    return () => {
      try {
        rec.stop();
      } catch (err) {}
    };
  }, []);

  // Stop currently playing speech synthesis
  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {}
    }
    activeUtteranceRef.current = null;
    if (botState === "speaking") {
      setBotState("idle");
    }
  };

  // Speak AI text aloud
  const speakText = (text: string) => {
    if (isVoiceMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    stopSpeaking();

    // Clean markdown, links, and action tags before speech
    const cleanSpeech = text
      .replace(/\[\[.*?\]\]/g, "")
      .replace(/(\*\*|\*|#|_|`)/g, "")
      .replace(/\n+/g, " ")
      .trim();

    if (!cleanSpeech) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.rate = 1.05;
      utterance.pitch = 1.25;
      utterance.lang = "en-IN";

      utterance.onstart = () => {
        setBotState("speaking");
      };

      utterance.onend = () => {
        setBotState("idle");
      };

      utterance.onerror = () => {
        setBotState("idle");
      };

      activeUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("TTS error:", e);
    }
  };

  // Toggle Voice Input (Mic)
  const toggleListening = () => {
    if (!speechRecRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Safari or Edge.");
      return;
    }

    if (isListening) {
      try {
        speechRecRef.current.stop();
      } catch (err) {}
      setIsListening(false);
      setBotState("idle");
    } else {
      stopSpeaking();
      try {
        speechRecRef.current.start();
        setIsListening(true);
        setBotState("listen");
      } catch (err) {
        console.warn("Failed to start speech rec:", err);
      }
    }
  };

  // Pop a transient speech bubble above the floating mascot
  const triggerBubble = (text: string, durationMs = 5000) => {
    setSpeechBubbleText(text);
    setShowSpeechBubble(true);
    clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setShowSpeechBubble(false);
    }, durationMs);
  };

  // Physically fly the Mascot to target screen coordinates
  const flyMascotTo = (targetX: number, targetY: number) => {
    setBotState("flight");
    setPosition({ x: targetX, y: targetY });
    setTimeout(() => {
      setBotState("happy");
      setTimeout(() => setBotState("idle"), 1200);
    }, 900);
  };

  // Execute Site Navigation Actions from AI token tags (e.g. [[NAVIGATE:clients:healine]])
  const handleActionTokens = (text: string) => {
    // Check for Lead Form trigger token
    if (text.includes("[[TRIGGER_LEAD_FORM]]")) {
      setShowLeadForm(true);
    }

    // Check for navigation tokens
    const navMatch = text.match(/\[\[NAVIGATE:([a-zA-Z0-9_-]+)(?::([a-zA-Z0-9_-]+))?\]\]/);
    if (navMatch) {
      const tabOrSection = navMatch[1];
      const targetSub = navMatch[2];

      if (tabOrSection === "clients" || tabOrSection === "life") {
        if (typeof window !== "undefined") {
          // 1. Locate the top navbar "Life" tab button
          const targetNavBtn = document.getElementById("nav-tab-life");
          const rect = targetNavBtn ? targetNavBtn.getBoundingClientRect() : { left: 240, top: 40 };

          // 2. Mascot flies up to the "Life" button
          setBotState("flight");
          setPosition({ x: Math.max(rect.left - 30, 20), y: Math.max(rect.top + 10, 20) });
          triggerBubble("Clicking Life for you… ✨", 2200);

          // 3. After mascot lands, trigger the click animation & tab switch
          setTimeout(() => {
            setBotState("happy");
            window.dispatchEvent(new CustomEvent("flml:tab_transition", { detail: "life" }));
            setTimeout(() => {
              setBotState("idle");
              // Return to comfortable reading position
              flyMascotTo(window.innerWidth - 120, window.innerHeight - 170);
            }, 1800);
          }, 1100);
        }
      } else if (tabOrSection === "architecture") {
        if (typeof window !== "undefined") {
          // If specific bay requested (e.g. bot-demo, scale-demo, app-studio, pay-demo)
          const targetSubEl = targetSub ? document.getElementById(targetSub) : null;

          // 1. Switch tab if not already on architecture
          window.dispatchEvent(new CustomEvent("flml:tab_transition", { detail: "architecture" }));

          // 2. Locate the specific section or the navbar
          if (targetSubEl) {
            const rect = targetSubEl.getBoundingClientRect();
            setBotState("flight");
            // Fly directly to the specific instrument bay
            setPosition({ x: Math.max(window.innerWidth / 2 - 40, 20), y: Math.max(window.innerHeight / 2 - 60, 40) });
            triggerBubble(`Opening ${targetSub.replace("-demo", "").toUpperCase()} demo… ⚡`, 2200);

            setTimeout(() => {
              targetSubEl.scrollIntoView({ behavior: "smooth", block: "center" });
              setBotState("happy");
              setTimeout(() => {
                setBotState("idle");
                flyMascotTo(window.innerWidth - 120, window.innerHeight - 170);
              }, 2200);
            }, 500);
          } else {
            // General architecture view
            const targetNavBtn = document.getElementById("nav-tab-architecture");
            const rect = targetNavBtn ? targetNavBtn.getBoundingClientRect() : { left: 140, top: 40 };

            setBotState("flight");
            setPosition({ x: Math.max(rect.left - 30, 20), y: Math.max(rect.top + 10, 20) });
            triggerBubble("Opening Architecture… ⚡", 2200);

            setTimeout(() => {
              setBotState("happy");
              setTimeout(() => {
                setBotState("idle");
                flyMascotTo(window.innerWidth - 120, window.innerHeight - 170);
              }, 1800);
            }, 1100);
          }
        }
      } else if (tabOrSection === "flml") {
        if (typeof window !== "undefined") {
          const targetNavBtn = document.getElementById("nav-tab-flml");
          const rect = targetNavBtn ? targetNavBtn.getBoundingClientRect() : { left: 40, top: 40 };

          setBotState("flight");
          setPosition({ x: Math.max(rect.left - 20, 20), y: Math.max(rect.top + 10, 20) });
          triggerBubble("Clicking FLML… 🚀", 2200);

          setTimeout(() => {
            setBotState("happy");
            window.dispatchEvent(new CustomEvent("flml:tab_transition", { detail: "flml" }));
            setTimeout(() => {
              setBotState("idle");
              flyMascotTo(window.innerWidth - 120, window.innerHeight - 170);
            }, 1800);
          }, 1100);
        }
      } else if (targetSub) {
        // Direct project detail page only if specifically clients:project
        router.push(`/${targetSub}`);
        triggerBubble(`Navigating to ${targetSub.toUpperCase()} deployment…`, 3500);
      } else {
        const el = document.getElementById(tabOrSection);
        el?.scrollIntoView({ behavior: "smooth" });
        if (el) {
          const rect = el.getBoundingClientRect();
          flyMascotTo(Math.min(rect.right - 80, window.innerWidth - 100), Math.max(rect.top + 60, 80));
        }
      }
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    // Barge in
    stopSpeaking();

    const userMsg: ChatMessage = {
      id: "u_" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setInterimTranscript("");
    setIsLoading(true);
    setBotState("listen");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: query,
          messages: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      const reply = data.reply || "I am analyzing your architecture requirements. Could you tell me a little more?";

      const botMsg: ChatMessage = {
        id: "b_" + Date.now(),
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
      setBotState("happy");

      // Handle speech
      speakText(reply);

      // If reply contains a navigation command, navigate to that section so user sees the content
      if (reply.includes("[[NAVIGATE:")) {
        handleActionTokens(reply);
      }

      // If reply triggers the lead form
      if (reply.includes("[[TRIGGER_LEAD_FORM]]")) {
        setShowLeadForm(true);
      }

      // Show floating bubble on mascot (ensure balanced ** markers so bold doesn't get cut in half)
      const cleanShort = reply.replace(/\[\[.*?\]\]/g, "").replace(/\n+/g, " ").slice(0, 110);
      // If trailing open ** without close, remove the orphan
      const orphanClean = cleanShort.replace(/\*\*([^*]*)$/, "$1");
      triggerBubble(orphanClean + "…", 5500);
    } catch (err) {
      console.error("Chat error:", err);
      setIsLoading(false);
      setBotState("idle");
    }
  };

  // Handle lead form submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact) return;

    setIsSubmittingLead(true);
    setTimeout(() => {
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setBotState("happy");
      const confirmationMsg: ChatMessage = {
        id: "conf_" + Date.now(),
        role: "assistant",
        content: `Thank you, **${leadName}**! ✨\n\nOur Senior Solutions Architect has received your scope inquiry. We are reviewing your technical requirements and will contact you via **${leadContact}** within 24 hours to schedule a discovery call.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, confirmationMsg]);
      speakText(`Thank you, ${leadName}! Our engineering team will review your specifications and contact you directly.`);
    }, 1100);
  };

  if (!isInitialized) return null;

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. FREE-FLOATING, DRAGGABLE & FLYING MASCOT CHARACTER          */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setTimeout(() => setIsDragging(false), 100);
          setPosition({
            x: Math.max(10, Math.min(window.innerWidth - 85, position.x + info.offset.x)),
            y: Math.max(10, Math.min(window.innerHeight - 95, position.y + info.offset.y))
          });
        }}
        animate={{
          x: position.x,
          y: position.y,
          transition: { type: "spring", stiffness: 120, damping: 18 }
        }}
        className="fixed top-0 left-0 z-[80] cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: "none" }}
      >
        {/* Holographic Speech Bubble that travels directly with Logi */}
        <AnimatePresence>
          {showSpeechBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              className="absolute bottom-[92px] right-[-40px] w-[260px] max-w-[85vw] bg-slate-950/95 border border-cyan-400/50 text-white text-[11px] p-3 rounded-2xl rounded-br-sm shadow-[0_10px_35px_rgba(6,182,212,0.3)] backdrop-blur-xl pointer-events-auto"
            >
              <div className="flex items-center justify-between text-[8px] font-mono text-cyan-400 uppercase font-black mb-1">
                <span className="flex items-center gap-1.5">
                  <div className="relative w-3.5 h-3.5 shrink-0">
                    <Image
                      src="/FLML-01.png"
                      alt="FLML Logo"
                      fill
                      sizes="14px"
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span>Logi</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSpeechBubble(false);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="leading-snug text-slate-200">
                {renderInlineFormatted(speechBubbleText)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Animated Mascot Vector */}
        <div
          onClick={() => {
            if (!isDragging) {
              setIsOpen(true);
              setBotState("wave");
              setTimeout(() => setBotState("idle"), 1600);
            }
          }}
          className="relative w-20 h-20 group filter drop-shadow-[0_8px_25px_rgba(6,182,212,0.45)]"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/15 filter blur-lg animate-pulse" />

          {/* SVG Mascot Character */}
          <svg viewBox="0 0 72 80" className="w-full h-full overflow-visible relative z-10 transition-transform group-hover:scale-110">
            <defs>
              <linearGradient id="copilotHead" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#DCE4F7" />
              </linearGradient>
            </defs>
            <ellipse cx="36" cy="77" rx="16" ry="3" fill="#000" opacity="0.35" />
            <g className={botState === "speaking" ? "animate-bounce" : botState === "flight" ? "-rotate-12" : ""}>
              <line x1="36" y1="5" x2="36" y2="13" stroke="#C9D3EC" strokeWidth="2.6" strokeLinecap="round" />
              <circle
                cx="36"
                cy="5"
                r="4.5"
                fill={isListening ? "#FF4D4D" : botState === "speaking" ? "#22D3EE" : "#FFB02E"}
                className={isListening ? "animate-ping" : ""}
              />
              <circle cx="8" cy="32" r="5.5" fill="#8FB1FF" />
              <circle cx="64" cy="32" r="5.5" fill="#8FB1FF" />
              <rect x="8" y="12" width="56" height="42" rx="21" fill="url(#copilotHead)" />
              <rect x="14" y="19" width="44" height="28" rx="14" fill="#0D1430" />
              
              {/* Animated Expressions */}
              {botState === "happy" ? (
                <g fill="none" stroke="#7CF3FF" strokeWidth="3" strokeLinecap="round">
                  <path d="M22 33 q5 -6 10 0" />
                  <path d="M40 33 q5 -6 10 0" />
                </g>
              ) : (
                <g fill="#7CF3FF">
                  <ellipse cx="27" cy="31.5" rx="5" ry="6" />
                  <ellipse cx="45" cy="31.5" rx="5" ry="6" />
                  <circle cx="29" cy="29" r="1.8" fill="#fff" />
                  <circle cx="47" cy="29" r="1.8" fill="#fff" />
                </g>
              )}
              
              <ellipse cx="19.5" cy="39" rx="3.2" ry="2" fill="#FF8FA3" opacity="0.75" />
              <ellipse cx="52.5" cy="39" rx="3.2" ry="2" fill="#FF8FA3" opacity="0.75" />
              <path d="M32.5 39.5 q3.5 3 7 0" fill="none" stroke="#7CF3FF" strokeWidth="2" strokeLinecap="round" />
              <rect x="21" y="54" width="30" height="18" rx="9" fill="url(#copilotHead)" />
              <path d="M36 67.5 c-3.5-2.4-5-4-5-6 a2.5 2.5 0 0 1 5-1 a2.5 2.5 0 0 1 5 1 c0 2-1.5 3.6-5 6z" fill="#FF6B8A" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* 2. FULL INTERACTION & AUDIO CONTROL SCREEN (OPENS ON TAP)      */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatDrawerRef}
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-4 sm:inset-auto sm:bottom-12 sm:right-12 w-auto sm:w-[460px] h-auto sm:h-[620px] max-h-[90vh] bg-[#080D18]/95 border border-cyan-500/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl z-[90] flex flex-col overflow-hidden font-sans select-none"
          >
            {/* Minimal Header with First Logic Meta Lab Logo */}
            <div className="p-3 px-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-lg bg-black/60 border border-white/15 p-1 flex items-center justify-center shrink-0">
                  <Image
                    src="/FLML-01.png"
                    alt="First Logic Meta Lab Logo"
                    fill
                    sizes="28px"
                    className="object-contain filter brightness-0 invert p-0.5"
                    priority
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-white tracking-wide">Logi</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Clean Single Controls: Speaker, Mic, Close */}
              <div className="flex items-center gap-1.5">
                {/* Speaker Toggle */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsVoiceMuted(!isVoiceMuted);
                  }}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isVoiceMuted
                      ? "bg-red-500/20 border-red-500/40 text-red-400"
                      : "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                  }`}
                  title={isVoiceMuted ? "Unmute Voice" : "Mute Voice"}
                >
                  {isVoiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                {/* Mic Toggle */}
                <button
                  onClick={toggleListening}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isListening
                      ? "bg-red-500 border-red-300 text-white animate-pulse"
                      : "bg-slate-800 border-white/15 text-slate-300 hover:text-cyan-400"
                  }`}
                  title={isListening ? "Listening... click to stop" : "Speak"}
                >
                  {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                </button>

                {/* Close Drawer Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Intent Discovery Starters */}
            <div className="px-3 py-1.5 bg-black/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => handleSendMessage("We have a project idea and need an architectural roadmap.")}
                className="text-[8px] font-medium bg-slate-900/90 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                💡 Brainstorm My Idea
              </button>
              <button
                onClick={() => handleSendMessage("What makes First Logic's software architecture superior to standard agency development?")}
                className="text-[8px] font-medium bg-slate-900/90 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                ⚡ Why First Logic Architecture?
              </button>
              <button
                onClick={() => handleSendMessage("Take me through your Architecture suite and live system demonstrations.")}
                className="text-[8px] font-medium bg-slate-900/90 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                🏛️ Explore Architecture Suite
              </button>
              <button
                onClick={() => handleSendMessage("I want to discuss technical feasibility and pricing for my project.")}
                className="text-[8px] font-medium bg-slate-900/90 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                💼 Scope & Estimation
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[88%] text-[10.5px] p-3 rounded-2xl leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md"
                          : "bg-slate-900/90 border border-cyan-500/25 text-slate-200 rounded-tl-none shadow-lg"
                      }`}
                    >
                      {/* Message Content with proper bold formatting */}
                      {renderFormattedMessage(m.content)}

                      {/* Navigation Pill if Action Token is present */}
                      {m.content.includes("[[NAVIGATE:") && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <button
                            onClick={() => handleActionTokens(m.content)}
                            className="text-[8px] font-mono bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-colors shadow"
                          >
                            <Compass className="w-3 h-3 text-cyan-400" />
                            <span>Guide Me To This Section</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 mt-0.5 px-1">{m.timestamp}</span>
                  </div>
                );
              })}

              {/* Real-time Voice Speech Indicator */}
              {interimTranscript && (
                <div className="flex justify-end">
                  <div className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-[10px] p-2 rounded-xl italic animate-pulse">
                    “{interimTranscript}…”
                  </div>
                </div>
              )}

              {/* AI Processing Status */}
              {isLoading && (
                <div className="flex items-center gap-1.5 text-cyan-400 text-[9px] font-mono p-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Logi is architecting solution…</span>
                </div>
              )}

              {/* Lead Capture Intake Form */}
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-cyan-950/90 via-slate-900 to-slate-950 border border-cyan-400/40 rounded-2xl p-3.5 space-y-2.5 shadow-2xl"
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <h4 className="text-[10.5px] font-black text-white">Direct Engineering Discovery</h4>
                  </div>
                  <p className="text-[8px] text-slate-300">
                    Connect with our Senior Solutions Architect to receive an official system architecture blueprint and investment timeline.
                  </p>

                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 text-white text-[9.5px] px-3 py-1.5 rounded-xl outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Email or WhatsApp / Phone *"
                      required
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 text-white text-[9.5px] px-3 py-1.5 rounded-xl outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-[9px] rounded-xl flex items-center justify-center gap-1 shadow-md transition-all disabled:opacity-50"
                    >
                      {isSubmittingLead ? "Transmitting..." : "Connect with FLML Engineering Team"}
                      <ArrowRight className="w-3 h-3 text-black" />
                    </button>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-2.5 px-3 bg-slate-950/90 border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  placeholder={isListening ? "Listening to your voice..." : "Ask Logi anything or describe your vision..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-black/70 border border-white/15 focus:border-cyan-400 text-white text-[10px] px-3.5 py-2.5 rounded-xl outline-none transition-colors placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-black font-bold rounded-xl disabled:opacity-40 transition-colors shadow shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
