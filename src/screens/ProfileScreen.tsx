import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlassCard } from "../components/GlassCard";
import { GlassPill } from "../components/GlassPill";
import {
  accentGradient,
  screenGradient,
  spotlightGradient,
  warmGradient,
} from "../constants/gradients";
import {
  getFontScale,
  radius,
  shadows,
  spacing,
  typography,
} from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { useEntranceAnimations } from "../hooks/useEntranceAnimations";
import { useProfile } from "../hooks/useProfile";
import { useSpringPress } from "../hooks/useSpringPress";
import { useTheme } from "../hooks/useTheme";

export function ProfileScreen() {
  const { uid, signOut } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const fontScale = getFontScale(width);
  const { profile, loading } = useProfile(uid);

  // 4 sections: profile header, skills, experience, sign-out
  const { opacities, translateYs, trigger } = useEntranceAnimations(4, {
    staggerMs: 100,
  });

  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [trigger]),
  );

  // Avatar scale-in spring
  const avatarScale = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    if (!loading) {
      Animated.spring(avatarScale, {
        toValue: 1,
        tension: 200,
        friction: 15,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, avatarScale]);

  const editPress = useSpringPress({ pressedScale: 0.9 });
  const signOutPress = useSpringPress({ pressedScale: 0.95 });

  const handleSignOut = useCallback(() => {
    Alert.alert("Sign out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => signOut() },
    ]);
  }, [signOut]);

  const nameSize = Math.round(28 * fontScale);
  const nameLineHeight = Math.round(32 * fontScale);

  if (loading) {
    return (
      <View style={styles.root}>
        <LinearGradient colors={screenGradient} style={StyleSheet.absoluteFill} />
        <View style={styles.loadingCenter}>
          <GlassCard>
            <View style={styles.loadingContent}>
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                Loading profile...
              </Text>
            </View>
          </GlassCard>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <LinearGradient colors={screenGradient} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xxl, paddingBottom: 130 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View
          style={{
            opacity: opacities[0],
            transform: [{ translateY: translateYs[0] }],
          }}
        >
          <GlassCard>
            <View style={styles.headerRow}>
              {/* Avatar with gradient ring */}
              <Animated.View style={{ transform: [{ scale: avatarScale }] }}>
                <LinearGradient
                  colors={accentGradient}
                  style={[styles.avatarRing, shadows.glow]}
                >
                  <View style={[styles.avatarSpacer, { backgroundColor: colors.bg }]}>
                    <LinearGradient colors={accentGradient} style={styles.avatar}>
                      <Text style={styles.avatarText}>{profile.initials}</Text>
                    </LinearGradient>
                  </View>
                </LinearGradient>
              </Animated.View>

              <View style={styles.flexOne}>
                <View style={styles.nameRow}>
                  <Text
                    style={[
                      styles.name,
                      {
                        color: colors.text,
                        fontSize: nameSize,
                        lineHeight: nameLineHeight,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {profile.name}
                  </Text>
                  <Animated.View style={{ transform: [{ scale: editPress.scale }] }}>
                    <Pressable
                      onPressIn={editPress.onPressIn}
                      onPressOut={editPress.onPressOut}
                      style={[
                        styles.editButton,
                        { backgroundColor: colors.glass, borderColor: colors.glassBorder },
                      ]}
                    >
                      <Ionicons name="create-outline" size={16} color={colors.textSecondary} />
                    </Pressable>
                  </Animated.View>
                </View>
                <Text style={[styles.tagline, { color: colors.textSecondary }]}>
                  {profile.tagline}
                </Text>

                <View style={styles.infoWrap}>
                  <GlassPill icon="mail-outline" label={profile.email} tint={colors.accent} bg={colors.accentSoft} />
                  <GlassPill icon="location-outline" label={profile.location} tint={colors.warm} bg={colors.warmSoft} />
                  <GlassPill icon="briefcase-outline" label={profile.experience} tint={colors.info} bg={colors.infoSoft} />
                </View>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Skills */}
        <Animated.View
          style={{
            opacity: opacities[1],
            transform: [{ translateY: translateYs[1] }],
          }}
        >
          <GlassCard>
            <View style={styles.sectionTitleRow}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Skills
              </Text>
              <LinearGradient
                colors={accentGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.sectionAccent}
              />
            </View>
            <View style={styles.skillsWrap}>
              {profile.skills.map((skill) => (
                <GlassPill
                  key={skill}
                  label={skill}
                  tint={colors.accent}
                  bg={colors.accentSoft}
                />
              ))}
            </View>
          </GlassCard>
        </Animated.View>

        {/* Experience */}
        <Animated.View
          style={{
            opacity: opacities[2],
            transform: [{ translateY: translateYs[2] }],
          }}
        >
          <GlassCard>
            <View style={styles.sectionTitleRow}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Experience
              </Text>
              <LinearGradient
                colors={warmGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.sectionAccent}
              />
            </View>

            {/* Timeline entry 1 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineTrack}>
                <LinearGradient
                  colors={accentGradient}
                  style={styles.timelineDot}
                />
                <LinearGradient
                  colors={[colors.accent, colors.warm]}
                  style={styles.timelineLine}
                />
              </View>
              <View style={styles.timelineBody}>
                <Text style={[styles.role, { color: colors.text }]}>
                  Senior Software Engineer
                </Text>
                <Text style={[styles.companyName, { color: colors.accent }]}>
                  Tech Company Inc.
                </Text>
                <Text style={[styles.dates, { color: colors.textTertiary }]}>
                  2021 - Present
                </Text>
                <Text style={[styles.summary, { color: colors.textSecondary }]}>
                  Led development of key features and mentored junior developers.
                </Text>
              </View>
            </View>

            {/* Timeline entry 2 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineTrack}>
                <LinearGradient
                  colors={warmGradient}
                  style={styles.timelineDot}
                />
              </View>
              <View style={styles.timelineBody}>
                <Text style={[styles.role, { color: colors.text }]}>
                  Software Engineer
                </Text>
                <Text style={[styles.companyName, { color: colors.warm }]}>
                  Startup XYZ
                </Text>
                <Text style={[styles.dates, { color: colors.textTertiary }]}>
                  2019 - 2021
                </Text>
                <Text style={[styles.summary, { color: colors.textSecondary }]}>
                  Built and scaled web applications from the ground up.
                </Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Sign Out */}
        <Animated.View
          style={{
            opacity: opacities[3],
            transform: [{ translateY: translateYs[3] }],
          }}
        >
          <Animated.View style={{ transform: [{ scale: signOutPress.scale }] }}>
            <Pressable
              onPress={handleSignOut}
              onPressIn={signOutPress.onPressIn}
              onPressOut={signOutPress.onPressOut}
              style={[
                styles.signOutButton,
                {
                  backgroundColor: colors.dangerSoft,
                  borderColor: colors.glassBorder,
                },
              ]}
            >
              <Ionicons name="log-out-outline" size={18} color={colors.danger} />
              <Text style={[styles.signOutText, { color: colors.danger }]}>
                Sign out
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </ScrollView>
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
    height: 400,
  },
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  loadingCenter: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  loadingContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  loadingText: {
    ...typography.body,
  },

  // Profile header
  headerRow: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarSpacer: {
    width: 82,
    height: 82,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  flexOne: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xxs,
  },
  name: {
    fontWeight: typography.displayMedium.fontWeight,
    letterSpacing: typography.displayMedium.letterSpacing,
    flex: 1,
  },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  infoWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  // Section titles
  sectionTitleRow: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    marginBottom: spacing.sm,
  },
  sectionAccent: {
    height: 3,
    width: 40,
    borderRadius: radius.pill,
  },

  // Skills
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  // Timeline
  timelineItem: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  timelineTrack: {
    alignItems: "center",
    width: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
  },
  timelineLine: {
    width: 3,
    flex: 1,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  timelineBody: {
    flex: 1,
  },
  role: {
    ...typography.subheading,
  },
  companyName: {
    ...typography.bodySmall,
    fontWeight: "700",
    marginTop: spacing.xxs,
  },
  dates: {
    ...typography.caption,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  summary: {
    ...typography.bodySmall,
  },

  // Sign out
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  signOutText: {
    ...typography.body,
    fontWeight: "600",
  },
});
