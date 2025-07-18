import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, Spinner, Text, YStack } from "tamagui";

import GroupActionSheet from "@/features/group/components/GroupActionSheet";
import GroupCard from "@/features/group/components/GroupCard";
import MyGroupListHeader from "@/features/group/components/headers/MyGroupListHeader";
import JoinGroupSheet from "@/features/group/components/JoinGroupSheet";
import { fetchGroups, Group } from "@/features/group/services/api";
import { RootStackParamList } from "@/types/navigation.types";

type MyGroupListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Group"
>;

export default function MyGroupListScreen() {
  const navigation = useNavigation<MyGroupListScreenNavigationProp>();

  const {
    data: groups,
    isLoading,
    isError,
    refetch,
  } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  const [isActionOpen, setActionOpen] = useState(false);
  const [isJoinOpen, setJoinOpen] = useState(false);

  const handleJoinGroup = async (code: string) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Expo 환경이면 AsyncStorage 사용
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/groups/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code }),
        }
      );

      if (res.ok) {
        alert("그룹에 참여했습니다!");
        refetch();
        setJoinOpen(false);
      } else {
        alert("참여에 실패했습니다.");
      }
    } catch (e) {
      console.error("그룹 참여 오류:", e);
      alert("참여 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (isError) {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="red">그룹을 불러오는 데 실패했습니다.????</Text>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <MyGroupListHeader onActionPress={() => setActionOpen(true)} />

      <YStack padding={16} gap={12}>
        {/* ✅ 그룹 참여 시트 */}
        <JoinGroupSheet
          isOpen={isJoinOpen}
          onClose={() => setJoinOpen(false)}
          onJoin={handleJoinGroup}
        />
        {groups?.map((group) => (
          <GroupCard key={group.id} id={group.id} name={group.name} />
        ))}
        <GroupActionSheet
          open={isActionOpen}
          onClose={() => setActionOpen(false)}
          onCreate={() => {
            setActionOpen(false);
            navigation.navigate("GroupCreate");
          }}
          onJoin={() => {
            setActionOpen(false);
            setJoinOpen(true);
          }}
        />
      </YStack>
    </ScrollView>
  );
}
