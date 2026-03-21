import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Image,
  ImageBackground,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  type CardColorScheme,
  cardColors,
  radius,
  spacing,
} from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
import { Job } from "../types/models";

interface ExpandedJobCardProps {
  job: Job;
  visible: boolean;
  isSaved: boolean;
  /** Y position of the glass card's top edge on screen */
  cardTopY: number;
  onToggleSaved: (jobId: string) => void;
  onClose: () => void;
}

function matchColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#94A3B8";
}

const DISMISS_THRESHOLD = 100;

export function ExpandedJobCard({
  job,
  visible,
  isSaved,
  cardTopY,
  onToggleSaved,
  onClose,
}: ExpandedJobCardProps) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { mode } = useTheme();
  const c: CardColorScheme = cardColors[mode];
  const [applied, setApplied] = useState(false);

  // Animation: card top position goes from cardTopY → 0
  const anim = useRef(new Animated.Value(0)).current; // 0 = collapsed, 1 = expanded
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setApplied(false);
      anim.setValue(0);
      contentOpacity.setValue(0);
      dragY.setValue(0);

      // Card expands, then content fades in
      Animated.sequence([
        Animated.spring(anim, {
          toValue: 1,
          tension: 70,
          friction: 13,
          useNativeDriver: false, // need non-native for borderRadius + top
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, anim, contentOpacity, dragY]);

  const animateClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => onClose());
  }, [anim, contentOpacity, onClose]);

  // Drag to dismiss on header
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => g.dy > 8 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) dragY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DISMISS_THRESHOLD || (g.dy > 40 && g.vy > 0.5)) {
          animateClose();
        } else {
          Animated.spring(dragY, { toValue: 0, tension: 200, friction: 20, useNativeDriver: false }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragY, { toValue: 0, tension: 200, friction: 20, useNativeDriver: false }).start();
      },
    }),
  ).current;

  const handleApply = useCallback(() => {
    if (!applied) setApplied(true);
  }, [applied]);

  const handleToggleSave = useCallback(() => {
    onToggleSaved(job.id);
  }, [job.id, onToggleSaved]);

  const mColor = matchColor(job.compatibilityScore);

  // Interpolations
  const cardTop = Animated.add(
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [cardTopY, 0],
    }),
    dragY,
  );

  const cardBorderRadius = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [radius.xxl, 0],
  });

  // Drag makes background slightly dim
  const bgOpacity = anim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0.3, 0.5],
  });

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent onRequestClose={animateClose}>
      {/* Darkened background that fades in with the card expansion */}
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,1)", opacity: bgOpacity }]} />

      {/* Background image shows through */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <ImageBackground source={{ uri: job.bgImage }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <LinearGradient
          colors={[job.gradient[0], job.gradient[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { opacity: 0.5 }]}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.35)" }]} />
      </View>

      {/* Expanding glass card */}
      <Animated.View
        style={[
          styles.card,
          {
            top: cardTop,
            backgroundColor: c.bg,
            borderTopLeftRadius: cardBorderRadius,
            borderTopRightRadius: cardBorderRadius,
          },
        ]}
      >
        {/* Drag handle */}
        <View {...panResponder.panHandlers} style={[styles.dragArea, { paddingTop: insets.top }]}>
          <View style={[styles.dragPill, { backgroundColor: mode === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.15)" }]} />

          {/* Header row */}
          <View style={[styles.header, { borderBottomColor: c.infoDivider }]}>
            <Pressable onPress={animateClose} style={[styles.closeBtn, { backgroundColor: c.pillBg }]} hitSlop={8}>
              <Ionicons name="chevron-down" size={20} color={c.text} />
            </Pressable>
            <View style={styles.headerCenter}>
              <View style={[styles.headerLogo, { backgroundColor: c.logoBg }]}>
                <Image source={{ uri: job.logoImage }} style={styles.headerLogoImg} resizeMode="contain" />
              </View>
              <Text style={[styles.headerCompany, { color: c.text }]} numberOfLines={1}>{job.company}</Text>
            </View>
            <View style={[styles.matchPill, { borderColor: mColor, backgroundColor: c.matchBg }]}>
              <View style={[styles.matchDot, { backgroundColor: mColor }]} />
              <Text style={[styles.matchText, { color: c.text }]}>{job.compatibilityScore}%</Text>
            </View>
          </View>
        </View>

        {/* Scrollable detail content — fades in after card expands */}
        <Animated.View style={[styles.contentWrap, { opacity: contentOpacity }]}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.title, { color: c.text }]}>{job.title}</Text>
            <Text style={[styles.salary, { color: c.accentText }]}>{job.salary}</Text>
            <Text style={[styles.location, { color: c.textSecondary }]}>{job.location} · {job.type}</Text>

            <View style={[styles.divider, { backgroundColor: c.infoDivider }]} />

            <Text style={[styles.sectionTitle, { color: c.text }]}>About this role</Text>
            <Text style={[styles.body, { color: c.textSecondary }]}>{job.description}</Text>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: c.text }]}>What you'll do</Text>
                {job.responsibilities.map((item, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <View style={[styles.bulletDot, { backgroundColor: c.accent }]} />
                    <Text style={[styles.bulletText, { color: c.textSecondary }]}>{item}</Text>
                  </View>
                ))}
              </>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: c.text }]}>Requirements</Text>
                {job.requirements.map((item, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Ionicons name="checkmark-circle" size={16} color={c.accent} />
                    <Text style={[styles.bulletText, { color: c.textSecondary }]}>{item}</Text>
                  </View>
                ))}
              </>
            )}

            <View style={[styles.infoRow, { backgroundColor: c.infoBg, borderColor: c.infoBorder }]}>
              <View style={styles.infoCell}>
                <Ionicons name="briefcase-outline" size={14} color={c.accent} />
                <Text style={[styles.infoLabel, { color: c.textMuted }]}>Experience</Text>
                <Text style={[styles.infoValue, { color: c.text }]}>{job.experience}</Text>
              </View>
              <View style={[styles.infoDividerLine, { backgroundColor: c.infoDivider }]} />
              <View style={styles.infoCell}>
                <Ionicons name="calendar-outline" size={14} color={c.accent} />
                <Text style={[styles.infoLabel, { color: c.textMuted }]}>Schedule</Text>
                <Text style={[styles.infoValue, { color: c.text }]}>{job.schedule}</Text>
              </View>
              <View style={[styles.infoDividerLine, { backgroundColor: c.infoDivider }]} />
              <View style={styles.infoCell}>
                <Ionicons name="map-outline" size={14} color={c.accent} />
                <Text style={[styles.infoLabel, { color: c.textMuted }]}>Type</Text>
                <Text style={[styles.infoValue, { color: c.text }]}>{job.workType}</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: c.text }]}>Benefits</Text>
            <View style={styles.benefitsWrap}>
              {job.benefits.map((b) => (
                <View key={b} style={[styles.benefitPill, { backgroundColor: c.pillBg, borderColor: c.pillBorder }]}>
                  <Ionicons name="checkmark-circle" size={12} color={c.accent} />
                  <Text style={[styles.benefitText, { color: c.pillText }]}>{b}</Text>
                </View>
              ))}
            </View>

            {job.companyAbout && (
              <>
                <Text style={[styles.sectionTitle, { color: c.text }]}>About {job.company}</Text>
                <Text style={[styles.body, { color: c.textSecondary }]}>{job.companyAbout}</Text>
              </>
            )}
          </ScrollView>
        </Animated.View>

        {/* Sticky actions */}
        <Animated.View style={[styles.stickyBar, { backgroundColor: c.bg, borderTopColor: c.infoDivider, paddingBottom: Math.max(insets.bottom, spacing.lg), opacity: contentOpacity }]}>
          <Pressable
            style={[styles.bookmarkBtn, { backgroundColor: c.bookmarkBg, borderColor: c.bookmarkBorder }, isSaved && styles.bookmarkSaved]}
            onPress={handleToggleSave}
          >
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={20} color={isSaved ? "#0B1220" : c.bookmarkIcon} />
          </Pressable>
          <Pressable style={applied ? styles.applyBtnDone : styles.applyBtn} onPress={handleApply}>
            {applied ? (
              <View style={styles.appliedRow}>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                <Text style={styles.appliedText}>Applied!</Text>
              </View>
            ) : (
              <LinearGradient colors={["#00E5FF", "#0891B2"]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.applyGrad}>
                <Ionicons name="flash" size={18} color="#0B1220" />
                <Text style={styles.applyBtnText}>Apply Instantly</Text>
              </LinearGradient>
            )}
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },

  // Drag area (handle + header)
  dragArea: {},
  dragPill: { width: 36, height: 4, borderRadius: 2, alignSelf: "center", marginTop: spacing.sm, marginBottom: spacing.xs },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md, borderBottomWidth: 1 },
  closeBtn: { width: 36, height: 36, borderRadius: radius.pill, justifyContent: "center", alignItems: "center" },
  headerCenter: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.sm },
  headerLogo: { width: 26, height: 26, borderRadius: radius.xs, padding: 3 },
  headerLogoImg: { width: "100%", height: "100%" },
  headerCompany: { fontSize: 15, fontWeight: "700", flex: 1 },
  matchPill: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 11, paddingVertical: 5, borderRadius: radius.pill, borderWidth: 2 },
  matchDot: { width: 7, height: 7, borderRadius: radius.pill },
  matchText: { fontSize: 13, fontWeight: "800" },

  // Content
  contentWrap: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.xl, gap: spacing.lg },

  title: { fontSize: 28, fontWeight: "900", letterSpacing: -1, lineHeight: 32 },
  salary: { fontSize: 22, fontWeight: "800", letterSpacing: -0.3 },
  location: { fontSize: 14, fontWeight: "500" },
  divider: { height: 1 },
  sectionTitle: { fontSize: 17, fontWeight: "800", letterSpacing: -0.3 },
  body: { fontSize: 15, lineHeight: 23 },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginBottom: spacing.sm },
  bulletDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 21 },

  infoRow: { flexDirection: "row", alignItems: "center", borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, borderWidth: 1 },
  infoCell: { flex: 1, alignItems: "center", gap: 2 },
  infoDividerLine: { width: 1, height: 28 },
  infoLabel: { fontSize: 10, fontWeight: "500", marginTop: 2 },
  infoValue: { fontSize: 12, fontWeight: "700" },

  benefitsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  benefitPill: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1 },
  benefitText: { fontSize: 12, fontWeight: "600" },

  // Sticky bar
  stickyBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.xl, paddingTop: spacing.md, gap: spacing.md, borderTopWidth: 1 },
  bookmarkBtn: { width: 48, height: 48, borderRadius: radius.pill, justifyContent: "center", alignItems: "center", borderWidth: 1.5 },
  bookmarkSaved: { backgroundColor: "#00E5FF", borderColor: "#00E5FF" },
  applyBtn: { flex: 1, height: 48, borderRadius: radius.pill, overflow: "hidden" },
  applyBtnDone: { flex: 1, height: 48, borderRadius: radius.pill, backgroundColor: "rgba(220,252,231,0.6)", borderWidth: 1, borderColor: "rgba(34,197,94,0.3)", justifyContent: "center", alignItems: "center" },
  appliedRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  appliedText: { color: "#166534", fontWeight: "800", fontSize: 17 },
  applyGrad: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.sm },
  applyBtnText: { color: "#0B1220", fontSize: 17, fontWeight: "800", letterSpacing: -0.3 },
});
