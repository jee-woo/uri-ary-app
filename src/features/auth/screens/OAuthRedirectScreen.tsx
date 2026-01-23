import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Text, YStack } from "tamagui";

import { useAuthStore } from "@/features/auth/stores/authStore";
import { storeTokens } from "@/features/auth/utils/tokenManager";
import { exchangeCodeForTokens } from "@/services/apiClient";
import { RootStackParamList } from "@/types/navigation.types";

type OAuthRedirectRouteProp = RouteProp<RootStackParamList, "OAuthRedirect">;
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function OAuthRedirectScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<OAuthRedirectRouteProp>();
  const login = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);

  // linking 설정에 의해 code 파라미터가 route.params에 자동으로 매핑됩니다.
  const code = route.params?.code;

  useEffect(() => {
    const processLogin = async () => {
      if (!code) {
        console.error("인증 코드가 없습니다.");
        navigation.replace("Login");
        return;
      }

      try {
        // 1. 서버와 토큰 교환
        const { accessToken, refreshToken, user } =
          await exchangeCodeForTokens(code);

        // 2. 토큰, user 정보 저장
        await storeTokens({ accessToken, refreshToken });
        setUser(user);

        // 3. 전역 로그인 상태 변경 (이 시점에 AuthenticatedLayout이 활성화되어 키 등록 훅이 실행됩니다)
        login();

        // 4. 홈으로 이동 (replace를 사용하여 뒤로가기 시 다시 리다이렉트 화면으로 오지 않게 함)
        navigation.replace("Home");
      } catch (error) {
        console.error("토큰 교환 실패:", error);
        navigation.replace("Login");
      }
    };

    processLogin();
  }, [code, login, navigation]);

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="$background"
    >
      <ActivityIndicator size="large" color="$color" />
      <Text marginTop="$4" fontSize="$5">
        로그인 처리 중입니다...
      </Text>
    </YStack>
  );
}
