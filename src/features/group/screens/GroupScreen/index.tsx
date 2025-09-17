import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { SectionList } from "react-native";
import { Text, YStack } from "tamagui";
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

  const { data: group } = useSuspenseQuery<GroupDetail>({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(Number(groupId)),
  });

  const sections = useMemo(() => {
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
    [groupId]
  );

  return (
    // 1. 전체를 YStack으로 감싸서 헤더와 리스트를 분리합니다.
    <YStack flex={1}>
      {/* 2. 헤더 컴포넌트를 SectionList 밖으로 꺼냅니다. */}
      <GroupDetailHeader
        title={group.name}
        onActionPress={() =>
          navigation.navigate("DiaryCreate", { groupId: Number(groupId) })
        }
        inviteCode={group.code}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDiaryItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text fontSize="$5" fontWeight="700" paddingVertical={8}>
            {title}
          </Text>
        )}
        // 3. ListHeaderComponent prop은 더 이상 필요 없으므로 제거합니다.
        // 4. contentContainerStyle에 paddingHorizontal을 적용해
        //    목록 부분에만 좌우 패딩을 줍니다.
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <YStack />}
      />
    </YStack>
  );
}
