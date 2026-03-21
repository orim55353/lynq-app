import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { spacing, typography } from "../../../constants/theme";
import type { StorySlide } from "../../../types/story";

interface CultureSlideProps {
  slide: StorySlide;
}

export function CultureSlide({ slide }: CultureSlideProps) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Full-bleed background image */}
      <Image
        source={{ uri: slide.mediaUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Bottom gradient scrim for text legibility */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.75)"]}
        locations={[0.4, 0.65, 1]}
        style={styles.scrim}
      />

      {/* Brand color overlay (optional) */}
      {slide.brandOverlay?.backgroundColor && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: slide.brandOverlay.backgroundColor,
              opacity: slide.brandOverlay.opacity ?? 0.15,
            },
          ]}
        />
      )}

      {/* Text content at bottom */}
      <View style={styles.content}>
        <Text style={styles.headline}>{slide.headline}</Text>
        {slide.body ? (
          <Text style={styles.body}>{slide.body}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: "absolute",
    bottom: 230,
    left: spacing.xxl,
    right: spacing.xxl,
    gap: spacing.sm,
  },
  headline: {
    ...typography.displayMedium,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  body: {
    ...typography.body,
    color: "rgba(255,255,255,0.85)",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
