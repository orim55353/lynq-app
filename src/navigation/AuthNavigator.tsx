import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
