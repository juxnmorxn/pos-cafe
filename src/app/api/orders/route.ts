import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/orders
 * Crea una nueva orden (venta)
 */
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticación
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { total, paymentMethod } = body;

    if (!total || !paymentMethod) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // Obtiene el ID del usuario desde la sesión
    const userId = Number.parseInt(session.user.email?.split("@")[0] || "0");

    // Inserta la orden en la BD
    const newOrder = await db
      .insert(orders)
      .values({
        userId,
        total: Number.parseFloat(total),
        paymentMethod: paymentMethod as "cash" | "card" | "transfer",
        status: "completed",
      })
      .returning();

    return NextResponse.json(newOrder[0], { status: 201 });
  } catch (error) {
    console.error("Error al crear orden:", error);
    return NextResponse.json(
      { error: "Error al crear la orden" },
      { status: 500 }
    );
  }
}
