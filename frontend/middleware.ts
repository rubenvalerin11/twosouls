import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get("adminToken")?.value;

  const isLogin = req.nextUrl.pathname.startsWith("/admin-panel/login");
  const isAdmin = req.nextUrl.pathname.startsWith("/admin-panel");

  // Si intenta entrar al panel sin token
  if (isAdmin && !adminToken && !isLogin) {
    return NextResponse.redirect(new URL("/admin-panel/login", req.url));
  }

  // Si ya tiene token y va a /login → lo mando al panel
  if (isLogin && adminToken) {
    return NextResponse.redirect(new URL("/admin-panel", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-panel/:path*"],
};
