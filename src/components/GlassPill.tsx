import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { radius, spacing, typography } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface GlassPillProps {
  /** Pill label text */
  readonly label: string;
  /** Optional leading icon */
  readonly icon?: IconName;
  /** Icon and text color override (default colors.textSecondary) */
  readonly tint?: string;
  /** Background color override (default colors.glass) */
  readonly bg?: string;
}

/**
 * Small glass pill with optional icon and ghost border.
 * Pattern from JobCard benefit pills + ProfileScreen info pills.
 */
export function GlassPill({ label, icon, tint, bg }: GlassPillProps) {
  const { colors } = useTheme();
  const pillTint = tint ?? colors.textSecondary;
  const pillBg = bg ?? colors.glass;

  return (
    <View style={[styles.pill, { backgroundColor: pillBg, borderColor: colors.glassBorder }]}>
      {icon != null && <Ionicons name={icon} size={13} color={pillTint} />}
      <Text style={[styles.text, { color: pillTint }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  text: {
    ...typography.label,
  },
});
