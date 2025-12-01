import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, YStack } from "tamagui";

import { RootStackParamList } from "@/types/navigation.types";

type SettingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function SettingScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <Button onPress={handleLogout}>로그아웃</Button>
    </YStack>
  );
}
