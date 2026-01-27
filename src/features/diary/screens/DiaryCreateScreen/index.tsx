import CommonHeader from "@/components/CommonHeader";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "lucide-react-native";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { Button, H4, ScrollView, YStack } from "tamagui";
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

  const handleBackPress = () => {
    const content = methods.watch("content");
    if (content) {
      Alert.alert(
        "작성 중인 내용이 있습니다.",
        "정말로 나가시겠습니까? 변경사항은 저장되지 않습니다.",
        [
          {
            text: "취소",
            style: "cancel",
          },
          {
            text: "나가기",
            onPress: () => navigation.goBack(),
            style: "destructive",
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <YStack flex={1}>
        <CommonHeader
          left={
            <Button
              icon={X}
              onPress={handleBackPress}
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
          center={<H4>일기 작성</H4>}
        />
        <FormProvider {...methods}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <YStack padding={20} gap={12} flex={1}>
              <DiaryImagePicker imageUri={imageUri} setImageUri={setImageUri} />
              <DiaryForm groupId={groupId} imageUri={imageUri} />
            </YStack>
          </ScrollView>
        </FormProvider>
      </YStack>
    </KeyboardAvoidingWrapper>
  );
}
