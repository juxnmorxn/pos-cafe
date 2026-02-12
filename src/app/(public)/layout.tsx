import React from "react";

export const metadata = {
  title: "La Cafetería - Menú Digital",
  description: "Explora nuestro delicioso menú de cafés y postres",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-stone-50">
      {children}
      {/* Footer con redes sociales */}
      <footer className="bg-stone-900 text-white text-center py-6 px-4">
        <p className="text-sm mb-4">🎂 La Cafetería de Brenda 🍰</p>
        <div className="flex justify-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
            Facebook
          </a>
          <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
            WhatsApp
          </a>
        </div>
        <p className="text-xs text-stone-500 mt-4">© 2026 La Cafetería. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
