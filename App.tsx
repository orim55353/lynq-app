import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { SavedJobsProvider } from "./src/context/SavedJobsContext";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SavedJobsProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </SavedJobsProvider>
    </SafeAreaProvider>
  );
}
