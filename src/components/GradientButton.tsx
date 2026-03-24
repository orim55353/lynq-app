import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentProps } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { accentGradient } from "../constants/gradients";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { useSpringPress } from "../hooks/useSpringPress";
import { useTheme } from "../hooks/useTheme";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface GradientButtonProps {
  /** Button label */
  readonly label: string;
  /** Called on press */
  readonly onPress: () => void;
  /** Show loading spinner instead of label */
  readonly loading?: boolean;
  /** Disable the button */
  readonly disabled?: boolean;
  /** Optional leading icon name (Ionicons) */
  readonly icon?: IconName;
  /** Icon size (default 16) */
  readonly iconSize?: number;
  /** Button height (default 52) */
  readonly height?: number;
  /** Custom gradient colors (default accentGradient) */
  readonly gradientColors?: readonly [string, string];
  /** Use large button text style */
  readonly large?: boolean;
}

/**
 * Gradient CTA button with glow shadow and spring press animation.
 * Pattern from JobCard apply button + LoginScreen CTA.
 *
 * NEVER use flat colors for primary CTAs — always gradient.
 */
export function GradientButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  icon,
  iconSize = 16,
  height = 52,
  gradientColors,
  large = false,
}: GradientButtonProps) {
  const { colors } = useTheme();
  const { scale, onPressIn, onPressOut } = useSpringPress({ pressedScale: 0.96 });

  const gradColors = gradientColors ?? accentGradient;

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading}
        style={styles.pressable}
      >
        <LinearGradient
          colors={gradColors as [string, string]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gradient, shadows.glow, { height }]}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} />
          ) : (
            <View style={styles.content}>
              {icon != null && (
                <Ionicons name={icon} size={iconSize} color={colors.textInverse} />
              )}
              <Text
                style={[
                  large ? typography.buttonLarge : typography.button,
                  { color: colors.textInverse },
                ]}
              >
                {label}
              </Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  pressable: {
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
});
