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
    <YStack gap={16} flex={1}>
      <Text fontSize="$5" fontWeight="bold">
        댓글 {commentTree.length}
      </Text>

      {commentTree.length === 0 ? (
        <Text color="$gray10" fontSize="$4" textAlign="center" paddingVertical={40}>
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </Text>
      ) : (
        <FlatList
          data={commentTree}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 24 }}
          scrollEnabled={false} // This FlatList is inside a ScrollView, so disable its scrolling
        />
      )}
    </YStack>
  );
}
