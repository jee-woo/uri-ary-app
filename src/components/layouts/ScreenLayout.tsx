import SuspenseFallback from "@/components/SuspenseFallback";
import { Suspense } from "react";
import { YStack } from "tamagui";

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YStack flex={1} backgroundColor="$background">
      <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
    </YStack>
  );
}
