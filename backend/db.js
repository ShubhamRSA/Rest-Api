import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "mern@dev",
  port: 5432,
});
export default pool;
