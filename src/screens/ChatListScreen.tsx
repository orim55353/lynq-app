import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../navigation/AppStack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef, useState, } from "react";
import {
  Animated,
  Easing,
  // FlatList replaced by FlashList
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ScreenHeader } from "../components/ScreenHeader";
import { accentGradient, screenGradient, screenGradientLight, spotlightGradient } from "../constants/gradients";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { chats } from "../data/chat";
import { useEntranceAnimations } from "../hooks/useEntranceAnimations";
import { useSpringPress } from "../hooks/useSpringPress";
import { useTheme } from "../hooks/useTheme";
import type { ChatMessage } from "../types/models";

/** Pulsing unread dot */
function UnreadDot({ color }: { readonly color: string }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[styles.unreadDot, { backgroundColor: color, opacity: pulse }]}
    />
  );
}

/** Single chat row in the list */
function ChatRow({
  chat,
  onPress,
  opacity,
  translateY,
}: {
  readonly chat: ChatMessage;
  readonly onPress: () => void;
  readonly opacity: Animated.Value;
  readonly translateY: Animated.Value;
}) {
  const { colors } = useTheme();
  const { scale, onPressIn, onPressOut } = useSpringPress({ pressedScale: 0.97 });

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.chatItem}
      >
        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={chat.unread ? (accentGradient as [string, string]) : [colors.glass, colors.glass]}
            style={[styles.avatarRing, chat.unread && shadows.glow]}
          >
            <View style={[styles.avatarInner, { backgroundColor: colors.bg }]}>
              <LinearGradient colors={accentGradient} style={styles.avatarBubble}>
                <Text style={styles.avatarText}>{chat.sender[0]}</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.chatMeta}>
          <View style={styles.chatMetaTop}>
            <Text
              style={[
                styles.chatSender,
                { color: colors.text },
                chat.unread && { fontWeight: "800" },
              ]}
            >
              {chat.sender}
            </Text>
            <Text style={[styles.chatTime, { color: colors.textTertiary }]}>
              {chat.timestamp}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={[styles.chatPreview, { color: colors.textSecondary }]}
          >
            {chat.text}
          </Text>
        </View>

        {chat.unread ? <UnreadDot color={colors.accent} /> : null}
      </Pressable>
    </Animated.View>
  );
}

export function ChatListScreen() {
  const { colors, mode } = useTheme();
  const searchBg = mode === "light" ? colors.bgElevated : colors.glass;
  const searchBgFocused = mode === "light" ? colors.bgCard : colors.glassHeavy;
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [searchFocused, setSearchFocused] = useState(false);

  const { opacities, translateYs, trigger } = useEntranceAnimations(
    chats.length,
    { staggerMs: 60 },
  );

  // Only animate on first mount, not when returning from conversation
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (!hasAnimated.current) {
      trigger();
      hasAnimated.current = true;
    }
  }, [trigger]);

  // Search bar focus animation
  const borderAnim = useRef(new Animated.Value(0)).current;
  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [borderAnim]);

  const handleSearchBlur = useCallback(() => {
    setSearchFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [borderAnim]);

  const keyExtractor = useCallback((item: ChatMessage) => item.id, []);

  const renderItem = useCallback(
    ({ item, index }: { item: ChatMessage; index: number }) => (
      <ChatRow
        chat={item}
        onPress={() => navigation.navigate("Conversation", { chatId: item.id })}
        opacity={opacities[index]}
        translateY={translateYs[index]}
      />
    ),
    [navigation, opacities, translateYs],
  );

  const searchBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.glassBorder, colors.accent],
  });

  return (
    <View style={styles.root}>
      <LinearGradient colors={mode === "dark" ? screenGradient : screenGradientLight} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={spotlightGradient}
        style={styles.spotlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScreenHeader
        title="הודעות"
        subtitle="שוחחו עם חברות שהותאמתם אליהן"
      />

      <View style={styles.listContainer}>
        {/* Search bar */}
        <Animated.View
          style={[
            styles.searchWrap,
            {
              backgroundColor: searchFocused ? searchBgFocused : searchBg,
              borderColor: searchBorderColor,
            },
          ]}
        >
          <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
          <TextInput
            placeholder="חיפוש הודעות..."
            placeholderTextColor={colors.textTertiary}
            style={[styles.searchInput, { color: colors.text }]}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </Animated.View>

        {/* Chat list */}
        <FlashList
          data={chats}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatList}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  spotlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  searchWrap: {
    borderRadius: radius.pill,
    height: 46,
    paddingHorizontal: spacing.lg,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    ...typography.bodySmall,
    textAlign: "right",
    writingDirection: "rtl",
  },
  chatList: {
    paddingBottom: 130,
  },
  chatItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  avatarWrap: {
    width: 52,
    height: 52,
  },
  avatarRing: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInner: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarBubble: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    ...typography.subheading,
    fontWeight: "700",
  },
  chatMeta: {
    flex: 1,
  },
  chatMetaTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  chatSender: {
    ...typography.bodySmall,
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  chatTime: {
    ...typography.caption,
    writingDirection: "rtl",
  },
  chatPreview: {
    ...typography.bodySmall,
    textAlign: "right",
    writingDirection: "rtl",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
  },
});
