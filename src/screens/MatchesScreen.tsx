import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius } from "../constants/theme";
import { useJobs } from "../hooks/useJobs";

export function MatchesScreen() {
  const { jobs } = useJobs();
  const matchedJobs = jobs.slice(0, 5);

  return (
    <LinearGradient colors={["#FAF5FF", "#FDF2F8"]} style={styles.background}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Your Matches</Text>
          <Text style={styles.subtitle}>Companies that liked you back</Text>

          {matchedJobs.map((job) => (
            <View key={job.id} style={styles.card}>
              <LinearGradient colors={job.gradient} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.cardTop} />
              <View style={styles.cardBody}>
                <View style={styles.rowStart}>
                  <View style={styles.logoWrap}>
                    <Image source={{ uri: job.logoImage }} style={styles.logo} resizeMode="contain" />
                  </View>
                  <View style={styles.flexOne}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.company}>{job.company}</Text>
                  </View>
                  <View style={styles.matchPill}>
                    <Ionicons name="heart" size={14} color={colors.pink500} />
                    <Text style={styles.matchText}>{job.compatibilityScore}%</Text>
                  </View>
                </View>

                <Text style={styles.description}>{job.description}</Text>

                <View style={styles.pillsRow}>
                  <View style={[styles.pill, styles.pillPurple]}>
                    <Ionicons name="location-outline" size={14} color="#7E22CE" />
                    <Text style={[styles.pillText, { color: "#7E22CE" }]}>{job.location}</Text>
                  </View>
                  <View style={[styles.pill, styles.pillBlue]}>
                    <Text style={[styles.pillText, { color: "#1D4ED8" }]}>{job.type}</Text>
                  </View>
                  <View style={[styles.pill, styles.pillGreen]}>
                    <Ionicons name="cash-outline" size={14} color="#15803D" />
                    <Text style={[styles.pillText, { color: "#15803D" }]}>{job.salary}</Text>
                  </View>
                </View>

                <LinearGradient
                  colors={[colors.purple500, colors.pink500]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Message Company</Text>
                </LinearGradient>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
    paddingBottom: 130,
  },
  title: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "800",
    color: colors.gray900,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardTop: { height: 6 },
  cardBody: { padding: 18 },
  rowStart: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 10 },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.gray100,
    padding: 8,
  },
  logo: { width: "100%", height: "100%" },
  flexOne: { flex: 1 },
  jobTitle: { fontSize: 22, fontWeight: "800", color: colors.gray900, marginBottom: 2 },
  company: { fontSize: 14, color: colors.gray500, fontWeight: "600" },
  matchPill: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: "#FCE7F3",
  },
  matchText: { color: "#BE185D", fontWeight: "700", fontSize: 12 },
  description: { fontSize: 14, color: colors.gray700, lineHeight: 20, marginBottom: 10 },
  pillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  pill: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  pillPurple: { backgroundColor: "#F3E8FF" },
  pillBlue: { backgroundColor: "#DBEAFE" },
  pillGreen: { backgroundColor: "#DCFCE7" },
  pillText: { fontSize: 12, fontWeight: "600" },
  primaryButton: {
    height: 48,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: "800" },
});
