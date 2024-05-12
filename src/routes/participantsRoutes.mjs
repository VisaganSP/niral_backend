// src/routes/participantsRoutes.mjs

import express from "express";
import {
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipantById,
  deleteParticipantById,
} from "../controllers/participantsController.mjs";

const router = express.Router();

router.get("/", getAllParticipants);
router.post("/", createParticipant);
router.get("/:id", getParticipantById);
router.put("/:id", updateParticipantById);
router.delete("/:id", deleteParticipantById);

export default router;

