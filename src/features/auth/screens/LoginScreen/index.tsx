import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import KakaoSymbol from "./icons/KakaoSymbol";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Login">;

const API_BASE_URL = Constants.expoConfig?.extra?.eas?.apiBaseUrl;

export default function LoginScreen() {
  const navigation = useNavigation<Navigation>();
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = () => {
    const loginUrl = `${API_BASE_URL}/oauth2/authorization/kakao`;
    Linking.openURL(loginUrl);
    setIsLoading(true);
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
          disabledStyle={{ opacity: 0.5 }}
          width="100%"
          height="$5"
          borderRadius="$4"
          borderWidth={0}
          elevation="$1"
          disabled={isLoading}
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
            width="100%"
            backgroundColor="$color2"
            color="$color12"
          >
            테스트 로그인
          </Button>
        )}
      </YStack>
    </YStack>
  );
}
