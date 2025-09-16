import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ScrollView, Text, YStack } from "tamagui";
import { GroupDetail } from "../../types/group.types";
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

  const groupedDiaries = groupByDate(group.diaries);

  return (
    <ScrollView>
      <GroupDetailHeader
        title={group.name}
        onActionPress={() =>
          navigation.navigate("DiaryCreate", { groupId: Number(groupId) })
        }
        inviteCode={group.code}
      />

      <YStack padding={16} gap={24}>
        {Object.entries(groupedDiaries).map(([dateLabel, diaries]) => (
          <YStack key={dateLabel} gap={12}>
            <Text fontSize="$5" fontWeight="700">
              {dateLabel}
            </Text>
            <YStack gap={0}>
              {diaries.map((diary, index) => (
                <DiarySpringItem
                  key={diary.id}
                  diary={diary}
                  groupId={String(groupId)}
                  isFirst={index === 0}
                  isLast={index === diaries.length - 1}
                />
              ))}
            </YStack>
          </YStack>
        ))}
      </YStack>
    </ScrollView>
  );
}
