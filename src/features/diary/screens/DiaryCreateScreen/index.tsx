import CommonHeader from "@/components/CommonHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "lucide-react-native";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, H4, YStack } from "tamagui";
import DiaryForm from "./components/DiaryForm";
import DiaryImagePicker from "./components/DiaryImagePicker";
import { DiaryInput, DiarySchema } from "./schemas/diary.schema";

export default function DiaryCreateScreen() {
  const route = useRoute();
  const { groupId } = route.params as { groupId: string };
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState<string | null>(null);

  const methods = useForm<DiaryInput>({
    resolver: zodResolver(DiarySchema),
    defaultValues: { content: "" },
  });

  return (
    <FormProvider {...methods}>
      <CommonHeader
        left={
          <Button
            icon={X}
            onPress={() => navigation.goBack()}
            chromeless
            pressStyle={{
              scale: 0.9,
              opacity: 0.7,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            padding={"$2"}
          />
        }
        center={<H4>다이어리 작성</H4>}
      />
      <YStack padding={20} gap={12} flex={1}>
        <DiaryImagePicker imageUri={imageUri} setImageUri={setImageUri} />

        <DiaryForm groupId={groupId} imageUri={imageUri} />
      </YStack>
    </FormProvider>
  );
}
