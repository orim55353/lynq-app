/**
 * Gradient presets for LinearGradient components.
 * All values aligned with DESIGN_SYSTEM.md "Kinetic Fluidity Framework".
 * Typed as mutable tuples to satisfy expo-linear-gradient's colors prop.
 */

/** Screen background gradient — subtle depth, not flat */
export const screenGradient: [string, string] = ["#0B1220", "#111827"];

/** Auth screen background — warm, inviting */
export const authGradient: [string, string, string] = ["#0B1220", "#0F1D2E", "#111827"];

/** Auth screen background — light mode */
export const authGradientLight: [string, string, string] = ["#F5FAFC", "#EFF4F7", "#E8EDF0"];

/** Card scrim — ensures text legibility on image backgrounds */
export const cardScrim: [string, string, string] = [
  "rgba(11, 18, 32, 0.1)",
  "rgba(11, 18, 32, 0.55)",
  "rgba(11, 18, 32, 0.88)",
];

/** Top fade for story header / status bar area */
export const topFade: [string, string, string] = [
  "rgba(11, 18, 32, 0.95)",
  "rgba(11, 18, 32, 0.6)",
  "transparent",
];

/** Bottom fade for tab bar area */
export const bottomFade: [string, string, string] = [
  "transparent",
  "rgba(11, 18, 32, 0.6)",
  "rgba(11, 18, 32, 0.95)",
];

/**
 * Primary CTA gradient — NEVER use flat color for primary CTAs.
 * primary (#00687A) → primary-container (#06B6D4) at 135deg.
 */
export const accentGradient: [string, string] = ["#00687A", "#06B6D4"];

/** Warm gradient — secondary accents, logo "q" element */
export const warmGradient: [string, string] = ["#FB923C", "#F97316"];

/** Spotlight — subtle accent glow from top of card */
export const spotlightGradient: [string, string, string] = [
  "rgba(6, 182, 212, 0.12)",
  "rgba(6, 182, 212, 0.04)",
  "transparent",
];
