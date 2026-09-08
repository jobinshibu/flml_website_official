"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const buildItems = [
  {
    id: "applications",
    title: "APPLICATIONS",
    description: "Bespoke application development focusing on robust architectures and seamless user experiences across web and mobile ecosystems.",
    details: ["Web", "Mobile", "Customer-facing", "Internal"],
    align: "start",
    margin: "mt-0 ml-0",
    projects: [
      { title: "KARIKKU APP", description: "A high-traffic media application built with React Native and Node.js. Designed to handle massive concurrent user spikes during content drops with real-time push notifications.", image: "/client/Karikku.svg" },
      { title: "FOODZER", description: "Cross-platform consumer food delivery application featuring real-time driver tracking, geolocation routing algorithms, and seamless payment gateway integrations.", image: "/client/foodzer.png" }
    ]
  },
  {
    id: "systems",
    title: "SYSTEMS",
    description: "Deep, interconnected architectures built to handle immense data loads and complex business logic across multiple physical locations.",
    details: ["ERP", "POS", "Workflow", "Multi-location", "Reporting"],
    align: "end",
    margin: "mt-12 mr-12",
    projects: [
      { title: "HEALINE ERP", description: "A comprehensive healthcare management system developed in Next.js and PostgreSQL, routing patient data securely across multiple clinic locations with strict HIPAA compliance.", image: "/client/healine.png" },
      { title: "MYVAAHAN", description: "Automotive service management system built to track vehicle lifecycles, service workflows, and inventory using local edge-caching for uninterrupted garage operations.", image: "/client/myvaahan.png" }
    ]
  },
  {
    id: "platforms",
    title: "PLATFORMS",
    description: "Scalable platform architectures designed for SaaS providers, B2B marketplaces, and complex partner ecosystems.",
    details: ["SaaS", "Marketplaces", "B2B Portals", "Ecosystems"],
    align: "center",
    margin: "mt-24",
    projects: [
      { title: "THARA CART", description: "Multi-tenant B2B e-commerce platform orchestrating thousands of vendors and SKUs. Built on a scalable AWS microservices architecture to ensure zero downtime.", image: "/client/thara_cart.png" },
      { title: "VIVLINO", description: "Global learning and community marketplace connecting educators with students, featuring live video streaming infrastructure and automated billing systems.", image: "/client/vivlino.svg" }
    ]
  },
  {
    id: "automation",
    title: "AUTOMATION",
    description: "Intelligent process automation that eliminates manual bottlenecks, integrates disparate tools, and accelerates business velocity.",
    details: ["Process Design", "RPA", "Event-driven", "Integrations"],
    align: "start",
    margin: "mt-24 ml-24",
    projects: [
      { title: "AMERICAN BOARD", description: "Event-driven robotic process automation (RPA) integrating legacy educational compliance databases with modern CRM systems, saving thousands of manual entry hours.", image: "/client/american board.png" }
    ]
  },
  {
    id: "intelligence",
    title: "INTELLIGENCE",
    description: "Advanced analytics and machine learning integrations that turn raw organizational data into actionable, predictive insights.",
    details: ["AI", "Analytics", "Machine Learning", "Predictive"],
    align: "start",
    margin: "mt-32 ml-0",
    projects: [
      { title: "3MS ANALYTICS", description: "Predictive intelligence dashboard utilizing TensorFlow and BigQuery to analyze historical business metrics, forecasting operational bottlenecks weeks in advance.", image: "/client/3ms.png" }
    ]
  },
  {
    id: "infrastructure",
    title: "INFRASTRUCTURE",
    description: "Secure, highly available, and globally distributed infrastructure setups utilizing modern DevOps practices and cloud-native services.",
    details: ["Cloud", "AWS/Azure", "DevOps", "Security", "Scaling"],
    align: "end",
    margin: "mt-12 mr-0",
    projects: [
      { title: "QARO CLOUD", description: "Complete zero-downtime migration of monolithic architectures into a highly secure, containerized Kubernetes environment, achieving auto-scaling capabilities.", image: "/client/qaro.png" }
    ]
  },
  {
    id: "blockchain",
    title: "DECENTRALIZED",
    description: "Smart contract development and decentralized application architectures for high-security, immutable business requirements.",
    details: ["Blockchain", "Smart Contracts", "DeFi", "Web3"],
    align: "center",
    margin: "mt-24",
    projects: [
      { title: "EDHWI PROTOCOL", description: "Custom smart contract infrastructure deployed on Ethereum mainnet. Ensures immutable record-keeping and highly secure tokenized asset transfers.", image: "/client/Edhwi.svg" }
    ]
  },
];

