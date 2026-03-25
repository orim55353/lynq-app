import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  ImageBackground,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, shadows, spacing } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
import { Job } from "../types/models";
import { matchColor, matchDescription, matchLabel } from "../utils/match";
import { MatchScoreRing } from "./MatchScoreRing";

// ─── Props ──────────────────────────────────────────────────────────────────

interface ExpandedJobCardProps {
  job: Job;
  visible: boolean;
  isSaved: boolean;
  cardTopY: number;
  onToggleSaved: (jobId: string) => void;
  onClose: () => void;
  onGoToChat?: () => void;
}

const DISMISS_THRESHOLD = 100;

// ─── Mode-aware palette ─────────────────────────────────────────────────────
const palette = {
  dark: {
    blurTint: "rgba(11, 18, 32, 0.25)",
    dragPill: "rgba(255,255,255,0.3)",
    closeBg: "rgba(255,255,255,0.1)",
    closeBorder: "rgba(255,255,255,0.08)",
    closeIcon: "rgba(255,255,255,0.8)",
    company: "#FFFFFF",
    matchPillBg: "rgba(255,255,255,0.1)",
    matchPillBorder: "rgba(255,255,255,0.08)",
    matchText: "#FFFFFF",
    title: "#FFFFFF",
    tagline: "rgba(255,255,255,0.8)",
    salary: "#22D3EE",
    locationDot: "rgba(255,255,255,0.3)",
    location: "rgba(255,255,255,0.65)",
    cardBg: "rgba(255,255,255,0.10)",
    cardBorder: "rgba(255,255,255,0.08)",
    scoreText: "#FFFFFF",
    stripBg: "rgba(255,255,255,0.10)",
    infoLabel: "rgba(255,255,255,0.4)",
    infoValue: "#FFFFFF",
    infoIcon: "rgba(255,255,255,0.8)",
    divider: "rgba(255,255,255,0.08)",
    sectionTitle: "#FFFFFF",
    body: "rgba(255,255,255,0.88)",
    accentIcon: "rgba(255,255,255,0.8)",
    bulletLine: "rgba(255,255,255,0.5)",
    bulletText: "rgba(255,255,255,0.88)",
    benefitBg: "rgba(255,255,255,0.10)",
    benefitBorder: "rgba(255,255,255,0.10)",
    benefitText: "rgba(255,255,255,0.88)",
    stickyBg: "rgba(0,0,0,0.7)",
    poweredBy: "rgba(255,255,255,0.85)",
    saveBg: "rgba(255,255,255,0.12)",
    saveBorder: "rgba(255,255,255,0.1)",
    saveIcon: "#FFFFFF",
  },
  light: {
    // Renders over a background image — white text is always more readable
    // than dark text on a variable-contrast photo background.
    blurTint: "rgba(255, 255, 255, 0.12)",
    dragPill: "rgba(255,255,255,0.35)",
    closeBg: "rgba(255,255,255,0.15)",
    closeBorder: "rgba(255,255,255,0.1)",
    closeIcon: "#FFFFFF",
    company: "#FFFFFF",
    matchPillBg: "rgba(255,255,255,0.12)",
    matchPillBorder: "rgba(255,255,255,0.1)",
    matchText: "#FFFFFF",
    title: "#FFFFFF",
    tagline: "rgba(255,255,255,0.85)",
    salary: "#22D3EE",
    locationDot: "rgba(255,255,255,0.3)",
    location: "rgba(255,255,255,0.8)",
    cardBg: "rgba(255,255,255,0.12)",
    cardBorder: "rgba(255,255,255,0.1)",
    scoreText: "#FFFFFF",
    stripBg: "rgba(255,255,255,0.12)",
    infoLabel: "rgba(255,255,255,0.5)",
    infoValue: "#FFFFFF",
    infoIcon: "rgba(255,255,255,0.95)",
    divider: "rgba(255,255,255,0.12)",
    sectionTitle: "#FFFFFF",
    body: "rgba(255,255,255,0.9)",
    accentIcon: "rgba(6, 182, 212, 0.85)",
    bulletLine: "rgba(255,255,255,0.5)",
    bulletText: "rgba(255,255,255,0.9)",
    benefitBg: "rgba(255,255,255,0.1)",
    benefitBorder: "rgba(255,255,255,0.1)",
    benefitText: "rgba(255,255,255,0.9)",
    poweredBy: "rgba(255,255,255,0.85)",
    stickyBg: "rgba(0,0,0,0.55)",
    saveBg: "rgba(255,255,255,0.15)",
    saveBorder: "rgba(255,255,255,0.12)",
    saveIcon: "#FFFFFF",
  },
} as const;

