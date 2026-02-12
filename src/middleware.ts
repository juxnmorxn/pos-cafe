import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // SOLO proteger rutas muy específicas de ADMIN
  if (pathname === "/admin/users" || pathname === "/admin/dashboard") {
    const session = request.cookies.get("auth-session");

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configura EXACTAMENTE qué rutas corre el middleware
export const config = {
  matcher: [
    "/admin/users",
    "/admin/dashboard",
  ],
};
