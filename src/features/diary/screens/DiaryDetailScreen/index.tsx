import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, YStack } from "tamagui";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { DiaryContent } from "./components/DiaryContent";
import { useDiaryDetailQuery } from "./hooks/queries/useDiaryDetailQuery";
import { buildCommentTree } from "./utils/buildCommentTree";

export default function DiaryDetailScreen() {
  const route = useRoute();
  const { groupId, diaryId } = route.params as {
    groupId: string;
    diaryId: string;
  };

  const { data: diary, isError } = useDiaryDetailQuery(groupId, diaryId);
  const commentTree = buildCommentTree(diary.comments);
  const [replyParentId, setReplyParentId] = useState<number | null>(null);
  const [replyUsername, setReplyUsername] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string | null>(null);

  if (isError || !diary) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="$colorPress">일기 정보를 불러올 수 없습니다.</Text>
      </YStack>
    );
  }

  return (
    <KeyboardAvoidingWrapper>
      <YStack flex={1} backgroundColor="$background">
        <DiaryContent diary={diary} />
        <CommentList
          commentTree={commentTree}
          onReplyPress={(id, username, content) => {
            setReplyParentId(id);
            setReplyUsername(username);
            setReplyContent(content);
          }}
        />
        <YStack
          padding={12}
          borderTopWidth={1}
          borderColor="$backgroundHover"
          backgroundColor="$background"
        >
          <CommentForm
            diaryId={diaryId}
            parentId={replyParentId}
            groupId={groupId}
            parentUsername={replyUsername}
            parentContent={replyContent}
            onReset={() => {
              setReplyParentId(null);
              setReplyUsername(null);
              setReplyContent(null);
            }}
          />
        </YStack>
      </YStack>
    </KeyboardAvoidingWrapper>
  );
}
