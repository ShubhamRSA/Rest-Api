import e from "express";
import express from "express";
import {
  addPerson,
  deletePerson,
  getPersonById,
  getPersons,
  updatePerson,
} from "./controller.js";
const router = express.Router();

router.get("/", getPersons);

router.get("/:id", getPersonById);
router.post("/", addPerson);
router.delete("/:id", deletePerson);
router.put("/:id", updatePerson);
export default router;
