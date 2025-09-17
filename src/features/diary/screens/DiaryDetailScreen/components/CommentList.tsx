import { NestedComment } from "@/features/diary/types/diary.types";
import { FlatList } from "react-native";
import { Text, YStack } from "tamagui";
import CommentItem from "./CommentItem";

export default function CommentList({
  commentTree,
  onReplyPress,
}: {
  commentTree: NestedComment[];
  onReplyPress: (id: number, username: string, content: string) => void;
}) {
  const renderComment = ({ item }: { item: NestedComment }) => (
    <CommentItem comment={item} onReplyPress={onReplyPress} />
  );

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
        <FlatList
          data={commentTree}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 12 }}
        />
      )}
    </YStack>
  );
}
