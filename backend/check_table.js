import pool from "./db.js";

async function checkTable() {
  try {
    const result = await pool.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'person'",
    );
    console.log("Columns in 'person' table:");
    result.rows.forEach((row) => console.log(row.column_name));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    pool.end();
  }
}

checkTable();
