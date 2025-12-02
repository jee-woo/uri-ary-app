import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { Button, H4, Input, ScrollView, Spinner, Text, YStack } from "tamagui";
import { z } from "zod";

import { RootStackParamList } from "@/types/navigation.types";

import CommonHeader from "@/components/CommonHeader";
import { createGroup } from "./services/api";

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
      const group = await createGroup(data.name);
      alert("그룹이 생성되었습니다!");
      navigation.navigate("Group", { groupId: group.id });
    } catch (e) {
      console.error("그룹 생성 오류:", e);
      alert("그룹 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScrollView>
      <CommonHeader center={<H4>그룹 생성하기</H4>} />
      <YStack flex={1} padding={16} gap={12} justifyContent="center">
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
          backgroundColor="$accent1"
          color="white"
        >
          {isSubmitting ? <Spinner size="small" /> : "생성하기"}
        </Button>
      </YStack>
    </ScrollView>
  );
}
