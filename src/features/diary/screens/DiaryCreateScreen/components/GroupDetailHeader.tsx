import { CurrentToast } from "@/components/CurrentToast";
import { useToastController } from "@tamagui/toast";
import * as Clipboard from "expo-clipboard";
import { Copy, Plus, UserPlus } from "lucide-react-native";
import { useState } from "react";
import { Button, Input, Sheet, Text, XStack, YStack } from "tamagui";

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
  const toast = useToastController();
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteCode);
    toast.show("초대 코드 복사 완료!", {
      native: true,
    });
  };

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
            backgroundColor="$blue10"
            color="white"
          />
        </XStack>
      </XStack>

      <Sheet modal open={open} onOpenChange={setOpen} snapPoints={[50]}>
        <Sheet.Overlay backgroundColor="rgba(0,0,0,0.2)" />
        <Sheet.Frame
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
          padding={16}
        >
          <YStack gap={12}>
            <Text fontSize="$6" fontWeight="600">
              그룹 초대 코드
            </Text>
            <XStack alignItems="center" gap={8}>
              <Input
                value={inviteCode}
                editable={false}
                textAlign="center"
                flex={1}
              />
              <Button
                size="$3"
                icon={Copy}
                onPress={copyToClipboard}
                backgroundColor="$blue10"
                color="white"
              />
            </XStack>
            <Button onPress={() => setOpen(false)}>닫기</Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>

      <CurrentToast />
    </>
  );
}
