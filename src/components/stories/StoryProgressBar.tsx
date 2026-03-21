import { StyleSheet, View } from "react-native";
import { spacing } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

const BAR_HEIGHT = 3;
const BAR_GAP = 4;

interface StoryProgressBarProps {
  totalSlides: number;
  currentIndex: number;
  progress: number;
  topInset: number;
}

export function StoryProgressBar({
  totalSlides,
  currentIndex,
  progress,
  topInset,
}: StoryProgressBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { paddingTop: topInset + spacing.sm }]}
      pointerEvents="none"
    >
      <View style={styles.track}>
        {Array.from({ length: totalSlides }).map((_, i) => {
          let fillWidth: string;
          if (i < currentIndex) {
            fillWidth = "100%";
          } else if (i === currentIndex) {
            fillWidth = `${Math.min(progress * 100, 100)}%`;
          } else {
            fillWidth = "0%";
          }

          return (
            <View key={i} style={styles.segment}>
              <View
                style={[
                  styles.fill,
                  {
                    backgroundColor: colors.accent,
                    width: fillWidth as any,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 30,
    paddingHorizontal: spacing.lg,
  },
  track: {
    flexDirection: "row",
    gap: BAR_GAP,
  },
  segment: {
    flex: 1,
    height: BAR_HEIGHT,
    borderRadius: BAR_HEIGHT / 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: BAR_HEIGHT / 2,
  },
});
