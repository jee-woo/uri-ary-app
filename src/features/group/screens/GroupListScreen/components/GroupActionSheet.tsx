import { PlusCircle, Users } from "lucide-react-native";
import { Button, ListItem, Sheet, YStack } from "tamagui";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  onJoin: () => void;
}

export default function GroupActionSheet({
  open,
  onClose,
  onCreate,
  onJoin,
}: Props) {
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onClose}
      snapPoints={[50]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="rgba(0,0,0,0.2)"
      />
      <Sheet.Frame
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        padding={16}
      >
        <YStack gap={12}>
          <ListItem
            title="그룹 생성"
            icon={PlusCircle}
            onPress={() => {
              onCreate();
              onClose();
            }}
          />
          <ListItem
            title="그룹 참여"
            icon={Users}
            onPress={() => {
              onJoin();
              onClose();
            }}
          />
          <Button onPress={onClose} backgroundColor="$color2" color="$color12">
            닫기
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
