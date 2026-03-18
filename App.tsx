import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { SavedJobsProvider } from "./src/context/SavedJobsContext";
import { colors } from "./src/constants/theme";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.gray50, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.purple500} />
      </View>
    );
  }

  if (!user) {
    return <AuthNavigator />;
  }

  return (
    <SavedJobsProvider>
      <AppNavigator />
    </SavedJobsProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" />
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
