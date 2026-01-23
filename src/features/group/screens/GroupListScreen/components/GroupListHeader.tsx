import CommonHeader from "@/components/CommonHeader";
import { Bell, Plus, Settings } from "lucide-react-native";
import { Button, H4, XStack } from "tamagui";

export default function GroupListHeader({
  onActionPress,
  onSettingPress,
  onNotificationPress,
}: {
  onActionPress: () => void;
  onSettingPress: () => void;
  onNotificationPress: () => void;
}) {
  return (
    <CommonHeader
      left={<H4>내 그룹</H4>}
      right={
        <XStack>
          <Button
            icon={Bell}
            onPress={onNotificationPress}
            chromeless
            padding={"$2"}
            pressStyle={{
              scale: 0.9,
              opacity: 0.7,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          />
          <Button
            icon={Settings}
            onPress={onSettingPress}
            chromeless
            padding={"$2"}
            pressStyle={{
              scale: 0.9,
              opacity: 0.7,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          />
          <Button
            icon={Plus}
            onPress={onActionPress}
            chromeless
            padding={"$2"}
            pressStyle={{
              scale: 0.9,
              opacity: 0.7,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          />
        </XStack>
      }
    />
  );
}
