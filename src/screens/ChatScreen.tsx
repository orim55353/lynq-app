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
import { colors, radius } from "../constants/theme";
import { chats } from "../data/chat";

export function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChat) ?? null,
    [selectedChat],
  );

  return (
    <LinearGradient colors={["#FAF5FF", "#FDF2F8"]} style={styles.background}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.page}>
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.subtitle}>Chat with companies you've matched with</Text>

          <View style={styles.shell}>
            <View style={styles.searchWrap}>
              <Ionicons name="search-outline" size={20} color={colors.gray400} />
              <TextInput placeholder="Search messages..." placeholderTextColor={colors.gray400} style={styles.searchInput} />
            </View>

            <View style={styles.chatShell}>
              <View style={styles.chatListCol}>
                <FlatList
                  data={chats}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const active = selectedChat === item.id;
                    return (
                      <Pressable
                        onPress={() => setSelectedChat(item.id)}
                        style={[styles.chatItem, active && styles.chatItemActive]}
                      >
                        <LinearGradient colors={[colors.purple500, colors.pink500]} style={styles.avatarBubble}>
                          <Text style={styles.avatarText}>{item.sender[0]}</Text>
                        </LinearGradient>
                        <View style={styles.chatMeta}>
                          <View style={styles.chatMetaTop}>
                            <Text style={styles.chatSender}>{item.sender}</Text>
                            <Text style={styles.chatTime}>{item.timestamp}</Text>
                          </View>
                          <Text numberOfLines={1} style={styles.chatPreview}>
                            {item.text}
                          </Text>
                        </View>
                        {item.unread ? <View style={styles.unreadDot} /> : null}
                      </Pressable>
                    );
                  }}
                />
              </View>

              <View style={styles.chatWindowCol}>
                {activeChat ? (
                  <>
                    <View style={styles.chatHeader}>
                      <LinearGradient colors={[colors.purple500, colors.pink500]} style={styles.headerAvatar}>
                        <Text style={styles.avatarText}>{activeChat.sender[0]}</Text>
                      </LinearGradient>
                      <View>
                        <Text style={styles.headerName}>{activeChat.sender}</Text>
                        <Text style={styles.headerState}>Active now</Text>
                      </View>
                    </View>

                    <ScrollView style={styles.messageRegion} contentContainerStyle={styles.messageContent}>
                      <View style={styles.incomingBubble}>
                        <Text style={styles.incomingText}>{activeChat.text}</Text>
                        <Text style={styles.incomingTime}>{activeChat.timestamp}</Text>
                      </View>
                    </ScrollView>

                    <View style={styles.inputRow}>
                      <TextInput
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.gray400}
                        style={styles.messageInput}
                      />
                      <LinearGradient colors={[colors.purple500, colors.pink500]} style={styles.sendButton}>
                        <Ionicons name="send" size={17} color={colors.white} />
                      </LinearGradient>
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyCenter}>
                    <Text style={styles.emptyCenterText}>Select a chat to start messaging</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  page: { flex: 1, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 96 },
  title: { fontSize: 38, lineHeight: 42, fontWeight: "800", color: colors.gray900, marginBottom: 2 },
  subtitle: { fontSize: 16, color: colors.gray500, marginBottom: 10 },
  shell: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 12,
  },
  searchWrap: {
    backgroundColor: colors.gray100,
    borderRadius: radius.pill,
    height: 42,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  searchInput: { flex: 1, color: colors.gray900, fontSize: 14 },
  chatShell: { flex: 1, marginTop: 12, borderRadius: radius.lg, overflow: "hidden", borderWidth: 1, borderColor: colors.gray200 },
  chatListCol: {
    maxHeight: 270,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  chatItemActive: { backgroundColor: "#FAF5FF" },
  avatarBubble: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.white, fontSize: 16, fontWeight: "800" },
  chatMeta: { flex: 1 },
  chatMetaTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  chatSender: { color: colors.gray900, fontWeight: "700", fontSize: 15 },
  chatTime: { color: colors.gray400, fontSize: 12 },
  chatPreview: { color: colors.gray500, fontSize: 13 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.purple500,
    marginTop: 6,
  },
  chatWindowCol: { flex: 1 },
  chatHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    padding: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  headerName: { color: colors.gray900, fontSize: 15, fontWeight: "700" },
  headerState: { color: colors.green500, fontSize: 12, marginTop: 2 },
  messageRegion: { flex: 1, backgroundColor: colors.gray50 },
  messageContent: { padding: 14 },
  incomingBubble: {
    maxWidth: "88%",
    backgroundColor: colors.white,
    borderRadius: 14,
    borderTopLeftRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  incomingText: { color: colors.gray900, fontSize: 14, lineHeight: 20 },
  incomingTime: { color: colors.gray400, marginTop: 4, fontSize: 11 },
  inputRow: {
    borderTopWidth: 1,
    borderColor: colors.gray200,
    flexDirection: "row",
    padding: 10,
    gap: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    color: colors.gray900,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyCenterText: { color: colors.gray400, fontSize: 15 },
});
