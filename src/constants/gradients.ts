/**
 * Gradient presets for LinearGradient components.
 * All gradients are designed to work on dark surfaces.
 * Typed as mutable tuples to satisfy expo-linear-gradient's colors prop.
 */

/** Screen background gradient — subtle depth, not flat */
export const screenGradient: [string, string] = ["#0B1220", "#111827"];

/** Auth screen background — warm, inviting */
export const authGradient: [string, string, string] = ["#0B1220", "#0F1D2E", "#111827"];

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

/** Accent gradient — primary CTA buttons */
export const accentGradient: [string, string] = ["#00E5FF", "#0891B2"];

/** Warm gradient — secondary actions, highlights */
export const warmGradient: [string, string] = ["#FB923C", "#F97316"];

/** Spotlight — subtle white glow from top of card */
export const spotlightGradient: [string, string, string] = [
  "rgba(0, 229, 255, 0.12)",
  "rgba(0, 229, 255, 0.04)",
  "transparent",
];
