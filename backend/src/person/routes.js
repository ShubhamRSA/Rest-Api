import express from "express";
import { authMiddleware } from "../auth/middleware.js";
import {
  addPerson,
  deletePerson,
  getPersonById,
  getPersons,
  updatePerson,
} from "./controller.js";
const router = express.Router();

// Protect all person routes with authentication
router.use(authMiddleware);

router.get("/", getPersons);

router.get("/:id", getPersonById);
router.post("/", addPerson);
router.delete("/:id", deletePerson);
router.put("/:id", updatePerson);
export default router;
