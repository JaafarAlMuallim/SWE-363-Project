import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id?: string;
      name: string;
      email: string;
      username: string;
      role: string;
      verified: boolean;
      user_image?: string;
      x_account?: string;
      linkdin_account?: string;
      website?: string;
    } & DefaultSession["user"];
  }
}
