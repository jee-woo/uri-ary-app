import GroupDetailHeader from "@/features/diary/screens/DiaryCreateScreen/components/GroupDetailHeader";
import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ScrollView, YStack } from "tamagui";
import { GroupDetail } from "../../types/group.types";
import DiaryCard from "./components/DiaryCard";
import { fetchGroup } from "./services/api";

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

  return (
    <ScrollView>
      <GroupDetailHeader
        title={group.name}
        onActionPress={() =>
          navigation.navigate("DiaryCreate", { groupId: Number(groupId) })
        }
      />

      <YStack padding={16} gap={16}>
        {group.diaries.map((diary) => (
          <DiaryCard key={diary.id} diary={diary} groupId={String(groupId)} />
        ))}
      </YStack>
    </ScrollView>
  );
}
