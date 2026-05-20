/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { SimulationInputs } from "../types";

interface InteractivePurifierSimProps {
  type: "ro" | "graphene";
  inputs: SimulationInputs;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "suspended" | "bacteria" | "heavy-metal" | "salt" | "water";
  size: number;
  color: string;
  status: "entering" | "trapped" | "waste" | "passed" | "captured" | "sliding";
  wiggleSeed: number;
  life: number; // For fading out/impact animations
  maxLife: number;
  angle: number;
  angleSpeed: number;
  bubbles: { dx: number; dy: number; size: number; alpha: number }[];
}

export default function InteractivePurifierSim({ type, inputs }: InteractivePurifierSimProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 320, height: 380 });
  const [hoveredParticle, setHoveredParticle] = useState<string | null>(null);

  // Maintain responsiveness of the canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: width || 320,
          height: height || 380,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let particleIdCounter = 0;
    let tick = 0;

    const safeCreateLinearGradient = (x0: number, y0: number, x1: number, y1: number) => {
      const rx0 = Number.isFinite(x0) ? x0 : 0;
      const ry0 = Number.isFinite(y0) ? y0 : 0;
      const rx1 = Number.isFinite(x1) ? x1 : 0;
      const ry1 = Number.isFinite(y1) ? y1 : 0;
      return ctx.createLinearGradient(rx0, ry0, rx1, ry1);
    };

    // Fluid background ripples & auxiliary decorative effects
    const ripples: { x: number; y: number; r: number; maxR: number; color: string; alpha: number }[] = [];
    const airBubbles: { x: number; y: number; vy: number; r: number; alpha: number }[] = [];

    // Key physics landmarks based on responsive height
    const membraneY = dimensions.height * 0.45; 
    const topInflowHeight = dimensions.height * 0.05;
    const bottomOutletsY = dimensions.height * 0.82;
    const splitX = dimensions.width * 0.5;

    // Particle styling configurations for highest artistic realism
    const getParticleProps = (ptype: Particle["type"]) => {
      switch (ptype) {
        case "water":
          return {
            color: type === "graphene" ? "#22d3ee" : "#0ea5e9",
            size: 2.5 + Math.random() * 1.5,
            label: "H2O"
          };
        case "bacteria":
          return {
            color: type === "graphene" ? "#10b981" : "#059669",
            size: 6 + Math.random() * 3,
            label: "Pathogen"
          };
        case "heavy-metal":
          return {
            color: type === "graphene" ? "#ef4444" : "#dc2626",
            size: 4 + Math.random() * 2,
            label: "Lead/Mercury"
          };
        case "salt":
          return {
            color: type === "graphene" ? "#38bdf8" : "#2563eb",
            size: 2.5 + Math.random() * 1.5,
            label: "Soluble Salt"
          };
        case "suspended":
          return {
            color: type === "graphene" ? "#f59e0b" : "#d97706",
            size: 5 + Math.random() * 4,
            label: "Silt & Debris"
          };
      }
    };

    // Particle spawning frequency based on interactive sliders
    const ticksBetweenSpawn = Math.max(1, Math.min(15, 10 - inputs.waterFlow));
    let framesSinceLastSpawn = 0;

    const createParticleObj = () => {
      particleIdCounter++;
      const speedMultiplier = 0.6 + inputs.waterFlow * 0.35;
      
      const rChance = Math.random();
      const totalContaminants = inputs.contamination + inputs.saltContent;
      // High-quality formula for dynamic ratio vs water molecules
      const impurityThreshold = totalContaminants / (totalContaminants + 500);

      let ptype: Particle["type"] = "water";

      if (rChance < impurityThreshold) {
        const subChance = Math.random();
        const totalSum = inputs.contamination + inputs.saltContent;
        const saltRatio = inputs.saltContent / (totalSum || 1);

        if (subChance < saltRatio) {
          ptype = "salt";
        } else {
          const contaminantSub = Math.random();
          if (contaminantSub < 0.25) {
            ptype = "suspended";
          } else if (contaminantSub < 0.55 && inputs.contamination > 150) {
            ptype = "bacteria";
          } else {
            ptype = "heavy-metal";
          }
        }
      }

      const pProps = getParticleProps(ptype);
      const minX = dimensions.width * 0.15;
      const maxX = dimensions.width * 0.85;
      const startX = minX + Math.random() * (maxX - minX);

      // Create micro-bubble attachments for realistic fluid aeration
      const bubbleCount = ptype === "water" ? 0 : Math.floor(Math.random() * 3);
      const bubbles = Array.from({ length: bubbleCount }).map(() => ({
        dx: (Math.random() - 0.5) * pProps.size,
        dy: (Math.random() - 0.5) * pProps.size,
        size: 0.5 + Math.random() * 1,
        alpha: 0.3 + Math.random() * 0.5,
      }));

      particles.push({
        id: particleIdCounter,
        x: startX,
        y: topInflowHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (1.5 + Math.random() * 1.5) * speedMultiplier,
        type: ptype,
        size: pProps.size,
        color: pProps.color,
        status: "entering",
        wiggleSeed: Math.random() * 100,
        life: 100,
        maxLife: 100,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.08,
        bubbles,
      });
    };

    // Pre-populate with beautiful particles to guarantee smooth visual entry
    for (let i = 0; i < 20; i++) {
      createParticleObj();
      const last = particles[particles.length - 1];
      if (last) {
        last.y = topInflowHeight + Math.random() * (membraneY - topInflowHeight - 20);
      }
    }

    const runSimulationStep = () => {
      tick++;
      // Clear with sub-pixel depth for fluid movement trails
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // --- LAYER 0: GLOWING BACKGROUND LIGHT PATHSING & COMPARTMENTS ---
      const activeCyan = type === "graphene" ? "rgba(34, 211, 238, 0.08)" : "rgba(14, 165, 233, 0.05)";
      
      // Draw inlet fluid current vectors (flowing gradient stripes behind the particles)
      const gradInflow = safeCreateLinearGradient(0, topInflowHeight, 0, membraneY);
      gradInflow.addColorStop(0, type === "graphene" ? "rgba(34, 211, 238, 0.15)" : "rgba(14, 165, 233, 0.1)");
      gradInflow.addColorStop(0.5, type === "graphene" ? "rgba(34, 211, 238, 0.04)" : "rgba(14, 165, 233, 0.02)");
      gradInflow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradInflow;
      ctx.fillRect(dimensions.width * 0.1, topInflowHeight, dimensions.width * 0.8, membraneY - topInflowHeight);

      // Draw active filtering container backing
      ctx.fillStyle = type === "graphene" ? "rgba(15, 23, 42, 0.6)" : "rgba(248, 250, 252, 0.7)";
      ctx.fillRect(dimensions.width * 0.05, topInflowHeight, dimensions.width * 0.9, dimensions.height - topInflowHeight - 15);

      // Draw background Graphene grid pattern (Hexagonal blueprint aura) for premium tech feel
      if (type === "graphene") {
        ctx.save();
        ctx.strokeStyle = "rgba(34, 211, 238, 0.03)";
        ctx.lineWidth = 1;
        const hexSize = 14;
        for (let y = topInflowHeight; y < membraneY; y += hexSize * 1.5) {
          for (let x = dimensions.width * 0.08; x < dimensions.width * 0.92; x += hexSize * Math.sqrt(3)) {
            ctx.beginPath();
            for (let angle = 0; angle < 6; angle++) {
              const currentAngle = (Math.PI / 3) * angle;
              const px = x + hexSize * Math.cos(currentAngle);
              const py = y + hexSize * Math.sin(currentAngle);
              if (angle === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
          }
        }
        ctx.restore();
      } else {
        // Draw physical spiral polymer RO layers
        ctx.save();
        ctx.strokeStyle = "rgba(148, 163, 184, 0.06)";
        ctx.lineWidth = 1.5;
        for (let y = topInflowHeight + 20; y < membraneY; y += 12) {
          ctx.beginPath();
          ctx.arc(dimensions.width / 2, y, dimensions.width * 0.35, Math.PI, 0);
          ctx.stroke();
        }
        ctx.restore();
      }

      // --- LAYER 1: MEMBRANE AND DUAL CHUTE STRUCTURE ---
      // Filtration barrier membrane line
      const membraneGrad = safeCreateLinearGradient(0, membraneY - 4, 0, membraneY + 4);
      membraneGrad.addColorStop(0, type === "graphene" ? "rgba(34, 211, 238, 0.8)" : "rgba(100, 116, 139, 0.7)");
      membraneGrad.addColorStop(0.5, type === "graphene" ? "#ffffff" : "#f1f5f9");
      membraneGrad.addColorStop(1, type === "graphene" ? "rgba(34, 211, 238, 0.8)" : "rgba(100, 116, 139, 0.7)");

      ctx.fillStyle = membraneGrad;
      ctx.fillRect(dimensions.width * 0.05, membraneY - 2, dimensions.width * 0.9, 4);

      // Graphene atom-sieve physical lattice circles mapping the mesh
      if (type === "graphene") {
        ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
        const sieveGaps = 8;
        for (let x = dimensions.width * 0.05; x <= dimensions.width * 0.95; x += sieveGaps) {
          ctx.beginPath();
          ctx.arc(x, membraneY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mid dividing glass screen separating pure reservoir and discarded channel
      ctx.strokeStyle = type === "graphene" ? "rgba(34, 211, 238, 0.2)" : "rgba(148, 163, 184, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, membraneY + 2);
      ctx.lineTo(splitX, dimensions.height - 10);
      ctx.stroke();

      // Show molecular sieve labels
      ctx.fillStyle = type === "graphene" ? "#22d3ee" : "#475569";
      ctx.font = "spaced bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        type === "graphene" ? "✨ ULTRA-PURE GRAPHENE LAYER (0.15nm)" : "⚙️ RO POLYMER FILTER CORRIDOR (1.0nm)",
        dimensions.width / 2,
        membraneY - 12
      );

      // --- LAYER 2: CREATE NEW RANDOM PARTICLES ---
      framesSinceLastSpawn++;
      if (framesSinceLastSpawn >= ticksBetweenSpawn) {
        const toSpawn = Math.floor(1 + Math.random() * (inputs.impurityDensity * 0.6 + 1));
        for (let s = 0; s < toSpawn; s++) {
          createParticleObj();
        }
        framesSinceLastSpawn = 0;
      }

      // --- LAYER 3: RIPPLING AND BUBBLES SIMULATION UTILS ---
      // Update & Draw water ripples from droplet splashdowns in pools
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 0.8;
        r.alpha -= 0.015;
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Update ambient micro buoyancy air bubbles in reservoirs
      if (Math.random() < 0.15) {
        // Spawn standard air bubble
        airBubbles.push({
          x: (dimensions.width * 0.08) + Math.random() * (dimensions.width * 0.84),
          y: dimensions.height - 15,
          vy: -(0.5 + Math.random() * 1.2),
          r: 1 + Math.random() * 3,
          alpha: 0.2 + Math.random() * 0.5,
        });
      }

      for (let i = airBubbles.length - 1; i >= 0; i--) {
        const ab = airBubbles[i];
        ab.y += ab.vy;
        ab.x += Math.sin((tick + ab.y) / 20) * 0.25;
        
        // Dissolve when hitting the air surface or membrane bounding boxes
        const poolSurfaceY = bottomOutletsY + 8;
        if (ab.y <= poolSurfaceY) {
          airBubbles.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = type === "graphene" ? "rgba(34, 211, 238, 0.4)" : "rgba(14, 165, 233, 0.3)";
        ctx.globalAlpha = ab.alpha;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(ab.x, ab.y, ab.r, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = type === "graphene" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(ab.x - ab.r*0.3, ab.y - ab.r*0.3, ab.r*0.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // --- LAYER 4: PHYSICS MOVEMENT & GRAPHIC RENDERING ---
      particles = particles.filter((p) => {
        const speedMultiplier = 0.5 + inputs.waterFlow * 0.15;

        // Apply distinct ambient behaviors depending on particle type and status
        if (p.status === "entering") {
          p.angle += p.angleSpeed;
          
          if (p.type === "bacteria") {
            // Bacteria "swim" / wiggle actively side to side
            p.x += Math.sin((tick + p.wiggleSeed) / 8) * 0.9;
            p.y += p.vy * 0.75; // swims slightly slower against gravity
          } else if (p.type === "heavy-metal") {
            // Heavy metals are dense and sink directly in straight, heavy paths
            p.x += Math.sin((tick + p.wiggleSeed) / 25) * 0.15;
            p.y += p.vy * 1.1; // sinks slightly faster due to molecular mass
          } else if (p.type === "suspended") {
            // Sand / Silt floats erratically and tumbles
            p.x += Math.sin((tick + p.wiggleSeed) / 15) * 0.45;
            p.y += p.vy * 0.85;
          } else {
            // Water and salt molecules move fluidly and swiftly
            p.x += Math.sin((tick + p.wiggleSeed) / 12) * 0.25;
            p.y += p.vy;
          }

          // Impact at the filter membrane line
          if (p.y >= membraneY - p.size / 2) {
            p.y = membraneY - p.size / 2;

            if (p.type === "water") {
              if (type === "ro") {
                // Traditional RO has HUGE water rejection rate (85% wasted!)
                // Let's make 85% of H2O molecules get diverted as wastewater on the right
                // to vividly show the water loss. Only 15% pass to the pure reservoir.
                if (Math.random() < 0.85) {
                  p.status = "waste";
                  p.vy = (0.7 + Math.random() * 0.7) * speedMultiplier;
                  p.vx = (1.2 + Math.random() * 1.5) * speedMultiplier; // high rightward sweeping velocity
                } else {
                  p.status = "passed";
                  p.vy = (0.4 + Math.random() * 0.3) * speedMultiplier; // RO pure trickle is extremely thin & slow
                  p.vx = (Math.random() - 0.5) * 0.2;
                }
              } else {
                // Graphene-assisted filter has nearly lossless water recovery (~95% passes)
                // Only 5% goes to the flush stream
                if (Math.random() < 0.05) {
                  p.status = "waste";
                  p.vy = (0.8 + Math.random() * 0.8) * speedMultiplier;
                  p.vx = (1.0 + Math.random() * 1.5) * speedMultiplier;
                } else {
                  p.status = "passed";
                  p.vy = (2.2 + Math.random() * 1.4) * speedMultiplier; // fast, high-flux clean torrent!
                  p.vx = (Math.random() - 0.5) * 0.4;
                }
              }

              // Spark ripple ring at membrane exit to represent sieving pressure
              if (Math.random() < 0.1) {
                ripples.push({
                  x: p.x,
                  y: membraneY + 2,
                  r: 1,
                  maxR: 12,
                  color: type === "graphene" ? "rgba(34, 211, 238, 0.6)" : "rgba(56, 189, 248, 0.4)",
                  alpha: 0.6
                });
              }
            } else {
              // Rejection profiles
              if (type === "graphene") {
                // Graphene carbon-grid acts as an absolute physical sieve (pore size 0.15nm)
                const actionChance = Math.random();
                if (actionChance < 0.85) {
                  // Trapped/Adsorbed directly in the graphene hexagonal matrix!
                  p.status = "captured";
                  p.life = 75; // visually locked in space grid
                  p.maxLife = 75;
                  p.vx = 0;
                  p.vy = 0;
                } else {
                  // Shouted into narrow waste line (flushed clean instantly)
                  p.status = "waste";
                  p.vy = (1.2 + Math.random() * 0.8) * speedMultiplier;
                  p.vx = (1.5 + Math.random() * 1.5) * speedMultiplier;
                }
              } else {
                // RO polymer membrane Core: relies on chemical rejection and has a clogging horizontal buildup
                if (p.type === "salt") {
                  // Soluble minerals / monovalent salts frequently leak in RO (15% to 25% leakage)
                  const saltLeak = 0.15 + (inputs.waterFlow / 35);
                  if (Math.random() < saltLeak) {
                    p.status = "passed"; // high visible salt bleed-through
                    p.vy = (0.7 + Math.random() * 0.7) * speedMultiplier;
                    p.vx = (Math.random() - 0.5) * 0.3;
                  } else {
                    p.status = "sliding"; // slides slow across the membrane
                    p.vx = (0.4 + Math.random() * 0.4) * speedMultiplier;
                    p.vy = 0;
                  }
                } else {
                  // Bacteria, heavy metals, suspended solids slide slowly and clog the membrane
                  p.status = "sliding";
                  p.vx = (0.2 + Math.random() * 0.3) * speedMultiplier; // slides extremely slow
                  p.vy = 0;
                }
              }
            }
          }
        } else if (p.status === "sliding") {
          // Slide along the membrane top-line towards the waste channel
          p.angle += p.angleSpeed * 0.5;
          p.y = membraneY - p.size / 2;
          p.x += p.vx;

          // Once it reaches the right waste chute boundary, let it drop down
          if (p.x >= dimensions.width * 0.72) {
            p.status = "waste";
            p.vy = (0.8 + Math.random() * 0.8) * speedMultiplier;
            p.vx = (0.4 + Math.random() * 0.6) * speedMultiplier;
          }
        } else if (p.status === "passed") {
          if (type === "graphene") {
            // Graphene has high-flux rapid torrent
            p.y += p.vy * 1.5;
            const targetX = dimensions.width * 0.25;
            p.x += (targetX - p.x) * 0.12 + p.vx * 1.2;
          } else {
            // RO has slow, sparse dripping trickles
            p.y += p.vy * 0.55;
            const targetX = dimensions.width * 0.25;
            // Let the drops sway slightly side-to-side to mimic gentle sporadic dripping
            p.x += (targetX - p.x) * 0.05 + Math.sin(tick * 0.05 + p.id) * 0.2;
          }

          if (p.y >= bottomOutletsY) {
            // High-quality drainage mechanic: fade out and continue moving down off-screen
            p.life -= type === "graphene" ? 5.5 : 2.5; 
            p.vy = (type === "graphene" ? 2.8 : 0.4) * speedMultiplier;
            p.vx = (Math.random() - 0.5) * (type === "graphene" ? 0.6 : 0.15);
            
            // Add subtle water splash ripples in left pool
            if (p.y < bottomOutletsY + 5 && Math.random() < (type === "graphene" ? 0.18 : 0.05)) {
              ripples.push({
                x: p.x,
                y: bottomOutletsY + 4,
                r: 1,
                maxR: type === "graphene" ? 18 : 8,
                color: type === "graphene" ? "rgba(34, 211, 238, 0.45)" : "rgba(14, 165, 233, 0.3)",
                alpha: type === "graphene" ? 0.5 : 0.25
              });
            }
          }
        } else if (p.status === "waste") {
          p.y += p.vy;
          // Target bottom right channel (Dirty wastewater chute)
          const targetX = dimensions.width * 0.75;
          p.x += (targetX - p.x) * 0.08 + p.vx;

          if (p.y >= bottomOutletsY) {
            // Drain off-screen immediately! Prevents messy piling up.
            p.life -= 4.5;
            p.vy = (0.8 + Math.random() * 0.8) * speedMultiplier;
            p.vx = (Math.random() - 0.5) * 0.4;

            // Spurt turbid brown splash ripples
            if (p.y < bottomOutletsY + 5 && Math.random() < 0.15) {
              ripples.push({
                x: p.x,
                y: bottomOutletsY + 4,
                r: 1,
                maxR: 12,
                color: type === "graphene" ? "rgba(245, 158, 11, 0.3)" : "rgba(180, 83, 9, 0.25)",
                alpha: 0.4
              });
            }
          }
        } else if (p.status === "captured") {
          p.life -= 1.8; // Fading on sieve Grid
        } else if (p.status === "trapped") {
          p.life -= 1.5; // Settled fallback decay
        }

        if (p.life <= 0) {
          return false;
        }

        // DRAW DESIGNER REALISTIC PARTICLE GRAPHICS
        ctx.save();
        
        // Decay overlay
        if (p.life < 30) {
          ctx.globalAlpha = p.life / 30;
        }

        // Draw micro aerated bubble halos
        p.bubbles.forEach((b) => {
          ctx.strokeStyle = "rgba(255,255,255,0.7)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x + b.dx, p.y + b.dy, b.size, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Detailed schematic rendering
        if (p.type === "water") {
          if (p.status === "passed" || (p.status === "trapped" && p.y < bottomOutletsY + 5)) {
            if (type === "graphene") {
              // Dense & rapid: draw a glowing rapid tail behind the water drop for motion streak
              const speedLen = p.vy * 4;
              const trailGrad = safeCreateLinearGradient(p.x, p.y, p.x, p.y - speedLen);
              trailGrad.addColorStop(0, "rgba(34, 211, 238, 0.85)");
              trailGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.4)");
              trailGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
              
              ctx.strokeStyle = trailGrad;
              ctx.lineWidth = p.size * 1.6;
              ctx.lineCap = "round";
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x, p.y - speedLen);
              ctx.stroke();

              // Also draw water particle at the head of the trail
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0; // reset
            } else {
              // Sparse & slow: stretch the droplet slightly vertically like a slow falling organic drip teardrop
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 2;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y - p.size * 1.2);
              ctx.quadraticCurveTo(p.x + p.size * 1.1, p.y, p.x, p.y + p.size * 1.7);
              ctx.quadraticCurveTo(p.x - p.size * 1.1, p.y, p.x, p.y - p.size * 1.2);
              ctx.closePath();
              ctx.fill();
              ctx.shadowBlur = 0; // reset

              // Add a glassy reflection highlight
              ctx.fillStyle = "rgba(255,255,255,0.85)";
              ctx.beginPath();
              ctx.arc(p.x - p.size * 0.25, p.y - p.size * 0.15, p.size * 0.3, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Glassy drop/sphere representation (oxygen sphere + two hydrogen nubs for organic visual delight!)
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = type === "graphene" ? 5 : 2;

            // Oxygen center
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // 2 Hydrogen ears!
            const hOffset = p.size * 0.8;
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            // Nub 1
            ctx.beginPath();
            ctx.arc(p.x - hOffset * Math.cos(p.angle), p.y - hOffset * Math.sin(p.angle), p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            // Nub 2
            ctx.beginPath();
            ctx.arc(p.x + hOffset * Math.cos(p.angle + 0.5), p.y - hOffset * Math.sin(p.angle + 0.5), p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Shiny reflection dot
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }
        } 
        else if (p.type === "bacteria") {
          // Living pathogen: beautiful rounded capsules with organic flagella tail-wiggles
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          // Draw the main capsule cell body
          const capHalf = p.size * 1.4;
          const capWidth = p.size * 0.65;
          const bacteriaGrad = safeCreateLinearGradient(-capHalf, 0, capHalf, 0);
          bacteriaGrad.addColorStop(0, p.color);
          bacteriaGrad.addColorStop(0.5, "#d1fae5"); // glassy inner body highlight
          bacteriaGrad.addColorStop(1, p.color);
          
          ctx.fillStyle = bacteriaGrad;
          ctx.beginPath();
          ctx.ellipse(0, 0, capHalf, capWidth, 0, 0, Math.PI * 2);
          ctx.fill();

          // Outer toxic cell wall border
          ctx.strokeStyle = "rgba(4, 120, 87, 0.6)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Dynamic wiggling flagella (cilia tails)
          if (p.status === "entering") {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.8;
            
            // Draw 3 dynamic waving tails
            for (let t = 0; t < 3; t++) {
              ctx.beginPath();
              ctx.moveTo(-capHalf, -3 + t * 3);
              const driftY = Math.sin((tick + p.wiggleSeed) / 6 + t) * 4;
              ctx.quadraticCurveTo(
                -capHalf - p.size, 
                -3 + t * 3 + driftY * 0.5, 
                -capHalf - p.size * 2, 
                -3 + t * 3 + driftY
              );
              ctx.stroke();
            }
          }
        } 
        else if (p.type === "heavy-metal") {
          // Dense high-hazard ionic pollutant (Hexagonal molecular block with neon danger warning ring)
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          
          // Heavy charge shielding warning ring
          ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]); // restore continuous path

          // Faceted metal core
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const sides = 6;
          for (let s = 0; s < sides; s++) {
            const rot = (Math.PI / 3) * s;
            const px = p.size * Math.cos(rot);
            const py = p.size * Math.sin(rot);
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();

          // Specular sharp edges
          ctx.strokeStyle = "#fee2e2";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-p.size * 0.5, -p.size * 0.5);
          ctx.lineTo(0, 0);
          ctx.lineTo(p.size * 0.5, p.size * 0.5);
          ctx.stroke();

          // Tiny ion sign Pb2+/Hg2+
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 5px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Alternate text symbols
          ctx.fillText("M²⁺", 0, 0.5);
        } 
        else if (p.type === "salt") {
          // Polarized salt crystals (Cubic transparent dice with sparkling shine)
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 3;
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);

          // Translucent crystalline glass facets
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.beginPath();
          ctx.moveTo(-p.size, -p.size);
          ctx.lineTo(0, -p.size);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size, p.size);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-p.size, -p.size, p.size * 2, p.size * 2);
        } 
        else if (p.type === "suspended") {
          // Rough rust/clay suspended debris chunks (Irregular asymmetric geometric shards)
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          const rSize = p.size;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(-rSize * 0.6, -rSize * 0.4);
          ctx.lineTo(rSize * 0.4, -rSize * 0.8);
          ctx.lineTo(rSize * 0.7, rSize * 0.3);
          ctx.lineTo(-rSize * 0.3, rSize * 0.8);
          ctx.lineTo(-rSize * 0.8, rSize * 0.1);
          ctx.closePath();
          ctx.fill();

          // Sand/Debris textured speckles
          ctx.fillStyle = "rgba(120, 53, 4, 0.6)";
          ctx.beginPath();
          ctx.arc(-rSize * 0.2, -rSize * 0.2, 0.8, 0, Math.PI * 2);
          ctx.arc(rSize * 0.2, rSize * 0.2, 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw dynamic atomized energy dissipation rings for Graphene captures
        if (p.status === "captured") {
          ctx.strokeStyle = "rgba(34, 211, 238, " + (p.life / p.maxLife) + ")";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const ringRad = p.size * (1 + (1 - p.life / p.maxLife) * 1.8);
          ctx.arc(0, 0, ringRad, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
        return true;
      });

      // --- LAYER 5: FOREGROUND LIQUID FLUID WAVE OVERLAYS ---
      // Left (Pure Reservoir Wave)
      ctx.fillStyle = type === "graphene" ? "rgba(34, 211, 238, 0.15)" : "rgba(14, 165, 233, 0.12)";
      ctx.beginPath();
      ctx.moveTo(0, dimensions.height);
      ctx.lineTo(0, bottomOutletsY + 8);
      for (let x = 0; x <= splitX; x += 10) {
        const waveY = bottomOutletsY + 10 + Math.sin((tick + x) / 14) * 2.5;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(splitX, dimensions.height);
      ctx.fill();

      // Right (Wastewater Wave)
      ctx.fillStyle = type === "graphene" ? "rgba(245, 158, 11, 0.18)" : "rgba(180, 83, 9, 0.13)";
      ctx.beginPath();
      ctx.moveTo(splitX, dimensions.height);
      ctx.lineTo(splitX, bottomOutletsY + 8);
      for (let x = splitX; x <= dimensions.width; x += 10) {
        const waveY = bottomOutletsY + 10 + Math.sin((tick + x * 0.6) / 10) * 1.8;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(dimensions.width, dimensions.height);
      ctx.fill();

      animationFrameId = requestAnimationFrame(runSimulationStep);
    };

    runSimulationStep();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, type, inputs]);

  // Handle particle hover tracking to display beautiful microscopic info cards (educational value!)
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Standard detection Y limits
    const membraneY = dimensions.height * 0.45;
    if (clickY < membraneY - 20) {
      if (inputs.contamination > 300 && clickX > dimensions.width * 0.4) {
        setHoveredParticle("Heavy Metal (Pb²⁺/Hg²⁺) - Locked on core");
      } else if (inputs.saltContent > 200) {
        setHoveredParticle("Dissolved Solids (NaCl) - Dynamic electrical polarization");
      } else {
        setHoveredParticle("H2O - Fluid Hydrogen Spheroid");
      }
    } else if (clickY >= membraneY && clickX < dimensions.width * 0.5) {
      setHoveredParticle("Sieved Water Flow - >99.9% pristine H2O");
    } else {
      setHoveredParticle("Rejected concentrate - Diverted safely to waste");
    }
  };

  const handleMouseLeave = () => {
    setHoveredParticle(null);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-88 rounded-2xl overflow-hidden border transition-all duration-300 ${
        type === "graphene" 
          ? "bg-slate-950 border-cyan-500/40 shadow-[0_4px_25px_rgba(34,211,238,0.15)]"
          : "bg-slate-50/50 border-slate-200/80 shadow-md"
      }`}
    >
      {/* Decorative Blueprint Technical Labels */}
      <div className="absolute top-2.5 left-4 pointer-events-none select-none z-10">
        <span className={`text-[8px] font-mono font-bold tracking-widest ${
          type === "graphene" ? "text-cyan-400" : "text-slate-500"
        }`}>
          {type === "graphene" ? "ACTIVE SIEVE RADAR" : "RO BARRIER CORRIDOR"}
        </span>
      </div>

      <div className="absolute top-2.5 right-4 pointer-events-none select-none z-10 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${
          type === "graphene" ? "bg-cyan-400 animate-ping" : "bg-blue-500 animate-pulse"
        }`} />
        <span className="text-[7px] font-mono font-black text-slate-400">
          {inputs.waterFlow * 10} L/H FLOW
        </span>
      </div>

      <canvas 
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="block w-full h-full cursor-crosshair"
      />
      
      {/* Laser Scanning Line Overlay for Graphene System */}
      {type === "graphene" && (
        <div 
          className="absolute inset-x-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)] pointer-events-none" 
          style={{ 
            top: '45%',
            animation: 'pulse 2s infinite ease-in-out'
          }} 
        />
      )}

      {/* Micropore tooltip overlay */}
      {hoveredParticle && (
        <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur-md text-[8px] tracking-wide font-mono text-cyan-300 border border-cyan-500/30 px-2.5 py-1.5 rounded-md flex justify-between items-center pointer-events-none animate-fade-in">
          <span>🔬 MICROSCOPIC PROFILER:</span>
          <span className="text-white font-bold">{hoveredParticle}</span>
        </div>
      )}
    </div>
  );
}
