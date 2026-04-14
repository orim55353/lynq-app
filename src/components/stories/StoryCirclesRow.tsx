import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import type { LayoutChangeEvent } from "react-native";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { BrandLogo } from "../../components/BrandLogo";
import { spacing } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import type { CompanyStory } from "../../types/story";
import { clamp } from "../../utils/math";
import { StoryCircle } from "./StoryCircle";

interface StoryCirclesRowProps {
  stories: CompanyStory[];
  isFullySeen: (companyId: string) => boolean;
  topInset: number;
  onSelectStory: (story: CompanyStory) => void;
  onHeightChange?: (height: number) => void;
}

export function StoryCirclesRow({
  stories,
  isFullySeen,
  topInset,
  onSelectStory,
  onHeightChange,
}: StoryCirclesRowProps) {
  const { width } = useWindowDimensions();
  const { colors, mode } = useTheme();

  const horizontalPadding = clamp(width * 0.05, spacing.lg, spacing.xxl);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onHeightChange?.(event.nativeEvent.layout.height);
    },
    [onHeightChange],
  );

  if (stories.length === 0) return null;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: topInset,
          paddingBottom: spacing.xs,
        },
      ]}
      onLayout={handleLayout}
    >
      {/* Glass backdrop */}
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.glass }]}
      />

      {/* Subtle bottom edge glow */}
      <LinearGradient
        colors={["transparent", "rgba(6, 182, 212, 0.06)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomGlow}
      />

      <View style={styles.row}>
        {/* Fixed Lynq logo on the left */}
        <View style={[styles.logoWrap, { paddingLeft: horizontalPadding }]} pointerEvents="none">
          <BrandLogo size={30} white={mode === "dark"} />
        </View>

        {/* Scrollable story circles */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingRight: horizontalPadding, gap: 12 },
          ]}
        >
          {stories.map((story) => (
            <StoryCircle
              key={story.id}
              story={story}
              isSeen={isFullySeen(story.companyId)}
              onPress={onSelectStory}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    overflow: "hidden",
  },
  bottomGlow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logoWrap: {
    // Center the 30px logo against the 56px circle (circle starts at paddingVertical=2px)
    // circle center = 2 + 56/2 = 30px; logo center offset = 30 - 30/2 = 15px
    marginTop: 15,
    paddingRight: spacing.md,
  },
  scrollContent: {
    alignItems: "flex-start",
    paddingVertical: 2,
  },
});
