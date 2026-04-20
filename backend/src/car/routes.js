import express from "express";
import { authMiddleware } from "../auth/middleware.js";
import {
  getAllCars,
  getCarById,
  addCar,
  deleteCar,
  updateCar,
  getCarsByPerson,
} from "./controller.js";

const router = express.Router();

// Protect all car routes with authentication
router.use(authMiddleware);

// GET all cars
router.get("/", getAllCars);

// GET car by id
router.get("/:id", getCarById);

// GET cars by person
router.get("/person/:personId", getCarsByPerson);

// POST new car
router.post("/", addCar);

// PUT update car
router.put("/:id", updateCar);

// DELETE car
router.delete("/:id", deleteCar);

export default router;
