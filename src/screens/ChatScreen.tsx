import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { accentGradient } from "../constants/gradients";
import { chats } from "../data/chat";
import { useTheme } from "../hooks/useTheme";

export function ChatScreen() {
  const { colors } = useTheme();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChat) ?? null,
    [selectedChat],
  );

  return (
    <View style={[styles.background, { backgroundColor: colors.bg }]}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.page}>
          <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Chat with companies you've matched with</Text>

          <View style={[styles.shell, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
            <View style={[styles.searchWrap, { backgroundColor: colors.bgSubtle, borderColor: colors.border }]}>
              <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
              <TextInput placeholder="Search messages..." placeholderTextColor={colors.textTertiary} style={[styles.searchInput, { color: colors.text }]} />
            </View>

            <View style={[styles.chatShell, { borderColor: colors.border }]}>
              <View style={[styles.chatListCol, { borderColor: colors.border }]}>
                <FlatList
                  data={chats}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const active = selectedChat === item.id;
                    return (
                      <Pressable
                        onPress={() => setSelectedChat(item.id)}
                        style={[styles.chatItem, { borderBottomColor: colors.borderSubtle }, active && { backgroundColor: colors.accentSoft }]}
                      >
                        <LinearGradient colors={accentGradient} style={styles.avatarBubble}>
                          <Text style={styles.avatarText}>{item.sender[0]}</Text>
                        </LinearGradient>
                        <View style={styles.chatMeta}>
                          <View style={styles.chatMetaTop}>
                            <Text style={[styles.chatSender, { color: colors.text }]}>{item.sender}</Text>
                            <Text style={[styles.chatTime, { color: colors.textTertiary }]}>{item.timestamp}</Text>
                          </View>
                          <Text numberOfLines={1} style={[styles.chatPreview, { color: colors.textSecondary }]}>{item.text}</Text>
                        </View>
                        {item.unread ? <View style={[styles.unreadDot, { backgroundColor: colors.accent }]} /> : null}
                      </Pressable>
                    );
                  }}
                />
              </View>

              <View style={styles.chatWindowCol}>
                {activeChat ? (
                  <>
                    <View style={[styles.chatHeader, { borderBottomColor: colors.border }]}>
                      <LinearGradient colors={accentGradient} style={styles.headerAvatar}>
                        <Text style={styles.avatarText}>{activeChat.sender[0]}</Text>
                      </LinearGradient>
                      <View>
                        <Text style={[styles.headerName, { color: colors.text }]}>{activeChat.sender}</Text>
                        <Text style={[styles.headerState, { color: colors.success }]}>Active now</Text>
                      </View>
                    </View>

                    <ScrollView style={[styles.messageRegion, { backgroundColor: colors.bg }]} contentContainerStyle={styles.messageContent}>
                      <View style={[styles.incomingBubble, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
                        <Text style={[styles.incomingText, { color: colors.text }]}>{activeChat.text}</Text>
                        <Text style={[styles.incomingTime, { color: colors.textTertiary }]}>{activeChat.timestamp}</Text>
                      </View>
                    </ScrollView>

                    <View style={[styles.inputRow, { borderColor: colors.border }]}>
                      <TextInput
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.textTertiary}
                        style={[styles.messageInput, { backgroundColor: colors.bgSubtle, color: colors.text, borderColor: colors.border }]}
                      />
                      <View style={styles.sendButtonWrap}>
                        <LinearGradient colors={accentGradient} style={[styles.sendButton, shadows.glow]}>
                          <Ionicons name="send" size={16} color={colors.textInverse} />
                        </LinearGradient>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyCenter}>
                    <View style={[styles.emptyIconWrap, { backgroundColor: colors.bgSubtle }]}>
                      <Ionicons name="chatbubble-outline" size={32} color={colors.textTertiary} />
                    </View>
                    <Text style={[styles.emptyCenterText, { color: colors.textTertiary }]}>Select a chat to start messaging</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  page: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 96 },
  title: { ...typography.displayLarge, marginBottom: spacing.xxs },
  subtitle: { ...typography.body, marginBottom: spacing.lg },
  shell: { flex: 1, borderRadius: radius.xl, padding: spacing.md, borderWidth: 1 },
  searchWrap: { borderRadius: radius.pill, height: 42, paddingHorizontal: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.sm, borderWidth: 1 },
  searchInput: { flex: 1, ...typography.bodySmall },
  chatShell: { flex: 1, marginTop: spacing.md, borderRadius: radius.lg, overflow: "hidden", borderWidth: 1 },
  chatListCol: { maxHeight: 270, borderBottomWidth: 1 },
  chatItem: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, padding: spacing.md, borderBottomWidth: 1 },
  avatarBubble: { width: 44, height: 44, borderRadius: radius.pill, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFFFFF", ...typography.subheading },
  chatMeta: { flex: 1 },
  chatMetaTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  chatSender: { ...typography.bodySmall, fontWeight: "700" },
  chatTime: { ...typography.caption },
  chatPreview: { ...typography.bodySmall },
  unreadDot: { width: 8, height: 8, borderRadius: radius.pill, marginTop: spacing.sm },
  chatWindowCol: { flex: 1 },
  chatHeader: { borderBottomWidth: 1, padding: spacing.md, flexDirection: "row", gap: spacing.md, alignItems: "center" },
  headerAvatar: { width: 40, height: 40, borderRadius: radius.pill, alignItems: "center", justifyContent: "center" },
  headerName: { ...typography.bodySmall, fontWeight: "700" },
  headerState: { ...typography.caption, marginTop: 2 },
  messageRegion: { flex: 1 },
  messageContent: { padding: spacing.lg },
  incomingBubble: { maxWidth: "88%", borderRadius: radius.md, borderTopLeftRadius: 0, paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderWidth: 1 },
  incomingText: { ...typography.bodySmall },
  incomingTime: { ...typography.caption, marginTop: spacing.xs },
  inputRow: { borderTopWidth: 1, flexDirection: "row", padding: spacing.sm, gap: spacing.sm },
  messageInput: { flex: 1, borderRadius: radius.pill, paddingHorizontal: spacing.lg, ...typography.bodySmall, borderWidth: 1 },
  sendButtonWrap: { borderRadius: radius.pill, overflow: "hidden" },
  sendButton: { width: 44, height: 44, borderRadius: radius.pill, alignItems: "center", justifyContent: "center" },
  emptyCenter: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.md },
  emptyIconWrap: { width: 64, height: 64, borderRadius: radius.pill, justifyContent: "center", alignItems: "center" },
  emptyCenterText: { ...typography.body },
});
