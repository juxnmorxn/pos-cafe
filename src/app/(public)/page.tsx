import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";

export const revalidate = 60; // Cache por 1 minuto

export default async function MenuPage() {
  try {
    // 📡 Obtiene todos los productos activos desde Turso
    const allProducts = await db
      .select()
      .from(products)
      .where(eq(products.active, true));

    // Obtiene categorías únicas
    const categories = Array.from(
      new Set(allProducts.map((p) => p.category).filter(Boolean))
    );

    return (
      <main className="bg-stone-50 min-h-screen">
        {/* Header con título */}
        <Header />

        {/* Filtro por categorías - se renderiza como Client Component */}
        <CategoryFilter initialProducts={allProducts} categories={categories} />
      </main>
    );
  } catch (error) {
    console.error("Error al cargar productos:", error);

    return (
      <main className="bg-stone-50 min-h-screen p-6">
        <Header />
        <div className="mt-12 bg-red-100 text-red-700 p-6 rounded-lg text-center">
          <p className="font-bold mb-2">❌ Error al cargar el menú</p>
          <p className="text-sm">Por favor, recarga la página (Ctrl + R)</p>
        </div>
      </main>
    );
  }
}
