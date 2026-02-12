"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "./ProductCard";
import { Loader } from "lucide-react";

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

export default function POSCategories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCartStore();

  // Mock data para testing
  const getMockProducts = (): Product[] => [
    {
      id: 1,
      name: "Espresso",
      price: 2.5,
      category: "cafes",
      image: "/productos/espresso.jpg",
      active: true,
    },
    {
      id: 2,
      name: "Cappuccino",
      price: 3.5,
      category: "cafes",
      image: "/productos/cappuccino.jpg",
      active: true,
    },
  ];

  // Carga productos desde la API (si existe) o desde fetch
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts();

        if (!response.ok) throw new Error("Error al cargar productos");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const fetchProducts = async () => {
    return fetch("/api/products", {
      method: "GET",
    }).catch(() => {
      // Si no existe el endpoint, retorna productos de ejemplo
      return {
        ok: true,
        json: async () => getMockProducts(),
      };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        ❌ {error}
      </div>
    );
  }

  // Obtiene categorías únicas
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  // Filtra productos por categoría
  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div>
      {/* Filtro de categorías */}
      <div className="mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full font-bold mr-2 mb-2 transition-all ${
            selectedCategory === null
              ? "bg-amber-600 text-white"
              : "bg-stone-200 text-stone-800"
          }`}
        >
          Todos ({products.length})
        </button>

        {categories.map((category) => {
          const count = products.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-bold mr-2 mb-2 transition-all capitalize ${
                selectedCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-stone-200 text-stone-800"
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="pos"
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
