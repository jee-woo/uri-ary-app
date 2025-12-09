import { storeTokens } from "@/features/auth/utils/tokenManager";
import { exchangeCodeForTokens } from "@/services/apiClient";
import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import KakaoSymbol from "./icons/KakaoSymbol";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Login">;

const API_BASE_URL = Constants.expoConfig?.extra?.eas?.apiBaseUrl;

export default function LoginScreen() {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      const { queryParams } = Linking.parse(url);
      const code = queryParams?.code as string | undefined;

      if (code) {
        try {
          const { accessToken, refreshToken } = await exchangeCodeForTokens(
            code
          );
          await storeTokens({ accessToken, refreshToken });
          navigation.navigate("Home");
        } catch (error) {
          console.error("Failed to exchange code for tokens:", error);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => subscription.remove();
  }, [navigation]);

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
