import { useKeyRegistration } from "@/features/auth/hooks/useKeyRegistration";
import { ReactNode } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  useKeyRegistration();

  return <>{children}</>;
}
