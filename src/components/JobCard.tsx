import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import {
  getFontScale,
  radius,
  shadows,
  spacing,
} from "../constants/theme";
import { Job } from "../types/models";
import { clamp } from "../utils/math";
import { MatchScoreRing } from "./MatchScoreRing";

interface JobCardProps {
  job: Job;
  cardHeight: number;
  topOffset: number;
  bottomOffset: number;
  isSaved: boolean;
  onToggleSaved: (jobId: string) => void;
  onExpand?: (job: Job) => void;
  mode?: "light" | "dark";
  isVisible?: boolean;
}

// ─── Mode-aware colors ──────────────────────────────────────────────────────
// A solid tinted overlay sits between the image and all content,
// guaranteeing text contrast without per-element hacks.
const overlayColors = {
  dark: {
    pageBg: "#0B1220",
    overlay: "rgba(11, 18, 32, 0.45)",
    topVignette: ["rgba(0,0,0,0.4)", "transparent"] as [string, string],
    ringBg: "rgba(0,0,0,0.4)",
    ringBorder: "rgba(255,255,255,0.1)",
    title: "#FFFFFF",
    subtitle: "rgba(255,255,255,0.8)",
    accent: "#22D3EE",
    body: "rgba(255,255,255,0.88)",
    muted: "rgba(255,255,255,0.65)",
    icon: "rgba(6, 182, 212, 0.7)",
    divider: "rgba(255,255,255,0.1)",
    pillBg: "rgba(255,255,255,0.08)",
    pillBorder: "rgba(255,255,255,0.06)",
    saveBg: "rgba(255,255,255,0.12)",
    saveBorder: "rgba(255,255,255,0.1)",
    saveIcon: "#FFFFFF",
    expandBg: "rgba(255,255,255,0.08)",
    expandBorder: "rgba(255,255,255,0.06)",
    expandIcon: "rgba(255,255,255,0.8)",
    stripBg: "rgba(255,255,255,0.12)",
    infoLabel: "rgba(255,255,255,0.4)",
    infoValue: "#FFFFFF",
    infoIcon: "rgba(255,255,255,0.8)",
  },
  light: {
    pageBg: "#F5FAFC",
    overlay: "rgba(255, 255, 255, 0.75)",
    topVignette: ["rgba(255,255,255,0.3)", "transparent"] as [string, string],
    ringBg: "rgba(255,255,255,0.7)",
    ringBorder: "rgba(0,0,0,0.08)",
    title: "#171D1E",
    subtitle: "#3D494C",
    accent: "#00687A",
    body: "#3D494C",
    muted: "rgba(0,0,0,0.4)",
    icon: "#00687A",
    divider: "rgba(0,0,0,0.1)",
    pillBg: "rgba(0, 104, 122, 0.08)",
    pillBorder: "rgba(0, 104, 122, 0.12)",
    saveBg: "rgba(0,0,0,0.06)",
    saveBorder: "rgba(0,0,0,0.1)",
    saveIcon: "#3D494C",
    expandBg: "rgba(0,0,0,0.05)",
    expandBorder: "rgba(0,0,0,0.08)",
    expandIcon: "#3D494C",
    stripBg: "#FFFFFF",
    infoLabel: "rgba(0,0,0,0.45)",
    infoValue: "#171D1E",
    infoIcon: "rgba(0,0,0,0.6)",
  },
} as const;

