import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { authGradient, authGradientLight, spotlightGradient } from "../constants/gradients";
import { spacing, typography } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
import { LynqLogo } from "./LynqLogo";

interface AuthLayoutProps {
  /** Form content rendered between brand header and bottom link */
  readonly children: ReactNode;
  /** Bottom link label (e.g. "Don't have an account?") */
  readonly linkPrefix: string;
  /** Bottom link accent text (e.g. "Sign up") */
  readonly linkAction: string;
  /** Called when bottom link is pressed */
  readonly onLinkPress: () => void;
  /** Disable link during loading */
  readonly linkDisabled?: boolean;
}

/**
 * Shared auth screen layout for Login and Register.
 * Provides: gradient background + spotlight glow, brand header,
 * KeyboardAvoidingView, and bottom navigation link.
 */
export function AuthLayout({
  children,
  linkPrefix,
  linkAction,
  onLinkPress,
  linkDisabled = false,
}: AuthLayoutProps) {
  const { t } = useTranslation("auth");
  const { colors, mode } = useTheme();
  const bgGradient = mode === "dark" ? authGradient : authGradientLight;

  return (
    <View style={styles.root}>
      <LinearGradient colors={bgGradient} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <View style={styles.content}>
            {/* Brand header */}
            <View style={styles.brandRow}>
              <LynqLogo size={48} white={mode === "dark"} />
              <Text style={[styles.brandName, { color: colors.text }]}>{t("brand_name")}</Text>
            </View>

            {/* Form content */}
            {children}

            {/* Bottom navigation link */}
            <Pressable
              onPress={onLinkPress}
              style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
              disabled={linkDisabled}
            >
              <Text style={[styles.linkText, { color: colors.textSecondary }]}>
                {linkPrefix}{" "}
                <Text style={{ color: colors.accent, fontWeight: "700" }}>
                  {linkAction}
                </Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  spotlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  safe: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.huge,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  brandName: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -1,
  },
  link: {
    alignSelf: "center",
    padding: spacing.md,
  },
  linkPressed: {
    opacity: 0.7,
  },
  linkText: {
    ...typography.body,
  },
});
