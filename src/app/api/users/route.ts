import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/users
 * Obtiene todos los usuarios
 */
export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * Crea un nuevo usuario
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, pin, role } = body;

    if (!name || !pin || !role) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const newUser = await db
      .insert(users)
      .values({
        name,
        pin,
        role: role as "admin" | "staff",
        active: true,
      })
      .returning();

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users?id=1
 * Actualiza un usuario
 */
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = Number.parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json(
        { error: "ID requerido" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, pin, role, active } = body;

    const updatedUser = await db
      .update(users)
      .set({
        ...(name && { name }),
        ...(pin && { pin }),
        ...(role && { role }),
        ...(active !== undefined && { active }),
      })
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users?id=1
 * Elimina un usuario
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = Number.parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json(
        { error: "ID requerido" },
        { status: 400 }
      );
    }

    // No permite eliminar al usuario ID 1 (admin principal)
    if (id === 1) {
      return NextResponse.json(
        { error: "No puedes eliminar al admin principal" },
        { status: 403 }
      );
    }

    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json(
      { message: "Usuario eliminado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}
