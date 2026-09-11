"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Send, Sparkles, User, Trash2, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_STARTERS = [
  "Hospital E-Commerce Platform",
  "Restaurant POS & Delivery",
  "Custom SaaS & Cloud App",
  "AI & Data Integration",
];

function renderFormattedContent(text: string) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);

        return (
          <p key={lineIdx} className="min-h-[1.2em]">
            {parts.map((part, partIdx) => {
              if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
                return (
                  <strong key={partIdx} className="font-bold text-white">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! 👋 I'm **Sugu**, the AI Assistant for **First Logic Meta Lab**.\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Lead Capture Form state inside chat
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showInlineLeadForm, setShowInlineLeadForm] = useState(false);
  const [currentProjectScope, setCurrentProjectScope] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, showInlineLeadForm]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || isLoading) return;

    setInputValue("");
    setCurrentProjectScope((prev) => (prev ? `${prev} | ${query}` : query));

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({ role: m.role, content: m.content })),
          userMessage: query,
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || "Thank you for sharing your project goals!";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      const lowerReply = aiReply.toLowerCase();
      if (
        (lowerReply.includes("connect with you") ||
          lowerReply.includes("senior engineering team") ||
          lowerReply.includes("timeline & custom proposal") ||
          lowerReply.includes("blueprint")) &&
        updatedHistory.length >= 3
      ) {
        setShowInlineLeadForm(true);
      }
    } catch (err) {
      console.error("Chat send error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I have noted your project details! Would you like our senior engineering team to connect with you directly?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setShowInlineLeadForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact || isSubmittingLead) return;

    setIsSubmittingLead(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          contact: leadContact,
          projectBrief: currentProjectScope || "Website Chatbot Inquiry",
        }),
      });

      setLeadSubmitted(true);
      setShowInlineLeadForm(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `✅ **Thank you, ${leadName}!**\n\nOur engineering team has received your project brief. We will review your requirements and contact you at **${leadContact}** shortly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi there! 👋 I'm **Sugu**, the AI Assistant for **First Logic Meta Lab**.\n\nHow can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setShowInlineLeadForm(false);
    setLeadSubmitted(false);
    setCurrentProjectScope("");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="trigger-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-neutral-900/95 hover:bg-neutral-800 border border-cyan-500/40 text-white px-4 py-2.5 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.25)] backdrop-blur-md group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-black border border-cyan-500/30 overflow-hidden shrink-0 p-1">
              <Image
                src="/FLML-01.png"
                alt="Sugu Avatar"
                width={36}
                height={36}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
              />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-black rounded-full animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Chat with Sugu
              </p>
              <p className="text-[10px] text-neutral-400">FLML AI Assistant</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-drawer"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[380px] md:w-[420px] h-[580px] max-h-[82vh] bg-neutral-950/95 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-white/10 bg-neutral-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black border border-cyan-500/40 p-1 shrink-0 shadow-md">
                  <Image
                    src="/FLML-01.png"
                    alt="Sugu Avatar"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-neutral-900 rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none flex items-center gap-1.5">
                    Sugu
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono font-normal">
                      FLML AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    First Logic Meta Lab Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="text-neutral-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  title="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  title="Minimize"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Starters */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-b border-white/5 bg-black/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_STARTERS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 text-[11px] bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-cyan-500/50 text-neutral-300 hover:text-white px-3 py-1.5 rounded-full transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Messages Feed */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-neutral-800 border border-white/20 text-neutral-300"
                        : "bg-black border border-cyan-500/30 overflow-hidden p-1"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Image
                        src="/FLML-01.png"
                        alt="Sugu"
                        width={28}
                        height={28}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <div
                    className={`max-w-[84%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-xs"
                        : "bg-neutral-900/90 border border-white/10 text-neutral-200 rounded-tl-xs whitespace-pre-wrap font-sans"
                    }`}
                  >
                    {renderFormattedContent(msg.content)}
                    <span className="block text-[9px] opacity-40 text-right mt-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 text-neutral-400 text-xs px-1">
                  <div className="w-6 h-6 rounded-full bg-black border border-cyan-500/30 overflow-hidden p-0.5">
                    <Image
                      src="/FLML-01.png"
                      alt="Sugu"
                      width={24}
                      height={24}
                      className="w-full h-full object-contain animate-pulse"
                    />
                  </div>
                  <span className="italic">Sugu is typing...</span>
                </div>
              )}

              {/* Inline Lead Capture Form */}
              {showInlineLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900 border border-cyan-500/30 p-4 rounded-2xl shadow-xl space-y-3 my-2"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Connect with FLML Engineering Team</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Leave your contact details and our senior engineers will reach out to discuss your scope.
                  </p>

                  <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-500 text-white text-xs px-3 py-2 rounded-xl outline-none transition-colors placeholder:text-neutral-500"
                    />

                    <input
                      type="text"
                      placeholder="Email or Phone / WhatsApp *"
                      required
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-500 text-white text-xs px-3 py-2 rounded-xl outline-none transition-colors placeholder:text-neutral-500"
                    />

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {isSubmittingLead ? (
                        "Submitting..."
                      ) : (
                        <>
                          <span>Connect with FLML Team</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-neutral-900/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask Sugu anything or describe what you want to build..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-grow bg-black/70 border border-white/15 focus:border-cyan-500 text-white text-xs px-3.5 py-2.5 rounded-full outline-none transition-colors placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black p-2.5 rounded-full disabled:opacity-40 transition-colors shadow-md shrink-0"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
