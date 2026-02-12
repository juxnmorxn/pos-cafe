"use client";

import Image from "next/image";
import { useState } from "react";

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

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onAddToCart?: (product: Product) => void;
  variant?: "menu" | "pos";
}

export default function ProductCard({
  product,
  onClick,
  onAddToCart,
  variant = "menu",
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (variant === "pos" && onAddToCart) {
      onAddToCart(product);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden cursor-pointer ${
        variant === "pos" ? "border-2 border-transparent hover:border-amber-600" : ""
      }`}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        {!imageError && product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            ☕
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-stone-800 line-clamp-2 mb-1">
          {product.name}
        </h3>

        {product.description && variant === "menu" && (
          <p className="text-sm text-stone-600 line-clamp-2 mb-2">
            {product.description}
          </p>
        )}

        {/* Precio y botón */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>

          {variant === "pos" ? (
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm">
              +
            </button>
          ) : (
            <button className="text-amber-600 font-bold text-sm hover:text-amber-700">
              Ver →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
