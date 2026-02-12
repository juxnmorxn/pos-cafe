import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://pos-juxnmorxn.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzA4NzE2MTUsImlkIjoiNTdjMjZlZDctZWVlMS00YmUyLWI1MDEtNmM4ZGU5MzdlNjkxIiwicmlkIjoiOTNjZDUwNTAtYTRkZS00NDkxLTlhOGEtMDQ3NzM3MjEyNGI3In0.yC4etpz_wOU5mDXnLfh_kgdvy5gnmjK_zaf3CiYFpO2M0W6c2apPXBCybvu8uOLwyGokuXHPoL_0FN6HAtcvBQ",
});

const statements = [
  // Usuarios
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    pin TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'staff')) DEFAULT 'staff',
    active INTEGER DEFAULT 1
  )`,

  // Productos
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`,

  // Órdenes
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    total REAL NOT NULL,
    payment_method TEXT CHECK(payment_method IN ('cash', 'card', 'transfer')) DEFAULT 'cash',
    status TEXT CHECK(status IN ('completed', 'cancelled')) DEFAULT 'completed',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`,

  // Detalles de Órdenes
  `CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_moment REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`,

  // Insert: Usuario Admin
  `INSERT OR IGNORE INTO users (id, name, pin, role, active) 
   VALUES (1, 'Brenda', '1234', 'admin', 1)`,

  // Insert: Productos de ejemplo
  `INSERT OR IGNORE INTO products (id, name, price, category, active) 
   VALUES (1, 'Espresso', 2.50, 'cafes', 1)`,
  `INSERT OR IGNORE INTO products (id, name, price, category, active) 
   VALUES (2, 'Cappuccino', 3.50, 'cafes', 1)`,
  `INSERT OR IGNORE INTO products (id, name, price, category, active) 
   VALUES (3, 'Croissant', 4.00, 'postres', 1)`,
  `INSERT OR IGNORE INTO products (id, name, price, category, active) 
   VALUES (4, 'Brownies', 5.00, 'postres', 1)`,
  `INSERT OR IGNORE INTO products (id, name, price, category, active) 
   VALUES (5, 'Agua', 1.50, 'bebidas', 1)`,
];

async function setupDatabase() {
  try {
    console.log("🚀 Creando tablas en Turso...\n");

    for (const sql of statements) {
      try {
        await client.execute(sql);
        const action = sql.includes("CREATE") ? "Tabla creada" : 
                       sql.includes("INSERT") ? "Datos insertados" : 
                       "Ejecutado";
        const tableName = sql.match(/TABLE\s+(\w+)|INTO\s+(\w+)/)?.[1] || 
                         sql.match(/INTO\s+(\w+)/)?.[1] || "desconocido";
        console.log(`✅ ${action}: ${tableName}`);
      } catch (err) {
        if (err.toString().includes("UNIQUE") || err.toString().includes("already exists")) {
          console.log(`⚠️  Saltado (ya existe)`);
        } else {
          throw err;
        }
      }
    }

    console.log("\n✨ ¡Base de datos lista!\n");

    // Verificar datos
    const users = await client.execute("SELECT COUNT(*) as count FROM users");
    const products = await client.execute("SELECT COUNT(*) as count FROM products");
    
    console.log(`📊 Estadísticas:`);
    console.log(`   Users: ${users.rows[0]?.count || 0}`);
    console.log(`   Products: ${products.rows[0]?.count || 0}`);

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

await setupDatabase();
