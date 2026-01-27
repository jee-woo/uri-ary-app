import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookHeart } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { SectionList } from "react-native";
import { Text, YStack, useTheme } from "tamagui";
import { Diary, GroupDetail } from "../../types/group.types";
import DiarySpringItem from "./components/DiarySpringItem";
import GroupDetailHeader from "./components/GroupDetailHeader";
import { fetchGroup } from "./services/api";
import { groupByDate } from "./utils/groupByDate";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DiaryCreate"
>;

export default function GroupScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { groupId } = route.params as { groupId: string };
  const theme = useTheme();
  const [isInviteSheetOpen, setInviteSheetOpen] = useState(false);

  const { data: group } = useSuspenseQuery<GroupDetail>({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(Number(groupId)),
  });

  const sections = useMemo(() => {
    if (!group.diaries) return [];
    const groupedDiaries = groupByDate(group.diaries);
    return Object.entries(groupedDiaries).map(([dateLabel, diaries]) => ({
      title: dateLabel,
      data: diaries,
    }));
  }, [group.diaries]);

  const renderDiaryItem = useCallback(
    ({
      item,
      index,
      section,
    }: {
      item: Diary;
      index: number;
      section: { data: Diary[] };
    }) => (
      <DiarySpringItem
        diary={item}
        groupId={String(groupId)}
        isFirst={index === 0}
        isLast={index === section.data.length - 1}
      />
    ),
    [groupId],
  );

  return (
    <YStack flex={1}>
      <GroupDetailHeader
        onActionPress={() =>
          navigation.navigate("DiaryCreate", { groupId: Number(groupId) })
        }
        group={group}
      />

      {!group.diaries || group.diaries.length === 0 ? (
        <EmptyPlaceholder
          icon={<BookHeart size={48} color={theme.color8.val} />}
          title="아직 작성된 일기가 없습니다"
          message="첫 일기를 작성하고 감정을 공유해보세요."
        />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDiaryItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text fontSize="$5" fontWeight="700" paddingVertical={8}>
              {title}
            </Text>
          )}
          contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <YStack />}
        />
      )}
    </YStack>
  );
}
