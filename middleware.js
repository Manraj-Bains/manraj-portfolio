import { NextResponse } from "next/server";

// Pass-through middleware; Auth0 handled by /api/auth/[...auth0]
export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
