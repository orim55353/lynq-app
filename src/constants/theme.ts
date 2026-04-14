import { Platform, type TextStyle, type ViewStyle } from "react-native";

// ─── Color System ───────────────────────────────────────────────────────────
// Aligned with DESIGN_SYSTEM.md "Kinetic Fluidity Framework".
// Dark mode is default; light mode for secondary contexts.
// All values sourced from ../DESIGN_SYSTEM.md — the single source of truth.

export type ThemeMode = "dark" | "light";

/** Dark theme — default for mobile app. */
const dark = {
  // Surfaces (deepest → lightest) — dark equivalents of design system surface hierarchy
  bg: "#0B1220",           // surface (dark base)
  bgElevated: "#111827",   // surface-container-low (dark)
  bgCard: "#1A2332",       // surface-container-lowest equivalent (dark cards)
  bgCardHover: "#1F2D3D",  // surface-container-high (dark)
  bgSubtle: "#243042",     // surface-container (dark inputs/wells)

  // Text — NEVER use 100% black (#000000)
  text: "#F1F5F9",         // on-surface (dark mode)
  textSecondary: "#94A3B8", // on-surface-variant (dark mode)
  textTertiary: "#64748B", // placeholder/outline
  textInverse: "#171D1E",  // on-primary — uses design system on-surface value

  // Brand — Kinetic Fluidity Framework primaries
  primary: "#00687A",      // primary — deep brand
  accent: "#06B6D4",       // primary-container — Electric Cyan (CTAs, brand highlights)
  accentSoft: "rgba(6, 182, 212, 0.15)",
  accentGlow: "rgba(6, 182, 212, 0.20)", // accent glow: 20% opacity per design system
  accentHover: "#0E7490",  // tertiary — deep teal

  // Secondary accent — Vibrant Tangerine
  warm: "#FD933D",         // secondary-container
  warmSoft: "rgba(253, 147, 61, 0.12)",

  // Borders — "No-Line" rule: ghost borders at 15% opacity, no solid 1px borders
  border: "rgba(255, 255, 255, 0.15)",   // ghost border (outline-variant at 15%)
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderAccent: "rgba(6, 182, 212, 0.25)",

  // Status — design system values
  success: "#14B8A6",
  successSoft: "rgba(20, 184, 166, 0.12)",
  warning: "#F59E0B",
  warningSoft: "rgba(245, 158, 11, 0.12)",
  danger: "#EF4444",
  dangerSoft: "rgba(239, 68, 68, 0.12)",
  info: "#3B82F6",
  infoSoft: "rgba(59, 130, 246, 0.12)",

  // Glass morphism — surface at 70-85% opacity + backdrop-blur 20-40px
  glass: "rgba(11, 18, 32, 0.75)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassHeavy: "rgba(11, 18, 32, 0.85)",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.6)",
  overlayHeavy: "rgba(0, 0, 0, 0.8)",

  // Chart palette — design system values
  chart1: "#3B82F6",
  chart2: "#14B8A6",
  chart3: "#F59E0B",
  chart4: "#8B5CF6",
  chart5: "#EF4444",
} as const;

/** Light theme — design system surface hierarchy values. */
const light = {
  // Surfaces — design system surface hierarchy (exact values from DESIGN_SYSTEM.md)
  bg: "#F5FAFC",           // surface
  bgElevated: "#EFF4F7",   // surface-container-low
  bgCard: "#FFFFFF",       // surface-container-lowest (high-impact cards)
  bgCardHover: "#E0E5E8",  // surface-container-high
  bgSubtle: "#E8EDF0",     // surface-container

  // Text — design system text colors
  text: "#171D1E",         // on-surface — NEVER use 100% black
  textSecondary: "#3D494C", // on-surface-variant
  textTertiary: "#A8A29E", // placeholder
  textInverse: "#FFFFFF",  // on-primary

  // Brand — same primaries across both themes
  primary: "#00687A",      // primary — deep brand
  accent: "#06B6D4",       // primary-container — Electric Cyan
  accentSoft: "rgba(6, 182, 212, 0.08)",
  accentGlow: "rgba(6, 182, 212, 0.20)",
  accentHover: "#0E7490",  // tertiary

  // Secondary accent — Vibrant Tangerine
  warm: "#FD933D",         // secondary-container
  warmSoft: "rgba(253, 147, 61, 0.08)",

  // Borders — ghost borders with on-surface at 15% opacity
  border: "rgba(23, 29, 30, 0.15)",
  borderSubtle: "rgba(0, 0, 0, 0.04)",
  borderAccent: "rgba(6, 182, 212, 0.20)",

  // Status — same across themes
  success: "#14B8A6",
  successSoft: "rgba(20, 184, 166, 0.08)",
  warning: "#F59E0B",
  warningSoft: "rgba(245, 158, 11, 0.08)",
  danger: "#EF4444",
  dangerSoft: "rgba(239, 68, 68, 0.08)",
  info: "#3B82F6",
  infoSoft: "rgba(59, 130, 246, 0.08)",

  // Glass morphism — surface at 70-85% opacity
  glass: "rgba(245, 250, 252, 0.75)",
  glassBorder: "rgba(23, 29, 30, 0.15)",
  glassHeavy: "rgba(245, 250, 252, 0.85)",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.4)",
  overlayHeavy: "rgba(0, 0, 0, 0.6)",

  // Chart palette — design system values
  chart1: "#3B82F6",
  chart2: "#14B8A6",
  chart3: "#F59E0B",
  chart4: "#8B5CF6",
  chart5: "#EF4444",
} as const;

