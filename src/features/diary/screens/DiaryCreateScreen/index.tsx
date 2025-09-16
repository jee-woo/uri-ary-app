// DiaryCreateScreen.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";
import DiaryForm from "./components/DiaryForm";
import DiaryImagePicker from "./components/DiaryImagePicker";
import { DiaryInput, DiarySchema } from "./schemas/diary.schema";

export default function DiaryCreateScreen() {
  const route = useRoute();
  const { groupId } = route.params as { groupId: string };

  const [imageUri, setImageUri] = useState<string | null>(null);

  const methods = useForm<DiaryInput>({
    resolver: zodResolver(DiarySchema),
    defaultValues: { content: "" },
  });

  return (
    <FormProvider {...methods}>
      <YStack padding={20} gap={12} flex={1}>
        <Text fontSize="$7" fontWeight="600">
          다이어리 작성
        </Text>

        <DiaryImagePicker imageUri={imageUri} setImageUri={setImageUri} />

        <DiaryForm groupId={groupId} imageUri={imageUri} />
      </YStack>
    </FormProvider>
  );
}
