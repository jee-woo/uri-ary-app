import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import { Button, Text, YStack } from "tamagui";
import { RootStackParamList } from "../../../types/navigation.types";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Login">;

const API_BASE_URL = Constants.expoConfig?.extra?.eas?.apiBaseUrl;
export default function LoginScreen() {
  const navigation = useNavigation<Navigation>();

  // ✅ 토큰 저장 + 홈 이동 공통 함수
  const handleLoginSuccess = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);

      navigation.navigate("Home");
    } catch (err) {
      console.error("❌ 토큰 저장 실패:", err);
    }
  };

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const { queryParams } = Linking.parse(url);
      const token = queryParams?.token as string | undefined;

      if (token) {
        handleLoginSuccess(token);
      }
    };

    // ✅ 앱 실행 중 딥링크 수신
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // ✅ 앱이 꺼져 있다가 다시 실행될 경우 (처음 한 번만 체크)
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);

  // ✅ 카카오 로그인 버튼 클릭 → 백엔드 OAuth2 로그인 페이지 열기
  const handleKakaoLogin = () => {
    const loginUrl = `${API_BASE_URL}/oauth2/authorization/kakao`;
    Linking.openURL(loginUrl);
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        로그인
      </Text>
      <Button onPress={handleKakaoLogin}>카카오 로그인</Button>
    </YStack>
  );
}
