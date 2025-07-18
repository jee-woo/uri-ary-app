import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView } from "tamagui";

import GroupListHeader from "@/features/group/screens/GroupListScreen/components/GroupListHeader";
import JoinGroupSheet from "@/features/group/screens/GroupListScreen/components/JoinGroupSheet";
import { RootStackParamList } from "@/types/navigation.types";
import GroupActionSheet from "./components/GroupActionSheet";
import GroupList from "./components/GroupList";

type GroupListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Group"
>;

export default function GroupListScreen() {
  const navigation = useNavigation<GroupListScreenNavigationProp>();

  const [isActionOpen, setActionOpen] = useState(false);
  const [isJoinOpen, setJoinOpen] = useState(false);

  const handleJoinGroup = async (code: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
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
        // refetch();
        setJoinOpen(false);
      } else {
        alert("참여에 실패했습니다.");
      }
    } catch (e) {
      console.error("그룹 참여 오류:", e);
      alert("참여 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScrollView>
      <GroupListHeader onActionPress={() => setActionOpen(true)} />
      <GroupList />
      {/* ✅ 그룹 참여 시트 */}
      <JoinGroupSheet
        isOpen={isJoinOpen}
        onClose={() => setJoinOpen(false)}
        onJoin={handleJoinGroup}
      />
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
    </ScrollView>
  );
}
