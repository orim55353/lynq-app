import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "../components/BottomTabBar";
import { ChatScreen } from "../screens/ChatScreen";
import { DiscoverScreen } from "../screens/DiscoverScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SavedScreen } from "../screens/SavedScreen";

export type RootTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Saved: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Discover"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
