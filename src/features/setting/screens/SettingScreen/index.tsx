import CommonHeader from "@/components/CommonHeader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, H4, YStack } from "tamagui";

import { RootStackParamList } from "@/types/navigation.types";
import { useAuthStore } from "@/features/auth/stores/authStore";

type SettingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function SettingScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();

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
