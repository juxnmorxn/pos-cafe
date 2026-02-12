# 🚀 Guía Completa: Despliegue en GitHub y Vercel

## PARTE 1: Configurar GitHub 

### Paso 1: Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `pos-cafe` (o el que prefieras)
3. Descripción: "Sistema POS Todo en Uno para Cafetería"
4. Elige **Private** o **Public** según gustes
5. **NO** inicialices con README (ya lo tienes)
6. Haz clic en "Create repository"

### Paso 2: Conectar tu proyecto local a GitHub

Copia y ejecuta estos comandos en la terminal (en la carpeta del proyecto):

```bash
# Ver estado actual
git status

# Configurar la URL del repositorio (reemplaza USERNAME y REPO)
git remote add origin https://github.com/USERNAME/pos-cafe.git

# Cambiar rama a main (si no está ya así)
git branch -M main

# Hacer push del código
git push -u origin main
```

**Ejemplo completo:**
```bash
git remote add origin https://github.com/juanmolina/pos-cafe.git
git branch -M main
git push -u origin main
```

### Paso 3: Configurar token de acceso (Si usa 2FA)

Si GitHub te pide contraseña y tienes autenticación de dos factores:

1. Ve a GitHub > Settings > Developer settings > Personal access tokens
2. Crea nuevo token con permisos: `repo`, `admin:repo_hook`
3. Copia el token
4. Cuando te pida contraseña en Git, usa el token en lugar de tu contraseña

---

## PARTE 2: Desplegar en Vercel

### Paso 1: Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz sign up con tu cuenta de GitHub
3. Autoriza a Vercel para acceder a tus repositorios

### Paso 2: Importar proyecto en Vercel

1. En el dashboard de Vercel, haz clic en "Add New..." → "Project"
2. Búsca y selecciona el repositorio `pos-cafe`
3. Haz clic en "Import"

## Paso 3: Configurar Variables de Entorno

Después de importar, **ANTES de desplegar**, necesitas agregar variables:

1. Ve a la pestaña "Environment Variables"
2. Agrega estas variables (cópialas de tu `.env.local`):

```
TURSO_CONNECTION_URL = libsql://abc123xyz.turso.io
TURSO_AUTH_TOKEN = eyJhbGc...token_muy_largo...
NEXTAUTH_SECRET = (genera uno nuevo - ver paso 4)
NEXTAUTH_URL = https://tu-dominio-vercel.vercel.app
```

### Paso 4: Generar NEXTAUTH_SECRET

Ejecuta en terminal:

```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String([byte[]] (1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copia el resultado y pégalo en `NEXTAUTH_SECRET`

### Paso 5: Desplegar

1. Haz clic en "Deploy"
2. Vercel compilará tu próyecto (toma 2-3 minutos)
3. Cuando veas ✅ "Congratulations!", tu app está en vivo

**Tu URL será:** `https://pos-cafe-xxx.vercel.app`

---

## PARTE 3: Información Importante Post-Despliegue

### ✅ Lo que funciona en Vercel:

- ✅ Página pública de menú
- ✅ Login por PIN
- ✅ Sistema POS con carrito
- ✅ Gestión de usuarios (crear/editar/eliminar)
- ✅ Dashboard de ventas
- ✅ Órdenes de cocina
- ✅ Base de datos Turso en la nube

### ⚙️ Variables críticas:

```
TURSO_CONNECTION_URL: URL de tu base de datos en Turso
TURSO_AUTH_TOKEN: Token de autenticación de Turso
NEXTAUTH_SECRET: Clave para cifrar sesiones
NEXTAUTH_URL: URL de tu aplicación en Vercel
```

### 📝 Usuarios de prueba en Turso:

```
🔐 Credenciales por defecto:
Usuario: Brenda (Admin)
PIN: 1234
```

### 🔄 Redeploy automático

Cada vez que hagas `git push origin main`, Vercel automáticamente:
1. Detecta el cambio
2. Recompila la aplicación
3. Despliega la nueva versión

---

## PARTE 4: Soluciones a Problemas Comunes

### ❌ Error: "Turso connection failed"

**Solución:** Verifica que tus variables de entorno estén bien copiadas sin espacios extras

```bash
# Prueba local antes de desplegar
echo $TURSO_CONNECTION_URL
echo $TURSO_AUTH_TOKEN
```

### ❌ Error: "Build failed"

**Solución:** Verifica que `npm run build` funciona localmente

```bash
npm run build
# Si funciona aquí, funcionará en Vercel
```

### ❌ Error: "Database timeout"

**Solución:** Turso a veces está lento. Vercel reintentera automáticamente

---

## PARTE 5: Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio:

1. En Vercel: Settings → Domains
2. Agrega tu dominio (ej: pos.midominio.com)
3. Sigue las instrucciones para actualizar DNS en tu registrador
4. Espera 24-48 horas para que se propague

---

## 📊 Resumen de Comandos Frecuentes

```bash
# Ver cambios locales
git status

# Subir cambios a GitHub
git add .
git commit -m "Descripción del cambio"
git push

# Vercel se enterará automáticamente y redesplegará

# Ver logs de Vercel (online)
# Dashboard > Project > Deployments > View Details
```

---

## 🎯 Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Código pusheado a GitHub (`main` branch)
- [ ] Cuenta de Vercel creada
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] NEXTAUTH_SECRET generado
- [ ] Deployment completado
- [ ] Acceso a la URL pública verificado
- [ ] Login probado con PIN 1234
- [ ] POS funcional
- [ ] Gestión de usuarios funcional

---

## 📱 Probar en vivo

Una vez desplegado:

1. Abre `https://tu-app.vercel.app`
2. Menú público: Visible sin login
3. Admin: Click en "Admin" o ve a `/admin/pos`
4. PIN: `1234`
5. Gestión usuarios: `/admin/users` (solo admin)

---

**¡Listo! Tu cafetería POS está en la nube! ☁️**

Para más ayuda: Vercel Dashboard → Deployments → Logs
