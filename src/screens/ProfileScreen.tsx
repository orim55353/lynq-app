import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { accentGradient } from "../constants/gradients";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../hooks/useProfile";
import { useTheme } from "../hooks/useTheme";

export function ProfileScreen() {
  const { uid, signOut } = useAuth();
  const { colors } = useTheme();
  const { profile, loading } = useProfile(uid);

  const handleSignOut = useCallback(() => {
    Alert.alert("Sign out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => signOut() },
    ]);
  }, [signOut]);

  if (loading) {
    return (
      <View style={[styles.background, { backgroundColor: colors.bg }]}>
        <SafeAreaView style={styles.safe} edges={["top"]}>
          <View style={[styles.card, styles.loadingCard, { backgroundColor: colors.bgCard }]}>
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading profile...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={[styles.background, { backgroundColor: colors.bg }]}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, shadows.soft, { backgroundColor: colors.bgCard }]}>
            <View style={styles.headerRow}>
              <LinearGradient colors={accentGradient} style={styles.avatar}>
                <Text style={styles.avatarText}>{profile.initials}</Text>
              </LinearGradient>
              <View style={styles.flexOne}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>
                  <Pressable style={[styles.editButton, { backgroundColor: colors.bgSubtle }]}>
                    <Ionicons name="create-outline" size={16} color={colors.textSecondary} />
                  </Pressable>
                </View>
                <Text style={[styles.tagline, { color: colors.textSecondary }]}>{profile.tagline}</Text>

                <View style={styles.infoWrap}>
                  <View style={[styles.infoPill, { backgroundColor: colors.accentSoft }]}>
                    <Ionicons name="mail-outline" size={13} color={colors.accent} />
                    <Text style={[styles.infoText, { color: colors.accent }]}>{profile.email}</Text>
                  </View>
                  <View style={[styles.infoPill, { backgroundColor: colors.warmSoft }]}>
                    <Ionicons name="location-outline" size={13} color={colors.warm} />
                    <Text style={[styles.infoText, { color: colors.warm }]}>{profile.location}</Text>
                  </View>
                  <View style={[styles.infoPill, { backgroundColor: colors.infoSoft }]}>
                    <Ionicons name="briefcase-outline" size={13} color={colors.info} />
                    <Text style={[styles.infoText, { color: colors.info }]}>{profile.experience}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.card, shadows.soft, { backgroundColor: colors.bgCard }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills</Text>
            <View style={styles.skillsWrap}>
              {profile.skills.map((skill) => (
                <View key={skill} style={[styles.skillPill, { backgroundColor: colors.accentSoft }]}>
                  <Text style={[styles.skillText, { color: colors.accent }]}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.card, shadows.soft, { backgroundColor: colors.bgCard }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Experience</Text>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineLine, { backgroundColor: colors.accent }]} />
              <View style={styles.timelineBody}>
                <Text style={[styles.role, { color: colors.text }]}>Senior Software Engineer</Text>
                <Text style={[styles.companyName, { color: colors.accent }]}>Tech Company Inc.</Text>
                <Text style={[styles.dates, { color: colors.textTertiary }]}>2021 - Present</Text>
                <Text style={[styles.summary, { color: colors.textSecondary }]}>Led development of key features and mentored junior developers.</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineLine, { backgroundColor: colors.warm }]} />
              <View style={styles.timelineBody}>
                <Text style={[styles.role, { color: colors.text }]}>Software Engineer</Text>
                <Text style={[styles.companyName, { color: colors.warm }]}>Startup XYZ</Text>
                <Text style={[styles.dates, { color: colors.textTertiary }]}>2019 - 2021</Text>
                <Text style={[styles.summary, { color: colors.textSecondary }]}>Built and scaled web applications from the ground up.</Text>
              </View>
            </View>
          </View>

          <Pressable onPress={handleSignOut} style={({ pressed }) => [styles.signOutButton, { backgroundColor: colors.dangerSoft }, pressed && styles.signOutPressed]}>
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={[styles.signOutText, { color: colors.danger }]}>Sign out</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg, gap: spacing.lg, paddingBottom: 130 },
  card: { borderRadius: radius.xl, padding: spacing.xl },
  headerRow: { flexDirection: "row", gap: spacing.lg },
  avatar: { width: 80, height: 80, borderRadius: radius.pill, justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#FFFFFF", fontSize: 28, fontWeight: "800" },
  flexOne: { flex: 1 },
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.xxs },
  name: { ...typography.displayMedium },
  editButton: { width: 34, height: 34, borderRadius: radius.pill, alignItems: "center", justifyContent: "center" },
  tagline: { ...typography.body, marginBottom: spacing.md },
  infoWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  infoPill: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  infoText: { ...typography.label },
  sectionTitle: { ...typography.heading, marginBottom: spacing.md },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  skillPill: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.pill },
  skillText: { ...typography.label },
  timelineItem: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg },
  timelineLine: { width: 3, borderRadius: radius.pill },
  timelineBody: { flex: 1 },
  role: { ...typography.subheading },
  companyName: { ...typography.bodySmall, fontWeight: "700", marginTop: spacing.xxs },
  dates: { ...typography.caption, marginTop: spacing.xs, marginBottom: spacing.xs },
  summary: { ...typography.bodySmall },
  loadingCard: { alignItems: "center", justifyContent: "center", minHeight: 120 },
  loadingText: { ...typography.body },
  signOutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, paddingVertical: spacing.lg, marginTop: spacing.sm, borderRadius: radius.md },
  signOutPressed: { opacity: 0.7 },
  signOutText: { ...typography.body, fontWeight: "600" },
});
