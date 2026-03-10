import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { NestedComment } from "@/features/diary/types/diary.types";
import { MessageSquareText } from "lucide-react-native";
import { Text, YStack, useTheme } from "tamagui";
import CommentItem from "./CommentItem";

export default function CommentList({
  commentTree,
  onReplyPress,
}: {
  commentTree: NestedComment[];
  onReplyPress: (id: number, username: string, content: string) => void;
}) {
  const theme = useTheme();

  return (
    <YStack gap={16}>
      <Text fontSize="$5" fontWeight="600" color="$color11">
        댓글 {commentTree.length}
      </Text>

      {commentTree.length === 0 ? (
        <EmptyPlaceholder
          icon={<MessageSquareText size={48} color={theme.color8.val} />}
          title="아직 댓글이 없습니다"
          message="첫 댓글을 남겨보세요!"
        />
      ) : (
        <YStack gap={24}>
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
