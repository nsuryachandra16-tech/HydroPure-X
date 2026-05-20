/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SimulationInputs {
  contamination: number; // 50 to 800 PPM equivalent
  saltContent: number; // 20 to 500 PPM equivalent
  waterFlow: number; // Liters per hour / relative speed (1 to 10)
  impurityDensity: number; // Visual particle count / density factor (1 to 5)
}

export interface ImpurityType {
  id: string;
  name: string;
  chemicalFormula?: string;
  size: string; // e.g. "0.1 nm", "1 micron"
  dangerLevel: "Low" | "Moderate" | "High";
  description: string;
  color: string; // Tailwind color class for particles
  particleSvg: string; // custom representation
}

export interface PPMLevel {
  min: number;
  max: number;
  label: string;
  status: "Excellent" | "Good" | "Moderate" | "Poor" | "Highly Contaminated";
  color: string;
  bgColor: string;
  borderColor: string;
  details: string;
}
