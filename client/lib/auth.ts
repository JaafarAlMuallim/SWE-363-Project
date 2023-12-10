import CredentialsProvider from "next-auth/providers/credentials";
export const authConfig = {
  secret: process.env.NEXT_AUTH_SECRET,
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
        console.log(data);
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
        token.user = user;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session.user) {
        session.user = token.user;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }: any) {
      console.log(auth);
      const isLoggedIn = !!auth?.user;
      const paths = ["/:path", "/writeArticle", "/reviewArticle"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/auth", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
  },
};
