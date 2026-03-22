import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import { AppStack } from "./src/navigation/AppStack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { SavedJobsProvider } from "./src/context/SavedJobsContext";
import { themes } from "./src/constants/theme";

function RootNavigator() {
  const { user, loading } = useAuth();
  const scheme = useColorScheme();
  const t = scheme === "dark" ? themes.dark : themes.light;

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={t.accent} />
      </View>
    );
  }

  if (!user) {
    return <AuthNavigator />;
  }

  return (
    <SavedJobsProvider>
      <AppStack />
    </SavedJobsProvider>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const t = scheme === "dark" ? themes.dark : themes.light;

  const navTheme = {
    ...(scheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === "dark" ? DarkTheme : DefaultTheme).colors,
      background: t.bg,
      card: t.bgElevated,
      text: t.text,
      border: t.border,
      primary: t.accent,
    },
  };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style={scheme === "dark" ? "light" : "dark"} />
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
