import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Punto de Venta - La Cafetería",
  description: "Sistema POS para la cafetería",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Protección: El middleware se encarga de redirigir al login
  // Por ahora, simplemente renderizar el contenido

  return (
    <div className="bg-stone-100 min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-900 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">☕ POS Cafetería</h1>
          <p className="text-sm">Usuario</p>
        </div>
      </header>

      {/* Contenido */}
      <main className="p-4">{children}</main>

      {/* Bottom Navigation (móvil) */}
      <BottomNav userRole="staff" />
    </div>
  );
}
