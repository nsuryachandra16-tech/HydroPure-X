/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Hammer, Bug, Layers, Waves, FlaskConical, AlertTriangle, ShieldCheck } from "lucide-react";
import { ImpurityType } from "../types";

export default function ImpuritiesSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const impurities: ImpurityType[] = [
    {
      id: "heavy-metals",
      name: "Heavy Metals",
      chemicalFormula: "Pb²⁺, Hg²⁺, As³⁺",
      size: "0.1 - 0.2 nm",
      dangerLevel: "High",
      description: "Bio-accumulative elements like Lead and Mercury that cause progressive neurological damage.",
      color: "bg-amber-500",
      particleSvg: "heavy-metal"
    },
    {
      id: "bacteria",
      name: "Bacteria & Pathogens",
      chemicalFormula: "E. coli, Salmonella",
      size: "1,000 - 5,000 nm",
      dangerLevel: "High",
      description: "Microbiological organisms causing immediate gastrointestinal illness and severe infections.",
      color: "bg-emerald-500",
      particleSvg: "bacteria"
    },
    {
      id: "suspended-particles",
      name: "Suspended Particles",
      chemicalFormula: "Silt, Rust, Clay",
      size: "10,000 - 100,000 nm",
      dangerLevel: "Moderate",
      description: "Physical debris that degrades water clarity, creates turbidity, and degrades fine filters.",
      color: "bg-yellow-600",
      particleSvg: "silt"
    },
    {
      id: "dissolved-salts",
      name: "Dissolved Salts (TDS)",
      chemicalFormula: "NaCl, CaSO₄, MgCO₃",
      size: "0.2 - 0.5 nm",
      dangerLevel: "Low",
      description: "Highly soluble ionic compounds contributing to bad taste, pipe scaling, and extreme mineral hardness.",
      color: "bg-cyan-500",
      particleSvg: "salts"
    },
    {
      id: "industrial-chemicals",
      name: "Industrial Chemicals",
      chemicalFormula: "PFAS, Pesticides",
      size: "0.5 - 2.0 nm",
      dangerLevel: "High",
      description: "Synthetic fluorinated solvents and agricultural chemical runoffs resistant to natural decay.",
      color: "bg-rose-500",
      particleSvg: "chemicals"
    }
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100" id="impurities">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Contaminant Profile</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Common Water Impurities
          </h2>
          <p className="text-slate-600">
            Natural and synthetic residues found in general water supplies. Click on any profile card to view molecular particles and structural thresholds.
          </p>
        </div>

        {/* 5 Impurity Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {impurities.map((imp) => {
            const isSelected = activeCard === imp.id;
            
            // Icon assignment based on ID
            const renderIcon = () => {
              switch (imp.id) {
                case "heavy-metals":
                  return <Hammer className="h-5 w-5 text-amber-600" />;
                case "bacteria":
                  return <Bug className="h-5 w-5 text-emerald-600" />;
                case "suspended-particles":
                  return <Layers className="h-5 w-5 text-yellow-700" />;
                case "dissolved-salts":
                  return <Waves className="h-5 w-5 text-cyan-600" />;
                case "industrial-chemicals":
                  return <FlaskConical className="h-5 w-5 text-rose-600" />;
                default:
                  return <FlaskConical className="h-5 w-5 text-blue-600" />;
              }
            };

            const abbr = (() => {
              switch (imp.id) {
                case "heavy-metals": return { text: "Hg", bg: "bg-red-50 text-red-700" };
                case "bacteria": return { text: "Bac", bg: "bg-green-50 text-green-700" };
                case "suspended-particles": return { text: "Par", bg: "bg-yellow-50 text-yellow-700" };
                case "dissolved-salts": return { text: "Sal", bg: "bg-blue-50 text-blue-700" };
                case "industrial-chemicals": return { text: "Ind", bg: "bg-purple-50 text-purple-700" };
                default: return { text: "Imp", bg: "bg-slate-50 text-slate-700" };
              }
            })();

            return (
              <div
                key={imp.id}
                onClick={() => setActiveCard(isSelected ? null : imp.id)}
                className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isSelected
                    ? "bg-white border-cyan-500 shadow-md ring-2 ring-cyan-100/50"
                    : "bg-white border-slate-100 hover:border-slate-200 shadow-xs"
                }`}
              >
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-slate-50 p-2 transition-colors group-hover:bg-cyan-50/50">
                      {renderIcon()}
                    </div>
                    <span className={`w-8 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold ${abbr.bg}`}>
                      {abbr.text}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    imp.dangerLevel === "High"
                      ? "bg-rose-50 text-rose-700 border border-rose-150"
                      : imp.dangerLevel === "Moderate"
                      ? "bg-amber-50 text-amber-700 border border-amber-150"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    <AlertTriangle className="h-2 w-2 shrink-0" />
                    <span>{imp.dangerLevel} Danger</span>
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4 space-y-1.5">
                  <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-cyan-600 transition-colors">
                    {imp.name}
                  </h3>
                  {imp.chemicalFormula && (
                    <code className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                      {imp.chemicalFormula}
                    </code>
                  )}
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-2 pt-1 border-t border-slate-50">
                    {imp.description}
                  </p>
                </div>

                {/* Animated Contamination Particle Visual Panel */}
                <div className="relative mt-4 h-24 rounded-lg bg-slate-50 border border-slate-150/60 overflow-hidden flex items-center justify-center p-2">
                  <span className="absolute bottom-1 right-1.5 text-[8px] font-mono text-slate-400">
                    d = {imp.size}
                  </span>

                  {/* Microscopic Particle Visual Simulation Container */}
                  <div className="absolute inset-0 z-0">
                    {imp.id === "heavy-metals" && (
                      <div className="w-full h-full relative">
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600/30 border border-amber-600 flex items-center justify-center">
                          <span className="text-[6px] font-mono font-bold text-amber-800">Pb</span>
                        </div>
                        <div className="absolute top-1/3 left-2/3 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-amber-700/25 border border-amber-700 flex items-center justify-center">
                          <span className="text-[6px] font-mono font-bold text-amber-800">Hg</span>
                        </div>
                        {/* Tiny floating surrounding ions */}
                        <span className="absolute left-[38%] top-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="absolute left-[62%] top-[25%] w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse [animation-delay:0.3s]" />
                      </div>
                    )}

                    {imp.id === "bacteria" && (
                      <div className="w-full h-full relative">
                        {/* Dynamic wiggly bacteria rods */}
                        <div className="absolute top-6 left-6 w-11 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/80 flex items-center justify-center animate-pulse">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                          <div className="w-1 h-1 rounded-full bg-emerald-600 ml-1.5 animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <div className="absolute top-12 left-20 w-8 h-3 rounded-full bg-teal-500/20 border border-teal-500/80 flex items-center justify-center animate-pulse [animation-delay:0.5s]">
                          <div className="w-1 h-1 rounded-full bg-teal-600 animate-bounce" />
                        </div>
                      </div>
                    )}

                    {imp.id === "suspended-particles" && (
                      <div className="w-full h-full relative flex flex-wrap gap-2 items-center justify-center p-3">
                        {/* Irregular rigid soil speck particles */}
                        <div className="w-2.5 h-2 bg-yellow-700/40 rounded-sm origin-center rotate-45 animate-bounce" />
                        <div className="w-2 h-3 bg-amber-800/50 rounded-lg origin-center -rotate-12 animate-pulse [animation-delay:0.3s]" />
                        <div className="w-3.5 h-2 bg-yellow-600/30 rounded-full animate-bounce [animation-delay:0.7s]" />
                        <div className="w-1.5 h-1.5 bg-slate-500/50 rounded-sm rotate-[110deg] animate-pulse [animation-delay:1.1s]" />
                      </div>
                    )}

                    {imp.id === "dissolved-salts" && (
                      <div className="w-full h-full relative">
                        {/* Separated crystalline grid salts */}
                        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-cyan-100/50 border border-cyan-300 rounded px-1 animate-pulse">
                          <span className="text-[6px] font-mono font-bold text-cyan-800">Na⁺</span>
                          <span className="text-[6px] font-mono font-bold text-cyan-500">Cl⁻</span>
                        </div>
                        <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-100 border border-slate-300 rounded px-1 animate-pulse [animation-delay:0.6s]">
                          <span className="text-[6px] font-mono font-bold text-slate-700">Ca²⁺</span>
                          <span className="text-[6px] font-mono font-bold text-slate-400">SO₄²⁻</span>
                        </div>
                      </div>
                    )}

                    {imp.id === "industrial-chemicals" && (
                      <div className="w-full h-full relative">
                        {/* Toxic benzene chain mockup with glowing center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
                          <div className="w-8 h-8 rounded-full border border-dashed border-rose-500 flex items-center justify-center animate-spin [animation-duration:12s]">
                            <span className="w-2 h-0.5 bg-rose-500 block" />
                            <span className="w-2 h-0.5 bg-rose-500 block rotate-90" />
                          </div>
                          <span className="absolute w-3 h-3 rounded-full bg-rose-600/35 border border-rose-600 flex items-center justify-center">
                            <span className="text-[5px] font-bold text-rose-900">CF</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection state check banner */}
                <div className={`mt-3 flex items-center justify-center gap-1.5 text-[10px] font-medium transition-all ${
                  isSelected ? "text-cyan-600 font-bold" : "text-slate-400"
                }`}>
                  <ShieldCheck className={`h-3.5 w-3.5 ${isSelected ? "text-cyan-500" : "text-slate-300"}`} />
                  <span>{isSelected ? "Graphene bondable active" : "Graphene target"}</span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
