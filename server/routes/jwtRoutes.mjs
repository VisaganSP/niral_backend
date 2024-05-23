import express from 'express'
import {  partcipantLogin } from '../jwt.mjs'

const router = express.Router()

// Login route
router.post('/partcipantLogin', partcipantLogin)

export default router
