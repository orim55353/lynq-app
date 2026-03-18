import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Discover: "home",
  Matches: "heart",
  Chat: "chatbubble-ellipses",
  Profile: "person",
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 10) }]}>
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
              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <Ionicons
                  name={iconMap[route.name]}
                  size={24}
                  color={isFocused ? colors.purple500 : colors.gray600}
                  style={isFocused ? styles.activeIcon : undefined}
                />
              </View>
              <Text style={[styles.label, isFocused && styles.activeLabel]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  inner: {
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.84)",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  item: {
    alignItems: "center",
    width: 72,
    gap: 2,
    position: "relative",
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapActive: {
    transform: [{ scale: 1.1 }],
  },
  activeIcon: {
    textShadowColor: "rgba(168, 85, 247, 0.65)",
    textShadowRadius: 8,
  },
  label: {
    fontSize: 10,
    color: colors.gray600,
    fontWeight: "500",
  },
  activeLabel: {
    color: colors.purple500,
  },
});
