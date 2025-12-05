import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";

import DevLoginScreen from "@/features/auth/screens/DevLoginScreen";
import LoginScreen from "@/features/auth/screens/LoginScreen";
import { getAccessToken } from "@/features/auth/utils/tokenManager";
import DiaryCreateScreen from "@/features/diary/screens/DiaryCreateScreen";
import DiaryDetailScreen from "@/features/diary/screens/DiaryDetailScreen";
import GroupCreateScreen from "@/features/group/screens/GroupCreateScreen";
import GroupListScreen from "@/features/group/screens/GroupListScreen";
import GroupScreen from "@/features/group/screens/GroupScreen";
import SettingScreen from "@/features/setting/screens/SettingScreen";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { config } from "../tamagui.config";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
//       staleTime: 10 * 60 * 1000,
    },
  },
});

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
      const accessToken = await getAccessToken();
      setIsLoggedIn(!!accessToken);
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
        {/* <KeyboardProvider> */}
        <ToastProvider swipeDirection="horizontal">
          <ToastViewport
            multipleToasts
            position="absolute"
            top={undefined}
            bottom={20}
            left={0}
            right={0}
            width="100%"
            alignItems="center"
          />
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
                    <Stack.Screen
                      name="DiaryCreate"
                      component={DiaryCreateScreen}
                      options={{ title: "일기 작성" }}
                    />
                    <Stack.Screen name="Diary" component={DiaryDetailScreen} />
                    <Stack.Screen name="Setting" component={SettingScreen} />
                  </Stack.Navigator>
                </Suspense>
              </NavigationContainer>
            </SafeAreaView>
          </SafeAreaProvider>
        </ToastProvider>
        {/* </KeyboardProvider> */}
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
