import { NestedComment } from "@/features/diary/types/diary.types";
import { Text, YStack } from "tamagui";
import CommentItem from "./CommentItem";

export default function CommentList({
  commentTree,
  onReplyPress,
}: {
  commentTree: NestedComment[];
  onReplyPress: (id: number, username: string, content: string) => void;
}) {
  return (
    <YStack gap={12} marginTop={24} flex={1}>
      <Text fontSize="$4" fontWeight="600">
        댓글
      </Text>

      {commentTree.length === 0 ? (
        <Text color="$colorPress" fontSize="$3">
          아직 댓글이 없습니다.
        </Text>
      ) : (
        <YStack gap={12}>
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplyPress={onReplyPress}
            />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
