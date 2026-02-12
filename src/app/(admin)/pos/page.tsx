"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { ShoppingCart, Plus, Minus, X, RotateCcw } from "lucide-react";
import POSCategories from "@/components/POSCategories";
import CheckoutModal from "@/components/CheckoutModal";

export const dynamic = "force-dynamic";

export default function POSPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
      {/* Lado izquierdo: Productos */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Agregar Productos</h2>
        <POSCategories />
      </div>

      {/* Lado derecho: Carrito */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Encabezado */}
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-stone-800">
              Carrito ({items.length})
            </h3>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-stone-500">
              <ShoppingCart className="w-12 h-12 mx-auto opacity-30 mb-2" />
              <p>Carrito vacío</p>
            </div>
          ) : (
            <>
              {/* Lista de items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-stone-50 p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-stone-800">{item.name}</p>
                      <p className="text-sm text-stone-500">
                        ${item.price.toFixed(2)} c/u
                      </p>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-stone-300 hover:bg-stone-400 p-1 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-amber-600 hover:bg-amber-700 text-white p-1 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Línea divisora */}
              <div className="border-t-2 border-stone-200 py-4 mb-4">
                {/* Subtotal */}
                <div className="flex justify-between mb-2 text-stone-600">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-2xl font-bold text-amber-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowCheckout(true)}
                  disabled={items.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all text-lg"
                >
                  💳 COBRAR
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Cancelar Venta
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de checkout */}
      {showCheckout && (
        <CheckoutModal
          total={total}
          itemCount={items.length}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
