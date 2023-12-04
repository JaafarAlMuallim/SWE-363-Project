import User from "@/models/user";

export type SessionContextType = {
  session: User | null;
  loading: boolean;
  signup: (credentials: {
    email: string;
    password: string;
    name: string;
    username: string;
  }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};
