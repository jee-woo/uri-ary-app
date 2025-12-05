import CommonHeader from "@/components/CommonHeader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, H4, YStack } from "tamagui";

import { clearTokens } from "@/features/auth/utils/tokenManager";
import { RootStackParamList } from "@/types/navigation.types";

type SettingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function SettingScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();

  const handleLogout = async () => {
    await clearTokens();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <YStack flex={1}>
      <CommonHeader center={<H4>설정</H4>} />
      <YStack flex={1} justifyContent="center" alignItems="center" space>
        <Button onPress={handleLogout}>로그아웃</Button>
      </YStack>
    </YStack>
  );
}
