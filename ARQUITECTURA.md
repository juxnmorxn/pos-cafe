# ☕ La Cafetería de Brenda - Arquitectura Final

## 🎯 Visión General

Esta es una aplicación web **"Todo en Uno"** que funciona en URL única (`cafeteriabrenda.com`) pero con dos mundos completamente separados:

### 🟢 Mundo Público (SIN Login)
- **URL:** `/` (raíz)
- **Qué ve:** Clientes y visitantes
- **Qué pueden hacer:** Ver menú digital, ver precios, escanear QR
- **Acceso:** LIBRE, sin restricciones

### 🔴 Mundo Privado (CON Login)
- **URL:** `/login` → `/admin/pos`, `/admin/dashboard`, `/admin/orders`
- **Quién accede:** Brenda (Admin) y Staff (Meseros)
- **Qué pueden hacer:** Procesar ventas, ver reportes, gestionar pedidos
- **Acceso:** Protegido por PIN numérico

---

## 📁 Estructura de Carpetas

```
src/
├── app/
│   ├── (public)/              👥 MENÚ PÚBLICO (sin login)
│   │   ├── layout.tsx
│   │   └── page.tsx           ← Menú digital
│   │
│   ├── (admin)/               🔐 ÁREA PRIVADA (protegida)
│   │   ├── layout.tsx         ← Auth check + Bottom nav
│   │   ├── pos/page.tsx       💳 Caja registradora
│   │   ├── dashboard/page.tsx 📊 Ventas (solo admin)
│   │   └── orders/page.tsx    🍳 Cocina/Comandas
│   │
│   ├── login/                 🔑 Acceso al sistema
│   │   └── page.tsx
│   │
│   ├── api/                   ⚙️ APIs backend
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── products/route.ts
│   │   └── orders/route.ts
│   │
│   ├── layout.tsx             (Root layout global)
│   └── globals.css
│
├── lib/
│   ├── db.ts                  🔗 Conexión Turso
│   ├── schema.ts              📊 Esquema BD
│   └── auth.ts                🔐 Configuración Auth.js
│
├── components/                🧩 Componentes reutilizables
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── CategoryFilter.tsx
│   ├── POSCategories.tsx
│   ├── CheckoutModal.tsx
│   └── BottomNav.tsx
│
├── store/
│   └── cartStore.ts           🛒 Estado del carrito (Zustand)
│
├── middleware.ts              🛡️ Protección de rutas
└── public/                    📸 Imágenes estáticas
```

---

## 🔧 Configuración

### Variables de Entorno

El archivo `.env.local` ya tiene:

```
TURSO_CONNECTION_URL=libsql://pos-juxnmorxn.aws-us-east-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

### Instalar Dependencias

```bash
npm install
```

### Crear Tablas en Turso

Ejecuta las migraciones de Drizzle:

```bash
npx drizzle-kit generate:sqlite
npx drizzle-kit migrate
```

O si prefieres crear las tablas manualmente en Turso:

```sql
-- Usuarios
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  pin TEXT NOT NULL,
  role TEXT DEFAULT 'staff' CHECK(role IN ('admin', 'staff')),
  active INTEGER DEFAULT 1
);

