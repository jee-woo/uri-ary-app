import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { defaultConfig } from "@tamagui/config/v4";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ActivityIndicator, View } from "react-native";
import { TamaguiProvider, createTamagui } from "tamagui";
import LoginScreen from "../features/auth/screens/LoginScreen";
import GroupCreateScreen from "../features/group/screens/GroupCreateScreen";
import GroupScreen from "../features/group/screens/GroupScreen";
import MyGroupListScreen from "../features/group/screens/MyGroupListScreen";

const Stack = createNativeStackNavigator();
const config = createTamagui(defaultConfig);
const queryClient = new QueryClient();

const linking = {
  prefixes: [window.location.origin],
  config: {
    screens: {
      Home: "/",
      Login: "/login",
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
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "Home" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={MyGroupListScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Group" component={GroupScreen} />
            <Stack.Screen name="GroupCreate" component={GroupCreateScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
