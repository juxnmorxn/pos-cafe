import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 👤 USUARIOS (Brenda y el Staff)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  pin: text("pin").notNull(), // PIN numérico: "1234"
  role: text("role", { enum: ["admin", "staff"] }).default("staff"),
  active: integer("active", { mode: "boolean" }).default(true),
});

// ☕ PRODUCTOS (El Menú Digital)
export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  category: text("category").notNull(), // "cafes", "postres", "bebidas"
  image: text("image"), // URL o ruta relativa
  active: integer("active", { mode: "boolean" }).default(true), // Interruptor On/Off
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 🧾 VENTAS (Cabecera de la venta)
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  total: real("total").notNull(),
  paymentMethod: text("payment_method", { enum: ["cash", "card", "transfer"] }).default("cash"),
  status: text("status", { enum: ["completed", "cancelled"] }).default("completed"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 📦 DETALLE DE VENTA (Qué productos se vendieron)
export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  priceAtMoment: real("price_at_moment").notNull(), // Congelar precio en el momento
});
