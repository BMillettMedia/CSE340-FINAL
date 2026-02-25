//testing BYU sql data connection

import pool from "./config/db.js";

try {
  const result = await pool.query("SELECT NOW()");
  console.log("Connected successfully:", result.rows[0]);
} catch (error) {
  console.error("Connection failed:", error);
}

process.exit();