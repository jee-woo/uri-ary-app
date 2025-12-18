import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/ErrorFallback";
import DevLoginScreen from "@/features/auth/screens/DevLoginScreen";
import LoginScreen from "@/features/auth/screens/LoginScreen";
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
import ScreenLayout from "./components/layouts/ScreenLayout";
import { useAuthStore } from "./features/auth/stores/authStore";
import { queryClient } from "./services/queryClient";

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
    },
  },
};

export default function App() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();

  useEffect(() => {
    initialize(); // 앱 구동 시 1회 실행
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
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    key={isAuthenticated ? "auth" : "guest"}
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary, error }) => (
                      <ErrorFallback
                        error={error}
                        resetError={resetErrorBoundary}
                      />
                    )}
                  >
                    <ScreenLayout>
                      <NavigationContainer linking={linking}>
                        <Stack.Navigator
                          initialRouteName={isAuthenticated ? "Home" : "Login"}
                          screenOptions={{ headerShown: false }}
                        >
                          <Stack.Screen
                            name="Home"
                            component={GroupListScreen}
                          />
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
                          />
                          <Stack.Screen
                            name="Diary"
                            component={DiaryDetailScreen}
                          />
                          <Stack.Screen
                            name="Setting"
                            component={SettingScreen}
                          />
                          <Stack.Screen name="Login" component={LoginScreen} />
                          <Stack.Screen
                            name="DevLogin"
                            component={DevLoginScreen}
                          />
                        </Stack.Navigator>
                      </NavigationContainer>
                    </ScreenLayout>
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            </SafeAreaView>
          </SafeAreaProvider>
        </ToastProvider>
        {/* </KeyboardProvider> */}
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
