import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { defaultConfig, themes } from "@tamagui/config/v4";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";

import DevLoginScreen from "@/features/auth/screens/DevLoginScreen";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider, createTamagui } from "tamagui";
import LoginScreen from "../features/auth/screens/LoginScreen";
import GroupCreateScreen from "../features/group/screens/GroupCreateScreen";
import GroupListScreen from "../features/group/screens/GroupListScreen";
import GroupScreen from "../features/group/screens/GroupScreen";

const Stack = createNativeStackNavigator();
const config = createTamagui({
  ...defaultConfig,
  themes,
});
const queryClient = new QueryClient();

const linking = {
  prefixes: [Platform.OS === "web" ? window.location.origin : "uriary://"],
  config: {
    screens: {
      Home: "/",
      Login: "/login",
      DevLogin: "/test-login",
      GroupCreate: "/groups/new",
      Group: "groups/:groupId",
    },
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <SafeAreaProvider>
          <StatusBar />
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer linking={linking}>
              <Suspense>
                <Stack.Navigator
                  initialRouteName={isLoggedIn ? "Home" : "Login"}
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="Home" component={GroupListScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="DevLogin" component={DevLoginScreen} />
                  <Stack.Screen name="Group" component={GroupScreen} />
                  <Stack.Screen
                    name="GroupCreate"
                    component={GroupCreateScreen}
                    options={{
                      presentation: "modal",
                      animation: "slide_from_bottom",
                    }}
                  />
                </Stack.Navigator>
              </Suspense>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
