import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GradientButton } from "../../components/GradientButton";
import { OnboardingLayout } from "../../components/OnboardingLayout";
import { radius, spacing, typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { supabase } from "../../lib/supabase";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";

type Props = NativeStackScreenProps<OnboardingStackParamList, "WorkPreferences">;

interface ChipOption {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

const SHIFT_OPTION_DEFS = [
  { id: "DAY", key: "day", icon: "sunny-outline" },
  { id: "NIGHT", key: "night", icon: "moon-outline" },
  { id: "SWING", key: "evening", icon: "partly-sunny-outline" },
  { id: "ROTATING", key: "rotating", icon: "sync-outline" },
  { id: "FLEXIBLE", key: "flexible", icon: "options-outline" },
] as const;

const JOB_TYPE_OPTION_DEFS = [
  { id: "FULL_TIME", key: "full_time", icon: "briefcase-outline" },
  { id: "PART_TIME", key: "part_time", icon: "time-outline" },
  { id: "CONTRACT", key: "contract", icon: "document-text-outline" },
  { id: "TEMPORARY", key: "temporary", icon: "hourglass-outline" },
] as const;

function Chip({
  option,
  isSelected,
  onToggle,
  colors,
}: {
  readonly option: ChipOption;
  readonly isSelected: boolean;
  readonly onToggle: () => void;
  readonly colors: Record<string, string>;
}) {
  return (
    <Pressable
      style={[
        chipStyles.chip,
        {
          backgroundColor: isSelected ? colors.accentSoft : colors.glass,
          borderColor: isSelected ? colors.borderAccent : colors.glassBorder,
        },
      ]}
      onPress={onToggle}
    >
      <Ionicons
        name={option.icon as "sunny-outline"}
        size={18}
        color={isSelected ? colors.accent : colors.textSecondary}
      />
      <Text
        style={[
          chipStyles.chipLabel,
          { color: isSelected ? colors.accent : colors.text },
        ]}
      >
        {option.label}
      </Text>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
      )}
    </Pressable>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  chipLabel: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
});

export function OnboardingWorkPreferencesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation("onboarding");
  const { uid } = useAuth();

  const shiftOptions: ChipOption[] = useMemo(
    () => SHIFT_OPTION_DEFS.map((d) => ({ id: d.id, label: t(`work_preferences.shifts.${d.key}`), icon: d.icon })),
    [t],
  );

  const jobTypeOptions: ChipOption[] = useMemo(
    () => JOB_TYPE_OPTION_DEFS.map((d) => ({ id: d.id, label: t(`work_preferences.job_types.${d.key}`), icon: d.icon })),
    [t],
  );

  const [selectedShifts, setSelectedShifts] = useState<Set<string>>(new Set());
  const [selectedJobTypes, setSelectedJobTypes] = useState<Set<string>>(new Set());
  const [hasTransport, setHasTransport] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(titleTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(contentTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
    ]).start();
  }, [titleOpacity, titleTranslateY, contentOpacity, contentTranslateY]);

  const toggleShift = useCallback((id: string) => {
    setSelectedShifts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleJobType = useCallback((id: string) => {
    setSelectedJobTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleContinue = useCallback(async () => {
    if (!uid) return;
    setSubmitting(true);

    try {
      const updates: Record<string, unknown> = {};
      if (selectedShifts.size > 0) updates.preferredShiftTypes = Array.from(selectedShifts);
      if (selectedJobTypes.size > 0) updates.preferredJobTypes = Array.from(selectedJobTypes);
      if (hasTransport !== null) updates.hasOwnTransport = hasTransport;

      if (Object.keys(updates).length > 0) {
        await supabase
          .from("app_users")
          .update(updates)
          .eq("authId", uid);
      }
    } catch {
      // Non-blocking
    }

    setSubmitting(false);
    navigation.navigate("Traits");
  }, [uid, selectedShifts, selectedJobTypes, hasTransport, navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate("Traits");
  }, [navigation]);

  return (
    <OnboardingLayout step={6}>
      <View style={styles.content}>
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("work_preferences.title")}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.sectionsWrap, { opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Shift Preferences */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {t("work_preferences.when_section")}
            </Text>
            <View style={styles.chipGrid}>
              {shiftOptions.map((option) => (
                <Chip
                  key={option.id}
                  option={option}
                  isSelected={selectedShifts.has(option.id)}
                  onToggle={() => toggleShift(option.id)}
                  colors={colors}
                />
              ))}
            </View>

            {/* Job Type */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {t("work_preferences.type_section")}
            </Text>
            <View style={styles.chipGrid}>
              {jobTypeOptions.map((option) => (
                <Chip
                  key={option.id}
                  option={option}
                  isSelected={selectedJobTypes.has(option.id)}
                  onToggle={() => toggleJobType(option.id)}
                  colors={colors}
                />
              ))}
            </View>

            {/* Transport */}
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {t("work_preferences.transport_section")}
            </Text>
            <View style={styles.transportRow}>
              <Pressable
                style={[
                  styles.transportOption,
                  {
                    backgroundColor: hasTransport === true ? colors.accentSoft : colors.glass,
                    borderColor: hasTransport === true ? colors.borderAccent : colors.glassBorder,
                  },
                ]}
                onPress={() => setHasTransport(hasTransport === true ? null : true)}
              >
                <Ionicons
                  name="car-outline"
                  size={20}
                  color={hasTransport === true ? colors.accent : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.transportLabel,
                    { color: hasTransport === true ? colors.accent : colors.text },
                  ]}
                >
                  {t("common:yes")}
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.transportOption,
                  {
                    backgroundColor: hasTransport === false ? colors.accentSoft : colors.glass,
                    borderColor: hasTransport === false ? colors.borderAccent : colors.glassBorder,
                  },
                ]}
                onPress={() => setHasTransport(hasTransport === false ? null : false)}
              >
                <Ionicons
                  name="bus-outline"
                  size={20}
                  color={hasTransport === false ? colors.accent : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.transportLabel,
                    { color: hasTransport === false ? colors.accent : colors.text },
                  ]}
                >
                  {t("common:no")}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>

        <GradientButton
          label={t("common:continue")}
          onPress={handleContinue}
          loading={submitting}
          large
        />

        <Pressable onPress={handleSkip} style={styles.skipLink}>
          <Text style={[styles.skipText, { color: colors.textTertiary }]}>{t("common:skip")}</Text>
        </Pressable>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginBottom: spacing.xl,
  },
  sectionsWrap: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  chipGrid: {
    gap: spacing.sm,
  },
  transportRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  transportOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  transportLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  skipLink: {
    alignSelf: "center",
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  skipText: {
    ...typography.body,
  },
});
