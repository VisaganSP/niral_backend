import express from "express";
import {
  createParticipant,
  requestPermit,
  loginParticipant,
} from "../controllers/participantsController.mjs";

const router = express.Router();

// // Create a new participant
// router.post('/', createParticipant);
// router.post('/getDetailsByEmail', getDetailsByEmail)

// // Get all participants
// router.get('/', getAllParticipants);

// Registration
router.post("/register", createParticipant);
router.post('/login', loginParticipant)
router.post('/permit', requestPermit)
// Login
// router.post("/login", login);

// Get all participants (protected route)
// router.get("/participants", verifyToken, getAllParticipants);
// router.get("/participants", getAllParticipants);

// Get participant details by email (protected route)
// router.post("/participant/details", verifyToken, getDetailsByEmail);

export default router;
