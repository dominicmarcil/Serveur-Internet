import 'dotenv/config';
import mysql from "mysql2/promise";

let db = null;

async function connectDB() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "example",
      database: process.env.DB_NAME || "tasksdb",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test connection
    await db.query("SELECT 1");
    console.log("🎉 Connexion DB établie");
    return db;

  } catch (err) {
    console.log("⚠️ Base de données non disponible, fallback activé");
    console.error(err);
    db = null;
    return null;
  }
}

export async function getDB() {
  if (!db) {
    await connectDB();
  }
  
  // Test si la connexion est toujours active
  if (db) {
    try {
      await db.query("SELECT 1");
    } catch (err) {
      console.log("⚠️ Connexion perdue, reconnexion...");
      db = null;
      await connectDB();
    }
  }
  
  return db;
}