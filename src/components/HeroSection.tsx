/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Droplet, Sparkles, Sliders, ArrowDownCircle, ShieldCheck, Cpu } from "lucide-react";

interface HeroSectionProps {
  onStartSimulation: () => void;
}

export default function HeroSection({ onStartSimulation }: HeroSectionProps) {
  const [filterActive, setFilterActive] = useState(true);
  const [purifiedTds, setPurifiedTds] = useState(12);

  // Subtle digital fluctuation for smart dashboard feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setPurifiedTds((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 8 && next <= 15 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-cyan-light/10 via-white to-white py-16 sm:py-24" id="hero">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />
      <div className="absolute bottom-10 left-1/10 -z-10 h-72 w-72 rounded-full bg-teal-50/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT SIDE: Project Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-50/50 px-4 py-1.5 text-xs font-semibold text-cyan-800 tracking-wide">
              <span>Smart Chemistry Concept</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-cyan-600 font-mono text-[10px]">v2.1</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-display font-black text-slate-800 tracking-tight leading-none flex items-center gap-2">
                <span className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white text-3xl font-extrabold shadow-md shadow-cyan-500/25">H</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-850">
                  HydroPure
                </span>
              </h1>
              <h2 className="text-cyan-600 font-bold text-sm sm:text-base tracking-widest uppercase mt-1">
                Graphene-Assisted Smart Water Purification System
              </h2>
              <p className="text-slate-500 text-xs italic font-sans">
                “Cleaner Water. Lower Waste. Smarter Filtration.”
              </p>
              <p className="max-w-xl text-slate-650 text-slate-600 font-sans text-base leading-relaxed">
                HydroPure is a smart purification concept that compares traditional RO filtration with graphene-assisted filtration for improved water purification and reduced water wastage.
              </p>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4 max-w-lg">
              <div className="text-center sm:text-left">
                <span className="block text-2xl font-bold text-cyan-600 font-mono">~98%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Heavy Metals Filtered</span>
              </div>
              <div className="text-center sm:text-left border-x border-slate-150 px-4">
                <span className="block text-2xl font-bold text-cyan-600 font-mono">10:1</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Wastage Reduction</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block text-2xl font-bold text-cyan-600 font-mono">0.02s</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Filtration Latency</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartSimulation}
                className="group relative flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 text-white px-6 py-3.5 font-bold hover:bg-cyan-600 transition-colors shadow-lg active:scale-98"
                id="btn-start-simulation"
              >
                <span>Start Simulation</span>
                <Sliders className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
              </button>
              
              <a
                href="#impurities"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
              >
                <span>Learn Impurities</span>
                <ArrowDownCircle className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Water Purifier Smart Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-slate-50/50 p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-between overflow-hidden">
              
              {/* Internal microparticle glow blur */}
              <div className="absolute inset-0 bg-radial-gradient from-cyan-50/20 to-transparent pointer-events-none" />

              {/* Status Header Bar of Purifier */}
              <div className="w-full flex justify-between items-center bg-white/90 border border-slate-100 rounded-xl px-4 py-2.5 shadow-sm z-10">
                <div className="flex items-center gap-2">
                  <div className="flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">HYDRO_PURE_ACTIVE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">SYS_TDS</p>
                    <p className="text-xs font-mono font-bold text-cyan-600 leading-none mt-0.5">{purifiedTds} PPM</p>
                  </div>
                  <div className="text-right border-l border-slate-100 pl-3">
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">SYS_FLOW</p>
                    <p className="text-xs font-mono font-bold text-teal-600 leading-none mt-0.5">3.2 L/m</p>
                  </div>
                </div>
              </div>

              {/* WATER PURIFIER CHASSIS MODEL */}
              <div className="relative w-72 h-[340px] mt-4 flex flex-col items-center">
                {/* Upper Chamber Core casing (Matte Premium White & Silver) */}
                <div className="w-56 h-10 bg-gradient-to-b from-slate-100 to-white border-t border-x border-slate-200/80 rounded-t-2xl shadow-sm z-20 flex items-center justify-center px-4">
                  <div className="w-16 h-1.5 rounded-full bg-slate-200 border-inner pointer-events-none" />
                </div>

                {/* Main Transparent Purification Chamber */}
                <div className="w-52 h-[260px] bg-sky-50/15 border border-slate-200/80 shadow-inner z-10 relative flex flex-col justify-between items-center overflow-hidden">
                  
                  {/* Water container visual effects */}
                  {/* Top: Untreated/Dirty Water Inflow */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-yellow-600/5 backdrop-blur-[1px] border-b border-yellow-200/20 flex flex-col justify-between p-1">
                    <span className="text-[8px] font-mono text-amber-700/80 tracking-widest block text-center">UNTREATED INTAKE</span>
                    {/* Animated incoming dirty water vector path */}
                    <div className="flex justify-center gap-1">
                      <span className="w-1 h-3 bg-amber-500/30 rounded-full animate-pulse" />
                      <span className="w-1.5 h-4 bg-amber-500/20 rounded-full animate-bounce" />
                      <span className="w-1 h-3.5 bg-amber-500/30 rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Flow Guide Lines Representing Active Process */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    {/* Flow left */}
                    <path d="M 40 12 L 40 100 L 90 100" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" className="flow-line-reverse" />
                    {/* Flow right */}
                    <path d="M 168 12 L 168 100 L 118 100" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" className="flow-line-reverse" />
                    {/* Purified Flow Outwards */}
                    <path d="M 104 150 L 104 220" fill="none" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="2" className="flow-line" />
                  </svg>

                  {/* Impurity Particles (Falling down into traditional and graphene chambers) */}
                  <div className="absolute top-8 left-0 right-0 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute top-1 left-8 w-2 h-2 rounded-full bg-amber-600/45 animate-particle" />
                    <div className="absolute top-2 left-20 w-1.5 h-1.5 rounded-full bg-red-600/40 animate-particle [animation-delay:0.3s]" />
                    <div className="absolute top-1 left-32 w-2.5 h-2.5 rounded-full bg-amber-700/50 animate-particle [animation-delay:0.7s]" />
                    <div className="absolute top-4 left-44 w-1.5 h-1.5 rounded-full bg-slate-500/50 animate-particle [animation-delay:1.1s]" />
                    <div className="absolute top-3 left-12 w-2 h-2 rounded-full bg-yellow-600/40 animate-particle [animation-delay:1.5s]" />
                  </div>

                  {/* VISIBLE FILTER LAYERS */}
                  <div className="w-[180px] space-y-1.5 my-auto pt-10 z-10 relative">
                    
                    {/* Layer 1: High Density Sediment Filter (Prefiltration) */}
                    <div className="bg-white/90 border border-slate-200/90 rounded-md py-1 text-center shadow-xs">
                      <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest scale-95">
                        Phase 1: Sediment Filtration
                      </div>
                      <div className="h-1 bg-gradient-to-r from-amber-400/20 via-slate-100 to-amber-400/20 mx-2 mt-0.5 rounded-full" />
                    </div>

                    {/* Layer 2: Graphene Active Matrix Filter (Magical smart highlight) */}
                    <div className={`relative border rounded-lg py-2.5 text-center transition-all duration-500 overflow-hidden ${
                      filterActive
                        ? "bg-cyan-950/95 border-cyan-400/90 shadow-lg shadow-cyan-500/25 glow-cyan"
                        : "bg-slate-850/90 border-slate-600"
                    }`}>
                      {/* Laser scanning line inside Graphene Matrix */}
                      {filterActive && (
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-400 animate-bounce" />
                      )}
                      
                      <div className="flex items-center justify-center gap-1.5">
                        <Cpu className={`h-3 w-3 ${filterActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          filterActive ? 'text-cyan-100' : 'text-slate-300'
                        }`}>
                          Graphene Hydro-Matrix
                        </span>
                      </div>
                      <p className="text-[8px] text-cyan-300/80 font-mono mt-0.5">Active Carbon-Bond Cage</p>

                      {/* Quantum bonding indicator light dots inside the graphene layer */}
                      {filterActive && (
                        <div className="flex justify-center gap-1.5 mt-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 pointer-events-none" />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none animate-pulse" />
                        </div>
                      )}
                    </div>

                    {/* Layer 3: Nano-Mineral Infusion Filter */}
                    <div className="bg-white/90 border border-slate-200/90 rounded-md py-1 text-center shadow-xs">
                      <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest scale-95">
                        Phase 3: Essential Remineralization
                      </div>
                      <div className="h-1 bg-gradient-to-r from-teal-500/20 via-sky-100 to-teal-500/20 mx-2 mt-0.5 rounded-full" />
                    </div>

                  </div>

                  {/* Bottom: Crystal Clear Purified Water Chamber */}
                  <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-cyan-400/25 to-cyan-400/5 backdrop-blur-[1px] border-t border-cyan-400/20 z-10 flex flex-col justify-end p-1">
                    {/* Flowing clean droplets trickling into reservoir */}
                    <div className="flex justify-center gap-2 mb-1.5">
                      <Droplet className="h-2 w-2 text-cyan-500 animate-bounce" />
                      <Droplet className="h-1.5 w-1.5 text-cyan-400 animate-bounce [animation-delay:0.4s]" />
                      <Droplet className="h-2 w-2 text-cyan-500 animate-bounce [animation-delay:0.8s]" />
                    </div>
                    
                    <span className="text-[8px] font-mono font-bold text-cyan-800 tracking-wider block text-center uppercase">
                      PURE RESERVOIR
                    </span>
                    
                    {/* Liquid ripple wave effect visually */}
                    <div className="relative h-2 w-full overflow-hidden opacity-80">
                      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-b-sm animate-pulse" />
                    </div>
                  </div>

                </div>

                {/* Lower base stand and pure water tap discharge (Brushed Chrome/White) */}
                <div className="w-56 h-8 bg-gradient-to-b from-white to-slate-100 border-b border-x border-slate-200/80 rounded-b-2xl shadow-md z-20 flex justify-between items-center px-6">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse border border-emerald-300" />
                  <div className="h-2.5 w-8 bg-slate-300/60 rounded-full" />
                  <div className="h-3 w-3 rounded-full bg-slate-200 border border-slate-300" />
                </div>
              </div>

              {/* Footnote interactive helper button */}
              <div className="mt-4 text-center z-10">
                <button
                  onClick={() => setFilterActive(!filterActive)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                    filterActive
                      ? "bg-cyan-100 text-cyan-800 border border-cyan-200"
                      : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                  }`}
                  id="btn-toggle-filter-visual"
                >
                  <Sparkles className="h-2.5 w-2.5 shrink-0" />
                  <span>Interactive: {filterActive ? "Disable Graphene Bond" : "Graphene Active Mode"}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
