import { useNavigation } from "@react-navigation/native";
import { useToastController } from "@tamagui/toast";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Spinner, Text, TextArea, YStack } from "tamagui";

import { useCreateDiaryMutation } from "../hooks/mutations/useCreateDiaryMutation";
import { DiaryInput } from "../schemas/diary.schema";

type Props = {
  groupId: string;
  imageUri: string | null;
};

export default function DiaryForm({ groupId, imageUri }: Props) {
  const { control, handleSubmit, formState } = useFormContext<DiaryInput>();
  const navigation = useNavigation<any>();
  const toast = useToastController();
  const { mutate, isPending } = useCreateDiaryMutation({ groupId });

  const onSubmit = (data: { content: string }) => {
    mutate(
      {
        groupId,
        content: data.content,
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
      }
    );
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
          />
        )}
      />
      {formState.errors.content && (
        <Text color="red">{formState.errors.content.message}</Text>
      )}

      <Button
        disabled={isPending || !formState.isValid}
        onPress={handleSubmit(onSubmit)}
        backgroundColor="$accent1"
        color="white"
        disabledStyle={{ backgroundColor: "$color5" }}
      >
        {isPending ? <Spinner size="small" /> : "작성하기"}
      </Button>
    </YStack>
  );
}
