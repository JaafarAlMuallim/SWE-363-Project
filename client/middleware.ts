// import { withAuth } from "next-auth/middleware";
//
// export default withAuth(
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   },
// );
//
// export const config = { matcher: ["/admin"] };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {}
export const config = {
  matcher: ["/reviewArticle/:path*", "/writeArticle"],
};
