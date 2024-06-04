// routes/adminsRoutes.mjs
import express from 'express'
import {
  addParticipant,
  getParticipantByUserId,
  getParticipantsByEmail,
  manageParticipants,
  removeParticipant,
  addAdmin,
  manageAdmins,
  removeAdmin,
  manageEvents,
  getPendingPayments,
  setStatus,
  getAllPayments,
  AdminLogin,
  getAllAdmins,
  getAdmin,
} from '../controllers/adminsController.mjs'

const router = express.Router()

// Define routes for admins
router.post('/login', AdminLogin)
// Get All Participants by userId
router.get('/participants/user/:userId', getParticipantByUserId)

// Get All Participants by email
router.get('/participants/email/:email', getParticipantsByEmail)

// Manage Participant
router.post('/participants/add', addParticipant)
router.post('/participants/manage', manageParticipants)
router.delete('/participants/remove/:participantId', removeParticipant)

// Manage Admin
router.get('/manageAdmins/all', getAllAdmins)
router.get('/manageAdmins/admin/:adminId', getAdmin)
router.post('/manageAdmins/add', addAdmin)
router.put('/manageAdmins/manage/:adminId', manageAdmins)
router.delete('/manageAdmins/remove/:adminId', removeAdmin)

// Manage Payments
router.get('/payments/getAllPayments', getAllPayments)
router.get('/payments/getPendingPayments', getPendingPayments)
router.put('/payments/setStatus', setStatus)

// Manage Events
router.get('/events/manage', manageEvents)
router.get('/events/register')
router.get('/events/register')

export default router
