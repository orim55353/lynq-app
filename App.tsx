import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import { OnboardingNavigator } from "./src/navigation/OnboardingNavigator";
import { AppStack } from "./src/navigation/AppStack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { SavedJobsProvider } from "./src/context/SavedJobsContext";
import { LocaleProvider } from "./src/context/LocaleContext";
import { initI18n } from "./src/i18n/i18n";
import { themes } from "./src/constants/theme";

function RootNavigator() {
  const { user, loading, needsOnboarding, onboardingResumeRoute } = useAuth();
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

  if (needsOnboarding) {
    return <OnboardingNavigator initialRouteName={onboardingResumeRoute} />;
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
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setI18nReady(true));
  }, []);

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

  if (!i18nReady) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={t.accent} />
      </View>
    );
  }


  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <AuthProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar style={scheme === "dark" ? "light" : "dark"} />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
