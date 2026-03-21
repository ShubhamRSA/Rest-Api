import pool from "../../db.js";
import { v4 as uuidv4 } from "uuid";
import { validate as isUUID } from "uuid";
import {
  addCarQuery,
  deleteCarQuery,
  getCars,
  getCarByIdQuery,
  updateCarQuery,
  getCarsByPersonQuery,
} from "./queries.js";

const getAllCars = async (req, res, next) => {
  try {
    const { rows } = await pool.query(getCars);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }
    const { rows } = await pool.query(getCarByIdQuery, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const addCar = async (req, res, next) => {
  try {
    const { make, model, price } = req.body;

    // Validate required fields
    if (!make || !model || price === undefined) {
      return res.status(400).json({
        message: "make, model, and price are required",
      });
    }

    const car_uid = uuidv4();
    const { rows } = await pool.query(addCarQuery, [
      car_uid,
      make,
      model,
      price,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    // Check if car is being used by any person
    const checkUsageQuery = "SELECT COUNT(*) FROM person WHERE car_uid = $1";
    const { rows: usageCheck } = await pool.query(checkUsageQuery, [id]);

    if (parseInt(usageCheck[0].count) > 0) {
      return res.status(404).json({
        message: "Cannot delete car that is assigned to a person",
      });
    }

    const { rows } = await pool.query(deleteCarQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      message: "Deleted successfully",
      data: rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    const { make, model, price } = req.body;

    // At least one field should be provided
    if (!make && !model && price === undefined) {
      return res.status(400).json({
        message: "At least one of make, model, or price is required",
      });
    }

    // Check if car exists
    const { rows: existingCar } = await pool.query(getCarByIdQuery, [id]);
    if (existingCar.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Use existing values if not provided in request
    const updatedMake = make || existingCar[0].make;
    const updatedModel = model || existingCar[0].model;
    const updatedPrice = price !== undefined ? price : existingCar[0].price;

    const { rows } = await pool.query(updateCarQuery, [
      updatedMake,
      updatedModel,
      updatedPrice,
      id,
    ]);

    res.status(200).json({
      message: "Updated successfully",
      data: rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getCarsByPerson = async (req, res, next) => {
  try {
    const { personId } = req.params;
    if (!isUUID(personId)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    const { rows } = await pool.query(getCarsByPersonQuery, [personId]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export {
  getAllCars,
  getCarById,
  addCar,
  deleteCar,
  updateCar,
  getCarsByPerson,
};
