import CommonHeader from "@/components/CommonHeader";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";
import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useToastController } from "@tamagui/toast";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Button, Text, YStack, useTheme } from "tamagui";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { DiaryContent } from "./components/DiaryContent";
import { useDeleteDiaryMutation } from "./hooks/mutations/useDeleteDiaryMutation";
import { useDiaryDetailQuery } from "./hooks/queries/useDiaryDetailQuery";
import { buildCommentTree } from "./utils/buildCommentTree";

export default function DiaryDetailScreen() {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const toast = useToastController();
  const { groupId, diaryId } = route.params as {
    groupId: string;
    diaryId: string;
  };

  const { data: diary, isError } = useDiaryDetailQuery(groupId, diaryId);
  const deleteMutation = useDeleteDiaryMutation();
  const commentTree = buildCommentTree(diary?.comments || []);
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
        <CommonHeader
          right={
            diary.mine ? (
              <Button
                icon={<Trash2 size={20} color={theme.color7.val} />}
                chromeless
                padding="$2"
                pressStyle={{
                  scale: 0.9,
                  opacity: 0.7,
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                onPress={() =>
                  Alert.alert("일기 삭제", "정말 이 일기를 삭제하시겠습니까?", [
                    { text: "취소", style: "cancel" },
                    {
                      text: "삭제",
                      style: "destructive",
                      onPress: () =>
                        deleteMutation.mutate(
                          { groupId, diaryId },
                          {
                            onSuccess: () => {
                              toast.show("일기가 삭제되었습니다.", {
                                native: true,
                              });
                              navigation.goBack();
                            },
                            onError: () => {
                              toast.show("일기 삭제에 실패했습니다.", {
                                native: true,
                              });
                            },
                          },
                        ),
                    },
                  ])
                }
              />
            ) : undefined
          }
        />
        <ScrollView>
          <YStack paddingHorizontal={20} paddingVertical={24}>
            <DiaryContent diary={diary} />
          </YStack>

          <YStack height={8} backgroundColor="$color3" />

          <YStack paddingHorizontal={20} paddingVertical={24}>
            <CommentList
              commentTree={commentTree}
              onReplyPress={(id, username, content) => {
                setReplyParentId(id);
                setReplyUsername(username);
                setReplyContent(content);
              }}
            />
          </YStack>
        </ScrollView>

        <YStack padding={12}>
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
