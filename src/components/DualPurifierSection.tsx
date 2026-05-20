/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sliders, Droplet, Sparkles, RefreshCw, Layers, ShieldAlert, Cpu } from "lucide-react";
import { SimulationInputs } from "../types";
import InteractivePurifierSim from "./InteractivePurifierSim";

export default function DualPurifierSection() {
  // Synchronized simulation states
  const [inputs, setInputs] = useState<SimulationInputs>({
    contamination: 350,
    saltContent: 180,
    waterFlow: 5,
    impurityDensity: 3
  });

  // Local live fluctuating offset for metrics to feel mechanical and real-time
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicks((t) => t + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Scientific PPM calculation formulas based on the physics/chemistry sliders
  const inputPPM = inputs.contamination + inputs.saltContent;
  
  // Traditional Reverse Osmosis: Removes major metals but struggles with monovalent salts at high speed and wastes high water
  const roEfficiencyFactor = 0.35 + (inputs.waterFlow / 100); 
  const rawRoOutput = (inputs.contamination * 0.12) + (inputs.saltContent * 0.45 * roEfficiencyFactor);
  const roOutputPPM = Math.max(12, Math.round(rawRoOutput));

  // HydroPure Graphene-assisted: Active cage adsorption + custom molecular sieves maintain pristine purity regardless of speed
  const carbonSizingAdsorption = 0.05 - (inputs.impurityDensity / 250);
  const rawHydroOutput = (inputs.contamination * 0.01) + (inputs.saltContent * 0.06 * (1 + carbonSizingAdsorption));
  const hydroOutputPPM = Math.max(4, Math.round(rawHydroOutput));

  // Wastage output calculators
  const roWasteRatio = Math.round(62 + (inputs.contamination / 30) - (inputs.waterFlow / 3));
  const hydroWasteRatio = Math.round(11 + (inputs.contamination / 100));

  // Pure flow drip counts for visual mapping
  const roDelay = 11 - inputs.waterFlow; // larger number = slower
  const hydroDelay = Math.max(1, 11 - (inputs.waterFlow * 1.5));

  const handlePreset = (type: "Well Water" | "Tap Water" | "Industrial Site") => {
    if (type === "Well Water") {
      setInputs({ contamination: 480, saltContent: 320, waterFlow: 4, impurityDensity: 4 });
    } else if (type === "Tap Water") {
      setInputs({ contamination: 150, saltContent: 80, waterFlow: 6, impurityDensity: 2 });
    } else {
      setInputs({ contamination: 720, saltContent: 450, waterFlow: 3, impurityDensity: 5 });
    }
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-100" id="simulation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Active Laboratory</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Dual Purifier Simulation
          </h2>
          <p className="text-slate-600">
            Compare HydroPure with a traditional Reverse Osmosis membrane under identical test conditions. Adjust the synchronized chemical parameters below.
          </p>
        </div>

        {/* CONTROLLER SHELF (Glassmorphism card) */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-cyan-50 text-cyan-700">
                <Sliders className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Synchronized Water Controls</h3>
                <p className="text-xs text-slate-500">Both purification shells receive this exact molecular makeup</p>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2.5">
              <span className="text-xs font-semibold text-slate-400 self-center mr-1">Scenario Presets:</span>
              <button
                onClick={() => handlePreset("Tap Water")}
                className="px-3 py-1.5 rounded-lg border border-slate-205 text-xs text-slate-600 font-semibold bg-slate-50 hover:bg-slate-100"
                id="preset-tap"
              >
                Municipal Tap
              </button>
              <button
                onClick={() => handlePreset("Well Water")}
                className="px-3 py-1.5 rounded-lg border border-slate-205 text-xs text-slate-600 font-semibold bg-slate-50 hover:bg-slate-100"
                id="preset-well"
              >
                Heavy Well Water
              </button>
              <button
                onClick={() => handlePreset("Industrial Site")}
                className="px-3 py-1.5 rounded-lg border border-rose-201 text-xs text-rose-700 font-semibold bg-rose-50 hover:bg-rose-100"
                id="preset-industrial"
              >
                Industrial Runoff
              </button>
            </div>
          </div>

          {/* SLIDERS GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Control 1: Contamination Level */}
            <div className="space-y-2.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Contamination Level</span>
                <span className="font-mono text-cyan-600 font-bold">{inputs.contamination} PPM</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="10"
                value={inputs.contamination}
                onChange={(e) => setInputs({ ...inputs, contamination: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                id="slider-contamination"
              />
              <p className="text-[10px] text-slate-450 text-slate-400">Suspended lead, soil dust, and pathogen count equivalents.</p>
            </div>

            {/* Control 2: Salt Content */}
            <div className="space-y-2.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Salt Content (TDS)</span>
                <span className="font-mono text-cyan-600 font-bold">{inputs.saltContent} PPM</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={inputs.saltContent}
                onChange={(e) => setInputs({ ...inputs, saltContent: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                id="slider-salt"
              />
              <p className="text-[10px] text-slate-450 text-slate-400">Soluble sodium chloride, calcium, and mineral load.</p>
            </div>

            {/* Control 3: Water Flow */}
            <div className="space-y-2.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Water Flow Speed</span>
                <span className="font-mono text-cyan-600 font-bold">x{inputs.waterFlow}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={inputs.waterFlow}
                onChange={(e) => setInputs({ ...inputs, waterFlow: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                id="slider-flow"
              />
              <p className="text-[10px] text-slate-450 text-slate-400">Velocity of liquid running through filter chamber grids.</p>
            </div>

            {/* Control 4: Impurity Density */}
            <div className="space-y-2.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">Pore Impurity Size</span>
                <span className="font-mono text-cyan-600 font-bold">{inputs.impurityDensity}μm avg</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={inputs.impurityDensity}
                onChange={(e) => setInputs({ ...inputs, impurityDensity: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                id="slider-density"
              />
              <p className="text-[10px] text-slate-450 text-slate-400">Average radius of dissolved sediments and solid clusters.</p>
            </div>

          </div>
        </div>

        {/* COMPARATIVE METRICS OVERVIEW (LIVE PPM PREDICTOR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center font-sans">
          
          {/* Intake Water quality overview */}
          <div className="bg-slate-100/75 border border-slate-200/65 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">UNPROTECTED INPUT QUALITY</span>
              <p className="text-3xl font-mono font-extrabold text-slate-800">{inputPPM} <span className="text-sm font-normal text-slate-500">PPM</span></p>
            </div>
            <div className="mt-3 text-xs font-semibold text-slate-600">
              Total Dissolved Solids Level
            </div>
          </div>

          {/* TRADITIONAL RO ESTIMATED OUTPUT */}
          <div className="bg-white border-l-4 border-amber-500 shadow-xs border border-slate-200 rounded-xl p-4 flex flex-col justify-between transition-all">
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">TRADITIONAL RO OUTPUT</span>
              <p className="text-3xl font-mono font-extrabold text-slate-800">
                {roOutputPPM} <span className="text-sm font-normal text-slate-500">PPM</span>
              </p>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-50 rounded-lg py-1 px-2.5">
              <span>Wastage: ~<strong>{roWasteRatio}%</strong> of Input</span>
            </div>
          </div>

          {/* HYDRO_PURE ESTIMATED OUTPUT (Glowing highlight) */}
          <div className="bg-cyan-950 border-l-4 border-cyan-400 shadow-md shadow-cyan-950/20 text-white rounded-xl p-4 flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>HYDROPURE OUTPUT</span>
              </div>
              <p className="text-3xl font-mono font-extrabold text-cyan-100">
                {hydroOutputPPM} <span className="text-sm font-normal text-cyan-400">PPM</span>
              </p>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-cyan-200 font-semibold bg-cyan-900 rounded-lg py-1 px-2.5">
              <span>Wastage: ~<strong>{hydroWasteRatio}%</strong> of Input</span>
            </div>
          </div>

        </div>

        {/* SIDE-BY-SIDE PURIFIER SIMULATOR BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: TRADITIONAL RO PURIFIER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col items-center">
            
            <div className="w-full border-b border-slate-100 pb-4 mb-4 text-center">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Traditional RO Purifier
              </span>
              <h3 className="font-bold text-slate-800 font-sans mt-2">Reverse Osmosis Core</h3>
              <p className="text-xs text-slate-500 mt-1">Slower flow rate, severe water discharge loss</p>
            </div>

            {/* RO PURIFIER VISUAL PANEL */}
            <div className="w-full max-w-sm">
              <InteractivePurifierSim type="ro" inputs={inputs} />
            </div>

            {/* Performance card */}
            <div className="w-full mt-4 bg-slate-50 p-4.5 rounded-xl border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Pure water output:</span>
                <span className="text-slate-800">Slow (~300 mL/min)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Pore friction wear:</span>
                <span className="text-amber-700 font-bold">High (Frequent blockages)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Energy required:</span>
                <span className="text-slate-800">High pressure required</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: HYDROPURE GRAPHENE PURIFIER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-cyan-500 shadow-md shadow-cyan-100/50 p-6 flex flex-col items-center">
            
            <div className="w-full border-b border-slate-100 pb-4 mb-4 text-center">
              <span className="text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-cyan-500 shrink-0" />
                <span>HydroPure Graphene Purifier</span>
              </span>
              <h3 className="font-bold text-slate-800 font-sans mt-2">Active Graphene Sieve</h3>
              <p className="text-xs text-slate-500 mt-1">Extreme high throughput flow, negligible wastage loss</p>
            </div>

            {/* HYDROPURE GRAPHENE VISUAL PANEL */}
            <div className="w-full max-w-sm">
              <InteractivePurifierSim type="graphene" inputs={inputs} />
            </div>

            {/* Performance card */}
            <div className="w-full mt-4 bg-cyan-50/50 p-4.5 rounded-xl border border-cyan-100 text-xs space-y-2 text-cyan-950">
              <div className="flex justify-between font-semibold">
                <span className="text-cyan-800">Pure water output:</span>
                <span className="font-bold">Rapid (~1200 mL/min)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-cyan-800">Friction adsorption:</span>
                <span className="text-teal-700 font-bold">Self-cleaning (Anti-fouling mesh)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-cyan-800">Energy required:</span>
                <span className="font-bold">Gravity-fed / Ultra-low pressure</span>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic educational footnote on graphene chemistry mechanics */}
        <div className="mt-8 border border-slate-100 rounded-xl p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg animate-pulse whitespace-nowrap">
              Chemistry Fact
            </span>
            <p className="text-xs text-slate-600">
              Standard RO membranes rely on severe pressure to force water through non-porous polymer meshes. Graphene nanosheets, however, exploit pristine <strong>one-atom-thick carbon capillaries</strong>, allowing water molecules to travel in frictionless sub-nanometer channels while completely excluding even dissolved ions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
