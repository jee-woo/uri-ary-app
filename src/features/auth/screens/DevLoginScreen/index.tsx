import { Text, YStack } from "tamagui";
import DevAuthForm from "./components/DevAuthForm";

export default function DevLoginScreen() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        테스트 계정 로그인
      </Text>
      <DevAuthForm />
    </YStack>
  );
}
