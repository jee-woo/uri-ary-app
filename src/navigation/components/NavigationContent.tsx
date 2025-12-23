import DevLoginScreen from "@/features/auth/screens/DevLoginScreen";
import LoginScreen from "@/features/auth/screens/LoginScreen";
import OAuthRedirectScreen from "@/features/auth/screens/OAuthRedirectScreen";
import DiaryCreateScreen from "@/features/diary/screens/DiaryCreateScreen";
import DiaryDetailScreen from "@/features/diary/screens/DiaryDetailScreen";
import GroupCreateScreen from "@/features/group/screens/GroupCreateScreen";
import GroupListScreen from "@/features/group/screens/GroupListScreen";
import GroupScreen from "@/features/group/screens/GroupScreen";
import SettingScreen from "@/features/setting/screens/SettingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Platform.OS === "web" ? window.location.origin : "uriary://"],
  config: {
    screens: {
      Home: "/",
      Login: "/login",
      DevLogin: "/test-login",
      GroupCreate: "/groups/new",
      Group: "groups/:groupId",
      OAuthRedirect: "/oauth-redirect",
    },
  },
};

export default function NavigationContent({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={GroupListScreen} />
        <Stack.Screen name="Group" component={GroupScreen} />
        <Stack.Screen
          name="GroupCreate"
          component={GroupCreateScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="DiaryCreate"
          component={DiaryCreateScreen}
          options={{ title: "일기 작성" }}
        />
        <Stack.Screen name="Diary" component={DiaryDetailScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DevLogin" component={DevLoginScreen} />
        <Stack.Screen name="OAuthRedirect" component={OAuthRedirectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
