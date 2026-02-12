import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://pos-juxnmorxn.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzA4NzE2MTUsImlkIjoiNTdjMjZlZDctZWVlMS00YmUyLWI1MDEtNmM4ZGU5MzdlNjkxIiwicmlkIjoiOTNjZDUwNTAtYTRkZS00NDkxLTlhOGEtMDQ3NzM3MjEyNGI3In0.yC4etpz_wOU5mDXnLfh_kgdvy5gnmjK_zaf3CiYFpO2M0W6c2apPXBCybvu8uOLwyGokuXHPoL_0FN6HAtcvBQ",
});

try {
  const result = await client.execute("SELECT 1 as test");
  console.log("✅ Conexión exitosa a Turso!");
  console.log("Resultado:", result);
} catch (error) {
  console.error("❌ Error de conexión:", error);
}
