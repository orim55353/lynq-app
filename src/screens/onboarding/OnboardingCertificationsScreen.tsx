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

type Props = NativeStackScreenProps<OnboardingStackParamList, "Certifications">;

interface Certification {
  readonly label: string;
  readonly value: string;
  readonly gradient: readonly [string, string];
  readonly size: number;
}

const CERT_ROWS: Certification[][] = [
  [
    { label: "Forklift\ncertified", value: "Forklift Certification", gradient: ["#F59E0B", "#FBBF24"], size: 105 },
    { label: "CDL\nholder", value: "CDL Class A", gradient: ["#6366F1", "#818CF8"], size: 90 },
    { label: "Food\nhandler", value: "Food Handler", gradient: ["#059669", "#34D399"], size: 100 },
    { label: "OSHA\ntrained", value: "OSHA 10", gradient: ["#00687A", "#06B6D4"], size: 95 },
  ],
  [
    { label: "First aid", value: "First Aid", gradient: ["#DC2626", "#F87171"], size: 95 },
    { label: "CPR", value: "CPR", gradient: ["#0891B2", "#22D3EE"], size: 80 },
    { label: "HAZMAT", value: "HAZMAT", gradient: ["#8B5CF6", "#A78BFA"], size: 90 },
    { label: "Electrician", value: "Electrician", gradient: ["#F59E0B", "#FBBF24"], size: 100 },
  ],
  [
    { label: "Certified\nwelder", value: "Certified Welder", gradient: ["#DC2626", "#F87171"], size: 105 },
    { label: "Mechanic", value: "Mechanic", gradient: ["#059669", "#34D399"], size: 88 },
    { label: "PIT\ncertified", value: "PIT Certified", gradient: ["#6366F1", "#818CF8"], size: 95 },
    { label: "EPA 608", value: "EPA 608", gradient: ["#00687A", "#06B6D4"], size: 85 },
  ],
];

// Seeded pseudo-random for stable float animation per bubble
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const FLOAT_AMPLITUDE = 3;

function CertBubble({
  cert,
  isSelected,
  onToggle,
  index,
}: {
  readonly cert: Certification;
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

  useEffect(() => {
    const rand = seededRandom(index);
    const durationX = 2400 + rand * 1200;
    const durationY = 2800 + seededRandom(index + 100) * 1400;
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
    return () => { loopX.stop(); loopY.stop(); };
  }, [floatX, floatY, index]);

  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(selectScale, { toValue: 0.85, useNativeDriver: true, speed: 50, bounciness: 4 }),
      Animated.spring(selectScale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 12 }),
    ]).start();
    onToggle();
  }, [selectScale, onToggle]);

  const size = cert.size;

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
          colors={cert.gradient as [string, string]}
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
          <Text style={[bubbleStyles.label, { fontSize: size <= 85 ? 11 : size <= 95 ? 12 : 14 }]}>
            {cert.label}
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

/** Restore saved certifications back to bubble labels. */
function restoreSavedCerts(saved: string[] | null): Set<string> {
  if (!saved || saved.length === 0) return new Set();
  const allCerts = CERT_ROWS.flat();
  const restored = new Set<string>();
  for (const val of saved) {
    const match = allCerts.find((c) => c.value === val);
    if (match) restored.add(match.value);
  }
  return restored;
}

export function OnboardingCertificationsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { uid, onboardingProfile } = useAuth();
  const [selectedCerts, setSelectedCerts] = useState<Set<string>>(
    () => restoreSavedCerts(onboardingProfile.certifications),
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

  const toggleCert = useCallback((value: string) => {
    setSelectedCerts((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  }, []);

  const handleContinue = useCallback(async () => {
    if (!uid) return;
    setSubmitting(true);

    try {
      const certifications = Array.from(selectedCerts);
      await supabase
        .from("app_users")
        .update({ certifications })
        .eq("authId", uid);
    } catch {
      // Non-blocking
    }

    setSubmitting(false);
    navigation.navigate("WorkPreferences");
  }, [uid, selectedCerts, navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate("WorkPreferences");
  }, [navigation]);

  let globalIndex = 0;

  return (
    <OnboardingLayout step={5}>
      <View style={styles.content}>
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
          <Text style={[styles.title, { color: colors.text }]}>
            Got any{"\n"}certifications?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select all that apply
          </Text>
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollWrap}
        >
          <View style={styles.columnsContainer}>
            {CERT_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.bubbleRow}>
                {row.map((cert) => {
                  const idx = globalIndex++;
                  return (
                    <CertBubble
                      key={cert.value}
                      cert={cert}
                      isSelected={selectedCerts.has(cert.value)}
                      onToggle={() => toggleCert(cert.value)}
                      index={idx}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        <Text style={[styles.counter, { color: colors.textSecondary }]}>
          {selectedCerts.size} selected
        </Text>

        <View style={styles.ctaWrap}>
          <GradientButton
            label="Continue"
            onPress={handleContinue}
            loading={submitting}
            large
          />

          <Pressable onPress={handleSkip} style={styles.skipLink}>
            <Text style={[styles.skipText, { color: colors.textTertiary }]}>I don't have any</Text>
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
