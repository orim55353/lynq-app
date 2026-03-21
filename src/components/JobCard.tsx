import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  colors,
  cardColors,
  type CardColorScheme,
  getFontScale,
  radius,
  spacing,
} from "../constants/theme";
import { Job } from "../types/models";
import { clamp } from "../utils/math";

interface JobCardProps {
  job: Job;
  cardHeight: number;
  topOffset: number;
  bottomOffset: number;
  isSaved: boolean;
  onToggleSaved: (jobId: string) => void;
  onExpand?: (job: Job) => void;
  mode?: "light" | "dark";
}

function matchColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#94A3B8";
}

export const JobCard = memo(function JobCard({
  job,
  cardHeight,
  topOffset,
  bottomOffset,
  isSaved,
  onToggleSaved,
  onExpand,
  mode = "light",
}: JobCardProps) {
  const { width } = useWindowDimensions();
  const [applied, setApplied] = useState(false);
  const applyScale = useRef(new Animated.Value(1)).current;
  const saveScale = useRef(new Animated.Value(1)).current;

  const c: CardColorScheme = cardColors[mode];

  const fontScale = useMemo(() => getFontScale(width), [width]);
  const fs = useMemo(
    () => ({
      company: Math.round(15 * fontScale),
      title: Math.round(28 * fontScale),
      titleLineHeight: Math.round(32 * fontScale),
      salary: Math.round(20 * fontScale),
      locationText: Math.round(14 * fontScale),
      description: Math.round(14 * fontScale),
      descriptionLineHeight: Math.round(21 * fontScale),
      matchScore: Math.round(16 * fontScale),
      matchLabel: Math.round(10 * fontScale),
      infoLabel: Math.round(10 * fontScale),
      infoValue: Math.round(12 * fontScale),
      benefitText: Math.round(11 * fontScale),
      applyText: Math.round(17 * fontScale),
      hintText: Math.round(10 * fontScale),
    }),
    [fontScale],
  );

  const onCardPress = useCallback(() => {
    onExpand?.(job);
  }, [job, onExpand]);

  const onToggleSavePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(saveScale, { toValue: 0.8, useNativeDriver: true, speed: 50, bounciness: 4 }),
      Animated.spring(saveScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }),
    ]).start();
    onToggleSaved(job.id);
  }, [job.id, onToggleSaved, saveScale]);

  const onApplyPress = useCallback(() => {
    if (applied) return;
    Animated.sequence([
      Animated.spring(applyScale, { toValue: 0.95, useNativeDriver: true, speed: 50, bounciness: 4 }),
      Animated.spring(applyScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 10 }),
    ]).start();
    setApplied(true);
  }, [applied, applyScale]);

  const mColor = matchColor(job.compatibilityScore);

  return (
    <View style={[styles.page, { height: cardHeight }]}>
      {/* Full-bleed background */}
      <ImageBackground
        source={{ uri: job.bgImage }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[job.gradient[0], job.gradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { opacity: 0.55 }]}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* ─── Glass card ─── */}
      <View style={[styles.cardOuter, { paddingTop: topOffset + spacing.sm }]}>
        <Pressable style={[styles.card, { backgroundColor: c.bg }]} onPress={onCardPress}>
          <View style={[styles.cardContent, { paddingBottom: bottomOffset + spacing.sm }]}>

            {/* Company + Match */}
            <View style={styles.headerRow}>
              <View style={[styles.logoWrap, { backgroundColor: c.logoBg }]}>
                <Image source={{ uri: job.logoImage }} style={styles.logo} resizeMode="contain" />
              </View>
              <View style={styles.companyWrap}>
                <Text style={[styles.company, { fontSize: fs.company, color: c.text }]}>{job.company}</Text>
              </View>
              <View style={[styles.matchPill, { borderColor: mColor, backgroundColor: c.matchBg }]}>
                <View style={[styles.matchDot, { backgroundColor: mColor }]} />
                <Text style={[styles.matchText, { fontSize: fs.matchScore, color: c.text }]}>
                  {job.compatibilityScore}%
                </Text>
              </View>
            </View>

            {/* Title */}
            <Text style={[styles.title, { fontSize: fs.title, lineHeight: fs.titleLineHeight, color: c.text }]}>
              {job.title}
            </Text>

            {/* Salary */}
            <Text style={[styles.salary, { fontSize: fs.salary, color: c.accentText }]}>
              {job.salary}
            </Text>

            {/* Location */}
            <Text style={[styles.locationText, { fontSize: fs.locationText, color: c.textSecondary }]}>
              {job.location} · {job.type}
            </Text>

            {/* Description */}
            <Text
              style={[styles.descriptionText, { fontSize: fs.description, lineHeight: fs.descriptionLineHeight, color: c.textMuted }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {job.description}
            </Text>

            {/* Spacer */}
            <View style={styles.spacer} />

            {/* Info strip */}
            <View style={[styles.infoRow, { backgroundColor: c.infoBg, borderColor: c.infoBorder }]}>
              <View style={styles.infoCell}>
                <Ionicons name="briefcase-outline" size={14} color={c.accent} />
                <Text style={[styles.infoLabel, { fontSize: fs.infoLabel, color: c.textMuted }]}>Experience</Text>
                <Text style={[styles.infoValue, { fontSize: fs.infoValue, color: c.text }]}>{job.experience}</Text>
              </View>
              <View style={[styles.infoDivider, { backgroundColor: c.infoDivider }]} />
              <View style={styles.infoCell}>
                <Ionicons name="calendar-outline" size={14} color={c.accent} />
                <Text style={[styles.infoLabel, { fontSize: fs.infoLabel, color: c.textMuted }]}>Schedule</Text>
                <Text style={[styles.infoValue, { fontSize: fs.infoValue, color: c.text }]}>{job.schedule}</Text>
              </View>
              <View style={[styles.infoDivider, { backgroundColor: c.infoDivider }]} />
              <View style={styles.infoCell}>
                <Ionicons name="map-outline" size={14} color={c.accent} />
                <Text style={[styles.infoLabel, { fontSize: fs.infoLabel, color: c.textMuted }]}>Type</Text>
                <Text style={[styles.infoValue, { fontSize: fs.infoValue, color: c.text }]}>{job.workType}</Text>
              </View>
            </View>

            {/* Benefits */}
            <View style={styles.benefitsRow}>
              {job.benefits.slice(0, 4).map((benefit) => (
                <View key={benefit} style={[styles.benefitPill, { backgroundColor: c.pillBg, borderColor: c.pillBorder }]}>
                  <Ionicons name="checkmark-circle" size={12} color={c.accent} />
                  <Text style={[styles.benefitText, { fontSize: fs.benefitText, color: c.pillText }]}>{benefit}</Text>
                </View>
              ))}
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <Animated.View style={{ transform: [{ scale: saveScale }] }}>
                <Pressable
                  style={[
                    styles.bookmarkButton,
                    { backgroundColor: c.bookmarkBg, borderColor: c.bookmarkBorder },
                    isSaved && styles.bookmarkButtonSaved,
                  ]}
                  onPress={onToggleSavePress}
                >
                  <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={isSaved ? "#0B1220" : c.bookmarkIcon}
                  />
                </Pressable>
              </Animated.View>

              <Animated.View style={[styles.applyButtonWrap, { transform: [{ scale: applyScale }] }]}>
                <Pressable
                  style={applied ? styles.applyButtonApplied : styles.applyButton}
                  onPress={onApplyPress}
                >
                  {applied ? (
                    <View style={styles.appliedInner}>
                      <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                      <Text style={[styles.appliedText, { fontSize: fs.applyText }]}>Applied!</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={["#00E5FF", "#0891B2"]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.applyGradient}
                    >
                      <Ionicons name="flash" size={18} color={c.applyText} />
                      <Text style={[styles.applyText, { fontSize: fs.applyText, color: c.applyText }]}>Apply Instantly</Text>
                    </LinearGradient>
                  )}
                </Pressable>
              </Animated.View>
            </View>

            <Text style={[styles.hintText, { fontSize: fs.hintText, color: c.hintText }]}>
              No resume needed · 1-tap apply
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  page: {
    width: "100%",
    backgroundColor: colors.bg,
  },
  cardOuter: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.md,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.sm,
  },

  // ─── Header ───
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    padding: 6,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  companyWrap: {
    flex: 1,
  },
  company: {
    fontWeight: "700",
  },

  // ─── Match pill ───
  matchPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 2,
  },
  matchDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
  },
  matchText: {
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  // ─── Title + salary ───
  title: {
    fontWeight: "900",
    letterSpacing: -1,
  },
  salary: {
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  // ─── Location ───
  locationText: {
    fontWeight: "500",
  },

  // ─── Description ───
  descriptionText: {
    fontWeight: "400",
  },

  // ─── Info strip ───
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
  },
  infoCell: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  infoDivider: {
    width: 1,
    height: 28,
  },
  infoLabel: {
    fontWeight: "500",
    marginTop: 2,
  },
  infoValue: {
    fontWeight: "700",
  },

  // ─── Benefits ───
  benefitsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  benefitPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  benefitText: {
    fontWeight: "600",
  },

  // ─── Actions ───
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  bookmarkButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  bookmarkButtonSaved: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  applyButtonWrap: {
    flex: 1,
  },
  applyButton: {
    height: 48,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  applyButtonApplied: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: "rgba(220, 252, 231, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  appliedInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  appliedText: {
    color: "#166534",
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  applyGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  applyText: {
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  // ─── Hint ───
  hintText: {
    fontWeight: "500",
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
