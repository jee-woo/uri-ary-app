import { baseUrl } from "@/constants/api";
import { storeTokens } from "@/features/auth/utils/tokenManager";
import { RootStackParamList } from "@/types/navigation.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Text, YStack } from "tamagui";
import { z } from "zod";

const API_BASE_URL = baseUrl;

// ✅ Zod 스키마 정의
const devAuthSchema = z.object({
  email: z.email("유효한 이메일을 입력해주세요."),
  username: z.string().optional(), // 회원가입 시에만 사용
});

type DevAuthFormValues = z.infer<typeof devAuthSchema>;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function DevAuthForm() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DevAuthFormValues>({
    resolver: zodResolver(devAuthSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });

  // ✅ 개발자 로그인
  const handleDevLogin = async (data: DevAuthFormValues) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/dev/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) throw new Error(`로그인 실패: ${res.status}`);
      const { accessToken, refreshToken } = await res.json();
      await storeTokens({ accessToken, refreshToken });

      alert("✅ 개발자 로그인 성공!");
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } catch (e) {
      console.error(e);
      alert("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 테스트 사용자 생성
  const handleCreateTestUser = async (data: DevAuthFormValues) => {
    if (!data.username) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/dev/create-test-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
        }),
      });

      if (!res.ok) throw new Error(`회원가입 실패: ${res.status}`);
      alert("✅ 테스트 사용자 생성 성공!");
    } catch (e) {
      console.error(e);
      alert("회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack padding={20} gap={12}>
      <Text fontSize="$6" fontWeight="600">
        개발자 로그인 / 테스트 계정
      </Text>

      {/* ✅ 이메일 입력 */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <Input
            placeholder="이메일 입력"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text color="red">{errors.email.message}</Text>}

      {/* ✅ 닉네임 입력 (회원가입용) */}
      <Controller
        control={control}
        name="username"
        render={({ field: { value, onChange } }) => (
          <Input
            placeholder="닉네임 입력 (회원가입용)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && <Text color="red">{errors.username.message}</Text>}

      {/* ✅ 버튼 */}
      <Button disabled={loading} onPress={handleSubmit(handleDevLogin)}>
        개발자 로그인
      </Button>
      <Button
        variant="outlined"
        disabled={loading}
        onPress={handleSubmit(handleCreateTestUser)}
      >
        테스트 계정 생성
      </Button>
    </YStack>
  );
}
