import { useAuthStore } from "@/features/auth/stores/authStore";
import axios from "axios";
import { AlertTriangle } from "lucide-react-native";
import { useEffect } from "react";
import { Button, styled, Text, YStack } from "tamagui";

interface Props {
  error: Error;
  resetError: () => void;
}
const StyledAlertTriangle = styled(AlertTriangle, {
  name: "StyledAlertTriangle",
});

const ErrorFallback = ({ error, resetError }: Props) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    // 에러가 발생했는데 이미 로그아웃 상태(isAuthenticated === false)라면
    // 또는 에러 코드 자체가 401이라면
    if (
      (axios.isAxiosError(error) && error.response?.status === 401) ||
      !isAuthenticated
    ) {
      // 에러 바운더리를 초기화하여 내비게이션이 다시 그려지도록 유도
      resetError();
    }
  }, [error, isAuthenticated, resetError]);

  if (axios.isAxiosError(error) && error.response?.status === 401) {
    return null;
  }
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap={16}
      padding={20}
    >
      <StyledAlertTriangle size={48} color="$red10" />
      <YStack gap={4} alignItems="center">
        <Text fontSize="$6" fontWeight="bold" color="$color12">
          에러가 발생했습니다.
        </Text>
        <Text fontSize="$4" color="$color11" textAlign="center">
          {error.message}
        </Text>
      </YStack>
      <Button onPress={resetError}>재시도</Button>
    </YStack>
  );
};

export default ErrorFallback;
