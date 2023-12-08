import CredentialsProvider from "next-auth/providers/credentials";
export const authConfig = {
  secret: process.env.NEXT_AUTH_SECRET,
  url: process.env.NEXT_AUTH_URL,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:8080/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        console.log(user);
        console.log(token);
        token.user = user;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session.user) {
        console.log(token);
        console.log(session);
        session.user = token.user;
      }
      return session;
    },
  },
};
