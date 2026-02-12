# ☕ Sistema POS Café "Todo en Uno"

Sistema completo de gestión de punto de venta para cafeterías con menú público, sistema de caja (POS) protegido por PIN y panel administrativo.

**Demo en vivo:** *Próximamente en Vercel*

---

## 🎯 ¿Qué es?

Un sistema POS profesional enfocado en cafeterías que incluye:

- ✅ **Menú público** - Visualización de productos sin login
- ✅ **Sistema de caja** - POS con carrito y métodos de pago
- ✅ **Panel admin** - Gestión de usuarios y reportes
- ✅ **Base de datos en la nube** - Turso (LibSQL)
- ✅ **Listo para producción** - Desplegable en Vercel

---

## 🚀 Características Principales

### 🍽️ Menú Público
- Visualización de todos los productos
- Filtración por categoría
- Responsive (móvil, tablet, desktop)
- Sin necesidad de login

### 💳 Sistema POS
- Carrito de compras interactivo
- Agregar/remover productos
- Cálculo automático de total
- 3 métodos de pago (Efectivo, Tarjeta, Transferencia)
- Registro automático de órdenes

### 👥 Gestión de Usuarios
- Crear usuarios con PIN único
- Editar datos y cambiar PINs
- Eliminar usuarios (con protección del admin)
- Roles: Admin y Staff
- Activar/desactivar usuarios

### 📊 Dashboard Admin
- Estadísticas de ventas
- Últimas órdenes
- Ingresos totales
- Datos en tiempo real

### 🍳 Panel de Órdenes
- Visualización de órdenes pendientes
- Detalles completos de cada orden
- Actualización en tiempo real

---

## 💻 Stack Tecnológico

- **Framework:** Next.js 16.1.6 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Estado:** Zustand
- **Base de datos:** Turso (LibSQL) + Drizzle ORM
- **Auth:** PIN-based simplificado
- **UI:** React 19 + Lucide Icons
- **Despliegue:** Vercel

---

## 🔐 Seguridad

- Autenticación por PIN de 4 dígitos
- Sesiones seguras con cookies HTTP-only
- Protección de rutas sensibles
- Insensibilidad ante intentos de eliminar admin
- Variables de entorno protegidas

---

## 📦 Instalación Local

### Requisitos
- Node.js 18+
- npm o yarn
- Cuenta de Turso (base de datos)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/pos-cafe.git
cd pos-cafe

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Copia .env.local.example a .env.local y complete:
# TURSO_CONNECTION_URL=...
# TURSO_AUTH_TOKEN=...

# 4. Crear tablas en base de datos
node setup-db.js

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📱 Rutas Principales

```
Público:
├── /                  → Menú público
└── /login             → Entrada de PIN

Admin (Protegido por PIN):
├── /admin/pos         → Sistema de caja
├── /admin/orders      → Órdenes de cocina
├── /admin/dashboard   → Reportes de ventas
└── /admin/users       → Gestión de usuarios (solo admin)
```

---

## 🔑 Credenciales de Prueba

```
Usuario: Brenda (Admin)
PIN: 1234
```

---

## 🚀 Despliegue en Vercel

```bash
# 1. Hacer push a GitHub
git push origin main

# 2. Importar proyecto en Vercel
# - Ve a vercel.com
# - Conecta tu repositorio
# - Configura variables de entorno
# - Deploy automático

# Ver guía detallada en: VERCEL-GITHUB-SETUP.md
```

---

## 📚 Documentación

- **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** - Resumen técnico completo
- **[VERCEL-GITHUB-SETUP.md](VERCEL-GITHUB-SETUP.md)** - Guía de despliegue
- **[PIN-RESET-GUIDE.md](PIN-RESET-GUIDE.md)** - Cómo cambiar PINs
- **[ARQUITECTURA.md](ARQUITECTURA.md)** - Detalles de arquitectura

---

## 🗄️ Base de Datos

