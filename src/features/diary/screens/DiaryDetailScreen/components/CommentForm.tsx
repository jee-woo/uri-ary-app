import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Text, YStack } from "tamagui";
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
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <Input
            value={value}
            onChangeText={onChange} // ✅ react-hook-form과 연결
            placeholder={parentId ? "답글을 입력하세요" : "댓글을 입력하세요"}
          />
        )}
      />

      {errors.content && (
        <Text color="red" fontSize="$2">
          {errors.content.message}
        </Text>
      )}

      <Button onPress={handleSubmit(submit)}>등록</Button>
    </YStack>
  );
}
