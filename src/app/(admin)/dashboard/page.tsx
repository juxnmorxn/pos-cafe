import { db } from "@/lib/db";
import { orders } from "@/lib/schema";

export default async function DashboardPage() {
  try {
    // Obtiene las ventas del día (en producción, deberías filtrar por fecha)
    const allOrders = await db.select().from(orders);
    const totalSales = allOrders.reduce((sum, order) => sum + order.total, 0);

    return (
      <div className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            📊 Dashboard de Ventas
          </h1>
          <p className="text-stone-600">Resumen del desempeño de tu cafetería</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total de ventas */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
            <p className="text-sm text-stone-600 mb-2">Total de Ventas</p>
            <p className="text-3xl font-bold text-green-600">
              ${totalSales.toFixed(2)}
            </p>
          </div>

          {/* Cantidad de pedidos */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
            <p className="text-sm text-stone-600 mb-2">Pedidos Completados</p>
            <p className="text-3xl font-bold text-blue-600">
              {allOrders.length}
            </p>
          </div>

          {/* Promedio por pedido */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-600">
            <p className="text-sm text-stone-600 mb-2">Promedio por Pedido</p>
            <p className="text-3xl font-bold text-amber-600">
              ${(allOrders.length > 0 ? totalSales / allOrders.length : 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Últimas ventas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Últimas Ventas
          </h2>

          {allOrders.length === 0 ? (
            <p className="text-stone-500 text-center py-8">
              Sin ventas registradas aún
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-100">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Monto</th>
                    <th className="px-4 py-2 text-left">Método</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.slice(-10).reverse().map((order) => (
                    <tr key={order.id} className="border-b hover:bg-stone-50">
                      <td className="px-4 py-3 font-bold">#{order.id}</td>
                      <td className="px-4 py-3">
                        <span className="text-green-600 font-bold">
                          ${order.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 capitalize">{order.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600">
                        {new Date(order.createdAt || "").toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mensaje informativo */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <p className="text-sm text-amber-800">
            💡 <strong>Consejo:</strong> Los datos se actualizan en tiempo real.
            Vuelve a cargar la página para ver cambios recientes.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error en dashboard:", error);
    return (
      <div className="bg-red-100 text-red-700 p-6 rounded-lg">
        <p>❌ Error al cargar el dashboard</p>
      </div>
    );
  }
}
