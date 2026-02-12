export default function Header() {
  return (
    <header className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 border-b-4 border-amber-600 py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-5xl mb-3">☕</div>
        <h1 className="text-4xl font-bold text-amber-900 mb-2">
          La Cafetería de Brenda
        </h1>
        <p className="text-amber-700 text-lg">
          Los mejores cafés y postres artesanales
        </p>
      </div>
    </header>
  );
}
