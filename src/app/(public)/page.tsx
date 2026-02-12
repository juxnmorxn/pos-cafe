import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";

export const revalidate = 60; // Cache por 1 minuto

export default async function MenuPage() {
  let allProducts: typeof products.$inferSelect[] = [];
  let categories: string[] = [];

  try {
    // 📡 Obtiene todos los productos activos desde Turso
    const dbProducts = await db
      .select()
      .from(products)
      .where(eq(products.active, true));

    allProducts = dbProducts;

    // Obtiene categorías únicas
    categories = Array.from(
      new Set(allProducts.map((p) => p.category).filter(Boolean))
    );
  } catch (error) {
    console.error("Error cargando productos:", error);
    // Si falla la BD, muestra página vacía pero no 404
  }

  return (
    <main className="bg-stone-50 min-h-screen">
      {/* Header con título */}
      <Header />

      {/* Filtro por categorías - se renderiza como Client Component */}
      <CategoryFilter initialProducts={allProducts} categories={categories} />
    </main>
  );
}
