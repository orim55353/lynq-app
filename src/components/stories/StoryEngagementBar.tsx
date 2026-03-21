import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { spacing, typography } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

interface StoryEngagementBarProps {
  totalViews: number;
  onShare: () => void;
  onSave: () => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function StoryEngagementBar({
  totalViews,
  onShare,
  onSave,
}: StoryEngagementBarProps) {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const likeScale = useRef(new Animated.Value(1)).current;

  const handleLike = useCallback(() => {
    setLiked((prev) => !prev);
    Animated.sequence([
      Animated.spring(likeScale, {
        toValue: 1.3,
        useNativeDriver: true,
        tension: 400,
        friction: 10,
      }),
      Animated.spring(likeScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 15,
      }),
    ]).start();
  }, [likeScale]);

  const handleSave = useCallback(() => {
    setSaved((prev) => !prev);
    onSave();
  }, [onSave]);

  return (
    <View style={[styles.container, { backgroundColor: colors.glass }]}>
      {/* Like */}
      <Pressable
        onPress={handleLike}
        style={styles.action}
        accessibilityLabel={liked ? "Unlike" : "Like"}
        accessibilityRole="button"
      >
        <Animated.View style={{ transform: [{ scale: likeScale }] }}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color={liked ? "#EF4444" : "#FFFFFF"}
          />
        </Animated.View>
        {totalViews > 100 && (
          <Text style={styles.count}>{formatCount(totalViews)}</Text>
        )}
      </Pressable>

      {/* Share */}
      <Pressable
        onPress={onShare}
        style={styles.action}
        accessibilityLabel="Share"
        accessibilityRole="button"
      >
        <Ionicons name="share-outline" size={22} color="#FFFFFF" />
        <Text style={styles.label}>Share</Text>
      </Pressable>

      {/* Save */}
      <Pressable
        onPress={handleSave}
        style={styles.action}
        accessibilityLabel={saved ? "Unsave" : "Save"}
        accessibilityRole="button"
      >
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={22}
          color={saved ? colors.accent : "#FFFFFF"}
        />
        <Text style={styles.label}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.xxl,
    marginHorizontal: spacing.lg,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.1)",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  count: {
    ...typography.caption,
    color: "rgba(255,255,255,0.5)",
  },
  label: {
    ...typography.caption,
    color: "rgba(255,255,255,0.5)",
  },
});
