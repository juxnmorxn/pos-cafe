"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { X, CreditCard, Banknote, Smartphone } from "lucide-react";

interface CheckoutModalProps {
  total: number;
  itemCount: number;
  onClose: () => void;
}

export default function CheckoutModal({
  total,
  itemCount,
  onClose,
}: Readonly<CheckoutModalProps>) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "transfer">(
    "cash"
  );
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCartStore();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // 💳 Aquí iría la llamada al servidor para guardar la venta en Turso
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total,
          paymentMethod,
          itemCount,
        }),
      });

      if (!response.ok) throw new Error("Error al procesar pago");

      // ✅ Venta completada
      alert("✅ ¡Pago realizado con éxito!");
      clearCart();
      onClose();
    } catch (error) {
      alert("❌ Error al procesar la venta");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800">Procesar Pago</h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Resumen */}
        <div className="bg-stone-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-stone-600 mb-2">Artículos vendidos</p>
          <p className="text-3xl font-bold text-stone-800 mb-4">{itemCount}</p>

          <div className="border-t border-stone-200 pt-3">
            <p className="text-sm text-stone-600 mb-1">Total a cobrar</p>
            <p className="text-4xl font-bold text-green-600">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="mb-6">
          <p className="text-sm font-bold text-stone-800 mb-3">
            Método de Pago
          </p>

          <div className="space-y-2">
            {/* Efectivo */}
            <label className="flex items-center p-3 border-2 border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-all"
              style={{ borderColor: paymentMethod === "cash" ? "#b45309" : "" }}>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value as "cash")}
                className="mr-3 w-4 h-4"
              />
              <Banknote className="w-5 h-5 mr-2 text-green-600" />
              <span className="font-bold">Efectivo</span>
            </label>

            {/* Tarjeta */}
            <label className="flex items-center p-3 border-2 border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-all"
              style={{ borderColor: paymentMethod === "card" ? "#b45309" : "" }}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value as "card")}
                className="mr-3 w-4 h-4"
              />
              <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-bold">Tarjeta</span>
            </label>

            {/* Transferencia */}
            <label className="flex items-center p-3 border-2 border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-all"
              style={{ borderColor: paymentMethod === "transfer" ? "#b45309" : "" }}>
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked={paymentMethod === "transfer"}
                onChange={(e) => setPaymentMethod(e.target.value as "transfer")}
                className="mr-3 w-4 h-4"
              />
              <Smartphone className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-bold">Transferencia</span>
            </label>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-all text-lg"
          >
            {loading ? "Procesando..." : "✅ Confirmar Pago"}
          </button>

          <button
            onClick={onClose}
            className="w-full bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold py-3 rounded-lg transition-all"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
