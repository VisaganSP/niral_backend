// routes/adminsRoutes.mjs
import express from 'express'
import {
  addParticipant,
  getParticipantsByUserId,
  getParticipantsByEmail,
  manageParticipants,
  removeParticipant,
  addAdmin,
  manageAdmins,
  removeAdmin,
  managePayments,
  manageEvents,
} from '../controllers/adminsController.mjs'

const router = express.Router()

// Define routes for admins
// Get All Participants by userId
router.get('/participants/user/:userId', getParticipantsByUserId)

// Get All Participants by email
router.get('/participants/email/:email', getParticipantsByEmail)

// Add Participant
router.post('/participants/add', addParticipant)

// Manage Participant
router.get('/participants/manage', manageParticipants)

// Remove Participant
router.delete('/participants/remove/:participantId', removeParticipant)

// Add Admin
router.post('/admins/add', addAdmin)

// Manage Admin
router.get('/admins/manage', manageAdmins)

// Remove Admin
router.delete('/admins/remove/:adminId', removeAdmin)

// Manage Payments
router.get('/payments/manage', managePayments)

// Manage Events
router.get('/events/manage', manageEvents)

export { router }
