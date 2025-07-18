import { Group } from "@/features/group/types/group.types";
import { RootStackParamList } from "@/types/navigation.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Text, YStack } from "tamagui";
import { fetchGroups } from "../services/api";
import GroupCard from "./GroupCard";

type GroupListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Group"
>;

const GroupList = () => {
  const {
    data: groups,
    isError,
    refetch,
  } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  const navigation = useNavigation<GroupListScreenNavigationProp>();

  console.log(groups);

  if (isError) {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="red">그룹을 불러오는 데 실패했습니다.</Text>
      </YStack>
    );
  }

  return (
    <YStack padding={16} gap={12}>
      {groups?.map((group) => (
        <GroupCard key={group.id} id={group.id} name={group.name} />
      ))}
    </YStack>
  );
};

export default GroupList;
