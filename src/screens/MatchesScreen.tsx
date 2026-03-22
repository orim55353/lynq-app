import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import {
  Animated,
  // Image replaced by expo-image
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { GlassCard } from "../components/GlassCard";
import { GlassPill } from "../components/GlassPill";
import { GradientButton } from "../components/GradientButton";
import { ScreenHeader } from "../components/ScreenHeader";
import { bottomFade, screenGradient, spotlightGradient } from "../constants/gradients";
import {
  getFontScale,
  radius,
  shadows,
  spacing,
  typography,
} from "../constants/theme";
import { useEntranceAnimations } from "../hooks/useEntranceAnimations";
import { useJobs } from "../hooks/useJobs";
import { useSpringPress } from "../hooks/useSpringPress";
import { useTheme } from "../hooks/useTheme";
import type { AppStackParamList } from "../navigation/AppStack";
import type { Job } from "../types/models";

function MatchCard({
  job,
  opacity,
  translateY,
  onExpand,
}: {
  readonly job: Job;
  readonly opacity: Animated.Value;
  readonly translateY: Animated.Value;
  readonly onExpand: (job: Job) => void;
}) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const fontScale = getFontScale(width);
  const { scale, onPressIn, onPressOut } = useSpringPress({ pressedScale: 0.97 });

  const titleSize = Math.round(22 * fontScale);
  const titleLineHeight = Math.round(28 * fontScale);

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }, { scale }] }}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => onExpand(job)}
      >
        <GlassCard accentGradient={job.gradient as [string, string]}>
          <View style={styles.rowStart}>
            <View
              style={[
                styles.logoWrap,
                { backgroundColor: colors.glass, borderColor: colors.glassBorder },
              ]}
            >
              <Image
                source={{ uri: job.logoImage }}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
            <View style={styles.flexOne}>
              <Text
                style={[
                  styles.jobTitle,
                  {
                    color: colors.text,
                    fontSize: titleSize,
                    lineHeight: titleLineHeight,
                  },
                ]}
                numberOfLines={2}
              >
                {job.title}
              </Text>
              <Text style={[styles.company, { color: colors.textSecondary }]}>
                {job.company}
              </Text>
            </View>
            <View
              style={[
                styles.matchPill,
                { backgroundColor: colors.accentSoft },
                shadows.glow,
              ]}
            >
              <Ionicons name="heart" size={13} color={colors.accent} />
              <Text style={[styles.matchText, { color: colors.accent }]}>
                {job.compatibilityScore}%
              </Text>
            </View>
          </View>

          <Text
            style={[styles.description, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {job.description}
          </Text>

          <View style={styles.pillsRow}>
            <GlassPill icon="location-outline" label={job.location} />
            <GlassPill icon="briefcase-outline" label={job.type} />
            <GlassPill icon="cash-outline" label={job.salary} />
          </View>

          <GradientButton
            label="Message Company"
            icon="chatbubble-outline"
            onPress={() => {}}
          />
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
}

export function MatchesScreen() {
  const { jobs } = useJobs();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const matchedJobs = jobs.slice(0, 5);

  const { opacities, translateYs, trigger } = useEntranceAnimations(
    matchedJobs.length,
    { staggerMs: 80 },
  );

  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [trigger]),
  );

  const handleExpand = useCallback((job: Job) => {
    navigation.navigate("JobDetail", { jobId: job.id });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <LinearGradient colors={screenGradient} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScreenHeader
        title="Your Matches"
        subtitle="Companies that liked you back"
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 130 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {matchedJobs.map((job, i) => (
          <MatchCard
            key={job.id}
            job={job}
            opacity={opacities[i]}
            translateY={translateYs[i]}
            onExpand={handleExpand}
          />
        ))}
      </ScrollView>

      <LinearGradient
        colors={bottomFade}
        style={styles.bottomFade}
        pointerEvents="none"
      />

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
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  flexOne: {
    flex: 1,
  },
  jobTitle: {
    fontWeight: typography.heading.fontWeight,
    letterSpacing: typography.heading.letterSpacing,
    marginBottom: spacing.xxs,
  },
  company: {
    ...typography.bodySmall,
    fontWeight: "600",
  },
  matchPill: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  matchText: {
    ...typography.label,
    fontWeight: "700",
  },
  description: {
    ...typography.bodySmall,
    marginBottom: spacing.md,
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
});
