import express from "express";
import cors from "cors";
import personRoutes from "./src/person/routes.js";
import carRoutes from "./src/car/routes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/person", personRoutes);
app.use("/api/v1/car", carRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
