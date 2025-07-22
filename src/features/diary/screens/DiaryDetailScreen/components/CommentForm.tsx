import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextArea, XStack, YStack } from "tamagui";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, "댓글을 입력해주세요."),
});

type FormData = z.infer<typeof schema>;

export default function CommentForm({
  onSubmit,
  parentId,
}: {
  onSubmit: (content: string, parentId?: number) => void;
  parentId?: number;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { content: "" },
  });

  const submit = (data: FormData) => {
    onSubmit(data.content, parentId);
    reset();
  };

  return (
    <YStack gap={6} marginTop={8}>
      <XStack alignItems="flex-start" gap={6}>
        {/* ✅ 입력창 */}
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <TextArea
              value={value}
              onChangeText={onChange}
              placeholder={parentId ? "답글을 입력하세요" : "댓글을 입력하세요"}
              rows={3}
              textAlignVertical="top"
              flex={1} // ✅ 남는 공간을 모두 차지
              style={{
                minHeight: 60,
              }}
            />
          )}
        />

        {/* ✅ 버튼 (오른쪽에 고정) */}
        <Button
          size="$2"
          variant="outlined"
          onPress={handleSubmit(submit)}
          alignSelf="stretch" // ✅ TextArea와 세로 높이 맞춤
        >
          등록
        </Button>
      </XStack>

      {errors.content && (
        <Text color="red" fontSize="$2">
          {errors.content.message}
        </Text>
      )}
    </YStack>
  );
}
