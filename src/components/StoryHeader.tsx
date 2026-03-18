import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWindowDimensions } from "react-native";
import { colors, radius, spacing, horizontalPaddingBounds } from "../constants/theme";
import { clamp } from "../utils/math";

export interface StoryCircle {
  id: string;
  label: string;
  image: string;
  gradient: [string, string];
}

interface StoryHeaderProps {
  stories: StoryCircle[];
  selectedStory: string | null;
  topInset: number;
  onSelectStory: (id: string) => void;
  onHeightChange?: (height: number) => void;
}

export function StoryHeader({
  stories,
  selectedStory,
  topInset,
  onSelectStory,
  onHeightChange,
}: StoryHeaderProps) {
  const { width, height } = useWindowDimensions();

  const layout = useMemo(() => {
    const ringSize = clamp(width * 0.14, 52, 64);

    return {
      rowGap: clamp(width * 0.025, 8, 14),
      itemGap: clamp(width * 0.01, 3, 6),
      ringSize,
      ringPadding: clamp(ringSize * 0.055, 2, 4),
      imagePadding: clamp(ringSize * 0.035, 1, 3),
      labelSize: clamp(width * 0.024, 10, 12),
      topPadding: topInset,
      bottomPadding: spacing.sm,
      startPadding: clamp(width * 0.06, horizontalPaddingBounds.min, horizontalPaddingBounds.max),
    };
  }, [height, topInset, width]);

  const handleLayout = (event: LayoutChangeEvent) => {
    onHeightChange?.(event.nativeEvent.layout.height);
  };

  return (
    <View
      style={[
        styles.storyBar,
        {
          paddingTop: layout.topPadding,
          paddingBottom: layout.bottomPadding,
        },
      ]}
      onLayout={handleLayout}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.storyRow,
          { gap: layout.rowGap, paddingLeft: layout.startPadding },
        ]}
      >
        {stories.map((story) => (
          <Pressable
            key={story.id}
            style={[styles.storyItem, { gap: layout.itemGap }]}
            onPress={() => onSelectStory(story.id)}
          >
            <LinearGradient
              colors={story.gradient}
              style={[
                styles.storyRing,
                { width: layout.ringSize, height: layout.ringSize, padding: layout.ringPadding },
              ]}
            >
              <View
                style={[
                  styles.storyInnerWrap,
                  { padding: layout.imagePadding },
                  selectedStory === story.id && styles.storySelected,
                ]}
              >
                <Image source={{ uri: story.image }} style={styles.storyImage} />
              </View>
            </LinearGradient>
            <Text style={[styles.storyLabel, { fontSize: layout.labelSize }]}>{story.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  storyBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226,232,240,0.9)",
  },
  storyRow: {
    alignItems: "center",
  },
  storyItem: {
    alignItems: "center",
  },
  storyRing: {
    borderRadius: radius.pill,
  },
  storyInnerWrap: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  storySelected: {
    borderWidth: 2,
    borderColor: colors.purple500,
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: radius.pill,
  },
  storyLabel: {
    fontWeight: "500",
    color: colors.gray600,
  },
});
