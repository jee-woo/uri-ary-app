import { CurrentToast } from "@/components/CurrentToast";
import { Plus, UserPlus } from "lucide-react-native";
import { useState } from "react";
import { Button, Text, XStack } from "tamagui";
import InviteCodeSheet from "./InviteCodeSheet";

export default function GroupDetailHeader({
  title,
  onActionPress,
  inviteCode,
}: {
  title: string;
  onActionPress: () => void;
  inviteCode: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal={16}
        paddingVertical={12}
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text fontSize="$7" fontWeight="700">
          {title}
        </Text>
        <XStack gap={8}>
          <Button size="$3" icon={Plus} onPress={onActionPress} color="white" />
          <Button
            size="$3"
            icon={UserPlus}
            onPress={() => setOpen(true)}
            backgroundColor="$accent1"
            color="white"
          />
        </XStack>
      </XStack>

      <InviteCodeSheet
        open={open}
        onOpenChange={setOpen}
        inviteCode={inviteCode}
      />
      <CurrentToast />
    </>
  );
}
