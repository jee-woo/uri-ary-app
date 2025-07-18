import { useRoute } from "@react-navigation/native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ListItem, ScrollView, Text, YStack } from "tamagui";
import { fetchGroup, GroupDetail } from "../services/api";

export default function GroupScreen() {
  const route = useRoute();
  const { groupId } = route.params as { groupId: string };
  const {
    data: group,
    isLoading,
    isError,
  } = useSuspenseQuery<GroupDetail>({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(Number(groupId)),
  });

  return (
    <ScrollView>
      <YStack padding={16} gap={12}>
        <Text fontSize="$7" fontWeight="600">
          {group.name}
        </Text>
        {group.diaries.map((diary) => (
          <ListItem key={diary.id} title={diary.title} onPress={() => {}} />
        ))}
      </YStack>
    </ScrollView>
  );
}
