export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  gray50: "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E2E8F0",
  gray400: "#94A3B8",
  gray500: "#64748B",
  gray600: "#475569",
  gray700: "#334155",
  gray900: "#0F172A",
  purple500: "#A855F7",
  pink500: "#EC4899",
  blue500: "#3B82F6",
  green500: "#22C55E",
  red500: "#EF4444",
  yellow500: "#EAB308",
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
};

/** Shared spacing scale (4pt base). Use for margins and padding across screens. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

/** Horizontal padding bounds for card/screen content. Use with clamp(width * 0.06, ...). */
export const horizontalPaddingBounds = { min: 20, max: 28 } as const;

/** Reference width for font scaling (e.g. design width). Fonts scale with screen width. */
export const REFERENCE_WIDTH = 390;

/**
 * Scale factor for font sizes based on screen width. Use with base font sizes: fontSize: Math.round(16 * getFontScale(width))
 * Clamped so text doesn't get too small on narrow devices or too large on tablets.
 */
export function getFontScale(width: number, refWidth: number = REFERENCE_WIDTH): number {
  const scale = width / refWidth;
  return Math.min(Math.max(scale, 0.85), 1.25);
}
