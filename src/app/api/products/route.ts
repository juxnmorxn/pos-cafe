import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/products
 * Retorna todos los productos activos (para el POS)
 */
export async function GET(request: NextRequest) {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .where(eq(products.active, true));

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
