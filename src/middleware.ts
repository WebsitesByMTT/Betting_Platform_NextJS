import { NextRequest, NextResponse } from "next/server";
import { config as _config } from "./utils/config";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const token = request.cookies.get("token");

  if ((isPublicPath || path === "/") && token) {
    const response = NextResponse.redirect(
      new URL("/All/americanfootball_cfl", request.url)
    );
    return response;
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

