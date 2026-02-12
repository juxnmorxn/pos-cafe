"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ChevronDown } from "lucide-react";

interface User {
  id: number;
  name: string;
  pin: string;
  role: "admin" | "staff";
  active: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    role: "staff" as "admin" | "staff",
  });

  // Cargar usuarios
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/users?id=${editingId}` : "/api/users";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error guardando usuario");

      setFormData({ name: "", pin: "", role: "staff" });
      setEditingId(null);
      setShowForm(false);
      loadUsers();
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({ name: user.name, pin: user.pin, role: user.role });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar usuario?")) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando usuario");
      loadUsers();
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const handleToggle = async (id: number, active: boolean) => {
    try {
      const res = await fetch(`/api/users?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      if (!res.ok) throw new Error("Error actualizando usuario");
      loadUsers();
    } catch (err) {
      alert("Error: " + err);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">👥 Usuarios</h1>
          <p className="text-stone-600">Gestiona personal de la cafetería</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: "", pin: "", role: "staff" });
            setShowForm(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex gap-2 items-center font-bold"
        >
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej: Brenda"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-800 mb-2">
                PIN (4 dígitos)
              </label>
              <input
                type="text"
                value={formData.pin}
                onChange={(e) =>
                  setFormData({ ...formData, pin: e.target.value })
                }
                placeholder="1234"
                maxLength={4}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-800 mb-2">
                Rol
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "admin" | "staff",
                  })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              >
                <option value="staff">Staff (Mesero)</option>
                <option value="admin">Admin (Brenda)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de usuarios */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-stone-100 font-bold text-stone-800">
          <div>Nombre</div>
          <div>PIN</div>
          <div>Rol</div>
          <div>Acciones</div>
        </div>

        <div className="divide-y">
          {users.map((user) => (
            <div
              key={user.id}
              className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-6 hover:bg-stone-50 transition-all ${
                !user.active ? "opacity-50 line-through" : ""
              }`}
            >
              <div className="font-bold text-stone-800">{user.name}</div>
              <div className="text-stone-600 font-mono">****</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role === "admin" ? "👑 Admin" : "👤 Staff"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                  title="Editar"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleToggle(user.id, user.active)}
                  className={`font-bold ${
                    user.active
                      ? "text-green-600 hover:text-green-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title={user.active ? "Desactivar" : "Activar"}
                >
                  {user.active ? "✓" : "✗"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 bg-stone-50 rounded-lg">
          <p className="text-stone-500 mb-4">No hay usuarios aún</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold"
          >
            Crear primer usuario
          </button>
        </div>
      )}
    </div>
  );
}
