import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { Group } from "@/features/group/types/group.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Users } from "lucide-react-native";
import { FlatList } from "react-native";
import { useTheme } from "tamagui";
import GroupCard from "./GroupCard";
import { fetchGroups } from "@/features/group/services/api";

const GroupList = () => {
  const {
    data: groups,
    isLoading,
    isError,
    refetch,
  } = useSuspenseQuery<Group[]>({ queryKey: ["groups"], queryFn: fetchGroups });

  const theme = useTheme();

  if (!groups || groups.length === 0) {
    return (
      <EmptyPlaceholder
        icon={<Users size={48} color={theme.color8.val} />}
        title="참여 중인 그룹이 없습니다"
        message="새로운 그룹을 만들거나 기존 그룹에 참여해보세요."
      />
    );
  }

  return (
    <FlatList
      data={groups}
      renderItem={({ item }) => <GroupCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    />
  );
};

export default GroupList;
