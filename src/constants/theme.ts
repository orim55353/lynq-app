import { Platform, type TextStyle, type ViewStyle } from "react-native";

// ─── Color System ───────────────────────────────────────────────────────────
// Unified with Lynq backoffice (cyan accent on dark surfaces) and landing page
// (warm neutrals). Dark mode is default; light mode for secondary contexts.

export type ThemeMode = "dark" | "light";

/** Dark theme — default. Matches backoffice dark mode palette. */
const dark = {
  // Surfaces (deepest → lightest)
  bg: "#0B1220",           // Deepest background (matches backoffice --frame dark)
  bgElevated: "#111827",   // Elevated surface (matches backoffice --background dark)
  bgCard: "#1A2332",       // Card surfaces
  bgCardHover: "#1F2D3D",  // Card hover/pressed
  bgSubtle: "#243042",     // Subtle contrast surface (inputs, wells)

  // Text
  text: "#F1F5F9",         // Primary text
  textSecondary: "#94A3B8", // Secondary text (matches backoffice --muted-foreground dark)
  textTertiary: "#64748B", // Tertiary/placeholder
  textInverse: "#0B1220",  // Text on accent/light backgrounds

  // Lynq Accent — Electric Cyan (matches backoffice #2dd4ff dark / landing #0891b2)
  accent: "#00E5FF",       // Primary accent (matches backoffice --lynq-accent light)
  accentSoft: "rgba(0, 229, 255, 0.15)", // Muted accent background
  accentGlow: "rgba(0, 229, 255, 0.35)", // Glow/shadow color
  accentHover: "#00CCE5",  // Pressed state

  // Secondary accent — Warm amber (from landing page orange #fb923c)
  warm: "#FB923C",         // Secondary warm accent
  warmSoft: "rgba(251, 146, 60, 0.12)",

  // Borders & Separators
  border: "#1E293B",       // Default border (matches backoffice dark)
  borderSubtle: "rgba(255, 255, 255, 0.06)", // Very subtle separator
  borderAccent: "rgba(0, 229, 255, 0.25)", // Accent-tinted border

  // Status
  success: "#2DD4BF",      // Matches backoffice dark
  successSoft: "rgba(45, 212, 191, 0.12)",
  warning: "#FBBF24",
  warningSoft: "rgba(251, 191, 36, 0.12)",
  danger: "#F87171",
  dangerSoft: "rgba(248, 113, 113, 0.12)",
  info: "#60A5FA",
  infoSoft: "rgba(96, 165, 250, 0.12)",

  // Glass morphism
  glass: "rgba(255, 255, 255, 0.06)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  glassHeavy: "rgba(255, 255, 255, 0.12)",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.6)",
  overlayHeavy: "rgba(0, 0, 0, 0.8)",

  // Chart palette (matches backoffice dark)
  chart1: "#60A5FA",
  chart2: "#2DD4BF",
  chart3: "#FBBF24",
  chart4: "#A78BFA",
  chart5: "#F87171",
} as const;

/** Light theme — for auth screens and specific contexts. */
const light = {
  bg: "#FAFAF9",           // Warm stone (from landing page)
  bgElevated: "#FFFFFF",
  bgCard: "#FFFFFF",
  bgCardHover: "#F5F5F4",
  bgSubtle: "#F1F0EE",

  text: "#1C1917",         // Warm dark (from landing page --text)
  textSecondary: "#57534E", // From landing page --text-muted
  textTertiary: "#A8A29E",
  textInverse: "#FFFFFF",

  accent: "#0891B2",       // Landing page accent — slightly deeper for light bg legibility
  accentSoft: "rgba(8, 145, 178, 0.08)",
  accentGlow: "rgba(8, 145, 178, 0.2)",
  accentHover: "#0E7490",

  warm: "#F97316",
  warmSoft: "rgba(249, 115, 22, 0.08)",

  border: "#E7E5E4",       // From landing page
  borderSubtle: "rgba(0, 0, 0, 0.04)",
  borderAccent: "rgba(8, 145, 178, 0.2)",

  success: "#14B8A6",
  successSoft: "rgba(20, 184, 166, 0.08)",
  warning: "#F59E0B",
  warningSoft: "rgba(245, 158, 11, 0.08)",
  danger: "#EF4444",
  dangerSoft: "rgba(239, 68, 68, 0.08)",
  info: "#3B82F6",
  infoSoft: "rgba(59, 130, 246, 0.08)",

  glass: "rgba(255, 255, 255, 0.7)",
  glassBorder: "rgba(0, 0, 0, 0.06)",
  glassHeavy: "rgba(255, 255, 255, 0.85)",

  overlay: "rgba(0, 0, 0, 0.4)",
  overlayHeavy: "rgba(0, 0, 0, 0.6)",

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
    text: "#1C1917",
    textSecondary: "#57534E",
    textMuted: "#78716C",
    accent: "#0891B2",
    accentText: "#0891B2",
    infoBg: "rgba(255, 255, 255, 0.6)",
    infoBorder: "rgba(255, 255, 255, 0.4)",
    infoDivider: "rgba(0, 0, 0, 0.1)",
    pillBg: "rgba(255, 255, 255, 0.5)",
    pillBorder: "rgba(255, 255, 255, 0.4)",
    pillText: "#1C1917",
    matchBg: "rgba(255, 255, 255, 0.7)",
    logoBg: "rgba(255, 255, 255, 0.9)",
    bookmarkBg: "rgba(255, 255, 255, 0.6)",
    bookmarkBorder: "rgba(0, 0, 0, 0.1)",
    bookmarkIcon: "#3F3F46",
    applyText: "#0B1220",
    hintText: "#57534E",
  },
  dark: {
    bg: "rgba(11, 18, 32, 0.7)",
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accent: "#00E5FF",
    accentText: "#00E5FF",
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
    applyText: "#0B1220",
    hintText: "#94A3B8",
  },
} as const;

