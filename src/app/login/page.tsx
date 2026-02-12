"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePinClick = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleLogin = async () => {
    if (pin.length !== 4) {
      setError("El PIN debe tener 4 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        pin,
        redirect: false,
      });

      if (result?.error) {
        setError("❌ PIN incorrecto. Intenta de nuevo.");
        setPin("");
      } else if (result?.ok) {
        // ✅ Login exitoso
        router.push("/admin/pos");
      }
    } catch (err) {
      setError("Error al conectar. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-stone-900 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="text-6xl mb-4">☕</div>
        <h1 className="text-3xl font-bold text-white mb-2">La Cafetería</h1>
        <p className="text-amber-200">Acceso para Personal</p>
      </div>

      {/* Tarjeta de Login */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        {/* Instrucción */}
        <div className="text-center mb-6">
          <Lock className="w-12 h-12 mx-auto text-amber-700 mb-3" />
          <h2 className="text-2xl font-bold text-stone-800">Ingresa tu PIN</h2>
        </div>

        {/* Display del PIN */}
        <div className="bg-stone-100 rounded-lg p-6 mb-6 text-center">
          <div className="text-4xl font-bold text-amber-900 tracking-widest">
            {"●".repeat(pin.length)}
            {pin.length < 4 && "○".repeat(4 - pin.length)}
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handlePinClick(String(num))}
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-2xl py-4 rounded-lg transition-all active:scale-95"
            >
              {num}
            </button>
          ))}

          {/* Fila inferior: 0 y borrar */}
          <button
            onClick={() => handlePinClick("0")}
            disabled={loading}
            className="col-span-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-2xl py-4 rounded-lg transition-all active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-all active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Botón de Login */}
        <button
          onClick={handleLogin}
          disabled={loading || pin.length !== 4}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all text-lg"
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-stone-500 mt-4">
          Solo personal autorizado
        </p>
      </div>
    </div>
  );
}
