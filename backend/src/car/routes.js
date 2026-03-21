import express from "express";
import {
  getAllCars,
  getCarById,
  addCar,
  deleteCar,
  updateCar,
  getCarsByPerson,
} from "./controller.js";

const router = express.Router();

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
