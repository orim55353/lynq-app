import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { ScreenHeader } from "../components/ScreenHeader";
import { bottomFade, bottomFadeLight, screenGradient, screenGradientLight, spotlightGradient } from "../constants/gradients";
import {
  getFontScale,
  radius,
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
  const { colors, mode } = useTheme();
  const cardBg = mode === "light" ? colors.bgCard : colors.glass;
  const { width } = useWindowDimensions();
  const fontScale = getFontScale(width);
  const { scale, onPressIn, onPressOut } = useSpringPress({ pressedScale: 0.97 });

  const titleSize = Math.round(17 * fontScale);
  const titleLineHeight = Math.round(22 * fontScale);

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }, { scale }] }}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => onExpand(job)}
        style={[
          styles.card,
          { backgroundColor: cardBg, borderColor: colors.glassBorder },
        ]}
      >
        {/* Accent strip */}
        <LinearGradient
          colors={job.gradient as [string, string]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.accentStrip}
        />

        <View style={styles.cardContent}>
          {/* Logo */}
          <View
            style={[
              styles.logoWrap,
              { backgroundColor: "rgba(255,255,255,0.95)", borderColor: colors.glassBorder },
            ]}
          >
            <Image
              source={{ uri: job.logoImage }}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text
              style={[
                styles.jobTitle,
                { color: colors.text, fontSize: titleSize, lineHeight: titleLineHeight },
              ]}
              numberOfLines={1}
            >
              {job.title}
            </Text>
            <Text style={[styles.company, { color: colors.textSecondary }]} numberOfLines={1}>
              {job.company}
            </Text>
            <View style={styles.metaRow}>
                      <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]} numberOfLines={1}>
                {job.location}
              </Text>
              <Text style={[styles.metaDot, { color: colors.textSecondary }]}>{"\u00B7"}</Text>
              <Text style={[styles.metaText, { color: colors.accent }]}>
                {job.salary}
              </Text>
            </View>
          </View>

          {/* Match badge */}
          <View style={[styles.matchBadge, { backgroundColor: colors.accentSoft }]}>
            <Text style={[styles.matchPercent, { color: colors.accent }]}>
              {job.compatibilityScore}%
            </Text>
            <Ionicons name="heart" size={11} color={colors.accent} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function MatchesScreen() {
  const { t } = useTranslation("matches");
  const { jobs } = useJobs();
  const { mode } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  // Curated matches — one from each company, highest compatibility scores
  const MATCHED_JOB_IDS = ["5", "36", "22", "40", "18", "8", "11"];
  const matchedJobs = MATCHED_JOB_IDS
    .map(id => jobs.find(j => j.id === id))
    .filter((j): j is Job => j !== undefined);

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
    navigation.navigate("JobDetail", { jobId: job.id, source: "matches" });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <LinearGradient colors={mode === "dark" ? screenGradient : screenGradientLight} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScreenHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 130 }]}
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
        colors={mode === "dark" ? bottomFade : bottomFadeLight}
        style={styles.bottomFade}
        pointerEvents="none"
      />
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
    gap: spacing.md,
  },

  // ─── Card ─────────────────────────────────────────────────────────
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  accentStrip: {
    height: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  logoWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.xs,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  jobTitle: {
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  company: {
    ...typography.bodySmall,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "500",
  },
  metaDot: {
    fontSize: 12,
  },
  matchBadge: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    gap: 2,
  },
  matchPercent: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
});
