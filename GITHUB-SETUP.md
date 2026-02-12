# 🚀 Subir a GitHub - Pasos Rápidos

Tu repositorio local está listo! Ahora sigue estos pasos:

## ✅ Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) y **inicia sesión** (crea cuenta si no tienes)
2. Click en el **+** (arriba a la derecha) → **New repository**
3. Nombre: `menu-cafeteria`
4. Descripción (opcional): "Menú digital interactivo con Next.js"
5. **NO** marques "Initialize with README" (ya tenemos uno)
6. Click en **Create repository**

## ✅ Paso 2: Conectar tu Repo Local con GitHub

Copia y pega ESTO en PowerShell (reemplaza USERNAME):

```powershell
cd "c:\Users\juanm\Music\cafe\menu-cafeteria"
git branch -M main
git remote add origin https://github.com/USERNAME/menu-cafeteria.git
git push -u origin main
```

**Donde dice `USERNAME` → pon tu usuario de GitHub**

## ✅ Ejemplo Completo:

Si tu usuario es `juanmendoza`, sería:

```powershell
git branch -M main
git remote add origin https://github.com/juanmendoza/menu-cafeteria.git
git push -u origin main
```

## 📝 Notas:

- **Primera vez:** Te pedirá autenticación. Usa tu usuario y contraseña de GitHub
- Si usas **2FA**: Necesitas un token personal. Lee más abajo ↓
- Después solo haz: `git push`

## 🔐 Si Tienes 2FA Habilitado:

1. Ve a [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click en **Generate new token**
3. Dale nombre: "menu-cafeteria"
4. Selecciona: `repo` y `workflow`
5. Click **Generate token**
6. **COPIA el token** (no lo guardes en el repo!)
7. En PowerShell, usa el token como contraseña

---

## 📲 Una Vez Subido:

- Tu código estará en GitHub
- Puedes compartir el link: `https://github.com/USERNAME/menu-cafeteria`
- Otros pueden clonar tu repo: `git clone https://github.com/USERNAME/menu-cafeteria.git`

## 🎯 Futuros Cambios:

Cuando hagas cambios locales:

```powershell
git add .
git commit -m "Descripción del cambio"
git push
```

---

**¿Necesitas ayuda con el token o 2FA? Avísame!**
