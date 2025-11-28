import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useToastController } from "@tamagui/toast";
import { useState } from "react";
import { ScrollView } from "tamagui";

import GroupListHeader from "@/features/group/screens/GroupListScreen/components/GroupListHeader";
import JoinGroupSheet from "@/features/group/screens/GroupListScreen/components/JoinGroupSheet";
import { RootStackParamList } from "@/types/navigation.types";
import GroupActionSheet from "./components/GroupActionSheet";
import GroupList from "./components/GroupList";
import { useJoinGroupMutation } from "./hooks/mutations/useJoinGroupMutation";

type GroupListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Group"
>;

export default function GroupListScreen() {
  const navigation = useNavigation<GroupListScreenNavigationProp>();
  const toast = useToastController();

  const joinGroupMutation = useJoinGroupMutation();

  const [isActionOpen, setActionOpen] = useState(false);
  const [isJoinOpen, setJoinOpen] = useState(false);

  const handleJoinGroup = (code: string) => {
    joinGroupMutation.mutate(code, {
      onSuccess: () => {
        toast.show("그룹에 참여했습니다!", { native: true });
        setJoinOpen(false);
      },
      onError: (error) => {
        toast.show("참여 중 오류가 발생했습니다.", {
          native: true,
          message: error.message,
        });
      },
    });
  };

  return (
    <>
      <GroupListHeader onActionPress={() => setActionOpen(true)} />
      <GroupList />
      {/* ✅ 그룹 참여 시트 */}
      <JoinGroupSheet
        isOpen={isJoinOpen}
        onClose={() => setJoinOpen(false)}
        onJoin={handleJoinGroup}
        isPending={joinGroupMutation.isPending}
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
    </>
  );
}