export type ThemeColors = {
  [K in keyof typeof dark]: string;
};
export const themes = { dark, light } as const;

/**
 * Default theme. Screens import `colors` for the default dark palette.
 * Use `themes.light` explicitly for light-mode contexts (auth screens, etc.).
 */
export const colors = dark;

// ─── Job Card Colors ────────────────────────────────────────────────────────
// Light and dark variants for the glass card overlay on the Discover feed.

export const cardColors = {
  light: {
    bg: "rgba(255, 255, 255, 0.55)",
    text: "#171D1E",
    textSecondary: "#3D494C",
    textMuted: "#52525B",
    accent: "#06B6D4",
    accentText: "#00687A",
    infoBg: "rgba(255, 255, 255, 0.6)",
    infoBorder: "rgba(255, 255, 255, 0.4)",
    infoDivider: "rgba(0, 0, 0, 0.1)",
    pillBg: "rgba(255, 255, 255, 0.5)",
    pillBorder: "rgba(255, 255, 255, 0.4)",
    pillText: "#171D1E",
    matchBg: "rgba(255, 255, 255, 0.7)",
    logoBg: "rgba(255, 255, 255, 0.9)",
    bookmarkBg: "rgba(255, 255, 255, 0.6)",
    bookmarkBorder: "rgba(0, 0, 0, 0.1)",
    bookmarkIcon: "#3F3F46",
    applyText: "#FFFFFF",
    hintText: "#3D494C",
  },
  dark: {
    bg: "rgba(11, 18, 32, 0.7)",
    text: "#F1F5F9",
    textSecondary: "#CBD5E1",
    textMuted: "#94A3B8",
    accent: "#06B6D4",
    accentText: "#22D3EE",
    infoBg: "rgba(255, 255, 255, 0.08)",
    infoBorder: "rgba(255, 255, 255, 0.1)",
    infoDivider: "rgba(255, 255, 255, 0.1)",
    pillBg: "rgba(255, 255, 255, 0.08)",
    pillBorder: "rgba(255, 255, 255, 0.12)",
    pillText: "#E2E8F0",
    matchBg: "rgba(255, 255, 255, 0.1)",
    logoBg: "rgba(255, 255, 255, 0.95)",
    bookmarkBg: "rgba(255, 255, 255, 0.1)",
    bookmarkBorder: "rgba(255, 255, 255, 0.15)",
    bookmarkIcon: "#CBD5E1",
    applyText: "#FFFFFF",
    hintText: "#94A3B8",
  },
} as const;

export type CardColorScheme = {
  [K in keyof typeof cardColors.light]: string;
};

// ─── Job Card Gradient Presets ──────────────────────────────────────────────
// From DESIGN_SYSTEM.md "Job Card Gradients (Mobile-Specific)"

export const jobGradients = {
  electric:   ["#00E5FF", "#0891B2"] as [string, string],
  sunset:     ["#FB923C", "#EF4444"] as [string, string],
  aurora:     ["#2DD4BF", "#3B82F6"] as [string, string],
  neon:       ["#A78BFA", "#EC4899"] as [string, string],
  midnight:   ["#1E293B", "#0F172A"] as [string, string],
  ember:      ["#F59E0B", "#DC2626"] as [string, string],
  ocean:      ["#06B6D4", "#6366F1"] as [string, string],
  forest:     ["#22C55E", "#14B8A6"] as [string, string],
} as const;

// ─── Spacing ────────────────────────────────────────────────────────────────
// 4px base unit per design system. Generous, editorial spacing.

export const spacing = {
  xxs: 2,
  xs: 4,     // spacing-1
  sm: 8,     // spacing-2
  md: 12,    // spacing-3
  lg: 16,    // spacing-4
  xl: 20,    // spacing-5
  xxl: 24,   // spacing-6
  xxxl: 32,  // spacing-8
  huge: 48,  // spacing-12
} as const;

export const horizontalPaddingBounds = { min: 20, max: 28 } as const;

// ─── Border Radius ──────────────────────────────────────────────────────────
// Design system: minimum 16px. Sharp corners (0px, 4px) are prohibited.
// Only three tiers: ROUND_SIXTEEN, ROUND_TWENTY_FOUR, pill.

