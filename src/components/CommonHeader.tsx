import { RootStackParamList } from "@/types/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { Button, XStack } from "tamagui";

interface CommonHeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

function DefaultLeft() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Button
      icon={<ChevronLeft size={24} />}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate("Home");
        }
      }}
      chromeless
      size="$3"
      paddingHorizontal={"$2"}
      pressStyle={{
        scale: 0.9,
        opacity: 0.7,
        backgroundColor: "transparent",
        borderColor: "transparent",
      }}
    />
  );
}

export default function CommonHeader({
  left = <DefaultLeft />,
  center,
  right,
}: CommonHeaderProps) {
  return (
    <XStack
      height={52}
      paddingHorizontal={16}
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <XStack position="absolute" left={16} zIndex={1}>
        {left}
      </XStack>
      <XStack position="absolute" left={0} right={0} justifyContent="center">
        {center}
      </XStack>
      <XStack position="absolute" right={16} zIndex={1}>
        {right}
      </XStack>
    </XStack>
  );
}
