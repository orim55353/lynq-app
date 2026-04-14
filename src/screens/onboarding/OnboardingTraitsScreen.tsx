import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
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
import { spacing, typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { supabase } from "../../lib/supabase";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Traits">;

interface TraitDef {
  readonly key: string;
  readonly gradient: readonly [string, string];
  readonly size: number;
}

interface Trait extends TraitDef {
  readonly label: string;
}

// Organized into rows — each row scrolls together horizontally
const TRAIT_ROW_DEFS: TraitDef[][] = [
  [
    { key: "team_player", gradient: ["#00687A", "#06B6D4"], size: 115 },
    { key: "reliable", gradient: ["#6366F1", "#818CF8"], size: 90 },
    { key: "problem_solver", gradient: ["#8B5CF6", "#A78BFA"], size: 105 },
    { key: "fast_learner", gradient: ["#059669", "#34D399"], size: 95 },
    { key: "bilingual", gradient: ["#F59E0B", "#FBBF24"], size: 88 },
    { key: "hands_on", gradient: ["#DC2626", "#F87171"], size: 100 },
  ],
  [
    { key: "detail_oriented", gradient: ["#0891B2", "#22D3EE"], size: 100 },
    { key: "early_riser", gradient: ["#F59E0B", "#FBBF24"], size: 88 },
    { key: "leader", gradient: ["#DC2626", "#F87171"], size: 115 },
    { key: "night_owl", gradient: ["#6366F1", "#818CF8"], size: 90 },
    { key: "people_person", gradient: ["#00687A", "#06B6D4"], size: 105 },
    { key: "punctual", gradient: ["#8B5CF6", "#A78BFA"], size: 95 },
  ],
  [
    { key: "calm_under_pressure", gradient: ["#8B5CF6", "#A78BFA"], size: 110 },
    { key: "physical_stamina", gradient: ["#059669", "#34D399"], size: 100 },
    { key: "heavy_lifting", gradient: ["#DC2626", "#F87171"], size: 90 },
    { key: "on_my_feet", gradient: ["#0891B2", "#22D3EE"], size: 88 },
    { key: "organized", gradient: ["#F59E0B", "#FBBF24"], size: 105 },
    { key: "self_starter", gradient: ["#6366F1", "#818CF8"], size: 95 },
  ],
  [
    { key: "adaptable", gradient: ["#0891B2", "#22D3EE"], size: 95 },
    { key: "patient", gradient: ["#059669", "#34D399"], size: 88 },
    { key: "creative", gradient: ["#8B5CF6", "#A78BFA"], size: 100 },
    { key: "focused", gradient: ["#F59E0B", "#FBBF24"], size: 90 },
    { key: "resilient", gradient: ["#DC2626", "#F87171"], size: 105 },
    { key: "curious", gradient: ["#00687A", "#06B6D4"], size: 88 },
  ],
];

// Seeded pseudo-random so each bubble gets a stable unique offset
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const FLOAT_AMPLITUDE = 3; // max px drift — keeps bubbles from overlapping

function Bubble({
  trait,
  isSelected,
  onToggle,
  index,
}: {
  readonly trait: Trait;
  readonly isSelected: boolean;
  readonly onToggle: () => void;
  readonly index: number;
}) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const selectScale = useRef(new Animated.Value(1)).current;
  const floatX = useRef(new Animated.Value(0)).current;
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
      delay: index * 35,
    }).start();
  }, [scaleAnim, index]);

  // Gentle looping float — unique duration & phase per bubble
  useEffect(() => {
    const rand = seededRandom(index);
    const durationX = 2400 + rand * 1200; // 2.4s–3.6s
    const durationY = 2800 + seededRandom(index + 100) * 1400; // 2.8s–4.2s
    const ampX = FLOAT_AMPLITUDE * (0.6 + rand * 0.4);
    const ampY = FLOAT_AMPLITUDE * (0.6 + seededRandom(index + 50) * 0.4);

    const loopX = Animated.loop(
      Animated.sequence([
        Animated.timing(floatX, { toValue: ampX, duration: durationX, useNativeDriver: true }),
        Animated.timing(floatX, { toValue: -ampX, duration: durationX, useNativeDriver: true }),
        Animated.timing(floatX, { toValue: 0, duration: durationX * 0.5, useNativeDriver: true }),
      ]),
    );
    const loopY = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -ampY, duration: durationY, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: ampY, duration: durationY, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: durationY * 0.5, useNativeDriver: true }),
      ]),
    );

    loopX.start();
    loopY.start();

    return () => {
      loopX.stop();
      loopY.stop();
    };
  }, [floatX, floatY, index]);

  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(selectScale, {
        toValue: 0.85,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.spring(selectScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 12,
      }),
    ]).start();
    onToggle();
  }, [selectScale, onToggle]);

  const size = trait.size;

  return (
    <Animated.View
      style={{
        marginHorizontal: 5,
        transform: [
          { scale: Animated.multiply(scaleAnim, selectScale) },
          { translateX: floatX },
          { translateY: floatY },
        ],
      }}
    >
      <Pressable onPress={handlePress}>
        <LinearGradient
          colors={trait.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            bubbleStyles.bubble,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              opacity: isSelected ? 1 : 0.65,
            },
          ]}
        >
          <Text style={[bubbleStyles.label, { fontSize: size <= 75 ? 11 : size <= 90 ? 12 : 14 }]}>
            {trait.label}
          </Text>
        </LinearGradient>
        {isSelected && (
          <View
            style={[
              bubbleStyles.glowRing,
              {
                width: size + 6,
                height: size + 6,
                borderRadius: (size + 6) / 2,
                top: -3,
                start: -3,
              },
            ]}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

const bubbleStyles = StyleSheet.create({
  bubble: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.2,
    lineHeight: 16,
  },
  glowRing: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(6, 182, 212, 0.7)",
  },
});

