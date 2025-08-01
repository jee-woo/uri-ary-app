import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

interface CommentFormProps {
  parentId: number | null;
  parentUsername: string | null;
  parentContent: string | null;
  onSubmit: (content: string, parentId?: number | null) => void;
}

export default function CommentForm(props: CommentFormProps) {
  const { parentId, parentUsername, parentContent, onSubmit } = props;

  const [content, setContent] = useState("");
  const inputRef = useRef<TextInput>(null);
  const isReplying = !!parentId;

  const handleSubmit = () => {
    if (!content.trim()) return;

    onSubmit(content.trim(), parentId);
    setContent("");
  };

  useEffect(() => {
    if (isReplying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isReplying]);

  return (
    <YStack gap={8}>
      {isReplying && (
        <YStack gap={4}>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="$colorPress">
              {parentUsername ?? "작성자"}님에게 답글 작성 중...
            </Text>
            <Button
              size="$2"
              variant="outlined"
              onPress={() => onSubmit("", null)}
            >
              취소
            </Button>
          </XStack>

          {parentContent && (
            <Text
              fontSize="$3"
              color="$black8"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              "{parentContent}"
            </Text>
          )}
        </YStack>
      )}

      <XStack gap={8} alignItems="flex-start">
        <Input
          ref={inputRef}
          placeholder={isReplying ? "답글을 입력하세요" : "댓글을 입력하세요"}
          value={content}
          onChangeText={setContent}
          multiline
          flex={1}
        />

        <Button
          size="$3"
          onPress={handleSubmit}
          disabled={!content.trim()}
          alignSelf="stretch"
        >
          등록
        </Button>
      </XStack>
    </YStack>
  );
}
