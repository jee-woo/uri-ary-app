import CommonHeader from "@/components/CommonHeader";
import { CurrentToast } from "@/components/CurrentToast";
import { GroupDetail } from "@/features/group/types/group.types";
import { UserPlus } from "lucide-react-native";
import { useState } from "react";
import { Button, H4, useTheme } from "tamagui";
import InviteCodeSheet from "./InviteCodeSheet";

export default function GroupDetailHeader({
  group,
}: {
  group: GroupDetail;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <CommonHeader
        center={<H4>{group.name}</H4>}
        right={
          <Button
            icon={<UserPlus color={theme.accent1.val} />}
            onPress={() => setOpen(true)}
            chromeless
            padding={"$2"}
            pressStyle={{
              scale: 0.9,
              opacity: 0.7,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          />
        }
      />

      <InviteCodeSheet
        open={open}
        onOpenChange={setOpen}
        inviteCode={group.code}
      />
      <CurrentToast />
    </>
  );
}
