/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import HeroSection from "./components/HeroSection";
import ImpuritiesSection from "./components/ImpuritiesSection";
import PpmChartSection from "./components/PpmChartSection";
import DualPurifierSection from "./components/DualPurifierSection";
import ComparisonSection from "./components/ComparisonSection";
import { Droplet, ArrowUpCircle, ShieldCheck, HeartPulse, GraduationCap } from "lucide-react";

export default function App() {
  
  // Handlers for scrolling to respective section anchors smoothly
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-cyan-100 selection:text-cyan-900 scroll-smooth">
      
      {/* 1. STICKY PREMIUM NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo details matching Artistic Flair branding */}
            <div className="flex items-center gap-2.5 cursor-pointer animate-fade-in" onClick={() => scrollToSection("hero")}>
              <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm shadow-cyan-500/20">
                H
              </span>
              <div>
                <span className="text-xl font-bold font-display tracking-tight text-slate-800">
                  HydroPure
                </span>
                <span className="block text-[8px] font-mono font-bold tracking-widest text-cyan-600 -mt-0.5 uppercase">
                  Graphene Smart Sieve
                </span>
              </div>
            </div>

            {/* Nav anchors with elegant alignment */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <button
                onClick={() => scrollToSection("impurities")}
                className="hover:text-cyan-600 transition-colors uppercase tracking-wider text-[10px]"
                id="nav-impurities"
              >
                Impurities
              </button>
              <button
                onClick={() => scrollToSection("ppm-chart")}
                className="hover:text-cyan-600 transition-colors uppercase tracking-wider text-[10px]"
                id="nav-ppm"
              >
                Water quality (PPM)
              </button>
              <button
                onClick={() => scrollToSection("simulation")}
                className="hover:text-cyan-600 transition-colors uppercase tracking-wider text-[10px]"
                id="nav-simulation"
              >
                Dual Simulator
              </button>
              <button
                onClick={() => scrollToSection("comparison")}
                className="hover:text-cyan-600 transition-colors uppercase tracking-wider text-[10px]"
                id="nav-compare"
              >
                ROI Matrix
              </button>
            </nav>

            {/* CTA action button with the slate-900 to bg-cyan-600 style */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection("simulation")}
                className="rounded-xl bg-slate-900 hover:bg-cyan-600 text-white px-4 py-2 text-xs font-bold transition-all duration-300 shadow-sm"
                id="btn-header-simulation"
              >
                Launch Model
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* RENDER THE SECTIONS */}
      
      {/* SECTION 1: HERO SECTION */}
      <HeroSection onStartSimulation={() => scrollToSection("simulation")} />

      {/* SECTION 2: WATER IMPURITIES */}
      <ImpuritiesSection />

      {/* SECTION 3: PPM CHART */}
      <PpmChartSection />

      {/* SECTION 4: DUAL PURIFIER SIMULATION */}
      <DualPurifierSection />

      {/* SECTION 5: RESULT COMPARISON TABLE */}
      <ComparisonSection />

      {/* CONCEPT METADATA LAB BANNER */}
      <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-cyan-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Engineering Chemistry Project</span>
              </div>
              <h4 className="text-lg font-bold font-display">University Science Prototype</h4>
              <p className="text-xs text-slate-450 text-slate-350 leading-relaxed">
                HydroPure serves as a comparative smart conceptual model representing the physical separation mechanics of two-dimensional carbon nanomaterials in environmental remediation.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-cyan-455 text-cyan-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Eco-Conservation Goals</span>
              </div>
              <h4 className="text-lg font-bold font-display">Targeting UN Sustainable Goal 6</h4>
              <p className="text-xs text-slate-450 text-slate-350 leading-relaxed">
                Aims to propose structural frameworks for Clean Water and Sanitation by drastically reducing the waste reject stream standard in traditional membrane arrays.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-cyan-455 text-cyan-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Toxicity Protection</span>
              </div>
              <h4 className="text-lg font-bold font-display">Physiological Protection</h4>
              <p className="text-xs text-slate-450 text-slate-350 leading-relaxed">
                Prioritizing the physical exclusion of industrial heavy metal complexes while protecting trace concentrations of safe minerals for physical health wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HUMBLE AND CLEAN LITERAL FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-6 border-t border-slate-900/40 font-mono text-[10px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} HydroPure Co. All Rights Reserved. Conceptual Prototyping.
          </p>
          <div className="flex items-center gap-4">
            <span>UN SDG #6 compliant</span>
            <span className="text-slate-705 text-slate-700">|</span>
            <span>Presentation Sandbox</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      <button 
        onClick={() => scrollToSection("hero")}
        className="fixed bottom-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all z-40 border border-slate-200"
        title="Scroll to Top"
        id="btn-scroll-top"
      >
        <ArrowUpCircle className="h-5 w-5" />
      </button>

    </div>
  );
}