export const radius = {
  xs: 16,    // ROUND_SIXTEEN — minimum radius per design system
  sm: 16,    // ROUND_SIXTEEN — buttons, small elements, inputs
  md: 16,    // ROUND_SIXTEEN — nested card content
  lg: 24,    // ROUND_TWENTY_FOUR — cards, containers, modals
  xl: 24,    // ROUND_TWENTY_FOUR
  xxl: 24,   // ROUND_TWENTY_FOUR
  pill: 999, // Full-round pills, badges
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────
// Plus Jakarta Sans (loaded via expo-font).
// Weights and letter-spacing from DESIGN_SYSTEM.md type scale.

export const typography = {
  /** Screen titles, hero text — display-lg equivalent (mobile-scaled) */
  displayLarge: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -1.1,  // -0.03em at 38px
  },
  /** Card titles, salary — display-md equivalent (mobile-scaled) */
  displayMedium: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -0.6,  // -0.02em at 28px
  },
  /** Section headers — headline-lg equivalent */
  heading: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600" as TextStyle["fontWeight"],
    letterSpacing: -0.4,  // -0.02em at 22px
  },
  /** Subheadings, company names — headline-md equivalent */
  subheading: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "600" as TextStyle["fontWeight"],
    letterSpacing: -0.3,  // -0.02em at 17px
  },
  /** Body text, descriptions — body-lg equivalent. Line-height 1.6 for approachability */
  body: {
    fontSize: 15,
    lineHeight: 24,       // 1.6 ratio per design system
    fontWeight: "400" as TextStyle["fontWeight"],
    letterSpacing: 0,
  },
  /** Smaller body, secondary info — body-md equivalent */
  bodySmall: {
    fontSize: 13,
    lineHeight: 21,       // ~1.6 ratio
    fontWeight: "400" as TextStyle["fontWeight"],
    letterSpacing: 0,
  },
  /** Button text, prominent labels — label-lg equivalent */
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600" as TextStyle["fontWeight"],
    letterSpacing: 0.16,  // 0.01em at 16px
  },
  /** Pills, badges, labels — label-md equivalent */
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as TextStyle["fontWeight"],
    letterSpacing: 0.24,  // 0.02em at 12px
  },
  /** Tiny text, timestamps, captions — label-sm equivalent */
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "500" as TextStyle["fontWeight"],
    letterSpacing: 0.22,  // 0.02em at 11px
  },
  /** Large CTA (Apply Now) */
  buttonLarge: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -0.2,
  },
  /** Tab bar labels */
  tab: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "600" as TextStyle["fontWeight"],
    letterSpacing: 0.5,
  },
} as const;

// ─── Shadows ────────────────────────────────────────────────────────────────
// Design system: tonal layering for depth, NOT traditional shadows.
// Ambient shadows only for floating elements (modals, FABs, tooltips).
// Shadow color: on-surface (#171D1E) — NEVER pure black.

export const shadows = {
  /** Ambient shadow — floating elements only (Y:16, blur:32, 6% opacity) */
  soft: {
    shadowColor: "#171D1E",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 4,
  } as ViewStyle,
  /** Medium elevation — modals, floating elements */
  medium: {
    shadowColor: "#171D1E",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 8,
  } as ViewStyle,
  /** Heavy elevation — bottom tab bar */
  heavy: {
    shadowColor: "#171D1E",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 12,
  } as ViewStyle,
  /** Accent glow — primary CTA buttons and active highlights */
  glow: {
    shadowColor: "#06B6D4",
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 16,
    elevation: 6,
  } as ViewStyle,
  /** Warm glow — secondary accent elements */
  warmGlow: {
    shadowColor: "#FD933D",
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 4,
  } as ViewStyle,
} as const;

// ─── Responsive Font Scaling ────────────────────────────────────────────────

export const REFERENCE_WIDTH = 390;

export function getFontScale(width: number, refWidth: number = REFERENCE_WIDTH): number {
  const scale = width / refWidth;
  return Math.min(Math.max(scale, 0.85), 1.25);
}

// ─── Animation Constants ────────────────────────────────────────────────────
// Keep durations short: 150-300ms for micro-interactions.
// Use spring physics for React Native interactions.

export const animation = {
  /** Quick micro-interaction (button press, pill tap) — 150ms */
  quick: { duration: 150 },
  /** Standard transition (card expand, modal enter) — 250ms */
  standard: { duration: 250 },
  /** Dramatic entrance (screen transition, reveal) — 300ms */
  dramatic: { duration: 300 },
  /** Spring physics for bouncy interactions */
  spring: {
    tension: 300,
    friction: 20,
    useNativeDriver: true,
  },
  /** Gentle spring (tab switch, card settle) */
  springGentle: {
    tension: 200,
    friction: 26,
    useNativeDriver: true,
  },
} as const;
