import { SessionProvider } from "@/store/sessionStore";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
