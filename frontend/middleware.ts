import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value || null;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin-panel");
  const isLoginPage = req.nextUrl.pathname === "/admin-panel/login";

  // Si NO hay token → solo permitir login
  if (!token) {
    if (!isLoginPage && isAdminRoute) {
      return NextResponse.redirect(new URL("/admin-panel/login", req.url));
    }
    return NextResponse.next();
  }

  // Si SÍ hay token → NO permitir volver al login
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin-panel", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-panel/:path*"],
};
