import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  // This will later be populated with the main app shell, navigation, etc.
  return <main>{children}</main>;
}
