import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { radius, spacing } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";

interface GlassCardProps {
  readonly children: ReactNode;
  /** Optional gradient colors for a subtle top accent strip */
  readonly accentGradient?: readonly [string, string];
  /** Additional style overrides */
  readonly style?: ViewStyle;
  /** Use heavy glass opacity (85% instead of 75%) */
  readonly heavy?: boolean;
  /** Padding inside the card (default spacing.xl) */
  readonly padding?: number;
}

/**
 * Glass morphism card wrapper.
 * Pattern from StoryCirclesRow glass backdrop + ExpandedJobCard sections.
 *
 * Provides:
 * - Translucent glass background (colors.glass / colors.glassHeavy)
 * - Ghost border (colors.glassBorder) — no solid 1px borders
 * - ROUND_TWENTY_FOUR corners (24px)
 * - Optional accent gradient strip at top edge
 */
export function GlassCard({
  children,
  accentGradient,
  style,
  heavy = false,
  padding = spacing.xl,
}: GlassCardProps) {
  const { colors, mode } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: mode === "light"
            ? (heavy ? colors.bgElevated : colors.bgCard)
            : (heavy ? colors.glassHeavy : colors.glass),
          borderColor: colors.glassBorder,
        },
        style,
      ]}
    >
      {accentGradient != null && (
        <LinearGradient
          colors={accentGradient as [string, string]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.accentStrip}
        />
      )}
      <View style={{ padding }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  accentStrip: {
    height: 3,
  },
});
