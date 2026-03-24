import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef, useState } from "react";
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

interface Trait {
  readonly label: string;
  readonly gradient: readonly [string, string];
  readonly size: number;
}

// Organized into rows — each row scrolls together horizontally
const TRAIT_ROWS: Trait[][] = [
  [
    { label: "שחקן\nקבוצתי", gradient: ["#00687A", "#06B6D4"], size: 115 },
    { label: "אמין", gradient: ["#6366F1", "#818CF8"], size: 90 },
    { label: "פותר\nבעיות", gradient: ["#8B5CF6", "#A78BFA"], size: 105 },
    { label: "לומד\nמהר", gradient: ["#059669", "#34D399"], size: 95 },
    { label: "דו\nלשוני", gradient: ["#F59E0B", "#FBBF24"], size: 88 },
    { label: "מעשי", gradient: ["#DC2626", "#F87171"], size: 100 },
  ],
  [
    { label: "מדויק\nבפרטים", gradient: ["#0891B2", "#22D3EE"], size: 100 },
    { label: "משכים\nקום", gradient: ["#F59E0B", "#FBBF24"], size: 88 },
    { label: "מנהיג", gradient: ["#DC2626", "#F87171"], size: 115 },
    { label: "ינשוף\nלילה", gradient: ["#6366F1", "#818CF8"], size: 90 },
    { label: "חברותי", gradient: ["#00687A", "#06B6D4"], size: 105 },
    { label: "דייקן", gradient: ["#8B5CF6", "#A78BFA"], size: 95 },
  ],
  [
    { label: "רגוע\nתחת\nלחץ", gradient: ["#8B5CF6", "#A78BFA"], size: 110 },
    { label: "סיבולת\nגופנית", gradient: ["#059669", "#34D399"], size: 100 },
    { label: "הרמת\nמשאות", gradient: ["#DC2626", "#F87171"], size: 90 },
    { label: "עבודה\nבעמידה", gradient: ["#0891B2", "#22D3EE"], size: 88 },
    { label: "מאורגן", gradient: ["#F59E0B", "#FBBF24"], size: 105 },
    { label: "יוזם\nעצמאי", gradient: ["#6366F1", "#818CF8"], size: 95 },
  ],
  [
    { label: "מוסמך\nמלגזה", gradient: ["#F59E0B", "#FBBF24"], size: 105 },
    { label: "בעל\nרישיון\nכבד", gradient: ["#6366F1", "#818CF8"], size: 90 },
    { label: "מטפל\nבמזון", gradient: ["#059669", "#34D399"], size: 100 },
    { label: "מוסמך\nבטיחות", gradient: ["#00687A", "#06B6D4"], size: 95 },
    { label: "עזרה\nראשונה", gradient: ["#DC2626", "#F87171"], size: 110 },
    { label: "גמיש", gradient: ["#0891B2", "#22D3EE"], size: 88 },
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
                left: -3,
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

/** Restore saved skills (spaces) back to trait labels (newlines). */
function restoreSavedSkills(saved: string[] | null): Set<string> {
  if (!saved || saved.length === 0) return new Set();
  const allLabels = TRAIT_ROWS.flat().map((t) => t.label);
  const restored = new Set<string>();
  for (const skill of saved) {
    // Match by comparing with newlines stripped
    const match = allLabels.find((label) => label.replace(/\n/g, " ") === skill);
    if (match) restored.add(match);
  }
  return restored;
}

export function OnboardingTraitsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { uid, completeOnboarding, onboardingProfile } = useAuth();
  const [selectedTraits, setSelectedTraits] = useState<Set<string>>(
    () => restoreSavedSkills(onboardingProfile.skills),
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

  const toggleTrait = useCallback((label: string) => {
    setSelectedTraits((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else if (next.size < MAX_TRAITS) {
        next.add(label);
      }
      return next;
    });
  }, []);

  const handleFinish = useCallback(async () => {
    if (!uid) return;
    setSubmitting(true);

    try {
      // Clean up newlines from labels before saving
      const skills = Array.from(selectedTraits).map((s) => s.replace(/\n/g, " "));
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
    <OnboardingLayout step={5}>
      <View style={styles.content}>
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
          <Text style={[styles.title, { color: colors.text }]}>
            מה מייחד אתכם?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            בחרו 3-8 שמתארים אתכם
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
            {TRAIT_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.bubbleRow}>
                {row.map((trait) => {
                  const idx = globalIndex++;
                  return (
                    <Bubble
                      key={trait.label}
                      trait={trait}
                      isSelected={selectedTraits.has(trait.label)}
                      onToggle={() => toggleTrait(trait.label)}
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
          {selectedTraits.size}/{MAX_TRAITS} נבחרו
        </Text>

        <GradientButton
          label="בואו נתחיל"
          onPress={handleFinish}
          loading={submitting}
          icon="rocket-outline"
          large
        />

        <Pressable onPress={handleSkip} style={styles.skipLink}>
          <Text style={[styles.skipText, { color: colors.textTertiary }]}>דלגו לעת עתה</Text>
        </Pressable>
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
    textAlign: "right",
    writingDirection: "rtl",
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xxl,
    textAlign: "right",
    writingDirection: "rtl",
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
  skipLink: {
    alignSelf: "center",
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  skipText: {
    ...typography.body,
    textAlign: "right",
    writingDirection: "rtl",
  },
});
