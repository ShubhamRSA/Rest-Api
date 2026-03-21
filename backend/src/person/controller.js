import pool from "../../db.js";
import { validate as isUUID } from "uuid";
import {
  addPersonQuery,
  deletePersonQuery,
  emailCheckQuery,
  getPerson,
  getPersonByIdQuery,
  updatePersonQuery,
} from "./queries.js";
import { getCarByIdQuery } from "../car/queries.js";

const getPersons = async (req, res, next) => {
  try {
    const { rows } = await pool.query(getPerson);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const getPersonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(getPersonByIdQuery, [id]);
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const addPerson = async (req, res, next) => {
  try {
    console.log(req.body);
    const { first_name, last_name, email, car_uid } = req.body;
    //check if email already exists (only if email is provided)

    if (email) {
      const emailCheckResult = await pool.query(emailCheckQuery, [email]);

      if (emailCheckResult.rows.length > 0) {
        return res.status(400).send("Email already exists");
      }
    }

    // Validate car_uid if provided
    if (car_uid && car_uid.trim() !== "") {
      if (!isUUID(car_uid)) {
        return res.status(400).json({ message: "Invalid car UUID" });
      }
      const carExists = await pool.query(getCarByIdQuery, [car_uid]);
      if (carExists.rows.length === 0) {
        return res.status(400).json({ message: "Car not found" });
      }
    }

    const { rows } = await pool.query(addPersonQuery, [
      first_name,
      last_name,
      email,
      car_uid || null,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const deletePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }
    const { rows } = await pool.query(deletePersonQuery, [id]);
    console.log(rows);
    //person doesn't exist case
    if (rows.length === 0) {
      return res.status(404).json({ message: "Person not found" });
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
const updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }
    const { first_name, last_name, email, car_uid } = req.body;
    const { rowCount } = await pool.query(getPersonByIdQuery, [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Validate car_uid if provided
    if (car_uid && car_uid.trim() !== "") {
      if (!isUUID(car_uid)) {
        return res.status(400).json({ message: "Invalid car UUID" });
      }
      const carExists = await pool.query(getCarByIdQuery, [car_uid]);
      if (carExists.rows.length === 0) {
        return res.status(400).json({ message: "Car not found" });
      }
    }

    const { rows } = await pool.query(updatePersonQuery, [
      first_name,
      last_name,
      email || null,
      car_uid || null,
      id,
    ]);
    console.log(rows);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export { getPersons, getPersonById, addPerson, deletePerson, updatePerson };