Tablas incluidas:
- `users` - Users y staff con PINs
- `products` - Catálogo de productos
- `orders` - Órdenes/ventas
- `order_items` - Items de cada orden

Ver esquema en PROJECT-SUMMARY.md

---

## 🔄 API Endpoints

```
GET    /api/products          → Obtener productos
POST   /api/orders            → Crear nueva orden
GET    /api/users             → Listar usuarios (admin)
POST   /api/users             → Crear usuario (admin)
PUT    /api/users?id=X        → Actualizar usuario (admin)
DELETE /api/users?id=X        → Eliminar usuario (admin)
```

---

## 🛠️ Desarrollo

```bash
# Compilar TypeScript
npm run build

# Ejecutar tests (si los hay)
npm test

# Ver lint errors
npm run lint
```

---

## 📊 Performance

- ⚡ Build time: ~3 segundos
- 📦 Bundle size: ~450KB (Turbopack optimizado)
- 🚀 Vercel: Deployment automático en < 2 minutos

---

## 🐛 Troubleshooting

### PIN no funciona
→ Verifica PIN sea: 1234 (admin por defecto)

### BD no conecta
→ Verifica TURSO_CONNECTION_URL y TURSO_AUTH_TOKEN en .env.local

### Productos no cargan
→ Ejecuta `node setup-db.js` para crear seed data

Para más ayuda, ver documentación incluida.

---

## 🛣️ Roadmap

- [ ] Fotografía y gestión de imágenes
- [ ] Sistema de descuentos
- [ ] Reportes PDF
- [ ] Integración Stripe
- [ ] Mesas QR
- [ ] Aplicación móvil nativa
- [ ] Múltiples sucursales

---

## 📝 Licencia

Uso personal y comercial permitido.

---

## 👨‍💻 Autor

Desarrollado como sistema POS completo y listo para producción.

---

## 📞 Soporte

Para problemas o preguntas:
- Revisa la documentación incluida
- Contacta al equipo de desarrollo
- Abre un issue en GitHub

---

**Versión:** 1.0.0  
**Status:** ✅ Producción Ready  
**Última actualización:** 2024

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
├── components/
│   ├── Header.tsx      # Header sticky con logo
│   ├── CategoryNav.tsx # Navegación de categorías
│   └── ProductCard.tsx # Tarjeta de producto
├── data/
│   └── menu.ts         # Datos del menú (fácil de editar)
└── lib/
    └── utils.ts        # Utilidades (cn helper)
```

## 🎨 Personalización

### Editar productos

Edita el archivo [src/data/menu.ts](src/data/menu.ts) para agregar o modificar productos:

```typescript
{
  id: "1",
  name: "Nombre del producto",
  description: "Descripción breve",
  price: 50,
  image: "URL de la imagen",
  category: "categoria",
}
```

### Cambiar colores

Los colores principales están en Tailwind:
- **Fondo**: `bg-stone-50`
- **Texto**: `text-stone-900`
- **Acento**: `bg-amber-700`

## 📸 Agregar imágenes propias

1. Coloca tus imágenes en `public/images/`
2. Actualiza las URLs en `menu.ts`:
   ```typescript
   image: "/images/mi-producto.jpg"
   ```

## 🌐 Deploy en Vercel

```bash
npm install -g vercel
vercel
```

O conecta tu repositorio en [vercel.com](https://vercel.com).

## 📝 Notas

- Las imágenes actuales son de Unsplash como placeholders
- Reemplázalas con fotos reales de tus productos
- Los precios son de ejemplo, ajústalos según tu menú
- El menú es completamente responsive (mobile/tablet/desktop)

## 💡 Tips Pro

1. **Optimiza las imágenes**: Usa WebP con calidad 80-85%
2. **Fotografía**: Buena iluminación natural, fondo limpio
3. **Descripción**: Sé breve pero atractivo (2-3 líneas)
4. **Precios**: Considera precios psicológicos ($49 vs $50)

---

Creado con ❤️ para una experiencia de usuario excepcional
