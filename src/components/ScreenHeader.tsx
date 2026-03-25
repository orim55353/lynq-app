import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFontScale, radius, spacing, typography } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";

interface ScreenHeaderProps {
  /** Screen title */
  readonly title: string;
  /** Optional subtitle below title */
  readonly subtitle?: string;
  /** Whether to animate entrance (default true) */
  readonly animate?: boolean;
}

/**
 * Glass-backed floating screen header with responsive typography.
 * Pattern from StoryCirclesRow positioned header.
 *
 * Absolutely positioned at top with glass backdrop,
 * fades in on mount with a subtle slide.
 */
export function ScreenHeader({
  title,
  subtitle,
  animate = true,
}: ScreenHeaderProps) {
  const { colors, mode } = useTheme();
  const headerBg = mode === "light" ? colors.bgElevated : colors.glass;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const fontScale = getFontScale(width);

  const opacity = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const translateY = useRef(new Animated.Value(animate ? -10 : 0)).current;

  useEffect(() => {
    if (!animate) return;
    opacity.setValue(0);
    translateY.setValue(-10);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [animate, opacity, translateY]);

  const titleSize = Math.round(38 * fontScale);
  const titleLineHeight = Math.round(42 * fontScale);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.md,
          backgroundColor: headerBg,
          borderBottomColor: colors.glassBorder,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: titleSize,
            lineHeight: titleLineHeight,
          },
        ]}
      >
        {title}
      </Text>
      {subtitle != null && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: typography.displayLarge.fontWeight,
    letterSpacing: typography.displayLarge.letterSpacing,
    marginBottom: spacing.xxs,
  },
  subtitle: {
    ...typography.body,
  },
});
