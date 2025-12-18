
import SuspenseFallback from "@/components/SuspenseFallback";
import { Suspense } from "react";

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>;
}