export const JobCard = memo(function JobCard({
  job,
  cardHeight,
  topOffset,
  bottomOffset,
  isSaved,
  onToggleSaved,
  onExpand,
  mode = "dark",
  isVisible = false,
}: JobCardProps) {
  const { width, height } = useWindowDimensions();
  const [applied, setApplied] = useState(false);
  const applyScale = useRef(new Animated.Value(1)).current;
  const saveScale = useRef(new Animated.Value(1)).current;

  const c = overlayColors[mode];
  const fontScale = useMemo(() => getFontScale(width), [width]);

  const fs = useMemo(
    () => ({
      title: Math.round(32 * fontScale),
      titleLineHeight: Math.round(36 * fontScale),
      company: Math.round(13 * fontScale),
      tagline: Math.round(14 * fontScale),
      salary: Math.round(20 * fontScale),
      highlight: Math.round(15 * fontScale),
      meta: Math.round(13 * fontScale),
      apply: Math.round(16 * fontScale),
      location: Math.round(12 * fontScale),
    }),
    [fontScale],
  );

  // ─── Handlers ───────────────────────────────────────────────────────
  const longPressedRef = useRef(false);

  const onCardPress = useCallback(() => {
    if (longPressedRef.current) {
      longPressedRef.current = false;
      return;
    }
    onExpand?.(job);
  }, [job, onExpand]);

  const onCardLongPress = useCallback(() => {
    longPressedRef.current = true;
  }, []);

  const onToggleSavePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(saveScale, {
        toValue: 0.75,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.spring(saveScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 14,
      }),
    ]).start();
    onToggleSaved(job.id);
  }, [job.id, onToggleSaved, saveScale]);

  const onApplyPress = useCallback(() => {
    if (applied) return;
    Animated.sequence([
      Animated.spring(applyScale, {
        toValue: 0.94,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.spring(applyScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 12,
      }),
    ]).start();
    setApplied(true);
  }, [applied, applyScale]);

  return (
    <View
      style={[
        styles.page,
        { height: cardHeight, backgroundColor: c.pageBg },
      ]}
    >
      {/* ─── Layer 1: Background image ─── */}
      <ImageBackground
        source={{ uri: job.bgImage }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* ─── Layer 2: Gradient color wash ─── */}
      <LinearGradient
        colors={[job.gradient[0], job.gradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { opacity: 0.4 }]}
      />

      {/* ─── Layer 3: Solid tinted overlay — guarantees text contrast ─── */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: c.overlay }]} />

      {/* ─── Layer 4: Top vignette for status bar ─── */}
      <LinearGradient
        colors={c.topVignette}
        style={styles.topVignette}
      />

      {/* ─── Content — floating over imagery ─── */}
      <Pressable
        style={[
          styles.contentLayer,
          { paddingTop: topOffset, paddingBottom: bottomOffset },
        ]}
        onPress={onCardPress}
        onLongPress={onCardLongPress}
        delayLongPress={300}
      >
        {/* ═══ Top zone ═══ */}
        <View style={styles.topZone}>
          {/* Company identity */}
          <View style={styles.companyRow}>
            <View style={styles.logoWrap}>
              <Image source={{ uri: job.logoImage }} style={styles.logo} contentFit="contain" />
            </View>
            <Text style={[styles.companyName, { fontSize: fs.company, color: c.title }]} numberOfLines={1}>
              {job.company}
            </Text>
            <View style={[styles.companyDot, { backgroundColor: c.muted }]} />
            <Text style={[styles.companyLocation, { fontSize: fs.location, color: c.subtitle }]}>
              {job.location}
            </Text>
          </View>

          {/* Job title + Match ring row */}
          <View style={styles.titleMatchRow}>
            <Text
              style={[styles.title, styles.titleFlex, { fontSize: fs.title, lineHeight: fs.titleLineHeight, color: c.title }]}
              numberOfLines={2}
            >
              {job.title}
            </Text>
            <View style={[styles.matchRingBg, { backgroundColor: c.ringBg, borderColor: c.ringBorder }]}>
              <MatchScoreRing
                score={job.compatibilityScore}
                size={72}
                strokeWidth={4}
                mode={mode}
                labelStyle="short"
                isVisible={isVisible}
              />
            </View>
          </View>

          {/* Tagline */}
          {job.tagline ? (
            <Text style={[styles.tagline, { fontSize: fs.tagline, color: c.subtitle }]} numberOfLines={1}>
              {job.tagline}
            </Text>
          ) : null}

          {/* Salary + type */}
          <View style={styles.salaryRow}>
            <Text style={[styles.salary, { fontSize: fs.salary, color: c.accent }]}>
              {job.salary}
            </Text>
            <View style={[styles.typePill, { backgroundColor: c.pillBg, borderColor: c.pillBorder }]}>
              <Text style={[styles.typeText, { fontSize: fs.meta, color: c.body }]}>
                {job.type}
              </Text>
            </View>
          </View>
        </View>

        {/* ═══ Spacer ═══ */}
        <View style={styles.spacer} />

        {/* ═══ Bottom zone ═══ */}

        {/* Highlights */}
        <View style={styles.highlights}>
          {job.highlights.map((item) => (
            <View key={item} style={styles.highlightRow}>
              <View style={[styles.highlightLine, { backgroundColor: c.icon }]} />
              <Text style={[styles.highlightText, { fontSize: fs.highlight, color: c.body }]} numberOfLines={1}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Benefits */}
        <View style={styles.benefitsRow}>
          {job.benefits.slice(0, 3).map((b) => (
            <View key={b} style={[styles.benefitPill, { backgroundColor: c.pillBg, borderColor: c.pillBorder }]}>
              <Ionicons name="checkmark-circle" size={12} color={c.infoIcon} />
              <Text style={[styles.benefitText, { fontSize: fs.meta, color: c.body }]} numberOfLines={1}>
                {b}
              </Text>
            </View>
          ))}
        </View>

        {/* Info strip */}
        <View style={[styles.infoStrip, { backgroundColor: c.stripBg }]}>
          <View style={styles.infoCell}>
            <Ionicons name="briefcase-outline" size={18} color={c.infoIcon} />
            <Text style={[styles.infoLabel, { fontSize: fs.meta, color: c.infoLabel }]}>Experience</Text>
            <Text style={[styles.infoValue, { fontSize: fs.highlight, color: c.infoValue }]}>{job.experience}</Text>
          </View>
          <View style={[styles.infoDivider, { backgroundColor: c.divider }]} />
          <View style={styles.infoCell}>
            <Ionicons name="calendar-outline" size={18} color={c.infoIcon} />
            <Text style={[styles.infoLabel, { fontSize: fs.meta, color: c.infoLabel }]}>Schedule</Text>
            <Text style={[styles.infoValue, { fontSize: fs.highlight, color: c.infoValue }]}>{job.schedule}</Text>
          </View>
          <View style={[styles.infoDivider, { backgroundColor: c.divider }]} />
          <View style={styles.infoCell}>
            <Ionicons name="location-outline" size={18} color={c.infoIcon} />
            <Text style={[styles.infoLabel, { fontSize: fs.meta, color: c.infoLabel }]}>Type</Text>
            <Text style={[styles.infoValue, { fontSize: fs.highlight, color: c.infoValue }]}>{job.workType}</Text>
          </View>
        </View>

        {/* Action bar */}
        <View style={styles.actionBar}>
          <Animated.View style={{ transform: [{ scale: saveScale }] }}>
            <Pressable
              style={[styles.saveButton, isSaved ? styles.saveButtonActive : { backgroundColor: c.saveBg, borderColor: c.saveBorder }]}
              onPress={onToggleSavePress}
              hitSlop={8}
            >
              {isSaved ? (
                <LinearGradient
                  colors={["#00687A", "#06B6D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.saveGradient}
                >
                  <Ionicons name="bookmark" size={22} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <Ionicons name="bookmark-outline" size={22} color={c.saveIcon} />
              )}
            </Pressable>
          </Animated.View>

          <Animated.View style={[styles.applyWrap, { transform: [{ scale: applyScale }] }]}>
            <Pressable style={applied ? styles.applyDone : styles.applyButton} onPress={onApplyPress}>
              {applied ? (
                <View style={styles.appliedInner}>
                  <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                  <Text style={[styles.appliedText, { fontSize: fs.apply }]}>Applied</Text>
                </View>
              ) : (
                <LinearGradient
                  colors={["#00687A", "#06B6D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.applyGradient}
                >
                  <Ionicons name="flash" size={17} color="#FFFFFF" />
                  <Text style={[styles.applyText, { fontSize: fs.apply }]}>Apply Now</Text>
                </LinearGradient>
              )}
            </Pressable>
          </Animated.View>

          <Pressable
            style={[styles.expandButton, { backgroundColor: c.expandBg, borderColor: c.expandBorder }]}
            onPress={onCardPress}
            hitSlop={8}
          >
            <Ionicons name="chevron-up" size={20} color={c.expandIcon} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
});

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: { width: "100%", overflow: "hidden" },
  topVignette: { position: "absolute", top: 0, left: 0, right: 0, height: 140 },

  titleMatchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 2,
  },
  titleFlex: {
    flex: 1,
  },
  matchRingBg: {
    width: 80, height: 80,
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contentLayer: { flex: 1, paddingHorizontal: spacing.xl },
  topZone: {},
  spacer: { flex: 1, minHeight: spacing.xl },

  companyRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.xs },
  logoWrap: { width: 32, height: 32, borderRadius: radius.pill, backgroundColor: "rgba(255,255,255,0.95)", padding: 4 },
  logo: { width: "100%", height: "100%", borderRadius: radius.pill },
  companyName: { fontWeight: "700", letterSpacing: -0.1 },
  companyDot: { width: 3, height: 3, borderRadius: 2 },
  companyLocation: { fontWeight: "500" },

  title: { fontWeight: "900", letterSpacing: -1.5, marginBottom: 2 },
  tagline: { fontWeight: "400", fontStyle: "italic", letterSpacing: 0.2, marginBottom: spacing.sm },

  salaryRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  salary: { fontWeight: "800", letterSpacing: -0.4 },
  typePill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, borderWidth: 1 },
  typeText: { fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.8 },

  highlights: { gap: 7, marginBottom: spacing.lg },
  highlightRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  highlightLine: { width: 16, height: 1.5, borderRadius: 1 },
  highlightText: { flex: 1, fontWeight: "400", letterSpacing: 0 },

  benefitsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: spacing.lg },
  benefitPill: {
    flexDirection: "row", alignItems: "center", gap: 5,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: radius.pill, borderWidth: 1,
  },
  benefitText: { fontWeight: "600" },

  infoStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xxl,
  },
  infoCell: { flex: 1, alignItems: "center", gap: 4 },
  infoLabel: { fontWeight: "500", letterSpacing: 0.2 },
  infoValue: { fontWeight: "700", letterSpacing: -0.2 },
  infoDivider: { width: 1, height: 32 },

  actionBar: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  saveButton: { width: 52, height: 52, borderRadius: radius.pill, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  saveButtonActive: { overflow: "hidden", borderWidth: 0 },
  saveGradient: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  applyWrap: { flex: 1 },
  applyButton: { height: 52, borderRadius: radius.pill, overflow: "hidden", ...shadows.glow },
  applyDone: {
    height: 52, borderRadius: radius.pill,
    backgroundColor: "rgba(34, 197, 94, 0.15)", borderWidth: 1, borderColor: "rgba(34, 197, 94, 0.3)",
    justifyContent: "center", alignItems: "center",
  },
  appliedInner: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  appliedText: { color: "#22C55E", fontWeight: "800", letterSpacing: -0.3 },
  applyGradient: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.sm },
  applyText: { fontWeight: "800", letterSpacing: -0.2, color: "#FFFFFF" },
  expandButton: { width: 44, height: 52, borderRadius: radius.pill, justifyContent: "center", alignItems: "center", borderWidth: 1 },
});