// ─── Component ──────────────────────────────────────────────────────────────

export function ExpandedJobCard({
  job,
  visible,
  isSaved,
  cardTopY,
  onToggleSaved,
  onClose,
  onGoToChat,
}: ExpandedJobCardProps) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { mode } = useTheme();
  const [applied, setApplied] = useState(false);

  const p = palette[mode];

  // ─── Animation values (all native-driven) ──────────────────────────
  const slideY = useRef(new Animated.Value(cardTopY)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (visible) {
      setApplied(false);
      setExpanded(false);
      slideY.setValue(cardTopY);
      dragY.setValue(0);
      backdropOpacity.setValue(0);
      contentOpacity.setValue(0);
      headerOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(slideY, {
          toValue: 0,
          tension: 50,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(true));
    }
  }, [
    visible,
    cardTopY,
    slideY,
    dragY,
    backdropOpacity,
    contentOpacity,
    headerOpacity,
  ]);

  const animateClose = useCallback(() => {
    setExpanded(false);
    // Header disappears immediately so it doesn't ride the sheet down
    headerOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(slideY, {
        toValue: cardTopY,
        tension: 65,
        friction: 12,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }, [
    slideY,
    cardTopY,
    contentOpacity,
    headerOpacity,
    backdropOpacity,
    onClose,
  ]);

  // ─── Drag to dismiss ──────────────────────────────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) =>
        g.dy > 8 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) dragY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_THRESHOLD || (g.dy > 40 && g.vy > 0.5)) {
          animateClose();
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            tension: 200,
            friction: 20,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragY, {
          toValue: 0,
          tension: 200,
          friction: 20,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const handleApply = useCallback(() => {
    if (!applied) setApplied(true);
  }, [applied]);

  const handleToggleSave = useCallback(() => {
    onToggleSaved(job.id);
  }, [job.id, onToggleSaved]);

  // ─── Interpolations ───────────────────────────────────────────────
  const translateY = Animated.add(slideY, dragY);

  // ─── Render ───────────────────────────────────────────────────────
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={animateClose}
    >
      {/* Darkened backdrop */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0,0,0,0.6)", opacity: backdropOpacity },
        ]}
      />

      {/* Background image — persists from preview card */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: backdropOpacity }]}
        pointerEvents="none"
      >
        <ImageBackground
          source={{ uri: job.bgImage }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[job.gradient[0], job.gradient[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { opacity: 0.4 }]}
        />
        <BlurView
          intensity={Platform.OS === "ios" ? 25 : 40}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: p.blurTint }]}
        />
      </Animated.View>

      {/* ─── Expanding sheet ─── */}
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
            borderTopLeftRadius: expanded ? 0 : radius.xxl,
            borderTopRightRadius: expanded ? 0 : radius.xxl,
          },
        ]}
      >
        {/* Drag handle + header — fades out instantly on close */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.dragArea,
            { paddingTop: insets.top, opacity: headerOpacity },
          ]}
        >
          <View style={[styles.dragPill, { backgroundColor: p.dragPill }]} />

          {/* Glass header bar */}
          <View style={styles.header}>
            <Pressable
              onPress={animateClose}
              style={[
                styles.closeBtn,
                { backgroundColor: p.closeBg, borderColor: p.closeBorder },
              ]}
              hitSlop={12}
            >
              <Ionicons name="chevron-down" size={22} color={p.closeIcon} />
            </Pressable>

            <View style={styles.headerCenter}>
              <View style={styles.headerLogo}>
                <Image
                  source={{ uri: job.logoImage }}
                  style={styles.headerLogoImg}
                  contentFit="contain"
                />
              </View>
              <Text
                style={[styles.headerCompany, { color: p.company }]}
                numberOfLines={1}
              >
                {job.company}
              </Text>
            </View>

            <MatchScoreRing
              score={job.compatibilityScore}
              size={36}
              strokeWidth={3}
              mode={mode}
              animated={false}
              labelStyle="none"
            />
          </View>
        </Animated.View>

        {/* ─── Scrollable content ─── */}
        <Animated.View
          style={[styles.contentWrap, { opacity: contentOpacity }]}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero section */}
            {/* ─── Job Info Card ─── */}
            <View
              style={[
                styles.jobInfoCard,
                { backgroundColor: p.cardBg, borderColor: p.cardBorder },
              ]}
            >
              <Text style={[styles.title, { color: p.sectionTitle }]}>
                {job.title}
              </Text>

              {job.tagline ? (
                <Text style={[styles.tagline, { color: p.body }]}>
                  {job.tagline}
                </Text>
              ) : null}

              <View style={styles.salaryLocationRow}>
                <Text style={[styles.salary, { color: p.salary }]}>
                  {job.salary}
                </Text>
                <Text style={[styles.locationDot, { color: p.divider }]}>
                  {"\u00B7"}
                </Text>
                <Text style={[styles.location, { color: p.body }]}>
                  {job.location} {"\u00B7"} {job.type}
                </Text>
              </View>
            </View>

            {/* ─── Match Hero ─── */}
            <View
              style={[
                styles.matchHero,
                { backgroundColor: p.cardBg, borderColor: p.cardBorder },
              ]}
            >
              <MatchScoreRing
                score={job.compatibilityScore}
                size={110}
                strokeWidth={6}
                mode={mode}
                labelStyle="short"
              />
              <View style={styles.matchHeroText}>
                <Text
                  style={[styles.matchHeroTitle, { color: p.sectionTitle }]}
                >
                  התאמה {matchLabel(job.compatibilityScore)}!
                </Text>
                <Text style={[styles.matchHeroBody, { color: p.body }]}>
                  {matchDescription(job.compatibilityScore)}
                </Text>
              </View>
              <LinearGradient
                colors={[matchColor(job.compatibilityScore), "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.matchHeroAccent}
              />
            </View>

            {/* ─── AI Explanation ─── */}
            {job.matchExplanation && (
              <View
                style={[
                  styles.aiCard,
                  { backgroundColor: p.cardBg, borderColor: p.cardBorder },
                ]}
              >
                <View style={styles.aiHeader}>
                  <Ionicons name="sparkles" size={14} color={p.accentIcon} />
                  <Text
                    style={[styles.aiHeaderText, { color: p.sectionTitle }]}
                  >
                    למה הציון הזה?
                  </Text>
                </View>
                <Text style={[styles.aiBody, { color: p.body }]}>
                  {job.matchExplanation}
                </Text>
                <Text style={[styles.aiFooter, { color: p.poweredBy }]}>
                  מופעל על ידי Jobli HI
                </Text>
              </View>
            )}

            {/* Info strip */}
            <View style={[styles.infoStrip, { backgroundColor: p.stripBg }]}>
              <InfoCell
                icon="briefcase-outline"
                label="ניסיון"
                value={job.experience}
                labelColor={p.infoLabel}
                valueColor={p.infoValue}
                iconColor={p.infoIcon}
              />
              <View
                style={[styles.infoDivider, { backgroundColor: p.divider }]}
              />
              <InfoCell
                icon="calendar-outline"
                label="לוח זמנים"
                value={job.schedule}
                labelColor={p.infoLabel}
                valueColor={p.infoValue}
                iconColor={p.infoIcon}
              />
              <View
                style={[styles.infoDivider, { backgroundColor: p.divider }]}
              />
              <InfoCell
                icon="location-outline"
                label="סוג עבודה"
                value={job.workType}
                labelColor={p.infoLabel}
                valueColor={p.infoValue}
                iconColor={p.infoIcon}
              />
            </View>

            {/* About this role */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: p.sectionTitle }]}>
                על התפקיד
              </Text>
              <Text style={[styles.body, { color: p.body }]}>
                {job.description}
              </Text>
            </View>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: p.sectionTitle }]}>
                  מה תעשו
                </Text>
                {job.responsibilities.map((item, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <View
                      style={[
                        styles.bulletLine,
                        { backgroundColor: p.bulletLine },
                      ]}
                    />
                    <Text style={[styles.bulletText, { color: p.bulletText }]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: p.sectionTitle }]}>
                  דרישות
                </Text>
                {job.requirements.map((item, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={p.accentIcon}
                    />
                    <Text style={[styles.bulletText, { color: p.bulletText }]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Benefits */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: p.sectionTitle }]}>
                הטבות
              </Text>
              <View style={styles.benefitsWrap}>
                {job.benefits.map((b) => (
                  <View
                    key={b}
                    style={[
                      styles.benefitPill,
                      {
                        backgroundColor: p.benefitBg,
                        borderColor: p.benefitBorder,
                      },
                    ]}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={13}
                      color={p.accentIcon}
                    />
                    <Text
                      style={[styles.benefitText, { color: p.benefitText }]}
                    >
                      {b}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Company about */}
            {job.companyAbout && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: p.sectionTitle }]}>
                  אודות {job.company}
                </Text>
                <Text style={[styles.body, { color: p.body }]}>
                  {job.companyAbout}
                </Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>

        {/* ─── Sticky action bar ─── */}
        <Animated.View
          style={[
            styles.stickyBar,
            {
              paddingBottom: Math.max(insets.bottom, spacing.xl),
              opacity: contentOpacity,
            },
          ]}
        >
          <View style={[styles.stickyBarBg, { backgroundColor: p.stickyBg }]} />

          <View style={styles.stickyBarContent}>
            {onGoToChat != null ? (
              <Pressable
                style={[styles.applyBtn, shadows.glow]}
                onPress={onGoToChat}
              >
                <LinearGradient
                  colors={["#00687A", "#06B6D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.applyGrad}
                >
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.applyBtnText}>מעבר לצ׳אט</Text>
                </LinearGradient>
              </Pressable>
            ) : (
              <>
                <Pressable
                  style={[
                    styles.bookmarkBtn,
                    { backgroundColor: p.saveBg, borderColor: p.saveBorder },
                    isSaved && styles.bookmarkSaved,
                  ]}
                  onPress={handleToggleSave}
                  hitSlop={8}
                >
                  <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color={isSaved ? "#171D1E" : p.saveIcon}
                  />
                </Pressable>

                <Pressable
                  style={
                    applied
                      ? styles.applyBtnDone
                      : [styles.applyBtn, shadows.glow]
                  }
                  onPress={handleApply}
                >
                  {applied ? (
                    <View style={styles.appliedRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#22C55E"
                      />
                      <Text style={styles.appliedText}>הוגשה מועמדות</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={["#00687A", "#06B6D4"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.applyGrad}
                    >
                      <Ionicons name="flash" size={18} color="#FFFFFF" />
                      <Text style={styles.applyBtnText}>הגשת מועמדות</Text>
                    </LinearGradient>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// ─── Info cell sub-component ────────────────────────────────────────────────

function InfoCell({
  icon,
  label,
  value,
  labelColor,
  valueColor,
  iconColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
  iconColor: string;
}) {
  return (
    <View style={styles.infoCell}>
      <Ionicons name={icon} size={16} color={iconColor} />
      <Text style={[styles.infoLabel, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
  },

  // ─── Drag area + header ───────────────────────────────────────────
  dragArea: {},
  dragPill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerLogo: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 3,
  },
  headerLogoImg: {
    width: "100%",
    height: "100%",
    borderRadius: radius.pill,
  },
  headerCompany: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    letterSpacing: -0.2,
    textAlign: "right",
  },
  // ─── Scrollable content ───────────────────────────────────────────
  contentWrap: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },

  jobInfoCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -1.4,
    lineHeight: 33,
    marginBottom: spacing.xs,
    textAlign: "right",
  },
  tagline: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
    letterSpacing: 0.2,
    marginBottom: spacing.md,
    textAlign: "right",
  },
  salaryLocationRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  salary: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  locationDot: {
    fontSize: 14,
  },
  location: {
    fontSize: 13,
    fontWeight: "500",
  },

  // ─── Match hero ────────────────────────────────────────────────────
  matchHero: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  matchHeroText: {
    flex: 1,
    gap: spacing.xs,
  },
  matchHeroTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.4,
    textAlign: "right",
  },
  matchHeroBody: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "right",
  },
  matchHeroAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },

  // ─── AI explanation ───────────────────────────────────────────────
  aiCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  aiHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  aiHeaderText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  aiBody: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    fontStyle: "italic",
    textAlign: "right",
  },
  aiFooter: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "right",
  },
  infoStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xxxl,
  },
  infoCell: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginTop: 2,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  infoDivider: {
    width: 1,
    height: 28,
  },

  section: {
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.4,
    textAlign: "right",
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "right",
  },

  bulletRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: spacing.sm,
  },
  bulletLine: {
    width: 16,
    height: 1.5,
    borderRadius: 1,
    marginTop: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    textAlign: "right",
  },

  benefitsWrap: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  benefitPill: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  benefitText: {
    fontSize: 13,
    fontWeight: "600",
  },

  // ─── Sticky action bar ────────────────────────────────────────────
  stickyBar: {
    paddingTop: spacing.md,
  },
  stickyBarBg: {
    ...StyleSheet.absoluteFillObject,
  },
  stickyBarContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  bookmarkBtn: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  bookmarkSaved: {
    backgroundColor: "#06B6D4",
    borderColor: "#06B6D4",
  },
  applyBtn: {
    flex: 1,
    height: 52,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  applyBtnDone: {
    flex: 1,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  appliedRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
  },
  appliedText: {
    color: "#22C55E",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: -0.3,
  },
  applyGrad: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
    color: "#FFFFFF",
  },
});
