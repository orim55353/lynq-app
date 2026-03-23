import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { GlassCard } from "../components/GlassCard";
import { ScreenHeader } from "../components/ScreenHeader";
import { bottomFade, screenGradient, spotlightGradient } from "../constants/gradients";
import {
  getFontScale,
  radius,
  spacing,
  typography,
} from "../constants/theme";
import { useSavedJobs } from "../context/SavedJobsContext";
import { useEntranceAnimations } from "../hooks/useEntranceAnimations";
import { useJobs } from "../hooks/useJobs";
import { useSpringPress } from "../hooks/useSpringPress";
import { useTheme } from "../hooks/useTheme";
import type { AppStackParamList } from "../navigation/AppStack";
import type { Job } from "../types/models";

/** Pulsing bookmark icon for the empty state */
function PulsingBookmark() {
  const { colors } = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.6,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        styles.emptyIconWrap,
        { backgroundColor: colors.glass, borderColor: colors.glassBorder, opacity: pulse },
      ]}
    >
      <Ionicons name="bookmark-outline" size={40} color={colors.textTertiary} />
    </Animated.View>
  );
}

function SavedCard({
  job,
  opacity,
  translateY,
  onRemove,
  onExpand,
}: {
  readonly job: Job;
  readonly opacity: Animated.Value;
  readonly translateY: Animated.Value;
  readonly onRemove: (id: string) => void;
  readonly onExpand: (job: Job) => void;
}) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const fontScale = getFontScale(width);
  const { scale, onPressIn, onPressOut } = useSpringPress({ pressedScale: 0.97 });

  const deleteScale = useRef(new Animated.Value(1)).current;
  const handleDelete = useCallback(() => {
    Animated.sequence([
      Animated.spring(deleteScale, {
        toValue: 0.75,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.spring(deleteScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 14,
      }),
    ]).start();
    onRemove(job.id);
  }, [deleteScale, job.id, onRemove]);

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
          { backgroundColor: colors.glass, borderColor: colors.glassBorder },
        ]}
      >
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
              <Ionicons name="location-outline" size={12} color={colors.textTertiary} />
              <Text style={[styles.metaText, { color: colors.textTertiary }]} numberOfLines={1}>
                {job.location}
              </Text>
              <Text style={[styles.metaDot, { color: colors.textTertiary }]}>{"\u00B7"}</Text>
              <Text style={[styles.metaText, { color: colors.accent }]}>
                {job.salary}
              </Text>
            </View>
          </View>

          {/* Delete button */}
          <Animated.View style={{ transform: [{ scale: deleteScale }] }}>
            <Pressable
              onPress={handleDelete}
              style={[styles.deleteBtn, { backgroundColor: colors.dangerSoft }]}
              hitSlop={8}
            >
              <Ionicons name="trash-outline" size={16} color={colors.danger} />
            </Pressable>
          </Animated.View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function SavedScreen() {
  const { jobs } = useJobs();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { savedIds, loaded, removeSaved } = useSavedJobs();
  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));

  const { opacities, translateYs, trigger } = useEntranceAnimations(
    Math.max(savedJobs.length, 1),
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

  const subtitleText = loaded
    ? `${savedJobs.length} job${savedJobs.length === 1 ? "" : "s"} saved for later`
    : "Loading...";

  return (
    <View style={styles.root}>
      <LinearGradient colors={screenGradient} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScreenHeader title="Saved Jobs" subtitle={subtitleText} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {!loaded || savedJobs.length === 0 ? (
          <Animated.View
            style={{
              opacity: opacities[0],
              transform: [{ translateY: translateYs[0] }],
            }}
          >
            <GlassCard>
              <View style={styles.emptyContent}>
                <PulsingBookmark />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No saved jobs yet
                </Text>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  Start swiping to save jobs you're interested in!
                </Text>
              </View>
            </GlassCard>
          </Animated.View>
        ) : (
          savedJobs.map((job, i) => (
            <SavedCard
              key={job.id}
              job={job}
              opacity={opacities[i]}
              translateY={translateYs[i]}
              onRemove={removeSaved}
              onExpand={handleExpand}
            />
          ))
        )}
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
  deleteBtn: {
    padding: spacing.sm,
    borderRadius: radius.pill,
  },

  // ─── Empty state ──────────────────────────────────────────────────
  emptyContent: {
    alignItems: "center",
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.heading,
  },
  emptyText: {
    ...typography.body,
    textAlign: "center",
  },
});