export type CardColorScheme = {
  [K in keyof typeof cardColors.light]: string;
};

// ─── Job Card Gradient Presets ──────────────────────────────────────────────
// Richer, deeper gradients that pop on dark surfaces.
// Each job can override with its own `gradient` field.

export const jobGradients = {
  electric:   ["#00E5FF", "#0891B2"] as [string, string],  // Lynq brand
  sunset:     ["#FB923C", "#EF4444"] as [string, string],  // Warm/urgent
  aurora:     ["#2DD4BF", "#3B82F6"] as [string, string],  // Cool/trust
  neon:       ["#A78BFA", "#EC4899"] as [string, string],  // Creative/design
  midnight:   ["#1E293B", "#0F172A"] as [string, string],  // Corporate/serious
  ember:      ["#F59E0B", "#DC2626"] as [string, string],  // Bold/action
  ocean:      ["#06B6D4", "#6366F1"] as [string, string],  // Tech/innovation
  forest:     ["#22C55E", "#14B8A6"] as [string, string],  // Growth/finance
} as const;

// ─── Spacing ────────────────────────────────────────────────────────────────

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const horizontalPaddingBounds = { min: 20, max: 28 } as const;

// ─── Border Radius ──────────────────────────────────────────────────────────

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  pill: 999,
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────
// System fonts — SF Pro on iOS is excellent for Gen Z bold aesthetics.
// Weight mapping matches both platforms.

export const typography = {
  /** Screen titles, hero text — maximum impact */
  displayLarge: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900" as TextStyle["fontWeight"],
    letterSpacing: -1.5,
  },
  /** Card titles, salary — commanding presence */
  displayMedium: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800" as TextStyle["fontWeight"],
    letterSpacing: -1,
  },
  /** Section headers — confident but not shouting */
  heading: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -0.5,
  },
  /** Subheadings, company names */
  subheading: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -0.3,
  },
  /** Body text, descriptions */
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as TextStyle["fontWeight"],
    letterSpacing: 0,
  },
  /** Smaller body, secondary info */
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400" as TextStyle["fontWeight"],
    letterSpacing: 0,
  },
  /** Pills, badges, labels — tight and punchy */
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600" as TextStyle["fontWeight"],
    letterSpacing: 0.2,
  },
  /** Tiny text, timestamps, captions */
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "500" as TextStyle["fontWeight"],
    letterSpacing: 0.3,
  },
  /** CTA buttons — bold and clear */
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -0.2,
  },
  /** Large CTA (Apply Now) */
  buttonLarge: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "800" as TextStyle["fontWeight"],
    letterSpacing: -0.3,
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

export const shadows = {
  /** Subtle card shadow */
  soft: {
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  } as ViewStyle,
  /** Medium elevation — modals, floating elements */
  medium: {
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 8,
  } as ViewStyle,
  /** Heavy elevation — bottom tab bar */
  heavy: {
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 32,
    elevation: 12,
  } as ViewStyle,
  /** Accent glow — for CTAs and active elements */
  glow: {
    shadowColor: "#00E5FF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 6,
  } as ViewStyle,
  /** Warm glow — for secondary accent elements */
  warmGlow: {
    shadowColor: "#FB923C",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
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
// Spring configs for react-native Animated / Reanimated

export const animation = {
  /** Quick micro-interaction (button press, pill tap) */
  quick: { duration: 150 },
  /** Standard transition (card expand, modal enter) */
  standard: { duration: 250 },
  /** Dramatic entrance (screen transition, reveal) */
  dramatic: { duration: 400 },
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
