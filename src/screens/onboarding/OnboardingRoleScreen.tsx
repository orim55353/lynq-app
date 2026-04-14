import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GradientButton } from "../../components/GradientButton";
import { OnboardingLayout } from "../../components/OnboardingLayout";
import { radius, spacing, typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { supabase } from "../../lib/supabase";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];
type Props = NativeStackScreenProps<OnboardingStackParamList, "Role">;

interface IndustryOption {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
}

const INDUSTRY_IDS = [
  "warehouse", "construction", "food", "healthcare", "retail",
  "hospitality", "manufacturing", "transportation", "cleaning", "other",
] as const;

const INDUSTRY_ICONS: Record<string, IconName> = {
  warehouse: "cube-outline",
  construction: "hammer-outline",
  food: "restaurant-outline",
  healthcare: "medkit-outline",
  retail: "storefront-outline",
  hospitality: "bed-outline",
  manufacturing: "cog-outline",
  transportation: "car-outline",
  cleaning: "sparkles-outline",
  other: "ellipsis-horizontal-outline",
};

/** Match a saved experience value back to an industry id, or return "other". */
function matchSavedExperience(saved: string | null, industries: IndustryOption[]): { id: string | null; custom: string } {
  if (!saved) return { id: null, custom: "" };
  const match = industries.find((i) => i.label === saved);
  if (match) return { id: match.id, custom: "" };
  return { id: "other", custom: saved };
}

export function OnboardingRoleScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation("onboarding");
  const { uid, onboardingProfile } = useAuth();

  const industries: IndustryOption[] = useMemo(
    () => INDUSTRY_IDS.map((id) => ({
      id,
      label: t(`role.industries.${id}`),
      icon: INDUSTRY_ICONS[id],
    })),
    [t],
  );

  // Autofill from saved profile data
  const savedMatch = matchSavedExperience(onboardingProfile.experience, industries);
  const [selected, setSelected] = useState<string | null>(savedMatch.id);
  const [customRole, setCustomRole] = useState(savedMatch.custom);
  const [submitting, setSubmitting] = useState(false);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(titleTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(listOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(listTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
    ]).start();
  }, [titleOpacity, titleTranslateY, listOpacity, listTranslateY]);

  const handleContinue = useCallback(async () => {
    if (!uid) return;

    if (selected) {
      setSubmitting(true);
      const value = selected === "other"
        ? customRole.trim() || "Other"
        : industries.find((i) => i.id === selected)?.label ?? selected;
      try {
        await supabase
          .from("app_users")
          .update({ experience: value })
          .eq("authId", uid);
      } catch {
        // Non-blocking
      }
      setSubmitting(false);
    }

    navigation.navigate("Certifications");
  }, [uid, selected, navigation]);

  return (
    <OnboardingLayout step={4}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
      <View style={styles.content}>
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("role.title")}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.listWrap, { opacity: listOpacity, transform: [{ translateY: listTranslateY }] }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {industries.map((industry) => {
              const isSelected = selected === industry.id;
              return (
                <Pressable
                  key={industry.id}
                  style={[
                    styles.row,
                    {
                      backgroundColor: isSelected ? colors.accentSoft : colors.glass,
                      borderColor: isSelected ? colors.borderAccent : colors.glassBorder,
                    },
                  ]}
                  onPress={() => setSelected(isSelected ? null : industry.id)}
                >
                  <Ionicons
                    name={industry.icon}
                    size={22}
                    color={isSelected ? colors.accent : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.rowLabel,
                      { color: isSelected ? colors.accent : colors.text },
                    ]}
                  >
                    {industry.label}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>

          {selected === "other" && (
            <View style={[styles.otherInput, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <TextInput
                style={[styles.otherTextInput, { color: colors.text }]}
                value={customRole}
                onChangeText={setCustomRole}
                placeholder={t("role.other_placeholder")}
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                autoFocus
              />
            </View>
          )}
        </Animated.View>

        <GradientButton
          label={t("common:continue")}
          onPress={handleContinue}
          loading={submitting}
          large
        />

      </View>
      </KeyboardAvoidingView>
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
  listWrap: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  keyboard: { flex: 1 },
  otherInput: {
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  otherTextInput: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: spacing.xs,
  },
  skipLink: {
    alignSelf: "center",
    padding: spacing.lg,
  },
  skipText: {
    ...typography.body,
  },
});
