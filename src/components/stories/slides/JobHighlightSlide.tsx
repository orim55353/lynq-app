import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, typography } from "../../../constants/theme";
import type { CompanyStory, StorySlide } from "../../../types/story";

interface JobHighlightSlideProps {
  slide: StorySlide;
  company: CompanyStory;
}

export function JobHighlightSlide({ slide, company }: JobHighlightSlideProps) {
  const { width, height } = useWindowDimensions();
  const job = slide.jobHighlight;

  if (!job) return null;

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Brand gradient background */}
      <LinearGradient
        colors={[company.brandColors.primary, company.brandColors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Dark overlay for contrast */}
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Job title */}
        <Text style={styles.title}>{job.jobTitle}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.7)" />
          {"  "}{job.location}
        </Text>

        {/* Salary */}
        <Text style={styles.salary}>{job.salary}</Text>

        {/* Info chips */}
        <View style={styles.chipRow}>
          <InfoChip icon="briefcase-outline" label={job.experience} />
          <InfoChip icon="calendar-outline" label={job.schedule} />
          <InfoChip icon="navigate-outline" label={job.workType} />
        </View>

        {/* Highlights */}
        <View style={styles.highlights}>
          {job.highlights.map((h, i) => (
            <View key={i} style={styles.highlightRow}>
              <View style={styles.bullet} />
              <Text style={styles.highlightText}>{h}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function InfoChip({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon as any} size={14} color="#FFFFFF" />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    paddingBottom: 180,
    gap: spacing.md,
  },
  title: {
    ...typography.displayMedium,
    color: "#FFFFFF",
  },
  location: {
    ...typography.body,
    color: "rgba(255,255,255,0.7)",
  },
  salary: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginTop: spacing.xs,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
  },
  chipText: {
    ...typography.label,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  highlights: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginTop: 7,
  },
  highlightText: {
    ...typography.body,
    color: "rgba(255,255,255,0.9)",
    flex: 1,
  },
});
