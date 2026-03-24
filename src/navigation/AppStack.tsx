import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { AppNavigator } from "./AppNavigator";
import { ConversationScreen } from "../screens/ConversationScreen";
import { JobDetailScreen } from "../screens/JobDetailScreen";
import { accentGradient } from "../constants/gradients";
import { radius, spacing, typography } from "../constants/theme";
import { chats } from "../data/chat";
import { useTheme } from "../hooks/useTheme";

export type AppStackParamList = {
  Tabs: undefined;
  JobDetail: { jobId: string; source?: "matches" };
  Conversation: { chatId: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * Root stack wrapping the tab navigator.
 * Screens pushed here naturally cover the tab bar
 * with native iOS/Android transitions.
 */
export function AppStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="Tabs" component={AppNavigator} />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={({ route }) => {
          const chat = chats.find((c) => c.id === route.params.chatId);
          return {
            headerShown: true,
            headerBlurEffect: "dark",
            headerTintColor: colors.text,
            headerBackTitle: "Messages",
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
            headerTitle: () => (
              <View style={headerStyles.titleRow}>
                <LinearGradient colors={accentGradient} style={headerStyles.avatar}>
                  <Text style={headerStyles.avatarText}>
                    {chat?.sender?.[0] ?? "?"}
                  </Text>
                </LinearGradient>
                <Text style={[headerStyles.name, { color: colors.text }]}>
                  {chat?.sender ?? "Chat"}
                </Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: colors.glass,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
}

const headerStyles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  name: {
    ...typography.bodySmall,
    fontWeight: "700",
  },
});
