import express from 'express';
import { createParticipant, getAllParticipants, getDetailsByEmail } from '../controllers/participantsController.mjs';

const router = express.Router();

// Create a new participant
router.post('/', createParticipant);
router.post('/getDetailsByEmail', getDetailsByEmail)

// Get all participants
router.get('/', getAllParticipants);

export default router;
