import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";



import { token_set } from "./helpers/payment/bkash/token_set";

// Define paths for which the middleware should set the token header
const paths = ['/api/v1/payment/bkash/create','/api/v1/payment/bkash/callback'];


export default withAuth(
 async function middleware(req) {
    const requestPath = req.nextUrl.pathname;

    const { pathname } = new URL(req.nextUrl);
    if (
      pathname.startsWith("/dashboard") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    // If the request path matches a path in 'paths', set the 'token_id' header
  if (paths.includes(requestPath)) {

    const response = NextResponse.next();
    const id_token = await token_set();
    response.headers.set("id_token", id_token);  // Replace with actual token logic if needed

    return response;
  }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*", "/api/v1/payment/bkash/:path*"] };