-- Productos (Menú)
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Órdenes (Cabecera)
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  total REAL NOT NULL,
  payment_method TEXT DEFAULT 'cash' CHECK(payment_method IN ('cash', 'card', 'transfer')),
  status TEXT DEFAULT 'completed' CHECK(status IN ('completed', 'cancelled')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Detalle de Órdenes
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price_at_moment REAL NOT NULL,
  FOREIGN KEY(order_id) REFERENCES orders(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);
```

---

## 🚀 Iniciar Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📱 Flujo de Usuario - Brenda

### 1️⃣ Los Clientes entran a `cafeteriabrenda.com`
- Ver el menú digital
- Ver precios
- Escanear QR para ver en su celular
- **NO hay login, todo es público**

### 2️⃣ Para VENDER - Brenda entra a `cafeteriabrenda.com/login`
- Ingresa su PIN (ejemplo: `1234`)
- Se redirige automáticamente a `/admin/pos` (la caja registradora)
- Puede guardar como App en pantalla de inicio (PWA)

### 3️⃣ Sistema de Caja (`/admin/pos`)
- ✅ Buscar productos por categoría
- ✅ Agregar al carrito con cantidad
- ✅ Ver total en tiempo real
- ✅ Seleccionar método de pago
- ✅ Confirmar venta (guarda en Turso)

### 4️⃣ Dashboard (`/admin/dashboard`) - Solo Admin
- Ver total de ventas del día
- Cantidad de pedidos
- Promedio de venta
- Historial de transacciones

### 5️⃣ Órdenes (`/admin/orders`) - Cocina
- Ver todas las órdenes pendientes
- Marcar como completadas

---

## 🔐 Autenticación (PIN)

El sistema usa **Next Auth v5** con Credenciales:

1. **Usuario ingresa PIN** en `/login`
2. **Se valida contra BD** (tabla `users`)
3. **Se crea JWT token** (sesión)
4. **Middleware redirige** sin sesión a `/login`

### Crear un Usuario Admin Manual

```sql
INSERT INTO users (name, pin, role, active) 
VALUES ('Brenda', '1234', 'admin', 1);

INSERT INTO users (name, pin, role, active) 
VALUES ('Mesero Juan', '5678', 'staff', 1);
```

---

## 🛒 Carrito y Ventas

### Carrito (Client-Side)
- Usa **Zustand** para estado global
- Se agregan productos al carrito
- Se ajusta cantidad en tiempo real
- Al "COBRAR" → se abre modal de pago

### Guardar Venta (Server)
- POST `/api/orders` con total y método de pago
- Se valida sesión
- Se inserta en tabla `orders`
- Se redirige a caja vacía

---

## 🎨 Diseño & UX

### Colores Principales
- **Amber/Orange:** Marca de cafetería (#b45309 a #f59e0b)
- **Stone/Gris:** Neutro para fondos
- **Verde:** Acciones positivas (COBRAR)
- **Rojo:** Cancelar/Cerrar sesión

### Responsive
- ✅ 100% para mobile-first
- ✅ Botones grandes para dedo
- ✅ Touch-friendly
- ✅ Bottom navigation sticky (móvil)

---

## 📡 APIs

### GET `/api/products`
Retorna todos los productos activos
```json
[
  {
    "id": 1,
    "name": "Espresso",
    "price": 2.50,
    "category": "cafes",
    "image": "/productos/espresso.jpg"
  }
]
```

### POST `/api/orders`
Crea una orden (requiere autenticación)
```json
{
  "total": 12.50,
  "paymentMethod": "cash",
  "items": [...]
}
```

---

## 🛡️ Seguridad

1. **Middleware:** Redirige peticiones a `/admin` sin sesión
2. **JWT:** Token seguro en cookie HttpOnly
3. **PIN:** Se valida en servidor (no en cliente)
4. **CORS:** Evita solicitudes no autorizadas

---

## 📊 Base de Datos

### Tablas Principales

| Tabla | Descripción | Registros |
|-------|-------------|-----------|
| `users` | Brenda + Staff | ~2-5 |
| `products` | Menú completo | ~20-50 |
| `orders` | Historial de ventas | Ilimitado |
| `order_items` | Detalles de venta | Ilimitado |

### Totalmente Administrable
- Brenda puede agregar/editar productos directamente en Turso (panel web)
- Cambiar precios activa automáticamente en `/`
- Desactivar producto (active=0) lo oculta del menú

---

## 🚀 Deploy en Vercel

1. Pushea el código a GitHub
2. Conecta repo en Vercel
3. Agrega variables de entorno
4. Deploy automático en cada push

```env
TURSO_CONNECTION_URL=...
TURSO_AUTH_TOKEN=...
NEXTAUTH_SECRET=<nueva-clave>
NEXTAUTH_URL=https://cafeteriabrenda.com
```

---

## 📝 Notas Importantes

- **PIN:** Cambiar "your-super-secret-key-change-this-in-production" en `.env.local`
- **Imágenes:** Colocar en carpeta `public/productos/`
- **Backup:** Turso hace backups automáticos
- **Escala:** Soporta miles de órdenes sin problemas

---

## 🤝 Soporte

Si algo no funciona:
1. Revisar console del navegador (F12)
2. Ver logs en `npm run dev`
3. Verifica que Turso esté conectada

---

**Hecho con ☕ para Brenda** 🎉
