"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  image?: string | null;
  active: boolean | number | null;
  createdAt?: string | null;
}

interface CategoryFilterProps {
  readonly initialProducts: Product[];
  readonly categories: string[];
}

export default function CategoryFilter({
  initialProducts,
  categories,
}: Readonly<CategoryFilterProps>) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtra los productos por categoría seleccionada
  const filteredProducts =
    selectedCategory === null
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Filtro de categorías */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Categorías</h2>
        <div className="flex flex-wrap gap-3">
          {/* Botón "Todos" */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              selectedCategory === null
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-stone-200 text-stone-800 hover:bg-stone-300"
            }`}
          >
            Todos ({initialProducts.length})
          </button>

          {/* Botones de categorías */}
          {categories.map((category) => {
            const count = initialProducts.filter(
              (p) => p.category === category
            ).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-bold transition-all capitalize ${
                  selectedCategory === category
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-stone-200 text-stone-800 hover:bg-stone-300"
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Si no hay productos */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl text-stone-500">
            😔 No hay productos en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}
