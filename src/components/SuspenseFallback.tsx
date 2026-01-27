import { Spinner, YStack } from "tamagui";

export default function SuspenseFallback() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Spinner size="large" color="$orange10" />
    </YStack>
  );
}
