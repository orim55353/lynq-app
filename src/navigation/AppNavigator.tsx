import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "../components/BottomTabBar";
import { DiscoverScreen } from "../screens/DiscoverScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SavedScreen } from "../screens/SavedScreen";
import { ChatListScreen } from "../screens/ChatListScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTheme } from "../hooks/useTheme";

export type RootTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Saved: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Discover"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ tabBarLabel: "גלו" }} />
      <Tab.Screen name="Matches" component={MatchesScreen} options={{ tabBarLabel: "התאמות" }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ tabBarLabel: "שמורות" }} />
      <Tab.Screen name="Chat" component={ChatListScreen} options={{ tabBarLabel: "צ׳אט" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "פרופיל" }} />
    </Tab.Navigator>
  );
}
