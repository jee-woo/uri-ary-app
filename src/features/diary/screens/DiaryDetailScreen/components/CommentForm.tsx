import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

import { useToastController } from "@tamagui/toast";
import { useCreateCommentMutation } from "../hooks/mutations/useCreateCommentMutation";

interface CommentFormProps {
  diaryId: string;
  parentId: number | null;
  groupId: string;
  parentUsername: string | null;
  parentContent: string | null;
  onReset: () => void;
}

export default function CommentForm({
  diaryId,
  parentId,
  groupId,
  parentUsername,
  parentContent,
  onReset,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const inputRef = useRef<TextInput>(null);
  const isReplying = !!parentId;

  const toast = useToastController();
  const { mutate, isPending } = useCreateCommentMutation();

  const handleSubmit = () => {
    if (!content.trim()) return;

    mutate(
      { diaryId, content: content.trim(), parentId, groupId },
      {
        onSuccess: () => {
          toast.show("댓글 등록 완료!", { native: true });
          setContent("");
          onReset();
          inputRef.current?.blur();
        },
        onError: () => {
          toast.show("댓글 등록 실패", { native: true });
        },
      },
    );
  };

  const handleCancel = () => {
    setContent("");
    onReset();
  };

  useEffect(() => {
    if (isReplying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isReplying]);

  return (
    <YStack gap={10}>
      {isReplying && (
        <YStack gap={4} padding={8} backgroundColor="$color2" borderRadius={8}>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$2" fontWeight="500" color="$color8">
              {parentUsername ?? "작성자"}님에게 답글 작성 중...
            </Text>
            <Button
              size="$2"
              variant="outlined"
              onPress={handleCancel}
              chromeless
            >
              취소
            </Button>
          </XStack>

          {parentContent && (
            <Text
              fontSize="$2"
              color="$color7"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              "{parentContent}"
            </Text>
          )}
        </YStack>
      )}

      <XStack gap={8} alignItems="flex-end">
        <Input
          ref={inputRef}
          placeholder={isReplying ? "답글을 입력하세요" : "댓글을 입력하세요"}
          value={content}
          onChangeText={setContent}
          multiline
          flex={1}
          minHeight={40}
          maxHeight={100}
          paddingHorizontal={15}
          paddingVertical={10}
          borderWidth={0}
          backgroundColor="$cardBackground"
        />

        <Button
          size="$4"
          onPress={handleSubmit}
          disabled={!content.trim() || isPending}
          alignSelf="stretch"
          minWidth={60}
          backgroundColor="$accent1"
          color="white"
          disabledStyle={{ backgroundColor: "$color3", opacity: 0.7 }}
        >
          등록
        </Button>
      </XStack>
    </YStack>
  );
}
