import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius } from "../constants/theme";
import { profile } from "../data/profile";

export function ProfileScreen() {
  return (
    <LinearGradient colors={["#FAF5FF", "#FDF2F8"]} style={styles.background}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <LinearGradient colors={[colors.purple500, colors.pink500]} style={styles.avatar}>
                <Text style={styles.avatarText}>{profile.initials}</Text>
              </LinearGradient>
              <View style={styles.flexOne}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{profile.name}</Text>
                  <View style={styles.editButton}>
                    <Ionicons name="create-outline" size={18} color={colors.gray500} />
                  </View>
                </View>
                <Text style={styles.tagline}>{profile.tagline}</Text>

                <View style={styles.infoWrap}>
                  <View style={[styles.infoPill, { backgroundColor: "#F3E8FF" }]}> 
                    <Ionicons name="mail-outline" size={14} color="#7E22CE" />
                    <Text style={[styles.infoText, { color: "#7E22CE" }]}>{profile.email}</Text>
                  </View>
                  <View style={[styles.infoPill, { backgroundColor: "#FCE7F3" }]}>
                    <Ionicons name="location-outline" size={14} color="#BE185D" />
                    <Text style={[styles.infoText, { color: "#BE185D" }]}>{profile.location}</Text>
                  </View>
                  <View style={[styles.infoPill, { backgroundColor: "#DBEAFE" }]}>
                    <Ionicons name="briefcase-outline" size={14} color="#1D4ED8" />
                    <Text style={[styles.infoText, { color: "#1D4ED8" }]}>{profile.experience}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrap}>
              {profile.skills.map((skill) => (
                <LinearGradient
                  key={skill}
                  colors={[colors.purple500, colors.pink500]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.skillPill}
                >
                  <Text style={styles.skillText}>{skill}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineLine, { backgroundColor: colors.purple500 }]} />
              <View style={styles.timelineBody}>
                <Text style={styles.role}>Senior Software Engineer</Text>
                <Text style={[styles.companyName, { color: colors.purple500 }]}>Tech Company Inc.</Text>
                <Text style={styles.dates}>2021 - Present</Text>
                <Text style={styles.summary}>Led development of key features and mentored junior developers.</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineLine, { backgroundColor: colors.pink500 }]} />
              <View style={styles.timelineBody}>
                <Text style={styles.role}>Software Engineer</Text>
                <Text style={[styles.companyName, { color: colors.pink500 }]}>Startup XYZ</Text>
                <Text style={styles.dates}>2019 - 2021</Text>
                <Text style={styles.summary}>Built and scaled web applications from the ground up.</Text>
              </View>
            </View>
          </View>
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
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  headerRow: { flexDirection: "row", gap: 14 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: colors.white, fontSize: 30, fontWeight: "800" },
  flexOne: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  name: { fontSize: 30, lineHeight: 34, color: colors.gray900, fontWeight: "800" },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: { color: colors.gray500, fontSize: 15, marginBottom: 10 },
  infoWrap: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  infoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  infoText: { fontSize: 12, fontWeight: "600" },
  sectionTitle: { fontSize: 29, lineHeight: 34, fontWeight: "800", color: colors.gray900, marginBottom: 12 },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillPill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill },
  skillText: { color: colors.white, fontSize: 13, fontWeight: "700" },
  timelineItem: { flexDirection: "row", gap: 10, marginBottom: 14 },
  timelineLine: { width: 4, borderRadius: radius.pill },
  timelineBody: { flex: 1 },
  role: { fontSize: 22, lineHeight: 28, color: colors.gray900, fontWeight: "800" },
  companyName: { fontSize: 16, fontWeight: "700", marginTop: 1 },
  dates: { fontSize: 12, color: colors.gray500, marginTop: 3, marginBottom: 4 },
  summary: { fontSize: 14, lineHeight: 20, color: colors.gray700 },
});
