import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import { RootStackParamList } from "../../../../types/navigation.types";
import KakaoSymbol from "./icons/KakaoSymbol";

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
    <YStack flex={1} padding="$4">
      <YStack flex={1} justifyContent="flex-end" alignItems="center">
        <Text fontSize="$8" fontWeight="bold">
          로그인
        </Text>
      </YStack>

      <YStack
        flex={2}
        justifyContent="center"
        alignItems="center"
        width="100%"
        space="$2"
      >
        <Button
          onPress={handleKakaoLogin}
          backgroundColor="#FEE500"
          pressStyle={{ backgroundColor: "#F2D500" }}
          width="100%"
          height="$5"
          borderRadius="$4"
          borderWidth={0}
          elevation="$1"
        >
          <XStack alignItems="center" justifyContent="center" space="$2.5">
            <KakaoSymbol size={18} />
            <Text color="#000000" opacity={0.85} fontWeight="700" fontSize="$4">
              카카오 로그인
            </Text>
          </XStack>
        </Button>

        {__DEV__ && (
          <Button
            onPress={() => navigation.navigate("DevLogin")}
            variant="outlined"
            width="100%"
          >
            테스트 로그인
          </Button>
        )}
      </YStack>
    </YStack>
  );
}
