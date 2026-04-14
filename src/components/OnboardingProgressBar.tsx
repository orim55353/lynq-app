import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { accentGradient } from "../constants/gradients";
import { useTheme } from "../hooks/useTheme";

interface OnboardingProgressBarProps {
  readonly step: number;
  readonly totalSteps: number;
}

export function OnboardingProgressBar({ step, totalSteps }: OnboardingProgressBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const progress = step / totalSteps;

  return (
    <View style={[styles.track, { top: insets.top, backgroundColor: colors.borderSubtle }]}>
      <LinearGradient
        colors={accentGradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.fill, { width: `${progress * 100}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    zIndex: 10,
  },
  fill: {
    height: "100%",
    borderRadius: 2,
  },
});
