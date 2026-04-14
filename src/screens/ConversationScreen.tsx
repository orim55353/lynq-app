import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { flipStyle } from "../i18n/useDirection";
import { accentGradient, screenGradient, screenGradientLight } from "../constants/gradients";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { chats } from "../data/chat";
import { useSpringPress } from "../hooks/useSpringPress";
import { useTheme } from "../hooks/useTheme";
import type { AppStackParamList } from "../navigation/AppStack";

type Props = NativeStackScreenProps<AppStackParamList, "Conversation">;

export function ConversationScreen() {
  const { t } = useTranslation("chat");
  const { colors, mode } = useTheme();
  const bubbleBg = mode === "light" ? colors.bgCard : colors.glass;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<Props["route"]>();
  const [messageText, setMessageText] = useState("");
  const sendPress = useSpringPress({ pressedScale: 0.9 });

  const chat = useMemo(
    () => chats.find((c) => c.id === route.params.chatId) ?? null,
    [route.params.chatId],
  );

  if (chat == null) return null;

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <LinearGradient colors={mode === "dark" ? screenGradient : screenGradientLight} style={StyleSheet.absoluteFill} />

      {/* Messages */}
      <ScrollView
        style={styles.messageRegion}
        contentContainerStyle={styles.messageContent}
      >
        <View
          style={[
            styles.incomingBubble,
            {
              backgroundColor: bubbleBg,
              borderColor: colors.glassBorder,
            },
          ]}
        >
          <Text style={[styles.incomingText, { color: colors.text }]}>
            {chat.text}
          </Text>
          <Text style={[styles.incomingTime, { color: colors.textTertiary }]}>
            {chat.timestamp}
          </Text>
        </View>
      </ScrollView>

      {/* Input bar */}
      <View
        style={[
          styles.inputBar,
          {
            backgroundColor: colors.glass,
            borderTopColor: colors.glassBorder,
            paddingBottom: insets.bottom + spacing.sm,
          },
        ]}
      >
        <TextInput
          defaultValue={messageText}
          onChangeText={setMessageText}
          placeholder={t("input_placeholder")}
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.messageInput,
            {
              backgroundColor: colors.bgSubtle,
              color: colors.text,
              borderColor: colors.glassBorder,
            },
          ]}
        />
        <Pressable
          onPressIn={sendPress.onPressIn}
          onPressOut={sendPress.onPressOut}
          style={styles.sendWrap}
        >
          <LinearGradient
            colors={accentGradient}
            style={[styles.sendButton, shadows.glow]}
          >
            <Ionicons name="send" size={16} color="#FFFFFF" style={flipStyle()} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  messageRegion: {
    flex: 1,
  },
  messageContent: {
    padding: spacing.xl,
  },
  incomingBubble: {
    maxWidth: "85%",
    borderRadius: radius.md,
    borderTopStartRadius: 0,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  incomingText: {
    ...typography.bodySmall,
  },
  incomingTime: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  inputBar: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: 1,
  },
  messageInput: {
    flex: 1,
    height: 44,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    ...typography.bodySmall,
  },
  sendWrap: {
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
