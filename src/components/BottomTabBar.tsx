import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Discover: "home",
  Matches: "heart",
  Saved: "bookmark",
  Chat: "chatbubble-ellipses",
  Profile: "person",
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}> 
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
              {isFocused ? (
                <LinearGradient
                  colors={[colors.purple500, colors.pink500]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.activeLine}
                />
              ) : null}
              <View style={[styles.iconWrap, isFocused && styles.activeIconWrap]}>
                <Ionicons
                  name={iconMap[route.name]}
                  size={22}
                  color={isFocused ? colors.white : colors.gray600}
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
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 12,
    elevation: 12,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  item: {
    alignItems: "center",
    width: 68,
    gap: 4,
    position: "relative",
  },
  activeLine: {
    position: "absolute",
    top: -8,
    width: 30,
    height: 4,
    borderRadius: radius.pill,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrap: {
    backgroundColor: colors.purple500,
  },
  label: {
    fontSize: 11,
    color: colors.gray600,
    fontWeight: "600",
  },
  activeLabel: {
    color: colors.purple500,
  },
});
