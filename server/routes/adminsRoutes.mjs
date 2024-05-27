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
  manageEvents,
  getPending,
  setStatus,
  getAll,
  AdminLogin,
} from '../controllers/adminsController.mjs'

const router = express.Router()

// Define routes for admins
router.post('/login', AdminLogin)
// Get All Participants by userId
router.get('/participants/user/:userId', getParticipantsByUserId)

// Get All Participants by email
router.get('/participants/email/:email', getParticipantsByEmail)

// Manage Participant
router.post('/participants/add', addParticipant)
router.post('/participants/manage', manageParticipants)
router.delete('/participants/remove/:participantId', removeParticipant)

// Manage Admin
router.post('/manageAdmins/add', addAdmin)
router.post('/manageAdmins/manage', manageAdmins)
router.delete('/manageAdmins/remove/:adminId', removeAdmin)

// Manage Payments
router.get('/payments/all', getAll)
router.get('/payments/getPending', getPending)
router.put('/payments/setStatus', setStatus)


// Manage Events
router.get('/events/manage', manageEvents)
router.get('/events/register', )
router.get('/events/register', )

export default router;
