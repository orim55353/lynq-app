import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, typography } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Discover: "compass",
  Matches: "heart",
  Chat: "chatbubble",
  Profile: "person",
};

const iconMapOutline: Record<string, keyof typeof Ionicons.glyphMap> = {
  Discover: "compass-outline",
  Matches: "heart-outline",
  Chat: "chatbubble-outline",
  Profile: "person-outline",
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8), backgroundColor: colors.bgElevated }]}>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = descriptors[route.key].options.title ?? route.name;
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

          return (
            <Pressable key={route.key} style={styles.item} onPress={onPress}>
              <Ionicons
                name={isFocused ? iconMap[route.name] : iconMapOutline[route.name]}
                size={24}
                color={isFocused ? colors.accent : colors.textTertiary}
              />
              <Text style={[styles.label, { color: isFocused ? colors.accent : colors.textTertiary }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  divider: {
    height: 1,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: spacing.sm,
  },
  item: {
    alignItems: "center",
    gap: spacing.xxs,
    paddingVertical: spacing.xs,
    minWidth: 64,
  },
  label: {
    ...typography.tab,
    textTransform: "uppercase",
  },
});