/** Restore saved skills back to trait keys. */
function restoreSavedSkills(saved: string[] | null, traitRows: Trait[][]): Set<string> {
  if (!saved || saved.length === 0) return new Set();
  const allTraits = traitRows.flat();
  const restored = new Set<string>();
  for (const skill of saved) {
    // Match by comparing label with newlines stripped
    const match = allTraits.find((t) => t.label.replace(/\n/g, " ") === skill);
    if (match) restored.add(match.key);
  }
  return restored;
}

export function OnboardingTraitsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation("onboarding");
  const { uid, completeOnboarding, onboardingProfile } = useAuth();

  const traitRows: Trait[][] = useMemo(
    () => TRAIT_ROW_DEFS.map((row) =>
      row.map((def) => ({ ...def, label: t(`traits.traits.${def.key}`) })),
    ),
    [t],
  );

  const [selectedTraits, setSelectedTraits] = useState<Set<string>>(
    () => restoreSavedSkills(onboardingProfile.skills, traitRows),
  );
  const [submitting, setSubmitting] = useState(false);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(titleTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
    ]).start();
  }, [titleOpacity, titleTranslateY]);

  const MAX_TRAITS = 8;

  const toggleTrait = useCallback((key: string) => {
    setSelectedTraits((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else if (next.size < MAX_TRAITS) {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleFinish = useCallback(async () => {
    if (!uid) return;
    setSubmitting(true);

    try {
      // Look up translated labels from keys, strip newlines for DB storage
      const allTraits = traitRows.flat();
      const skills = Array.from(selectedTraits).map((key) => {
        const trait = allTraits.find((t) => t.key === key);
        return trait ? trait.label.replace(/\n/g, " ") : key;
      });
      await supabase
        .from("app_users")
        .update({ skills, onboardingCompleted: true })
        .eq("authId", uid);
    } catch {
      // Still complete onboarding even if save fails
    }

    setSubmitting(false);
    completeOnboarding();
  }, [uid, selectedTraits, completeOnboarding]);

  const handleSkip = useCallback(async () => {
    if (!uid) return;
    try {
      await supabase
        .from("app_users")
        .update({ onboardingCompleted: true })
        .eq("authId", uid);
    } catch {
      // Non-blocking
    }
    completeOnboarding();
  }, [uid, completeOnboarding]);

  let globalIndex = 0;

  return (
    <OnboardingLayout step={7}>
      <View style={styles.content}>
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("traits.title")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t("traits.subtitle")}
          </Text>
        </Animated.View>

        {/* Single horizontal scroll with stacked rows of bubbles */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollWrap}
        >
          <View style={styles.columnsContainer}>
            {traitRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.bubbleRow}>
                {row.map((trait) => {
                  const idx = globalIndex++;
                  return (
                    <Bubble
                      key={trait.key}
                      trait={trait}
                      isSelected={selectedTraits.has(trait.key)}
                      onToggle={() => toggleTrait(trait.key)}
                      index={idx}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Counter */}
        <Text style={[styles.counter, { color: colors.textSecondary }]}>
          {t("common:selected_of_max", { count: selectedTraits.size, max: MAX_TRAITS })}
        </Text>

        <View style={styles.ctaWrap}>
          <GradientButton
            label={t("traits.cta")}
            onPress={handleFinish}
            loading={submitting}
            icon="rocket-outline"
            large
          />

          <Pressable onPress={handleSkip} style={styles.skipLink}>
            <Text style={[styles.skipText, { color: colors.textTertiary }]}>{t("common:skip")}</Text>
          </Pressable>
        </View>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xxl,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  scrollWrap: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  columnsContainer: {
    gap: 10,
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    ...typography.body,
    textAlign: "center",
    fontWeight: "600",
    marginVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  ctaWrap: {
    paddingHorizontal: spacing.xxl,
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
