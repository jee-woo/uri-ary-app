import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { Group } from "@/features/group/types/group.types";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react-native";
import { FlatList } from "react-native";
import { useTheme } from "tamagui";
import { fetchGroups } from "../services/api";
import GroupCard from "./GroupCard";

const GroupList = () => {
  const {
    data: groups,
    isLoading,
    isError,
    refetch,
  } = useQuery<Group[]>({ queryKey: ["groups"], queryFn: fetchGroups });

  const theme = useTheme();

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 표시하지 않음
  }

  if (isError) {
    return (
      <EmptyPlaceholder
        icon={<Users size={48} color={theme.color8.val} />}
        title="오류 발생"
        message="그룹을 불러오는 데 실패했습니다."
      />
    );
  }

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
      renderItem={({ item }) => <GroupCard id={item.id} name={item.name} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    />
  );
};

export default GroupList;
