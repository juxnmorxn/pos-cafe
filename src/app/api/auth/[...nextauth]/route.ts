import { NextRequest, NextResponse } from "next/server";
// Placeholder para autenticación
// Será implementado en futuro

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    // TODO: Validar PIN contra la BD
    // Por ahora, simular validación
    if (pin === "1234") {
      const response = NextResponse.json(
        { success: true, message: "Autenticado" },
        { status: 200 }
      );
      response.cookies.set("auth-session", JSON.stringify({ user: "brenda", pin }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 días
      });
      return response;
    }

    return NextResponse.json(
      { error: "PIN inválido" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Endpoint de autenticación" },
    { status: 200 }
  );
}
