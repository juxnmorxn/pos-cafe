import { db } from "@/lib/db";
import { orders } from "@/lib/schema";

export default async function OrdersPage() {
  try {
    // Obtiene todas las órdenes completadas (en producción filtrar por fecha)
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(orders.createdAt);

    return (
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            📋 Órdenes Activas
          </h1>
          <p className="text-stone-600">Comandas de la cocina</p>
        </div>

        {/* Grid de órdenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allOrders.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-stone-500">😎 Sin órdenes por preparar</p>
            </div>
          ) : (
            allOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600 hover:shadow-xl transition-all"
              >
                {/* Encabezado de orden */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-900">
                      Orden #{order.id}
                    </h3>
                    <p className="text-sm text-stone-500">
                      {new Date(order.createdAt || "").toLocaleTimeString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    {order.status}
                  </span>
                </div>

                {/* Detalles */}
                <div className="space-y-2 mb-4 pb-4 border-b border-stone-200">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Monto:</span>
                    <span className="font-bold text-green-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Método:</span>
                    <span className="font-bold capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Botón de acción */}
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg transition-all">
                  ✓ Completado
                </button>
              </div>
            ))
          )}
        </div>

        {/* Nota informativa */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            📌 <strong>Nota:</strong> En esta vista aparecen todas las órdenes del sistema.
            Se pueden filtrar por estado según sea necesario.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error en órdenes:", error);
    return (
      <div className="bg-red-100 text-red-700 p-6 rounded-lg">
        <p>❌ Error al cargar las órdenes</p>
      </div>
    );
  }
}
