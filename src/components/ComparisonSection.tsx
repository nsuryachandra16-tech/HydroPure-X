/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, AlertCircle, ShieldAlert, Award, Star, Zap, RefreshCw } from "lucide-react";

export default function ComparisonSection() {
  const comparisonData = [
    {
      feature: "Water Wastage",
      ro: "Higher (Wastes up to 60-75% of input)",
      hydro: "Ultra-low (Restricted to <12% leakage)",
      roStatus: "poor",
      hydroStatus: "optimal"
    },
    {
      feature: "Filtration Efficiency",
      ro: "Moderate (Leaves trace salts and minerals)",
      hydro: "Better (Pore-mesh adsorption holds solids)",
      roStatus: "moderate",
      hydroStatus: "optimal"
    },
    {
      feature: "Maintenance Cycle",
      ro: "Frequent (Polymer pores clog under high hardness)",
      hydro: "Reduced (Graphene is chemically self-cleaning)",
      roStatus: "poor",
      hydroStatus: "optimal"
    },
    {
      feature: "Purification Quality",
      ro: "Moderate (Dependent on manual pump pressure)",
      hydro: "Improved (Passive mechanical carbon capillary capture)",
      roStatus: "moderate",
      hydroStatus: "optimal"
    },
    {
      feature: "Output Mineral Quality",
      ro: "Higher PPM (Struggles with dissolved trace metals)",
      hydro: "Lower PPM (Ensures safe, mineral-balanced output)",
      roStatus: "moderate",
      hydroStatus: "optimal"
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24" id="comparison">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Comparative Summary</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Purification Performance Comparison
          </h2>
          <p className="text-slate-600">
            A comprehensive matrix of mechanical parameters highlighting the distinct operational advantages of Graphene integration.
          </p>
        </div>

        {/* COMPARISON MATRIX - Modern Startup Style Tabular Grid */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-slate-50 p-1 sm:p-2 mb-16">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 sm:p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Features & Benchmarks</th>
                  <th className="p-4 sm:p-5 text-xs font-bold text-slate-600 uppercase tracking-wider w-[35%]">Traditional RO</th>
                  
                  {/* Glowing Highlighted Header for HydroPure */}
                  <th className="p-4 sm:p-5 bg-gradient-to-b from-cyan-950 to-slate-900 text-cyan-400 text-xs font-extrabold uppercase tracking-wider w-[38%] rounded-t-xl border-x border-t border-cyan-500/30">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
                      <span>HydroPure (Recommended)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Feature Label */}
                    <td className="p-4 sm:p-5 text-sm font-semibold text-slate-900 border-r border-slate-100 bg-slate-50/30">
                      {row.feature}
                    </td>

                    {/* Traditional RO Cell */}
                    <td className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600">
                      <div className="flex items-start gap-2">
                        {row.roStatus === "poor" ? (
                          <ShieldAlert className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span>{row.ro}</span>
                      </div>
                    </td>

                    {/* HydroPure Glowing Cell */}
                    <td className="p-4 sm:p-5 text-xs sm:text-sm font-medium text-slate-900 bg-cyan-50/20 border-x border-cyan-500/10">
                      <div className="flex items-start gap-2">
                        <Check className="h-4.5 w-4.5 text-cyan-600 shrink-0 mt-0.5 bg-cyan-100 rounded-full p-0.5" />
                        <span className="text-cyan-950">{row.hydro}</span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COMPREHENSIVE RECOMMENDATION CARDS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-201 p-6 rounded-xl space-y-3">
            <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Ecological Impact
            </span>
            <h4 className="font-bold text-slate-900">Zero Water Waste Standard</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard state regulations require a 3:1 waste-to-pure ratio for domestic purifiers. HydroPure graphene grids bypass this completely, saving up to 14,000 liters of potable water per household annually.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-950 to-slate-900 text-white p-6 rounded-xl space-y-3 shadow-md border border-cyan-500/20 relative overflow-hidden">
            {/* Ambient subtle glow element */}
            <div className="absolute top-0 right-0 h-16 w-16 bg-cyan-500/20 blur-md rounded-full" />
            
            <span className="bg-cyan-500 text-cyan-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Zap className="h-2.5 w-2.5 fill-cyan-950" />
              <span>Technology Highlight</span>
            </span>
            <h4 className="font-bold text-cyan-50 font-sans">Atomical Graphene Sieve</h4>
            <p className="text-xs text-cyan-200/90 leading-relaxed">
              Leverages high quality carbon lattices with custom 0.15nm microcapillaries. Unlike standard chemical filters, graphene matrices allow spontaneous water movement avoiding energy intensive high-pressure pumps.
            </p>
          </div>

          <div className="bg-white border border-slate-201 p-6 rounded-xl space-y-3">
            <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Functional Lifespan
            </span>
            <h4 className="font-bold text-slate-900">Reduced Bio-Fouling</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional filters are prone to bacteria buildup causing persistent bio-film layers. HydroPure's graphene sheets feature intrinsic anti-microbial action, destroying biological cell membranes upon contact.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
