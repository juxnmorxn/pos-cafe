# 🌿 Menú Digital Interactivo

Menú digital moderno y elegante para cafetería, construido con las mejores tecnologías.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos modernos y responsivos
- **Framer Motion** - Animaciones suaves y profesionales
- **Lucide React** - Iconos elegantes

## ✨ Características

- 📱 **Mobile First** - Diseño optimizado para dispositivos móviles
- 🎨 **Diseño moderno** - Paleta de colores tierra y café
- 🔄 **Filtrado dinámico** - Navegación por categorías con animaciones
- ⚡ **Performance** - Optimizado para velocidad y SEO
- 🖼️ **Imágenes optimizadas** - Next.js Image para carga rápida

## 🛠️ Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

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
