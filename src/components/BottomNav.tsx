"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  BarChart3,
  ClipboardList,
  Users,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface BottomNavProps {
  userRole: string;
}

export default function BottomNav({ userRole }: Readonly<BottomNavProps>) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      await signOut({ redirect: true, callbackUrl: "/login" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-20 max-w-4xl mx-auto px-4">
        {/* POS / Caja */}
        <Link
          href="/admin/pos"
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            isActive("/admin/pos")
              ? "text-amber-600 bg-amber-50"
              : "text-stone-600 hover:text-stone-800"
          }`}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs font-bold">Caja</span>
        </Link>

        {/* Órdenes / Cocina */}
        <Link
          href="/admin/orders"
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            isActive("/admin/orders")
              ? "text-amber-600 bg-amber-50"
              : "text-stone-600 hover:text-stone-800"
          }`}
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-xs font-bold">Órdenes</span>
        </Link>

        {/* Dashboard (Solo Admin) */}
        {userRole === "admin" && (
          <Link
            href="/admin/dashboard"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              isActive("/admin/dashboard")
                ? "text-amber-600 bg-amber-50"
                : "text-stone-600 hover:text-stone-800"
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs font-bold">Ventas</span>
          </Link>
        )}

        {/* Usuarios (Solo Admin) */}
        {userRole === "admin" && (
          <Link
            href="/admin/users"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              isActive("/admin/users")
                ? "text-amber-600 bg-amber-50"
                : "text-stone-600 hover:text-stone-800"
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-bold">Usuarios</span>
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-bold">Salir</span>
        </button>
      </div>
    </nav>
  );
}
