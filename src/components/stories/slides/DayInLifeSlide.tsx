import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { radius, spacing, typography } from "../../../constants/theme";
import type { CompanyStory, StorySlide } from "../../../types/story";

interface DayInLifeSlideProps {
  slide: StorySlide;
  company: CompanyStory;
}

export function DayInLifeSlide({ slide, company }: DayInLifeSlideProps) {
  const { width, height } = useWindowDimensions();
  const dayInLife = slide.dayInLife;

  if (!dayInLife) return null;

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Background */}
      <LinearGradient
        colors={["#0B1220", company.brandColors.primary, "#0B1220"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>A Day in the Life</Text>
        <Text style={styles.roleTitle}>{dayInLife.roleTitle}</Text>

        {/* Timeline entries */}
        <View style={styles.timeline}>
          {dayInLife.entries.map((entry, i) => (
            <View key={i} style={styles.entry}>
              {/* Timeline line + dot */}
              <View style={styles.timelineTrack}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: company.brandColors.secondary },
                  ]}
                />
                {i < dayInLife.entries.length - 1 && (
                  <View style={styles.line} />
                )}
              </View>

              {/* Content */}
              <View style={styles.entryContent}>
                <Text style={styles.time}>{entry.time}</Text>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                {entry.imageUrl && (
                  <Image
                    source={{ uri: entry.imageUrl }}
                    style={styles.entryImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    paddingBottom: 180,
    gap: spacing.xs,
  },
  sectionTitle: {
    ...typography.label,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  roleTitle: {
    ...typography.heading,
    color: "#FFFFFF",
    marginBottom: spacing.lg,
  },
  timeline: {
    gap: 0,
  },
  entry: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  timelineTrack: {
    alignItems: "center",
    width: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 4,
  },
  entryContent: {
    flex: 1,
    paddingBottom: spacing.xl,
    gap: 4,
  },
  time: {
    ...typography.label,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
  },
  entryTitle: {
    ...typography.body,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  entryImage: {
    width: 60,
    height: 60,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
  },
});
