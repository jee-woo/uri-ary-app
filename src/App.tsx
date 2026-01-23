import ErrorFallback from "@/components/ErrorFallback";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { config } from "../tamagui.config";
import AuthenticatedLayout from "./components/layouts/AuthenticatedLayout";
import ScreenLayout from "./components/layouts/ScreenLayout";
import { useAuthStore } from "./features/auth/stores/authStore";
import NavigationContent from "./navigation/components/NavigationContent";
import { queryClient } from "./services/queryClient";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
export default function App() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  useReactQueryDevTools(queryClient); // 디버깅 도구 초기화
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
                      {isAuthenticated ? (
                        <AuthenticatedLayout>
                          <NavigationContent
                            isAuthenticated={isAuthenticated}
                          />
                        </AuthenticatedLayout>
                      ) : (
                        <NavigationContent isAuthenticated={isAuthenticated} />
                      )}
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
