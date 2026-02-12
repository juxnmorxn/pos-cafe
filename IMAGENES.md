# 📸 Imágenes Alternativas para el Menú

## URLs de Unsplash más confiables

Algunas imágenes pueden no cargar por límites de API. Aquí tienes alternativas:

### Café
```typescript
// Espresso
"https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80"

// Latte
"https://images.unsplash.com/photo-1569982175971-d92b01cf8694?auto=format&fit=crop&w=400&q=80"

// Cappuccino  
"https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80"

// Americano
"https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80"

// Mocha
"https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=400&q=80"
```

### Frappés
```typescript
"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80"
"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80"
```

### Postres
```typescript
// Pastel de zanahoria
"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"

// Cheesecake
"https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=400&q=80"

// Brownie
"https://images.unsplash.com/photo-1590841609987-4ac211afdde1?auto=format&fit=crop&w=400&q=80"

// Tarta de limón
"https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=400&q=80"

// Croissant
"https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80"
```

### Bebidas
```typescript
"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80"
"https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=400&q=80"
"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80"
```

### Alimentos
```typescript
// Sándwich
"https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80"

// Panini
"https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&w=400&q=80"

// Ensalada
"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"

// Bagel
"https://images.unsplash.com/photo-1551106652-a5bcf4b29e84?auto=format&fit=crop&w=400&q=80"
```

## Mejor opción: Usa tus propias fotos

1. Crea la carpeta `public/images` en el proyecto
2. Coloca fotos de tus productos ahí
3. Actualiza las URLs en `src/data/menu.ts`:

```typescript
image: "/images/nombre-producto.jpg"
```

## Tip: Optimización de imágenes

Si usas tus propias fotos:
- Tamaño recomendado: 800x800px (o 1000x1000px máximo)
- Formato: WebP o JPG
- Calidad: 80-85%
- Herramientas gratuitas: 
  - [TinyPNG](https://tinypng.com)
  - [Squoosh](https://squoosh.app)
