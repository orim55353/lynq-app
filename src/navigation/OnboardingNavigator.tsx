import { CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRef } from "react";
import { OnboardingWelcomeScreen } from "../screens/onboarding/OnboardingWelcomeScreen";
import { OnboardingNameScreen } from "../screens/onboarding/OnboardingNameScreen";
import { OnboardingLocationScreen } from "../screens/onboarding/OnboardingLocationScreen";
import { OnboardingRoleScreen } from "../screens/onboarding/OnboardingRoleScreen";
import { OnboardingCertificationsScreen } from "../screens/onboarding/OnboardingCertificationsScreen";
import { OnboardingWorkPreferencesScreen } from "../screens/onboarding/OnboardingWorkPreferencesScreen";
import { OnboardingTraitsScreen } from "../screens/onboarding/OnboardingTraitsScreen";
import { useTheme } from "../hooks/useTheme";

export type OnboardingStackParamList = {
  Welcome: undefined;
  Name: undefined;
  Location: undefined;
  Role: undefined;
  Certifications: undefined;
  WorkPreferences: undefined;
  Traits: undefined;
};

/** Ordered route names matching the onboarding flow. */
const ROUTE_ORDER: (keyof OnboardingStackParamList)[] = [
  "Welcome",
  "Name",
  "Location",
  "Role",
  "Certifications",
  "WorkPreferences",
  "Traits",
];

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator({
  initialRouteName = "Welcome",
}: {
  readonly initialRouteName?: keyof OnboardingStackParamList;
}) {
  const { colors } = useTheme();
  const restored = useRef(false);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
      screenListeners={({ navigation }) => ({
        state: () => {
          // On first render, reset the stack to include the full back history
          // so native goBack() + swipe-back animations work from the resume step.
          if (restored.current || initialRouteName === "Welcome") return;
          restored.current = true;

          const targetIndex = ROUTE_ORDER.indexOf(initialRouteName);
          if (targetIndex <= 0) return;

          const routes = ROUTE_ORDER.slice(0, targetIndex + 1).map((name) => ({ name }));
          navigation.dispatch(
            CommonActions.reset({
              index: routes.length - 1,
              routes,
            }),
          );
        },
      })}
    >
      <Stack.Screen name="Welcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="Name" component={OnboardingNameScreen} />
      <Stack.Screen name="Location" component={OnboardingLocationScreen} />
      <Stack.Screen name="Role" component={OnboardingRoleScreen} />
      <Stack.Screen name="Certifications" component={OnboardingCertificationsScreen} />
      <Stack.Screen name="WorkPreferences" component={OnboardingWorkPreferencesScreen} />
      <Stack.Screen name="Traits" component={OnboardingTraitsScreen} />
    </Stack.Navigator>
  );
}
