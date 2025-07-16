import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, ScrollView, Spinner, Text, YStack } from "tamagui";
import { z } from "zod";

import { RootStackParamList } from "../../../types/navigation.types";

const groupSchema = z.object({
  name: z.string().min(1, "그룹 이름을 입력해주세요"),
});
type GroupForm = z.infer<typeof groupSchema>;

type GroupCreateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GroupCreate"
>;

export default function GroupCreateScreen() {
  const navigation = useNavigation<GroupCreateNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GroupForm>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: GroupForm) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: data.name }),
        }
      );

      if (!res.ok) {
        throw new Error("그룹 생성 실패");
      }

      const group = await res.json();
      alert("그룹이 생성되었습니다!");
      navigation.navigate("Group", { groupId: group.id });
    } catch (e) {
      console.error("그룹 생성 오류:", e);
      alert("그룹 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScrollView>
      <YStack flex={1} padding={16} gap={12} justifyContent="center">
        <Text fontSize="$7" fontWeight="600">
          그룹 만들기
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="그룹 이름을 입력하세요"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text color="red">{errors.name.message}</Text>}

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          backgroundColor="$blue10"
          color="white"
        >
          {isSubmitting ? <Spinner size="small" /> : "생성하기"}
        </Button>
      </YStack>
    </ScrollView>
  );
}
