import pool from "./db.js";

async function checkCarTable() {
  try {
    const result = await pool.query(
      "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'car' ORDER BY ordinal_position",
    );
    console.log("Columns in 'car' table:");
    result.rows.forEach((row) =>
      console.log(
        `${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable}, default: ${row.column_default})`,
      ),
    );

    console.log("\n\nForeign keys:");
    const fkResult = await pool.query(`
      SELECT constraint_name, column_name, foreign_table_name, foreign_column_name
      FROM information_schema.key_column_usage
      WHERE table_name = 'car' AND foreign_table_name IS NOT NULL
    `);
    fkResult.rows.forEach((row) =>
      console.log(
        `${row.column_name} -> ${row.foreign_table_name}.${row.foreign_column_name}`,
      ),
    );
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    pool.end();
  }
}

checkCarTable();
