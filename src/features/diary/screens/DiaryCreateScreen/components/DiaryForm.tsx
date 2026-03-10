import { useNavigation } from "@react-navigation/native";
import { useToastController } from "@tamagui/toast";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Spinner, Text, TextArea, YStack } from "tamagui";

import { useGroupMembersQuery } from "@/features/group/hooks/queries/useGroupMembersQuery";
import {
  encryptAESKeyWithRSA,
  encryptContent,
  generateAESKey,
} from "@/libs/crypto/aes";
import { useCreateEncryptedDiaryMutation } from "../hooks/mutations/useCreateEncryptedDiaryMutation";
import { DiaryInput } from "../schemas/diary.schema";

type Props = {
  groupId: string;
  imageUri: string | null;
};

export default function DiaryForm({ groupId, imageUri }: Props) {
  const { control, handleSubmit, formState } = useFormContext<DiaryInput>();
  const navigation = useNavigation<any>();
  const toast = useToastController();
  const { mutate, isPending } = useCreateEncryptedDiaryMutation({ groupId });
  const { data: members, isLoading: isLoadingMembers } = useGroupMembersQuery(
    Number(groupId),
  );

  const onSubmit = async (data: { content: string }) => {
    try {
      if (!members) {
        toast.show("그룹 멤버 정보를 불러오지 못했습니다.", {
          native: true,
          backgroundColor: "$red10",
        });
        return;
      }

      const aesKey = generateAESKey();
      const { encryptedContent, iv, authTag } = encryptContent(
        data.content,
        aesKey,
      );

      const keys = members.map((member) => {
        const keyEncryptionResult = encryptAESKeyWithRSA(
          aesKey,
          member.publicKey,
        );
        return {
          userId: member.userId,
          encryptedAesKey: keyEncryptionResult.encryptedAesKey,
        };
      });

      mutate(
        {
          groupId,
          title: "", // TODO: Add title form field if necessary
          encryptedContent,
          iv,
          authTag,
          keys,
          imageUri,
        },
        {
          onSuccess: () => {
            toast.show("일기 작성 완료!", { native: true });
            navigation.reset({
              index: 0,
              routes: [{ name: "Group", params: { groupId } }],
            });
          },
          onError: (e) => {
            console.error(e);
            toast.show("작성 실패. 다시 시도해주세요.", { native: true });
          },
        },
      );
    } catch (error) {
      if (__DEV__) console.error("암호화 및 저장 실패:", error);
      toast.show("일기 암호화에 실패했습니다. 다시 시도해주세요.", {
        native: true,
        backgroundColor: "$red10",
      });
    }
  };

  return (
    <YStack gap={12} flex={1}>
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <TextArea
            placeholder="공유하고 싶은 하루를 작성해보세요."
            value={value}
            onChangeText={onChange}
            textAlignVertical="top"
            flex={1}
            borderWidth={0}
            backgroundColor="$cardBackground"
          />
        )}
      />
      {formState.errors.content && (
        <Text color="red">{formState.errors.content.message}</Text>
      )}

      <Button
        disabled={isPending || isLoadingMembers || !formState.isValid}
        onPress={handleSubmit(onSubmit)}
        backgroundColor="$accent1"
        color="white"
        disabledStyle={{ backgroundColor: "$color3", opacity: 0.7 }}
      >
        {isPending || isLoadingMembers ? <Spinner size="small" /> : "작성하기"}
      </Button>
    </YStack>
  );
}
