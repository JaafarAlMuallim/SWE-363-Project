"use client";
import { createContext, ReactNode } from "react";
import useSession from "../hooks/useSession";
import { SessionContextType } from "./SessionContextType";

export const SessionContext = createContext<SessionContextType | undefined>({
  session: null,
  loading: false,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { session, loading, signup, login, logout } = useSession();
  const contextValue: SessionContextType = {
    session: session ?? null,
    loading,
    signup,
    login,
    logout,
  };
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
