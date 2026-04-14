import { useCallback, useRef } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { radius, spacing } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";

// ─── Icon maps ──────────────────────────────────────────────────────────────

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Discover: "compass",
  Matches: "heart",
  Saved: "bookmark",
  Chat: "chatbubble",
  Profile: "person",
};

const iconMapOutline: Record<string, keyof typeof Ionicons.glyphMap> = {
  Discover: "compass-outline",
  Matches: "heart-outline",
  Saved: "bookmark-outline",
  Chat: "chatbubble-outline",
  Profile: "person-outline",
};

// ─── Component ──────────────────────────────────────────────────────────────

export function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors, mode } = useTheme();
  const { t } = useTranslation("tabs");

  // Scale animation refs
  const scaleRefs = useRef<Record<string, Animated.Value>>({});
  const getScale = useCallback((key: string) => {
    if (!scaleRefs.current[key]) {
      scaleRefs.current[key] = new Animated.Value(1);
    }
    return scaleRefs.current[key];
  }, []);

  const isDark = mode === "dark";
  const currentRoute = state.routes[state.index]?.name;
  const isDiscover = currentRoute === "Discover";

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom - 8, 4) },
      ]}
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: isDark
              ? isDiscover
                ? "rgba(11, 18, 32, 0.8)"
                : "#0B1220"
              : isDiscover
                ? "rgba(255, 255, 255, 0.85)"
                : "#FFFFFF",
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.06)",
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const scale = getScale(route.key);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onPressIn = () => {
            Animated.spring(scale, {
              toValue: 0.85,
              useNativeDriver: true,
              tension: 300,
              friction: 20,
            }).start();
          };

          const onPressOut = () => {
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
              tension: 200,
              friction: 15,
            }).start();
          };

          const activeColor = colors.accent;
          const inactiveColor = isDark
            ? "rgba(255,255,255,0.35)"
            : "rgba(0,0,0,0.3)";

          return (
            <Animated.View
              key={route.key}
              style={[styles.itemWrap, { transform: [{ scale }] }]}
            >
              <Pressable
                style={[
                  styles.item,
                  isFocused && {
                    backgroundColor: isDark
                      ? "rgba(6, 182, 212, 0.2)"
                      : "rgba(6, 182, 212, 0.1)",
                    borderWidth: 1,
                    borderColor: isDark
                      ? "rgba(6, 182, 212, 0.25)"
                      : "rgba(6, 182, 212, 0.2)",
                  },
                ]}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={t(route.name.toLowerCase())}
              >
                <Ionicons
                  name={
                    isFocused
                      ? iconMap[route.name]
                      : iconMapOutline[route.name]
                  }
                  size={24}
                  color={isFocused ? activeColor : inactiveColor}
                />
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const ITEM_SIZE = 52;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  itemWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
