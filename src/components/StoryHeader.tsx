import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useRef } from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { radius, spacing, typography } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
import { clamp } from "../utils/math";

// ─── Public types (kept for backward compat) ────────────────────────────────
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

// ─── Category icons — minimal unicode glyphs per category ────────────────────
const CATEGORY_ICONS: Record<string, string> = {
  tech: "\u{2318}",       // ⌘
  finance: "\u{25C8}",    // ◈
  design: "\u{25CE}",     // ◎
  marketing: "\u{25B3}",  // △
  sales: "\u{2606}",      // ☆
  healthcare: "\u{271A}", // ✚
};

function getCategoryIcon(id: string): string {
  const base = id.replace(/\d+$/, "");
  return CATEGORY_ICONS[base] ?? "\u{25CF}"; // ● fallback
}

// ─── Deduplicate story circles into unique categories ────────────────────────
function deduplicateCategories(stories: StoryCircle[]): StoryCircle[] {
  const seen = new Set<string>();
  const result: StoryCircle[] = [];
  for (const story of stories) {
    const base = story.id.replace(/\d+$/, "");
    if (!seen.has(base)) {
      seen.add(base);
      result.push(story);
    }
  }
  return result;
}

export function StoryHeader({
  stories,
  selectedStory,
  topInset,
  onSelectStory,
  onHeightChange,
}: StoryHeaderProps) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const categories = useMemo(() => deduplicateCategories(stories), [stories]);

  const layout = useMemo(() => ({
    pillGap: clamp(width * 0.02, 6, 10),
    topPadding: topInset + spacing.xs,
    bottomPadding: spacing.md,
    horizontalPadding: clamp(width * 0.05, spacing.lg, spacing.xxl),
  }), [topInset, width]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onHeightChange?.(event.nativeEvent.layout.height);
    },
    [onHeightChange],
  );

  // Scale animation refs for each pill
  const scaleRefs = useRef<Record<string, Animated.Value>>({});
  const getScale = useCallback((id: string) => {
    if (!scaleRefs.current[id]) {
      scaleRefs.current[id] = new Animated.Value(1);
    }
    return scaleRefs.current[id];
  }, []);

  const handlePressIn = useCallback((id: string) => {
    Animated.spring(getScale(id), {
      toValue: 0.92,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  }, [getScale]);

  const handlePressOut = useCallback((id: string) => {
    Animated.spring(getScale(id), {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 15,
    }).start();
  }, [getScale]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: layout.topPadding,
          paddingBottom: layout.bottomPadding,
        },
      ]}
      onLayout={handleLayout}
    >
      {/* Glass backdrop */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.glass },
        ]}
      />

      {/* Subtle bottom edge glow */}
      <LinearGradient
        colors={["transparent", "rgba(6, 182, 212, 0.06)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomGlow}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            gap: layout.pillGap,
            paddingHorizontal: layout.horizontalPadding,
          },
        ]}
      >
        {/* "All" pill — always first */}
        {renderPill({
          id: "__all__",
          label: "בשבילך",
          isSelected: selectedStory === null,
          colors,
          gradient: ["#00687A", "#06B6D4"],
          getScale,
          onPress: () => onSelectStory("__all__"),
          onPressIn: () => handlePressIn("__all__"),
          onPressOut: () => handlePressOut("__all__"),
        })}

        {categories.map((cat) => {
          const isSelected = selectedStory === cat.id;
          return renderPill({
            id: cat.id,
            label: cat.label,
            icon: getCategoryIcon(cat.id),
            isSelected,
            colors,
            gradient: cat.gradient,
            getScale,
            onPress: () => onSelectStory(cat.id),
            onPressIn: () => handlePressIn(cat.id),
            onPressOut: () => handlePressOut(cat.id),
          });
        })}
      </ScrollView>
    </View>
  );
}

// ─── Pill renderer ───────────────────────────────────────────────────────────

interface PillProps {
  id: string;
  label: string;
  icon?: string;
  isSelected: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  gradient: [string, string];
  getScale: (id: string) => Animated.Value;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
}

function renderPill({
  id,
  label,
  icon,
  isSelected,
  colors,
  gradient,
  getScale,
  onPress,
  onPressIn,
  onPressOut,
}: PillProps) {
  return (
    <Animated.View
      key={id}
      style={{ transform: [{ scale: getScale(id) }] }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.pillOuter}
      >
        {isSelected ? (
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pillGradient}
          >
            {icon ? (
              <Text style={styles.pillIconSelected}>{icon}</Text>
            ) : null}
            <Text style={styles.pillLabelSelected}>{label}</Text>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.pillInactive,
              {
                backgroundColor: colors.bgSubtle,
                borderColor: colors.borderSubtle,
              },
            ]}
          >
            {icon ? (
              <Text style={[styles.pillIcon, { color: colors.textTertiary }]}>
                {icon}
              </Text>
            ) : null}
            <Text style={[styles.pillLabel, { color: colors.textSecondary }]}>
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

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
  scrollContent: {
    alignItems: "center",
    paddingVertical: spacing.xs,
  },

  // Pill styles
  pillOuter: {
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  pillGradient: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
  },
  pillInactive: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  pillLabel: {
    ...typography.label,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  pillLabelSelected: {
    ...typography.label,
    fontWeight: "700",
    letterSpacing: 0.3,
    color: "#FFFFFF",
  },
  pillIcon: {
    fontSize: 11,
  },
  pillIconSelected: {
    fontSize: 11,
    color: "#FFFFFF",
  },
});
