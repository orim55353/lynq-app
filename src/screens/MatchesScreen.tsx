import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { accentGradient } from "../constants/gradients";
import { useJobs } from "../hooks/useJobs";
import { useTheme } from "../hooks/useTheme";

export function MatchesScreen() {
  const { jobs } = useJobs();
  const { colors } = useTheme();
  const matchedJobs = jobs.slice(0, 5);

  return (
    <View style={[styles.background, { backgroundColor: colors.bg }]}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: colors.text }]}>Your Matches</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Companies that liked you back</Text>

          {matchedJobs.map((job) => (
            <View key={job.id} style={[styles.card, shadows.soft, { backgroundColor: colors.bgCard }]}>
              <LinearGradient colors={job.gradient} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.cardTop} />
              <View style={styles.cardBody}>
                <View style={styles.rowStart}>
                  <View style={[styles.logoWrap, { backgroundColor: colors.bgSubtle }]}>
                    <Image source={{ uri: job.logoImage }} style={styles.logo} resizeMode="contain" />
                  </View>
                  <View style={styles.flexOne}>
                    <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
                    <Text style={[styles.company, { color: colors.textSecondary }]}>{job.company}</Text>
                  </View>
                  <View style={[styles.matchPill, { backgroundColor: colors.accentSoft }]}>
                    <Ionicons name="heart" size={13} color={colors.accent} />
                    <Text style={[styles.matchText, { color: colors.accent }]}>{job.compatibilityScore}%</Text>
                  </View>
                </View>

                <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>{job.description}</Text>

                <View style={styles.pillsRow}>
                  <View style={[styles.pill, { backgroundColor: colors.bgSubtle }]}>
                    <Text style={[styles.pillText, { color: colors.textSecondary }]}>{job.location}</Text>
                  </View>
                  <View style={[styles.pill, { backgroundColor: colors.bgSubtle }]}>
                    <Text style={[styles.pillText, { color: colors.textSecondary }]}>{job.type}</Text>
                  </View>
                  <View style={[styles.pill, { backgroundColor: colors.bgSubtle }]}>
                    <Text style={[styles.pillText, { color: colors.textSecondary }]}>{job.salary}</Text>
                  </View>
                </View>

                <View style={styles.primaryButton}>
                  <LinearGradient
                    colors={accentGradient}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.primaryButtonGradient}
                  >
                    <Ionicons name="chatbubble-outline" size={16} color={colors.textInverse} />
                    <Text style={[styles.primaryButtonText, { color: colors.textInverse }]}>Message Company</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  content: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg, gap: spacing.lg, paddingBottom: 130 },
  title: { ...typography.displayLarge, marginBottom: spacing.xxs },
  subtitle: { ...typography.body, marginBottom: spacing.sm },
  card: { borderRadius: radius.xl, overflow: "hidden" },
  cardTop: { height: 4 },
  cardBody: { padding: spacing.lg },
  rowStart: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, marginBottom: spacing.md },
  logoWrap: { width: 52, height: 52, borderRadius: radius.md, padding: spacing.sm },
  logo: { width: "100%", height: "100%" },
  flexOne: { flex: 1 },
  jobTitle: { ...typography.heading, marginBottom: spacing.xxs },
  company: { ...typography.bodySmall, fontWeight: "600" },
  matchPill: { flexDirection: "row", gap: 4, alignItems: "center", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill },
  matchText: { ...typography.label },
  description: { ...typography.bodySmall, marginBottom: spacing.md },
  pillsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.lg },
  pill: { flexDirection: "row", gap: 4, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, alignItems: "center" },
  pillText: { ...typography.label },
  primaryButton: { borderRadius: radius.pill, overflow: "hidden" },
  primaryButtonGradient: { height: 48, borderRadius: radius.pill, justifyContent: "center", alignItems: "center", flexDirection: "row", gap: spacing.sm },
  primaryButtonText: { ...typography.button },
});
