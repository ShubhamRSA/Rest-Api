import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import personRoutes from "./src/person/routes.js";
import carRoutes from "./src/car/routes.js";
import authRoutes from "./src/auth/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Server is working" });
});

// Auth routes
app.use("/api/v1/auth", authRoutes);

// Other routes
app.use("/api/v1/person", personRoutes);
app.use("/api/v1/car", carRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   - POST /api/v1/auth/register`);
  console.log(`   - POST /api/v1/auth/login`);
  console.log(`   - GET /api/v1/auth/me (protected)`);
});