export default function WhatWeBuild() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      
      setTimeout(() => {
        const el = itemRefs.current[id];
        if (el) {
          const yOffset = -120;
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <section id="capabilities" className="pt-12 pb-32 px-8 bg-white border-t border-border-subtle relative">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-blue mb-16">
          # WHAT WE BUILD
        </h2>

        <div className="relative w-full flex flex-col space-y-8 md:space-y-0">
          {buildItems.map((item) => {
            return (
              <div 
                key={item.id} 
                ref={(el) => { itemRefs.current[item.id] = el; }}
                className={`flex flex-col ${
                  item.align === "start" ? "items-start" : item.align === "end" ? "items-end" : "items-center"
                } ${item.margin} w-full`}
              >
                <div 
                  className="relative cursor-pointer group py-12 px-12 -my-12 -mx-12 z-10 hover:z-20"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleClick(item.id)}
                >
                  <motion.h3 
                    className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter transition-colors duration-500 ${
                      expandedId === item.id || hoveredId === item.id 
                        ? "text-brand-blue" 
                        : (hoveredId ? "text-foreground/10" : "text-foreground")
                    }`}
                  >
                    {item.title}
                  </motion.h3>

                  <AnimatePresence>
                    {hoveredId === item.id && expandedId !== item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute top-full mt-4 overflow-hidden ${item.align === "start" ? "left-12" : item.align === "end" ? "right-12" : "left-1/2 -translate-x-1/2"}`}
                      >
                        <ul className="flex flex-nowrap gap-4 items-center whitespace-nowrap bg-white/80 backdrop-blur-sm p-1 rounded">
                          {item.details.map((detail, idx) => (
                            <li key={idx} className="text-sm font-mono tracking-widest text-brand-blue uppercase flex items-center gap-4 whitespace-nowrap">
                              {detail}
                              {idx < item.details.length - 1 && <span className="w-1 h-1 bg-brand-blue/30 rounded-full inline-block" />}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                        className={`overflow-hidden ${item.align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-2xl'}`}
                      >
                        <div className={`flex flex-col gap-6 pt-8 pb-8 ${item.align === 'center' ? 'items-center text-center' : item.align === 'end' ? 'items-end text-right' : 'items-start text-left'}`}>
                          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium">
                            {item.description}
                          </p>
                          
                          <div 
                            className="flex flex-wrap gap-8 mt-4"
                            style={{ justifyContent: item.align === 'center' ? 'center' : item.align === 'end' ? 'flex-end' : 'flex-start' }}
                          >
                            {item.projects.map((project, idx) => (
                              <div key={idx} className={`flex items-center gap-4 group/project ${item.align === 'end' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                <div className="relative w-20 h-20 shrink-0 bg-surface-100 overflow-hidden border border-border-subtle rounded shadow-sm">
                                  <Image src={project.image} alt={project.title} fill className="object-contain p-2 transition-all duration-500" sizes="80px" />
                                </div>
                                <div className="flex flex-col justify-center max-w-[280px]">
                                  <h5 className="font-bold text-sm mb-1">{project.title}</h5>
                                  <p className="text-xs text-foreground/60 leading-relaxed">{project.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
