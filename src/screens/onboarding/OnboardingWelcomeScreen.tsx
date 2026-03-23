import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { GradientButton } from "../../components/GradientButton";
import { OnboardingLayout } from "../../components/OnboardingLayout";
import { radius, shadows, spacing, typography } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Welcome">;

export function OnboardingWelcomeScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(20)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(heroOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(heroTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(ctaOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(ctaTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
    ]).start();
  }, [heroOpacity, heroTranslateY, ctaOpacity, ctaTranslateY]);

  return (
    <OnboardingLayout step={1} showBack={false}>
      <View style={styles.content}>
        {/* Brand */}
        <View style={styles.brandRow}>
          <View style={[styles.brandIcon, shadows.glow, { backgroundColor: colors.accent }]}>
            <Text style={styles.brandLetter}>Lq</Text>
          </View>
        </View>

        {/* Hero */}
        <Animated.View style={{ opacity: heroOpacity, transform: [{ translateY: heroTranslateY }] }}>
          <Text style={[styles.hero, { color: colors.text }]}>
            Let's find your{"\n"}next job in{"\n"}60 seconds
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Quick setup, better matches
          </Text>
        </Animated.View>

        <View style={styles.spacer} />

        {/* CTA */}
        <Animated.View style={{ opacity: ctaOpacity, transform: [{ translateY: ctaTranslateY }] }}>
          <GradientButton
            label="Let's Go"
            onPress={() => navigation.navigate("Name")}
            icon="arrow-forward"
            large
          />
        </Animated.View>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.huge,
  },
  brandRow: {
    marginBottom: spacing.xxxl,
  },
  brandIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  brandLetter: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  hero: {
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1.5,
    lineHeight: 44,
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    fontSize: 17,
  },
  spacer: { flex: 1 },
});
