/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Info, ShieldAlert, Sparkles, CheckCircle, HelpCircle } from "lucide-react";
import { PPMLevel } from "../types";

export default function PpmChartSection() {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  const ppmLevels: PPMLevel[] = [
    {
      min: 0,
      max: 50,
      label: "0 – 50 PPM",
      status: "Excellent",
      color: "bg-cyan-500",
      bgColor: "bg-cyan-50/40 text-cyan-800 border-cyan-200",
      borderColor: "border-cyan-400",
      details: "Optimal purity level. This is the structural target of state-of-the-art laboratory filtrations. Great taste and high bio-compatibility."
    },
    {
      min: 50,
      max: 150,
      label: "50 – 150 PPM",
      status: "Good",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50/40 text-emerald-800 border-emerald-200",
      borderColor: "border-emerald-400",
      details: "Standard mineral-balanced drinking water. Ideal for daily hydration. Contains healthy traces of soluble calcium and magnesium."
    },
    {
      min: 150,
      max: 300,
      label: "150 – 300 PPM",
      status: "Moderate",
      color: "bg-amber-400",
      bgColor: "bg-amber-50/40 text-amber-800 border-amber-200",
      borderColor: "border-amber-400",
      details: "Hard tap water. Elevated calcium scaling occurs upon boiling. Satisfies normal health standards but degrades household pipes over time."
    },
    {
      min: 300,
      max: 500,
      label: "300 – 500 PPM",
      status: "Poor",
      color: "bg-orange-500",
      bgColor: "bg-orange-50/40 text-orange-800 border-orange-200",
      borderColor: "border-orange-400",
      details: "Highly mineralized. Features a bitter chemical taste with visible chalky scaling. Requires active membrane treatment to lower values."
    },
    {
      min: 500,
      max: 1000,
      label: "500+ PPM",
      status: "Highly Contaminated",
      color: "bg-rose-500",
      bgColor: "bg-rose-50/40 text-rose-800 border-rose-200",
      borderColor: "border-rose-400",
      details: "Unsafe for direct human consumo. Potential presence of biological microbes, toxic industrial salts, and excessive metal runoff."
    }
  ];

  const activeLevel = ppmLevels[selectedTier];

  return (
    <section className="bg-white py-16 sm:py-24" id="ppm-chart">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-end mb-12">
          <div>
            <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-1.5">Aqueous Metrics</div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Understanding Water Quality (PPM)
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-lg leading-relaxed">
              PPM (Parts Per Million) measures impurity concentration in water. Learn how TDS (Total Dissolved Solids) impacts safe physiological consumption.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-start gap-2.5 max-w-md lg:ml-auto">
            <Info className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-500 leading-normal">
              <strong>TDS Equivalency:</strong> 1 PPM is equivalent to approximately 1 milligram of dry inorganic mineral and organic compounds dissolved in 1 liter of pure H₂O.
            </span>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* LEFT COLUMN: PPM TIERS (Interactive Cards) */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select a PPM Tier to test visual density:</p>
            
            <div className="space-y-3">
              {ppmLevels.map((lvl, index) => {
                const isSelected = selectedTier === index;
                return (
                  <button
                    key={lvl.status}
                    onClick={() => setSelectedTier(index)}
                    className={`w-full text-left rounded-xl border p-4 transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                      isSelected
                        ? `bg-white border-slate-900 shadow-md ${lvl.borderColor} ring-1 ring-slate-100`
                        : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 hover:border-slate-200"
                    }`}
                    id={`ppm-tier-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-8 w-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold border ${
                        isSelected ? "bg-slate-900 text-white" : "bg-white text-slate-700"
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{lvl.label}</div>
                        <div className="text-xs text-slate-500">Classification Level</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        isSelected ? lvl.bgColor : "bg-slate-100 border-slate-200 text-slate-500"
                      }`}>
                        {lvl.status}
                      </span>
                      {/* Active level arrow indicators */}
                      <span className={`h-2 w-2 rounded-full ${lvl.color}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: PREMIUM BEAKER WATER SIMULATION & INFORMATION REPORT */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-slate-50/80 border border-slate-100 p-6 rounded-2xl flex-1 flex flex-col justify-between space-y-6">
              
              {/* Heading */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Dynamic Quality Analyst</div>
                <h4 className="font-semibold text-slate-800">Visual Residue representation</h4>
              </div>

              {/* The Physical Beaker Graphic Component */}
              <div className="relative h-44 w-full flex items-center justify-center py-2">
                
                {/* Visual Beaker Outline */}
                <div className="relative w-28 h-40 border-b-4 border-x-4 border-slate-300 rounded-b-3xl flex flex-col justify-end overflow-hidden">
                  
                  {/* Beaker Measurement Marks (Litera/TDS) */}
                  <div className="absolute left-1.5 inset-y-0 flex flex-col justify-between py-4 text-[8px] font-mono text-slate-400 z-10 pointer-events-none">
                    <span>— 500</span>
                    <span>— 300</span>
                    <span>— 150</span>
                    <span>— 50</span>
                  </div>

                  {/* Water Volume Body Filling Component */}
                  <div 
                    className={`w-full transition-all duration-700 ease-in-out relative flex flex-col justify-end overflow-hidden`}
                    style={{
                      height: selectedTier === 0 ? "35%" 
                             : selectedTier === 1 ? "50%"
                             : selectedTier === 2 ? "65%"
                             : selectedTier === 3 ? "80%"
                             : "92%",
                      background: selectedTier === 0 ? "linear-gradient(to top, rgba(6, 182, 212, 0.45), rgba(6, 182, 212, 0.15))"
                                : selectedTier === 1 ? "linear-gradient(to top, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.15))"
                                : selectedTier === 2 ? "linear-gradient(to top, rgba(251, 191, 36, 0.45), rgba(251, 191, 36, 0.15))"
                                : selectedTier === 3 ? "linear-gradient(to top, rgba(249, 115, 22, 0.5), rgba(249, 115, 22, 0.15))"
                                : "linear-gradient(to top, rgba(239, 68, 68, 0.55), rgba(239, 68, 68, 0.15))"
                    }}
                  >
                    
                    {/* Ripple/Wave topper bar */}
                    <div className={`absolute top-0 inset-x-0 h-1.5 opacity-60 animate-pulse ${
                      selectedTier === 0 ? "bg-cyan-400"
                      : selectedTier === 1 ? "bg-emerald-400"
                      : selectedTier === 2 ? "bg-amber-300"
                      : selectedTier === 3 ? "bg-orange-400"
                      : "bg-rose-500"
                    }`} />

                    {/* Impurity Particle Overlay Inside Beaker */}
                    <div className="absolute inset-0 p-3 pointer-events-none overflow-hidden">
                      {/* Generates particles proportionally to Selected Tier */}
                      {Array.from({ length: selectedTier * 8 + 2 }).map((_, i) => (
                        <span
                          key={i}
                          className={`absolute rounded-full animate-pulse transition-colors ${
                            selectedTier === 0 ? "w-1 h-1 bg-cyan-700/40"
                            : selectedTier === 1 ? "w-1 h-1 bg-emerald-600/50"
                            : selectedTier === 2 ? "w-1.5 h-1.5 bg-amber-700/60"
                            : selectedTier === 3 ? "w-1.5 h-1.5 bg-orange-850/70"
                            : "w-2.5 h-2 bg-rose-900/80 rounded-sm"
                          }`}
                          style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            animationDelay: `${Math.random() * 1.5}s`,
                            animationDuration: `${Math.random() * 2 + 1}s`
                          }}
                        />
                      ))}
                    </div>

                  </div>

                </div>

                {/* Subtitle indicator reflecting current PPM */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm z-20">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Purity index</span>
                  <span className="text-xl font-mono font-bold text-slate-900 mt-1">
                    {activeLevel.min === 0 ? "18" : activeLevel.min === 500 ? "720" : Math.floor((activeLevel.min + activeLevel.max) / 2)}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">mg/L</span>
                </div>
              </div>

              {/* Quality Description Card */}
              <div className="bg-white p-4.5 rounded-xl border border-slate-100 shadow-xs space-y-2">
                <div className="flex items-center gap-1.5">
                  {selectedTier < 2 ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-xs font-bold text-slate-800">
                    {activeLevel.status} Category Assessment
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {activeLevel.details}
                </p>
                
                {/* Glowing status line */}
                <div className="pt-2">
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${activeLevel.color}`}
                      style={{ width: `${((selectedTier + 1) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
