# 🚀 Inicio Rápido - Menú Digital

## ✅ Tu menú está listo y funcionando!

**URL local:** http://localhost:3000

## 📝 Lo que se creó

### Estructura del Proyecto
```
menu-cafeteria/
├── src/
│   ├── app/
│   │   ├── layout.tsx       ✅ Configuración general
│   │   ├── page.tsx         ✅ Página principal con filtros
│   │   └── globals.css      ✅ Estilos personalizados
│   ├── components/
│   │   ├── Header.tsx       ✅ Logo y botones
│   │   ├── CategoryNav.tsx  ✅ Filtro de categorías con animación
│   │   └── ProductCard.tsx  ✅ Tarjeta de producto
│   ├── data/
│   │   └── menu.ts          ✅ 22 productos de ejemplo
│   └── lib/
│       └── utils.ts         ✅ Utilidades Tailwind
├── CHECKLIST.md             ✅ Pasos para personalizar
├── IMAGENES.md              ✅ URLs alternativas de fotos
└── README.md                ✅ Documentación completa
```

## 🎯 3 Pasos para personalizar (10 minutos)

### 1️⃣ Edita los productos (5 min)

Abre [src/data/menu.ts](src/data/menu.ts) y cambia:

```typescript
{
  id: "1",
  name: "Tu producto",           // ← Cambia esto
  description: "Tu descripción",  // ← Y esto
  price: 50,                      // ← Y esto
  image: "/images/foto.jpg",      // ← Pon tu foto aquí
  category: "cafe",               // ← Categoría
}
```

### 2️⃣ Cambia el nombre de la cafetería (1 min)

Abre [src/components/Header.tsx](src/components/Header.tsx) línea 19:

```typescript
<h1 className="font-bold text-xl text-stone-900">
  Tu Cafetería Aquí  {/* ← Cambia esto */}
</h1>
```

### 3️⃣ Agrega tus fotos (4 min)

```bash
# 1. Crea la carpeta
mkdir public/images

# 2. Coloca tus fotos ahí
# 3. Actualiza las URLs en menu.ts a "/images/nombre.jpg"
```

## 🎨 Características implementadas

✅ **Diseño Mobile First** - Perfecto en celular  
✅ **Filtrado por categorías** - 6 categorías con iconos  
✅ **Animaciones suaves** - Framer Motion  
✅ **22 productos de ejemplo** - Ya con datos  
✅ **Imágenes de alta calidad** - Placeholder de Unsplash  
✅ **Paleta de colores café/madera** - Profesional  
✅ **Totalmente responsive** - Mobile/Tablet/Desktop  
✅ **Optimizado para SEO** - Next.js 14  
✅ **Carga ultra rápida** - SSR + Image Optimization  

## 🔧 Comandos

```bash
# Desarrollo (ya está corriendo)
npm run dev

# Compilar para producción
npm run build

# Iniciar en producción
npm start
```

## 📚 Archivos de ayuda

- [CHECKLIST.md](CHECKLIST.md) - Lista completa de personalización
- [IMAGENES.md](IMAGENES.md) - URLs alternativas de fotos
- [README.md](README.md) - Documentación técnica completa

## 🎬 Demo Features

**Prueba estas interacciones:**

1. **Filtros de categoría** - Click en "Café", "Postres", etc.
2. **Animaciones** - Mira cómo entran los productos
3. **Responsive** - Redimensiona la ventana
4. **Botones** - Hover sobre "Agregar" y categorías

## 🚀 Próximo paso: Deploy

Cuando estés listo, despliega gratis en Vercel:

```bash
npm install -g vercel
vercel login
vercel
```

O sube tu proyecto a GitHub y conecta con Vercel desde su web.

## ⚠️ Nota sobre imágenes

Algunos productos muestran error de imagen (404/429). Es temporal de Unsplash.

**Solución:** Reemplaza con tus fotos en `public/images/`

## 💡 Tips

1. **Fotos reales** = Más ventas (usa las de tus productos)
2. **Descripciones tentadoras** = Mejor experiencia
3. **Precios justos** = Más conversiones
4. **Actualiza seguido** = Mantén el menú fresco

---

## 🆘 Necesitas ayuda?

- Revisa el [README.md](README.md) para documentación completa
- Consulta el [CHECKLIST.md](CHECKLIST.md) para la lista de tareas
- Los errores de imagen son normales, usa tus fotos propias

**¡Tu menú digital profesional está listo! 🎉**
