import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  const isLogin = req.nextUrl.pathname.startsWith("/admin-panel/login");
  const isProtected = req.nextUrl.pathname.startsWith("/admin-panel");

  // no token → enviar al login
  if (!token && isProtected && !isLogin) {
    return NextResponse.redirect(new URL("/admin-panel/login", req.url));
  }

  // si ya está logueado → evitar volver al login
  if (token && isLogin) {
    return NextResponse.redirect(new URL("/admin-panel", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-panel/:path*"],
};
