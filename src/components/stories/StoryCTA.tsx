import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { radius, spacing, typography } from "../../constants/theme";
import type { StoryCTA as StoryCTAType } from "../../types/story";

interface StoryCTAProps {
  cta: StoryCTAType;
  brandColors: { primary: string; secondary: string };
  onPress: (cta: StoryCTAType) => void;
}

const CTA_ICONS: Record<string, string> = {
  navigate_job: "briefcase-outline",
  apply: "paper-plane-outline",
  follow: "add-circle-outline",
  external_link: "open-outline",
};

export function StoryCTA({ cta, brandColors, onPress }: StoryCTAProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 15,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    onPress(cta);
  }, [onPress, cta]);

  const icon = CTA_ICONS[cta.action] ?? "arrow-forward-outline";

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={cta.label}
        accessibilityRole="button"
      >
        <LinearGradient
          colors={[brandColors.primary, brandColors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Ionicons name={icon as any} size={18} color="#FFFFFF" />
          <Text style={styles.label}>{cta.label}</Text>
          <Ionicons name="arrow-forward" size={16} color="rgba(255,255,255,0.7)" />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.pill,
  },
  label: {
    ...typography.button,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
