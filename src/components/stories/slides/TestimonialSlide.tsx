import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { spacing, typography } from "../../../constants/theme";
import type { CompanyStory, StorySlide } from "../../../types/story";

interface TestimonialSlideProps {
  slide: StorySlide;
  company: CompanyStory;
}

export function TestimonialSlide({ slide, company }: TestimonialSlideProps) {
  const { width, height } = useWindowDimensions();
  const testimonial = slide.testimonial;

  if (!testimonial) return null;

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Subtle brand gradient background */}
      <LinearGradient
        colors={[company.brandColors.primary, "#0B1220"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Large decorative quote mark */}
        <Text
          style={[styles.quoteMark, { color: company.brandColors.primary }]}
        >
          {"\u201C"}
        </Text>

        {/* Employee photo */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: testimonial.employeePhoto }}
            style={styles.photo}
          />
        </View>

        {/* Quote */}
        <Text style={styles.quote}>
          {"\u201C"}{testimonial.quote}{"\u201D"}
        </Text>

        {/* Attribution */}
        <View style={styles.attribution}>
          <Text style={styles.name}>{"\u2014 "}{testimonial.employeeName}</Text>
          <Text style={styles.role}>
            {testimonial.employeeRole}
            {testimonial.tenure ? `, ${testimonial.tenure}` : ""}
          </Text>
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
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xxxl,
    paddingBottom: 180,
    gap: spacing.lg,
  },
  quoteMark: {
    fontSize: 64,
    fontWeight: "700",
    opacity: 0.3,
    lineHeight: 64,
    marginBottom: -spacing.lg,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.8)",
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  quote: {
    ...typography.heading,
    color: "#FFFFFF",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 30,
  },
  attribution: {
    alignItems: "center",
    gap: 4,
    marginTop: spacing.sm,
  },
  name: {
    ...typography.subheading,
    color: "#FFFFFF",
  },
  role: {
    ...typography.bodySmall,
    color: "rgba(255,255,255,0.6)",
  },
});
