import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProgressBar } from "./OnboardingProgressBar";
import { radius, spacing } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
interface OnboardingLayoutProps {
  readonly children: ReactNode;
  readonly step: number;
  readonly showBack?: boolean;
}

export function OnboardingLayout({ children, step, showBack = true }: OnboardingLayoutProps) {
  const { colors, mode } = useTheme();
  const navigation = useNavigation();

  // Track canGoBack reactively — the back stack may be injected after mount
  const [canGoBack, setCanGoBack] = useState(navigation.canGoBack());
  useEffect(() => {
    return navigation.addListener("state", () => {
      setCanGoBack(navigation.canGoBack());
    });
  }, [navigation]);

  const bgGradient: [string, string, string] = mode === "dark"
    ? ["#0B1220", "#0F1D2E", "#111827"]
    : ["#F5FAFC", "#EFF4F7", "#F5FAFC"];

  const spotlightGradient: [string, string, string] = mode === "dark"
    ? ["rgba(6, 182, 212, 0.12)", "rgba(6, 182, 212, 0.04)", "transparent"]
    : ["rgba(6, 182, 212, 0.08)", "rgba(6, 182, 212, 0.02)", "transparent"];

  return (
    <View style={styles.root}>
      <LinearGradient colors={bgGradient} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <OnboardingProgressBar step={step} totalSteps={5} />

      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        {showBack && canGoBack ? (
          <View style={styles.backRow}>
            <Pressable
              style={[styles.backButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}
              onPress={() => navigation.goBack()}
              hitSlop={12}
            >
              <Ionicons name="chevron-back" size={22} color={colors.text} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.backSpacer} />
        )}
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  spotlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  safe: { flex: 1 },
  backRow: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  backSpacer: {
    height: spacing.md + 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
