import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, ListItem, ScrollView, Spinner, Text, YStack } from "tamagui";

import { RootStackParamList } from "../../../types/navigation.types";
import JoinGroupModal from "../components/JoinGroupModal"; // ✅ React Native용 모달 컴포넌트
import { fetchGroups, Group } from "../services/api";

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
        refetch(); // ✅ 리스트 새로고침
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
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="red">그룹을 불러오는 데 실패했습니다.</Text>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack padding={16} gap={12}>
        {/* ✅ 그룹 참여 모달 */}
        <JoinGroupModal
          isOpen={isJoinOpen}
          onClose={() => setJoinOpen(false)}
          onJoin={handleJoinGroup}
        />

        <Text fontSize="$7" fontWeight="600">
          내 그룹
        </Text>

        {/* ✅ 그룹 생성 버튼 */}
        <Button
          backgroundColor="$blue10"
          color="white"
          onPress={() => navigation.navigate("GroupCreate")}
        >
          그룹 생성
        </Button>

        {/* ✅ 그룹 참여 버튼 */}
        <Button onPress={() => setJoinOpen(true)}>그룹 참여</Button>

        {/* ✅ 그룹 목록 */}
        {groups?.map((group) => (
          <ListItem
            key={group.id}
            title={group.name}
            onPress={() => navigation.navigate("Group", { groupId: group.id })}
          />
        ))}
      </YStack>
    </ScrollView>
  );
}
