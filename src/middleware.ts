import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Si intenta acceder a /admin sin cookie de sesión, redirige a login
  if (pathname.startsWith("/admin") || pathname.startsWith("/pos")) {
    const session = request.cookies.get("auth-session");

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configura en qué rutas corre el middleware
export const config = {
  matcher: [
    "/admin/:path*",
    "/pos/:path*",
    "/dashboard/:path*",
  ],
};
