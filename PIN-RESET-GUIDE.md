# 🔐 Cómo Cambiar PIN de Usuarios (Si Olvidó su PIN)

## Opción 1: Desde el Administrador (Recomendado)

Si eres administrador y un usuario olvidó su PIN:

### Paso 1: Acceder a Gestión de Usuarios

```
1. Login con PIN de admin: 1234
2. Menú inferior → "Usuarios" (icono de personas)
   O accede directamente a: /admin/users
```

### Paso 2: Editar el Usuario

```
1. Busca al usuario cuyo PIN quieres cambiar
2. Haz clic en el botón azul "Editar" (lápiz)
3. Se abrirá el formulario de edición
```

### Paso 3: Cambiar el PIN

```
1. Si el PIN actual es: 2345
2. Cámbialo a uno nuevo: 5678
3. Haz clic en "Guardar"
4. ✅ PIN actualizado exitosamente
```

### Paso 4: Comunicar al Usuario

```
📱 Dile al usuario: "Tu nuevo PIN es: 5678"
   (Mejor hacerlo en persona, no por mensaje)
```

---

## Opción 2: Crear Nuevo Usuario (Si Varios Olvidaron PIN)

Si varios usuarios olvidaron su PIN, es mejor crear nuevos:

```
1. Vé a /admin/users
2. Haz clic en "Nuevo Usuario"
3. Nombre: Ídem
4. PIN: Nuevo PIN diferente
5. Rol: Igual al anterior
6. Haz clic en "Crear"
7. Ahora puede usar el nuevo PIN
```

---

## ⚠️ Seguridad Importante

### PINs Seguros:
✅ Use 4 dígitos diferentes: 1285, 5739, 9462
✅ Cambie regularmente en auditorías
✅ NO use: 1234, 0000, 1111, secuencias obvias

### PINs NO Seguros:
❌ 0000 (muy obvio)
❌ 1234 (PIN por defecto)
❌ 1111, 2222, etc. (secuencias)
❌ Fechas de nacimiento

---

## 🔄 Cambiar PIN del Admin (Brenda)

Para cambiar el PIN del admin:

```
1. Login como Brenda (PIN: 1234)
2. Ve a /admin/users
3. Busca "Brenda" en la lista
4. Haz clic en editar (lápiz)
5. Cambia el PIN a uno nuevo (Ej: 9876)
6. Haz clic en Guardar
7. ⚠️ IMPORTANTE: Guarda el nuevo PIN en un lugar seguro
```

**Consejo:** Cambia el PIN admin cada mes

---

## 📋 Template de Registro de PINs

Copia esto en un archivo seguro (Ej: Excel, Notion, físico en caja fuerte):

```
REGISTRO DE PINPIN
==================

Admin (Brenda):  [ ______ ]
Mesero Juan:     [ ______ ]
Mesero María:    [ ______ ]
Barista Carlos:  [ ______ ]
Cajero Luis:     [ ______ ]

Fecha Última Actualización: ________
Cambió por: ________
```

⚠️ **Mantén esto en lugar SEGURO y FUERA del alcance de los clientes**

---

## API Endpoint (Para Desarrolladores)

Si quieres un endpoint directo para cambiar PIN:

```javascript
// Cambiar PIN de usuario ID=2
fetch('/api/users?id=2', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pin: '5678' })
})
```

---

## 🆘 Emergencia: Admin Olvidó su PIN

Si el único admin olvidó su PIN:

**Opción 1:** Eliminar usuario y crear nuevo
```
Necesitas acceso a la base de datos:
1. Ve a https://turso.tech
2. Abre tu proyecto
3. Tabla "users"
4. Elimina a Brenda
5. Usa la página de usuarios para crear nuevo admin
```

**Opción 2:** Contactar soporte de Turso
```
https://turso.tech/support
```

---

## Checklist de Seguridad

- [ ] PIN de admin cambiado mensualmente
- [ ] Registro seguro de PINs mantenido
- [ ] Acceso al formulario de usuarios restringido a administrador
- [ ] No compartir PINs por mensaje de texto
- [ ] Documentación de cambios de PIN guardada

---

## Resumen

| Situación | Acción |
|-----------|--------|
| Usuario olvidó PIN | Ir a /admin/users → Editar → Cambiar PIN |
| Admin olvidó PIN | Eliminar usuario admin → Crear uno nuevo |
| Cambiar PIN regularmente | Cada mes, desde /admin/users |
| PIN inseguro | Cambiar a número aleatorio de 4 dígitos |
| Auditoría de acceso | Revisar qué usuarios existen cada trimestre |

---

**Preguntas?** Revisa [VERCEL-GITHUB-SETUP.md](VERCEL-GITHUB-SETUP.md) o contacta soporte.
